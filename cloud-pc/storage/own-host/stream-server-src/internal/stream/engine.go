package stream

import (
	"context"
	"fmt"
	"io"
	"log"
	"net/netip"
	"os"
	"path/filepath"
	"sync"
	"sync/atomic"
	"time"

	"github.com/anacrolix/torrent"
	"github.com/anacrolix/torrent/metainfo"
)

// DefaultTrackers are appended to every torrent for peer acquisition
// (DHT is also on by default — see EngineConfig).
var DefaultTrackers = []string{
	"udp://tracker.opentrackr.org:1337/announce",
	"https://tracker.opentrackr.org:443/announce",
	"udp://open.stealtracker.org:80/announce",
	"udp://tracker.openbittorrent.com:80/announce",
	"http://tracker.openbittorrent.com:80/announce",
	"udp://exodus.desync.com:6969/announce",
	"udp://tracker.dler.org:6969/announce",
	"udp://open.demonii.com:1337/announce",
}

// EngineConfig configures the real torrent engine.
type EngineConfig struct {
	// DataDir holds all torrent data (the disk cache).
	DataDir string
	// ListenPort is the peer listen port (0 = OS-assigned after the
	// preferred ports fail).
	ListenPort int
	// DHT enables the distributed hash table for peer discovery.
	DHT bool
	// NoDefaultTrackers skips DefaultTrackers (loopback gate, private
	// swarms).
	NoDefaultTrackers bool
}

// AnacrolixEngine is the real engine: it joins swarms itself with
// anacrolix/torrent — DHT + trackers + PEX, streaming piece
// prioritisation, persistent on-disk cache under DataDir (re-adding a
// hash after a restart re-verifies held pieces).
type AnacrolixEngine struct {
	client *torrent.Client
	cfg    EngineConfig
	closed atomic.Bool

	mu      sync.Mutex
	torrs   map[string]*torrent.Torrent
	samples map[string]*speedSample
	picked  map[string]bool // hash -> SmartPick already ran
}

type speedSample struct {
	bytes int64
	at    time.Time
	bps   float64
}

// NewAnacrolixEngine creates the torrent client storing data in
// cfg.DataDir.
func NewAnacrolixEngine(cfg EngineConfig) (*AnacrolixEngine, error) {
	if err := os.MkdirAll(cfg.DataDir, 0o755); err != nil {
		return nil, err
	}
	// Peer listen port: try the configured port (default candidates
	// below), then fall back to an OS-assigned port. A busy port must
	// never kill the service (the pre-existing local onion-stream
	// server uses 42069; the debrid service uses 42070+).
	ports := []int{42072, 42073, 42074, 0}
	if cfg.ListenPort > 0 {
		ports = append([]int{cfg.ListenPort}, ports...)
	}
	var cl *torrent.Client
	var lastErr error
	for _, port := range ports {
		c := torrent.NewDefaultClientConfig()
		c.DataDir = cfg.DataDir
		c.Seed = true // we are a real peer: what we hold, we can serve
		c.ListenPort = port
		c.NoDHT = !cfg.DHT
		c.EstablishedConnsPerTorrent = 100
		c.HalfOpenConnsPerTorrent = 60
		cl, lastErr = torrent.NewClient(c)
		if lastErr == nil {
			log.Printf("engine peer listen port=%d dht=%v", port, cfg.DHT)
			break
		}
		log.Printf("engine listen port=%d failed: %v (trying next)", port, lastErr)
	}
	if cl == nil {
		return nil, fmt.Errorf("torrent client: %w", lastErr)
	}
	log.Printf("engine=anacrolix ready dataDir=%s defaultTrackers=%v", cfg.DataDir, !cfg.NoDefaultTrackers)
	return &AnacrolixEngine{
		client:  cl,
		cfg:     cfg,
		torrs:   map[string]*torrent.Torrent{},
		samples: map[string]*speedSample{},
		picked:  map[string]bool{},
	}, nil
}

// track registers a torrent and arms the one-shot SmartPick: when the
// metadata lands, the main file is chosen and prioritised so playback
// can start fast when /play is called.
func (e *AnacrolixEngine) track(t *torrent.Torrent) string {
	h := t.InfoHash().HexString()
	e.mu.Lock()
	_, seen := e.torrs[h]
	e.torrs[h] = t
	e.mu.Unlock()
	if !seen {
		go func() {
			<-t.GotInfo()
			log.Printf("engine info ready hash=%s name=%q files=%d total=%s", h, t.Name(), len(t.Files()), HumanBytes(t.Length()))
			e.smartPick(h)
		}()
	}
	return h
}

