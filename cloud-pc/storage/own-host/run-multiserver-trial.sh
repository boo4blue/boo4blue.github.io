#!/usr/bin/env bash
# Multi-server trial v3 — runs on a Cloud PC runner (cwd = cloud-pc/storage).
#
# Blaze's order 2026-11-09 11:20 CST: every server, automatic failover.
# Status entering v3:
#  - TorrServer: PROVEN in v2 (sandbox-verified through its public
#    tunnel: auth 401/200, /stream?link=<hash>&index=6&play=1 and
#    /play/<hash>/6 both 206 + 1 MiB + ftypisom, 21 active peers).
#    NOT re-run here.
#  - Own server: PROVEN live via the S-chain (S7). NOT re-run here.
#  - rqbit: v2 FAILED TO START (all localhost probes 000). v3 adds
#    deep startup diagnostics: asset list + file type + --help +
#    per-attempt logs pushed into the results JSON.
#  - WebTorrent: v2 node server never answered /status. v3 starts it
#    EARLY (warms in parallel with the rqbit proof), checks for the
#    401 auth wall to prove it is listening, logs its crash log.
# Results publish to own-host/live/multiserver-results.json.
# Credentials live ONLY in own-host/live/multiserver-auth.txt.
set -u
T0=$(date +%s)
el() { echo $(( $(date +%s) - T0 )); }
log() { echo "[multiserver3 +$(el)s] $*"; }
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

RQ_USER="onion"; RQ_PASS=$(head -c 12 /dev/urandom | od -An -tx1 | tr -d ' \n')
WT_USER="onion"; WT_PASS=$(head -c 12 /dev/urandom | od -An -tx1 | tr -d ' \n')
cat > "$OH/live/multiserver-auth.txt" <<EOF
# Multiserver trial credentials — generated on the Cloud PC runner $(date -u +%FT%TZ)
# Trial only. These protect the trycloudflare-exposed trial servers.
# NOTE: v3 regenerates rqbit/webtorrent creds; the torrserver line below
# is the v2 session's (that session is over; TorrServer was PROVEN in v2).
torrserver user=onion pass=(v2 session, expired — see MULTISERVER-TRIAL.md)
rqbit user=$RQ_USER pass=$RQ_PASS
webtorrent user=$WT_USER pass=$WT_PASS
EOF
push_files cloud-pc/storage/own-host/live/multiserver-auth.txt
export RQU="$RQ_USER" RQP="$RQ_PASS"

if [ ! -x /tmp/cloudflared ]; then
  curl -sL -m 120 -o /tmp/cloudflared https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-amd64 \
    || { log "FATAL cloudflared download failed"; exit 5; }
  chmod +x /tmp/cloudflared
fi

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

RQ_RES="not-started"; RQ_URL=""; RQ_PEERS=""; RQ_RANGE=""; RQ_LAT=""; RQ_AUTH_STATE=""; RQ_DIAG=""
WT_URL=""; WT_RES="not-attempted"; WT_PEERS=""; WT_RANGE=""; WT_LAT=""; WT_DIAG=""

write_results() {
  python3 - "$RQ_URL" "$RQ_RES" "$RQ_PEERS" "$RQ_RANGE" "$RQ_LAT" "$RQ_AUTH_STATE" "$RQ_DIAG" \
            "$WT_URL" "$WT_RES" "$WT_PEERS" "$WT_RANGE" "$WT_LAT" "$WT_DIAG" "$IP" <<'PY'
import json, sys, time
(rq_url, rq_res, rq_peers, rq_range, rq_lat, rq_auth, rq_diag,
 wt_url, wt_res, wt_peers, wt_range, wt_lat, wt_diag, ip) = sys.argv[1:]
def num(x):
    try: return int(x)
    except Exception: return x
doc = {"job": "ownhost-multi4", "at": int(time.time()), "egressIp": ip,
  "torrserver": {"base": "https://mandatory-three-contributed-bufing.trycloudflare.com",
                 "proven": "yes (v2 session, sandbox-verified through tunnel; session expired)",
                 "range": "http=206 bytes=1048576 magic=ftypisom", "peers": 21,
                 "note": "see MULTISERVER-TRIAL.md for the full v2 proof"},
  "rqbit":      {"base": rq_url, "proven": rq_res, "peers": num(rq_peers), "range": rq_range,
                 "startLatencySec": num(rq_lat), "auth": rq_auth, "diag": rq_diag[:1500]},
  "webtorrent": {"base": wt_url, "proven": wt_res, "peers": num(wt_peers), "range": wt_range,
                 "startLatencySec": num(wt_lat), "diag": wt_diag[:1500]},
  "own": {"proven": "live-via-s-chain (S7, not re-run here)"}}
open("own-host/live/multiserver-results.json", "w").write(json.dumps(doc, indent=1))
print("results:", json.dumps(doc))
PY
  push_files cloud-pc/storage/own-host/live/multiserver-results.json
}

