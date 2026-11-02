#!/bin/bash
# emu-test: TextNow signup run (tag TW).
# Modes: probe  = boot/install/launch, document screens up to the signup form.
#        signup = full scripted signup using TN_EMAIL/TN_PASS from env.
# The credentials are read ONLY from the environment. They are never
# printed, logged, or written to any file by this script.
SDK=$HOME/.cache/cloudpc-models/android-sdk
SYS_SDK=/usr/local/lib/android/sdk
export ANDROID_HOME=$SDK ANDROID_SDK_ROOT=$SDK
export ANDROID_AVD_HOME=$HOME/emu-avd-home
mkdir -p $SDK emu $ANDROID_AVD_HOME
AVDM="$SDK/cmdline-tools/latest/bin/avdmanager"
export PATH=$SDK/platform-tools:$SDK/emulator:$PATH
PACKAGE=com.enflick.android.TextNow
APKURL=https://github.com/boo4blue/boo4blue.github.io/releases/download/emu-assets/TextNow.xapk
TAG=TW
MODE=${1:-probe}
STEPS=emu/steps-$TAG.txt
: > $STEPS
log() { echo "[$(date +%H:%M:%S)] $*" >> $STEPS; echo "$*"; }

# ---------- python UI helpers (written to /tmp, never to storage) ----------
cat > /tmp/uifind.py <<'PYEOF'
import sys, re
import xml.etree.ElementTree as ET

def nodes(path):
    try:
        tree = ET.parse(path)
    except Exception:
        return []
    return list(tree.getroot().iter('node'))

