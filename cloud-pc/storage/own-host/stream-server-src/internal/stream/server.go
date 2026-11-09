package stream

import (
	"encoding/json"
	"log"
	"net/http"
	"os"
	"strconv"
	"strings"
	"sync"
	"time"
)

// Config for the HTTP server.
type Config struct {
	Version   string
	StartedAt time.Time
	// CacheDir is the engine's data directory. /health probes it for
	// writability: an engine whose disk is full or dead cannot serve,
	// and /health must say so (failover depends on it). Empty = the
	// storage probe is skipped (tests).
	CacheDir string
	// DefaultPeers are direct peers (host:port) added to every torrent
	// (env ONION_STREAM_PEERS): LAN setups and proof gates.
	DefaultPeers []string
}

// Server is the Onion Stream HTTP API — the fixed app contract:
//
//	GET /health                            {ok:true, service:"onion-stream", ...}
//	GET /api/start?hash=&tr=&title=&year=  register a torrent, returns status
//	GET /api/status?hash=&file=            session status + file list
//	GET /play/{hash}/{idx}                 the file's bytes, Range supported
//	GET /raw/{hash}/{idx}                  alias of /play (probe tooling)
//
// There is deliberately NO auth: the TV app sends no credentials to
// its streaming server (verified in OnionStream.java — only
// User-Agent and Accept headers). Run it on a trusted network or
// behind your own reverse proxy if you expose it.
type Server struct {
	cfg   Config
	eng   Engine
	cache *CacheManager
	mux   *http.ServeMux

	mu       sync.Mutex
	sessions map[string]*sessionMeta

	// Storage writability probe cache (see storageOK).
	probeMu  sync.Mutex
	probeAt  time.Time
	probeErr error
}

type sessionMeta struct {
	title   string
	year    string
	addedAt time.Time
}

// NewServer builds the API and wires cache evictions to engine purges.
func NewServer(cfg Config, eng Engine, cache *CacheManager) *Server {
	s := &Server{cfg: cfg, eng: eng, cache: cache, sessions: map[string]*sessionMeta{}}
	if cache.OnEvict == nil {
		cache.OnEvict = func(hash string, reason string) {
			log.Printf("cache evict purge hash=%s reason=%q", hash, reason)
			eng.Purge(hash)
			s.mu.Lock()
			delete(s.sessions, hash)
			s.mu.Unlock()
		}
	}
	m := http.NewServeMux()
	m.HandleFunc("GET /health", s.handleHealth)
	m.HandleFunc("GET /api/start", s.handleStart)
	m.HandleFunc("GET /api/status", s.handleStatus)
	m.HandleFunc("GET /play/{hash}/{idx}", s.handlePlay)
	m.HandleFunc("GET /raw/{hash}/{idx}", s.handlePlay)
	m.HandleFunc("GET /", s.handleRoot)
	s.mux = m
	log.Printf("server ready version=%s defaultPeers=%d cacheMax=%s", cfg.Version, len(cfg.DefaultPeers), HumanBytes(cache.MaxBytes()))
	return s
}

// Handler returns the root handler with request logging + CORS.
func (s *Server) Handler() http.Handler {
	return s.logRequests(s.cors(s.mux))
}

func (s *Server) cors(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Set("Access-Control-Allow-Methods", "GET, OPTIONS")
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type, Range")
		if r.Method == http.MethodOptions {
			w.WriteHeader(http.StatusNoContent)
			return
		}
		next.ServeHTTP(w, r)
	})
}

type statusWriter struct {
	http.ResponseWriter
	code int
}

func (w *statusWriter) WriteHeader(code int) {
	w.code = code
	w.ResponseWriter.WriteHeader(code)
}

func (s *Server) logRequests(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		start := time.Now()
		sw := &statusWriter{ResponseWriter: w, code: 200}
		next.ServeHTTP(sw, r)
		// Path only: query strings are never logged.
		log.Printf("http %s %s -> %d in %s", r.Method, r.URL.Path, sw.code, time.Since(start).Round(time.Millisecond))
	})
}

func writeJSON(w http.ResponseWriter, code int, v interface{}) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(code)
	_ = json.NewEncoder(w).Encode(v)
}

