#!/bin/bash
# emu proof for Onion TV v1.5.1 — the zero-height phone-home fix.
# v1.5.0 run B proved: app fetches and computes everything, but the home
# rendered ONLY the brand + profile chip because a WRAP_CONTENT spacer
# View in the brand row measured the full screen height and starved every
# sibling below the header to 0px. v1.5.1 fixes the spacer (0x0 + weight)
# and logs "phone home rendered: cards=N railsBoxHeight=H" after layout.
# THIS run's pass bar: a screenshot showing hero + populated rails AND
# the rendered log line with cards>0 and railsBoxHeight>0.
SDK=$HOME/.cache/cloudpc-models/android-sdk
export ANDROID_HOME=$SDK ANDROID_SDK_ROOT=$SDK
export ANDROID_AVD_HOME=$HOME/emu-avd-home
export PATH=$SDK/platform-tools:$SDK/emulator:$PATH
mkdir -p emu/shots emu/apks
PKG=com.onioncore.oniontv
VERDICT=emu/shots/verdict-tv151.txt
: > $VERDICT
AVDM="$SDK/cmdline-tools/latest/bin/avdmanager"
if [ ! -x $SDK/emulator/emulator ]; then echo "FATAL: emulator missing (setup job did not run?)"; echo "fatal=emulator_missing" >> $VERDICT; exit 1; fi
base64 -d emu/apks/tv151.b64 > /tmp/tv151.apk 2>/dev/null
MD5=$(md5sum /tmp/tv151.apk | awk '{print $1}')
echo "apk_md5=$MD5" >> $VERDICT
pkill -f qemu-system 2>/dev/null; sleep 2; adb kill-server 2>/dev/null; sleep 1
echo no | $AVDM create avd -n tv151 -k "system-images;android-34;default;x86_64" -d pixel_6 --force > emu/shots/avd-tv151.log 2>&1
nohup $SDK/emulator/emulator -avd tv151 -no-window -no-audio -no-boot-anim -gpu swiftshader_indirect -feature -Vulkan -memory 2048 -accel on -no-snapshot > emu/shots/boot-tv151.log 2>&1 &
timeout 150 adb wait-for-device
ok=0
for i in $(seq 1 40); do
  b=$(adb shell getprop sys.boot_completed 2>/dev/null | tr -d '\r')
  if [ "$b" = "1" ]; then ok=1; echo "booted after ~$((i*5))s"; break; fi
  sleep 5
done
echo "boot_completed=$ok" >> $VERDICT
if [ "$ok" != "1" ]; then tail -8 emu/shots/boot-tv151.log; exit 0; fi
adb install -r /tmp/tv151.apk > emu/shots/install-tv151.log 2>&1
inst=$(grep -c Success emu/shots/install-tv151.log)
echo "install_success=$inst" >> $VERDICT
adb logcat -c
RES=$(adb shell cmd package resolve-activity --brief -a android.intent.action.MAIN -c android.intent.category.LAUNCHER $PKG 2>/dev/null | tail -1 | tr -d '\r')
echo "resolved_launcher=$RES" >> $VERDICT
adb shell am start -n "$RES" > emu/shots/launch-tv151.log 2>&1
sleep 20
adb exec-out screencap -p > emu/shots/tv151-w1.png 2>/dev/null
pid1=$(adb shell pidof $PKG | tr -d '\r')
echo "pid_first=$pid1" >> $VERDICT
# Warm relaunch: config churn from cold start should be settled now.
adb shell am force-stop $PKG
sleep 2
adb shell am start -n "$RES" >> emu/shots/launch-tv151.log 2>&1
sleep 25
adb exec-out screencap -p > emu/shots/tv151-w2.png 2>/dev/null
pid2=$(adb shell pidof $PKG | tr -d '\r')
echo "pid_warm=$pid2" >> $VERDICT
# Deep settle: Cinemeta rails + poster fetches need real time on the runner.
sleep 20
adb exec-out screencap -p > emu/shots/tv151-w2b.png 2>/dev/null
timeout 30 adb shell uiautomator dump /sdcard/win2.xml > /dev/null 2>&1
adb pull /sdcard/win2.xml emu/shots/win2-tv151.xml > /dev/null 2>&1
TEXTS=$(grep -oE 'text="[^"]+"' emu/shots/win2-tv151.xml 2>/dev/null | grep -vE 'text=""' | head -40 | tr '\n' '|')
echo "ui_texts=$TEXTS" >> $VERDICT
adb shell input swipe 540 1800 540 900 300
sleep 3
adb exec-out screencap -p > emu/shots/tv151-w3.png 2>/dev/null
TOP=$(adb shell dumpsys activity activities 2>/dev/null | grep -m1 -E "topResumedActivity|ResumedActivity" | tr -d '\r')
echo "top_activity=$TOP" >> $VERDICT
pid3=$(adb shell pidof $PKG | tr -d '\r')
echo "pid_end=$pid3" >> $VERDICT
adb logcat -d 2>/dev/null | grep -E "oniontv|AndroidRuntime|FATAL|ActivityManager|ActivityTaskManager" | tail -600 > emu/shots/logcat-tv151.txt
FATAL=$(grep -c "FATAL EXCEPTION" emu/shots/logcat-tv151.txt)
echo "fatal_count=$FATAL" >> $VERDICT
# The decisive v1.5.1 lines: bound cards + measured rails height after layout.
grep "phone home rendered" emu/shots/logcat-tv151.txt | tail -4 >> $VERDICT
grep "phone home WARNING" emu/shots/logcat-tv151.txt | tail -2 >> $VERDICT
grep "phone hero showing" emu/shots/logcat-tv151.txt | tail -2 >> $VERDICT
for s in w1 w2 w2b w3; do echo "shot_$s=$(stat -c%s emu/shots/tv151-$s.png 2>/dev/null)" >> $VERDICT; done
echo "TV151 DONE"
cat $VERDICT
