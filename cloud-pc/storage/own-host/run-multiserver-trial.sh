#!/usr/bin/env bash
# Multi-server trial v2 — runs on a Cloud PC runner (cwd = cloud-pc/storage).
#
# Blaze's order 2026-11-09 11:20 CST: "Do every single server — if one
# fails, switch to the next, make it all automatic and smart."
# v2 fixes from trial 1 (results pushed 11:32 CST):
#  - TorrServer stream URL now uses the torrent's REAL file path
#    (URL-encoded), waits for downloaded bytes before probing, and
#    tries /play as a fallback form.
#  - TorrServer auth probed against /torrents (not /echo, which is
#    auth-exempt); started with BOTH TS_HTTPAUTH=1 and --httpauth.
#  - rqbit add uses curl's default content type (docs form), with a
#    text/plain retry; add/details responses are logged into the
#    results JSON as diagnostics.
#  - WebTorrent status poll extended to ~150 s, last status logged.
# Results publish mid-run to own-host/live/multiserver-results.json.
# Credentials live ONLY in own-host/live/multiserver-auth.txt.
set -u
T0=$(date +%s)
el() { echo $(( $(date +%s) - T0 )); }
log() { echo "[multiserver2 +$(el)s] $*"; }
OH="own-host"
mkdir -p "$OH/live"
REPO=$(cd ../.. && pwd)
HASH="08ada5a7a6183aae1e09d831df6748d566095a10"
MAGNET="magnet:?xt=urn:btih:${HASH}&dn=Sintel&tr=udp%3A%2F%2Ftracker.opentrackr.org%3A1337%2Fannounce&tr=udp%3A%2F%2Fopen.stealth.si%3A80%2Fannounce&tr=udp%3A%2F%2Ftracker.torrent.eu.org%3A451%2Fannounce&tr=udp%3A%2F%2Fexodus.desync.com%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.openbittorrent.com%3A6969%2Fannounce"
log "start repo=$REPO"
IP=$(curl -s -m 10 https://ifconfig.me || echo unknown)
log "egress ip=$IP"

push_files() {
  ( cd "$REPO" && git config user.name cloudpc && git config user.email cloudpc@local \
    && git add "$@" \
    && (git diff --cached --quiet || git commit -q -m "own-host: multiserver trial update") \
    && (git push -q origin HEAD:main || (git pull -q --rebase origin main && git push -q origin HEAD:main)) ) \
    && log "pushed: $*" || log "WARN push failed: $*"
}

TS_USER="onion"; TS_PASS=$(head -c 12 /dev/urandom | od -An -tx1 | tr -d ' \n')
RQ_USER="onion"; RQ_PASS=$(head -c 12 /dev/urandom | od -An -tx1 | tr -d ' \n')
WT_USER="onion"; WT_PASS=$(head -c 12 /dev/urandom | od -An -tx1 | tr -d ' \n')
cat > "$OH/live/multiserver-auth.txt" <<EOF
# Multiserver trial credentials — generated on the Cloud PC runner $(date -u +%FT%TZ)
# Trial only. These protect the trycloudflare-exposed trial servers.
torrserver user=$TS_USER pass=$TS_PASS
rqbit user=$RQ_USER pass=$RQ_PASS
webtorrent user=$WT_USER pass=$WT_PASS
EOF
push_files cloud-pc/storage/own-host/live/multiserver-auth.txt
export TSU="$TS_USER" TSP="$TS_PASS" RQU="$RQ_USER" RQP="$RQ_PASS"

if [ ! -x /tmp/cloudflared ]; then
  curl -sL -m 120 -o /tmp/cloudflared https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-amd64 \
    || { log "FATAL cloudflared download failed"; exit 5; }
  chmod +x /tmp/cloudflared
fi
log "cloudflared: $(/tmp/cloudflared --version 2>/dev/null | head -1)"

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

dl_asset() {
  local api url
  api=$(curl -s -m 30 "https://api.github.com/repos/$1/releases/latest")
  url=$(printf '%s' "$api" | grep -oE '"browser_download_url": "[^"]+"' | cut -d'"' -f4 | grep -iE "$2" | grep -ivE '\.sig|\.sha|\.txt|\.json' | head -1)
  if [ -z "$url" ]; then log "FATAL no asset match for $1 ($2)"; return 1; fi
  log "downloading $url"
  curl -sL -m 240 -o "$3" "$url" || return 1
  chmod +x "$3"
}

dl_asset "YouROK/TorrServer" "TorrServer-linux-amd64" /tmp/torrserver &
DL1=$!
dl_asset "ikatson/rqbit" "linux.*(amd64|x86_64)|(amd64|x86_64).*linux" /tmp/rqbit &
DL2=$!
wait $DL1; TS_DL=$?
wait $DL2; RQ_DL=$?
log "downloads: torrserver=$TS_DL rqbit=$RQ_DL sizes ts=$(stat -c%s /tmp/torrserver 2>/dev/null || echo 0) rq=$(stat -c%s /tmp/rqbit 2>/dev/null || echo 0)"

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

TS_RES="not-started"; TS_URL=""; TS_PEERS=""; TS_RANGE=""; TS_LAT=""; TS_AUTH_STATE=""; TS_DIAG=""
RQ_RES="not-started"; RQ_URL=""; RQ_PEERS=""; RQ_RANGE=""; RQ_LAT=""; RQ_AUTH_STATE=""; RQ_DIAG=""
WT_URL=""; WT_RES="not-attempted"; WT_PEERS=""; WT_RANGE=""; WT_LAT=""; WT_DIAG=""

write_results() {
  python3 - "$TS_URL" "$TS_RES" "$TS_PEERS" "$TS_RANGE" "$TS_LAT" "$TS_AUTH_STATE" "$TS_DIAG" \
            "$RQ_URL" "$RQ_RES" "$RQ_PEERS" "$RQ_RANGE" "$RQ_LAT" "$RQ_AUTH_STATE" "$RQ_DIAG" \
            "$WT_URL" "$WT_RES" "$WT_PEERS" "$WT_RANGE" "$WT_LAT" "$WT_DIAG" "$IP" <<'PY'
import json, sys, time
v = sys.argv[1:]
(ts_url, ts_res, ts_peers, ts_range, ts_lat, ts_auth, ts_diag,
 rq_url, rq_res, rq_peers, rq_range, rq_lat, rq_auth, rq_diag,
 wt_url, wt_res, wt_peers, wt_range, wt_lat, wt_diag, ip) = v
def num(x):
    try: return int(x)
    except Exception: return x
doc = {"job": "ownhost-multi2", "at": int(time.time()), "egressIp": ip,
  "torrserver": {"base": ts_url, "proven": ts_res, "peers": num(ts_peers), "range": ts_range,
                 "startLatencySec": num(ts_lat), "auth": ts_auth, "diag": ts_diag[:700]},
  "rqbit":      {"base": rq_url, "proven": rq_res, "peers": num(rq_peers), "range": rq_range,
                 "startLatencySec": num(rq_lat), "auth": rq_auth, "diag": rq_diag[:700]},
  "webtorrent": {"base": wt_url, "proven": wt_res, "peers": num(wt_peers), "range": wt_range,
                 "startLatencySec": num(wt_lat), "diag": wt_diag[:700]},
  "own": {"proven": "live-via-s-chain (S7, not re-run here)"}}
open("own-host/live/multiserver-results.json", "w").write(json.dumps(doc, indent=1))
print("results:", json.dumps(doc))
PY
  push_files cloud-pc/storage/own-host/live/multiserver-results.json
}

# ---------- TorrServer ----------
if [ "$TS_DL" = "0" ]; then
  mkdir -p /tmp/tsdata
  printf '{"%s":"%s"}' "$TS_USER" "$TS_PASS" > /tmp/tsdata/accs.db
  TS_HTTPAUTH=1 /tmp/torrserver --port 8090 --path /tmp/tsdata --httpauth > /tmp/ts.log 2>&1 &
  UP=""
  for i in $(seq 1 20); do
    C=$(curl -s -o /dev/null -w "%{http_code}" -m 2 -u "$TS_USER:$TS_PASS" -H 'Content-Type: application/json' -d '{"action":"list"}' http://127.0.0.1:8090/torrents || echo 000)
    [ "$C" = "200" ] || [ "$C" = "401" ] && { UP=1; break; }
    sleep 1
  done
  if [ -z "$UP" ]; then
    log "torrserver --httpauth start failed, retrying env-only"; tail -3 /tmp/ts.log || true
    pkill -f /tmp/torrserver 2>/dev/null; sleep 1
    TS_HTTPAUTH=1 /tmp/torrserver --port 8090 --path /tmp/tsdata > /tmp/ts.log 2>&1 &
    for i in $(seq 1 20); do curl -s -m 2 http://127.0.0.1:8090/echo >/dev/null 2>&1 && break; sleep 1; done
  fi
  NA=$(curl -s -o /dev/null -w "%{http_code}" -m 5 -H 'Content-Type: application/json' -d '{"action":"list"}' http://127.0.0.1:8090/torrents || echo 000)
  WA=$(curl -s -o /dev/null -w "%{http_code}" -m 5 -u "$TS_USER:$TS_PASS" -H 'Content-Type: application/json' -d '{"action":"list"}' http://127.0.0.1:8090/torrents || echo 000)
  TS_AUTH_STATE="noauth-http=$NA auth-http=$WA (401 noauth = auth enforced)"
  log "torrserver up: $TS_AUTH_STATE"
  TS_URL=$(tunnel 8090 /tmp/ts-tunnel.log)
  log "torrserver tunnel: $TS_URL"
  python3 - "$TS_URL" "$IP" <<'PY'
import json, sys, time
doc = {"service": "torrserver", "url": sys.argv[1], "egressIp": sys.argv[2],
       "port": 8090, "started": int(time.time()), "job": "ownhost-multi2"}
open("own-host/live/live-torrserver.json", "w").write(json.dumps(doc, indent=1))
PY
  push_files cloud-pc/storage/own-host/live/live-torrserver.json
fi

# ---------- rqbit ----------
if [ "$RQ_DL" = "0" ]; then
  mkdir -p /tmp/rqdata
  ( cd /tmp/rqdata && RQBIT_HTTP_BASIC_AUTH_USERPASS="$RQ_USER:$RQ_PASS" /tmp/rqbit server start > /tmp/rq.log 2>&1 & )
  UP=""
  for i in $(seq 1 20); do curl -s -m 2 -u "$RQ_USER:$RQ_PASS" http://127.0.0.1:3030/torrents >/dev/null 2>&1 && { UP=1; break; }; sleep 1; done
  if [ -z "$UP" ]; then
    log "rqbit 'server start' failed, retrying bare"; tail -3 /tmp/rq.log || true
    ( cd /tmp/rqdata && RQBIT_HTTP_BASIC_AUTH_USERPASS="$RQ_USER:$RQ_PASS" /tmp/rqbit > /tmp/rq.log 2>&1 & )
    for i in $(seq 1 20); do curl -s -m 2 -u "$RQ_USER:$RQ_PASS" http://127.0.0.1:3030/torrents >/dev/null 2>&1 && break; sleep 1; done
  fi
  NA=$(curl -s -o /dev/null -w "%{http_code}" -m 5 http://127.0.0.1:3030/torrents || echo 000)
  RQ_AUTH_STATE="noauth-http=$NA (401 = auth enforced)"
  log "rqbit up: $RQ_AUTH_STATE"
  RQ_URL=$(tunnel 3030 /tmp/rq-tunnel.log)
  log "rqbit tunnel: $RQ_URL"
  python3 - "$RQ_URL" "$IP" <<'PY'
import json, sys, time
doc = {"service": "rqbit", "url": sys.argv[1], "egressIp": sys.argv[2],
       "port": 3030, "started": int(time.time()), "job": "ownhost-multi2"}
open("own-host/live/live-rqbit.json", "w").write(json.dumps(doc, indent=1))
PY
  push_files cloud-pc/storage/own-host/live/live-rqbit.json
fi

# ---------- add Sintel to BOTH ----------
TS_T0=$(date +%s)
if [ -n "$TS_URL" ]; then
  curl -s -m 30 -u "$TS_USER:$TS_PASS" -H 'Content-Type: application/json' \
    -d "{\"action\":\"add\",\"link\":\"$MAGNET\",\"title\":\"Sintel\"}" \
    http://127.0.0.1:8090/torrents > /tmp/ts-add.json 2>&1
  TS_DIAG="add: $(head -c 300 /tmp/ts-add.json)"
  log "torrserver add: $(head -c 200 /tmp/ts-add.json)"
fi
RQ_T0=$(date +%s)
if [ -n "$RQ_URL" ]; then
  CODE=$(curl -s -o /tmp/rq-add.json -w "%{http_code}" -m 30 -u "$RQ_USER:$RQ_PASS" \
    --data-binary "$MAGNET" http://127.0.0.1:3030/torrents || echo 000)
  RQ_DIAG="add http=$CODE body: $(head -c 300 /tmp/rq-add.json)"
  if ! grep -q '"id"' /tmp/rq-add.json; then
    CODE2=$(curl -s -o /tmp/rq-add.json -w "%{http_code}" -m 30 -u "$RQ_USER:$RQ_PASS" \
      -H 'Content-Type: text/plain' --data-binary "$MAGNET" http://127.0.0.1:3030/torrents || echo 000)
    RQ_DIAG="$RQ_DIAG | retry text/plain http=$CODE2 body: $(head -c 300 /tmp/rq-add.json)"
  fi
  log "rqbit add: $RQ_DIAG"
fi

# ---------- TorrServer proof ----------
if [ -n "$TS_URL" ]; then
  INFO=$(python3 - <<'PY'
import json, time, urllib.request, base64, os, urllib.parse
user, pw = os.environ['TSU'], os.environ['TSP']
hdr = {'Authorization': 'Basic ' + base64.b64encode(f"{user}:{pw}".encode()).decode(),
       'Content-Type': 'application/json'}
h = "08ada5a7a6183aae1e09d831df6748d566095a10"
idx = ''; path = ''; peers = ''; dl = 0
for _ in range(16):
    try:
        req = urllib.request.Request('http://127.0.0.1:8090/torrents',
            data=json.dumps({"action": "get", "hash": h}).encode(), headers=hdr)
        with urllib.request.urlopen(req, timeout=10) as r:
            t = json.load(r)
        st = t.get('stat') or {}
        dl = st.get('downloaded_size') or st.get('loaded_size') or dl
        peers = st.get('connected_seeders') or st.get('peers') or peers
        for f in (t.get('file_stats') or []):
            if str(f.get('path', '')).endswith('Sintel.mp4'):
                idx = f.get('id'); path = f.get('path'); break
        if idx != '' and isinstance(dl, (int, float)) and dl > 1000000:
            break
    except Exception:
        pass
    time.sleep(6)
print(json.dumps({"idx": idx, "encpath": urllib.parse.quote(str(path)), "base": os.path.basename(str(path)),
                  "peers": peers, "downloaded": dl}))
PY
)
  log "torrserver info: $INFO"
  TS_IDX=$(printf '%s' "$INFO" | python3 -c "import json,sys; print(json.load(sys.stdin).get('idx',''))" 2>/dev/null || echo "")
  TS_ENC=$(printf '%s' "$INFO" | python3 -c "import json,sys; print(json.load(sys.stdin).get('encpath',''))" 2>/dev/null || echo "")
  TS_BASE=$(printf '%s' "$INFO" | python3 -c "import json,sys; print(json.load(sys.stdin).get('base',''))" 2>/dev/null || echo "")
  TS_PEERS=$(printf '%s' "$INFO" | python3 -c "import json,sys; print(json.load(sys.stdin).get('peers',''))" 2>/dev/null || echo "")
  TS_DIAG="$TS_DIAG | info: $INFO"
  if [ -n "$TS_IDX" ]; then
    for FORM in "stream/$TS_ENC" "stream/$TS_BASE" "play/$TS_ENC"; do
      CODE=$(curl -s -o /tmp/ts-play.bin -w "%{http_code}" -m 120 -u "$TS_USER:$TS_PASS" \
        -H "Range: bytes=0-1048575" "http://127.0.0.1:8090/$FORM?link=$HASH&index=$TS_IDX" || echo 000)
      MG=$(magic_of /tmp/ts-play.bin); SZ=$(stat -c%s /tmp/ts-play.bin 2>/dev/null || echo 0)
      TS_RANGE="$FORM http=$CODE bytes=$SZ magic=$MG"
      log "torrserver probe $TS_RANGE"
      [ "$CODE" = "206" ] && [ "$MG" = "ftypisom" ] && break
    done
    TS_LAT=$(( $(date +%s) - TS_T0 ))
    case "$TS_RANGE" in *"http=206"*"ftypisom"*) TS_RES="yes";; *) TS_RES="no ($TS_RANGE)";; esac
  else
    TS_RES="no (no file index — metadata never arrived)"
  fi
  log "torrserver proof: $TS_RES"
fi

# ---------- rqbit proof ----------
if [ -n "$RQ_URL" ]; then
  RQ_PROOF=$(python3 - <<'PY'
import json, time, urllib.request, base64, os
user, pw = os.environ['RQU'], os.environ['RQP']
auth = 'Basic ' + base64.b64encode(f"{user}:{pw}".encode()).decode()
tid = None
try:
    tid = json.load(open('/tmp/rq-add.json')).get('id')
except Exception:
    pass
out = {"idx": "", "peers": "", "tid": tid, "err": ""}
if tid is None:
    out["err"] = "no id in add response"
    print(json.dumps(out)); raise SystemExit
for _ in range(20):
    try:
        req = urllib.request.Request(f'http://127.0.0.1:3030/torrents/{tid}', headers={'Authorization': auth})
        with urllib.request.urlopen(req, timeout=10) as r: det = json.load(r)
        for i, f in enumerate(det.get('files') or []):
            if str(f.get('name', '')).endswith('Sintel.mp4'):
                out["idx"] = i; break
        if out["idx"] != "": break
        out["err"] = "files keys: " + ",".join(det.keys())
    except Exception as e:
        out["err"] = str(e)
    time.sleep(5)
try:
    req = urllib.request.Request(f'http://127.0.0.1:3030/torrents/{tid}/peer_stats', headers={'Authorization': auth})
    with urllib.request.urlopen(req, timeout=10) as r: ps = json.load(r)
    out["peers"] = len(ps) if isinstance(ps, list) else ''
except Exception:
    pass
print(json.dumps(out))
PY
)
  log "rqbit info: $RQ_PROOF"
  RQ_IDX=$(printf '%s' "$RQ_PROOF" | python3 -c "import json,sys; print(json.load(sys.stdin).get('idx',''))" 2>/dev/null || echo "")
  RQ_PEERS=$(printf '%s' "$RQ_PROOF" | python3 -c "import json,sys; print(json.load(sys.stdin).get('peers',''))" 2>/dev/null || echo "")
  RQ_TID=$(printf '%s' "$RQ_PROOF" | python3 -c "import json,sys; print(json.load(sys.stdin).get('tid',''))" 2>/dev/null || echo "")
  RQ_DIAG="$RQ_DIAG | info: $RQ_PROOF"
  if [ -n "$RQ_IDX" ] && [ -n "$RQ_TID" ]; then
    CODE=$(curl -s -o /tmp/rq-play.bin -w "%{http_code}" -m 150 -u "$RQ_USER:$RQ_PASS" \
      -H "Range: bytes=0-1048575" "http://127.0.0.1:3030/torrents/$RQ_TID/stream/$RQ_IDX" || echo 000)
    MG=$(magic_of /tmp/rq-play.bin); SZ=$(stat -c%s /tmp/rq-play.bin 2>/dev/null || echo 0)
    RQ_RANGE="http=$CODE bytes=$SZ magic=$MG"
    RQ_LAT=$(( $(date +%s) - RQ_T0 ))
    if [ "$CODE" = "206" ] && [ "$MG" = "ftypisom" ]; then RQ_RES="yes"; else RQ_RES="no ($RQ_RANGE)"; fi
  else
    RQ_RES="no (no file index — metadata never arrived)"
  fi
  log "rqbit proof: $RQ_RES range=$RQ_RANGE"
fi
write_results

# ---------- WebTorrent (STRETCH) ----------
if [ "$(el)" -lt 280 ]; then
  WT_T0=$(date +%s)
  mkdir -p /tmp/wt
  cat > /tmp/wt/server.js <<'JS'
const http = require('http');
const WebTorrent = require('webtorrent');
const client = new WebTorrent();
let tor = null;
client.add(process.env.MAGNET, { path: '/tmp/wt-data' }, t => { tor = t; console.log('wt ready', t.files.map(f => f.path).join(',')); });
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
  ( cd /tmp/wt && npm init -y >/dev/null 2>&1 && timeout 150 npm install --no-audit --no-fund webtorrent > /tmp/wt-npm.log 2>&1 ) \
    && log "webtorrent npm install ok" || log "webtorrent npm install FAILED"
  if [ -d /tmp/wt/node_modules/webtorrent ]; then
    ( cd /tmp/wt && MAGNET="$MAGNET" WTU="$WT_USER" WTP="$WT_PASS" node server.js > /tmp/wt.log 2>&1 & )
    sleep 5
    WT_URL=$(tunnel 8080 /tmp/wt-tunnel.log)
    log "webtorrent tunnel: $WT_URL"
    python3 - "$WT_URL" "$IP" <<'PY'
import json, sys, time
doc = {"service": "webtorrent", "url": sys.argv[1], "egressIp": sys.argv[2],
       "port": 8080, "started": int(time.time()), "job": "ownhost-multi2"}
open("own-host/live/live-webtorrent.json", "w").write(json.dumps(doc, indent=1))
PY
    push_files cloud-pc/storage/own-host/live/live-webtorrent.json
    WT_IDX=""; ST=""
    for i in $(seq 1 25); do
      ST=$(curl -s -m 8 -u "$WT_USER:$WT_PASS" http://127.0.0.1:8080/status || echo "")
      WT_IDX=$(printf '%s' "$ST" | python3 -c "
import json,sys
try:
    d = json.load(sys.stdin)
    print(next((i for i,p in enumerate(d.get('files') or []) if p.endswith('Sintel.mp4')), ''))
except Exception: print('')" 2>/dev/null || echo "")
      WT_PEERS=$(printf '%s' "$ST" | python3 -c "
import json,sys
try: print(json.load(sys.stdin).get('peers',''))
except Exception: print('')" 2>/dev/null || echo "")
      [ -n "$WT_IDX" ] && break
      sleep 6
    done
    WT_DIAG="last status: $ST"
    log "webtorrent sintel file index: $WT_IDX peers=$WT_PEERS"
    if [ -n "$WT_IDX" ]; then
      CODE=$(curl -s -o /tmp/wt-play.bin -w "%{http_code}" -m 120 -u "$WT_USER:$WT_PASS" \
        -H "Range: bytes=0-1048575" "http://127.0.0.1:8080/stream/$WT_IDX" || echo 000)
      MG=$(magic_of /tmp/wt-play.bin); SZ=$(stat -c%s /tmp/wt-play.bin 2>/dev/null || echo 0)
      WT_RANGE="http=$CODE bytes=$SZ magic=$MG"
      WT_LAT=$(( $(date +%s) - WT_T0 ))
      if [ "$CODE" = "206" ] && [ "$MG" = "ftypisom" ]; then WT_RES="yes"; else WT_RES="no ($WT_RANGE)"; fi
    else
      WT_RES="no (no file index — metadata never arrived in ~150 s)"
    fi
  else
    WT_RES="no (npm install failed)"
    WT_DIAG="npm tail: $(tail -c 300 /tmp/wt-npm.log 2>/dev/null)"
  fi
  log "webtorrent proof: $WT_RES range=$WT_RANGE"
  write_results
else
  log "webtorrent skipped: no time left (elapsed $(el)s)"
  WT_RES="skipped (time budget)"
  write_results
fi

log "final: torrserver=$TS_RES ($TS_URL) rqbit=$RQ_RES ($RQ_URL) webtorrent=$WT_RES ($WT_URL)"
while [ "$(el)" -lt 575 ]; do sleep 15; done
log "done"
