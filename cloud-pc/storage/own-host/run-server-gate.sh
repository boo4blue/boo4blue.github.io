#!/usr/bin/env bash
# Own-host SERVER gate v2 — runs on a Cloud PC runner (cwd = cloud-pc/storage).
#
# Uses the NEW from-scratch Onion Stream Server (source staged in
# own-host/stream-server-src, copied from ~/workspace/onion-tv/stream-server
# — build/vet clean, 16/16 tests, loopback swarm gate passed there).
# Builds it, runs it on 127.0.0.1:11470, opens a cloudflared quick
# tunnel, publishes the URL mid-run (own-host/live/live-server.json,
# git push), runs the Sintel gate server-side (health -> start ->
# status poll -> /play Range), publishes results
# (own-host/live/gate-server.json), then holds the tunnel open until
# the pc.py 600 s shell budget is nearly spent so the parent can
# verify the public URL from the sandbox too.
set -u
T0=$(date +%s)
el() { echo $(( $(date +%s) - T0 )); }
log() { echo "[server-gate +$(el)s] $*"; }
OH="own-host"
mkdir -p "$OH/live"
REPO=$(cd ../.. && pwd)
HASH="08ada5a7a6183aae1e09d831df6748d566095a10"
SRV="http://127.0.0.1:11470"
log "start repo=$REPO"

IP=$(curl -s -m 10 https://ifconfig.me || echo unknown)
log "egress ip=$IP"

GO_BIN=$(command -v go || true)
[ -z "$GO_BIN" ] && GO_BIN=$(ls /opt/hostedtoolcache/go/*/x64/bin/go 2>/dev/null | sort -V | tail -1)
[ -z "$GO_BIN" ] && GO_BIN=$(ls /usr/local/go/bin/go 2>/dev/null)
if [ -z "$GO_BIN" ]; then log "FATAL no go toolchain"; exit 3; fi
log "go: $($GO_BIN version)"

( cd "$OH/stream-server-src" && GOTOOLCHAIN=auto GOFLAGS=-mod=mod GOPROXY=https://proxy.golang.org,direct \
    CGO_ENABLED=0 "$GO_BIN" build -buildvcs=false -o /tmp/onion-stream . ) \
  || { log "FATAL server build failed"; exit 4; }
log "server built"

mkdir -p /tmp/oscache
ONION_STREAM_ADDR="127.0.0.1:11470" ONION_STREAM_CACHE_DIR=/tmp/oscache \
ONION_STREAM_CACHE_MAX_BYTES=8589934592 \
  /tmp/onion-stream > /tmp/server.log 2>&1 &
for i in $(seq 1 30); do curl -s -m 2 $SRV/health >/dev/null && break; sleep 1; done
log "server health: $(curl -s -m 2 $SRV/health)"

if [ ! -x /tmp/cloudflared ]; then
  curl -sL -m 120 -o /tmp/cloudflared https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-amd64
  chmod +x /tmp/cloudflared
fi
/tmp/cloudflared tunnel --url http://127.0.0.1:11470 --no-autoupdate > /tmp/tunnel.log 2>&1 &
URL=""
for i in $(seq 1 45); do
  URL=$(grep -oE 'https://[a-z0-9-]+\.trycloudflare\.com' /tmp/tunnel.log | head -1)
  [ -n "$URL" ] && break
  sleep 2
done
if [ -z "$URL" ]; then log "FATAL no tunnel URL"; tail -5 /tmp/tunnel.log; exit 6; fi
log "tunnel url: $URL"
printf '%s\n' "$URL" > "$OH/live/stream-url.txt"
python3 - "$URL" "$IP" <<'PY'
import json, sys, time
doc = {"service": "onion-stream", "server": "stream-server (from-scratch)",
       "url": sys.argv[1], "egressIp": sys.argv[2],
       "started": int(time.time()), "job": "ownhost-server1"}
open("own-host/live/live-server.json", "w").write(json.dumps(doc, indent=1))
PY
( cd "$REPO" && git config user.name cloudpc && git config user.email cloudpc@local \
  && git add cloud-pc/storage/own-host/live/live-server.json cloud-pc/storage/own-host/live/stream-url.txt \
  && (git diff --cached --quiet || git commit -q -m "own-host: stream server session live") \
  && (git push -q origin HEAD:main || (git pull -q --rebase origin main && git push -q origin HEAD:main)) ) \
  && log "published live-server.json" || log "WARN mid-run publish failed"

# ---------- Sintel gate (server-side, against localhost) ----------
log "gate: start $HASH"
curl -s -m 30 "$SRV/api/start?hash=$HASH&title=Sintel&year=2010" | head -c 300; echo
GATE=$(python3 - "$SRV" "$HASH" <<'PY'
import json, sys, time, urllib.request
srv, h = sys.argv[1], sys.argv[2]
t0 = time.time(); info = False; maxpeers = 0; file5 = None; waited = 0
while time.time() - t0 < 200:
    try:
        with urllib.request.urlopen(f"{srv}/api/status?hash={h}&file=5", timeout=10) as r:
            st = json.load(r)
    except Exception:
        time.sleep(8); continue
    maxpeers = max(maxpeers, int(st.get("activePeers") or 0))
    fl = st.get("fileLengths") or []
    if len(fl) > 5:
        file5 = fl[5]
    if st.get("infoReady"):
        info = True; waited = int(time.time() - t0); break
    time.sleep(8)
print(json.dumps({"infoReady": info, "maxPeers": maxpeers, "file5Length": file5,
                  "waitedSec": waited or int(time.time() - t0)}))
PY
)
log "gate status poll: $GATE"
CODE=$(curl -s -o /tmp/play.bin -w "%{http_code}" -H "Range: bytes=0-1023" --max-time 150 "$SRV/play/$HASH/5" || echo 000)
MAGIC=$(python3 - <<'PY'
import os
d = open('/tmp/play.bin','rb').read() if os.path.exists('/tmp/play.bin') else b''
if len(d) >= 8 and d[4:8] == b'ftyp':
    print('ftyp')
elif len(d) >= 4 and d[:4] == bytes.fromhex('1a45dfa3'):
    print('ebml-matroska')
else:
    print('other:' + d[:8].hex())
PY
)
log "gate play: HTTP=$CODE magic=$MAGIC bytes=$(stat -c%s /tmp/play.bin 2>/dev/null || echo 0)"
python3 - "$GATE" "$CODE" "$MAGIC" "$IP" <<'PY'
import json, sys, time
g = json.loads(sys.argv[1])
g.update({"playHttp": int(sys.argv[2]), "playMagic": sys.argv[3],
          "egressIp": sys.argv[4], "at": int(time.time()),
          "hash": "08ada5a7a6183aae1e09d831df6748d566095a10"})
open("own-host/live/gate-server.json", "w").write(json.dumps(g, indent=1))
print("gate-server.json:", json.dumps(g))
PY
( cd "$REPO" && git config user.name cloudpc && git config user.email cloudpc@local \
  && git add cloud-pc/storage/own-host/live/gate-server.json \
  && (git diff --cached --quiet || git commit -q -m "own-host: server gate results") \
  && (git push -q origin HEAD:main || (git pull -q --rebase origin main && git push -q origin HEAD:main)) ) \
  && log "published gate-server.json" || log "WARN gate publish failed"
log "server log tail:"; tail -4 /tmp/server.log || true

while [ "$(el)" -lt 575 ]; do sleep 15; done
log "done"
