#!/bin/bash
# runob43.sh — Onion Browser v0.43.0 start-page screenshot run (Cloud PC).
# Mode: home — fetch the shipped APK (share URL, md5-checked), boot the
# google_apis AVD (arm64 translation; the default image refuses this
# arm64-only APK), install, launch, screenshot the NEW start page
# (top + two scrolls), UI-dump checks for the v0.42 sections (Dark
# Onion pill, ONION CORE tiles, AI Mode without the sparkles glyph),
# logcat, kill. Artifacts land in emu/. Verdict: emu/verdict-OB43.txt
SDK=$HOME/.cache/cloudpc-models/android-sdk
export ANDROID_HOME=$SDK ANDROID_SDK_ROOT=$SDK
export ANDROID_AVD_HOME=$HOME/emu-avd-home
export PATH=$SDK/platform-tools:$SDK/emulator:$PATH
mkdir -p emu $ANDROID_AVD_HOME
PKG=com.onion.browser
APK_MD5=28f2a02745b9cc7a663b1cffc8946eb7
APK_URL=https://onioncore-files.blueblazer82.workers.dev/s/3bbc911ff76f4b52
V=emu/verdict-OB43.txt
say() { echo "$1" | tee -a $V; }

uidump() { # $1 = dest file; retries once
  adb shell uiautomator dump /sdcard/ui.xml > /dev/null 2>&1
  adb exec-out cat /sdcard/ui.xml > "$1" 2>/dev/null
  if [ ! -s "$1" ]; then
    sleep 2
    adb shell uiautomator dump /sdcard/ui.xml > /dev/null 2>&1
    adb exec-out cat /sdcard/ui.xml > "$1" 2>/dev/null
  fi
}

mode=$1
if [ "$mode" = home ]; then
  : > $V
  say "=== Onion Browser v0.43.0 emu screenshot run $(date -u +%H:%M:%S)Z img=${OB_IMG:-google_apis}"
  if [ ! -x $SDK/emulator/emulator ]; then say "FATAL=no emulator (setup missing)"; exit 0; fi
  pkill -f qemu-system 2>/dev/null; sleep 2; adb kill-server 2>/dev/null; sleep 1
  # --- APK fetch: share URL, md5-verified ---
  curl -sL --retry 2 --max-time 120 -o /tmp/ob43.apk "$APK_URL"
  if [ "$(md5sum /tmp/ob43.apk 2>/dev/null | cut -d' ' -f1)" != "$APK_MD5" ]; then
    say "VERDICT=APK_FETCH_FAIL (md5 mismatch)"; ls -la /tmp/ob43.apk 2>&1 | tail -1; exit 0
  fi
  say "APK md5_ok=1 size=$(stat -c%s /tmp/ob43.apk)"
  # --- AVD + boot ---
  echo no | $SDK/cmdline-tools/latest/bin/avdmanager create avd -n obemu42 -k "system-images;android-34;${OB_IMG:-google_apis};x86_64" -d pixel_6 --force > emu/avd-OB43.log 2>&1
  nohup $SDK/emulator/emulator -avd obemu42 -no-window -no-audio -no-boot-anim -gpu angle_indirect -feature -Vulkan -memory 2048 -accel on -no-snapshot > emu/boot-OB43.log 2>&1 &
  timeout 150 adb wait-for-device
  ok=0
  for i in $(seq 1 30); do
    b=$(adb shell getprop sys.boot_completed 2>/dev/null | tr -d '\r')
    if [ "$b" = "1" ]; then ok=1; say "boot_completed=1 after ~$((i*5))s"; break; fi
    sleep 5
  done
  if [ "$ok" != "1" ]; then say "VERDICT=BOOT_FAIL"; tail -5 emu/boot-OB43.log; exit 0; fi
  SZ=$(adb shell wm size | grep -o '[0-9]*x[0-9]*' | head -1); W=${SZ%x*}; H=${SZ#*x}
  say "screen=${W}x${H}"
  # --- install + launch ---
  adb install -r /tmp/ob43.apk > emu/install-OB43.txt 2>&1
  say "install_exit=$? install_last=$(tail -1 emu/install-OB43.txt)"
  pml=$(adb shell pm list packages 2>/dev/null | grep -c 'com.onion.browser')
  say "pm_list_match=$pml"
  if [ "$pml" = "0" ]; then say "VERDICT=INSTALL_FAIL"; adb logcat -d > emu/logcat-OB43.txt 2>&1; exit 0; fi
  adb logcat -c
  adb shell monkey -p $PKG -c android.intent.category.LAUNCHER 1 > /dev/null 2>&1
  sleep 12
  adb shell input tap $(awk -v w=$W -v h=$H 'BEGIN{printf "%d %d", w*0.80, h*0.27}')  # dismiss immersive toast
  sleep 3
  pid1=$(adb shell pidof $PKG | tr -d '\r'); say "pid_after_launch=${pid1:-NONE}"
  # --- screenshots: top, then two scrolls ---
  adb exec-out screencap -p > emu/shot-OB43-1-top.png
  say "shot1_bytes=$(stat -c%s emu/shot-OB43-1-top.png)"
  uidump emu/ui-OB43-home.xml
  for needle in 'Dark Onion: Off' 'ONION CORE' 'Hub' 'Mail' 'Engine' 'Photos' 'Drive' 'Community' 'Characters' 'Map' 'All sites' 'AI Mode' 'SPEED DIAL'; do
    if grep -q "$needle" emu/ui-OB43-home.xml; then say "ui_has=$needle"; else say "ui_missing=$needle"; fi
  done
  if grep -q '✨' emu/ui-OB43-home.xml; then say "ui_sparkles=STILL_PRESENT"; else say "ui_sparkles=absent"; fi
  adb shell input swipe $((W/2)) $((H*72/100)) $((W/2)) $((H*30/100)) 300
  sleep 2
  adb exec-out screencap -p > emu/shot-OB43-2-scroll.png
  say "shot2_bytes=$(stat -c%s emu/shot-OB43-2-scroll.png)"
  adb shell input swipe $((W/2)) $((H*72/100)) $((W/2)) $((H*30/100)) 300
  sleep 2
  adb exec-out screencap -p > emu/shot-OB43-3-scroll.png
  say "shot3_bytes=$(stat -c%s emu/shot-OB43-3-scroll.png)"
  pid2=$(adb shell pidof $PKG | tr -d '\r'); say "pid_at_end=${pid2:-NONE}"
  adb logcat -d > emu/logcat-OB43.txt 2>&1
  grep -E 'AndroidRuntime|FATAL' emu/logcat-OB43.txt | grep -c "$PKG" > emu/fatal-OB43.txt || true
  say "logcat_bytes=$(stat -c%s emu/logcat-OB43.txt)"
  adb emu kill 2>/dev/null
  say "HOME_PHASE_DONE"
fi
