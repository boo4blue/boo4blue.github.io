#!/bin/bash
# runmuse2.sh — Muse emu probe #2: the two non-credential entrances ON
# the sign-in wall screen: the gear (Settings) top-right, and the
# "Learn more" link. Captures whatever they open (menus/sheets/lists),
# backs out, never types, never taps Continue, never enters the field.
# Sub-entrances tried from the settings surface (allowlist, capture-only):
# Language / Help / About — each captured, then Back.
# Artifacts: emu/shot-MUSE2-*.png, ui-MUSE2-*.xml, index-MUSE2.txt,
# verdict-MUSE2.txt. Self-commits emu/ at the end (see runmuse.sh).
SDK=$HOME/.cache/cloudpc-models/android-sdk
export ANDROID_HOME=$SDK ANDROID_SDK_ROOT=$SDK
export ANDROID_AVD_HOME=$HOME/emu-avd-home
export PATH=$SDK/platform-tools:$SDK/emulator:$PATH
mkdir -p emu $ANDROID_AVD_HOME
PACKAGE=com.facebook.aura
APKURL=
[ -f emu/config.env ] && . emu/config.env
TAG=MUSE2
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
tapfind() { # $1 = ui xml, $2 = substring; echoes "x y" or nothing
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
dumptexts() { # $1 = ui xml; echoes visible texts, one line
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
cap() { # $1 = nn, $2 = slug
  adb exec-out screencap -p > emu/shot-$TAG-$1-$2.png 2>/dev/null
  uidump emu/ui-$TAG-$1-$2.xml
  echo "shot-$TAG-$1-$2.png | bytes=$(stat -c%s emu/shot-$TAG-$1-$2.png) | texts: $(dumptexts emu/ui-$TAG-$1-$2.xml)" >> $IDX
  say "cap$1 $2 bytes=$(stat -c%s emu/shot-$TAG-$1-$2.png)"
}
topact() { adb shell dumpsys activity activities 2>/dev/null | grep -m1 -o 'topResumedActivity=ActivityRecord{[^ ]* [^ ]*/[^ ]*' | sed 's/.* //'; }

mode=$1
if [ "$mode" = probe ]; then
  : > $V; : > $IDX
  say "=== Muse emu probe2 $(date -u +%H:%M:%S)Z package=$PACKAGE"
  if [ ! -x $SDK/emulator/emulator ]; then say "VERDICT=FATAL_NO_EMULATOR (setup missing)"; else
  pkill -f qemu-system 2>/dev/null; sleep 2; adb kill-server 2>/dev/null; sleep 1
  APK=/tmp/muse-probe.apk
  curl -sL --retry 2 --max-time 240 -o $APK "$APKURL"
  say "apk_bytes=$(stat -c%s $APK 2>/dev/null)"
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
  say "pid_after_launch=$(adb shell pidof $PACKAGE | tr -d '\r')"
  cap 01 launch
  # --- gear / Settings entrance ---
  xy=$(tapfind emu/ui-$TAG-01-launch.xml 'Settings')
  if [ -n "$xy" ]; then
    adb shell input tap $xy; say "settings_tapped at $xy top=$(topact)"; sleep 3
    cap 02 settings
    # safe sub-entrances (capture-only): Language, Help, About
    sub=0
    for label in Language Help About; do
      xy2=$(tapfind emu/ui-$TAG-02-settings.xml "$label")
      if [ -n "$xy2" ]; then
        sub=$((sub+1))
        adb shell input tap $xy2; say "sub_tapped $label at $xy2 top=$(topact)"; sleep 3
        cap 03 "sub-$(echo $label | tr '[:upper:]' '[:lower:]')"
        adb shell input keyevent BACK; sleep 2
        uidump emu/ui-$TAG-02b.xml
      fi
    done
    say "sub_entrances_tried=$sub"
    adb shell input keyevent BACK; sleep 2
    uidump emu/ui-$TAG-back.xml
    say "after_back_texts: $(dumptexts emu/ui-$TAG-back.xml)"
  else
    say "settings_node=NOT_FOUND"
  fi
  # --- Learn more link (stays in-app? capture; if external, note + back) ---
  cur=emu/ui-$TAG-back.xml; [ -s "$cur" ] || cur=emu/ui-$TAG-01-launch.xml
  xy=$(tapfind "$cur" 'Learn more')
  if [ -n "$xy" ]; then
    adb shell input tap $xy; sleep 3
    say "learnmore_tapped at $xy top=$(topact)"
    cap 04 learnmore
    adb shell input keyevent BACK; sleep 1
  else
    say "learnmore_node=NOT_FOUND"
  fi
  say "pid_at_end=$(adb shell pidof $PACKAGE | tr -d '\r')"
  fi
  adb logcat -d -t 1500 > emu/logcat-$TAG.txt 2>&1
  adb emu kill 2>/dev/null
  rm -f $APK
  fi
  fi
  # ---------------- self-commit results ----------------
  ROOT=$(cd "$PWD/../.." && pwd)
  cd $ROOT
  git config user.name "cloudpc" 2>/dev/null; git config user.email "cloudpc@local" 2>/dev/null
  git add cloud-pc/storage/emu 2>/dev/null
  git diff --cached --quiet || git commit -m "cloudpc: muse emu probe2 results" > /dev/null 2>&1
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
