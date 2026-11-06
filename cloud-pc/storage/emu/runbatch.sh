#!/bin/bash
# emu batch screenshotter: boots ONE emulator, installs+launches a list of
# apps, screenshots each app's first page. Usage: bash emu/runbatch.sh A|B
# Modeled on run10.sh (proven Cloud PC emu-test lane).
SDK=$HOME/.cache/cloudpc-models/android-sdk
export ANDROID_HOME=$SDK ANDROID_SDK_ROOT=$SDK
export ANDROID_AVD_HOME=$HOME/emu-avd-home
export PATH=$SDK/platform-tools:$SDK/emulator:$PATH
mkdir -p emu/shots emu/apks
BATCH=$1
AVDM="$SDK/cmdline-tools/latest/bin/avdmanager"
if [ ! -x $SDK/emulator/emulator ]; then echo "FATAL: emulator missing (setup job did not run?)"; exit 1; fi
pkill -f qemu-system 2>/dev/null; sleep 2; adb kill-server 2>/dev/null; sleep 1
echo no | $AVDM create avd -n batch$BATCH -k "system-images;android-34;default;x86_64" -d pixel_6 --force > emu/shots/avd-$BATCH.log 2>&1
nohup $SDK/emulator/emulator -avd batch$BATCH -no-window -no-audio -no-boot-anim -gpu swiftshader_indirect -feature -Vulkan -memory 2048 -accel on -no-snapshot > emu/shots/boot-$BATCH.log 2>&1 &
timeout 150 adb wait-for-device
ok=0
for i in $(seq 1 40); do
  b=$(adb shell getprop sys.boot_completed 2>/dev/null | tr -d '\r')
  if [ "$b" = "1" ]; then ok=1; echo "booted after ~$((i*5))s"; break; fi
  sleep 5
done
echo "boot_completed=$ok"
if [ "$ok" != "1" ]; then tail -8 emu/shots/boot-$BATCH.log; exit 0; fi
SZ=$(adb shell wm size | grep -o '[0-9]*x[0-9]*' | head -1)
W=${SZ%x*}; H=${SZ#*x}
echo "screen=${W}x${H}"
TX=$(awk -v w=$W 'BEGIN{printf "%d", w*0.80}')
TY=$(awk -v h=$H 'BEGIN{printf "%d", h*0.27}')
VERDICT=emu/shots/verdict-$BATCH.txt
: > $VERDICT
if [ "$BATCH" = "A" ]; then
  APPS="tv:com.onioncore.oniontv launcher:com.onioncore.launcher calculator:com.onioncore.calculator clock:com.onioncore.clock notes:com.onioncore.notes files:com.onioncore.files gallery:com.onioncore.gallery weather:com.onioncore.weather camera:com.onioncore.camera videoplayer:com.onioncore.videoplayer"
else
  APPS="contacts:com.onioncore.contacts calendar:com.onioncore.calendar phone:com.onioncore.phone messages:com.onioncore.messages devicecare:com.onioncore.devicecare wellbeing:com.onioncore.wellbeing quickshare:com.onioncore.quickshare macro:com.onioncore.macro securespace:com.onioncore.securespace wallet:com.onioncore.wallet"
fi
for entry in $APPS; do
  slug=${entry%%:*}; pkg=${entry#*:}
  echo "=== $slug $pkg"
  base64 -d emu/apks/$slug.b64 > /tmp/$slug.apk 2>/dev/null
  adb install -r /tmp/$slug.apk > emu/shots/install-$slug.log 2>&1
  inst=$(grep -c Success emu/shots/install-$slug.log)
  adb logcat -c
  adb shell monkey -p $pkg -c android.intent.category.LAUNCHER 1 > emu/shots/launch-$slug.log 2>&1
  sleep 9
  adb exec-out screencap -p > emu/shots/$slug.png 2>/dev/null
  adb shell input tap $TX $TY
  sleep 4
  adb exec-out screencap -p > emu/shots/$slug-b.png 2>/dev/null
  pid=$(adb shell pidof $pkg | tr -d '\r')
  sz1=$(stat -c%s emu/shots/$slug.png 2>/dev/null)
  sz2=$(stat -c%s emu/shots/$slug-b.png 2>/dev/null)
  echo "$slug pkg=$pkg install_success=$inst pid=$pid shot1=$sz1 shot2=$sz2" >> $VERDICT
  adb shell am force-stop $pkg
  sleep 1
done
echo "BATCH $BATCH DONE"
cat $VERDICT
