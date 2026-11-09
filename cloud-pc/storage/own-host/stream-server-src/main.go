// Onion Stream Server — our own streaming server.
//
// It joins BitTorrent swarms itself and serves the file bytes over
// HTTP with Range support, speaking the fixed Onion TV app contract
// (/health, /api/start, /api/status, /play). No debrid service, no
// TorBox, no third-party cache, no quotas, no per-file size caps.
//
// Config (env):
//
//	ONION_STREAM_ADDR            listen address (default :11470;
//	                             $PORT is honoured when ADDR is unset)
//	ONION_STREAM_CACHE_DIR       data/cache directory (default ./cache;
//	                             legacy alias ONION_STREAM_CACHE)
//	ONION_STREAM_CACHE_MAX_BYTES disk-cache ceiling in bytes
//	                             (default 50 GiB; 0 = unlimited). A
//	                             disk-safety knob, NOT a quota: LRU
//	                             eviction protects in-progress and
//	                             recently played titles.
//	ONION_STREAM_PEER_PORT       torrent peer listen port (0 = auto)
//	ONION_STREAM_DHT             on (default) | off
//	ONION_STREAM_PEERS           comma-separated direct peers
//	                             (host:port) added to every torrent
//	ONION_STREAM_NO_TRACKERS     1 = skip the default tracker list
//
// Every state change, command, and request is logged with a timestamp.
package main

import (
	"log"
	"net/http"
	"os"
	"strconv"
	"strings"
	"time"

	"onionstream/internal/stream"
)

// version is the server version reported on /health.
const version = "1.0.0"

func envOr(k, d string) string {
	if v := os.Getenv(k); v != "" {
		return v
	}
	return d
}

func parseBytes(s string, def int64) int64 {
	if s == "" {
		return def
	}
	n, err := strconv.ParseInt(strings.TrimSpace(s), 10, 64)
	if err != nil || n < 0 {
		log.Printf("config: bad byte count %q — using default %d", s, def)
		return def
	}
	return n
}

func main() {
	log.SetFlags(log.LstdFlags | log.Lmicroseconds)
	log.Printf("onion-stream-server v%s starting", version)

	addr := os.Getenv("ONION_STREAM_ADDR")
	if addr == "" {
		if p := os.Getenv("PORT"); p != "" {
			addr = ":" + p // some hosts hand us a bare port
		} else {
			addr = ":11470"
		}
	}
	cacheDir := envOr("ONION_STREAM_CACHE_DIR", os.Getenv("ONION_STREAM_CACHE"))
	if cacheDir == "" {
		cacheDir = "cache"
	}
	const defaultCacheMax = 50 << 30 // 50 GiB
	cacheMax := parseBytes(os.Getenv("ONION_STREAM_CACHE_MAX_BYTES"), defaultCacheMax)
	peerPort, _ := strconv.Atoi(envOr("ONION_STREAM_PEER_PORT", "0"))
	dht := !strings.EqualFold(os.Getenv("ONION_STREAM_DHT"), "off")
	noTrackers := os.Getenv("ONION_STREAM_NO_TRACKERS") == "1"
	var defaultPeers []string
	for _, p := range strings.Split(os.Getenv("ONION_STREAM_PEERS"), ",") {
		if p = strings.TrimSpace(p); p != "" {
			defaultPeers = append(defaultPeers, p)
		}
	}
	log.Printf("config addr=%s cacheDir=%s cacheMax=%s peerPort=%d dht=%v noTrackers=%v defaultPeers=%v",
		addr, cacheDir, stream.HumanBytes(cacheMax), peerPort, dht, noTrackers, defaultPeers)
	log.Printf("config: NO API AUTH — the TV app sends no credentials to its streaming server; run on a trusted network or behind your own proxy")

	eng, err := stream.NewAnacrolixEngine(stream.EngineConfig{
		DataDir:           cacheDir,
		ListenPort:        peerPort,
		DHT:               dht,
		NoDefaultTrackers: noTrackers,
	})
	if err != nil {
		log.Fatalf("engine: %v", err)
	}
	defer eng.Close()

	cache := stream.NewCacheManager(cacheMax)
	srv := stream.NewServer(stream.Config{
		Version:      version,
		StartedAt:    time.Now(),
		CacheDir:     cacheDir,
		DefaultPeers: defaultPeers,
	}, eng, cache)

	httpSrv := &http.Server{Addr: addr, Handler: srv.Handler()}
	log.Printf("onion-stream-server listening on %s (cache %s)", addr, cacheDir)
	log.Fatal(httpSrv.ListenAndServe())
}
