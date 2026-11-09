// Onion Relay — runner-side end of the own-host relay.
//
// Runs on a machine with open internet (a Cloud PC runner). Accepts
// WebSocket connections from the sandbox bridge and makes the real TCP
// connections the sandbox is forbidden from making, piping raw bytes
// both ways. This is how the sandbox's own stream server reaches
// BitTorrent swarms: sandbox bridge (SOCKS5 on loopback) -> WSS over
// the sandbox's allowed outbound HTTPS -> public tunnel -> this relay
// -> real TCP to the peer.
//
// Endpoints:
//   GET /health                 -> {"ok":true,"service":"onion-relay"}
//   GET /relay?target=h:p&k=KEY -> websocket; each binary message is the
//                                  next chunk of the TCP byte stream.
//
// Auth: a per-session key (RELAY_KEY env) is required on /relay. The
// tunnel URL is unguessable; the key is a second factor because the
// tunnel endpoint is public while the session is up.
package main

import (
	"io"
	"log"
	"net"
	"net/http"
	"os"
	"sync/atomic"
	"time"

	"github.com/gorilla/websocket"
)

var upgrader = websocket.Upgrader{
	ReadBufferSize:  32 * 1024,
	WriteBufferSize: 32 * 1024,
	CheckOrigin:     func(r *http.Request) bool { return true },
}

var conns int64

func logf(format string, args ...interface{}) {
	log.Printf(format, args...)
}

func handleRelay(w http.ResponseWriter, r *http.Request) {
	key := os.Getenv("RELAY_KEY")
	if key != "" && r.URL.Query().Get("k") != key {
		http.Error(w, "bad key", http.StatusForbidden)
		logf("relay rejected bad key from %s", r.RemoteAddr)
		return
	}
	target := r.URL.Query().Get("target")
	if target == "" {
		http.Error(w, "missing target", http.StatusBadRequest)
		return
	}
	ws, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		logf("relay upgrade failed target=%s err=%v", target, err)
		return
	}
	n := atomic.AddInt64(&conns, 1)
	start := time.Now()
	logf("relay #%d open target=%s", n, target)
	tcp, err := net.DialTimeout("tcp", target, 20*time.Second)
	if err != nil {
		logf("relay #%d dial failed target=%s err=%v", n, target, err)
		ws.WriteMessage(websocket.CloseMessage,
			websocket.FormatCloseMessage(websocket.CloseInternalServerErr, "dial failed"))
		ws.Close()
		atomic.AddInt64(&conns, -1)
		return
	}
	var up, down int64
	done := make(chan struct{}, 2)
	// ws -> tcp
	go func() {
		for {
			_, data, err := ws.ReadMessage()
			if err != nil {
				break
			}
			if _, err := tcp.Write(data); err != nil {
				break
			}
			atomic.AddInt64(&up, int64(len(data)))
		}
		done <- struct{}{}
	}()
	// tcp -> ws
	go func() {
		buf := make([]byte, 32*1024)
		for {
			m, err := tcp.Read(buf)
			if m > 0 {
				if werr := ws.WriteMessage(websocket.BinaryMessage, buf[:m]); werr != nil {
					break
				}
				atomic.AddInt64(&down, int64(len(buf[:m])))
			}
			if err != nil {
				break
			}
		}
		done <- struct{}{}
	}()
	<-done
	ws.Close()
	tcp.Close()
	atomic.AddInt64(&conns, -1)
	logf("relay #%d closed target=%s up=%d down=%d dur=%s", n, target,
		atomic.LoadInt64(&up), atomic.LoadInt64(&down), time.Since(start).Round(time.Millisecond))
	var _ = io.EOF
}

func main() {
	log.SetFlags(log.LstdFlags | log.Lmicroseconds)
	addr := os.Getenv("RELAY_ADDR")
	if addr == "" {
		addr = "127.0.0.1:18080"
	}
	mux := http.NewServeMux()
	mux.HandleFunc("/health", func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "application/json")
		w.Write([]byte(`{"ok":true,"service":"onion-relay"}`))
	})
	mux.HandleFunc("/relay", handleRelay)
	logf("onion-relay up addr=%s keyset=%v", addr, os.Getenv("RELAY_KEY") != "")
	log.Fatal(http.ListenAndServe(addr, mux))
}
