#!/bin/bash
# emu-test: UNIVERSAL Android emulator tester (Cloud PC edition).
# Any APK + any package: config comes from emu/config.env
#   PACKAGE=com.example.app
#   APKFILE=emu/whatever.apk        (fetched into storage beforehand)
#   TAP1=540,2160  TAP2=540,1900    (optional taps between shots)
# The Android SDK does NOT persist between Cloud PC runs (the Actions
# cache key already existed, so installs are never re-saved) - the
# setup step reinstalls it each run (~4 min, it fits the job cap).
SDK=$HOME/.cache/cloudpc-models/android-sdk
SYS_SDK=/usr/local/lib/android/sdk
export ANDROID_HOME=$SDK ANDROID_SDK_ROOT=$SDK
export ANDROID_AVD_HOME=$HOME/emu-avd-home
mkdir -p $SDK emu $ANDROID_AVD_HOME
SDKM="$SDK/cmdline-tools/latest/bin/sdkmanager --sdk_root=$SDK"
AVDM="$SDK/cmdline-tools/latest/bin/avdmanager"
mode=$1
if [ "$mode" = setup ]; then
  if [ ! -d $SDK/cmdline-tools/latest ]; then
    mkdir -p $SDK/cmdline-tools
    cp -r $SYS_SDK/cmdline-tools/latest $SDK/cmdline-tools/latest
  fi
  echo 'KERNEL=="kvm", GROUP="kvm", MODE="0666", OPTIONS+="static_node=kvm"' | sudo tee /etc/udev/rules.d/99-kvm4all.rules >/dev/null
  sudo udevadm control --reload-rules; sudo udevadm trigger --name-match=kvm; sleep 1
  ls -la /dev/kvm
  yes | $SDKM --licenses > emu/licenses.log 2>&1
  $SDKM "emulator" "platform-tools" "platforms;android-34" "system-images;android-34;google_apis;x86_64" > emu/setup.log 2>&1
  echo "sdkmanager exit=$?"
  ls $SDK
  echo SETUP_DONE
fi
if [ "$mode" = run ]; then
  export PATH=$SDK/platform-tools:$SDK/emulator:$PATH
  PACKAGE=com.onion.deathcart
  APKFILE=emu/DeathCart-emu.apk
  TAP1=540,2160
  TAP2=
  [ -f emu/config.env ] && . emu/config.env
  echo "package=$PACKAGE apk=$APKFILE"
  # keep the APK out of git-committed storage: work from /tmp
  [ -f "$APKFILE" ] && mv "$APKFILE" /tmp/test.apk
  ls -la /tmp/test.apk
  echo no | $AVDM create avd -n dc -k "system-images;android-34;google_apis;x86_64" -d pixel_6 --force > emu/avd.log 2>&1
  echo "avdmanager exit=$?"
  echo "--- avd home:"; ls -la $ANDROID_AVD_HOME
  $SDK/emulator/emulator -list-avds
  nohup $SDK/emulator/emulator -avd dc -no-window -no-audio -no-boot-anim -gpu swiftshader_indirect -memory 2048 -accel on -no-snapshot > emu/boot.log 2>&1 &
  timeout 150 adb wait-for-device
  echo "wait-for-device exit=$?"
  ok=0
  for i in $(seq 1 40); do
    b=$(adb shell getprop sys.boot_completed 2>/dev/null | tr -d '\r')
    if [ "$b" = "1" ]; then ok=1; echo "booted after ~$((i*5))s of polling"; break; fi
    sleep 5
  done
  echo "boot_completed=$ok"
  if [ "$ok" != "1" ]; then echo "--- boot.log tail:"; tail -15 emu/boot.log; exit 0; fi
  adb shell getprop ro.build.version.release
  adb install -r /tmp/test.apk 2>&1 | tail -2
  adb shell monkey -p $PACKAGE -c android.intent.category.LAUNCHER 1 2>&1 | tail -1
  sleep 30
  adb exec-out screencap -p > emu/shot-1.png
  if [ -n "$TAP1" ]; then adb shell input tap $(echo $TAP1 | tr ',' ' '); fi
  sleep 4
  adb exec-out screencap -p > emu/shot-2.png
  if [ -n "$TAP2" ]; then adb shell input tap $(echo $TAP2 | tr ',' ' '); fi
  sleep 18
  adb exec-out screencap -p > emu/shot-3.png
  echo "--- focus:"; adb shell dumpsys window windows 2>/dev/null | grep -i "mCurrentFocus" | head -2
  echo "--- pid:"; adb shell pidof $PACKAGE
  rm -f /tmp/test.apk
  ls -la emu/
  echo RUN_DONE
fi
