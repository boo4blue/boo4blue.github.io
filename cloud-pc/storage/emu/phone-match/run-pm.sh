#!/bin/bash
# run-pm.sh — Cloud PC runner for the Onion TV phone-match rig.
# Runs ON the GitHub Actions runner with cwd = cloud-pc/storage.
#   bash emu/phone-match/run-pm.sh setup        install SDK (cache-warm fast)
#   bash emu/phone-match/run-pm.sh cap <batch>  boot, install APK, drive nav.py
# Modeled on emu-test's run10.sh (same SDK cache, same KVM fix).
set -u
SDK=$HOME/.cache/cloudpc-models/android-sdk
export ANDROID_HOME=$SDK ANDROID_SDK_ROOT=$SDK
export ANDROID_AVD_HOME=$HOME/emu-avd-home
mkdir -p $SDK emu/phone-match/real emu/phone-match/logs $ANDROID_AVD_HOME
SDKM="$SDK/cmdline-tools/latest/bin/sdkmanager --sdk_root=$SDK"
AVDM="$SDK/cmdline-tools/latest/bin/avdmanager"
PMLOG=emu/phone-match/logs/runner.log
log() { echo "[run-pm $(date +%H:%M:%S)] $*" | tee -a $PMLOG; }

mode=${1:-}
if [ "$mode" = setup ]; then
  if [ ! -d $SDK/cmdline-tools/latest ]; then
    mkdir -p $SDK/cmdline-tools
    cp -r /usr/local/lib/android/sdk/cmdline-tools/latest $SDK/cmdline-tools/latest
  fi
  echo 'KERNEL=="kvm", GROUP="kvm", MODE="0666", OPTIONS+="static_node=kvm"' | sudo tee /etc/udev/rules.d/99-kvm4all.rules >/dev/null
  sudo udevadm control --reload-rules; sudo udevadm trigger --name-match=kvm; sleep 1
  yes | $SDKM --licenses > emu/phone-match/logs/licenses.log 2>&1
  for attempt in 1 2 3; do
    $SDKM "emulator" "platform-tools" "platforms;android-34" "system-images;android-34;google_apis;x86_64" > emu/phone-match/logs/sdk.log 2>&1
    echo "attempt $attempt sdkmanager exit=$?"
    if [ -x $SDK/emulator/emulator ] && [ -f $SDK/system-images/android-34/google_apis/x86_64/system.img ]; then
      echo "SDK verified OK on attempt $attempt"; break
    fi
    rm -rf $SDK/emulator $SDK/.temp; sleep 5
  done
  echo SETUP_DONE
fi

if [ "$mode" = cap ]; then
  BATCH=${2:-A}
  export PATH=$SDK/platform-tools:$SDK/emulator:$PATH
  APK_SRC=${PM_APK:-emu/phone-match/app-code39.apk}
  if [ ! -x $SDK/emulator/emulator ]; then log "FATAL: emulator missing (run setup first)"; exit 1; fi
  pkill -f qemu-system 2>/dev/null; sleep 2; adb kill-server 2>/dev/null; sleep 1
  cp "$APK_SRC" /tmp/pm-$BATCH.apk || { log "FATAL: APK missing at $APK_SRC"; exit 1; }
  ls -la /tmp/pm-$BATCH.apk | tee -a $PMLOG; md5sum /tmp/pm-$BATCH.apk | tee -a $PMLOG
  echo no | $AVDM create avd -n pm$BATCH -k "system-images;android-34;google_apis;x86_64" -d pixel_6 --force > emu/phone-match/logs/avd-$BATCH.log 2>&1
  nohup $SDK/emulator/emulator -avd pm$BATCH -no-window -no-audio -no-boot-anim \
    -gpu swiftshader_indirect -feature -Vulkan -memory 2048 -accel on -no-snapshot \
    > emu/phone-match/logs/boot-$BATCH.log 2>&1 &
  timeout 150 adb wait-for-device
  ok=0
  for i in $(seq 1 40); do
    b=$(adb shell getprop sys.boot_completed 2>/dev/null | tr -d '\r')
    if [ "$b" = "1" ]; then ok=1; log "booted after ~$((i*5))s"; break; fi
    sleep 5
  done
  log "boot_completed=$ok"
  if [ "$ok" != "1" ]; then tail -8 emu/phone-match/logs/boot-$BATCH.log | tee -a $PMLOG; exit 0; fi
  adb shell wm size 1080x2280; adb shell wm density 420
  adb shell settings put global window_animation_scale 0
  adb shell settings put global transition_animation_scale 0
  adb shell settings put global animator_duration_scale 0
  adb shell wm dismiss-keyguard
  log "installing APK"
  adb install -r /tmp/pm-$BATCH.apk 2>&1 | tail -2 | tee -a $PMLOG
  adb shell pm list packages | grep -q com.onioncore.oniontv && log "package present" || log "PACKAGE MISSING AFTER INSTALL"
  PM_BATCH=$BATCH python3 emu/phone-match/nav.py 2>&1 | tee -a emu/phone-match/logs/nav-$BATCH.log
  adb emu kill 2>/dev/null
  log "cap $BATCH done"
fi