def center(b):
    m = re.match(r'\[(\d+),(\d+)\]\[(\d+),(\d+)\]', b or '')
    if not m: return None
    x1, y1, x2, y2 = (int(v) for v in m.groups())
    return ((x1 + x2) // 2, (y1 + y2) // 2)

def find(path, pattern, want_clickable=False):
    rx = re.compile(pattern, re.I)
    fallback = None
    for n in nodes(path):
        label = (n.get('text') or '') + ' ' + (n.get('content-desc') or '')
        if rx.search(label):
            c = center(n.get('bounds'))
            if c is None: continue
            if n.get('clickable') == 'true':
                return c
            if fallback is None: fallback = c
    return fallback

def fields(path):
    out = []
    for n in nodes(path):
        if n.get('class') == 'android.widget.EditText':
            c = center(n.get('bounds'))
            if c is None: continue
            txt = n.get('text') or ''
            out.append({'x': c[0], 'y': c[1],
                        'hint': n.get('hint') or '',
                        'password': n.get('password'),
                        'textlen': len(txt)})
    return out

def texts(path):
    seen = []
    for n in nodes(path):
        t = (n.get('text') or '').strip()
        if t and t not in seen: seen.append(t)
    return seen

if __name__ == '__main__':
    cmd = sys.argv[1]
    if cmd == 'find':
        c = find(sys.argv[2], sys.argv[3])
        if c: print(c[0], c[1])
    elif cmd == 'fields':
        for f in fields(sys.argv[2]):
            print(f["x"], f["y"], 'pw=' + str(f['password']),
                  'len=' + str(f['textlen']), 'hint=' + f['hint'][:40])
    elif cmd == 'texts':
        for t in texts(sys.argv[2]): print(t)
PYEOF

cat > /tmp/typetext.py <<'PYEOF'
import os, subprocess, sys
# Type the value of the env var named in argv[1] into the focused field.
# Remote command is single-quote wrapped so the device shell cannot
# reinterpret characters; % and space are escaped for `input text`.
val = os.environ.get(sys.argv[1], '')
esc = val.replace('%', '%%').replace(' ', '%s')
remote = "input text '" + esc.replace("'", "'\\''") + "'"
subprocess.run(['adb', 'shell', remote])
PYEOF

tapxy() { adb shell input tap "$1" "$2" >/dev/null 2>&1; }
dump_ui() { # $1 = suffix
  adb shell uiautomator dump /sdcard/ui.xml >/dev/null 2>&1
  adb pull /sdcard/ui.xml emu/ui-$TAG-$1.xml >/dev/null 2>&1
}
shot() { adb exec-out screencap -p > emu/shot-$TAG-$1.png 2>/dev/null; }
tap_text() { # $1 = dump suffix, $2 = regex ; returns 0 if tapped
  local xy
  xy=$(python3 /tmp/uifind.py find emu/ui-$TAG-$1.xml "$2")
  if [ -n "$xy" ]; then tapxy $xy; log "tapped [$2] at $xy (screen $1)"; return 0; fi
  return 1
}

# ---------- SDK fast path ----------
if [ ! -x $SDK/emulator/emulator ] || [ ! -f $SDK/system-images/android-34/google_apis/x86_64/system.img ]; then
  log "SDK missing -> inline setup"
  bash emu/run10.sh setup >> emu/setup-$TAG.log 2>&1
fi
if [ ! -x $SDK/emulator/emulator ]; then log "FATAL: emulator missing after setup"; exit 1; fi

# ---------- boot / install / launch ----------
pkill -f qemu-system 2>/dev/null; sleep 2; adb kill-server 2>/dev/null; sleep 1
curl -sL --retry 2 -o /tmp/test-$TAG.xapk "$APKURL"
log "xapk bytes: $(stat -c%s /tmp/test-$TAG.xapk 2>/dev/null) md5: $(md5sum /tmp/test-$TAG.xapk 2>/dev/null | cut -d' ' -f1)"
echo no | $AVDM create avd -n dc$TAG -k "system-images;android-34;google_apis;x86_64" -d pixel_6 --force > emu/avd-$TAG.log 2>&1
nohup $SDK/emulator/emulator -avd dc$TAG -no-window -no-audio -no-boot-anim -gpu angle_indirect -feature -Vulkan -memory 2048 -accel on -no-snapshot > emu/boot-$TAG.log 2>&1 &
timeout 150 adb wait-for-device
ok=0
for i in $(seq 1 30); do
  b=$(adb shell getprop sys.boot_completed 2>/dev/null | tr -d '\r')
  if [ "$b" = "1" ]; then ok=1; log "booted after ~$((i*5))s"; break; fi
  sleep 5
done
echo "boot_completed=$ok" >> $STEPS
if [ "$ok" != "1" ]; then log "BOOT FAILED"; tail -8 emu/boot-$TAG.log >> $STEPS; exit 0; fi
SZ=$(adb shell wm size | grep -o '[0-9]*x[0-9]*' | head -1); W=${SZ%x*}; H=${SZ#*x}
log "screen=${W}x${H}"
mkdir -p /tmp/tnx && cd /tmp/tnx && unzip -o -q /tmp/test-$TAG.xapk && cd - >/dev/null
adb install-multiple /tmp/tnx/com.enflick.android.TextNow.apk /tmp/tnx/config.arm64_v8a.apk /tmp/tnx/config.xxhdpi.apk > emu/install-$TAG.txt 2>&1
log "install: $(grep -c Success emu/install-$TAG.txt) success marker; $(adb shell pm list packages | grep -c $PACKAGE) package listed"
adb logcat -c
adb shell monkey -p $PACKAGE -c android.intent.category.LAUNCHER 1 >/dev/null 2>&1
sleep 12
tapxy $(awk -v w=$W -v h=$H 'BEGIN{printf "%d %d", w*0.80, h*0.27}')  # dismiss immersive toast
sleep 8
dump_ui s0; shot s0
log "s0 texts: $(python3 /tmp/uifind.py texts emu/ui-$TAG-s0.xml | head -12 | tr '\n' '|')"

finish() {
  adb logcat -d > emu/logcat-$TAG.txt 2>&1
  adb emu kill 2>/dev/null
  rm -f /tmp/test-$TAG.xapk; rm -rf /tmp/tnx
  log "RUN_DONE_$TAG mode=$MODE result=$1"
  echo "RUN_DONE_$TAG $1"
  exit 0
}

# walk forward through landing screens toward the signup form
walk_to_form() {
  local i pat
  for i in 1 2 3 4; do
    dump_ui w$i; shot w$i
    # already at a form? (an EditText on screen)
    if python3 /tmp/uifind.py fields emu/ui-$TAG-w$i.xml | grep -q .; then
      log "form reached at w$i"; return 0
    fi
    for pat in 'sign up' 'get started' 'create account' 'continue with email' 'sign up with email' 'continue' 'next'; do
      if tap_text w$i "$pat"; then break; fi
    done
    sleep 5
  done
  dump_ui wfinal; shot wfinal
  python3 /tmp/uifind.py fields emu/ui-$TAG-wfinal.xml | grep -q . && return 0
  return 1
}

if [ "$MODE" = probe ]; then
  if walk_to_form; then log "PROBE: signup form reached"; else log "PROBE: form NOT reached"; fi
  dump_ui probe-end; shot probe-end
  log "probe-end texts: $(python3 /tmp/uifind.py texts emu/ui-$TAG-probe-end.xml | head -20 | tr '\n' '|')"
  log "probe-end fields: $(python3 /tmp/uifind.py fields emu/ui-$TAG-probe-end.xml | tr '\n' '|')"
  finish PROBE_DONE
fi

# ================= SIGNUP =================
if [ -z "$TN_EMAIL" ] || [ -z "$TN_PASS" ]; then log "FATAL: credentials env missing"; finish NO_CREDS; fi
if ! walk_to_form; then log "STOP: signup form not reached"; finish FORM_NOT_REACHED; fi

dump_ui form; shot form
FL=$(python3 /tmp/uifind.py fields emu/ui-$TAG-form.xml)
log "form fields: $(echo "$FL" | tr '\n' '|')"
# email field = first non-password EditText; password field = password=true one
EF=$(echo "$FL" | awk '$3 != "pw=true"' | head -1)
PF=$(echo "$FL" | awk '$3 == "pw=true"' | head -1)
if [ -z "$EF" ] || [ -z "$PF" ]; then log "STOP: could not identify email/password fields"; finish FIELDS_UNKNOWN; fi
tapxy $(echo "$EF" | awk '{print $1, $2}'); sleep 1
python3 /tmp/typetext.py TN_EMAIL
sleep 1
tapxy $(echo "$PF" | awk '{print $1, $2}'); sleep 1
python3 /tmp/typetext.py TN_PASS
sleep 1
dump_ui typed
PWLINE=$(python3 /tmp/uifind.py fields emu/ui-$TAG-typed.xml | awk '$3 == "pw=true"' | head -1)
PWLEN=$(echo "$PWLINE" | sed -n 's/.*len=\([0-9]*\).*/\1/p')
if [ "$PWLEN" = "${#TN_PASS}" ]; then log "pw_len_check=OK"; else log "pw_len_check=MISMATCH"; finish PW_TYPE_MISMATCH; fi
EMLINE=$(python3 /tmp/uifind.py fields emu/ui-$TAG-typed.xml | awk '$3 != "pw=true"' | head -1)
EMLEN=$(echo "$EMLINE" | sed -n 's/.*len=\([0-9]*\).*/\1/p')
if [ "$EMLEN" = "${#TN_EMAIL}" ]; then log "email_len_check=OK"; else log "email_len_check=MISMATCH (len may include hint)"; fi
shot typed
# tick a terms checkbox if one is present and unchecked near 'agree/terms' text
if python3 /tmp/uifind.py texts emu/ui-$TAG-typed.xml | grep -qi 'agree\|terms'; then
  CB=$(python3 - <<'PYEOF'
import re
import xml.etree.ElementTree as ET
try:
    root = ET.parse('emu/ui-TW-typed.xml').getroot()
    for n in root.iter('node'):
        if n.get('class') == 'android.widget.CheckBox' and n.get('checked') == 'false':
            m = re.match(r'\[(\d+),(\d+)\]\[(\d+),(\d+)\]', n.get('bounds') or '')
            if m:
                x1,y1,x2,y2 = (int(v) for v in m.groups())
                print((x1+x2)//2, (y1+y2)//2)
                break
except Exception:
    pass
PYEOF
)
  if [ -n "$CB" ]; then tapxy $CB; log "ticked terms checkbox"; sleep 1; fi
fi
# submit
dump_ui pre-submit
SUBMITTED=0
for pat in '^sign up$' 'sign up' 'create account' '^continue$' 'continue' 'next'; do
  if tap_text pre-submit "$pat"; then SUBMITTED=1; break; fi
done
if [ "$SUBMITTED" != 1 ]; then log "STOP: no submit button found"; finish NO_SUBMIT; fi
sleep 10
dump_ui post1; shot post1
T1=$(python3 /tmp/uifind.py texts emu/ui-$TAG-post1.xml)
log "post1 texts: $(echo "$T1" | head -20 | tr '\n' '|')"
if echo "$T1" | grep -qi 'captcha\|not a robot\|verify you are human\|puzzle'; then
  log "STOP: bot challenge presented"; finish BOT_CHALLENGE
fi
if echo "$T1" | grep -qi 'enter the code\|verification code\|check your email'; then
  log "STOP: email verification code demanded"; finish EMAIL_CODE_DEMANDED
fi
if echo "$T1" | grep -qi 'already exists\|already registered\|invalid email\|password must\|something went wrong\|unable to create\|cannot create\|try again later'; then
  log "STOP: signup refused with on-screen error"; finish SIGNUP_REFUSED
fi
sleep 6
dump_ui post2; shot post2
T2=$(python3 /tmp/uifind.py texts emu/ui-$TAG-post2.xml)
log "post2 texts: $(echo "$T2" | head -20 | tr '\n' '|')"

# ---------- number picker ----------
handle_picker() {
  local s=$1
  # area-code search field present?
  local AF=$(python3 /tmp/uifind.py fields emu/ui-$TAG-$s.xml | head -1)
  if [ -n "$AF" ]; then
    tapxy $(echo "$AF" | awk '{print $1, $2}'); sleep 1
    adb shell input text 260; sleep 3
    dump_ui pick-search; shot pick-search
    log "pick-search texts: $(python3 /tmp/uifind.py texts emu/ui-$TAG-pick-search.xml | head -20 | tr '\n' '|')"
    s=pick-search
  fi
  # tap first number-looking entry: (260) xxx-xxxx / 260-xxx-xxxx / plain 10-digit
  local NUM=$(python3 - <<'PYEOF'
import re
import xml.etree.ElementTree as ET
for path in ['emu/ui-TW-pick-search.xml', 'emu/ui-TW-post2.xml', 'emu/ui-TW-post1.xml']:
    try:
        root = ET.parse(path).getroot()
    except Exception:
        continue
    for n in root.iter('node'):
        t = (n.get('text') or '').strip()
        digits = re.sub(r'\D', '', t)
        if re.fullmatch(r'\(?\d{3}\)?[ .-]?\d{3}[ .-]?\d{4}', t) or (len(digits) == 10 and t.replace(' ','').replace('-','').replace('(','').replace(')','').replace('.','').isdigit()):
            m = re.match(r'\[(\d+),(\d+)\]\[(\d+),(\d+)\]', n.get('bounds') or '')
            if m:
                x1,y1,x2,y2 = (int(v) for v in m.groups())
                print((x1+x2)//2, (y1+y2)//2)
                raise SystemExit
PYEOF
)
  if [ -n "$NUM" ]; then tapxy $NUM; log "tapped a number entry"; sleep 3; return 0; fi
  return 1
}
PICKED=0
if echo "$T2" | grep -qi 'area code\|pick your number\|choose your number\|select a number\|phone number'; then
  if handle_picker post2; then PICKED=1; fi
  dump_ui pick2; shot pick2
  for pat in '^continue$' 'continue' 'confirm' '^select$' 'get this number' 'claim' 'next' 'done'; do
    if tap_text pick2 "$pat"; then break; fi
  done
  sleep 6
fi
dump_ui after-pick; shot after-pick
log "after-pick texts: $(python3 /tmp/uifind.py texts emu/ui-$TAG-after-pick.xml | head -20 | tr '\n' '|')"

# ---------- dismiss post-signup dialogs ----------
for i in 1 2 3 4 5 6; do
  dump_ui dlg$i
  DONE=0
  for pat in 'don.t allow' 'deny' 'skip' 'not now' 'no thanks' 'later' 'got it' '^ok$' 'maybe later' 'dismiss'; do
    if tap_text dlg$i "$pat"; then DONE=1; break; fi
  done
  sleep 3
  if [ "$DONE" = 0 ]; then break; fi
done
dump_ui home; shot home
log "home texts: $(python3 /tmp/uifind.py texts emu/ui-$TAG-home.xml | head -25 | tr '\n' '|')"
log "pid@end: $(adb shell pidof $PACKAGE)"

# ---------- find the assigned number ----------
for pat in 'profile' 'account' 'settings' 'more' 'menu'; do
  if tap_text home "$pat"; then break; fi
done
sleep 3
dump_ui profile; shot profile
python3 /tmp/uifind.py texts emu/ui-$TAG-profile.xml > emu/texts-$TAG-profile.txt
python3 /tmp/uifind.py texts emu/ui-$TAG-home.xml > emu/texts-$TAG-home.txt
grep -hoE '\(?[0-9]{3}\)?[ .-][0-9]{3}[ .-][0-9]{4}' emu/texts-$TAG-profile.txt emu/texts-$TAG-home.txt emu/ui-$TAG-profile.xml 2>/dev/null | sort -u > emu/number-$TAG.txt
log "number candidates: $(cat emu/number-$TAG.txt | tr '\n' '|')"
if [ "$PICKED" = 1 ] || [ -s emu/number-$TAG.txt ]; then
  finish SIGNED_UP
else
  finish UNKNOWN_END_STATE
fi
