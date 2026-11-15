#!/bin/bash
# run-capture.sh — Capture Lane harness. Runs ON the GitHub Actions runner,
# cwd = repo root. Invoked by .github/workflows/capture.yml for ONE job file:
#   bash capture/run-capture.sh capture/inbox/<job>.json
#
# Boots a Note10-profile AVD (API 31, google_apis x86_64, 1080x2280 @420dpi,
# fontScale 1.0, animations off, SystemUI demo mode), installs the job's APK,
# runs the job's screen script, and COMMITS+PUSHES EVERY CAPTURE THE MOMENT
# IT EXISTS — a cancelled/timed-out run still leaves its captures behind.
# This lane never reads or writes cloud-pc/inbox (stream chain isolation).
#
# Job JSON fields:
#   id          unique job id (results land in capture/results/<id>/)
#   apkUrl      public APK URL (emu-assets release asset)
#   apkMd5      optional expected md5 of the APK
#   package     app package name
#   script      repo-relative screen script, run with helpers available:
#               shot <name> | tapfrac <fx,fy> | taptext <substring> | adb ...
#   api         optional, default 31
#   image       optional, default google_apis
#   width/height/density  optional, default 1080/2280/420
#   permissions optional space-separated Android permissions to pre-grant
set -u
JOBFILE=$1
[ -f "$JOBFILE" ] || { echo "FATAL: job file $JOBFILE not found"; exit 1; }

# ---------- parse job ----------
eval "$(python3 - "$JOBFILE" <<'PY'
import json,sys
j=json.load(open(sys.argv[1]))
def q(k,d=""):
    v=j.get(k,d)
    print(f"{k.upper()}={v!r}" if isinstance(v,str) else f"{k.upper()}={v}")
q("id"); q("apkUrl"); q("apkMd5"); q("package"); q("script")
q("api",31); q("image","google_apis")
q("width",1080); q("height",2280); q("density",420)
q("permissions","")
PY
)"
[ -n "${ID:-}" ] && [ -n "${APKURL:-}" ] && [ -n "${PACKAGE:-}" ] && [ -n "${SCRIPT:-}" ] || {
  echo "FATAL: job missing required fields (id/apkUrl/package/script)"; exit 1; }
RESULTS="capture/results/$ID"
mkdir -p "$RESULTS"
exec > >(tee -a "$RESULTS/harness.log") 2>&1
echo "== capture job $ID: package=$PACKAGE api=$API image=$IMAGE ${WIDTH}x${HEIGHT}@${DENSITY}"
STARTED=$(date -u +%Y-%m-%dT%H:%M:%SZ)
NOTE=""; BOOTOK=0; INSTALLOK=0; PIDEND=0

# ---------- git: commit+push one or more paths, surviving main-branch races ----------
git config user.name "capture-lane" 2>/dev/null
git config user.email "capture@local" 2>/dev/null
commit_push() { # $1 = message, rest = paths
  local msg=$1; shift
  local try
  for try in 1 2 3 4 5; do
    git add -A -- "$@" 2>/dev/null
    if ! git diff --cached --quiet 2>/dev/null; then
      git commit -q -m "$msg" 2>/dev/null || true
    fi
    git fetch -q origin main 2>/dev/null
    if ! git rebase -q origin/main 2>/dev/null; then
      git rebase --abort 2>/dev/null; sleep 3; continue
    fi
    if git push -q origin HEAD:main 2>/dev/null; then return 0; fi
    sleep 3
  done
  echo "WARN: push failed after retries: $msg"
  return 1
}

# ---------- SDK (mirrors the proven emu-test run10.sh setup) ----------
SDK=$HOME/.cache/cloudpc-models/android-sdk
SYS_SDK=/usr/local/lib/android/sdk
export ANDROID_HOME=$SDK ANDROID_SDK_ROOT=$SDK
export ANDROID_AVD_HOME=$HOME/emu-avd-home
mkdir -p "$SDK" "$ANDROID_AVD_HOME"
if [ ! -d "$SDK/cmdline-tools/latest" ]; then
  mkdir -p "$SDK/cmdline-tools"
  cp -r "$SYS_SDK/cmdline-tools/latest" "$SDK/cmdline-tools/latest"
fi
echo 'KERNEL=="kvm", GROUP="kvm", MODE="0666", OPTIONS+="static_node=kvm"' | sudo tee /etc/udev/rules.d/99-kvm4all.rules >/dev/null
sudo udevadm control --reload-rules; sudo udevadm trigger --name-match=kvm; sleep 1
SDKM="$SDK/cmdline-tools/latest/bin/sdkmanager --sdk_root=$SDK"
AVDM="$SDK/cmdline-tools/latest/bin/avdmanager"
yes | $SDKM --licenses > "$RESULTS/licenses.log" 2>&1
IMG_PKG="system-images;android-$API;$IMAGE;x86_64"
for attempt in 1 2 3; do
  $SDKM "emulator" "platform-tools" "$IMG_PKG" > "$RESULTS/setup.log" 2>&1
  echo "sdkmanager attempt $attempt exit=$?"
  if [ -x "$SDK/emulator/emulator" ] && [ -f "$SDK/system-images/android-$API/$IMAGE/x86_64/system.img" ]; then
    echo "SDK verified OK on attempt $attempt"; break
  fi
  rm -rf "$SDK/emulator" "$SDK/.temp"; sleep 5
