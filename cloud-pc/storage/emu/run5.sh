#!/bin/bash
# emu-test v5: UNIVERSAL Android emulator tester (Cloud PC edition).
# Standard GPU mode: angle_indirect. gfxstream/swangle Vulkan DEADLOCKS
# Godot's Vulkan renderer (vkWaitForFences hang, black screen - proven
# Oct 28). With ANGLE there is no guest Vulkan, so Godot falls back to
# its OpenGL3 Compatibility renderer and actually paints.
# Config (emu/config.env): PACKAGE, APKFILE, APKURL, TAP1/TAP2 fractions.
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
  GPU=angle_indirect
  export PATH=$SDK/platform-tools:$SDK/emulator:$PATH
  PACKAGE=com.onion.deathcart
  APKFILE=emu/DeathCart-emu.apk
  APKURL=https://github.com/boo4blue/boo4blue.github.io/releases/download/emu-assets/DeathCart-emu.apk
  TAP1=0.5,0.9
  TAP2=
  [ -f emu/config.env ] && . emu/config.env
  echo "gpu=$GPU package=$PACKAGE"
  [ -f "$APKFILE" ] && mv "$APKFILE" /tmp/test.apk
  if [ ! -s /tmp/test.apk ]; then echo "fetching APK directly"; curl -sL --retry 2 -o /tmp/test.apk "$APKURL"; fi
  ls -la /tmp/test.apk
  echo no | $AVDM create avd -n dc -k "system-images;android-34;google_apis;x86_64" -d pixel_6 --force > emu/avd.log 2>&1
  nohup $SDK/emulator/emulator -avd dc -no-window -no-audio -no-boot-anim -gpu $GPU -memory 2048 -accel on -no-snapshot > emu/boot.log 2>&1 &
  timeout 150 adb wait-for-device
  ok=0
  for i in $(seq 1 40); do
    b=$(adb shell getprop sys.boot_completed 2>/dev/null | tr -d '\r')
    if [ "$b" = "1" ]; then ok=1; echo "booted after ~$((i*5))s"; break; fi
    sleep 5
  done
  echo "boot_completed=$ok"
  if [ "$ok" != "1" ]; then tail -8 emu/boot.log; exit 0; fi
  SZ=$(adb shell wm size | grep -o '[0-9]*x[0-9]*' | head -1)
  W=${SZ%x*}; H=${SZ#*x}
  echo "screen=${W}x${H}"
  adb install -r /tmp/test.apk 2>&1 | tail -1
  adb logcat -c
  adb shell monkey -p $PACKAGE -c android.intent.category.LAUNCHER 1 2>&1 | tail -1
  sleep 12
  tapfrac 0.80,0.27
  sleep 25
  adb exec-out screencap -p > emu/shot-1.png
  if [ -n "$TAP1" ]; then tapfrac $TAP1; fi
  sleep 5
  adb exec-out screencap -p > emu/shot-2.png
  sleep 12
  adb exec-out screencap -p > emu/shot-3.png
  echo "--- pid:"; adb shell pidof $PACKAGE
  adb logcat -d > emu/logcat.txt 2>&1
  rm -f /tmp/test.apk
  echo RUN_DONE
fi
