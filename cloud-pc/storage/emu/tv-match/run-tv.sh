#!/bin/bash
# run-tv.sh — Cloud PC runner for the Onion TV tv-match rig.
# Runs ON the GitHub Actions runner with cwd = cloud-pc/storage.
#   bash emu/tv-match/run-tv.sh setup        install SDK + TV images (cache-warm fast)
#   bash emu/tv-match/run-tv.sh cap <batch>  boot TV AVD, install APK, drive nav-tv.py
# Modeled on emu/phone-match/run-pm.sh (same SDK cache, same KVM fix,
# same mid-run push survival pattern).
#
# TV image problem: Google publishes API-34 Android TV only as x86 and
# armeabi-v7a (no x86_64 until API 36). The APK's native libs are ARM.
# Primary: API-34 android-tv x86 (Fire OS 8 fidelity; the image carries
# ARM translation). Fallback: API-36 android-tv x86_64. cap() tries the
# primary, and if the package will not install/run, retries on the
# fallback IN THE SAME RUN and records which AVD served in avd-info.txt.
set -u
SDK=$HOME/.cache/cloudpc-models/android-sdk
export ANDROID_HOME=$SDK ANDROID_SDK_ROOT=$SDK
export ANDROID_AVD_HOME=$HOME/emu-avd-home
mkdir -p $SDK emu/tv-match/real emu/tv-match/logs emu/tv-match/work $ANDROID_AVD_HOME
SDKM="$SDK/cmdline-tools/latest/bin/sdkmanager --sdk_root=$SDK"
AVDM="$SDK/cmdline-tools/latest/bin/avdmanager"
TVLOG=emu/tv-match/logs/runner.log
log() { echo "[run-tv $(date +%H:%M:%S)] $*" | tee -a $TVLOG; }

IMG34="system-images;android-34;android-tv;x86"
IMG36="system-images;android-36;android-tv;x86_64"

push_captures() {
  local batch=$1
  git config user.name "cloudpc" 2>/dev/null
  git config user.email "cloudpc@local" 2>/dev/null
  git add emu/tv-match/real emu/tv-match/logs emu/tv-match/work emu/tv-match/failed_pages-*.txt emu/tv-match/dup-md5.txt 2>/dev/null
  if git diff --cached --quiet; then log "push_captures: nothing new for $batch"; return 0; fi
  git commit -m "tv-match: cap $batch captures (mid-run)" 2>&1 | tail -1
  git fetch --deepen=100 origin main 2>/dev/null || git fetch origin main 2>/dev/null
  for i in 1 2 3 4 5; do
    if git push 2>&1 | tee -a $TVLOG; then log "push_captures: PUSHED cap $batch"; return 0; fi
    git pull --rebase origin main 2>&1 | tail -2 | tee -a $TVLOG || break
    sleep 15
  done
  log "push_captures: PUSH FAILED for cap $batch (final commit step is the second chance)"
  return 0
}

mode=${1:-}
if [ "$mode" = setup ]; then
  if [ ! -d $SDK/cmdline-tools/latest ]; then
    mkdir -p $SDK/cmdline-tools
    cp -r /usr/local/lib/android/sdk/cmdline-tools/latest $SDK/cmdline-tools/latest
  fi
  echo 'KERNEL=="kvm", GROUP="kvm", MODE="0666", OPTIONS+="static_node=kvm"' | sudo tee /etc/udev/rules.d/99-kvm4all.rules >/dev/null
  sudo udevadm control --reload-rules; sudo udevadm trigger --name-match=kvm; sleep 1
  yes | $SDKM --licenses > emu/tv-match/logs/licenses.log 2>&1
  for attempt in 1 2 3; do
    $SDKM "emulator" "platform-tools" "platforms;android-34" "$IMG34" "$IMG36" > emu/tv-match/logs/sdk.log 2>&1
    echo "attempt $attempt sdkmanager exit=$?"
    if [ -x $SDK/emulator/emulator ] && [ -f $SDK/system-images/android-34/android-tv/x86/system.img ]; then
      echo "SDK verified OK on attempt $attempt (API-34 TV x86 present)"; break
    fi
    rm -rf $SDK/emulator $SDK/.temp; sleep 5
  done
  ls $SDK/system-images/android-36/android-tv/x86_64/system.img 2>/dev/null && echo "API-36 TV x86_64 image present" || echo "API-36 TV x86_64 image MISSING (fallback unavailable)"
  echo SETUP_DONE
fi

