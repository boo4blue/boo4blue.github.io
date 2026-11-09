// Onion Stream — torrent-to-HTTP streaming server for Onion TV Web.
//
// Design (see RESEARCH.md): anacrolix/torrent engine, reader-driven
// sliding priority window (libtorrent-style streaming model), head+tail
// pieces pinned first for container headers, persistent on-disk piece
// cache, ffprobe-driven remux/transcode via ffmpeg to fragmented MP4
// when the swarm's file is not browser-playable as-is.
//
// Every state change and request is logged with a timestamp.
package main

import (
	"context"
	"encoding/hex"
	"encoding/json"
	"fmt"
	"io"
	"log"
	"net"
	"net/http"
	"net/netip"
	"net/url"
	"os"
	"os/exec"
	"path/filepath"
	"sort"
	"strconv"
	"strings"
	"sync"
	"time"

	"github.com/anacrolix/torrent"
	"github.com/anacrolix/torrent/bencode"
	"github.com/anacrolix/torrent/types/infohash"
)

var (
	cacheDir   = envOr("ONION_STREAM_CACHE", "cache")
	listenAddr = envOr("ONION_STREAM_ADDR", ":11470")
	client     *torrent.Client

	mu       sync.Mutex
	sessions = map[string]*session{}
	probes   = map[string]*probeResult{}
)

func envOr(k, d string) string {
	if v := os.Getenv(k); v != "" {
		return v
	}
	return d
}

type session struct {
	hash     string
	title    string // TITLE-IDENTITY GATE: the picked title this session was started for (client-verified)
	year     string
	t        *torrent.Torrent
	addedAt  time.Time
	lastUse  time.Time
	trackers []string
	cancel   context.CancelFunc
	// speed sampling
	lastBytes int64
	lastTime  time.Time
	speedBps  float64
}

type probeResult struct {
	Container   string  `json:"container"`
	VideoCodec  string  `json:"videoCodec"`
	AudioCodec  string  `json:"audioCodec"`
	DurationSec float64 `json:"durationSec"`
	Width       int     `json:"width"`
	Height      int     `json:"height"`
	RawSafe     bool    `json:"rawSafe"`     // serve bytes as-is
	VideoCopy   bool    `json:"videoCopy"`   // remux: copy video, fix audio/container
	Reason      string  `json:"reason"`
	ProbedAt    time.Time
}

func logf(format string, args ...interface{}) {
	log.Printf(format, args...)
}

// default public trackers appended to every torrent (peer acquisition flood)
var defaultTrackers = []string{
	"https://tracker.opentrackr.org:443/announce",
	"http://tracker.opentrackr.org:1337/announce",
	"http://open.tracker.cl:1337/announce",
	"http://tracker.renfei.net:8080/announce",
	"http://tracker.leechers-paradise.org:6969/announce",
	"udp://tracker.opentrackr.org:1337/announce",
	"udp://open.stealtracker.org:80/announce",
	"udp://tracker.torrent.eu.org:451/announce",
	"udp://tracker.bittor.pw:1337/announce",
	"udp://public.popcorn-tracker.org:6969/announce",
	"udp://tracker.dler.org:6969/announce",
	"udp://exodus.desync.com:6969/announce",
	"udp://open.demonii.com:1337/announce",
	"udp://tracker.coppersurfer.tk:6969/announce",
	"udp://tracker.leechers-paradise.org:6969/announce",
	"udp://tracker.openbittorrent.com:6969/announce",
	"udp://tracker.openbittorrent.com:80/announce",
	"http://tracker.openbittorrent.com:80/announce",
	"udp://opentracker.i2p.rocks:6969/announce",
	"udp://tracker.internetwarriors.net:1337/announce",
	"udp://tracker.leechers-paradise.org:6969/announce",
	"udp://coppersurfer.tk:6969/announce",
	"udp://tracker.zer0day.to:1337/announce",
}