func writeErr(w http.ResponseWriter, code int, msg string) {
	writeJSON(w, code, map[string]interface{}{"ok": false, "error": msg})
}

// ---- request parsing helpers ----

// parseTrackers collects the repeated (and comma-joined) tr= params.
func parseTrackers(r *http.Request) []string {
	var out []string
	for _, v := range r.URL.Query()["tr"] {
		for _, part := range strings.Split(v, ",") {
			if p := strings.TrimSpace(part); p != "" {
				out = append(out, p)
			}
		}
	}
	return out
}

// storageOK reports whether the cache directory is writable right
// now, probing at most once every 5 s (create + write + remove a
// temp file). A full or dead disk means the engine cannot take new
// pieces — /health must not claim ok in that state.
func (s *Server) storageOK() (bool, string) {
	if s.cfg.CacheDir == "" {
		return true, ""
	}
	s.probeMu.Lock()
	defer s.probeMu.Unlock()
	if time.Since(s.probeAt) < 5*time.Second && s.probeAt != (time.Time{}) {
		if s.probeErr != nil {
			return false, s.probeErr.Error()
		}
		return true, ""
	}
	f, err := os.CreateTemp(s.cfg.CacheDir, ".health-*")
	if err == nil {
		_, err = f.Write([]byte{0})
		_ = f.Close()
		_ = os.Remove(f.Name())
	}
	s.probeAt = time.Now()
	s.probeErr = err
	if err != nil {
		log.Printf("health storage probe FAILED dir=%s err=%v", s.cfg.CacheDir, err)
		return false, err.Error()
	}
	return true, ""
}

// healthy is the server's honest answer to "can you serve right
// now": engine alive AND storage writable.
func (s *Server) healthy() (bool, string, string) {
	engine := "up"
	if !s.eng.Healthy() {
		engine = "down"
	}
	storOK, storErr := s.storageOK()
	storage := "ok"
	if !storOK {
		storage = "error: " + storErr
	}
	return engine == "up" && storOK, engine, storage
}

// ensureSession registers the torrent with the engine (idempotent),
// records title/year identity, injects direct peers, and refreshes
// the cache manager's progress view. Returns the normalised hash.
// It fails closed (503) when the engine is down: acknowledging a
// start we cannot serve would send the player into a dead wait.
func (s *Server) ensureSession(w http.ResponseWriter, r *http.Request) (string, bool) {
	if !s.eng.Healthy() {
		log.Printf("api refused: engine down (%s %s)", r.Method, r.URL.Path)
		writeErr(w, http.StatusServiceUnavailable, "engine down")
		return "", false
	}
	raw := r.URL.Query().Get("hash")
	if raw == "" {
		raw = r.URL.Query().Get("magnet")
	}
	hash, err := NormalizeHash(raw)
	if err != nil {
		writeErr(w, http.StatusBadRequest, "bad hash: "+err.Error())
		return "", false
	}
	trackers := parseTrackers(r)
	if strings.HasPrefix(strings.ToLower(raw), "magnet:") {
		if _, err := s.eng.AddMagnet(raw); err != nil {
			writeErr(w, http.StatusBadRequest, err.Error())
			return "", false
		}
	} else if err := s.eng.AddInfoHash(hash, trackers); err != nil {
		writeErr(w, http.StatusBadRequest, err.Error())
		return "", false
	}
	s.mu.Lock()
	meta, seen := s.sessions[hash]
	if !seen {
		meta = &sessionMeta{addedAt: time.Now()}
		s.sessions[hash] = meta
	}
	if t := r.URL.Query().Get("title"); t != "" {
		meta.title = t
		meta.year = r.URL.Query().Get("year")
	}
	title, year := meta.title, meta.year
	s.mu.Unlock()
	if !seen {
		log.Printf("session start hash=%s title=%q year=%s trackers=%d", hash, title, year, len(trackers))
	}
	// Direct peers: configured defaults + per-request peer= params.
	peers := append([]string{}, s.cfg.DefaultPeers...)
	peers = append(peers, r.URL.Query()["peer"]...)
	for _, p := range peers {
		if p = strings.TrimSpace(p); p != "" {
			if err := s.eng.AddPeer(hash, p); err != nil {
				log.Printf("session peer hash=%s addr=%s err=%v", hash, p, err)
			}
		}
	}
	s.cache.Touch(hash)
	s.refreshProgress(hash)
	return hash, true
}