# ---------- rqbit download with asset diagnostics ----------
API=$(curl -s -m 30 "https://api.github.com/repos/ikatson/rqbit/releases/latest")
RQ_ASSETS=$(printf '%s' "$API" | grep -oE '"browser_download_url": "[^"]+"' | cut -d'"' -f4)
log "rqbit assets: $(printf '%s' "$RQ_ASSETS" | tr '\n' ' ')"
RQ_URL_DL=$(printf '%s' "$RQ_ASSETS" | grep -E '/rqbit-linux-amd64$' | head -1)
if [ -z "$RQ_URL_DL" ]; then
  RQ_URL_DL=$(printf '%s' "$RQ_ASSETS" | grep -iE 'linux' | grep -iE 'amd64|x86_64' | grep -ivE 'desktop|\.deb$|\.rpm$|\.AppImage$|\.dmg$|\.zip$|\.tar|\.sig$|\.sha' | head -1)
fi
RQ_DIAG="assets: $(printf '%s' "$RQ_ASSETS" | tr '\n' ' ' | head -c 400) | chosen: $RQ_URL_DL"
log "rqbit chosen asset: $RQ_URL_DL"
RQ_DL=1
if [ -n "$RQ_URL_DL" ]; then
  curl -sL -m 240 -o /tmp/rqbit "$RQ_URL_DL" && chmod +x /tmp/rqbit && RQ_DL=0
fi
RQ_DIAG="$RQ_DIAG | file: $(file /tmp/rqbit 2>/dev/null | head -c 150) | size: $(stat -c%s /tmp/rqbit 2>/dev/null || echo 0)"
RQ_DIAG="$RQ_DIAG | version: $(/tmp/rqbit --version 2>&1 | head -c 120) | help: $(/tmp/rqbit --help 2>&1 | head -c 300)"
log "rqbit diag: $RQ_DIAG"

