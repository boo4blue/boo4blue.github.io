#!/bin/bash
# emu-test v10: UNIVERSAL Android emulator tester (Cloud PC edition).
# run args: bash run10.sh run <gpu_mode> <sysimg_pkg_suffix> <tag>
# Graphics findings (Oct 28): guest Vulkan deadlocks Godot (disable it
# with -feature -Vulkan); ANGLE/gfxstream GLES gives EGL_BAD_SURFACE and
# Godot force-quits. Remaining hopes: SwiftShader GLES (pure software)
# and the AOSP "default" system image.
# Config (emu/config.env): PACKAGE, APKURL, TAP1/TAP2 fractions.
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
  for attempt in 1 2 3; do
    $SDKM "emulator" "platform-tools" "platforms;android-34" "system-images;android-34;google_apis;x86_64" "system-images;android-34;default;x86_64" > emu/setup.log 2>&1
    echo "attempt $attempt sdkmanager exit=$?"
    if [ -x $SDK/emulator/emulator ] && [ -f $SDK/system-images/android-34/google_apis/x86_64/system.img ] && [ -f $SDK/system-images/android-34/default/x86_64/system.img ]; then
      echo "SDK verified OK on attempt $attempt"
      break
    fi
    rm -rf $SDK/emulator $SDK/.temp
    sleep 5
  done
  echo SETUP_DONE
fi
if [ "$mode" = run ]; then
  GPU=${2:-swiftshader_indirect}
  IMG=${3:-google_apis}
  TAG=${4:-X}
  export PATH=$SDK/platform-tools:$SDK/emulator:$PATH
  PACKAGE=com.onion.deathcart
  APKURL=
  TAP1=0.5,0.9
  TAP2=
  [ -f emu/config.env ] && . emu/config.env
  echo "gpu=$GPU img=$IMG tag=$TAG package=$PACKAGE"
  if [ ! -x $SDK/emulator/emulator ]; then echo "FATAL: emulator missing"; exit 1; fi
  pkill -f qemu-system 2>/dev/null; sleep 2; adb kill-server 2>/dev/null; sleep 1
  curl -sL --retry 2 -o /tmp/test-$TAG.apk "$APKURL"
  ls -la /tmp/test-$TAG.apk; md5sum /tmp/test-$TAG.apk
  echo no | $AVDM create avd -n dc$TAG -k "system-images;android-34;$IMG;x86_64" -d pixel_6 --force > emu/avd-$TAG.log 2>&1
  nohup $SDK/emulator/emulator -avd dc$TAG -no-window -no-audio -no-boot-anim -gpu $GPU -feature -Vulkan -memory 2048 -accel on -no-snapshot > emu/boot-$TAG.log 2>&1 &
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
  sleep 20
  echo "--- pid@shot1:"; adb shell pidof $PACKAGE
  adb exec-out screencap -p > emu/shot-$TAG-1.png
  if [ -n "$TAP1" ]; then tapfrac $TAP1; fi
  sleep 5
  adb exec-out screencap -p > emu/shot-$TAG-2.png
  sleep 12
  adb exec-out screencap -p > emu/shot-$TAG-3.png
  echo "--- pid@end:"; adb shell pidof $PACKAGE
  adb logcat -d > emu/logcat-$TAG.txt 2>&1
  adb emu kill 2>/dev/null
  rm -f /tmp/test-$TAG.apk
  echo RUN_DONE_$TAG
fi