// refreshProgress pulls the engine snapshot into the cache manager.
func (s *Server) refreshProgress(hash string) {
	if info, ok := s.eng.Info(hash); ok && info.MetaReady {
		s.cache.SetProgress(hash, info.BytesCompleted, info.Complete())
	}
}

// statusBody builds the /api/start + /api/status response. The files
// array and the flat fileLengths array share the torrent's own file
// order — index i in both is /play/<hash>/i.
func (s *Server) statusBody(hash string) map[string]interface{} {
	info, known := s.eng.Info(hash)
	s.mu.Lock()
	meta := s.sessions[hash]
	s.mu.Unlock()
	out := map[string]interface{}{
		"ok":       true,
		"answered": true,
		"hash":     hash,
		"time":     time.Now().Unix(),
	}
	if meta != nil {
		out["forTitle"] = meta.title
		out["forYear"] = meta.year
		out["addedAt"] = meta.addedAt.Unix()
	}
	if !known {
		out["infoReady"] = false
		out["activePeers"] = 0
		out["speedBps"] = int64(0)
		out["files"] = []FileEntry{}
		out["fileLengths"] = []int64{}
		return out
	}
	out["infoReady"] = info.MetaReady
	out["activePeers"] = info.ActivePeers
	out["totalPeers"] = info.TotalPeers
	out["seeders"] = info.Seeders
	out["speedBps"] = int64(info.SpeedBps)
	if info.MetaReady {
		out["name"] = info.Name
		files := info.Files
		if files == nil {
			files = []FileEntry{}
		}
		lengths := make([]int64, len(files))
		for i, f := range files {
			lengths[i] = f.Length
		}
		out["files"] = files
		out["fileLengths"] = lengths
		out["totalLength"] = info.TotalLength
		out["bytesCompleted"] = info.BytesCompleted
		if idx, reason, ok := PickMainFile(files); ok {
			out["selectedFile"] = idx
			out["pickReason"] = reason
		} else {
			out["selectedFile"] = -1
			out["pickReason"] = reason
		}
	} else {
		out["files"] = []FileEntry{}
		out["fileLengths"] = []int64{}
	}
	return out
}

// ---- handlers ----

func (s *Server) handleRoot(w http.ResponseWriter, r *http.Request) {
	if r.URL.Path != "/" {
		writeErr(w, http.StatusNotFound, "not found")
		return
	}
	writeJSON(w, http.StatusOK, map[string]interface{}{
		"ok": true, "service": "onion-stream", "version": s.cfg.Version,
		"endpoints": []string{"/health", "/api/start", "/api/status", "/play/{hash}/{idx}"},
	})
}

func (s *Server) handleHealth(w http.ResponseWriter, r *http.Request) {
	s.mu.Lock()
	n := len(s.sessions)
	s.mu.Unlock()
	// HONEST HEALTH (this server is the MAIN streamer; a failover
	// router probes this endpoint): ok:true is claimed ONLY when the
	// engine is alive and the cache disk is writable. Anything else
	// answers 503 with ok:false and the reason, so traffic fails
	// over to the backup instead of dying here.
	ok, engine, storage := s.healthy()
	code := http.StatusOK
	if !ok {
		code = http.StatusServiceUnavailable
		log.Printf("health NOT OK engine=%s storage=%s", engine, storage)
	}
	writeJSON(w, code, map[string]interface{}{
		"ok":            ok,
		"service":       "onion-stream",
		"version":       s.cfg.Version,
		"engine":        engine,
		"storage":       storage,
		"torrents":      n,
		"cacheBytes":    s.cache.TotalBytes(),
		"cacheMaxBytes": s.cache.MaxBytes(),
		"uptimeSec":     int(time.Since(s.cfg.StartedAt).Seconds()),
		"time":          time.Now().Unix(),
	})
}

