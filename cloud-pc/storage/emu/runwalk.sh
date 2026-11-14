#!/bin/bash
# emu-walk.sh — generic "emu-screens" walker for Onion APK Editor's
# Run in emulator lane (Part 10). Runs on the Cloud PC rig (GitHub
# Actions KVM) as a shell job; see EMU-SCREENS-JOB.md in this folder
# for the full contract.
#
# Mode: full — read emu/config.env (PACKAGE / APKURL / JOBID /
# MAXSCREENS), boot the google_apis android-34 x86_64 AVD (ARM
# translation — inspected apps are usually arm64-only), install the
# APK, launch it, and walk every screen reachable WITHOUT an account:
# UI-dump-driven taps on labeled clickable nodes, one screencap per
# new screen signature. HARD RULES: nothing is ever typed; a password
# field, a credential form, or a sign-in chooser with no other way
# forward is a WALL (captured, recorded, backed out of — never
# filled); system permission dialogs are captured then DENIED; and
# focus discipline is verified BEFORE every capture: after a wall
# only verifiable target focus may continue (else WALL_EXIT), known
# foreign focus stops the walk unsighted (FOCUS_EXIT), and focus
# that stays undetermined past one blind step stops it too
# (FOCUS_UNKNOWN). The walk ends with one stop=<reason> line in
# emu-results.txt (the editor's importer ignores unknown lines).
#
# Outputs in emu/: NN-<stem>.png per screen, emu-results.txt
# (file=/label= + walled= lines, the EmuRuns format), and
# emu-results-<JOBID>.zip holding both — then a self-commit of the
# zip to cloud-pc/storage/emu/ (house pattern: the workflow's own
# commit step is unreliable, gate scripts set the self-push
# precedent). Install verdict comes from `pm list packages`, never
# from piped install output.
SDK=$HOME/.cache/cloudpc-models/android-sdk
export ANDROID_HOME=$SDK ANDROID_SDK_ROOT=$SDK
export ANDROID_AVD_HOME=$HOME/emu-avd-home
export PATH=$SDK/platform-tools:$SDK/emulator:$PATH
mkdir -p emu $ANDROID_AVD_HOME
PACKAGE= APKURL= JOBID=walk MAXSCREENS=60
[ -f emu/config.env ] && . emu/config.env
[ -z "$MAXSCREENS" ] && MAXSCREENS=60
V=emu/verdict-walk.txt
R=emu/emu-results.txt
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
focuspkg_fallback() {
  # Primary probe came back empty: try the other focus fields before
  # conceding focus is undetermined (mFocusedApp in the window dump,
  # then the activity stack's top resumed activity).
  local p
  p=$(adb shell dumpsys window windows 2>/dev/null | grep -m1 'mFocusedApp' | grep -oE '[a-zA-Z][a-zA-Z0-9._]*/' | head -1 | tr -d '/')
  [ -n "$p" ] && { echo "$p"; return; }
  p=$(adb shell dumpsys activity activities 2>/dev/null | grep -m1 'topResumedActivity' | grep -oE 'u0 [a-zA-Z][a-zA-Z0-9._]*/' | awk '{print $2}' | tr -d '/')
  echo "$p"
}
focusprobe() {
  local p; p=$(focuspkg)
  [ -n "$p" ] && { echo "$p"; return; }
  focuspkg_fallback
}
slugify() { echo "$1" | tr '[:upper:]' '[:lower:]' | sed -E 's/[^a-z0-9]+/-/g; s/^-+|-+$//g' | cut -c1-24; }

cat > emu/.walker.py << 'PYEOF'
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
screen_text = ' '.join(texts).lower()

def find(patterns):
    for pat in patterns:
        rx = re.compile(pat, re.I)
        best = None
        for n in nodes:
            label = n['text'] or n['desc']
            if not label or not rx.search(label) or not n['bounds']:
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
    print("WALL sign-in wall (password field)"); sys.exit(0)
has_edit = any('EditText' in n['cls'] for n in nodes)
if has_edit and re.search(r'log ?in|sign ?in|sign ?up|e-?mail|password|phone number|create (an )?account', screen_text):
    print("WALL sign-in wall (credential form)"); sys.exit(0)
if focus_pkg in ('android', 'com.android.systemui') and re.search(r"isn't responding|keeps stopping|not responding", screen_text):
    print("BLOCKED system dialog (app not responding)"); sys.exit(0)

# --- system permission dialog: deny, never grant ---
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

# --- a sign-in chooser with no other way forward is the wall ---
if re.search(r'continue with|log ?in with|sign ?in with|sign up with', screen_text):
    print("WALL sign-in wall (account chooser)"); sys.exit(0)