func getSession(hashHex string, trackers []string) (*session, error) {
	hashBytes, err := hex.DecodeString(hashHex)
	if err != nil || len(hashBytes) != 20 {
		return nil, fmt.Errorf("bad infohash")
	}
	var ih infohash.T
	copy(ih[:], hashBytes)
	key := ih.HexString()

	mu.Lock()
	defer mu.Unlock()
	if s, ok := sessions[key]; ok {
		s.lastUse = time.Now()
		return s, nil
	}
	// LRU trim: keep at most 8 torrents in the client; data stays on disk.
	if len(sessions) >= 8 {
		var oldest *session
		for _, s := range sessions {
			if oldest == nil || s.lastUse.Before(oldest.lastUse) {
				oldest = s
			}
		}
		if oldest != nil {
			logf("cache: dropping least-recent torrent %s from client (data kept on disk)", oldest.hash)
			if oldest.cancel != nil {
				oldest.cancel()
			}
			oldest.t.Drop()
			delete(sessions, oldest.hash)
		}
	}
	seen := map[string]bool{}
	var tiers [][]string
	add := func(tr string) {
		tr = strings.TrimSpace(tr)
		if tr == "" || seen[tr] {
			return
		}
		seen[tr] = true
		tiers = append(tiers, []string{tr})
	}
	for _, tr := range trackers {
		add(tr)
	}
	for _, tr := range defaultTrackers {
		add(tr)
	}
	spec := &torrent.TorrentSpec{Trackers: tiers}
	spec.InfoHash = ih
	t, new, err := client.AddTorrentSpec(spec)
	if err != nil {
		return nil, err
	}
	ctx, cancel := context.WithCancel(context.Background())
	var flat []string
	for _, tier := range tiers {
		flat = append(flat, tier...)
	}
	s := &session{hash: key, t: t, addedAt: time.Now(), lastUse: time.Now(), lastTime: time.Now(), trackers: flat, cancel: cancel}
	sessions[key] = s
	logf("torrent added hash=%s new=%v trackers=%d", key, new, len(tiers))
	go announceLoop(ctx, s)
	go func() {
		<-t.GotInfo()
		logf("torrent info ready hash=%s name=%q files=%d total=%d", key, t.Name(), len(t.Files()), t.Length())
		pinHeadTail(t, -1)
	}()
	return s, nil
}


// ---- Built-in tracker announcer -------------------------------------
// This host's network only lets HTTP(S) tracker announces through (via
// the standard proxy-aware HTTP client) and direct TCP peer dials.
// anacrolix's own tracker path cannot complete announces here, so we
// announce ourselves and inject the peers with Torrent.AddPeers.
// Established connections then amplify discovery via PEX.

const announcePeerID = "-ONSTRM-202511070001" // exactly 20 bytes

type announceResp struct {
	Failure string `bencode:"failure reason"`
	Interval int   `bencode:"interval"`
	Peers    string `bencode:"peers"`
	Peers6   string `bencode:"peers6"`
}

