#!/bin/bash
# runchar.sh — Onioncore Character v1.1 sign-in round-trip test (Cloud PC).
# Boots the google_apis image (Chrome present), installs the shell APK,
# taps "Continue with Onion ID", signs in on Onion ID in Chrome with a
# throwaway test account, confirms consent, and verifies the browser
# bounces back into the app, which redeems the handoff and lands signed in.
# Artifacts in emu/ (cloud-pc/storage/emu). Verdict: emu/verdict-CHAR.txt
SDK=$HOME/.cache/cloudpc-models/android-sdk
export ANDROID_HOME=$SDK ANDROID_SDK_ROOT=$SDK
export ANDROID_AVD_HOME=$HOME/emu-avd-home
export PATH=$SDK/platform-tools:$SDK/emulator:$PATH
mkdir -p emu $ANDROID_AVD_HOME
PKG=com.onioncore.character
V=emu/verdict-CHAR.txt
IDUSER=appflowtest3
IDPASS=appflow99xq
say() { echo "$1" | tee -a $V; }
shot() { adb exec-out screencap -p > "emu/$1" 2>/dev/null; say "shot $1 bytes=$(stat -c%s emu/$1 2>/dev/null)"; }
uidump() {
  adb shell uiautomator dump /sdcard/ui.xml > /dev/null 2>&1
  adb exec-out cat /sdcard/ui.xml > "$1" 2>/dev/null
  if [ ! -s "$1" ]; then sleep 2; adb shell uiautomator dump /sdcard/ui.xml > /dev/null 2>&1; adb exec-out cat /sdcard/ui.xml > "$1" 2>/dev/null; fi
}
tapfind() { # $1 = ui xml, $2 = substring; echoes "x y"
  python3 - "$1" "$2" << 'PYEOF'
import re, sys
try: xml = open(sys.argv[1], encoding='utf-8', errors='replace').read()
except Exception: sys.exit(0)
needle = sys.argv[2]
for m in re.finditer(r'<node[^>]*>', xml):
    tag = m.group(0)
    if needle in tag:
        b = re.search(r'bounds="\[(\d+),(\d+)\]\[(\d+),(\d+)\]"', tag)
        if b:
            x1, y1, x2, y2 = map(int, b.groups())
            print((x1 + x2) // 2, (y1 + y2) // 2); sys.exit(0)
PYEOF
}
editfields() { # echoes centers of all EditText nodes, one per line, in order
  python3 - "$1" << 'PYEOF'
import re, sys
try: xml = open(sys.argv[1], encoding='utf-8', errors='replace').read()
except Exception: sys.exit(0)
for m in re.finditer(r'<node[^>]*class="android.widget.EditText"[^>]*>', xml):
    b = re.search(r'bounds="\[(\d+),(\d+)\]\[(\d+),(\d+)\]"', m.group(0))
    if b:
        x1, y1, x2, y2 = map(int, b.groups())
        print((x1 + x2) // 2, (y1 + y2) // 2)
PYEOF
}
tapxy() { adb shell input tap $1 $2; }
focuspkg() { adb shell dumpsys window windows 2>/dev/null | grep -m1 mCurrentFocus | grep -o '[a-z0-9_.]*/' | head -1 | tr -d '/'; }

: > $V
say "=== character v1.1 sign-in round trip $(date -u +%H:%M:%S)Z"
if [ ! -x $SDK/emulator/emulator ]; then say "FATAL=no emulator (setup missing)"; exit 0; fi
pkill -f qemu-system 2>/dev/null; sleep 2; adb kill-server 2>/dev/null; sleep 1
base64 -d emu/character.apk.b64 > /tmp/char.apk 2>/dev/null
say "apk bytes=$(stat -c%s /tmp/char.apk) md5=$(md5sum /tmp/char.apk | cut -d' ' -f1)"
echo no | $SDK/cmdline-tools/latest/bin/avdmanager create avd -n charemu -k "system-images;android-34;google_apis;x86_64" -d pixel_6 --force > emu/avd-CHAR.log 2>&1
nohup $SDK/emulator/emulator -avd charemu -no-window -no-audio -no-boot-anim -gpu angle_indirect -feature -Vulkan -memory 2048 -accel on -no-snapshot > emu/boot-CHAR.log 2>&1 &
timeout 150 adb wait-for-device
ok=0
for i in $(seq 1 40); do
  b=$(adb shell getprop sys.boot_completed 2>/dev/null | tr -d '\r')
  if [ "$b" = "1" ]; then ok=1; say "boot_completed=1 after ~$((i*5))s"; break; fi
  sleep 5
done
if [ "$ok" != "1" ]; then say "VERDICT=BOOT_FAIL"; tail -8 emu/boot-CHAR.log >> $V; exit 0; fi
SZ=$(adb shell wm size | grep -o '[0-9]*x[0-9]*' | head -1); W=${SZ%x*}; H=${SZ#*x}; say "screen=${W}x${H}"
adb install -r /tmp/char.apk > emu/install-CHAR.log 2>&1
say "install: $(grep -o 'Success\|Failure\|FAILED[^ ]*' emu/install-CHAR.log | head -1)"
adb logcat -c
adb shell monkey -p $PKG -c android.intent.category.LAUNCHER 1 > /dev/null 2>&1
sleep 14
adb shell input tap $((W*80/100)) $((H*27/100)) # dismiss immersive toast
sleep 10
say "focus after launch: $(focuspkg) pid=$(adb shell pidof $PKG)"
shot shot-CHAR-1-home.png
uidump emu/ui-CHAR-1.xml
# --- tap the site sign-in button inside the WebView ---
XY=$(tapfind emu/ui-CHAR-1.xml "Onion ID")
if [ -z "$XY" ]; then XY=$(tapfind emu/ui-CHAR-1.xml "Sign in"); fi
if [ -n "$XY" ]; then say "tap sign-in at $XY"; tapxy $XY; else say "sign-in button not in dump — fraction tap"; adb shell input tap $((W/2)) $((H*60/100)); fi
sleep 10
say "focus after sign-in tap: $(focuspkg)"
shot shot-CHAR-2-browser.png
uidump emu/ui-CHAR-2.xml
# --- Chrome first-run / chooser handling ---
for label in "Use without an account" "No thanks" "Skip"; do
  XY=$(tapfind emu/ui-CHAR-2.xml "$label")
  if [ -n "$XY" ]; then say "tap chrome first-run '$label' at $XY"; tapxy $XY; sleep 5; uidump emu/ui-CHAR-2.xml; break; fi
done
# --- fill the Onion ID login form (web content nodes) ---
FIELDS=$(editfields emu/ui-CHAR-2.xml)
N=$(echo "$FIELDS" | grep -c .)
say "edit fields found: $N"
if [ "$N" -ge 2 ]; then
  UXY=$(echo "$FIELDS" | sed -n '1p'); PXY=$(echo "$FIELDS" | sed -n '2p')
  tapxy $UXY; sleep 1; adb shell input text "$IDUSER"; sleep 1
  tapxy $PXY; sleep 1; adb shell input text "$IDPASS"; sleep 1
  shot shot-CHAR-3-filled.png
  uidump emu/ui-CHAR-3.xml
  XY=$(tapfind emu/ui-CHAR-3.xml "Sign in")
  if [ -z "$XY" ]; then XY=$(tapfind emu/ui-CHAR-3.xml "Log in"); fi
  if [ -n "$XY" ]; then say "tap login submit at $XY"; tapxy $XY; else say "submit not found — ENTER key"; adb shell input keyevent 66; fi
else
  say "login form fields NOT found in dump"
fi
sleep 10
say "focus after login: $(focuspkg)"
shot shot-CHAR-4-consent.png
uidump emu/ui-CHAR-4.xml
# --- consent page: continue/allow ---
for label in "Continue" "Allow" "Authorize" "Yes"; do
  XY=$(tapfind emu/ui-CHAR-4.xml "$label")
  if [ -n "$XY" ]; then say "tap consent '$label' at $XY"; tapxy $XY; break; fi
done
sleep 12
say "focus after consent: $(focuspkg)"
shot shot-CHAR-5-returned.png
uidump emu/ui-CHAR-5.xml
# --- if a link disambiguation dialog is showing, pick the app ---
XY=$(tapfind emu/ui-CHAR-5.xml "Onioncore Character")
if [ -n "$XY" ]; then say "tap app in chooser at $XY"; tapxy $XY; sleep 8; shot shot-CHAR-5b-after-chooser.png; fi
sleep 6
say "final focus: $(focuspkg) pid=$(adb shell pidof $PKG)"
shot shot-CHAR-6-final.png
adb shell logcat -d 2>/dev/null | grep -i "OnionCharacter" | grep -i "auth\|redeem\|app link\|Nav\|Page finished" | tail -30 > emu/logcat-CHAR.txt
say "logcat auth lines: $(grep -c . emu/logcat-CHAR.txt)"
grep -i "auth return" emu/logcat-CHAR.txt | head -3 | while read -r l; do say "LOG: $l"; done
adb emu kill 2>/dev/null
say "RUN_CHAR_DONE"
