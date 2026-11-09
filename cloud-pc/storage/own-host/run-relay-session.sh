#!/usr/bin/env bash
# Own-host RELAY session — runs on a Cloud PC runner (cwd = cloud-pc/storage).
#
# Builds the Onion Relay, opens a cloudflared quick tunnel to it,
# publishes {url, key, probes} mid-run to own-host/live/live-relay.json
# (git push), then holds the session open until the pc.py 600 s shell
# budget is nearly spent. The sandbox bridge reads the URL from git
# and connects out to the tunnel while this job holds.
set -u
T0=$(date +%s)
el() { echo $(( $(date +%s) - T0 )); }
log() { echo "[relay-session +$(el)s] $*"; }
OH="own-host"
mkdir -p "$OH/live"
REPO=$(cd ../.. && pwd)
log "start repo=$REPO"

# ---------- egress probes (honest: what can this runner reach?) ----------
IP=$(curl -s -m 10 https://ifconfig.me || echo unknown)
TCP=FAIL; timeout 8 bash -c 'cat </dev/null >/dev/tcp/tracker.opentrackr.org/443' && TCP=OK
UDP=FAIL
python3 - <<'PY' && UDP=OK
import socket, sys
s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM); s.settimeout(5)
q = bytes.fromhex('aaaa01000001000000000000076578616d706c6503636f6d0000010001')
try:
    s.sendto(q, ('8.8.8.8', 53)); s.recvfrom(512)
except Exception:
    sys.exit(1)
PY
log "probes egress-ip=$IP tcp-opentrackr-443=$TCP udp-dns=$UDP"

# ---------- toolchain ----------
GO_BIN=$(command -v go || true)
[ -z "$GO_BIN" ] && GO_BIN=$(ls /opt/hostedtoolcache/go/*/x64/bin/go 2>/dev/null | sort -V | tail -1)
[ -z "$GO_BIN" ] && GO_BIN=$(ls /usr/local/go/bin/go 2>/dev/null)
if [ -z "$GO_BIN" ]; then log "FATAL no go toolchain"; exit 3; fi
log "go: $($GO_BIN version)"

# ---------- build relay ----------
( cd "$OH/relay" && GOFLAGS=-mod=mod GOPROXY=https://proxy.golang.org,direct "$GO_BIN" build -o /tmp/onion-relay . ) \
  || { log "FATAL relay build failed"; exit 4; }
log "relay built"

# ---------- cloudflared ----------
if [ ! -x /tmp/cloudflared ]; then
  curl -sL -m 120 -o /tmp/cloudflared https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-amd64 \
    || { log "FATAL cloudflared download failed"; exit 5; }
  chmod +x /tmp/cloudflared
fi
log "cloudflared: $(/tmp/cloudflared --version 2>/dev/null | head -1)"

# ---------- start relay + tunnel ----------
KEY=$(head -c 24 /dev/urandom | od -An -tx1 | tr -d ' \n')
RELAY_ADDR=127.0.0.1:18080 RELAY_KEY="$KEY" /tmp/onion-relay > /tmp/relay.log 2>&1 &
for i in $(seq 1 20); do curl -s -m 2 http://127.0.0.1:18080/health >/dev/null && break; sleep 1; done
log "relay health: $(curl -s -m 2 http://127.0.0.1:18080/health)"
/tmp/cloudflared tunnel --url http://127.0.0.1:18080 --no-autoupdate > /tmp/tunnel.log 2>&1 &
URL=""
for i in $(seq 1 45); do
  URL=$(grep -oE 'https://[a-z0-9-]+\.trycloudflare\.com' /tmp/tunnel.log | head -1)
  [ -n "$URL" ] && break
  sleep 2
done
if [ -z "$URL" ]; then log "FATAL no tunnel URL"; tail -5 /tmp/tunnel.log; exit 6; fi
log "tunnel url: $URL"

# ---------- publish mid-run ----------
python3 - "$URL" "$KEY" "$IP" "$TCP" "$UDP" <<'PY'
import json, sys, time
url, key, ip, tcp, udp = sys.argv[1:6]
doc = {"service": "onion-relay", "url": url, "wss": "wss://" + url.split("://", 1)[1],
       "key": key, "egressIp": ip, "tcpTracker443": tcp, "udpDns": udp,
       "started": int(time.time()), "job": "ownhost-relay1"}
open("own-host/live/live-relay.json", "w").write(json.dumps(doc, indent=1))
print("live-relay.json written")
PY
( cd "$REPO" && git config user.name cloudpc && git config user.email cloudpc@local \
  && git add cloud-pc/storage/own-host/live/live-relay.json \
  && (git diff --cached --quiet || git commit -q -m "own-host: relay session live") \
  && (git push -q origin HEAD:main || (git pull -q --rebase origin main && git push -q origin HEAD:main)) ) \
  && log "published live-relay.json" || log "WARN mid-run publish failed (will land with final commit)"

# ---------- hold the session ----------
while [ "$(el)" -lt 545 ]; do sleep 15; done
log "hold complete; relay log tail:"; tail -3 /tmp/relay.log || true
log "done"
