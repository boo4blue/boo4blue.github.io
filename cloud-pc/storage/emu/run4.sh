#!/bin/bash
# emu-test v4: UNIVERSAL Android emulator tester (Cloud PC edition).
# run mode args: bash run4.sh run <gpu_mode> <tag>
# Config (emu/config.env): PACKAGE, APKFILE, TAP1/TAP2 as screen fractions.
SDK=$HOME/.cache/cloudpc-models/android-sdk
SYS_SDK=/usr/local/lib/android/sdk
export ANDROID_HOME=$SDK ANDROID_SDK_ROOT=$SDK
export ANDROID_AVD_HOME=$HOME/emu-avd-home
mkdir -p $SDK emu $ANDROID_AVD_HOME
SDKM="$SDK/cmdline-tools/latest/bin/sdkmanager --sdk_root=$SDK"
AVDM="$SDK/cmdline-tools/latest/bin/avdmanager"
tapfrac() {
  local fx=${1%,*} fy=${1#*,}
  adb shell input tap $(awk -v w=$W -v h=$H -v x=$fx -v y=$fy 'BEGIN{printf "%d %d", w*x, h*y}')
}
mode=$1
if [ "$mode" = setup ]; then
  if [ ! -d $SDK/cmdline-tools/latest ]; then
    mkdir -p $SDK/cmdline-tools
    cp -r $SYS_SDK/cmdline-tools/latest $SDK/cmdline-tools/latest
  fi
  echo 'KERNEL=="kvm", GROUP="kvm", MODE="0666", OPTIONS+="static_node=kvm"' | sudo tee /etc/udev/rules.d/99-kvm4all.rules >/dev/null
  sudo udevadm control --reload-rules; sudo udevadm trigger --name-match=kvm; sleep 1
  yes | $SDKM --licenses > emu/licenses.log 2>&1
  $SDKM "emulator" "platform-tools" "platforms;android-34" "system-images;android-34;google_apis;x86_64" > emu/setup.log 2>&1
  echo "sdkmanager exit=$?"
  echo SETUP_DONE
fi
if [ "$mode" = run ]; then
  GPU=${2:-swangle_indirect}
  TAG=${3:-X}
  export PATH=$SDK/platform-tools:$SDK/emulator:$PATH
  PACKAGE=com.onion.deathcart
  APKFILE=emu/DeathCart-emu.apk
  TAP1=0.5,0.9
  TAP2=
  [ -f emu/config.env ] && . emu/config.env
  echo "gpu=$GPU tag=$TAG package=$PACKAGE"
  pkill -f qemu-system 2>/dev/null; sleep 2
  adb kill-server 2>/dev/null; sleep 1
  [ -f "$APKFILE" ] && mv "$APKFILE" /tmp/test-$TAG.apk
  [ -f /tmp/test-$TAG.apk ] || cp /tmp/test.apk /tmp/test-$TAG.apk 2>/dev/null
  ls -la /tmp/test-$TAG.apk
  echo no | $AVDM create avd -n dc -k "system-images;android-34;google_apis;x86_64" -d pixel_6 --force > emu/avd-$TAG.log 2>&1
  nohup $SDK/emulator/emulator -avd dc -no-window -no-audio -no-boot-anim -gpu $GPU -memory 2048 -accel on -no-snapshot > emu/boot-$TAG.log 2>&1 &
  timeout 150 adb wait-for-device
  ok=0
  for i in $(seq 1 40); do
    b=$(adb shell getprop sys.boot_completed 2>/dev/null | tr -d '\r')
    if [ "$b" = "1" ]; then ok=1; echo "booted after ~$((i*5))s"; break; fi
    sleep 5
  done
  echo "boot_completed=$ok"
  if [ "$ok" != "1" ]; then tail -8 emu/boot-$TAG.log; exit 0; fi
  SZ=$(adb shell wm size | grep -o '[0-9]*x[0-9]*' | head -1)
  W=${SZ%x*}; H=${SZ#*x}
  echo "screen=${W}x${H}"
  adb install -r /tmp/test-$TAG.apk 2>&1 | tail -1
  adb logcat -c
  adb shell monkey -p $PACKAGE -c android.intent.category.LAUNCHER 1 2>&1 | tail -1
  sleep 12
  tapfrac 0.80,0.27
  sleep 25
  adb exec-out screencap -p > emu/shot-$TAG-1.png
  if [ -n "$TAP1" ]; then tapfrac $TAP1; fi
  sleep 5
  adb exec-out screencap -p > emu/shot-$TAG-2.png
  sleep 10
  adb exec-out screencap -p > emu/shot-$TAG-3.png
  echo "--- pid:"; adb shell pidof $PACKAGE
  adb logcat -d > emu/logcat-$TAG.txt 2>&1
  adb emu kill 2>/dev/null
  echo RUN_DONE_$TAG
fi
