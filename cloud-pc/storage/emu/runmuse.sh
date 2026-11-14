#!/bin/bash
# runmuse.sh — Muse app (com.facebook.aura) emulator UI walk (Cloud PC).
# Mode: full — download APK (release asset), boot google_apis AVD (arm64
# translation), install, launch, then a UI-dump-driven walk over every
# surface reachable WITHOUT an account: onboarding advancers, named tabs
# (Chats/Feed/Ideas/Library/Goals/Tasks/Spaces/Memory), menus/settings
# entrances, generic buttons. STOPS at any credential field (wall =
# capture + end). Never types, never signs in. Permission dialogs are
# captured, then DENIED (never grant on the user's behalf). If focus
# leaves the app (browser/custom tab), it backs out.
# Artifacts in emu/: shot-MUSE-<nn>-<slug>.png, ui-MUSE-<nn>-<slug>.xml,
# index-MUSE.txt, steps log in verdict-MUSE.txt, logcat-MUSE.txt.
# Ends with a self-commit of emu/ (the workflow's own commit step never
# runs in practice: the inbox loop parks on stream-gate jobs until the
# 50-min cap; gate scripts set the self-push precedent).
SDK=$HOME/.cache/cloudpc-models/android-sdk
export ANDROID_HOME=$SDK ANDROID_SDK_ROOT=$SDK
export ANDROID_AVD_HOME=$HOME/emu-avd-home
export PATH=$SDK/platform-tools:$SDK/emulator:$PATH
mkdir -p emu $ANDROID_AVD_HOME
PACKAGE=com.facebook.aura
APKURL=
[ -f emu/config.env ] && . emu/config.env
TAG=MUSE
V=emu/verdict-$TAG.txt
IDX=emu/index-$TAG.txt
say() { echo "$1" | tee -a $V; }

uidump() { # $1 = dest file; retries once
  adb shell uiautomator dump /sdcard/ui.xml > /dev/null 2>&1
  adb exec-out cat /sdcard/ui.xml > "$1" 2>/dev/null
  if [ ! -s "$1" ]; then
    sleep 2
    adb shell uiautomator dump /sdcard/ui.xml > /dev/null 2>&1
    adb exec-out cat /sdcard/ui.xml > "$1" 2>/dev/null
  fi
}
focuspkg() {
  adb shell dumpsys window windows 2>/dev/null | grep -m1 -o 'mCurrentFocus=Window{[^ ]* [^ ]*/' | sed 's/.* //' | tr -d '/'
}
slugify() { echo "$1" | tr '[:upper:]' '[:lower:]' | sed -E 's/[^a-z0-9]+/-/g; s/^-+|-+$//g' | cut -c1-24; }

cat > emu/.walker-muse.py << 'PYEOF'
import hashlib, os, re, sys

xml_path, tried_path, focus_pkg = sys.argv[1], sys.argv[2], sys.argv[3] if len(sys.argv) > 3 else ""
try:
    xml = open(xml_path, encoding='utf-8', errors='replace').read()
except Exception:
    print("SIG none"); print("TEXTS "); print("NONE"); sys.exit(0)

def attr(tag, name):
    m = re.search(name + r'="([^"]*)"', tag)
    return m.group(1) if m else ""

nodes = []
for m in re.finditer(r'<node[^>]*>', xml):
    t = m.group(0)
    b = re.search(r'bounds="\[(\d+),(\d+)\]\[(\d+),(\d+)\]"', t)
    nodes.append(dict(
        text=attr(t, 'text'), desc=attr(t, 'content-desc'), cls=attr(t, 'class'),
        click=attr(t, 'clickable') == 'true', pwd=attr(t, 'password') == 'true',
        bounds=tuple(map(int, b.groups())) if b else None))

texts = [(n['text'] or n['desc']) for n in nodes if (n['text'] or n['desc'])]
sig = hashlib.md5('|'.join(sorted(set(texts))).encode()).hexdigest()[:8]
print("SIG " + sig)
print("TEXTS " + ' ~ '.join(texts[:14])[:280])
tried = set()
if os.path.exists(tried_path):
    tried = set(open(tried_path).read().splitlines())
tapcount = len([k for k in tried if not k.endswith('|__swipe')])
screen_text = ' '.join(texts).lower()

def find(patterns, need_bounds=True):
    for pat in patterns:
        rx = re.compile(pat, re.I)
        best = None
        for n in nodes:
            label = n['text'] or n['desc']
            if not label or not rx.search(label):
                continue
            if need_bounds and not n['bounds']:
                continue
            if (sig + '|' + label) in tried:
                continue
            if n['click']:
                best = n; break
            if best is None:
                best = n
        if best is not None:
            return best
    return None