func announceTo(tr string, s *session) int {
	hashBytes, err := hex.DecodeString(s.hash)
	if err != nil {
		return 0
	}
	left := int64(1) << 40
	if s.t.Info() != nil {
		left = s.t.Length() - s.t.BytesCompleted()
		if left < 0 {
			left = 0
		}
	}
	q := url.Values{}
	q.Set("info_hash", string(hashBytes))
	q.Set("peer_id", announcePeerID)
	q.Set("port", "42069")
	q.Set("uploaded", "0")
	sst := s.t.Stats()
	q.Set("downloaded", strconv.FormatInt(sst.BytesReadData.Int64(), 10))
	q.Set("left", strconv.FormatInt(left, 10))
	q.Set("compact", "1")
	q.Set("numwant", "200")
	q.Set("event", "started")
	sep := "?"
	if strings.Contains(tr, "?") {
		sep = "&"
	}
	ctx, cancel := context.WithTimeout(context.Background(), 20*time.Second)
	defer cancel()
	req, err := http.NewRequestWithContext(ctx, "GET", tr+sep+q.Encode(), nil)
	if err != nil {
		return 0
	}
	req.Header.Set("User-Agent", "qBittorrent/4.6.5")
	resp, err := http.DefaultClient.Do(req)
	if err != nil {
		logf("announce failed tracker=%s err=%v", tr, err)
		return 0
	}
	defer resp.Body.Close()
	body, err := io.ReadAll(io.LimitReader(resp.Body, 1<<20))
	if err != nil || resp.StatusCode != 200 {
		logf("announce bad response tracker=%s status=%d", tr, resp.StatusCode)
		return 0
	}
	var ar announceResp
	if err := bencode.Unmarshal(body, &ar); err != nil {
		logf("announce parse failed tracker=%s err=%v", tr, err)
		return 0
	}
	if ar.Failure != "" {
		logf("announce rejected tracker=%s reason=%q", tr, ar.Failure)
		return 0
	}
	var peers []torrent.PeerInfo
	addCompact := func(blob string, v6 bool) {
		sz := 6
		if v6 {
			sz = 18
		}
		b := []byte(blob)
		for k := 0; k+sz <= len(b); k += sz {
			var ap netip.AddrPort
			if v6 {
				var a [16]byte
				copy(a[:], b[k:k+16])
				ap = netip.AddrPortFrom(netip.AddrFrom16(a), uint16(b[k+17])|uint16(b[k+16])<<8)
			} else {
				ip := net.IPv4(b[k], b[k+1], b[k+2], b[k+3])
				var a [4]byte
				copy(a[:], ip.To4())
				ap = netip.AddrPortFrom(netip.AddrFrom4(a), uint16(b[k+5])|uint16(b[k+4])<<8)
			}
			peers = append(peers, torrent.PeerInfo{Addr: ap, Source: torrent.PeerSourceTracker})
		}
	}
	addCompact(ar.Peers, false)
	addCompact(ar.Peers6, true)
	if len(peers) > 0 {
		n := s.t.AddPeers(peers)
		logf("announce ok tracker=%s peers-returned=%d added=%d hash=%s", tr, len(peers), n, s.hash)
	} else {
		logf("announce ok tracker=%s peers-returned=0 hash=%s", tr, s.hash)
	}
	return len(peers)
}

func announceLoop(ctx context.Context, s *session) {
	var httpTrackers []string
	for _, tr := range s.trackers {
		if strings.HasPrefix(tr, "http://") || strings.HasPrefix(tr, "https://") {
			httpTrackers = append(httpTrackers, tr)
		}
	}
	logf("announcer start hash=%s http-trackers=%d (udp trackers skipped: UDP blocked on this host)", s.hash, len(httpTrackers))
	for {
		total := 0
		for _, tr := range httpTrackers {
			select {
			case <-ctx.Done():
				logf("announcer stop hash=%s", s.hash)
				return
			default:
			}
			total += announceTo(tr, s)
		}
		logf("announcer round done hash=%s total-peers=%d active=%d", s.hash, total, s.t.Stats().ActivePeers)
		select {
		case <-ctx.Done():
			logf("announcer stop hash=%s", s.hash)
			return
		case <-time.After(90 * time.Second):
		}
	}
}

// pinHeadTail pins the first and last pieces of a file (or all files when
// fileIdx<0) at top priority: container headers + MP4 moov / MKV cues.
func pinHeadTail(t *torrent.Torrent, fileIdx int) {
	info := t.Info()
	if info == nil {
		return
	}
	pl := info.PieceLength
	for i, f := range t.Files() {
		if fileIdx >= 0 && i != fileIdx {
			continue
		}
		first := int(f.Offset() / pl)
		last := int((f.Offset() + f.Length() - 1) / pl)
		for p := first; p <= first+2 && p <= last; p++ {
			t.Piece(p).SetPriority(torrent.PiecePriorityNow)
		}
		for p := last; p >= last-2 && p >= first; p-- {
			t.Piece(p).SetPriority(torrent.PiecePriorityNow)
		}
		logf("pinned head/tail pieces file=%d pieces=%d..%d and %d..%d", i, first, first+2, last-2, last)
	}
}

func parseTrackers(r *http.Request) []string {
	var out []string
	for _, k := range []string{"tr", "trackers"} {
		for _, v := range r.URL.Query()[k] {
			for _, part := range strings.Split(v, ",") {
				out = append(out, part)
			}
		}
	}
	return out
}

