#!/usr/bin/env bash
# Own-host SERVER gate — runs on a Cloud PC runner (cwd = cloud-pc/storage).
#
# Builds the existing Onion Stream server from own-host/server-src,
# runs it, opens a cloudflared quick tunnel, publishes the URL mid-run
# (own-host/live/live-server.json), then runs the Sintel gate against
# the LOCAL server: /health -> /api/start -> poll /api/status for
# infoReady + activePeers>0 -> /play/<hash>/5 Range 0-1023 expecting
# media bytes (ftyp). Results land in own-host/live/gate-server.json.
# Holds the tunnel open until the 600 s shell budget is nearly spent
# so the parent can verify the public URL from the sandbox too.
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

if command -v ffmpeg >/dev/null; then
  log "ffmpeg present: $(ffmpeg -version 2>/dev/null | head -1)"
else
  log "ffmpeg missing; installing"
  sudo apt-get update -qq >/dev/null 2>&1
  sudo apt-get install -y -qq ffmpeg >/dev/null 2>&1
  log "ffmpeg now: $(ffmpeg -version 2>/dev/null | head -1 || echo STILL-MISSING)"
fi

( cd "$OH/server-src" && GOTOOLCHAIN=auto GOFLAGS=-mod=mod GOPROXY=https://proxy.golang.org,direct \
    "$GO_BIN" build -o /tmp/onion-stream . ) || { log "FATAL server build failed"; exit 4; }
log "server built"

mkdir -p /tmp/oscache
ONION_STREAM_ADDR=":11470" ONION_STREAM_CACHE=/tmp/oscache /tmp/onion-stream > /tmp/server.log 2>&1 &
for i in $(seq 1 25); do curl -s -m 2 $SRV/health >/dev/null && break; sleep 1; done
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
python3 - "$URL" "$IP" <<'PY'
import json, sys, time
doc = {"service": "onion-stream", "url": sys.argv[1], "egressIp": sys.argv[2],
       "started": int(time.time()), "job": "ownhost-server1"}
open("own-host/live/live-server.json", "w").write(json.dumps(doc, indent=1))
PY
( cd "$REPO" && git config user.name cloudpc && git config user.email cloudpc@local \
  && git add cloud-pc/storage/own-host/live/live-server.json \
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
    files = st.get("files") or []
    if len(files) > 5:
        file5 = files[5].get("length")
    if st.get("infoReady"):
        info = True; waited = int(time.time() - t0); break
    time.sleep(8)
print(json.dumps({"infoReady": info, "maxPeers": maxpeers, "file5Length": file5,
                  "waitedSec": waited or int(time.time() - t0)}))
PY
)
log "gate status poll: $GATE"
probe_play() { # $1 = path prefix (/play or /raw)
  local code
  code=$(curl -s -o /tmp/play.bin -w "%{http_code}" -r 0-1023 --max-time 150 "$SRV$1/$HASH/5" || echo 000)
  local ftyp="no"
  python3 -c "
d = open('/tmp/play.bin','rb').read() if __import__('os').path.exists('/tmp/play.bin') else b''
import sys; sys.exit(0 if len(d) >= 8 and d[4:8] == b'ftyp' else 1)" && ftyp="yes"
  echo "$code/$ftyp"
}
PLAY=$(probe_play /play)
RAW=$(probe_play /raw)
log "gate play: HTTP/ftyp=$PLAY raw: HTTP/ftyp=$RAW"
python3 - "$GATE" "$PLAY" "$RAW" "$IP" <<'PY'
import json, sys, time
g = json.loads(sys.argv[1])
pc, pf = sys.argv[2].split("/"); rc, rf = sys.argv[3].split("/")
g.update({"playHttp": int(pc), "playFtyp": pf == "yes",
          "rawHttp": int(rc), "rawFtyp": rf == "yes",
          "egressIp": sys.argv[4], "at": int(time.time()), "hash": "08ada5a7a6183aae1e09d831df6748d566095a10"})
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
