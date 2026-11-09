#!/usr/bin/env bash
# COMBO session v1 — runs on a Cloud PC runner (cwd = cloud-pc/storage).
#
# Blaze's every-server order (2026-11-09 11:20 CST) made LIVE: one
# runner session boots the whole failover bench together —
#   own server (Go, from-scratch Onion Stream, port 11470, no auth)
#   TorrServer (port 8090, --httpauth, accs.db Basic Auth)
#   rqbit      (port 3030, plain rqbit-linux-amd64 server asset,
#               RQBIT_HTTP_BASIC_AUTH_USERPASS, positional OUTPUT_FOLDER)
#   WebTorrent (port 8080, ESM wrapper, wrapper-level Basic Auth) —
#               boots for continued proof ONLY; its base is published
#               to live-webtorrent.json, never to the router (no
#               router adapter for it yet).
# Each server gets its own trycloudflare tunnel. Live files publish
# mid-run (live-server.json / live-torrserver.json / live-rqbit.json /
# live-webtorrent.json) + a combo-results.json summary. Credentials
# for THIS run live in own-host/live/combo-auth.txt (and the legacy
# multiserver-auth.txt name, same content) — repo files only, never
# anywhere else.
#
# API shapes are the trial-proven ones (MULTISERVER-TRIAL.md):
#   TorrServer add:  POST /torrents {"action":"add","link":..,"title":..}
#   TorrServer get:  POST /torrents {"action":"get","hash":..} (counters
#                    at TOP level; "stat" is an int state code)
#   TorrServer play: GET /stream?link=<hash>&index=<file_stats.id>&play=1
#                    or GET /play/<hash>/<file_stats.id>  (NEVER
#                    /stream/<filename> — that returns 200 with 0 bytes;
#                    Sintel.mp4 is file_stats id 6)
#   rqbit add:       POST /torrents, body = raw magnet text -> {"id":0,..}
#   rqbit stream:    GET /torrents/<id>/stream/<file_idx> (Sintel.mp4 = 5)
#   own:             GET /api/start?hash=, GET /api/status?hash=,
#                    GET /play/<hash>/<idx> (Sintel.mp4 = 5)
set -u
T0=$(date +%s)
el() { echo $(( $(date +%s) - T0 )); }
log() { echo "[combo1 +$(el)s] $*"; }
OH="own-host"
mkdir -p "$OH/live"
REPO=$(cd ../.. && pwd)
HASH="08ada5a7a6183aae1e09d831df6748d566095a10"
MAGNET="magnet:?xt=urn:btih:${HASH}&dn=Sintel&tr=udp%3A%2F%2Ftracker.opentrackr.org%3A1337%2Fannounce&tr=udp%3A%2F%2Fopen.stealth.si%3A80%2Fannounce&tr=udp%3A%2F%2Ftracker.torrent.eu.org%3A451%2Fannounce&tr=udp%3A%2F%2Fexodus.desync.com%3A6969%2Fannounce&tr=udp%3A%2F%2Fopenbittorrent.com%3A6969%2Fannounce"
JOB="ownhost-combo1"
log "start repo=$REPO"
IP=$(curl -s -m 10 https://ifconfig.me || echo unknown)
log "egress ip=$IP"

push_files() {
  ( cd "$REPO" && git config user.name cloudpc && git config user.email cloudpc@local \
    && git add "$@" \
    && (git diff --cached --quiet || git commit -q -m "own-host: combo session update") \
    && (git push -q origin HEAD:main || (git pull -q --rebase origin main && git push -q origin HEAD:main)) ) \
    && log "pushed: $*" || log "WARN push failed: $*"
}

# ---------- credentials (this run only) ----------
TS_USER="onion"; TS_PASS=$(head -c 12 /dev/urandom | od -An -tx1 | tr -d ' \n')
RQ_USER="onion"; RQ_PASS=$(head -c 12 /dev/urandom | od -An -tx1 | tr -d ' \n')
WT_USER="onion"; WT_PASS=$(head -c 12 /dev/urandom | od -An -tx1 | tr -d ' \n')
for F in combo-auth.txt multiserver-auth.txt; do
cat > "$OH/live/$F" <<EOF
# Combo session credentials — generated on the Cloud PC runner $(date -u +%FT%TZ)
# These protect this session's trycloudflare-exposed servers (job $JOB).
torrserver user=$TS_USER pass=$TS_PASS
rqbit user=$RQ_USER pass=$RQ_PASS
webtorrent user=$WT_USER pass=$WT_PASS
EOF
done
push_files cloud-pc/storage/own-host/live/combo-auth.txt cloud-pc/storage/own-host/live/multiserver-auth.txt

# ---------- parallel downloads / builds ----------
if [ ! -x /tmp/cloudflared ]; then
  curl -sL -m 120 -o /tmp/cloudflared https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-amd64 \
    || { log "FATAL cloudflared download failed"; exit 5; }
  chmod +x /tmp/cloudflared
fi
log "cloudflared: $(/tmp/cloudflared --version 2>/dev/null | head -1)"

dl_asset() {
  local api url
  api=$(curl -s -m 30 "https://api.github.com/repos/$1/releases/latest")
  url=$(printf '%s' "$api" | grep -oE '"browser_download_url": "[^"]+"' | cut -d'"' -f4 | grep -E "$2" | head -1)
  if [ -z "$url" ]; then log "FATAL no asset match for $1 ($2)"; return 1; fi
  log "downloading $url"
  curl -sL -m 240 -o "$3" "$url" || return 1
  chmod +x "$3"
}
dl_asset "YouROK/TorrServer" '/TorrServer-linux-amd64$' /tmp/torrserver & DL_TS=$!
dl_asset "ikatson/rqbit" '/rqbit-linux-amd64$' /tmp/rqbit & DL_RQ=$!
GO_BIN=$(command -v go || true)
[ -z "$GO_BIN" ] && GO_BIN=$(ls /opt/hostedtoolcache/go/*/x64/bin/go 2>/dev/null | sort -V | tail -1)
[ -z "$GO_BIN" ] && GO_BIN=$(ls /usr/local/go/bin/go 2>/dev/null)
( cd "$OH/stream-server-src" && GOTOOLCHAIN=auto GOFLAGS=-mod=mod GOPROXY=https://proxy.golang.org,direct \
    CGO_ENABLED=0 "$GO_BIN" build -buildvcs=false -o /tmp/onion-stream . ) > /tmp/own-build.log 2>&1 & DL_OWN=$!
# WebTorrent install warms in the background the whole run.
mkdir -p /tmp/wt
cat > /tmp/wt/server.mjs <<'JS'
import http from 'node:http';
import WebTorrent from 'webtorrent';
const client = new WebTorrent();
let tor = null;
client.add(process.env.MAGNET, { path: '/tmp/wt-data' }, t => { tor = t; console.log('wt ready', t.files.map(f => f.path).join(',')); });
client.on('error', e => console.log('wt client error', e.message));
function authed(req) {
  return (req.headers.authorization || '') === 'Basic ' + Buffer.from(process.env.WTU + ':' + process.env.WTP).toString('base64');
}
http.createServer((req, res) => {
  if (!authed(req)) { res.writeHead(401, { 'WWW-Authenticate': 'Basic realm="wt"' }); res.end(); return; }
  if (req.url === '/status') { res.end(JSON.stringify({ ready: !!tor, peers: tor ? tor.numPeers : 0, files: tor ? tor.files.map(f => f.path) : [] })); return; }
  const m = req.url.match(/^\/stream\/(\d+)$/);
  if (!m || !tor) { res.writeHead(404); res.end(); return; }
  const f = tor.files[+m[1]];
  const range = req.headers.range;
  if (range) {
    const p = range.replace(/bytes=/, '').split('-');
    const s = +p[0]; const e = p[1] ? +p[1] : f.length - 1;
    res.writeHead(206, { 'Content-Range': `bytes ${s}-${e}/${f.length}`, 'Accept-Ranges': 'bytes', 'Content-Length': e - s + 1, 'Content-Type': 'video/mp4' });
    f.createReadStream({ start: s, end: e }).pipe(res);
  } else {
    res.writeHead(200, { 'Content-Length': f.length, 'Content-Type': 'video/mp4' });
    f.createReadStream().pipe(res);
  }
}).listen(8080, '127.0.0.1', () => console.log('wt http on 8080'));
JS
( cd /tmp/wt && npm init -y >/dev/null 2>&1 && timeout 200 npm install --no-audit --no-fund webtorrent > /tmp/wt-npm.log 2>&1 ) & DL_WT=$!

tunnel() {
  /tmp/cloudflared tunnel --url "http://127.0.0.1:$1" --no-autoupdate > "$2" 2>&1 &
  local url="" i
  for i in $(seq 1 45); do
    url=$(grep -oE 'https://[a-z0-9-]+\.trycloudflare\.com' "$2" | head -1)
    [ -n "$url" ] && break
    sleep 2
  done
  echo "$url"
}
live_json() { # service url port job outfile
  python3 - "$1" "$2" "$3" "$4" "$5" "$IP" <<'PY'
import json, sys, time
svc, url, port, job, out, ip = sys.argv[1:7]
doc = {"service": svc, "url": url, "egressIp": ip,
       "port": int(port), "started": int(time.time()), "job": job}
open(out, "w").write(json.dumps(doc, indent=1))
print("live:", out, url)
PY
}
magic_of() {
  python3 - "$1" <<'PY'
import os, sys
p = sys.argv[1]
d = open(p, 'rb').read() if os.path.exists(p) else b''
if len(d) >= 8 and d[4:8] == b'ftyp': print('ftypisom')
elif len(d) >= 4 and d[:4] == bytes.fromhex('1a45dfa3'): print('ebml-matroska')
else: print('other:' + d[:8].hex())
PY
}

OWN_URL=""; TS_URL=""; RQ_URL=""; WT_URL=""
OWN_STATE="not-started"; TS_STATE="not-started"; RQ_STATE="not-started"; WT_STATE="not-started"
write_combo_results() {
  python3 - "$OWN_URL" "$OWN_STATE" "$TS_URL" "$TS_STATE" "$RQ_URL" "$RQ_STATE" "$WT_URL" "$WT_STATE" "$IP" "$JOB" <<'PY'
import json, sys, time
(own_url, own_st, ts_url, ts_st, rq_url, rq_st, wt_url, wt_st, ip, job) = sys.argv[1:11]
doc = {"job": job, "at": int(time.time()), "egressIp": ip,
  "own":        {"base": own_url, "state": own_st},
  "torrserver": {"base": ts_url, "state": ts_st},
  "rqbit":      {"base": rq_url, "state": rq_st},
  "webtorrent": {"base": wt_url, "state": wt_st,
                 "note": "proof only — NOT published to the router (no adapter yet)"}}
open("own-host/live/combo-results.json", "w").write(json.dumps(doc, indent=1))
print("combo-results:", json.dumps(doc))
PY
  push_files cloud-pc/storage/own-host/live/combo-results.json
}

# ---------- own server ----------
wait $DL_OWN; OWN_BUILD=$?
if [ "$OWN_BUILD" = "0" ] && [ -x /tmp/onion-stream ]; then
  mkdir -p /tmp/oscache
  ONION_STREAM_ADDR="127.0.0.1:11470" ONION_STREAM_CACHE_DIR=/tmp/oscache \
  ONION_STREAM_CACHE_MAX_BYTES=8589934592 \
    /tmp/onion-stream > /tmp/server.log 2>&1 &
  for i in $(seq 1 30); do curl -s -m 2 http://127.0.0.1:11470/health >/dev/null && break; sleep 1; done
  log "own health: $(curl -s -m 2 http://127.0.0.1:11470/health)"
  OWN_URL=$(tunnel 11470 /tmp/own-tunnel.log)
  log "own tunnel: $OWN_URL"
  if [ -n "$OWN_URL" ]; then
    printf '%s\n' "$OWN_URL" > "$OH/live/stream-url.txt"
    live_json onion-stream "$OWN_URL" 11470 "$JOB" "$OH/live/live-server.json"
    push_files cloud-pc/storage/own-host/live/live-server.json cloud-pc/storage/own-host/live/stream-url.txt
    OWN_STATE="live"
    # Sintel gate in the background (own server pre-downloads Sintel,
    # exactly like the watch sessions) — never blocks the other servers.
    ( curl -s -m 30 "http://127.0.0.1:11470/api/start?hash=$HASH&title=Sintel&year=2010" >/dev/null 2>&1
      python3 - <<'PY'
import json, time, urllib.request
t0 = time.time(); info = False; maxpeers = 0; file5 = None
while time.time() - t0 < 420:
    try:
        with urllib.request.urlopen("http://127.0.0.1:11470/api/status?hash=08ada5a7a6183aae1e09d831df6748d566095a10&file=5", timeout=10) as r:
            st = json.load(r)
    except Exception:
        time.sleep(8); continue
    maxpeers = max(maxpeers, int(st.get("activePeers") or 0))
    fl = st.get("fileLengths") or []
    if len(fl) > 5: file5 = fl[5]
    if st.get("infoReady"): info = True; break
    time.sleep(8)
code = 0; magic = ""
try:
    req = urllib.request.Request("http://127.0.0.1:11470/play/08ada5a7a6183aae1e09d831df6748d566095a10/5", headers={"Range": "bytes=0-1023"})
    with urllib.request.urlopen(req, timeout=60) as r:
        data = r.read(); code = r.status
    magic = "ftyp" if len(data) >= 8 and data[4:8] == b"ftyp" else "other"
except Exception as e:
    magic = f"err:{e}"
doc = {"infoReady": info, "maxPeers": maxpeers, "file5Length": file5,
       "waitedSec": int(time.time() - t0), "playHttp": code, "playMagic": magic,
       "at": int(time.time()), "hash": "08ada5a7a6183aae1e09d831df6748d566095a10", "job": "ownhost-combo1"}
open("own-host/live/gate-server.json", "w").write(json.dumps(doc, indent=1))
print("gate:", json.dumps(doc))
PY
      ( cd "$REPO" && git config user.name cloudpc && git config user.email cloudpc@local \
        && git add cloud-pc/storage/own-host/live/gate-server.json \
        && (git diff --cached --quiet || git commit -q -m "own-host: combo gate results") \
        && (git push -q origin HEAD:main || (git pull -q --rebase origin main && git push -q origin HEAD:main)) ) \
        || true ) &
  fi
else
  log "own build FAILED (see /tmp/own-build.log)"; tail -3 /tmp/own-build.log || true
  OWN_STATE="failed-build"
fi
write_combo_results

# ---------- TorrServer ----------
wait $DL_TS; TS_DLRC=$?
if [ "$TS_DLRC" = "0" ] && [ -x /tmp/torrserver ]; then
  mkdir -p /tmp/tsdata
  printf '{"%s":"%s"}' "$TS_USER" "$TS_PASS" > /tmp/tsdata/accs.db
  TS_HTTPAUTH=1 /tmp/torrserver --port 8090 --path /tmp/tsdata --httpauth > /tmp/ts.log 2>&1 &
  TS_UP=""
  for i in $(seq 1 30); do
    C=$(curl -s -o /dev/null -w "%{http_code}" -m 2 -u "$TS_USER:$TS_PASS" -H 'Content-Type: application/json' -d '{"action":"list"}' http://127.0.0.1:8090/torrents || echo 000)
    [ "$C" = "200" ] && { TS_UP=1; break; }
    sleep 1
  done
  if [ -z "$TS_UP" ]; then
    log "torrserver --httpauth start failed, retrying env-only"; tail -3 /tmp/ts.log || true
    pkill -f /tmp/torrserver 2>/dev/null; sleep 1
    TS_HTTPAUTH=1 /tmp/torrserver --port 8090 --path /tmp/tsdata > /tmp/ts.log 2>&1 &
    for i in $(seq 1 30); do
      C=$(curl -s -o /dev/null -w "%{http_code}" -m 2 -u "$TS_USER:$TS_PASS" -H 'Content-Type: application/json' -d '{"action":"list"}' http://127.0.0.1:8090/torrents || echo 000)
      [ "$C" = "200" ] && { TS_UP=1; break; }
      sleep 1
    done
  fi
  TS_NA=$(curl -s -o /dev/null -w "%{http_code}" -m 5 -H 'Content-Type: application/json' -d '{"action":"list"}' http://127.0.0.1:8090/torrents || echo 000)
  log "torrserver up=$TS_UP noauth-http=$TS_NA (401 = auth enforced)"
  if [ -n "$TS_UP" ]; then
    TS_URL=$(tunnel 8090 /tmp/ts-tunnel.log)
    log "torrserver tunnel: $TS_URL"
    live_json torrserver "$TS_URL" 8090 "$JOB" "$OH/live/live-torrserver.json"
    push_files cloud-pc/storage/own-host/live/live-torrserver.json
    TS_STATE="live noauth-http=$TS_NA"
    curl -s -m 30 -u "$TS_USER:$TS_PASS" -H 'Content-Type: application/json' \
      -d "{\"action\":\"add\",\"link\":\"$MAGNET\",\"title\":\"Sintel\"}" \
      http://127.0.0.1:8090/torrents > /tmp/ts-add.json 2>&1 || true
    log "torrserver add: $(head -c 200 /tmp/ts-add.json)"
  else
    TS_STATE="failed-start"; tail -3 /tmp/ts.log || true
  fi
else
  log "torrserver download FAILED rc=$TS_DLRC"; TS_STATE="failed-download"
fi
write_combo_results

# ---------- rqbit ----------
wait $DL_RQ; RQ_DLRC=$?
if [ "$RQ_DLRC" = "0" ] && [ -x /tmp/rqbit ]; then
  log "rqbit version: $(/tmp/rqbit --version 2>&1 | head -c 80)"
  mkdir -p /tmp/rqdata
  ( cd /tmp/rqdata && RQBIT_HTTP_BASIC_AUTH_USERPASS="$RQ_USER:$RQ_PASS" /tmp/rqbit server start /tmp/rqdata > /tmp/rq.log 2>&1 & )
  RQ_UP=""
  for i in $(seq 1 30); do
    curl -s -m 2 -u "$RQ_USER:$RQ_PASS" http://127.0.0.1:3030/torrents >/dev/null 2>&1 && { RQ_UP=1; break; }
    sleep 1
  done
  RQ_NA=$(curl -s -o /dev/null -w "%{http_code}" -m 5 http://127.0.0.1:3030/torrents || echo 000)
  log "rqbit up=$RQ_UP noauth-http=$RQ_NA (401 = auth enforced)"
  if [ -n "$RQ_UP" ]; then
    RQ_URL=$(tunnel 3030 /tmp/rq-tunnel.log)
    log "rqbit tunnel: $RQ_URL"
    live_json rqbit "$RQ_URL" 3030 "$JOB" "$OH/live/live-rqbit.json"
    push_files cloud-pc/storage/own-host/live/live-rqbit.json
    RQ_STATE="live noauth-http=$RQ_NA"
    CODE=$(curl -s -o /tmp/rq-add.json -w "%{http_code}" -m 30 -u "$RQ_USER:$RQ_PASS" \
      --data-binary "$MAGNET" http://127.0.0.1:3030/torrents || echo 000)
    log "rqbit add: http=$CODE $(head -c 150 /tmp/rq-add.json)"
  else
    RQ_STATE="failed-start"; tail -3 /tmp/rq.log || true
  fi
else
  log "rqbit download FAILED rc=$RQ_DLRC"; RQ_STATE="failed-download"
fi
write_combo_results

# ---------- WebTorrent (proof only — never published to the router) ----------
wait $DL_WT
if [ -d /tmp/wt/node_modules/webtorrent ]; then
  ( cd /tmp/wt && MAGNET="$MAGNET" WTU="$WT_USER" WTP="$WT_PASS" node server.mjs > /tmp/wt.log 2>&1 & )
  sleep 6
  WT_CODE=$(curl -s -o /dev/null -w "%{http_code}" -m 5 http://127.0.0.1:8080/status || echo 000)
  log "webtorrent noauth /status http=$WT_CODE (401 = listening, auth wall up)"
  if [ "$WT_CODE" = "401" ] || [ "$WT_CODE" = "200" ]; then
    WT_URL=$(tunnel 8080 /tmp/wt-tunnel.log)
    log "webtorrent tunnel: $WT_URL"
    live_json webtorrent "$WT_URL" 8080 "$JOB" "$OH/live/live-webtorrent.json"
    push_files cloud-pc/storage/own-host/live/live-webtorrent.json
    WT_STATE="live (proof only)"
  else
    WT_STATE="not-listening http=$WT_CODE"
  fi
else
  WT_STATE="npm-install-failed"
fi
write_combo_results

log "final: own=$OWN_STATE ($OWN_URL) torrserver=$TS_STATE ($TS_URL) rqbit=$RQ_STATE ($RQ_URL) webtorrent=$WT_STATE ($WT_URL)"
while [ "$(el)" -lt 575 ]; do sleep 15; done
log "done"
