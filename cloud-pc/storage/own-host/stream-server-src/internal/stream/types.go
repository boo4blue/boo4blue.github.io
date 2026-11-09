// Package stream is Onion Stream Server: our own torrent-to-HTTP
// streaming server. It joins BitTorrent swarms itself (anacrolix
// engine) and serves file bytes over HTTP with Range support — no
// debrid service, no third-party cache, no quotas, no per-file caps.
//
// Strict logging rule (standing): every state change, command
// execution, and network request is logged with a timestamp.
package stream

import (
	"context"
	"encoding/hex"
	"fmt"
	"io"
	"strings"
	"time"
)

// FileEntry is one file inside a torrent. Index is the torrent's own
// file order — it is the /play/<hash>/<idx> index everywhere, and the
// status response's files/fileLengths arrays use this same order.
type FileEntry struct {
	Index          int    `json:"index"`
	Path           string `json:"path"`
	Length         int64  `json:"length"`
	BytesCompleted int64  `json:"bytesCompleted"`
}

// Complete reports whether every byte of the file is present.
func (f FileEntry) Complete() bool { return f.Length > 0 && f.BytesCompleted >= f.Length }

// Info is a snapshot of one torrent from the engine.
type Info struct {
	MetaReady      bool
	Name           string
	Files          []FileEntry
	BytesCompleted int64
	TotalLength    int64
	ActivePeers    int
	TotalPeers     int
	Seeders        int
	SpeedBps       float64
}

// Complete reports whether the whole torrent is downloaded.
func (i Info) Complete() bool { return i.TotalLength > 0 && i.BytesCompleted >= i.TotalLength }

// Engine is the torrent engine behind an interface, so the HTTP layer
// and cache logic are testable with the in-memory mock while the real
// anacrolix implementation runs in production.
type Engine interface {
	// AddInfoHash registers a bare infohash with extra trackers.
	AddInfoHash(hash string, trackers []string) error
	// AddMagnet registers a magnet URI; returns the infohash hex.
	AddMagnet(magnet string) (string, error)
	// AddPeer injects a direct peer (host:port) for a torrent. Used for
	// LAN setups and the loopback proof gate.
	AddPeer(hash, addr string) error
	// Info snapshots one torrent; ok=false if the hash is unknown.
	Info(hash string) (Info, bool)
	// SelectFile prioritises a file for streaming: downloaded first,
	// head+tail pieces pinned at top priority.
	SelectFile(hash string, idx int) error
	// OpenFile returns a seekable reader over the file's bytes. Reads
	// block/prioritise on demand while downloading (anacrolix reader
	// semantics) and are instant once complete.
	OpenFile(ctx context.Context, hash string, idx int) (io.ReadSeekCloser, int64, error)
	// Healthy reports whether the engine can actually serve right
	// now (client alive, not closed). The /health endpoint's ok is
	// gated on this: this server is the MAIN streaming server and a
	// failover router probes /health, so ok must never be claimed
	// when the engine cannot serve.
	Healthy() bool
	// Drop removes the torrent from the engine (keeps data on disk).
	Drop(hash string)
	// Purge drops the torrent and best-effort deletes its on-disk data.
	Purge(hash string)
	Close() error
}

// NormalizeHash validates and normalises a BitTorrent v1 infohash to
// lowercase hex (40 chars). It accepts hex in any case and magnet URIs.
func NormalizeHash(s string) (string, error) {
	s = strings.TrimSpace(s)
	if strings.HasPrefix(strings.ToLower(s), "magnet:") {
		h, err := HashFromMagnet(s)
		if err != nil {
			return "", err
		}
		return h, nil
	}
	s = strings.ToLower(s)
	if len(s) != 40 {
		return "", fmt.Errorf("infohash must be 40 hex chars, got %d", len(s))
	}
	if _, err := hex.DecodeString(s); err != nil {
		return "", fmt.Errorf("infohash is not hex: %w", err)
	}
	return s, nil
}

// HashFromMagnet extracts the btih infohash (hex form) from a magnet URI.
func HashFromMagnet(magnet string) (string, error) {
	lower := strings.ToLower(magnet)
	i := strings.Index(lower, "urn:btih:")
	if i < 0 {
		return "", fmt.Errorf("magnet has no urn:btih infohash")
	}
	rest := magnet[i+len("urn:btih:"):]
	if j := strings.IndexAny(rest, "&#"); j >= 0 {
		rest = rest[:j]
	}
	rest = strings.TrimSpace(rest)
	if len(rest) == 40 {
		return NormalizeHash(rest)
	}
	if len(rest) == 32 { // base32
		b, err := base32Decode(rest)
		if err != nil {
			return "", err
		}
		return hex.EncodeToString(b), nil
	}
	return "", fmt.Errorf("unsupported btih hash length %d", len(rest))
}

const b32alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567"

func base32Decode(s string) ([]byte, error) {
	s = strings.ToUpper(s)
	var out []byte
	var buf uint64
	var bits uint
	for _, c := range s {
		v := strings.IndexRune(b32alphabet, c)
		if v < 0 {
			return nil, fmt.Errorf("invalid base32 char %q", c)
		}
		buf = buf<<5 | uint64(v)
		bits += 5
		if bits >= 8 {
			bits -= 8
			out = append(out, byte(buf>>bits))
		}
	}
	return out, nil
}

// TrackedTorrent is the cache manager's view of one torrent.
type TrackedTorrent struct {
	Hash      string
	BytesDone int64     // bytes held on disk for this torrent
	Complete  bool      // fully downloaded
	LastUse   time.Time // last start/status/play
	LastPlay  time.Time // last /play (zero = never played)
	Streaming int       // /play requests currently in flight
}

// HumanBytes renders a byte count for logs and reasons.
func HumanBytes(n int64) string {
	const gib = 1 << 30
	const mib = 1 << 20
	switch {
	case n >= gib:
		return fmt.Sprintf("%.1f GiB", float64(n)/gib)
	case n >= mib:
		return fmt.Sprintf("%.0f MiB", float64(n)/mib)
	default:
		return fmt.Sprintf("%d B", n)
	}
}
