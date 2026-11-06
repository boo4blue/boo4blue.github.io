#!/bin/bash
# capture1.sh — Onion Core Ad #1 Round 1 real-app captures (Cloud PC lane).
# Modes: b1 | h1e1 | c1m1. Each mode: boot google_apis AVD -> fetch APK(s)
# from the emu-assets release (md5-checked) -> install (verdict via pm list,
# never tail) -> explore with UI dumps -> clean recorded pass -> stills,
# dumps, logcat, verdict into emu/shots/.
SDK=$HOME/.cache/cloudpc-models/android-sdk
export ANDROID_HOME=$SDK ANDROID_SDK_ROOT=$SDK
export ANDROID_AVD_HOME=$HOME/emu-avd-home
export PATH=$SDK/platform-tools:$SDK/emulator:$PATH
mkdir -p emu/shots $ANDROID_AVD_HOME
REL=https://github.com/boo4blue/boo4blue.github.io/releases/download/emu-assets
MODE=$1
V=emu/shots/verdict-$MODE.txt
: > $V
say() { echo "$1" | tee -a $V; }

cat > /tmp/tapfind.py <<'PYEOF'
import sys, re
data = open(sys.argv[1], encoding='utf-8', errors='replace').read()
needle = sys.argv[2].lower()
for m in re.finditer(r'<node[^>]*>', data):
    tag = m.group(0)
    attrs = dict(re.findall(r'([\w-]+)="([^"]*)"', tag))
    hay = ' '.join([attrs.get('text',''), attrs.get('content-desc',''), attrs.get('resource-id','')]).lower()
    if needle in hay:
        b = re.findall(r'\d+', attrs.get('bounds',''))
        if len(b) == 4:
            print((int(b[0])+int(b[2]))//2, (int(b[1])+int(b[3]))//2)
            sys.exit(0)
sys.exit(1)
PYEOF

uidump() { # $1 = dest xml
  adb shell uiautomator dump /sdcard/ui.xml > /dev/null 2>&1
  adb exec-out cat /sdcard/ui.xml > "$1" 2>/dev/null
  if [ ! -s "$1" ]; then sleep 2; adb shell uiautomator dump /sdcard/ui.xml > /dev/null 2>&1; adb exec-out cat /sdcard/ui.xml > "$1" 2>/dev/null; fi
}
tapfind() { # $1 = xml, $2 = needle -> taps if found, echoes 1/0
  local xy
  xy=$(python3 /tmp/tapfind.py "$1" "$2" 2>/dev/null)
  if [ -n "$xy" ]; then adb shell input tap $xy; say "tap[$2] -> $xy"; echo 1; else say "tap[$2] NOT FOUND"; echo 0; fi
}
texts() { grep -oE 'text="[^"]+"' "$1" 2>/dev/null | grep -vE 'text=""' | head -40 | tr '\n' '|'; }
fetchapk() { # $1 = asset name, $2 = md5, $3 = dest
  curl -sL --retry 2 --max-time 300 -o "$3" "$REL/$1"
  local got=$(md5sum "$3" 2>/dev/null | cut -d' ' -f1)
  if [ "$got" = "$2" ]; then say "fetch_ok $1 md5=$got size=$(stat -c%s "$3")"; return 0; else say "FETCH_FAIL $1 got=$got want=$2"; return 1; fi
}
installapk() { # $1 = apk path, $2 = pkg, $3 = tag
  adb install -r "$1" > emu/shots/install-$3.txt 2>&1
  local n=$(adb shell pm list packages 2>/dev/null | grep -c "$2")
  say "install $3 pm_match=$n"
  [ "$n" != "0" ]
}
bootavd() { # $1 = avd name
  if [ ! -x $SDK/emulator/emulator ]; then say "FATAL emulator missing (setup did not run)"; exit 0; fi
  pkill -f qemu-system 2>/dev/null; sleep 2; adb kill-server 2>/dev/null; sleep 1
  echo no | $SDK/cmdline-tools/latest/bin/avdmanager create avd -n "$1" -k "system-images;android-34;google_apis;x86_64" -d pixel_6 --force > emu/shots/avd-$MODE.log 2>&1
  nohup $SDK/emulator/emulator -avd "$1" -no-window -no-audio -no-boot-anim -gpu angle_indirect -feature -Vulkan -memory 2048 -accel on -no-snapshot > emu/shots/boot-$MODE.log 2>&1 &
  timeout 150 adb wait-for-device
  local ok=0
  for i in $(seq 1 36); do
    local b=$(adb shell getprop sys.boot_completed 2>/dev/null | tr -d '\r')
    if [ "$b" = "1" ]; then ok=1; say "boot_completed=1 after ~$((i*5))s"; break; fi
    sleep 5
  done
  if [ "$ok" != "1" ]; then say "VERDICT=BOOT_FAIL"; tail -5 emu/shots/boot-$MODE.log; exit 0; fi
  SZ=$(adb shell wm size | grep -o '[0-9]*x[0-9]*' | head -1); W=${SZ%x*}; H=${SZ#*x}
  say "screen=${W}x${H}"
}
record() { # $1 = seconds, $2 = device path
  adb shell screenrecord --bit-rate 6000000 --time-limit "$1" "$2" > /dev/null 2>&1 &
}
pullvid() { # $1 = device path, $2 = dest
  sleep 2
  adb pull "$1" "$2" > /dev/null 2>&1
  say "video $2 bytes=$(stat -c%s "$2" 2>/dev/null)"
}
dismiss_dialogs() { # $1 = xml prefix label
  uidump emu/shots/ui-$1.xml
  for t in "Got it" "Skip" "Not now" "Later" "No thanks" "Don't allow" "Dont allow"; do
    local hit=$(python3 /tmp/tapfind.py emu/shots/ui-$1.xml "$t" 2>/dev/null)
    if [ -n "$hit" ]; then adb shell input tap $hit; say "dismiss[$t] -> $hit"; sleep 2; uidump emu/shots/ui-$1.xml; fi
  done
}

if [ "$MODE" = "b1" ]; then
  PKG=com.onion.browser
  bootavd capb1
  fetchapk cap-OnionBrowser.apk 897528dc0f65cb16221c9b906483ddb5 /tmp/b1.apk || exit 0
  installapk /tmp/b1.apk $PKG b1 || { say "VERDICT=INSTALL_FAIL"; exit 0; }
  adb logcat -c
  adb shell monkey -p $PKG -c android.intent.category.LAUNCHER 1 > /dev/null 2>&1
  sleep 12
  adb shell input tap $(awk -v w=$W -v h=$H 'BEGIN{printf "%d %d", w*0.80, h*0.27}')
  sleep 3
  say "pid_launch=$(adb shell pidof $PKG | tr -d '\r')"
  dismiss_dialogs b1-home
  say "home_texts=$(texts emu/shots/ui-b1-home.xml)"
  adb exec-out screencap -p > emu/shots/B1-explore-home.png
  # --- explore: learn address bar coords
  URLXY=$(python3 /tmp/tapfind.py emu/shots/ui-b1-home.xml "url" 2>/dev/null)
  if [ -z "$URLXY" ]; then URLXY=$(python3 /tmp/tapfind.py emu/shots/ui-b1-home.xml "search" 2>/dev/null); fi
  if [ -z "$URLXY" ]; then URLXY="$((W/2)) $((H*8/100))"; fi
  say "url_bar_xy=$URLXY"
  adb shell input tap $URLXY; sleep 2
  adb shell input text "example.com"; sleep 1
  adb shell input keyevent 66; sleep 5
  adb exec-out screencap -p > emu/shots/B1-explore-loaded.png
  uidump emu/shots/ui-b1-loaded.xml
  say "loaded_texts=$(texts emu/shots/ui-b1-loaded.xml)"
  # --- explore: learn menu -> Settings -> Leak Check path
  MENUXY=$(python3 /tmp/tapfind.py emu/shots/ui-b1-loaded.xml "btn_menu" 2>/dev/null)
  if [ -z "$MENUXY" ]; then MENUXY=$(python3 /tmp/tapfind.py emu/shots/ui-b1-loaded.xml "menu" 2>/dev/null); fi
  if [ -z "$MENUXY" ]; then MENUXY="$((W*92/100)) $((H*93/100))"; fi
  say "menu_xy=$MENUXY"
  adb shell input tap $MENUXY; sleep 2
  uidump emu/shots/ui-b1-menu.xml
  say "menu_texts=$(texts emu/shots/ui-b1-menu.xml)"
  SETXY=$(python3 /tmp/tapfind.py emu/shots/ui-b1-menu.xml "settings" 2>/dev/null)
  LEAKSWIPES=0; LEAKXY=""
  if [ -n "$SETXY" ]; then
    adb shell input tap $SETXY; sleep 3
    uidump emu/shots/ui-b1-settings.xml
    say "settings_texts=$(texts emu/shots/ui-b1-settings.xml)"
    LEAKXY=$(python3 /tmp/tapfind.py emu/shots/ui-b1-settings.xml "leak check" 2>/dev/null)
    if [ -z "$LEAKXY" ]; then
      adb shell input swipe $((W/2)) $((H*75/100)) $((W/2)) $((H*35/100)) 300; sleep 2
      uidump emu/shots/ui-b1-settings2.xml
      say "settings2_texts=$(texts emu/shots/ui-b1-settings2.xml)"
      LEAKXY=$(python3 /tmp/tapfind.py emu/shots/ui-b1-settings2.xml "leak check" 2>/dev/null)
      LEAKSWIPES=1
    fi
    if [ -n "$LEAKXY" ]; then
      adb shell input tap $LEAKXY; sleep 4
      adb exec-out screencap -p > emu/shots/B1-explore-leak.png
      uidump emu/shots/ui-b1-leak.xml
      say "leak_texts=$(texts emu/shots/ui-b1-leak.xml)"
    else
      say "LEAK_CHECK_NOT_FOUND_IN_SETTINGS"
    fi
  else
    say "SETTINGS_NOT_FOUND_IN_MENU"
  fi
  say "path menu=$MENUXY settings=$SETXY leak=$LEAKXY leak_swipes=$LEAKSWIPES"
  # --- clean recorded pass: fresh home, same learned sequence
  adb shell am force-stop $PKG; sleep 2
  adb shell monkey -p $PKG -c android.intent.category.LAUNCHER 1 > /dev/null 2>&1
  sleep 10
  adb shell input tap $(awk -v w=$W -v h=$H 'BEGIN{printf "%d %d", w*0.80, h*0.27}')
  sleep 2
  record 20 /sdcard/B1.mp4
  sleep 2
  adb shell input tap $URLXY; sleep 1
  adb shell input text "example.com"; sleep 1
  adb shell input keyevent 66; sleep 5
  if [ -n "$SETXY" ]; then adb shell input tap $MENUXY; sleep 1; adb shell input tap $SETXY; sleep 2; fi
  if [ "$LEAKSWIPES" = "1" ]; then adb shell input swipe $((W/2)) $((H*75/100)) $((W/2)) $((H*35/100)) 300; sleep 1; fi
  if [ -n "$LEAKXY" ]; then adb shell input tap $LEAKXY; fi
  sleep 9
  pullvid /sdcard/B1.mp4 emu/shots/B1.mp4
  adb exec-out screencap -p > emu/shots/B1-end.png
  say "pid_end=$(adb shell pidof $PKG | tr -d '\r')"
  adb logcat -d > emu/shots/logcat-b1.txt 2>&1
  say "fatal_b1=$(grep -c 'FATAL EXCEPTION' emu/shots/logcat-b1.txt)"
  adb emu kill 2>/dev/null
  say "B1_DONE"
fi

if [ "$MODE" = "h1e1" ]; then
  bootavd caph1
  fetchapk cap-HavenFW.apk 2203a0b2b286cdac889ce5778e2fb5df /tmp/h1.apk || exit 0
  fetchapk cap-OnionAPKEditor.apk 4f1f19422e171adabc45248c1720ca75 /tmp/e1.apk || exit 0
  installapk /tmp/h1.apk com.onion.fwhaven h1 || say "HAVEN_INSTALL_FAIL"
  installapk /tmp/e1.apk com.onion.apkeditor e1 || say "EDITOR_INSTALL_FAIL"
  # ---------- HAVEN ----------
  PKG=com.onion.fwhaven
  adb logcat -c
  adb shell monkey -p $PKG -c android.intent.category.LAUNCHER 1 > /dev/null 2>&1
  sleep 15
  adb shell input tap $(awk -v w=$W -v h=$H 'BEGIN{printf "%d %d", w*0.80, h*0.27}')
  sleep 2
  dismiss_dialogs h1-main
  say "haven_texts=$(texts emu/shots/ui-h1-main.xml)"
  adb exec-out screencap -p > emu/shots/H1-explore-main.png
  say "haven_pid=$(adb shell pidof $PKG | tr -d '\r')"
  # explore: tap first plausible resource item
  ITEMXY=""
  for needle in "food" "shelter" "pantry" "mission" "church" "center" "services"; do
    ITEMXY=$(python3 /tmp/tapfind.py emu/shots/ui-h1-main.xml "$needle" 2>/dev/null)
    if [ -n "$ITEMXY" ]; then say "haven_item_via=$needle xy=$ITEMXY"; break; fi
  done
  if [ -z "$ITEMXY" ]; then ITEMXY="$((W/2)) $((H*38/100))"; say "haven_item_via=FRACTION_FALLBACK xy=$ITEMXY"; fi
  adb shell input tap $ITEMXY; sleep 5
  adb exec-out screencap -p > emu/shots/H1-explore-card.png
  uidump emu/shots/ui-h1-card.xml
  say "haven_card_texts=$(texts emu/shots/ui-h1-card.xml)"
  adb shell input keyevent 4; sleep 2
  # recorded pass: main -> scroll/pan -> open card -> hold
  record 12 /sdcard/H1.mp4
  sleep 1
  adb shell input swipe $((W/2)) $((H*70/100)) $((W/2)) $((H*45/100)) 400; sleep 2
  adb shell input tap $ITEMXY; sleep 6
  pullvid /sdcard/H1.mp4 emu/shots/H1.mp4
  adb exec-out screencap -p > emu/shots/H1-end.png
  say "haven_pid_end=$(adb shell pidof $PKG | tr -d '\r')"
  adb shell am force-stop $PKG; sleep 1
  # ---------- APK EDITOR ----------
  PKG=com.onion.apkeditor
  adb shell monkey -p $PKG -c android.intent.category.LAUNCHER 1 > /dev/null 2>&1
  sleep 8
  dismiss_dialogs e1-lib
  say "editor_lib_texts=$(texts emu/shots/ui-e1-lib.xml)"
  adb exec-out screencap -p > emu/shots/E1-explore-lib.png
  APPXY=""
  for needle in "haven" "onion" "settings" "files"; do
    APPXY=$(python3 /tmp/tapfind.py emu/shots/ui-e1-lib.xml "$needle" 2>/dev/null)
    if [ -n "$APPXY" ]; then say "editor_app_via=$needle xy=$APPXY"; break; fi
  done
  if [ -z "$APPXY" ]; then APPXY="$((W/2)) $((H*30/100))"; say "editor_app_via=FRACTION_FALLBACK xy=$APPXY"; fi
  adb shell input tap $APPXY; sleep 4
  uidump emu/shots/ui-e1-app.xml
  say "editor_app_texts=$(texts emu/shots/ui-e1-app.xml)"
  adb exec-out screencap -p > emu/shots/E1-explore-app.png
  INSPXY=$(python3 /tmp/tapfind.py emu/shots/ui-e1-app.xml "inspector" 2>/dev/null)
  if [ -n "$INSPXY" ]; then adb shell input tap $INSPXY; sleep 4; fi
  uidump emu/shots/ui-e1-insp.xml
  say "editor_insp_texts=$(texts emu/shots/ui-e1-insp.xml)"
  adb exec-out screencap -p > emu/shots/E1-explore-insp.png
  FILEXY=""
  for needle in ".xml" ".dex" ".json" "manifest" "extract" "pull" "export"; do
    FILEXY=$(python3 /tmp/tapfind.py emu/shots/ui-e1-insp.xml "$needle" 2>/dev/null)
    if [ -n "$FILEXY" ]; then say "editor_file_via=$needle xy=$FILEXY"; break; fi
  done
  if [ -n "$FILEXY" ]; then adb shell input tap $FILEXY; sleep 3; fi
  uidump emu/shots/ui-e1-file.xml
  say "editor_file_texts=$(texts emu/shots/ui-e1-file.xml)"
  adb exec-out screencap -p > emu/shots/E1-explore-file.png
  EXY=$(python3 /tmp/tapfind.py emu/shots/ui-e1-file.xml "extract" 2>/dev/null)
  if [ -z "$EXY" ]; then EXY=$(python3 /tmp/tapfind.py emu/shots/ui-e1-file.xml "pull" 2>/dev/null); fi
  if [ -z "$EXY" ]; then EXY=$(python3 /tmp/tapfind.py emu/shots/ui-e1-file.xml "export" 2>/dev/null); fi
  if [ -z "$EXY" ]; then EXY=$(python3 /tmp/tapfind.py emu/shots/ui-e1-file.xml "save" 2>/dev/null); fi
  if [ -n "$EXY" ]; then adb shell input tap $EXY; sleep 3; say "editor_extract_tapped=$EXY"; else say "editor_extract_NOT_FOUND"; fi
  adb exec-out screencap -p > emu/shots/E1-explore-extract.png
  # recorded pass: back to Library, replay the learned path
  adb shell am force-stop $PKG; sleep 1
  adb shell monkey -p $PKG -c android.intent.category.LAUNCHER 1 > /dev/null 2>&1
  sleep 7
  record 16 /sdcard/E1.mp4
  sleep 1
  adb shell input tap $APPXY; sleep 3
  if [ -n "$INSPXY" ]; then adb shell input tap $INSPXY; sleep 3; fi
  adb shell input swipe $((W/2)) $((H*70/100)) $((W/2)) $((H*40/100)) 300; sleep 1
  if [ -n "$FILEXY" ]; then adb shell input tap $FILEXY; sleep 2; fi
  if [ -n "$EXY" ]; then adb shell input tap $EXY; fi
  sleep 6
  pullvid /sdcard/E1.mp4 emu/shots/E1.mp4
  say "editor_pid_end=$(adb shell pidof $PKG | tr -d '\r')"
  adb logcat -d > emu/shots/logcat-h1e1.txt 2>&1
  say "fatal_h1e1=$(grep -c 'FATAL EXCEPTION' emu/shots/logcat-h1e1.txt)"
  adb emu kill 2>/dev/null
  say "H1E1_DONE"
fi

if [ "$MODE" = "c1m1" ]; then
  bootavd capc1
  fetchapk cap-CareCircle.apk 7184a323ee317681428a2089c735c051 /tmp/c1.apk || exit 0
  fetchapk cap-OnionTV.apk b9e51a06b29b2b4cb963e56029815c09 /tmp/m1.apk || exit 0
  installapk /tmp/c1.apk com.onioncore.carecircle c1 || say "CARE_INSTALL_FAIL"
  installapk /tmp/m1.apk com.onioncore.oniontv m1 || say "TV_INSTALL_FAIL"
  # ---------- CARE CIRCLE (capture only what is real) ----------
  PKG=com.onioncore.carecircle
  adb logcat -c
  adb shell monkey -p $PKG -c android.intent.category.LAUNCHER 1 > /dev/null 2>&1
  sleep 12
  adb shell input tap $(awk -v w=$W -v h=$H 'BEGIN{printf "%d %d", w*0.80, h*0.27}')
  sleep 2
  dismiss_dialogs c1-first
  say "care_texts=$(texts emu/shots/ui-c1-first.xml)"
  adb exec-out screencap -p > emu/shots/C1-first.png
  say "care_pid=$(adb shell pidof $PKG | tr -d '\r')"
  # follow only non-credential paths: Today / Continue / guest-style entries
  CAREXY=""
  for needle in "today" "continue" "get started" "guest" "explore"; do
    CAREXY=$(python3 /tmp/tapfind.py emu/shots/ui-c1-first.xml "$needle" 2>/dev/null)
    if [ -n "$CAREXY" ]; then say "care_next_via=$needle xy=$CAREXY"; break; fi
  done
  record 10 /sdcard/C1.mp4
  sleep 1
  if [ -n "$CAREXY" ]; then adb shell input tap $CAREXY; sleep 4; else adb shell input swipe $((W/2)) $((H*70/100)) $((W/2)) $((H*45/100)) 400; sleep 3; fi
  sleep 4
  pullvid /sdcard/C1.mp4 emu/shots/C1.mp4
  adb exec-out screencap -p > emu/shots/C1-end.png
  uidump emu/shots/ui-c1-end.xml
  say "care_end_texts=$(texts emu/shots/ui-c1-end.xml)"
  say "care_pid_end=$(adb shell pidof $PKG | tr -d '\r')"
  adb shell am force-stop $PKG; sleep 1
  # ---------- ONION TV (phone home, Easter egg still) ----------
  PKG=com.onioncore.oniontv
  RES=$(adb shell cmd package resolve-activity --brief -a android.intent.action.MAIN -c android.intent.category.LAUNCHER $PKG 2>/dev/null | tail -1 | tr -d '\r')
  say "tv_launcher=$RES"
  adb shell am start -n "$RES" > emu/shots/launch-m1.txt 2>&1
  sleep 20
  adb exec-out screencap -p > emu/shots/M1-w1.png
  adb shell am force-stop $PKG; sleep 2
  adb shell am start -n "$RES" >> emu/shots/launch-m1.txt 2>&1
  sleep 25
  adb exec-out screencap -p > emu/shots/M1-w2.png
  sleep 20
  adb exec-out screencap -p > emu/shots/M1-w3.png
  uidump emu/shots/ui-m1.xml
  say "tv_texts=$(texts emu/shots/ui-m1.xml)"
  record 8 /sdcard/M1.mp4
  sleep 2
  adb shell input swipe $((W/2)) $((H*75/100)) $((W/2)) $((H*40/100)) 400
  sleep 6
  pullvid /sdcard/M1.mp4 emu/shots/M1.mp4
  say "tv_pid_end=$(adb shell pidof $PKG | tr -d '\r')"
  adb logcat -d > emu/shots/logcat-c1m1.txt 2>&1
  say "fatal_c1m1=$(grep -c 'FATAL EXCEPTION' emu/shots/logcat-c1m1.txt)"
  adb emu kill 2>/dev/null
  say "C1M1_DONE"
fi
