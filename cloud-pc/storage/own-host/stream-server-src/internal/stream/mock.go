package stream

import (
	"bytes"
	"context"
	"fmt"
	"io"
	"sort"
	"sync"
)

// MockEngine is an in-memory Engine for tests: torrents are seeded
// with whole files held in RAM, so /play Range behaviour, status
// shapes, and file picking are testable with no network at all.
type MockEngine struct {
	mu     sync.Mutex
	torrs  map[string]*mockTorrent
	closed bool
}

type mockTorrent struct {
	name  string
	files []mockFile
}

type mockFile struct {
	path string
	data []byte
}

// NewMockEngine builds an empty mock engine.
func NewMockEngine() *MockEngine {
	return &MockEngine{torrs: map[string]*mockTorrent{}}
}

// Seed registers a torrent with the given files (name -> content),
// in sorted-name order so indexes are deterministic.
func (m *MockEngine) Seed(hash, name string, files map[string][]byte) error {
	h, err := NormalizeHash(hash)
	if err != nil {
		return err
	}
	names := make([]string, 0, len(files))
	for n := range files {
		names = append(names, n)
	}
	sort.Strings(names)
	mt := &mockTorrent{name: name}
	for _, n := range names {
		mt.files = append(mt.files, mockFile{path: n, data: files[n]})
	}
	m.mu.Lock()
	m.torrs[h] = mt
	m.mu.Unlock()
	return nil
}

func (m *MockEngine) get(hash string) (*mockTorrent, bool) {
	m.mu.Lock()
	defer m.mu.Unlock()
	t, ok := m.torrs[hash]
	return t, ok
}

// AddInfoHash implements Engine: registers an empty (metadata-not-
// ready) torrent unless one is already seeded under the hash.
func (m *MockEngine) AddInfoHash(hash string, trackers []string) error {
	h, err := NormalizeHash(hash)
	if err != nil {
		return err
	}
	m.mu.Lock()
	defer m.mu.Unlock()
	if _, ok := m.torrs[h]; !ok {
		m.torrs[h] = nil // known, but no metadata yet
	}
	return nil
}

// AddMagnet implements Engine.
func (m *MockEngine) AddMagnet(magnet string) (string, error) {
	h, err := HashFromMagnet(magnet)
	if err != nil {
		return "", err
	}
	return h, m.AddInfoHash(h, nil)
}

// AddPeer implements Engine (no-op: the mock has no swarm).
func (m *MockEngine) AddPeer(hash, addr string) error {
	if _, ok := m.get(hash); !ok {
		return fmt.Errorf("unknown hash %s", hash)
	}
	return nil
}

// Info implements Engine. A hash registered but not seeded reports
// MetaReady=false; an unknown hash reports ok=false.
func (m *MockEngine) Info(hash string) (Info, bool) {
	m.mu.Lock()
	mt, ok := m.torrs[hash]
	m.mu.Unlock()
	if !ok {
		return Info{}, false
	}
	if mt == nil {
		return Info{MetaReady: false}, true
	}
	out := Info{MetaReady: true, Name: mt.name, ActivePeers: 1}
	for i, f := range mt.files {
		out.Files = append(out.Files, FileEntry{
			Index: i, Path: f.path, Length: int64(len(f.data)), BytesCompleted: int64(len(f.data)),
		})
		out.TotalLength += int64(len(f.data))
	}
	out.BytesCompleted = out.TotalLength
	return out, true
}

// SelectFile implements Engine.
func (m *MockEngine) SelectFile(hash string, idx int) error {
	mt, ok := m.get(hash)
	if !ok || mt == nil {
		return fmt.Errorf("metadata not ready for %s", hash)
	}
	if idx < 0 || idx >= len(mt.files) {
		return fmt.Errorf("file index %d out of range (have %d)", idx, len(mt.files))
	}
	return nil
}

// mockReader is an in-memory io.ReadSeekCloser.
type mockReader struct {
	*bytes.Reader
}

func (mockReader) Close() error { return nil }

// OpenFile implements Engine.
func (m *MockEngine) OpenFile(ctx context.Context, hash string, idx int) (io.ReadSeekCloser, int64, error) {
	mt, ok := m.get(hash)
	if !ok || mt == nil {
		return nil, 0, fmt.Errorf("metadata not ready for %s", hash)
	}
	if idx < 0 || idx >= len(mt.files) {
		return nil, 0, fmt.Errorf("file index %d out of range (have %d)", idx, len(mt.files))
	}
	data := mt.files[idx].data
	return mockReader{bytes.NewReader(data)}, int64(len(data)), nil
}

// Healthy implements Engine.
func (m *MockEngine) Healthy() bool {
	m.mu.Lock()
	defer m.mu.Unlock()
	return !m.closed
}

// Drop implements Engine.
func (m *MockEngine) Drop(hash string) {
	m.mu.Lock()
	delete(m.torrs, hash)
	m.mu.Unlock()
}

// Purge implements Engine (same as Drop for the mock).
func (m *MockEngine) Purge(hash string) { m.Drop(hash) }

// Close implements Engine.
func (m *MockEngine) Close() error {
	m.mu.Lock()
	m.closed = true
	m.mu.Unlock()
	return nil
}
