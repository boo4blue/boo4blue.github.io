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
mkdir -p $SDK emu/tv-match/real emu/tv-match/real40 emu/tv-match/logs emu/tv-match/logs/dumps emu/tv-match/work $ANDROID_AVD_HOME
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
  # v4 (2026-11-09): the v1–v3 add line was poisoned two ways —
  # (1) it named emu/tv-match/real40, a dir that exists only after
  # a BASE40 run: git add with a missing pathspec stages NOTHING,
  # so no commit ever formed and three runs reported total silence;
  # (2) it added the whole logs dir including runner.log, a shared
  # append-log that conflicts on every rebase. Mirror run-pm.sh:
  # only per-batch files; runner.log belongs to the final step.
  git add emu/tv-match/real emu/tv-match/logs/dumps emu/tv-match/work emu/tv-match/dup-md5.txt 2>/dev/null
  git add emu/tv-match/real40 emu/tv-match/logs/nav-*.log emu/tv-match/logs/boot-*.log emu/tv-match/logs/avd-*.log emu/tv-match/logs/sdk-*.log emu/tv-match/logs/install-*.log emu/tv-match/logs/licenses.log emu/tv-match/failed_pages-*.txt 2>/dev/null || true
  if git diff --cached --quiet; then log "push_captures: nothing new for $batch"; return 0; fi
  git commit -m "tv-match: cap $batch captures (mid-run)" 2>&1 | tail -1
  # v3 (2026-11-09): the old loop rebased with a DIRTY tree — the
  # workflow deletes inbox files as it runs (unstaged deletions),
  # so every rebase refused and every push failed while a sibling
  # run kept moving origin/main. Two full runs produced ZERO tv
  # commits this way. Now: stash the unstaged dirt, rebase onto
  # the fresh origin, push, restore the dirt.
  local i
  for i in 1 2 3 4 5 6; do
    if git push origin main 2>&1 | tee -a $TVLOG; then log "push_captures: PUSHED cap $batch"; return 0; fi
    git fetch origin main 2>&1 | tail -1 | tee -a $TVLOG
    git stash push -q --include-untracked 2>/dev/null
    if git rebase origin/main 2>&1 | tail -1 | tee -a $TVLOG; then
      git stash pop -q 2>/dev/null
    else
      git rebase --abort 2>/dev/null
      git stash pop -q 2>/dev/null
      log "push_captures: rebase conflict for $batch (keeping local commit for the final step)"
      return 0
    fi
    sleep 5
  done
  log "push_captures: PUSH FAILED for cap $batch (final commit step is the second chance)"
  return 0
}

mode=${1:-}
# Split setup (v2, 2026-11-09): the one-shot setup installs ~3 GB
# (emulator + platform + TWO TV images) inside pc.py's 600 s job cap
# and died mid-download on the first run — no captures, no logs.
# Chained single-purpose jobs in one workflow run share the runner
# filesystem, so: setup-a (tools) -> setup-b (API-34 image) ->
# setup-c (API-36 fallback image, optional) -> cap.
if [ "$mode" = setup-a ] || [ "$mode" = setup ]; then
  if [ ! -d $SDK/cmdline-tools/latest ]; then
    mkdir -p $SDK/cmdline-tools
    cp -r /usr/local/lib/android/sdk/cmdline-tools/latest $SDK/cmdline-tools/latest
  fi
  echo 'KERNEL=="kvm", GROUP="kvm", MODE="0666", OPTIONS+="static_node=kvm"' | sudo tee /etc/udev/rules.d/99-kvm4all.rules >/dev/null
  sudo udevadm control --reload-rules; sudo udevadm trigger --name-match=kvm; sleep 1
  yes | $SDKM --licenses > emu/tv-match/logs/licenses.log 2>&1
  $SDKM "emulator" "platform-tools" "platforms;android-34" > emu/tv-match/logs/sdk-a.log 2>&1
  echo "setup-a sdkmanager exit=$?"
  [ -x $SDK/emulator/emulator ] && echo "SETUP_A_OK" || echo "SETUP_A_INCOMPLETE"
  # Report immediately (v3): setup verdicts used to be invisible
  # until a cap batch pushed — a dead chain looked like silence.
  log "setup-a done"
  push_captures "setup-a"
fi
if [ "$mode" = setup-b ] || [ "$mode" = setup ]; then
  $SDKM "$IMG34" > emu/tv-match/logs/sdk-b.log 2>&1
  echo "setup-b sdkmanager exit=$?"
  [ -f $SDK/system-images/android-34/android-tv/x86/system.img ] && echo "SETUP_B_OK" || echo "SETUP_B_INCOMPLETE"
  log "setup-b done"
  push_captures "setup-b"
fi
if [ "$mode" = setup-c ] || [ "$mode" = setup ]; then
  $SDKM "$IMG36" > emu/tv-match/logs/sdk-c.log 2>&1
  echo "setup-c sdkmanager exit=$?"
  ls $SDK/system-images/android-36/android-tv/x86_64/system.img 2>/dev/null && echo "SETUP_C_OK" || echo "API-36 TV x86_64 image MISSING (fallback unavailable)"
  echo SETUP_DONE
  log "setup-c done"
  push_captures "setup-c"
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
  TV_BATCH=$BATCH TV_OUT_SUFFIX=${TV_OUT_SUFFIX:-} python3 emu/tv-match/nav-tv.py 2>&1 | tee -a emu/tv-match/logs/nav-$BATCH.log
  adb shell logcat -d > emu/tv-match/logs/logcat-$BATCH.txt 2>/dev/null
  adb emu kill 2>/dev/null
  push_captures "$BATCH"
  log "cap $BATCH done"
fi