done
export PATH=$SDK/platform-tools:$SDK/emulator:$PATH
if [ ! -x "$SDK/emulator/emulator" ]; then NOTE="SDK/emulator install failed"; fi

# ---------- helpers for screen scripts ----------
W=$WIDTH; H=$HEIGHT
tapfrac() {
  local fx=${1%,*} fy=${1#*,}
  adb shell input tap $(awk -v w=$W -v h=$H -v x=$fx -v y=$fy 'BEGIN{printf "%d %d", w*x, h*y}')
}
taptext() { # tap the center of the first UI node whose text contains $1
  adb shell uiautomator dump /sdcard/cap-ui.xml >/dev/null 2>&1
  local xy
  xy=$(adb exec-out cat /sdcard/cap-ui.xml 2>/dev/null | python3 -c '
import sys,re
needle=sys.argv[1].lower()
xml=sys.stdin.read()
for m in re.finditer(r"<node[^>]*>", xml):
    tag=m.group(0)
    t=re.search(r"text=\"([^\"]*)\"", tag)
    if not t or needle not in t.group(1).lower(): continue
    b=re.search(r"bounds=\"\[(\d+),(\d+)\]\[(\d+),(\d+)\]\"", tag)
    if not b: continue
    x1,y1,x2,y2=map(int,b.groups())
    print((x1+x2)//2, (y1+y2)//2); break
' "$1")
  if [ -n "$xy" ]; then echo "taptext '$1' -> $xy"; adb shell input tap $xy; return 0; fi
  echo "taptext '$1': NOT FOUND"; return 1
}
shot() { # $1 = name (no extension). Captures AND publishes immediately.
  adb exec-out screencap -p > "$RESULTS/$1.png"
  echo "shot $1: $(stat -c%s "$RESULTS/$1.png" 2>/dev/null) bytes"
  commit_push "capture $ID: $1" "$RESULTS/$1.png"
}
export -f tapfrac taptext shot commit_push 2>/dev/null
export RESULTS PACKAGE W H

# ---------- main flow ----------
finish() {
  adb logcat -d > "$RESULTS/logcat.txt" 2>&1
  [ -n "$(adb shell pidof $PACKAGE 2>/dev/null)" ] && PIDEND=1
  local verdict=FAIL
  [ "$BOOTOK" = 1 ] && [ "$INSTALLOK" = 1 ] && [ "$PIDEND" = 1 ] && verdict=PASS
  ID="$ID" PACKAGE="$PACKAGE" APKMD5="${APKMD5:-}" APKMD5ACT="${APKMD5ACT:-}" \
  BOOTOK="$BOOTOK" INSTALLOK="$INSTALLOK" PIDEND="$PIDEND" VERDICT="$verdict" \
  NOTE="$NOTE" STARTED="$STARTED" RESULTS="$RESULTS" \
  SZREAL="${SZREAL:-}" DENREAL="${DENREAL:-}" FONTREAL="${FONTREAL:-}" \
  python3 - <<'PY'
import json,os,glob
r=os.environ
shots=sorted(os.path.basename(p) for p in glob.glob(os.path.join(r["RESULTS"],"*.png")))
json.dump({
  "id": r["ID"], "package": r["PACKAGE"],
  "apkMd5Expected": r["APKMD5"] or None, "apkMd5Actual": r["APKMD5ACT"] or None,
  "bootCompleted": r["BOOTOK"]=="1", "installOk": r["INSTALLOK"]=="1",
  "pidAliveEnd": r["PIDEND"]=="1",
  "screen": {"size": r["SZREAL"] or None, "density": r["DENREAL"] or None,
             "fontScale": r["FONTREAL"] or None},
  "shots": shots, "startedUtc": r["STARTED"],
  "finishedUtc": __import__("datetime").datetime.utcnow().strftime("%Y-%m-%dT%H:%M:%SZ"),
  "verdict": r["VERDICT"], "note": r["NOTE"],
}, open(os.path.join(r["RESULTS"],"result.json"),"w"), indent=2)
print("result.json written, verdict", r["VERDICT"])
PY
  commit_push "capture $ID: result ($verdict)" "$RESULTS"
  git rm -q "$JOBFILE" 2>/dev/null
  commit_push "capture $ID: consume job" "$JOBFILE"
  adb emu kill 2>/dev/null
  echo "== capture job $ID done: $verdict ${NOTE:+($NOTE)}"
}
trap finish EXIT

if [ -z "$NOTE" ]; then
  # ---------- APK ----------
  curl -sL --retry 2 -o /tmp/cap-$ID.apk "$APKURL"
  APKMD5ACT=$(md5sum /tmp/cap-$ID.apk | cut -d' ' -f1)
  echo "apk md5=$APKMD5ACT expected=${APKMD5:-any} size=$(stat -c%s /tmp/cap-$ID.apk)"
  if [ -n "${APKMD5:-}" ] && [ "$APKMD5ACT" != "$APKMD5" ]; then NOTE="APK md5 mismatch"; fi
fi

if [ -z "$NOTE" ]; then
  # ---------- AVD: Note10 profile ----------
  pkill -f qemu-system 2>/dev/null; sleep 2; adb kill-server 2>/dev/null; sleep 1
  echo no | $AVDM create avd -n capavd -k "$IMG_PKG" -d pixel_6 --force > "$RESULTS/avd.log" 2>&1
  CFG="$ANDROID_AVD_HOME/capavd.avd/config.ini"
  for kv in "hw.lcd.width=$WIDTH" "hw.lcd.height=$HEIGHT" "hw.lcd.density=$DENSITY"; do
    k=${kv%%=*}
    if grep -q "^$k=" "$CFG" 2>/dev/null; then sed -i "s|^$k=.*|$kv|" "$CFG"; else echo "$kv" >> "$CFG"; fi
  done
  nohup $SDK/emulator/emulator -avd capavd -no-window -no-audio -no-boot-anim \
    -gpu swiftshader_indirect -feature -Vulkan -memory 2048 -accel on -no-snapshot \
    > "$RESULTS/boot.log" 2>&1 &
  timeout 150 adb wait-for-device
  for i in $(seq 1 60); do
    b=$(adb shell getprop sys.boot_completed 2>/dev/null | tr -d '\r')
    if [ "$b" = "1" ]; then BOOTOK=1; echo "booted after ~$((i*5))s"; break; fi
    sleep 5
  done
  [ "$BOOTOK" = 1 ] || { NOTE="emulator did not finish booting"; tail -8 "$RESULTS/boot.log"; }
fi

if [ -z "$NOTE" ]; then
  # ---------- determinism: pin everything that can vary ----------
  adb shell wm size ${WIDTH}x${HEIGHT} >/dev/null 2>&1
  adb shell wm density $DENSITY >/dev/null 2>&1
  adb shell settings put system font_scale 1.0
  adb shell settings put global window_animation_scale 0
  adb shell settings put global transition_animation_scale 0
  adb shell settings put global animator_duration_scale 0
  adb shell settings put system accelerometer_rotation 0
  adb shell settings put system user_rotation 0
  adb shell settings put system screen_off_timeout 1800000
  adb shell locksettings set-disabled true >/dev/null 2>&1
  adb shell wm dismiss-keyguard >/dev/null 2>&1
  adb shell settings put global sysui_demo_allowed 1
  adb shell am broadcast -a com.android.systemui.demo -e command enter >/dev/null 2>&1
  adb shell am broadcast -a com.android.systemui.demo -e command clock -e hhmm 1200 >/dev/null 2>&1
  adb shell am broadcast -a com.android.systemui.demo -e command battery -e level 100 -e plugged false >/dev/null 2>&1
  adb shell am broadcast -a com.android.systemui.demo -e command network -e wifi show -e level 4 -e fully true >/dev/null 2>&1
  adb shell am broadcast -a com.android.systemui.demo -e command network -e mobile hide >/dev/null 2>&1
  adb shell am broadcast -a com.android.systemui.demo -e command notifications -e visible false >/dev/null 2>&1
  adb shell am broadcast -a com.android.systemui.demo -e command status -e bluetooth hidden -e alarm hidden -e volume silent >/dev/null 2>&1
  sleep 2
  SZREAL=$(adb shell wm size | grep -o '[0-9]*x[0-9]*' | head -1)
  DENREAL=$(adb shell wm density | grep -o '[0-9]*' | head -1)
  FONTREAL=$(adb shell settings get system font_scale | tr -d '\r')
  echo "screen real: size=$SZREAL density=$DENREAL fontScale=$FONTREAL"
  W=${SZREAL%x*}; H=${SZREAL#*x}; export W H

  # ---------- install (verdict from pm list, never from a piped tail) ----------
  adb install -r /tmp/cap-$ID.apk > "$RESULTS/install.log" 2>&1
  if adb shell pm list packages | grep -q "^package:$PACKAGE\$"; then INSTALLOK=1; fi
  echo "installOk=$INSTALLOK"
  [ "$INSTALLOK" = 1 ] || NOTE="install failed (see install.log)"
fi

if [ -z "$NOTE" ]; then
  for perm in $PERMISSIONS; do
    adb shell pm grant $PACKAGE android.permission.$perm 2>/dev/null
  done
  adb logcat -c
  if [ -f "$SCRIPT" ]; then
    bash "$SCRIPT" 2>&1 | tee -a "$RESULTS/script.log"
  else
    NOTE="screen script $SCRIPT not found in repo"
  fi
fi
# finish() runs via EXIT trap: logcat, result.json, final push, job consume.