func (s *Server) handleStart(w http.ResponseWriter, r *http.Request) {
	hash, ok := s.ensureSession(w, r)
	if !ok {
		return
	}
	log.Printf("api start hash=%s", hash)
	writeJSON(w, http.StatusOK, s.statusBody(hash))
	// Eviction runs async: the start acknowledgement must stay fast
	// even when the cache needs a purge sweep.
	go s.cache.Enforce(hash)
}

func (s *Server) handleStatus(w http.ResponseWriter, r *http.Request) {
	hash, ok := s.ensureSession(w, r)
	if !ok {
		return
	}
	// A status ask naming a file prioritises that file for streaming.
	if idxStr := r.URL.Query().Get("file"); idxStr != "" {
		if idx, err := strconv.Atoi(idxStr); err == nil {
			if info, known := s.eng.Info(hash); known && info.MetaReady {
				if err := s.eng.SelectFile(hash, idx); err != nil {
					log.Printf("api status select hash=%s file=%d err=%v", hash, idx, err)
				} else {
					log.Printf("api status select hash=%s file=%d", hash, idx)
				}
			}
		}
	}
	body := s.statusBody(hash)
	log.Printf("api status hash=%s infoReady=%v peers=%v speedBps=%v files=%v",
		hash, body["infoReady"], body["activePeers"], body["speedBps"], len(body["fileLengths"].([]int64)))
	writeJSON(w, http.StatusOK, body)
	go s.cache.Enforce(hash)
}

// handlePlay serves the file's own bytes with full Range support,
// streamed from the swarm through the engine reader (never a
// redirect). http.ServeContent drives the Range math (206,
// Content-Range, Accept-Ranges) over the seekable torrent reader.
func (s *Server) handlePlay(w http.ResponseWriter, r *http.Request) {
	hash, err := NormalizeHash(r.PathValue("hash"))
	if err != nil {
		writeErr(w, http.StatusBadRequest, "bad hash: "+err.Error())
		return
	}
	idx, err := strconv.Atoi(r.PathValue("idx"))
	if err != nil || idx < 0 {
		writeErr(w, http.StatusBadRequest, "bad file index")
		return
	}
	if !s.eng.Healthy() {
		writeErr(w, http.StatusServiceUnavailable, "engine down")
		return
	}
	if _, known := s.eng.Info(hash); !known {
		writeErr(w, http.StatusNotFound, "unknown hash — call /api/start first")
		return
	}
	// Wait (briefly) for metadata: a player may hit /play the moment
	// /api/start returns.
	deadline := time.Now().Add(60 * time.Second)
	for {
		info, _ := s.eng.Info(hash)
		if info.MetaReady {
			break
		}
		if time.Now().After(deadline) {
			writeErr(w, http.StatusGatewayTimeout, "torrent metadata not available yet")
			return
		}
		select {
		case <-r.Context().Done():
			return
		case <-time.After(250 * time.Millisecond):
		}
	}
	info, _ := s.eng.Info(hash)
	if idx >= len(info.Files) {
		writeErr(w, http.StatusNotFound, "file index out of range")
		return
	}
	f := info.Files[idx]
	if err := s.eng.SelectFile(hash, idx); err != nil {
		log.Printf("play select hash=%s file=%d err=%v", hash, idx, err)
	}
	s.refreshProgress(hash)
	s.cache.BeginPlay(hash)
	defer func() {
		s.cache.EndPlay(hash)
		s.refreshProgress(hash)
	}()
	rd, _, err := s.eng.OpenFile(r.Context(), hash, idx)
	if err != nil {
		writeErr(w, http.StatusBadGateway, err.Error())
		return
	}
	defer rd.Close()
	log.Printf("play hash=%s file=%d path=%q length=%d range=%q", hash, idx, f.Path, f.Length, r.Header.Get("Range"))
	w.Header().Set("Accept-Ranges", "bytes")
	w.Header().Set("Content-Type", contentTypeFor(f.Path))
	w.Header().Set("Cache-Control", "private, no-store")
	http.ServeContent(w, r, f.Path, time.Time{}, rd)
}

func contentTypeFor(path string) string {
	switch fileExt(path) {
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
