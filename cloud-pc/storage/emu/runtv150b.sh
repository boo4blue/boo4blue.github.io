#!/bin/bash
# emu proof for Onion TV v1.5.0 — run B: longer settle + warm relaunch + scroll.
# Run A proved: install OK, PhoneHomeActivity on top, app logs show hero +
# rails built with live catalog data, but the captured frame showed only the
# logo/profile header (activity recreated once during startup config churn).
SDK=$HOME/.cache/cloudpc-models/android-sdk
export ANDROID_HOME=$SDK ANDROID_SDK_ROOT=$SDK
export ANDROID_AVD_HOME=$HOME/emu-avd-home
export PATH=$SDK/platform-tools:$SDK/emulator:$PATH
mkdir -p emu/shots emu/apks
PKG=com.onioncore.oniontv
VERDICT=emu/shots/verdict-tv150b.txt
: > $VERDICT
AVDM="$SDK/cmdline-tools/latest/bin/avdmanager"
if [ ! -x $SDK/emulator/emulator ]; then echo "FATAL: emulator missing (setup job did not run?)"; echo "fatal=emulator_missing" >> $VERDICT; exit 1; fi
base64 -d emu/apks/tv150.b64 > /tmp/tv150.apk 2>/dev/null
MD5=$(md5sum /tmp/tv150.apk | awk '{print $1}')
echo "apk_md5=$MD5" >> $VERDICT
pkill -f qemu-system 2>/dev/null; sleep 2; adb kill-server 2>/dev/null; sleep 1
echo no | $AVDM create avd -n tv150b -k "system-images;android-34;default;x86_64" -d pixel_6 --force > emu/shots/avd-tv150b.log 2>&1
nohup $SDK/emulator/emulator -avd tv150b -no-window -no-audio -no-boot-anim -gpu swiftshader_indirect -feature -Vulkan -memory 2048 -accel on -no-snapshot > emu/shots/boot-tv150b.log 2>&1 &
timeout 150 adb wait-for-device
ok=0
for i in $(seq 1 40); do
  b=$(adb shell getprop sys.boot_completed 2>/dev/null | tr -d '\r')
  if [ "$b" = "1" ]; then ok=1; echo "booted after ~$((i*5))s"; break; fi
  sleep 5
done
echo "boot_completed=$ok" >> $VERDICT
if [ "$ok" != "1" ]; then tail -8 emu/shots/boot-tv150b.log; exit 0; fi
adb install -r /tmp/tv150.apk > emu/shots/install-tv150b.log 2>&1
inst=$(grep -c Success emu/shots/install-tv150b.log)
echo "install_success=$inst" >> $VERDICT
adb logcat -c
RES=$(adb shell cmd package resolve-activity --brief -a android.intent.action.MAIN -c android.intent.category.LAUNCHER $PKG 2>/dev/null | tail -1 | tr -d '\r')
echo "resolved_launcher=$RES" >> $VERDICT
adb shell am start -n "$RES" > emu/shots/launch-tv150b.log 2>&1
sleep 20
adb exec-out screencap -p > emu/shots/tv150b-w1.png 2>/dev/null
pid1=$(adb shell pidof $PKG | tr -d '\r')
echo "pid_first=$pid1" >> $VERDICT
# Warm relaunch: config churn from cold start should be settled now.
adb shell am force-stop $PKG
sleep 2
adb shell am start -n "$RES" >> emu/shots/launch-tv150b.log 2>&1
sleep 25
adb exec-out screencap -p > emu/shots/tv150b-w2.png 2>/dev/null
pid2=$(adb shell pidof $PKG | tr -d '\r')
echo "pid_warm=$pid2" >> $VERDICT
# Deep settle: Cinemeta rails + poster fetches need real time on the runner.
sleep 20
adb exec-out screencap -p > emu/shots/tv150b-w2b.png 2>/dev/null
timeout 30 adb shell uiautomator dump /sdcard/win2.xml > /dev/null 2>&1
adb pull /sdcard/win2.xml emu/shots/win2-tv150b.xml > /dev/null 2>&1
TEXTS=$(grep -oE 'text="[^"]+"' emu/shots/win2-tv150b.xml 2>/dev/null | grep -vE 'text=""' | head -30 | tr '\n' '|')
echo "ui_texts=$TEXTS" >> $VERDICT
adb shell input swipe 540 1800 540 900 300
sleep 3
adb exec-out screencap -p > emu/shots/tv150b-w3.png 2>/dev/null
TOP=$(adb shell dumpsys activity activities 2>/dev/null | grep -m1 -E "topResumedActivity|ResumedActivity" | tr -d '\r')
echo "top_activity=$TOP" >> $VERDICT
# Best effort: TV Remote via UI dump, searching text AND content-desc.
REMOTE=not_found
timeout 30 adb shell uiautomator dump /sdcard/win.xml > /dev/null 2>&1
adb pull /sdcard/win.xml emu/shots/win-tv150b.xml > /dev/null 2>&1
BOUNDS=$(grep -oE '(text|content-desc)="[^"]*[Rr]emote[^"]*"[^>]*bounds="\[[0-9,]*\]\[[0-9,]*\]"|bounds="\[[0-9,]*\]\[[0-9,]*\]"[^>]*(text|content-desc)="[^"]*[Rr]emote[^"]*"' emu/shots/win-tv150b.xml 2>/dev/null | head -1 | grep -o 'bounds="\[[0-9,]*\]\[[0-9,]*\]"' | grep -o '[0-9]\+')
if [ -n "$BOUNDS" ]; then
  set -- $BOUNDS
  CX=$(( ($1 + $3) / 2 )); CY=$(( ($2 + $4) / 2 ))
  adb shell input tap $CX $CY
  sleep 4
  adb exec-out screencap -p > emu/shots/tv150b-remote.png 2>/dev/null
  REMOTE="tapped $CX,$CY size=$(stat -c%s emu/shots/tv150b-remote.png 2>/dev/null)"
fi
echo "remote=$REMOTE" >> $VERDICT
pid3=$(adb shell pidof $PKG | tr -d '\r')
echo "pid_end=$pid3" >> $VERDICT
adb logcat -d 2>/dev/null | grep -E "oniontv|AndroidRuntime|FATAL|ActivityManager|ActivityTaskManager" | tail -400 > emu/shots/logcat-tv150b.txt
FATAL=$(grep -c "FATAL EXCEPTION" emu/shots/logcat-tv150b.txt)
echo "fatal_count=$FATAL" >> $VERDICT
for s in w1 w2 w2b w3; do echo "shot_$s=$(stat -c%s emu/shots/tv150b-$s.png 2>/dev/null)" >> $VERDICT; done
echo "TV150B DONE"
cat $VERDICT