def emit_tap(n):
    x1, y1, x2, y2 = n['bounds']
    print("TAP %d %d %s" % ((x1 + x2) // 2, (y1 + y2) // 2, (n['text'] or n['desc'])))
    sys.exit(0)

# --- hard walls first: credential fields mean stop, always ---
if any(n['pwd'] for n in nodes):
    print("WALL password-field"); sys.exit(0)
has_edit = any('EditText' in n['cls'] for n in nodes)
if has_edit and re.search(r'log ?in|sign ?in|sign ?up|e-?mail|password|phone number|create (an )?account', screen_text):
    print("WALL credential-form"); sys.exit(0)
if focus_pkg in ('android', 'com.android.systemui') and re.search(r"isn't responding|keeps stopping|not responding", screen_text):
    print("BLOCKED system-dialog"); sys.exit(0)

# --- system permission dialog: capture happened in bash; deny, never grant ---
if 'permissioncontroller' in focus_pkg:
    n = find([r"don't allow", r'^deny', r'not now', r'never'])
    if n: emit_tap(n)
    print("NONE"); sys.exit(0)

# --- onboarding advancers / guest paths ---
ADV = [r'^get started$', r'^continue$', r'continue', r'^next$', r'^skip', r'skip for now',
       r'explore', r'maybe later', r'not now', r'i agree', r'^agree', r'^accept',
       r'got it', r'^dismiss$', r'^done$', r'^ok$']
n = find(ADV)
if n: emit_tap(n)

# --- named surfaces / tabs ---
TABS = [r'^chats$', r'^feed$', r'^ideas$', r'^library$', r'^goals$',
        r'background tasks', r'^tasks$', r'^spaces$', r'^memory$']
n = find(TABS)
if n: emit_tap(n)

# --- menus / settings entrances ---
MENU = [r'^more options$', r'open navigation drawer', r'^menu$', r'^settings$',
        r'^more$', r'navigation menu']
n = find(MENU)
if n: emit_tap(n)

# --- sign-in chooser with no other way forward = the wall ---
if re.search(r'continue with|log ?in with|sign ?in with|sign up with', screen_text):
    print("WALL signin-chooser"); sys.exit(0)

# --- generic labeled buttons (never login-ish) ---
DENY = re.compile(r'log ?in|sign ?in|sign ?up|create|forgot|password|facebook|instagram|whatsapp|google|apple|e-?mail|phone|terms|privacy policy', re.I)
if tapcount < 16:
    for n in nodes:
        label = n['text'] or n['desc']
        if not label or not n['bounds'] or len(label) < 2 or len(label) > 40:
            continue
        if DENY.search(label) or (sig + '|' + label) in tried:
            continue
        if n['click']:
            emit_tap(n)

if (sig + '|__swipe') not in tried:
    print("SWIPE"); sys.exit(0)
print("NONE")
PYEOF

mode=$1
if [ "$mode" = full ]; then
  : > $V; : > $IDX
  say "=== Muse emu walk $(date -u +%H:%M:%S)Z package=$PACKAGE"
  if [ ! -x $SDK/emulator/emulator ]; then say "VERDICT=FATAL_NO_EMULATOR (setup missing)"; fi
  if [ -x $SDK/emulator/emulator ]; then
  pkill -f qemu-system 2>/dev/null; sleep 2; adb kill-server 2>/dev/null; sleep 1
  APK=/tmp/muse-walk.apk
  curl -sL --retry 2 --max-time 240 -o $APK "$APKURL"
  say "apk_bytes=$(stat -c%s $APK 2>/dev/null) apk_md5=$(md5sum $APK 2>/dev/null | cut -d' ' -f1)"
  echo no | $SDK/cmdline-tools/latest/bin/avdmanager create avd -n musemu -k "system-images;android-34;google_apis;x86_64" -d pixel_6 --force > emu/avd-$TAG.log 2>&1
  nohup $SDK/emulator/emulator -avd musemu -no-window -no-audio -no-boot-anim -gpu swiftshader_indirect -feature -Vulkan -memory 2048 -accel on -no-snapshot > emu/boot-$TAG.log 2>&1 &
  timeout 150 adb wait-for-device
  ok=0
  for i in $(seq 1 40); do
    b=$(adb shell getprop sys.boot_completed 2>/dev/null | tr -d '\r')
    if [ "$b" = "1" ]; then ok=1; say "boot_completed=1 after ~$((i*5))s"; break; fi
    sleep 5
  done
  say "boot_ok=$ok"
  if [ "$ok" = "1" ]; then
  SZ=$(adb shell wm size | grep -o '[0-9]*x[0-9]*' | head -1); W=${SZ%x*}; H=${SZ#*x}
  say "screen=${W}x${H}"
  adb install -r $APK > emu/install-$TAG.txt 2>&1
  say "install_exit=$?"
  pml=$(adb shell pm list packages 2>/dev/null | grep -c 'com.facebook.aura')
  say "pm_list_match=$pml"
  if [ "$pml" = "0" ]; then
    say "VERDICT=INSTALL_FAIL"
    adb logcat -d > emu/logcat-$TAG.txt 2>&1
  else
  adb shell monkey -p $PACKAGE -c android.intent.category.LAUNCHER 1 > /dev/null 2>&1
  sleep 12
  adb shell input tap $(awk -v w=$W -v h=$H 'BEGIN{printf "%d %d", w*0.80, h*0.27}')  # dismiss immersive toast
  sleep 3
  pid1=$(adb shell pidof $PACKAGE | tr -d '\r'); say "pid_after_launch=${pid1:-NONE}"
  # ---------------- walk ----------------
  TRIED=/tmp/muse-tried.txt; : > $TRIED
  cur_slug=launch; backs=0; stopreason=""
  for step in $(seq 1 24); do
    nn=$(printf "%02d" $step)
    adb exec-out screencap -p > emu/shot-$TAG-tmp.png 2>/dev/null
    uidump emu/ui-$TAG-cur.xml
    fp=$(focuspkg)
    out=$(python3 emu/.walker-muse.py emu/ui-$TAG-cur.xml $TRIED "$fp")
    sig=$(echo "$out" | grep '^SIG' | awk '{print $2}')
    texts=$(echo "$out" | grep '^TEXTS' | cut -c7-)
    act=$(echo "$out" | tail -1)
    mv emu/shot-$TAG-tmp.png emu/shot-$TAG-$nn-$cur_slug.png
    cp emu/ui-$TAG-cur.xml emu/ui-$TAG-$nn-$cur_slug.xml
    echo "shot-$TAG-$nn-$cur_slug.png | focus=$fp | texts: $texts | next: $act" >> $IDX
    say "step$nn shot=shot-$TAG-$nn-$cur_slug.png bytes=$(stat -c%s emu/shot-$TAG-$nn-$cur_slug.png) sig=$sig focus=$fp next=[$act]"
    pidn=$(adb shell pidof $PACKAGE 2>/dev/null | tr -d '\r')
    if [ -z "$pidn" ]; then stopreason="APP_EXITED"; say "pid_gone_at_step=$nn"; break; fi
    case "$act" in
      WALL*) stopreason="$act"; break ;;
      BLOCKED*) stopreason="$act"; break ;;
      TAP*)
        xy=$(echo "$act" | awk '{print $2, $3}')
        label=$(echo "$act" | cut -d' ' -f4-)
        echo "$sig|$label" >> $TRIED
        cur_slug=$(slugify "$label"); [ -z "$cur_slug" ] && cur_slug=tap$nn
        if [ "$fp" != "$PACKAGE" ] && [ "$fp" != "" ] && ! echo "$fp" | grep -q permissioncontroller; then
          say "external_focus=$fp (backing out, not tapping)"
          adb shell input keyevent BACK; sleep 2; cur_slug=back$nn; continue
        fi
        adb shell input tap $xy; sleep 3 ;;
      SWIPE)
        echo "$sig|__swipe" >> $TRIED
        adb shell input swipe $((W/2)) $((H*3/4)) $((W/2)) $((H/4)) 300; sleep 2 ;;
      *)
        if [ $backs -lt 3 ]; then backs=$((backs+1)); adb shell input keyevent BACK; sleep 2; cur_slug=back$nn;
        else stopreason="NO_ADVANCE"; break; fi ;;
    esac
  done
  say "walk_stop_reason=${stopreason:-STEP_LIMIT}"
  pid2=$(adb shell pidof $PACKAGE | tr -d '\r'); say "pid_at_end=${pid2:-NONE}"
  fi
  adb logcat -d > emu/logcat-$TAG.txt 2>&1
  grep -E 'AndroidRuntime|FATAL|aura|emulator|Abort' emu/logcat-$TAG.txt | tail -40 > emu/logcat-$TAG-grep.txt
  say "logcat_bytes=$(stat -c%s emu/logcat-$TAG.txt)"
  adb emu kill 2>/dev/null
  rm -f $APK
  fi
  fi
  # ---------------- self-commit results ----------------
  ROOT=$(cd "$PWD/../.." && pwd)
  cd $ROOT
  git config user.name "cloudpc" 2>/dev/null; git config user.email "cloudpc@local" 2>/dev/null
  tail -4000 cloud-pc/storage/emu/logcat-$TAG.txt > /tmp/lc.txt 2>/dev/null && mv /tmp/lc.txt cloud-pc/storage/emu/logcat-$TAG.txt
  git add cloud-pc/storage/emu 2>/dev/null
  git diff --cached --quiet || git commit -m "cloudpc: muse emu walk results" > /dev/null 2>&1
  pushed=0
  for i in 1 2 3 4; do
    if git push > /dev/null 2>&1; then pushed=1; break; fi
    git fetch origin main > /dev/null 2>&1
    git rebase origin/main > /dev/null 2>&1 || git rebase --abort > /dev/null 2>&1
    sleep 3
  done
  echo "self_commit_pushed=$pushed" >> $V
  say "WALK_DONE"
fi