func writeJSON(w http.ResponseWriter, code int, v interface{}) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(code)
	enc := json.NewEncoder(w)
	_ = enc.Encode(v)
}

func cors(w http.ResponseWriter) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
	w.Header().Set("Access-Control-Allow-Headers", "*")
}

// contiguousBytes returns bytes of the file available contiguously from
// the file start (the pre-buffer cushion), plus total completed bytes.
func fileProgress(t *torrent.Torrent, f *torrent.File) (contig int64, done int64) {
	info := t.Info()
	if info == nil {
		return 0, 0
	}
	pl := info.PieceLength
	first := int(f.Offset() / pl)
	last := int((f.Offset() + f.Length() - 1) / pl)
	states := t.PieceStateRuns()
	complete := map[int]bool{}
	{
		idx := 0
		for _, run := range states {
			if run.Complete {
				for p := idx; p < idx+run.Length; p++ {
					complete[p] = true
				}
			}
			idx += run.Length
		}
	}
	for p := first; p <= last; p++ {
		if complete[p] {
			done += pl
		}
	}
	// contiguous from start, in file bytes
	var c int64
	for p := first; p <= last; p++ {
		if !complete[p] {
			break
		}
		// piece coverage within the file
		pieceStart := int64(p) * pl
		pieceEnd := pieceStart + pl
		fs := f.Offset()
		fe := f.Offset() + f.Length()
		if pieceStart < fs {
			pieceStart = fs
		}
		if pieceEnd > fe {
			pieceEnd = fe
		}
		c += pieceEnd - pieceStart
	}
	if done > f.Length() {
		done = f.Length()
	}
	return c, done
}

func statusOf(s *session) map[string]interface{} {
	t := s.t
	st := t.Stats()
	out := map[string]interface{}{
		"hash":        s.hash,
		"forTitle":    s.title,
		"forYear":     s.year,
		"infoReady":   t.Info() != nil,
		"name":        t.Name(),
		"activePeers": st.ActivePeers,
		"totalPeers":  st.TotalPeers,
		"seeders":     st.ConnectedSeeders,
		"bytesRead":   st.BytesReadData.Int64(),
		"addedAt":     s.addedAt.Unix(),
	}
	// speed sampling
	now := time.Now()
	cur := st.BytesReadData.Int64()
	if dt := now.Sub(s.lastTime).Seconds(); dt > 0.2 {
		s.speedBps = float64(cur-s.lastBytes) / dt
		s.lastBytes = cur
		s.lastTime = now
	}
	out["speedBps"] = int64(s.speedBps)
	if t.Info() != nil {
		files := []map[string]interface{}{}
		for i, f := range t.Files() {
			files = append(files, map[string]interface{}{
				"idx": i, "path": f.DisplayPath(), "length": f.Length(),
			})
		}
		out["files"] = files
		out["totalLength"] = t.Length()
		out["bytesCompleted"] = t.BytesCompleted()
	}
	return out
}

func handleHealth(w http.ResponseWriter, r *http.Request) {
	cors(w)
	mu.Lock()
	n := len(sessions)
	mu.Unlock()
	writeJSON(w, 200, map[string]interface{}{"ok": true, "service": "onion-stream", "torrents": n, "time": time.Now().Unix()})
}

func handleStart(w http.ResponseWriter, r *http.Request) {
	cors(w)
	if r.Method == http.MethodOptions {
		return
	}
	hash := strings.ToLower(r.URL.Query().Get("hash"))
	s, err := getSession(hash, parseTrackers(r))
	if err != nil {
		writeJSON(w, 400, map[string]string{"error": err.Error()})
		return
	}
	// TITLE-IDENTITY GATE: the website resolver only starts streams it
	// verified against the picked title; record that identity on the
	// session so every play in the server log names its title + year.
	if t := r.URL.Query().Get("title"); t != "" {
		s.title = t
		s.year = r.URL.Query().Get("year")
	}
	logf("start requested hash=%s forTitle=%q year=%s", s.hash, s.title, s.year)
	writeJSON(w, 200, statusOf(s))
}

