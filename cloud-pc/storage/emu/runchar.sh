#!/bin/bash
# runchar2.sh — Onioncore Character v1.1 sign-in round trip, attempt 4.
# Attempt 1 proved the app side (client=app pinned, authorize handed to
# the browser with the app-callback) but died inside Chrome's first-run
# gauntlet (account page -> notifications page -> system permission
# dialog). This attempt shepherds Chrome through every first-run stage
# with a dump-driven loop before filling the Onion ID login form.
SDK=$HOME/.cache/cloudpc-models/android-sdk
export ANDROID_HOME=$SDK ANDROID_SDK_ROOT=$SDK
export ANDROID_AVD_HOME=$HOME/emu-avd-home
export PATH=$SDK/platform-tools:$SDK/emulator:$PATH
mkdir -p emu $ANDROID_AVD_HOME
PKG=com.onioncore.character
V=emu/verdict-CHAR4.txt
IDUSER=appflowtest3
IDPASS=appflow99xq
say() { echo "$1" | tee -a $V; }
shot() { adb exec-out screencap -p > "emu/$1" 2>/dev/null; say "shot $1 bytes=$(stat -c%s emu/$1 2>/dev/null)"; }
uidump() {
  adb shell uiautomator dump /sdcard/ui.xml > /dev/null 2>&1
  adb exec-out cat /sdcard/ui.xml > "$1" 2>/dev/null
  if [ ! -s "$1" ]; then sleep 2; adb shell uiautomator dump /sdcard/ui.xml > /dev/null 2>&1; adb exec-out cat /sdcard/ui.xml > "$1" 2>/dev/null; fi
}
tapfind() {
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
tapbutton() {
  python3 - "$1" "$2" << 'PYEOF2'
import re, sys
try: xml = open(sys.argv[1], encoding='utf-8', errors='replace').read()
except Exception: sys.exit(0)
needle = sys.argv[2]
nodes = re.findall(r'<node[^>]*>', xml)
def center(tag):
    b = re.search(r'bounds="\[(\d+),(\d+)\]\[(\d+),(\d+)\]"', tag)
    if not b: return None
    x1, y1, x2, y2 = map(int, b.groups())
    return ((x1 + x2) // 2, (y1 + y2) // 2)
# pass 1: a real Button whose text contains the needle
for tag in nodes:
    if 'android.widget.Button' in tag and needle in tag:
        c = center(tag)
        if c: print(c[0], c[1]); sys.exit(0)
# pass 2: any node whose text equals the needle exactly
for tag in nodes:
    m = re.search(r'text="([^"]*)"', tag)
    if m and m.group(1) == needle:
        c = center(tag)
        if c: print(c[0], c[1]); sys.exit(0)
PYEOF2
}
editfields() {
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
dumptext() { grep -o 'text="[^"]*"' "$1" 2>/dev/null | head -30 | tr '\n' ' '; }

: > $V
say "=== character v1.1 sign-in round trip, attempt 4, $(date -u +%H:%M:%S)Z"
if [ ! -x $SDK/emulator/emulator ]; then say "FATAL=no emulator (setup missing)"; exit 0; fi
pkill -f qemu-system 2>/dev/null; sleep 2; adb kill-server 2>/dev/null; sleep 1
base64 -d emu/character.apk.b64 > /tmp/char.apk 2>/dev/null
say "apk bytes=$(stat -c%s /tmp/char.apk)"
echo no | $SDK/cmdline-tools/latest/bin/avdmanager create avd -n charemu -k "system-images;android-34;google_apis;x86_64" -d pixel_6 --force > emu/avd-CHAR4.log 2>&1
nohup $SDK/emulator/emulator -avd charemu -no-window -no-audio -no-boot-anim -gpu angle_indirect -feature -Vulkan -memory 2048 -accel on -no-snapshot > emu/boot-CHAR4.log 2>&1 &
timeout 150 adb wait-for-device
ok=0
for i in $(seq 1 40); do
  b=$(adb shell getprop sys.boot_completed 2>/dev/null | tr -d '\r')
  if [ "$b" = "1" ]; then ok=1; say "boot_completed=1 after ~$((i*5))s"; break; fi
  sleep 5
done
if [ "$ok" != "1" ]; then say "VERDICT=BOOT_FAIL"; exit 0; fi
SZ=$(adb shell wm size | grep -o '[0-9]*x[0-9]*' | head -1); W=${SZ%x*}; H=${SZ#*x}; say "screen=${W}x${H}"
adb install -r /tmp/char.apk > emu/install-CHAR4.log 2>&1
say "install: $(grep -o 'Success\|Failure' emu/install-CHAR4.log | head -1)"
adb logcat -c
adb shell monkey -p $PKG -c android.intent.category.LAUNCHER 1 > /dev/null 2>&1
sleep 14
adb shell input tap $((W*80/100)) $((H*27/100))
sleep 10
# ---- connectivity pre-flight: emulator NAT sometimes comes up dead
# (attempt 2: ERR_INTERNET_DISCONNECTED on a fresh runner). Reload the
# app until the real home page (with its sign-in button) is on screen.
say "ping: $(adb shell ping -c 1 -W 3 8.8.8.8 2>/dev/null | tail -1)"
for r in 1 2 3 4; do
  uidump emu/ui-CHAR4-1.xml
  if grep -q "Onion ID" emu/ui-CHAR4-1.xml; then say "home page loaded (round $r)"; break; fi
  say "home not loaded (round $r) — texts: $(dumptext emu/ui-CHAR4-1.xml | head -c 200)"
  adb shell cmd connectivity airplane-mode disable > /dev/null 2>&1
  adb shell svc wifi enable > /dev/null 2>&1; adb shell svc data enable > /dev/null 2>&1
  adb shell am force-stop $PKG; sleep 2
  adb shell monkey -p $PKG -c android.intent.category.LAUNCHER 1 > /dev/null 2>&1
  sleep 12
  adb shell input tap $((W*80/100)) $((H*27/100)); sleep 8
done
shot shot-CHAR4-1-home.png
uidump emu/ui-CHAR4-1.xml
XY=$(tapfind emu/ui-CHAR4-1.xml "Onion ID")
if [ -z "$XY" ]; then XY=$(tapfind emu/ui-CHAR4-1.xml "Sign in"); fi
if [ -n "$XY" ]; then say "tap sign-in at $XY"; tapxy $XY; else say "sign-in not in dump — fraction tap"; adb shell input tap $((W/2)) $((H*60/100)); fi
sleep 8
AUTHURL=$(adb logcat -d 2>/dev/null | grep -o 'https://onion-id[^ ]*authorize[^ ]*' | head -1)
say "authorize url captured: ${AUTHURL:0:60}..."
# ---- shepherd Chrome through first-run until the ID login form shows ----
STAGE=0
for i in $(seq 1 22); do
  uidump emu/ui-CHAR4-loop.xml
  N=$(editfields emu/ui-CHAR4-loop.xml | grep -c .)
  if [ "$N" -ge 2 ]; then say "login form visible at loop $i"; STAGE=1; break; fi
  if grep -q "Continue as" emu/ui-CHAR4-loop.xml; then say "already at consent (session persisted) loop $i"; STAGE=2; break; fi
  DID=""
  for label in "Don’t allow" "Don't allow" "Use without an account" "No thanks" "Skip" "Not now"; do
    XY=$(tapfind emu/ui-CHAR4-loop.xml "$label")
    if [ -n "$XY" ]; then say "loop $i: tap '$label' at $XY"; tapxy $XY; DID=1; sleep 4; break; fi
  done
  if [ -z "$DID" ] && grep -q "Chrome notifications" emu/ui-CHAR4-loop.xml; then
    XY=$(tapfind emu/ui-CHAR4-loop.xml "Continue")
    if [ -n "$XY" ]; then say "loop $i: tap notifications-page Continue at $XY"; tapxy $XY; DID=1; sleep 4; fi
  fi
  if [ -z "$DID" ]; then
    # nothing actionable: maybe a new-tab page swallowed the intent — refire it once, mid-loop
    if [ "$i" = "10" ] && [ -n "$AUTHURL" ]; then
      say "loop 10: refiring authorize url in browser"
      adb shell am start -a android.intent.action.VIEW -d "$AUTHURL" > /dev/null 2>&1
    fi
    sleep 4
  fi
done
say "shepherd done, stage=$STAGE"
shot shot-CHAR4-2-login.png
uidump emu/ui-CHAR4-2.xml
say "login page texts: $(dumptext emu/ui-CHAR4-2.xml)"
# ---- fill + submit ----
if [ "$STAGE" = "1" ]; then
  FIELDS=$(editfields emu/ui-CHAR4-2.xml)
  UXY=$(echo "$FIELDS" | sed -n '1p'); PXY=$(echo "$FIELDS" | sed -n '2p')
  tapxy $UXY; sleep 1; adb shell input text "$IDUSER"; sleep 1
  tapxy $PXY; sleep 1; adb shell input text "$IDPASS"; sleep 1
  shot shot-CHAR4-3-filled.png
  uidump emu/ui-CHAR4-3.xml
  XY=$(tapbutton emu/ui-CHAR4-3.xml "Sign in")
  if [ -n "$XY" ]; then say "tap login BUTTON at $XY"; tapxy $XY; else say "button not found — ENTER in password field"; tapxy $PXY; adb shell input keyevent 66; fi
  sleep 8
  uidump emu/ui-CHAR4-3b.xml
  if ! grep -q "Continue as" emu/ui-CHAR4-3b.xml && grep -q "Username or member code" emu/ui-CHAR4-3b.xml; then
    say "still on login page after button tap — ENTER retry in password field"
    tapxy $PXY; sleep 1; adb shell input keyevent 66; sleep 8
  fi
fi
# ---- consent ----
uidump emu/ui-CHAR4-4.xml
shot shot-CHAR4-4-consent.png
say "consent page texts: $(dumptext emu/ui-CHAR4-4.xml)"
XY=$(tapfind emu/ui-CHAR4-4.xml "Continue as")
if [ -n "$XY" ]; then say "tap consent 'Continue as' at $XY"; tapxy $XY; else say "consent button NOT found"; fi
sleep 12
uidump emu/ui-CHAR4-5.xml
shot shot-CHAR4-5-returned.png
say "returned page texts: $(dumptext emu/ui-CHAR4-5.xml)"
XY=$(tapfind emu/ui-CHAR4-5.xml "Onioncore Character")
if [ -n "$XY" ]; then say "tap app in chooser at $XY"; tapxy $XY; sleep 8; shot shot-CHAR4-5b-after-chooser.png; fi
sleep 6
say "final pid=$(adb shell pidof $PKG)"
shot shot-CHAR4-6-final.png
uidump emu/ui-CHAR4-6.xml
say "final page texts: $(dumptext emu/ui-CHAR4-6.xml)"
adb shell logcat -d 2>/dev/null | grep -i "OnionCharacter" | tail -40 > emu/logcat-CHAR4.txt
say "auth-return log lines: $(grep -ci 'auth return' emu/logcat-CHAR4.txt)"
grep -i "auth return" emu/logcat-CHAR4.txt | head -2 | while read -r l; do say "LOG: $l"; done
adb emu kill 2>/dev/null
say "RUN_CHAR4_DONE"