// smartPick runs PickMainFile once per torrent and prioritises the
// winner. Logged with its reason (strict logging + decision trail).
func (e *AnacrolixEngine) smartPick(hash string) {
	e.mu.Lock()
	if e.picked[hash] {
		e.mu.Unlock()
		return
	}
	e.picked[hash] = true
	e.mu.Unlock()
	info, ok := e.Info(hash)
	if !ok || !info.MetaReady {
		return
	}
	idx, reason, ok := PickMainFile(info.Files)
	if !ok {
		log.Printf("smartpick hash=%s no pick: %s", hash, reason)
		return
	}
	if err := e.SelectFile(hash, idx); err != nil {
		log.Printf("smartpick hash=%s select file=%d err=%v", hash, idx, err)
		return
	}
	log.Printf("smartpick hash=%s file=%d (%s): %s", hash, idx, info.Files[idx].Path, reason)
}

func (e *AnacrolixEngine) get(hash string) (*torrent.Torrent, bool) {
	e.mu.Lock()
	defer e.mu.Unlock()
	t, ok := e.torrs[hash]
	return t, ok
}

// AddMagnet implements Engine.
func (e *AnacrolixEngine) AddMagnet(magnet string) (string, error) {
	spec, err := torrent.TorrentSpecFromMagnetUri(magnet)
	if err != nil {
		return "", fmt.Errorf("parse magnet: %w", err)
	}
	t, _, err := e.client.AddTorrentSpec(spec)
	if err != nil {
		return "", err
	}
	h := e.track(t)
	log.Printf("engine add magnet hash=%s", h)
	return h, nil
}

// AddInfoHash implements Engine.
func (e *AnacrolixEngine) AddInfoHash(hash string, trackers []string) error {
	h, err := NormalizeHash(hash)
	if err != nil {
		return err
	}
	ih := metainfo.NewHashFromHex(h)
	t, _ := e.client.AddTorrentInfoHash(ih)
	var tiers [][]string
	if len(trackers) > 0 {
		tiers = append(tiers, trackers)
	}
	if !e.cfg.NoDefaultTrackers {
		tiers = append(tiers, DefaultTrackers)
	}
	if len(tiers) > 0 {
		t.AddTrackers(tiers)
	}
	e.track(t)
	log.Printf("engine add hash=%s trackers=%d", h, len(trackers))
	return nil
}

// AddPeer implements Engine.
func (e *AnacrolixEngine) AddPeer(hash, addr string) error {
	t, ok := e.get(hash)
	if !ok {
		return fmt.Errorf("unknown hash %s", hash)
	}
	ap, err := netip.ParseAddrPort(addr)
	if err != nil {
		return fmt.Errorf("bad peer address %q: %w", addr, err)
	}
	n := t.AddPeers([]torrent.PeerInfo{{Addr: ap, Source: torrent.PeerSourceDirect}})
	log.Printf("engine add peer hash=%s addr=%s added=%d", hash, addr, n)
	return nil
}

// Info implements Engine.
func (e *AnacrolixEngine) Info(hash string) (Info, bool) {
	t, ok := e.get(hash)
	if !ok {
		return Info{}, false
	}
	if t.Info() == nil {
		return Info{MetaReady: false}, true
	}
	files := t.Files()
	out := Info{
		MetaReady:      true,
		Name:           t.Name(),
		BytesCompleted: t.BytesCompleted(),
		TotalLength:    t.Length(),
	}
	for i, f := range files {
		out.Files = append(out.Files, FileEntry{
			Index:          i,
			Path:           f.DisplayPath(),
			Length:         f.Length(),
			BytesCompleted: f.BytesCompleted(),
		})
	}
	st := t.Stats()
	out.ActivePeers = st.ActivePeers
	out.TotalPeers = st.TotalPeers
	out.Seeders = st.ConnectedSeeders
	out.SpeedBps = e.sampleSpeed(hash, t.BytesCompleted())
	return out, true
}