boot_avd() {
  # $1 = avd name, $2 = image package, $3 = device profile
  local name=$1 img=$2 dev=$3
  echo no | $AVDM create avd -n $name -k "$img" -d $dev --force > emu/tv-match/logs/avd-$name.log 2>&1
  # Pin the Fire TV panel spec in the AVD config regardless of profile defaults.
  local cfg=$ANDROID_AVD_HOME/$name.avd/config.ini
  if [ -f "$cfg" ]; then
    for kv in "hw.lcd.width=1920" "hw.lcd.height=1080" "hw.lcd.density=320" \
              "hw.dPad=yes" "hw.mainKeys=yes" "hw.keyboard=no" \
              "hw.gpu.enabled=yes" "hw.ramSize=2048" "disk.dataPartition.size=4096M" \
              "hw.initialOrientation=landscape" "showDeviceFrame=no"; do
      k=${kv%%=*}
      grep -q "^$k=" "$cfg" && sed -i "s|^$k=.*|$kv|" "$cfg" || echo "$kv" >> "$cfg"
    done
  fi
  pkill -f qemu-system 2>/dev/null; sleep 2; adb kill-server 2>/dev/null; sleep 1
  nohup $SDK/emulator/emulator -avd $name -no-window -no-audio -no-boot-anim \
    -gpu swiftshader_indirect -feature -Vulkan -memory 2048 -accel on -no-snapshot \
    > emu/tv-match/logs/boot-$name.log 2>&1 &
  timeout 150 adb wait-for-device
  local ok=0 i b
  for i in $(seq 1 40); do
    b=$(adb shell getprop sys.boot_completed 2>/dev/null | tr -d '\r')
    if [ "$b" = "1" ]; then ok=1; log "$name booted after ~$((i*5))s"; break; fi
    sleep 5
  done
  echo $ok
}

if [ "$mode" = cap ]; then
  BATCH=${2:-BASE}
  export PATH=$SDK/platform-tools:$SDK/emulator:$PATH
  APK_SRC=${TV_APK:-emu/tv-match/app.apk}
  if [ ! -x $SDK/emulator/emulator ]; then log "FATAL: emulator missing (run setup first)"; exit 1; fi
  cp "$APK_SRC" /tmp/tv-$BATCH.apk || { log "FATAL: APK missing at $APK_SRC"; exit 1; }
  ls -la /tmp/tv-$BATCH.apk | tee -a $TVLOG; md5sum /tmp/tv-$BATCH.apk | tee -a $TVLOG

  SERVED=""
  ok=$(boot_avd tv34 "$IMG34" tv_1080p)
  log "tv34 boot_completed=$ok"
  if [ "$ok" = "1" ]; then
    adb shell settings put global window_animation_scale 0
    adb shell settings put global transition_animation_scale 0
    adb shell settings put global animator_duration_scale 0
    adb shell wm dismiss-keyguard
    log "installing APK on tv34"
    adb install -r /tmp/tv-$BATCH.apk > emu/tv-match/logs/install-tv34.log 2>&1
    if adb shell pm list packages | grep -q com.onioncore.oniontv; then
      SERVED="tv34 (API-34 android-tv x86)"
    else
      log "install FAILED on tv34: $(tail -2 emu/tv-match/logs/install-tv34.log)"
    fi
  fi
  if [ -z "$SERVED" ]; then
    if [ -f $SDK/system-images/android-36/android-tv/x86_64/system.img ]; then
      ok=$(boot_avd tv36 "$IMG36" tv_1080p)
      log "tv36 boot_completed=$ok"
      if [ "$ok" = "1" ]; then
        adb shell settings put global window_animation_scale 0
        adb shell settings put global transition_animation_scale 0
        adb shell settings put global animator_duration_scale 0
        adb shell wm dismiss-keyguard
        log "installing APK on tv36"
        adb install -r /tmp/tv-$BATCH.apk > emu/tv-match/logs/install-tv36.log 2>&1
        if adb shell pm list packages | grep -q com.onioncore.oniontv; then
          SERVED="tv36 (API-36 android-tv x86_64)"
        else
          log "install FAILED on tv36: $(tail -2 emu/tv-match/logs/install-tv36.log)"
        fi
      fi
    else
      log "no fallback image available"
    fi
  fi
  echo "served-by: ${SERVED:-NONE}" | tee emu/tv-match/logs/avd-info-$BATCH.txt | tee -a $TVLOG
  if [ -z "$SERVED" ]; then log "FATAL: APK would not install on either TV image"; push_captures "$BATCH"; exit 0; fi
  TV_BATCH=$BATCH python3 emu/tv-match/nav-tv.py 2>&1 | tee -a emu/tv-match/logs/nav-$BATCH.log
  adb shell logcat -d > emu/tv-match/logs/logcat-$BATCH.txt 2>/dev/null
  adb emu kill 2>/dev/null
  push_captures "$BATCH"
  log "cap $BATCH done"
fi
