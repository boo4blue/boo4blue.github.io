package stream

import (
	"strings"
	"testing"
	"time"
)

const (
	hashA = "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
	hashB = "bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb"
	hashC = "cccccccccccccccccccccccccccccccccccccccc"
)

func TestCacheEvictsLRUFirst(t *testing.T) {
	c := NewCacheManager(1000)
	var purged []string
	c.OnEvict = func(hash, reason string) { purged = append(purged, hash) }

	now := time.Now()
	c.Touch(hashA)
	c.SetProgress(hashA, 600, true)
	c.Touch(hashB)
	c.SetProgress(hashB, 600, true)
	// Age A so it is the LRU victim; B was used just now.
	c.mu.Lock()
	c.torrents[hashA].LastUse = now.Add(-2 * time.Hour)
	c.torrents[hashB].LastUse = now
	c.mu.Unlock()

	evicted := c.Enforce(hashC) // C is the protected trigger
	if len(evicted) != 1 || evicted[0].Hash != hashA {
		t.Fatalf("want exactly A evicted, got %+v", evicted)
	}
	if len(purged) != 1 || purged[0] != hashA {
		t.Fatalf("OnEvict must fire for A, got %v", purged)
	}
	if !strings.Contains(evicted[0].Reason, "LRU") {
		t.Fatalf("eviction must carry a reason, got %q", evicted[0].Reason)
	}
	if got := c.TotalBytes(); got != 600 {
		t.Fatalf("total after eviction = %d, want 600", got)
	}
}

func TestCacheProtectsInProgressAndStreaming(t *testing.T) {
	c := NewCacheManager(100)
	c.Touch(hashA)
	c.SetProgress(hashA, 500, false) // in progress
	c.Touch(hashB)
	c.SetProgress(hashB, 500, true)
	c.BeginPlay(hashB) // streaming
	defer c.EndPlay(hashB)
	evicted := c.Enforce("")
	if len(evicted) != 0 {
		t.Fatalf("in-progress + streaming must be protected, evicted %+v", evicted)
	}
	if got := c.TotalBytes(); got != 1000 {
		t.Fatalf("honest overflow: total stays %d, want 1000", got)
	}
}

func TestCacheProtectsRecentlyPlayed(t *testing.T) {
	c := NewCacheManager(100)
	c.RecentPlayProtect = time.Hour
	c.Touch(hashA)
	c.SetProgress(hashA, 500, true)
	c.BeginPlay(hashA)
	c.EndPlay(hashA) // played just now, no longer streaming
	if evicted := c.Enforce(""); len(evicted) != 0 {
		t.Fatalf("recently played must be protected, evicted %+v", evicted)
	}
	// Age the play beyond the protection window: now it may go.
	c.mu.Lock()
	old := time.Now().Add(-2 * time.Hour)
	c.torrents[hashA].LastPlay = old
	c.torrents[hashA].LastUse = old
	c.mu.Unlock()
	evicted := c.Enforce("")
	if len(evicted) != 1 || evicted[0].Hash != hashA {
		t.Fatalf("stale played title must evict, got %+v", evicted)
	}
}

func TestCacheUnlimitedNeverEvicts(t *testing.T) {
	c := NewCacheManager(0)
	c.Touch(hashA)
	c.SetProgress(hashA, 1<<40, true)
	if evicted := c.Enforce(""); len(evicted) != 0 {
		t.Fatalf("unlimited cache must never evict, got %+v", evicted)
	}
}