func (e *AnacrolixEngine) sampleSpeed(hash string, done int64) float64 {
	e.mu.Lock()
	defer e.mu.Unlock()
	now := time.Now()
	s, ok := e.samples[hash]
	if !ok {
		e.samples[hash] = &speedSample{bytes: done, at: now}
		return 0
	}
	dt := now.Sub(s.at).Seconds()
	if dt >= 1 {
		s.bps = float64(done-s.bytes) / dt
		if s.bps < 0 {
			s.bps = 0
		}
		s.bytes = done
		s.at = now
	}
	return s.bps
}

// SelectFile implements Engine: download the file, pin its first and
// last pieces at top priority (container header + seek tail / moov
// atom), so a player can start and seek while the middle is arriving.
func (e *AnacrolixEngine) SelectFile(hash string, idx int) error {
	t, ok := e.get(hash)
	if !ok {
		return fmt.Errorf("unknown hash %s", hash)
	}
	if t.Info() == nil {
		return fmt.Errorf("metadata not ready for %s", hash)
	}
	files := t.Files()
	if idx < 0 || idx >= len(files) {
		return fmt.Errorf("file index %d out of range (have %d)", idx, len(files))
	}
	f := files[idx]
	f.Download()
	begin, end := f.BeginPieceIndex(), f.EndPieceIndex()
	const headPieces, tailPieces = 8, 4
	for p := begin; p < end && p < begin+headPieces; p++ {
		t.Piece(p).SetPriority(torrent.PiecePriorityNow)
	}
	for p := end - tailPieces; p < end; p++ {
		if p >= begin {
			t.Piece(p).SetPriority(torrent.PiecePriorityNow)
		}
	}
	log.Printf("engine select hash=%s file=%d path=%q pieces=%d..%d pinned head/tail", hash, idx, f.DisplayPath(), begin, end)
	return nil
}

// OpenFile implements Engine. The anacrolix Reader prioritises pieces
// around the read head with a readahead window: this is the streaming
// path — seeking moves the window too.
func (e *AnacrolixEngine) OpenFile(ctx context.Context, hash string, idx int) (io.ReadSeekCloser, int64, error) {
	t, ok := e.get(hash)
	if !ok {
		return nil, 0, fmt.Errorf("unknown hash %s", hash)
	}
	if t.Info() == nil {
		return nil, 0, fmt.Errorf("metadata not ready for %s", hash)
	}
	files := t.Files()
	if idx < 0 || idx >= len(files) {
		return nil, 0, fmt.Errorf("file index %d out of range (have %d)", idx, len(files))
	}
	f := files[idx]
	rd := f.NewReader()
	rd.SetReadahead(32 << 20)
	rd.SetContext(ctx)
	return rd, f.Length(), nil
}

// Drop implements Engine.
func (e *AnacrolixEngine) Drop(hash string) {
	if t, ok := e.get(hash); ok {
		t.Drop()
		e.mu.Lock()
		delete(e.torrs, hash)
		delete(e.samples, hash)
		delete(e.picked, hash)
		e.mu.Unlock()
		log.Printf("engine drop hash=%s", hash)
	}
}

// Purge implements Engine: drop + best-effort data deletion. anacrolix's
// default file storage keeps torrent data under DataDir/<name>; we try
// the known candidate paths and log what happened (never fatal).
func (e *AnacrolixEngine) Purge(hash string) {
	name := ""
	if t, ok := e.get(hash); ok && t.Info() != nil {
		name = t.Name()
	}
	e.Drop(hash)
	if name != "" {
		p := filepath.Join(e.cfg.DataDir, name)
		if err := os.RemoveAll(p); err != nil {
			log.Printf("engine purge hash=%s path=%s err=%v", hash, p, err)
		} else {
			log.Printf("engine purge hash=%s removed=%s", hash, p)
		}
	}
}

// Healthy implements Engine: the client exists and has not been
// closed. (Storage writability is probed separately by the server —
// an engine with a full/dead disk must not report healthy either.)
func (e *AnacrolixEngine) Healthy() bool {
	return e.client != nil && !e.closed.Load()
}

// Close implements Engine.
func (e *AnacrolixEngine) Close() error {
	e.closed.Store(true)
	if e.client != nil {
		e.client.Close()
	}
	return nil
}