# ---------- rqbit start attempts ----------
RQ_UP=""
if [ "$RQ_DL" = "0" ]; then
  mkdir -p /tmp/rqdata
  for MODE in "server start" "server" ""; do
    log "rqbit start attempt: rqbit $MODE"
    ( cd /tmp/rqdata && RQBIT_HTTP_BASIC_AUTH_USERPASS="$RQ_USER:$RQ_PASS" /tmp/rqbit $MODE > /tmp/rq.log 2>&1 & )
    for i in $(seq 1 15); do
      curl -s -m 2 -u "$RQ_USER:$RQ_PASS" http://127.0.0.1:3030/torrents >/dev/null 2>&1 && { RQ_UP="$MODE"; break; }
      sleep 1
    done
    [ -n "$RQ_UP" ] && break
    RQ_DIAG="$RQ_DIAG | attempt '$MODE' log: $(tail -c 250 /tmp/rq.log 2>/dev/null | tr '\n' ' ')"
    pkill -f /tmp/rqbit 2>/dev/null; sleep 1
  done
  log "rqbit up via: '${RQ_UP}'"
  if [ -n "$RQ_UP" ]; then
    NA=$(curl -s -o /dev/null -w "%{http_code}" -m 5 http://127.0.0.1:3030/torrents || echo 000)
    RQ_AUTH_STATE="noauth-http=$NA (401 = auth enforced)"
    RQ_URL=$(tunnel 3030 /tmp/rq-tunnel.log)
    log "rqbit tunnel: $RQ_URL auth: $RQ_AUTH_STATE"
    python3 - "$RQ_URL" "$IP" <<'PY'
import json, sys, time
doc = {"service": "rqbit", "url": sys.argv[1], "egressIp": sys.argv[2],
       "port": 3030, "started": int(time.time()), "job": "ownhost-multi4"}
open("own-host/live/live-rqbit.json", "w").write(json.dumps(doc, indent=1))
PY
    push_files cloud-pc/storage/own-host/live/live-rqbit.json
    RQ_T0=$(date +%s)
    CODE=$(curl -s -o /tmp/rq-add.json -w "%{http_code}" -m 30 -u "$RQ_USER:$RQ_PASS" \
      --data-binary "$MAGNET" http://127.0.0.1:3030/torrents || echo 000)
    RQ_DIAG="$RQ_DIAG | add http=$CODE body: $(head -c 250 /tmp/rq-add.json)"
    log "rqbit add: http=$CODE $(head -c 150 /tmp/rq-add.json)"
  else
    RQ_RES="no (failed to start — see diag)"
  fi
fi

# ---------- WebTorrent: install + start EARLY (warms during rqbit proof) ----------
WT_T0=$(date +%s)
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
WT_DIAG="node: $(node --version 2>&1 | head -c 40)"
( cd /tmp/wt && npm init -y >/dev/null 2>&1 && timeout 150 npm install --no-audit --no-fund webtorrent > /tmp/wt-npm.log 2>&1 ) \
  && log "webtorrent npm install ok" || { log "webtorrent npm install FAILED"; WT_DIAG="$WT_DIAG | npm tail: $(tail -c 300 /tmp/wt-npm.log 2>/dev/null | tr '\n' ' ')"; }
if [ -d /tmp/wt/node_modules/webtorrent ]; then
  ( cd /tmp/wt && MAGNET="$MAGNET" WTU="$WT_USER" WTP="$WT_PASS" node server.mjs > /tmp/wt.log 2>&1 & )
  sleep 6
  WT_CODE=$(curl -s -o /dev/null -w "%{http_code}" -m 5 http://127.0.0.1:8080/status)
  log "webtorrent noauth /status http=$WT_CODE (401 = listening, auth wall up)"
  WT_DIAG="$WT_DIAG | noauth-status-http=$WT_CODE | wtlog: $(tail -c 250 /tmp/wt.log 2>/dev/null | tr '\n' ' ')"
  if [ "$WT_CODE" = "401" ] || [ "$WT_CODE" = "200" ]; then
    WT_URL=$(tunnel 8080 /tmp/wt-tunnel.log)
    log "webtorrent tunnel: $WT_URL"
    python3 - "$WT_URL" "$IP" <<'PY'
import json, sys, time
doc = {"service": "webtorrent", "url": sys.argv[1], "egressIp": sys.argv[2],
       "port": 8080, "started": int(time.time()), "job": "ownhost-multi4"}
open("own-host/live/live-webtorrent.json", "w").write(json.dumps(doc, indent=1))
PY
    push_files cloud-pc/storage/own-host/live/live-webtorrent.json
  else
    WT_RES="no (node server not listening — see diag)"
  fi
else
  WT_RES="no (npm install failed — see diag)"
fi
write_results

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
        out["err"] = "details keys: " + ",".join(det.keys())
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
  write_results
fi

# ---------- WebTorrent proof (long poll — it has been warming) ----------
if [ -n "$WT_URL" ]; then
  WT_IDX=""; ST=""
  while [ "$(el)" -lt 430 ]; do
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
    sleep 8
  done
  WT_DIAG="$WT_DIAG | last status: $ST"
  log "webtorrent sintel file index: $WT_IDX peers=$WT_PEERS"
  if [ -n "$WT_IDX" ]; then
    CODE=$(curl -s -o /tmp/wt-play.bin -w "%{http_code}" -m 120 -u "$WT_USER:$WT_PASS" \
      -H "Range: bytes=0-1048575" "http://127.0.0.1:8080/stream/$WT_IDX" || echo 000)
    MG=$(magic_of /tmp/wt-play.bin); SZ=$(stat -c%s /tmp/wt-play.bin 2>/dev/null || echo 0)
    WT_RANGE="http=$CODE bytes=$SZ magic=$MG"
    WT_LAT=$(( $(date +%s) - WT_T0 ))
    if [ "$CODE" = "206" ] && [ "$MG" = "ftypisom" ]; then WT_RES="yes"; else WT_RES="no ($WT_RANGE)"; fi
  else
    WT_RES="no (metadata never arrived within the poll window)"
  fi
  log "webtorrent proof: $WT_RES range=$WT_RANGE"
  write_results
fi

log "final: rqbit=$RQ_RES ($RQ_URL) webtorrent=$WT_RES ($WT_URL)"
while [ "$(el)" -lt 575 ]; do sleep 15; done
log "done"
