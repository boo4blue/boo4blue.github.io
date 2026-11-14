#!/bin/bash
# runmuse3.sh — Muse emu probe #3: the "Legal info" row of the pre-login
# Settings page. Captures the legal list; taps the first row (usually a
# Terms/Privacy doc in an in-app webview) with a longer load wait,
# captures it, backs out. Never types, never signs in.
# Artifacts: emu/shot-MUSE3-*.png, ui-MUSE3-*.xml, index-MUSE3.txt,
# verdict-MUSE3.txt. Self-commits emu/ at the end.
SDK=$HOME/.cache/cloudpc-models/android-sdk
export ANDROID_HOME=$SDK ANDROID_SDK_ROOT=$SDK
export ANDROID_AVD_HOME=$HOME/emu-avd-home
export PATH=$SDK/platform-tools:$SDK/emulator:$PATH
mkdir -p emu $ANDROID_AVD_HOME
PACKAGE=com.facebook.aura
APKURL=
[ -f emu/config.env ] && . emu/config.env
TAG=MUSE3
V=emu/verdict-$TAG.txt
IDX=emu/index-$TAG.txt
say() { echo "$1" | tee -a $V; }
uidump() {
  adb shell uiautomator dump /sdcard/ui.xml > /dev/null 2>&1
  adb exec-out cat /sdcard/ui.xml > "$1" 2>/dev/null
  if [ ! -s "$1" ]; then
    sleep 2
    adb shell uiautomator dump /sdcard/ui.xml > /dev/null 2>&1
    adb exec-out cat /sdcard/ui.xml > "$1" 2>/dev/null
  fi
}
tapfind() {
  python3 - "$1" "$2" << 'PYEOF'
import re, sys
try:
    xml = open(sys.argv[1], encoding='utf-8', errors='replace').read()
except Exception:
    sys.exit(0)
needle = sys.argv[2]
for m in re.finditer(r'<node[^>]*>', xml):
    tag = m.group(0)
    if needle in tag:
        b = re.search(r'bounds="\[(\d+),(\d+)\]\[(\d+),(\d+)\]"', tag)
        if b:
            x1, y1, x2, y2 = map(int, b.groups())
            print((x1 + x2) // 2, (y1 + y2) // 2)
            sys.exit(0)
PYEOF
}
firstrow() { # first tappable labeled row in the dump, below the title area
  python3 - "$1" << 'PYEOF'
import re, sys
try:
    xml = open(sys.argv[1], encoding='utf-8', errors='replace').read()
except Exception:
    sys.exit(0)
skip = ('Legal info', 'Settings', 'Back', 'Dismiss')
for m in re.finditer(r'<node[^>]*>', xml):
    tag = m.group(0)
    tm = re.search(r'text="([^"]{3,60})"', tag)
    if not tm:
        continue
    label = tm.group(1)
    if label in skip:
        continue
    b = re.search(r'bounds="\[(\d+),(\d+)\]\[(\d+),(\d+)\]"', tag)
    if b:
        x1, y1, x2, y2 = map(int, b.groups())
        if y1 > 350:
            print((x1 + x2) // 2, (y1 + y2) // 2, label)
            sys.exit(0)
PYEOF
}
dumptexts() {
  python3 - "$1" << 'PYEOF'
import re, sys
try:
    xml = open(sys.argv[1], encoding='utf-8', errors='replace').read()
except Exception:
    sys.exit(0)
out = []
for m in re.finditer(r'<node[^>]*>', xml):
    t = m.group(0)
    for a in ('text', 'content-desc'):
        mm = re.search(a + r'="([^"]+)"', t)
        if mm and mm.group(1) not in out:
            out.append(mm.group(1))
print(' ~ '.join(out[:20])[:400])
PYEOF
}
cap() {
  adb exec-out screencap -p > emu/shot-$TAG-$1-$2.png 2>/dev/null
  uidump emu/ui-$TAG-$1-$2.xml
  echo "shot-$TAG-$1-$2.png | bytes=$(stat -c%s emu/shot-$TAG-$1-$2.png) | texts: $(dumptexts emu/ui-$TAG-$1-$2.xml)" >> $IDX
  say "cap$1 $2 bytes=$(stat -c%s emu/shot-$TAG-$1-$2.png)"
}

mode=$1
if [ "$mode" = probe ]; then
  : > $V; : > $IDX
  say "=== Muse emu probe3 (legal info) $(date -u +%H:%M:%S)Z"
  if [ ! -x $SDK/emulator/emulator ]; then say "VERDICT=FATAL_NO_EMULATOR (setup missing)"; else
  pkill -f qemu-system 2>/dev/null; sleep 2; adb kill-server 2>/dev/null; sleep 1
  APK=/tmp/muse-probe3.apk
  curl -sL --retry 2 --max-time 240 -o $APK "$APKURL"
  echo no | $SDK/cmdline-tools/latest/bin/avdmanager create avd -n musemu -k "system-images;android-34;google_apis;x86_64" -d pixel_6 --force > emu/avd-$TAG.log 2>&1
  nohup $SDK/emulator/emulator -avd musemu -no-window -no-audio -no-boot-anim -gpu swiftshader_indirect -feature -Vulkan -memory 2048 -accel on -no-snapshot > emu/boot-$TAG.log 2>&1 &
  timeout 150 adb wait-for-device
  ok=0
  for i in $(seq 1 40); do
    b=$(adb shell getprop sys.boot_completed 2>/dev/null | tr -d '\r')
    if [ "$b" = "1" ]; then ok=1; say "boot_completed=1 after ~$((i*5))s"; break; fi
    sleep 5
  done
  if [ "$ok" != "1" ]; then say "VERDICT=BOOT_FAIL"; else
  SZ=$(adb shell wm size | grep -o '[0-9]*x[0-9]*' | head -1); W=${SZ%x*}; H=${SZ#*x}
  adb install -r $APK > emu/install-$TAG.txt 2>&1
  pml=$(adb shell pm list packages 2>/dev/null | grep -c 'com.facebook.aura')
  say "pm_list_match=$pml"
  if [ "$pml" = "0" ]; then say "VERDICT=INSTALL_FAIL"; else
  adb shell monkey -p $PACKAGE -c android.intent.category.LAUNCHER 1 > /dev/null 2>&1
  sleep 12
  adb shell input tap $(awk -v w=$W -v h=$H 'BEGIN{printf "%d %d", w*0.80, h*0.27}')
  sleep 3
  uidump emu/ui-$TAG-00-wall.xml
  xy=$(tapfind emu/ui-$TAG-00-wall.xml 'Settings')
  if [ -n "$xy" ]; then adb shell input tap $xy; sleep 3; fi
  uidump emu/ui-$TAG-00-settings.xml
  xy=$(tapfind emu/ui-$TAG-00-settings.xml 'Legal info')
  if [ -n "$xy" ]; then
    adb shell input tap $xy; say "legal_tapped at $xy"; sleep 3
    cap 01 legal-info
    row=$(firstrow emu/ui-$TAG-01-legal-info.xml)
    if [ -n "$row" ]; then
      rx=$(echo "$row" | awk '{print $1, $2}'); rlabel=$(echo "$row" | cut -d' ' -f3-)
      adb shell input tap $rx; say "legal_row_tapped [$rlabel] at $rx"; sleep 6
      cap 02 legal-doc
      adb shell input keyevent BACK; sleep 2
    else
      say "legal_rows=NONE_FOUND"
    fi
  else
    say "legal_node=NOT_FOUND"
  fi
  say "pid_at_end=$(adb shell pidof $PACKAGE | tr -d '\r')"
  fi
  adb logcat -d -t 800 > emu/logcat-$TAG.txt 2>&1
  adb emu kill 2>/dev/null
  rm -f $APK
  fi
  fi
  ROOT=$(cd "$PWD/../.." && pwd)
  cd $ROOT
  git config user.name "cloudpc" 2>/dev/null; git config user.email "cloudpc@local" 2>/dev/null
  git add cloud-pc/storage/emu 2>/dev/null
  git diff --cached --quiet || git commit -m "cloudpc: muse emu probe3 results" > /dev/null 2>&1
  pushed=0
  for i in 1 2 3 4; do
    if git push > /dev/null 2>&1; then pushed=1; break; fi
    git fetch origin main > /dev/null 2>&1
    git rebase origin/main > /dev/null 2>&1 || git rebase --abort > /dev/null 2>&1
    sleep 3
  done
  echo "self_commit_pushed=$pushed" >> $V
  say "PROBE_DONE"
fi
