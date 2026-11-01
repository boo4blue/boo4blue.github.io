#!/bin/bash
# runob.sh — Onion Browser v0.40.0 emulator test (Cloud PC edition).
# Modes: boot | shade   (setup is emu/run10.sh's job)
# boot : download APK (share URL, md5-checked, release-asset fallback),
#        boot AVD, install, launch, open menu panel, tap the Dark Onion
#        toggle, poll for the "Connected to Dark Onion" notification,
#        screenshot main + dark home. LEAVES THE EMULATOR RUNNING.
# shade: re-attach, dump notifications, expand shade, screenshot, tap the
#        notification if present, verify it cleared + dark mode off,
#        dump logcat, kill emulator.
# All artifacts land in emu/ (cloud-pc/storage/emu). Verdict: emu/verdict-OB.txt
SDK=$HOME/.cache/cloudpc-models/android-sdk
export ANDROID_HOME=$SDK ANDROID_SDK_ROOT=$SDK
export ANDROID_AVD_HOME=$HOME/emu-avd-home
export PATH=$SDK/platform-tools:$SDK/emulator:$PATH
mkdir -p emu $ANDROID_AVD_HOME
PKG=com.onion.browser
APK_MD5=bc9cabad476aaf32b0aec34dad4a1bbd
APK_PRIMARY=https://onioncore-files.blueblazer82.workers.dev/s/658dea548d4c414e
APK_FALLBACK=https://github.com/boo4blue/boo4blue.github.io/releases/download/emu-assets/OnionBrowser-v040.apk
V=emu/verdict-OB.txt
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
tapfind() { # $1 = ui xml, $2 = substring (text|content-desc|resource-id); echoes "x y" or nothing
  python3 - "$1" "$2" << 'PYEOF'
import re, sys
try:
    xml = open(sys.argv[1], encoding='utf-8', errors='replace').read()
except Exception:
    sys.exit(0)
needle = sys.argv[2]
for m in re.finditer(r'<node[^>]*>', xml):
    tag = m.group(0)
    if needle in tag:
        b = re.search(r'bounds="\[(\d+),(\d+)\]\[(\d+),(\d+)\]"', tag)
        if b:
            x1, y1, x2, y2 = map(int, b.groups())
            print((x1 + x2) // 2, (y1 + y2) // 2)
            sys.exit(0)
PYEOF
}
notif_present() {
  adb shell dumpsys notification --noredact 2>/dev/null | grep -c 'Connected to Dark Onion'
}

mode=$1
if [ "$mode" = boot ]; then
  : > $V
  say "=== Onion Browser v0.40.0 emu test — boot phase $(date -u +%H:%M:%S)Z"
  if [ ! -x $SDK/emulator/emulator ]; then say "FATAL=no emulator (setup missing)"; exit 0; fi
  pkill -f qemu-system 2>/dev/null; sleep 2; adb kill-server 2>/dev/null; sleep 1
  # --- APK fetch: primary share URL, md5-verified, release fallback ---
  src=""
  curl -sL --retry 2 --max-time 120 -o /tmp/ob.apk "$APK_PRIMARY"
  if [ "$(md5sum /tmp/ob.apk 2>/dev/null | cut -d' ' -f1)" = "$APK_MD5" ]; then src=share; fi
  if [ -z "$src" ]; then
    curl -sL --retry 2 --max-time 180 -o /tmp/ob.apk "$APK_FALLBACK"
    if [ "$(md5sum /tmp/ob.apk 2>/dev/null | cut -d' ' -f1)" = "$APK_MD5" ]; then src=release; fi
  fi
  if [ -z "$src" ]; then say "VERDICT=APK_FETCH_FAIL (both URLs, md5 mismatch)"; ls -la /tmp/ob.apk 2>&1 | tail -1; exit 0; fi
  say "APK_SRC=$src md5_ok=1 size=$(stat -c%s /tmp/ob.apk)"
  # --- AVD + boot ---
  echo no | $SDK/cmdline-tools/latest/bin/avdmanager create avd -n obemu -k "system-images;android-34;default;x86_64" -d pixel_6 --force > emu/avd-OB.log 2>&1
  nohup $SDK/emulator/emulator -avd obemu -no-window -no-audio -no-boot-anim -gpu angle_indirect -feature -Vulkan -memory 2048 -accel on -no-snapshot > emu/boot-OB.log 2>&1 &
  timeout 150 adb wait-for-device
  ok=0
  for i in $(seq 1 30); do
    b=$(adb shell getprop sys.boot_completed 2>/dev/null | tr -d '\r')
    if [ "$b" = "1" ]; then ok=1; say "boot_completed=1 after ~$((i*5))s"; break; fi
    sleep 5
  done
  if [ "$ok" != "1" ]; then say "VERDICT=BOOT_FAIL"; tail -5 emu/boot-OB.log; exit 0; fi
  SZ=$(adb shell wm size | grep -o '[0-9]*x[0-9]*' | head -1); W=${SZ%x*}; H=${SZ#*x}
  say "screen=${W}x${H}"
  # --- install + launch ---
  inst=$(adb install -r /tmp/ob.apk 2>&1 | tail -1); say "install=$inst"
  adb logcat -c
  adb shell monkey -p $PKG -c android.intent.category.LAUNCHER 1 > /dev/null 2>&1
  sleep 12
  adb shell input tap $(awk -v w=$W -v h=$H 'BEGIN{printf "%d %d", w*0.80, h*0.27}')  # dismiss immersive toast
  sleep 3
  pid1=$(adb shell pidof $PKG | tr -d '\r'); say "pid_after_launch=${pid1:-NONE}"
  adb exec-out screencap -p > emu/shot-OB-1-main.png
  say "shot1_bytes=$(stat -c%s emu/shot-OB-1-main.png)"
  # --- navigate: menu button -> Dark Onion toggle ---
  uidump emu/ui-OB-home.xml
  xy=$(tapfind emu/ui-OB-home.xml 'id/btn_menu')
  if [ -z "$xy" ]; then xy=$(tapfind emu/ui-OB-home.xml 'Menu'); fi
  if [ -z "$xy" ]; then say "VERDICT=NAV_FAIL (menu button not in UI dump)"; exit 0; fi
  adb shell input tap $xy; sleep 2
  uidump emu/ui-OB-menu.xml
  xy=$(tapfind emu/ui-OB-menu.xml 'Dark Onion: OFF')
  if [ -z "$xy" ]; then xy=$(tapfind emu/ui-OB-menu.xml 'Dark Onion mode, off'); fi
  if [ -z "$xy" ]; then say "VERDICT=NAV_FAIL (dark toggle not in menu dump)"; adb exec-out screencap -p > emu/shot-OB-2-menu.png; exit 0; fi
  adb shell input tap $xy; say "dark_toggle_tapped=1"; sleep 4
  uidump emu/ui-OB-dark.xml
  if grep -q 'Dark Onion: ON\|Dark Onion mode, on' emu/ui-OB-dark.xml; then say "dark_state=ON (toggle label)"; else say "dark_state=UNKNOWN (see ui-OB-dark.xml)"; fi
  adb exec-out screencap -p > emu/shot-OB-2-dark.png
  say "shot2_bytes=$(stat -c%s emu/shot-OB-2-dark.png)"
  # --- poll for the notification (Tor must verify first) ---
  found=0
  for i in $(seq 1 18); do
    n=$(notif_present)
    if [ "${n:-0}" != "0" ]; then found=1; say "NOTIF_PRESENT=1 after ~$((i*15))s of polling"; break; fi
    sleep 15
  done
  if [ "$found" != "1" ]; then say "NOTIF_PRESENT=0 after ~270s of polling"; fi
  adb shell pidof $PKG | tr -d '\r' > emu/ob-pid.txt
  say "BOOT_PHASE_DONE (emulator left running)"
fi

if [ "$mode" = shade ]; then
  say "=== shade phase $(date -u +%H:%M:%S)Z"
  timeout 60 adb wait-for-device
  pid=$(adb shell pidof $PKG 2>/dev/null | tr -d '\r'); say "pid_at_shade=${pid:-NONE}"
  adb shell dumpsys notification --noredact > emu/notif-before.txt 2>&1
  n=$(grep -c 'Connected to Dark Onion' emu/notif-before.txt)
  say "notif_before_count=$n"
  adb shell cmd statusbar expand-notifications; sleep 2
  adb exec-out screencap -p > emu/shot-OB-3-shade.png
  say "shot3_bytes=$(stat -c%s emu/shot-OB-3-shade.png)"
  if [ "${n:-0}" != "0" ]; then
    uidump emu/ui-OB-shade.xml
    xy=$(tapfind emu/ui-OB-shade.xml 'Connected to Dark Onion')
    if [ -n "$xy" ]; then
      adb shell input tap $xy; say "notif_tapped=1 at $xy"; sleep 4
    else
      say "notif_tapped=0 (node not in shade dump; raw coordinate fallback skipped)"
    fi
    adb exec-out screencap -p > emu/shot-OB-4-after-tap.png
    say "shot4_bytes=$(stat -c%s emu/shot-OB-4-after-tap.png)"
    adb shell cmd statusbar expand-notifications; sleep 2
    adb exec-out screencap -p > emu/shot-OB-5-shade-after.png
    say "shot5_bytes=$(stat -c%s emu/shot-OB-5-shade-after.png)"
    adb shell cmd statusbar collapse; sleep 1
    adb shell dumpsys notification --noredact > emu/notif-after.txt 2>&1
    n2=$(grep -c 'Connected to Dark Onion' emu/notif-after.txt)
    say "notif_after_count=$n2"
    uidump emu/ui-OB-after.xml
    if grep -q 'Dark Onion: ON\|Dark Onion mode, on' emu/ui-OB-after.xml; then
      say "dark_after_tap=STILL_ON"
    else
      say "dark_after_tap=OFF_OR_HOME_NORMAL (see ui-OB-after.xml + shot4)"
    fi
  else
    say "SHADE_PHASE_SKIP (no notification to tap)"
    adb shell cmd statusbar collapse
  fi
  adb logcat -d > emu/logcat-OB.txt 2>&1
  grep -E 'OnionDark|TorSelfTest|DarkOnion|AndroidRuntime|FATAL' emu/logcat-OB.txt | tail -30 > emu/logcat-OB-grep.txt
  say "logcat_bytes=$(stat -c%s emu/logcat-OB.txt)"
  adb emu kill 2>/dev/null
  say "SHADE_PHASE_DONE"
fi

if [ "$mode" = diag ]; then
  V=emu/verdict-OB2.txt; : > $V
  say "=== diag phase $(date -u +%H:%M:%S)Z"
  if [ ! -x $SDK/emulator/emulator ]; then say "FATAL=no emulator"; exit 0; fi
  pkill -f qemu-system 2>/dev/null; sleep 2; adb kill-server 2>/dev/null; sleep 1
  src=""
  curl -sL --retry 2 --max-time 120 -o /tmp/ob.apk "$APK_PRIMARY"
  if [ "$(md5sum /tmp/ob.apk 2>/dev/null | cut -d' ' -f1)" = "$APK_MD5" ]; then src=share; fi
  if [ -z "$src" ]; then
    curl -sL --retry 2 --max-time 180 -o /tmp/ob.apk "$APK_FALLBACK"
    if [ "$(md5sum /tmp/ob.apk 2>/dev/null | cut -d' ' -f1)" = "$APK_MD5" ]; then src=release; fi
  fi
  say "APK_SRC=$src"
  [ -z "$src" ] && { say "VERDICT=APK_FETCH_FAIL"; exit 0; }
  echo no | $SDK/cmdline-tools/latest/bin/avdmanager create avd -n obemu -k "system-images;android-34;default;x86_64" -d pixel_6 --force > emu/avd-OB2.log 2>&1
  nohup $SDK/emulator/emulator -avd obemu -no-window -no-audio -no-boot-anim -gpu angle_indirect -feature -Vulkan -memory 2048 -accel on -no-snapshot > emu/boot-OB2.log 2>&1 &
  timeout 150 adb wait-for-device
  ok=0
  for i in $(seq 1 30); do
    b=$(adb shell getprop sys.boot_completed 2>/dev/null | tr -d '\r')
    if [ "$b" = "1" ]; then ok=1; say "boot_completed=1 after ~$((i*5))s"; break; fi
    sleep 5
  done
  [ "$ok" != "1" ] && { say "VERDICT=BOOT_FAIL"; exit 0; }
  adb logcat -c
  adb install -r /tmp/ob.apk > emu/install-OB2.txt 2>&1
  say "install_exit=$?"
  say "install_output=$(tr '\n' '|' < emu/install-OB2.txt)"
  pml=$(adb shell pm list packages 2>/dev/null | grep -c 'com.onion.browser'); say "pm_list_match=$pml"
  pp=$(adb shell pm path com.onion.browser 2>/dev/null | tr -d '\r'); say "pm_path=${pp:-NONE}"
  if [ "$pml" != "0" ]; then
    comp=$(adb shell cmd package resolve-activity --brief -c android.intent.category.LAUNCHER $PKG 2>/dev/null | tail -1 | tr -d '\r')
    say "launcher_component=$comp"
    adb shell am start -W -n "$comp" > emu/amstart-OB2.txt 2>&1; say "am_start_exit=$?"
    sleep 10
    pid=$(adb shell pidof $PKG | tr -d '\r'); say "pid_after_amstart=${pid:-NONE}"
    adb exec-out screencap -p > emu/shot-OB2-1.png; say "shot_bytes=$(stat -c%s emu/shot-OB2-1.png)"
    uidump emu/ui-OB2.xml
    if grep -q 'com.onion.browser' emu/ui-OB2.xml; then say "ui_package=APP_IN_FOREGROUND"; else say "ui_package=NOT_APP (see ui-OB2.xml)"; fi
  fi
  adb logcat -d > emu/logcat-OB2.txt 2>&1
  say "logcat_bytes=$(stat -c%s emu/logcat-OB2.txt)"
  adb emu kill 2>/dev/null
  say "DIAG_DONE"
fi