func handleStatus(w http.ResponseWriter, r *http.Request) {
	cors(w)
	hash := strings.ToLower(r.URL.Query().Get("hash"))
	s, err := getSession(hash, parseTrackers(r))
	if err != nil {
		writeJSON(w, 400, map[string]string{"error": err.Error()})
		return
	}
	out := statusOf(s)
	if idxStr := r.URL.Query().Get("file"); idxStr != "" && s.t.Info() != nil {
		idx, _ := strconv.Atoi(idxStr)
		files := s.t.Files()
		if idx >= 0 && idx < len(files) {
			contig, done := fileProgress(s.t, files[idx])
			out["fileContiguousBytes"] = contig
			out["fileBytesCompleted"] = done
			out["fileLength"] = files[idx].Length()
		}
	}
	writeJSON(w, 200, out)
}

func pickFile(t *torrent.Torrent, idx int) *torrent.File {
	files := t.Files()
	if idx >= 0 && idx < len(files) {
		return files[idx]
	}
	// largest file (the Stremio convention when fileIdx is omitted)
	var best *torrent.File
	for _, f := range files {
		if best == nil || f.Length() > best.Length() {
			best = f
		}
	}
	return best
}

func contentTypeFor(path string) string {
	switch strings.ToLower(filepath.Ext(path)) {
	case ".mp4", ".m4v":
		return "video/mp4"
	case ".webm":
		return "video/webm"
	case ".mkv":
		return "video/x-matroska"
	case ".avi":
		return "video/x-msvideo"
	case ".mov":
		return "video/quicktime"
	case ".mp3":
		return "audio/mpeg"
	default:
		return "application/octet-stream"
	}
}

// raw file bytes with Range support, served through a torrent.Reader
// whose readahead keeps the sliding priority window ahead of the reader.
func serveRaw(w http.ResponseWriter, r *http.Request, s *session, fileIdx int) {
	t := s.t
	select {
	case <-t.GotInfo():
	case <-time.After(60 * time.Second):
		http.Error(w, "torrent metadata not available yet", http.StatusGatewayTimeout)
		return
	}
	f := pickFile(t, fileIdx)
	if f == nil {
		http.Error(w, "no file", http.StatusNotFound)
		return
	}
	pinHeadTail(t, indexOfFile(t, f))
	rd := f.NewReader()
	// Sliding window: keep ~48MB of pieces prioritised ahead of the reader.
	rd.SetReadahead(48 << 20)
	defer rd.Close()
	w.Header().Set("Content-Type", contentTypeFor(f.DisplayPath()))
	w.Header().Set("Cache-Control", "private, no-store")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	logf("raw serve hash=%s file=%q range=%q", s.hash, f.DisplayPath(), r.Header.Get("Range"))
	http.ServeContent(w, r, f.DisplayPath(), time.Time{}, rd)
}

func indexOfFile(t *torrent.Torrent, target *torrent.File) int {
	for i, f := range t.Files() {
		if f == target {
			return i
		}
	}
	return -1
}

func handleRaw(w http.ResponseWriter, r *http.Request) {
	cors(w)
	parts := strings.Split(strings.TrimPrefix(r.URL.Path, "/raw/"), "/")
	if len(parts) != 2 {
		http.Error(w, "usage: /raw/{hash}/{fileIdx}", http.StatusBadRequest)
		return
	}
	idx, _ := strconv.Atoi(parts[1])
	s, err := getSession(strings.ToLower(parts[0]), parseTrackers(r))
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}
	s.lastUse = time.Now()
	serveRaw(w, r, s, idx)
}

