#!/bin/bash
# Cloud PC Android emulator runner for Death Cart test builds.
# SDK lives in the Actions cache dir so installs persist across runs.
SDK=$HOME/.cache/cloudpc-models/android-sdk
SYS_SDK=/usr/local/lib/android/sdk
export ANDROID_HOME=$SDK ANDROID_SDK_ROOT=$SDK
mkdir -p $SDK emu
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
  tail -3 emu/setup.log
  ls $SDK
  echo SETUP_DONE
fi
if [ "$mode" = run ]; then
  export PATH=$SDK/platform-tools:$SDK/emulator:$PATH
  echo no | $AVDM create avd -n dc -k "system-images;android-34;google_apis;x86_64" -d pixel_6 --force > emu/avd.log 2>&1
  echo "avd exit=$?"
  nohup $SDK/emulator/emulator -avd dc -no-window -no-audio -no-boot-anim -gpu swiftshader_indirect -memory 2048 -accel on -no-snapshot > emu/boot.log 2>&1 &
  adb wait-for-device
  ok=0
  for i in $(seq 1 48); do
    b=$(adb shell getprop sys.boot_completed 2>/dev/null | tr -d '\r')
    if [ "$b" = "1" ]; then ok=1; echo "booted after ~$((i*5))s"; break; fi
    sleep 5
  done
  echo "boot_completed=$ok"
  adb shell getprop ro.build.version.release
  adb install -r emu/DeathCart-emu.apk 2>&1 | tail -2
  adb shell monkey -p com.onion.deathcart -c android.intent.category.LAUNCHER 1 2>&1 | tail -1
  sleep 30
  adb exec-out screencap -p > emu/shot-title.png
  adb shell input tap 540 2160
  sleep 4
  adb exec-out screencap -p > emu/shot-2.png
  sleep 18
  adb exec-out screencap -p > emu/shot-3.png
  echo "--- focus:"; adb shell dumpsys window windows 2>/dev/null | grep -i "mCurrentFocus" | head -2
  echo "--- pid:"; adb shell pidof com.onion.deathcart
  rm -f emu/DeathCart-emu.apk
  ls -la emu/
  echo RUN_DONE
fi
