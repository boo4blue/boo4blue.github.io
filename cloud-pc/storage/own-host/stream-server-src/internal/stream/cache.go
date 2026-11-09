package stream

import (
	"fmt"
	"log"
	"sort"
	"sync"
	"time"
)

// CacheManager tracks what the server holds on disk and enforces the
// configured cache ceiling (ONION_STREAM_CACHE_MAX_BYTES) with LRU
// eviction. This is a DISK-SAFETY knob, not a service quota: there is
// no per-file size cap and no monthly limit — a single title may use
// the whole cache. Eviction protects:
//   - in-progress torrents (never evicted mid-download),
//   - torrents with a /play stream in flight,
//   - torrents played within RecentPlayProtect,
//   - the torrent that triggered the check (protectHash).
// Every eviction is logged with its reason. If nothing is evictable,
// the overflow is logged honestly and the cache stays over — data is
// never silently dropped.
type CacheManager struct {
	mu       sync.Mutex
	maxBytes int64 // <= 0 means unlimited
	// RecentPlayProtect is how long a played title is eviction-proof.
	RecentPlayProtect time.Duration
	// OnEvict, when set, physically removes the victim's data. It is
	// called WITHOUT the manager lock held.
	OnEvict func(hash string, reason string)

	torrents map[string]*TrackedTorrent
}

// Eviction records one eviction decision (for logs and tests).
type Eviction struct {
	Hash   string
	Bytes  int64
	Reason string
}

// NewCacheManager builds a manager. maxBytes <= 0 = unlimited.
func NewCacheManager(maxBytes int64) *CacheManager {
	return &CacheManager{
		maxBytes:          maxBytes,
		RecentPlayProtect: 24 * time.Hour,
		torrents:          map[string]*TrackedTorrent{},
	}
}

// MaxBytes returns the configured ceiling (<= 0 = unlimited).
func (c *CacheManager) MaxBytes() int64 { return c.maxBytes }

func (c *CacheManager) getLocked(hash string) *TrackedTorrent {
	t, ok := c.torrents[hash]
	if !ok {
		t = &TrackedTorrent{Hash: hash, LastUse: time.Now()}
		c.torrents[hash] = t
	}
	return t
}

// Touch registers/refreshes a torrent's last-use time (start/status).
func (c *CacheManager) Touch(hash string) {
	c.mu.Lock()
	defer c.mu.Unlock()
	c.getLocked(hash).LastUse = time.Now()
}

// SetProgress records how many bytes are held and whether the torrent
// is complete (from an engine snapshot).
func (c *CacheManager) SetProgress(hash string, bytesDone int64, complete bool) {
	c.mu.Lock()
	defer c.mu.Unlock()
	t := c.getLocked(hash)
	t.BytesDone = bytesDone
	t.Complete = complete
}

// BeginPlay marks a /play stream starting (eviction protection +
// last-play stamp). Pair with EndPlay.
func (c *CacheManager) BeginPlay(hash string) {
	c.mu.Lock()
	defer c.mu.Unlock()
	t := c.getLocked(hash)
	now := time.Now()
	t.Streaming++
	t.LastPlay = now
	t.LastUse = now
	log.Printf("cache play begin hash=%s streaming=%d", hash, t.Streaming)
}

// EndPlay marks a /play stream finished.
func (c *CacheManager) EndPlay(hash string) {
	c.mu.Lock()
	defer c.mu.Unlock()
	if t, ok := c.torrents[hash]; ok && t.Streaming > 0 {
		t.Streaming--
		log.Printf("cache play end hash=%s streaming=%d", hash, t.Streaming)
	}
}

// Forget removes a torrent from tracking (after a drop/purge done
// elsewhere).
func (c *CacheManager) Forget(hash string) {
	c.mu.Lock()
	defer c.mu.Unlock()
	delete(c.torrents, hash)
}

// TotalBytes sums the bytes held across tracked torrents.
func (c *CacheManager) TotalBytes() int64 {
	c.mu.Lock()
	defer c.mu.Unlock()
	return c.totalLocked()
}

func (c *CacheManager) totalLocked() int64 {
	var n int64
	for _, t := range c.torrents {
		n += t.BytesDone
	}
	return n
}

// Snapshot returns a copy of the tracked torrents, LRU first.
func (c *CacheManager) Snapshot() []TrackedTorrent {
	c.mu.Lock()
	defer c.mu.Unlock()
	out := make([]TrackedTorrent, 0, len(c.torrents))
	for _, t := range c.torrents {
		out = append(out, *t)
	}
	sort.Slice(out, func(a, b int) bool { return out[a].LastUse.Before(out[b].LastUse) })
	return out
}

// protectedLocked explains why a torrent may not be evicted right now,
// or "" if it may. Caller holds c.mu.
func (c *CacheManager) protectedLocked(t *TrackedTorrent, protectHash string, now time.Time) string {
	switch {
	case t.Hash == protectHash:
		return "it triggered this check"
	case !t.Complete:
		return "download in progress"
	case t.Streaming > 0:
		return "a stream is in flight"
	case !t.LastPlay.IsZero() && now.Sub(t.LastPlay) < c.RecentPlayProtect:
		return "played recently"
	}
	return ""
}

// Enforce evicts LRU-first until the total is within the ceiling or
// nothing evictable remains. Returns the evictions made (oldest
// first). Every eviction is logged with its reason and reported to
// OnEvict so the caller can purge the data.
func (c *CacheManager) Enforce(protectHash string) []Eviction {
	if c.maxBytes <= 0 {
		return nil
	}
	var evicted []Eviction
	for {
		c.mu.Lock()
		total := c.totalLocked()
		if total <= c.maxBytes {
			c.mu.Unlock()
			return evicted
		}
		now := time.Now()
		var victim *TrackedTorrent
		for _, t := range c.torrents {
			if why := c.protectedLocked(t, protectHash, now); why != "" {
				continue
			}
			if victim == nil || t.LastUse.Before(victim.LastUse) {
				victim = t
			}
		}
		if victim == nil {
			c.mu.Unlock()
			log.Printf("cache over ceiling: total=%s max=%s but nothing evictable (in-progress / streaming / recently-played protected)", HumanBytes(total), HumanBytes(c.maxBytes))
			return evicted
		}
		v := *victim
		delete(c.torrents, v.Hash)
		c.mu.Unlock()

		reason := fmt.Sprintf("LRU eviction: last used %s ago, holds %s; cache total %s over max %s",
			now.Sub(v.LastUse).Round(time.Second), HumanBytes(v.BytesDone), HumanBytes(total), HumanBytes(c.maxBytes))
		log.Printf("cache evict hash=%s bytes=%d reason=%q", v.Hash, v.BytesDone, reason)
		evicted = append(evicted, Eviction{Hash: v.Hash, Bytes: v.BytesDone, Reason: reason})
		if c.OnEvict != nil {
			c.OnEvict(v.Hash, reason)
		}
	}
}