// probe runs ffprobe against our own loopback raw stream (the torrent
// layer fetches head/tail pieces on demand) and caches the decision.
func handleProbe(w http.ResponseWriter, r *http.Request) {
	cors(w)
	hash := strings.ToLower(r.URL.Query().Get("hash"))
	idx, _ := strconv.Atoi(r.URL.Query().Get("file"))
	s, err := getSession(hash, parseTrackers(r))
	if err != nil {
		writeJSON(w, 400, map[string]string{"error": err.Error()})
		return
	}
	key := fmt.Sprintf("%s/%d", s.hash, idx)
	mu.Lock()
	if p, ok := probes[key]; ok {
		mu.Unlock()
		writeJSON(w, 200, p)
		return
	}
	mu.Unlock()

	select {
	case <-s.t.GotInfo():
	case <-time.After(60 * time.Second):
		writeJSON(w, 504, map[string]string{"error": "metadata timeout"})
		return
	}
	f := pickFile(s.t, idx)
	if f == nil {
		writeJSON(w, 404, map[string]string{"error": "no file"})
		return
	}
	rawURL := fmt.Sprintf("http://127.0.0.1%s/raw/%s/%d", listenAddr, s.hash, indexOfFile(s.t, f))
	logf("probe start hash=%s file=%q via %s", s.hash, f.DisplayPath(), rawURL)
	ctx, cancel := context.WithTimeout(r.Context(), 90*time.Second)
	defer cancel()
	cmd := exec.CommandContext(ctx, "ffprobe", "-v", "error",
		"-show_streams", "-show_format", "-of", "json", rawURL)
	out, err := cmd.Output()
	if err != nil {
		logf("probe failed hash=%s err=%v", s.hash, err)
		writeJSON(w, 502, map[string]string{"error": "ffprobe failed: " + err.Error()})
		return
	}
	var pj struct {
		Streams []struct {
			CodecType string `json:"codec_type"`
			CodecName string `json:"codec_name"`
			Width     int    `json:"width"`
			Height    int    `json:"height"`
		} `json:"streams"`
		Format struct {
			Name     string `json:"format_name"`
			Duration string `json:"duration"`
		} `json:"format"`
	}
	if err := json.Unmarshal(out, &pj); err != nil {
		writeJSON(w, 502, map[string]string{"error": "probe parse failed"})
		return
	}
	p := &probeResult{Container: pj.Format.Name, ProbedAt: time.Now()}
	p.DurationSec, _ = strconv.ParseFloat(pj.Format.Duration, 64)
	for _, st := range pj.Streams {
		if st.CodecType == "video" && p.VideoCodec == "" {
			p.VideoCodec = st.CodecName
			p.Width, p.Height = st.Width, st.Height
		}
		if st.CodecType == "audio" && p.AudioCodec == "" {
			p.AudioCodec = st.CodecName
		}
	}
	videoOK := p.VideoCodec == "h264" || p.VideoCodec == "av1"
	audioOK := p.AudioCodec == "" || p.AudioCodec == "aac" || p.AudioCodec == "mp3" || p.AudioCodec == "opus" || p.AudioCodec == "vorbis"
	containerOK := strings.Contains(p.Container, "mp4") || strings.Contains(p.Container, "webm") || strings.Contains(p.Container, "mov")
	switch {
	case videoOK && audioOK && containerOK:
		p.RawSafe = true
		p.Reason = "browser-safe as-is"
	case videoOK:
		p.VideoCopy = true
		p.Reason = fmt.Sprintf("remux: video %s copies, container %q / audio %q fixed to fragmented MP4 + AAC", p.VideoCodec, p.Container, p.AudioCodec)
	default:
		p.Reason = fmt.Sprintf("transcode: video %q is not browser-playable; converting to H.264 + AAC", p.VideoCodec)
	}
	logf("probe done hash=%s container=%q v=%q a=%q rawSafe=%v videoCopy=%v", s.hash, p.Container, p.VideoCodec, p.AudioCodec, p.RawSafe, p.VideoCopy)
	mu.Lock()
	probes[key] = p
	mu.Unlock()
	writeJSON(w, 200, p)
}