# --- generic labeled clickable nodes (never login-ish) ---
DENY = re.compile(r'log ?in|sign ?in|sign ?up|create (an )?account|forgot|password|facebook|instagram|whatsapp|google|apple|e-?mail|phone number|terms|privacy policy', re.I)
for n in nodes:
    label = n['text'] or n['desc']
    if not label or not n['bounds'] or not n['click']:
        continue
    if len(label) < 2 or len(label) > 40:
        continue
    if DENY.search(label) or (sig + '|' + label) in tried:
        continue
    emit_tap(n)

if (sig + '|__swipe') not in tried:
    print("SWIPE"); sys.exit(0)
print("NONE")
PYEOF

mode=$1
if [ "$mode" = full ]; then
  : > $V; : > $R
  say "=== emu-screens walk $(date -u +%H:%M:%S)Z package=$PACKAGE job=$JOBID max=$MAXSCREENS"
  if [ ! -x $SDK/emulator/emulator ]; then say "VERDICT=FATAL_NO_EMULATOR (setup missing)"; exit 0; fi
  pkill -f qemu-system 2>/dev/null; sleep 2; adb kill-server 2>/dev/null; sleep 1
  APK=/tmp/emu-walk-$JOBID.apk
  curl -sL --retry 2 --max-time 240 -o $APK "$APKURL"
  say "apk_bytes=$(stat -c%s $APK 2>/dev/null) apk_md5=$(md5sum $APK 2>/dev/null | cut -d' ' -f1)"
  echo no | $SDK/cmdline-tools/latest/bin/avdmanager create avd -n walkemu -k "system-images;android-34;google_apis;x86_64" -d pixel_6 --force > emu/avd-walk.log 2>&1
  nohup $SDK/emulator/emulator -avd walkemu -no-window -no-audio -no-boot-anim -gpu swiftshader_indirect -feature -Vulkan -memory 2048 -accel on -no-snapshot > emu/boot-walk.log 2>&1 &
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
  adb install -r $APK > emu/install-walk.txt 2>&1
  say "install_exit=$?"
  pml=$(adb shell pm list packages 2>/dev/null | grep -c "$PACKAGE")
  say "pm_list_match=$pml"
  if [ "$pml" = "0" ]; then
    say "VERDICT=INSTALL_FAIL"
    adb logcat -d > emu/logcat-walk.txt 2>&1
  else
  adb shell monkey -p $PACKAGE -c android.intent.category.LAUNCHER 1 > /dev/null 2>&1
  sleep 12
  adb shell input tap $(awk -v w=$W -v h=$H 'BEGIN{printf "%d %d", w*0.80, h*0.27}')  # dismiss immersive toast
  sleep 3
  pid1=$(adb shell pidof $PACKAGE | tr -d '\r'); say "pid_after_launch=${pid1:-NONE}"
  # ---------------- walk ----------------
  TRIED=/tmp/emu-walk-tried.txt; : > $TRIED
  cur_slug=launch; cur_label=Launch; backs=0; walls=0; stopreason=""; unknown=0
  declare -A SEEN
  for step in $(seq 1 $MAXSCREENS); do
    nn=$(printf "%02d" $step)
    fp=$(focusprobe)
    # ---- focus discipline: never photograph another app ----
    if [ $walls -ge 1 ]; then
      # A wall is on record: the walk may only continue while the
      # target is VERIFIABLY in front. Foreign focus means the
      # back-out left the app; undetermined focus after a wall is
      # just as disqualifying (stopAtSignInWall, EMU-SCREENS-JOB.md).
      # Either way: stop here, before any capture.
      if [ "$fp" != "$PACKAGE" ]; then
        stopreason="WALL_EXIT"; say "step$nn WALL_EXIT focus=[${fp:-UNKNOWN}] after wall (no capture)"; break
      fi
    elif [ -n "$fp" ] && [ "$fp" != "$PACKAGE" ] \
         && ! echo "$fp" | grep -q permissioncontroller \
         && [ "$fp" != "android" ] && [ "$fp" != "com.android.systemui" ]; then
      # Focus is KNOWN to be a different app: stop instead of
      # capturing it. Exempt: the permission controller (captured,
      # then denied, per contract) and android/systemui (the walker
      # itself rules on system dialogs, e.g. BLOCKED on ANR).
      stopreason="FOCUS_EXIT"; say "step$nn FOCUS_EXIT focus=$fp (no capture)"; break
    fi
    if [ -z "$fp" ]; then
      # No wall yet but focus undetermined (primary + fallback both
      # empty): allow ONE blind step; a second consecutive unknown
      # stops the walk rather than photographing blindly.
      unknown=$((unknown+1))
      if [ $unknown -gt 1 ]; then
        stopreason="FOCUS_UNKNOWN"; say "step$nn FOCUS_UNKNOWN focus undetermined twice (no capture)"; break
      fi
      say "step$nn focus_unknown (blind step $unknown of 1 allowed)"
    else
      unknown=0
    fi
    adb exec-out screencap -p > emu/.shot-tmp.png 2>/dev/null
    uidump emu/.ui-cur.xml
    out=$(python3 emu/.walker.py emu/.ui-cur.xml $TRIED "$fp")
    sig=$(echo "$out" | grep '^SIG' | awk '{print $2}')
    texts=$(echo "$out" | grep '^TEXTS' | cut -c7-)
    act=$(echo "$out" | tail -1)
    if [ -n "${SEEN[$sig]}" ]; then
      say "step$nn duplicate sig=$sig (already captured) next=[$act]"
    else
      SEEN[$sig]=1
      shot="emu/$nn-$cur_slug.png"
      mv emu/.shot-tmp.png "$shot"
      printf 'file=%s\tlabel=%s\n' "$nn-$cur_slug.png" "$cur_label" >> $R
      say "step$nn shot=$nn-$cur_slug.png bytes=$(stat -c%s "$shot") sig=$sig focus=$fp label=[$cur_label] texts: $texts"
    fi
    pidn=$(adb shell pidof $PACKAGE 2>/dev/null | tr -d '\r')
    if [ -z "$pidn" ]; then stopreason="APP_EXITED"; say "pid_gone_at_step=$nn"; break; fi
    case "$act" in
      WALL*)
        reason=$(echo "$act" | cut -d' ' -f2-)
        printf 'walled=%s\t%s\n' "$cur_label" "$reason" >> $R
        walls=$((walls+1)); say "step$nn WALL label=[$cur_label] reason=[$reason]"
        if [ $walls -ge 3 ]; then stopreason="WALL_LIMIT"; break; fi
        adb shell input keyevent BACK; sleep 2; cur_slug=back$nn; cur_label="Back $nn" ;;
      BLOCKED*)
        stopreason="$act"; say "step$nn $act"; break ;;
      TAP*)
        xy=$(echo "$act" | awk '{print $2, $3}')
        label=$(echo "$act" | cut -d' ' -f4-)
        echo "$sig|$label" >> $TRIED
        cur_slug=$(slugify "$label"); [ -z "$cur_slug" ] && cur_slug=tap$nn
        cur_label=$label
        if [ "$fp" != "$PACKAGE" ] && [ "$fp" != "" ] && ! echo "$fp" | grep -q permissioncontroller; then
          say "external_focus=$fp (backing out, not tapping)"
          adb shell input keyevent BACK; sleep 2; cur_slug=back$nn; cur_label="Back $nn"; continue
        fi
        adb shell input tap $xy; sleep 3 ;;
      SWIPE)
        echo "$sig|__swipe" >> $TRIED
        adb shell input swipe $((W/2)) $((H*3/4)) $((W/2)) $((H/4)) 300; sleep 2 ;;
      *)
        if [ $backs -lt 3 ]; then backs=$((backs+1)); adb shell input keyevent BACK; sleep 2; cur_slug=back$nn; cur_label="Back $nn";
        else stopreason="NO_ADVANCE"; break; fi ;;
    esac
  done
  printf 'stop=%s\n' "${stopreason:-STEP_LIMIT}" >> $R
  say "walk_stop_reason=${stopreason:-STEP_LIMIT}"
  pid2=$(adb shell pidof $PACKAGE | tr -d '\r'); say "pid_at_end=${pid2:-NONE}"
  fi
  adb logcat -d > emu/logcat-walk.txt 2>&1
  say "logcat_bytes=$(stat -c%s emu/logcat-walk.txt)"
  adb emu kill 2>/dev/null
  rm -f $APK
  fi
  # ---------------- results zip + self-commit ----------------
  ZIP=emu/emu-results-$JOBID.zip
  ( cd emu && ls [0-9]*.png > /dev/null 2>&1 && zip -q emu-results-$JOBID.zip [0-9]*.png emu-results.txt ) || \
    ( cd emu && zip -q emu-results-$JOBID.zip emu-results.txt )
  say "results_zip_bytes=$(stat -c%s $ZIP 2>/dev/null)"
  ROOT=$(git rev-parse --show-toplevel 2>/dev/null)
  if [ -n "$ROOT" ] && [ -d "$ROOT/cloud-pc/storage/emu" ]; then
    cp "$ZIP" "$ROOT/cloud-pc/storage/emu/" 2>/dev/null
    cp $V "$ROOT/cloud-pc/storage/emu/verdict-walk-$JOBID.txt" 2>/dev/null
    cd $ROOT
    git config user.name "cloudpc" 2>/dev/null; git config user.email "cloudpc@local" 2>/dev/null
    git add cloud-pc/storage/emu 2>/dev/null
    git diff --cached --quiet || git commit -m "cloudpc: emu-screens results $JOBID" > /dev/null 2>&1
    pushed=0
    for i in 1 2 3 4; do
      if git push > /dev/null 2>&1; then pushed=1; break; fi
      git fetch origin main > /dev/null 2>&1
      git rebase origin/main > /dev/null 2>&1 || git rebase --abort > /dev/null 2>&1
      sleep 3
    done
    echo "self_commit_pushed=$pushed" >> emu/verdict-walk.txt
  fi
  say "WALK_DONE"
fi
