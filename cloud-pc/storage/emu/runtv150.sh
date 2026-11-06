#!/bin/bash
# emu proof for Onion TV v1.5.0 (com.onioncore.oniontv): PHONE form factor,
# launch the regular LAUNCHER entry, screenshot the true first screen.
# Modeled on runbatch.sh (proven Cloud PC emu-test lane).
SDK=$HOME/.cache/cloudpc-models/android-sdk
export ANDROID_HOME=$SDK ANDROID_SDK_ROOT=$SDK
export ANDROID_AVD_HOME=$HOME/emu-avd-home
export PATH=$SDK/platform-tools:$SDK/emulator:$PATH
mkdir -p emu/shots emu/apks
PKG=com.onioncore.oniontv
VERDICT=emu/shots/verdict-tv150.txt
: > $VERDICT
AVDM="$SDK/cmdline-tools/latest/bin/avdmanager"
if [ ! -x $SDK/emulator/emulator ]; then echo "FATAL: emulator missing (setup job did not run?)"; echo "fatal=emulator_missing" >> $VERDICT; exit 1; fi
base64 -d emu/apks/tv150.b64 > /tmp/tv150.apk 2>/dev/null
MD5=$(md5sum /tmp/tv150.apk | awk '{print $1}')
echo "apk_md5=$MD5"
echo "apk_md5=$MD5" >> $VERDICT
pkill -f qemu-system 2>/dev/null; sleep 2; adb kill-server 2>/dev/null; sleep 1
echo no | $AVDM create avd -n tv150 -k "system-images;android-34;default;x86_64" -d pixel_6 --force > emu/shots/avd-tv150.log 2>&1
nohup $SDK/emulator/emulator -avd tv150 -no-window -no-audio -no-boot-anim -gpu swiftshader_indirect -feature -Vulkan -memory 2048 -accel on -no-snapshot > emu/shots/boot-tv150.log 2>&1 &
timeout 150 adb wait-for-device
ok=0
for i in $(seq 1 40); do
  b=$(adb shell getprop sys.boot_completed 2>/dev/null | tr -d '\r')
  if [ "$b" = "1" ]; then ok=1; echo "booted after ~$((i*5))s"; break; fi
  sleep 5
done
echo "boot_completed=$ok"
echo "boot_completed=$ok" >> $VERDICT
if [ "$ok" != "1" ]; then tail -8 emu/shots/boot-tv150.log; exit 0; fi
SZ=$(adb shell wm size | grep -o '[0-9]*x[0-9]*' | head -1)
W=${SZ%x*}; H=${SZ#*x}
echo "screen=${W}x${H}"
echo "screen=${W}x${H}" >> $VERDICT
adb install -r /tmp/tv150.apk > emu/shots/install-tv150.log 2>&1
inst=$(grep -c Success emu/shots/install-tv150.log)
pmlisted=$(adb shell pm list packages | grep -c "package:$PKG")
echo "install_success=$inst pm_listed=$pmlisted"
echo "install_success=$inst" >> $VERDICT
echo "pm_listed=$pmlisted" >> $VERDICT
adb logcat -c
# Resolve the regular (non-leanback) LAUNCHER entry and start it explicitly.
RES=$(adb shell cmd package resolve-activity --brief -a android.intent.action.MAIN -c android.intent.category.LAUNCHER $PKG 2>/dev/null | tail -1 | tr -d '\r')
echo "resolved_launcher=$RES"
echo "resolved_launcher=$RES" >> $VERDICT
case "$RES" in
  $PKG/*) adb shell am start -n "$RES" > emu/shots/launch-tv150.log 2>&1 ;;
  *) adb shell monkey -p $PKG -c android.intent.category.LAUNCHER 1 > emu/shots/launch-tv150.log 2>&1 ;;
esac
sleep 10
adb exec-out screencap -p > emu/shots/tv150-a.png 2>/dev/null
pid1=$(adb shell pidof $PKG | tr -d '\r')
TX=$(awk -v w=$W 'BEGIN{printf "%d", w*0.80}')
TY=$(awk -v h=$H 'BEGIN{printf "%d", h*0.27}')
adb shell input tap $TX $TY
sleep 3
adb exec-out screencap -p > emu/shots/tv150-b.png 2>/dev/null
TOP=$(adb shell dumpsys activity activities 2>/dev/null | grep -m1 -E "topResumedActivity|ResumedActivity" | tr -d '\r')
echo "top_activity=$TOP"
echo "top_activity=$TOP" >> $VERDICT
echo "pid_shot=$pid1" >> $VERDICT
# Best effort: open the TV Remote tab/section via UI dump text search.
REMOTE=not_found
timeout 30 adb shell uiautomator dump /sdcard/win.xml > /dev/null 2>&1
adb pull /sdcard/win.xml emu/shots/win-tv150.xml > /dev/null 2>&1
BOUNDS=$(grep -o 'text="[^"]*[Rr]emote[^"]*"[^>]*bounds="\[[0-9,]*\]\[[0-9,]*\]"' emu/shots/win-tv150.xml 2>/dev/null | head -1 | grep -o 'bounds="\[[0-9,]*\]\[[0-9,]*\]"' | grep -o '[0-9]\+')
if [ -n "$BOUNDS" ]; then
  set -- $BOUNDS
  CX=$(( ($1 + $3) / 2 )); CY=$(( ($2 + $4) / 2 ))
  adb shell input tap $CX $CY
  sleep 4
  adb exec-out screencap -p > emu/shots/tv150-remote.png 2>/dev/null
  REMOTE="tapped $CX,$CY size=$(stat -c%s emu/shots/tv150-remote.png 2>/dev/null)"
fi
echo "remote=$REMOTE"
echo "remote=$REMOTE" >> $VERDICT
pid2=$(adb shell pidof $PKG | tr -d '\r')
echo "pid_end=$pid2" >> $VERDICT
adb logcat -d 2>/dev/null | grep -E "oniontv|AndroidRuntime|FATAL|ActivityManager|ActivityTaskManager" | tail -400 > emu/shots/logcat-tv150.txt
FATAL=$(grep -c "FATAL EXCEPTION" emu/shots/logcat-tv150.txt)
echo "fatal_count=$FATAL" >> $VERDICT
szA=$(stat -c%s emu/shots/tv150-a.png 2>/dev/null)
szB=$(stat -c%s emu/shots/tv150-b.png 2>/dev/null)
echo "shot_a=$szA shot_b=$szB" >> $VERDICT
echo "TV150 DONE"
cat $VERDICT