// play serves the browser-playable form: raw when safe, otherwise an
// ffmpeg fragmented-MP4 pipe (remux or transcode).
func handlePlay(w http.ResponseWriter, r *http.Request) {
	cors(w)
	parts := strings.Split(strings.TrimPrefix(r.URL.Path, "/play/"), "/")
	if len(parts) != 2 {
		http.Error(w, "usage: /play/{hash}/{fileIdx}", http.StatusBadRequest)
		return
	}
	idx, _ := strconv.Atoi(parts[1])
	s, err := getSession(strings.ToLower(parts[0]), parseTrackers(r))
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}
	s.lastUse = time.Now()
	key := fmt.Sprintf("%s/%d", s.hash, idx)
	mu.Lock()
	p := probes[key]
	mu.Unlock()
	if p != nil && p.RawSafe {
		logf("play raw (safe) hash=%s file=%d", s.hash, idx)
		serveRaw(w, r, s, idx)
		return
	}
	// ffmpeg pipe from the loopback raw stream.
	rawURL := fmt.Sprintf("http://127.0.0.1%s/raw/%s/%d", listenAddr, s.hash, idx)
	args := []string{"-hide_banner", "-loglevel", "error",
		"-reconnect", "1", "-reconnect_streamed", "1", "-reconnect_delay_max", "5",
		"-i", rawURL}
	if p != nil && p.VideoCopy {
		args = append(args, "-c:v", "copy")
	} else {
		args = append(args, "-c:v", "libx264", "-preset", "veryfast", "-crf", "23", "-pix_fmt", "yuv420p")
	}
	args = append(args,
		"-c:a", "aac", "-b:a", "160k",
		"-movflags", "frag_keyframe+empty_moov+default_base_moof",
		"-f", "mp4", "pipe:1")
	logf("play ffmpeg hash=%s file=%d args=%v", s.hash, idx, args)
	ctx, cancel := context.WithCancel(r.Context())
	defer cancel()
	cmd := exec.CommandContext(ctx, "ffmpeg", args...)
	stdout, err := cmd.StdoutPipe()
	if err != nil {
		http.Error(w, "ffmpeg pipe failed", http.StatusInternalServerError)
		return
	}
	cmd.Stderr = os.Stderr
	if err := cmd.Start(); err != nil {
		http.Error(w, "ffmpeg start failed", http.StatusInternalServerError)
		return
	}
	w.Header().Set("Content-Type", "video/mp4")
	w.Header().Set("Cache-Control", "private, no-store")
	w.WriteHeader(http.StatusOK)
	buf := make([]byte, 64<<10)
	for {
		n, rerr := stdout.Read(buf)
		if n > 0 {
			if _, werr := w.Write(buf[:n]); werr != nil {
				logf("play client gone hash=%s; stopping ffmpeg", s.hash)
				cancel()
				break
			}
			if fl, ok := w.(http.Flusher); ok {
				fl.Flush()
			}
		}
		if rerr != nil {
			break
		}
	}
	_ = cmd.Wait()
	logf("play ffmpeg ended hash=%s file=%d", s.hash, idx)
}

func main() {
	log.SetFlags(log.LstdFlags | log.Lmicroseconds)
	if err := os.MkdirAll(cacheDir, 0o755); err != nil {
		log.Fatal(err)
	}
	cfg := torrent.NewDefaultClientConfig()
	cfg.DataDir = cacheDir
	cfg.Seed = true
	cfg.NoDHT = false
	// This host blocks UDP sockets: force TCP peer connections so peer
	// slots are never wasted on uTP attempts that cannot connect.
	cfg.DisableUTP = true
	cfg.DisablePEX = false
	// Aggressive peer acquisition: high ceilings, no rate caps.
	cfg.EstablishedConnsPerTorrent = 200
	cfg.HalfOpenConnsPerTorrent = 120
	cfg.TotalHalfOpenConns = 240
	var err error
	client, err = torrent.NewClient(cfg)
	if err != nil {
		log.Fatal(err)
	}
	defer client.Close()
	logf("onion-stream up addr=%s cache=%s", listenAddr, cacheDir)

	mux := http.NewServeMux()
	mux.HandleFunc("/health", handleHealth)
	mux.HandleFunc("/api/start", handleStart)
	mux.HandleFunc("/api/status", handleStatus)
	mux.HandleFunc("/api/probe", handleProbe)
	mux.HandleFunc("/raw/", handleRaw)
	mux.HandleFunc("/play/", handlePlay)
	srv := &http.Server{Addr: listenAddr, Handler: mux}
	log.Fatal(srv.ListenAndServe())
}

// keep sort import used even if helpers change
var _ = sort.Ints
