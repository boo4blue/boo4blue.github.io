#!/bin/bash
# capture2.sh — Onion Core Ad #1 Round 1 REPAIR captures (Cloud PC lane).
# Modes: h1 | e1 | b1leak. Fixes vs capture1.sh:
#  - H1: grant location via the real dialog ("While using the app"), then
#    skip the Haven onboarding ("Skip - show everything"), open a card.
#  - E1: actually tap "Browse installed apps" (capture1 tapped the title),
#    open an installed app (Onion Browser preferred), Inspector, extract.
#  - B1: one bounded Leak Check attempt (menu scroll pass + settings pass).
#  - RECORDING: graceful stop (SIGINT to screenrecord + 3s settle) BEFORE
#    pull, then in-job verification (ffprobe if present, else mvhd parse).
SDK=$HOME/.cache/cloudpc-models/android-sdk
export ANDROID_HOME=$SDK ANDROID_SDK_ROOT=$SDK
export ANDROID_AVD_HOME=$HOME/emu-avd-home
export PATH=$SDK/platform-tools:$SDK/emulator:$PATH
mkdir -p emu/shots $ANDROID_AVD_HOME
REL=https://github.com/boo4blue/boo4blue.github.io/releases/download/emu-assets
MODE=$1
V=emu/shots/verdict-r2-$MODE.txt
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

cat > /tmp/firstrow.py <<'PYEOF'
import sys, re
data = open(sys.argv[1], encoding='utf-8', errors='replace').read()
skip = [s.strip().lower() for s in sys.argv[2].split(',') if s.strip()]
rows = []
for m in re.finditer(r'<node[^>]*>', data):
    tag = m.group(0)
    attrs = dict(re.findall(r'([\w-]+)="([^"]*)"', tag))
    t = attrs.get('text','').strip()
    if len(t) < 3:
        continue
    tl = t.lower()
    if any(s in tl for s in skip):
        continue
    b = re.findall(r'\d+', attrs.get('bounds',''))
    if len(b) != 4:
        continue
    x0,y0,x1,y1 = [int(v) for v in b]
    cy = (y0+y1)//2
    if cy < 280 or cy > 2150 or (y1-y0) > 500:
        continue
    rows.append((y0, x0, (x0+x1)//2, cy, t))
rows.sort()
if rows:
    print(rows[0][2], rows[0][3])
    print("ROW_TEXT=" + rows[0][4], file=sys.stderr)
    sys.exit(0)
sys.exit(1)
PYEOF

cat > /tmp/verifyvid.py <<'PYEOF'
import sys, struct
d = open(sys.argv[1], 'rb').read()
moov = b'moov' in d
dur = None
i = d.find(b'mvhd')
if i >= 0:
    try:
        ver = d[i+4]
        if ver == 0:
            ts, du = struct.unpack('>II', d[i+16:i+24])
        else:
            ts = struct.unpack('>I', d[i+24:i+28])[0]
            du = struct.unpack('>Q', d[i+28:i+36])[0]
        if ts:
            dur = round(du / ts, 2)
    except Exception as e:
        print("mvhd_parse_error=%s" % e)
print("moov=%d duration_s=%s bytes=%d" % (int(moov), dur, len(d)))
sys.exit(0 if moov else 1)
PYEOF

uidump() {
  adb shell uiautomator dump /sdcard/ui.xml > /dev/null 2>&1
  adb exec-out cat /sdcard/ui.xml > "$1" 2>/dev/null
  if [ ! -s "$1" ]; then sleep 2; adb shell uiautomator dump /sdcard/ui.xml > /dev/null 2>&1; adb exec-out cat /sdcard/ui.xml > "$1" 2>/dev/null; fi
}
findxy() { python3 /tmp/tapfind.py "$1" "$2" 2>/dev/null; }
tapfind() {
  local xy
  xy=$(findxy "$1" "$2")
  if [ -n "$xy" ]; then adb shell input tap $xy; say "tap[$2] -> $xy"; return 0; else say "tap[$2] NOT FOUND"; return 1; fi
}
has() { [ -n "$(findxy "$1" "$2")" ]; }
texts() { grep -oE 'text="[^"]+"' "$1" 2>/dev/null | grep -vE 'text=""' | head -40 | tr '\n' '|'; }
fetchapk() {
  curl -sL --retry 2 --max-time 300 -o "$3" "$REL/$1"
  local got=$(md5sum "$3" 2>/dev/null | cut -d' ' -f1)
  if [ "$got" = "$2" ]; then say "fetch_ok $1 md5=$got size=$(stat -c%s "$3")"; return 0; else say "FETCH_FAIL $1 got=$got want=$2"; return 1; fi
}
installapk() {
  adb install -r "$1" > emu/shots/install-r2-$3.txt 2>&1
  local n=$(adb shell pm list packages 2>/dev/null | grep -c "$2")
  say "install $3 pm_match=$n"
  [ "$n" != "0" ]
}
bootavd() {
  if [ ! -x $SDK/emulator/emulator ]; then say "FATAL emulator missing (setup did not run)"; exit 0; fi
  pkill -f qemu-system 2>/dev/null; sleep 2; adb kill-server 2>/dev/null; sleep 1
  echo no | $SDK/cmdline-tools/latest/bin/avdmanager create avd -n "$1" -k "system-images;android-34;google_apis;x86_64" -d pixel_6 --force > emu/shots/avd-r2-$MODE.log 2>&1
  nohup $SDK/emulator/emulator -avd "$1" -no-window -no-audio -no-boot-anim -gpu angle_indirect -feature -Vulkan -memory 2048 -accel on -no-snapshot > emu/shots/boot-r2-$MODE.log 2>&1 &
  timeout 150 adb wait-for-device
  local ok=0
  for i in $(seq 1 36); do
    local b=$(adb shell getprop sys.boot_completed 2>/dev/null | tr -d '\r')
    if [ "$b" = "1" ]; then ok=1; say "boot_completed=1 after ~$((i*5))s"; break; fi
    sleep 5
  done
  if [ "$ok" != "1" ]; then say "VERDICT=BOOT_FAIL"; tail -5 emu/shots/boot-r2-$MODE.log; exit 0; fi
  SZ=$(adb shell wm size | grep -o '[0-9]*x[0-9]*' | head -1); W=${SZ%x*}; H=${SZ#*x}
  say "screen=${W}x${H}"
}
recstart() { # $1 = device path
  adb shell rm -f "$1" > /dev/null 2>&1
  adb shell screenrecord --bit-rate 6000000 --time-limit 170 "$1" > /dev/null 2>&1 &
  sleep 1
  say "rec_start $1 pid=$(adb shell pidof screenrecord | tr -d '\r')"
}
recstop_pull() { # $1 = device path, $2 = dest
  local pid=$(adb shell pidof screenrecord 2>/dev/null | tr -d '\r')
  if [ -n "$pid" ]; then adb shell kill -2 $pid > /dev/null 2>&1; say "rec_stop SIGINT pid=$pid"; else adb shell pkill -INT screenrecord > /dev/null 2>&1; say "rec_stop pkill-INT (no pidof)"; fi
  sleep 3
  adb shell ls -l "$1" 2>/dev/null | tee -a $V
  adb pull "$1" "$2" > /dev/null 2>&1
  say "video_pulled $2 bytes=$(stat -c%s "$2" 2>/dev/null)"
  if command -v ffprobe > /dev/null 2>&1; then
    say "ffprobe: $(ffprobe -v error -show_entries format=duration -show_entries stream=codec_type,width,height -of csv "$2" 2>&1 | tr '\n' ' ')"
  else
    say "ffprobe: NOT_INSTALLED (mvhd fallback)"
  fi
  local vv=$(python3 /tmp/verifyvid.py "$2" 2>/dev/null)
  say "verify $2 $vv"
  if echo "$vv" | grep -q "moov=1"; then say "VIDEO_OK $2"; else say "VIDEO_BAD $2"; fi
}

# ============================== H1 HAVEN ==============================
if [ "$MODE" = "h1" ]; then
  PKG=com.onion.fwhaven
  bootavd caph2
  adb shell settings put secure location_mode 3 > /dev/null 2>&1
  adb emu geo fix -85.139351 41.079989 > /dev/null 2>&1
  say "geo_fix set (Fort Wayne) + location_mode=3"
  fetchapk cap-HavenFW.apk 2203a0b2b286cdac889ce5778e2fb5df /tmp/h2.apk || exit 0
  installapk /tmp/h2.apk $PKG h2 || { say "VERDICT=INSTALL_FAIL"; exit 0; }
  adb logcat -c

  haven_to_list() { # $1 = dump tag prefix; returns 0 when resource list reached
    adb shell monkey -p $PKG -c android.intent.category.LAUNCHER 1 > /dev/null 2>&1
    sleep 12
    adb shell input tap $(awk -v w=$W -v h=$H 'BEGIN{printf "%d %d", w*0.80, h*0.27}')
    sleep 2
    local i
    for i in 1 2 3 4 5 6; do
      uidump emu/shots/ui-$1-$i.xml
      say "h1_$1_step$i texts=$(texts emu/shots/ui-$1-$i.xml)"
      if has emu/shots/ui-$1-$i.xml "while using the app"; then
        tapfind emu/shots/ui-$1-$i.xml "while using the app"; sleep 3; continue
      fi
      if has emu/shots/ui-$1-$i.xml "skip"; then
        tapfind emu/shots/ui-$1-$i.xml "skip"; sleep 3; continue
      fi
      if has emu/shots/ui-$1-$i.xml "show everything"; then
        tapfind emu/shots/ui-$1-$i.xml "show everything"; sleep 3; continue
      fi
      if has emu/shots/ui-$1-$i.xml "welcome to haven"; then
        if has emu/shots/ui-$1-$i.xml "next"; then tapfind emu/shots/ui-$1-$i.xml "next"; sleep 3; continue; fi
        if has emu/shots/ui-$1-$i.xml "get started"; then tapfind emu/shots/ui-$1-$i.xml "get started"; sleep 3; continue; fi
        if has emu/shots/ui-$1-$i.xml "continue"; then tapfind emu/shots/ui-$1-$i.xml "continue"; sleep 3; continue; fi
        sleep 2; continue
      fi
      say "h1_$1 LIST_REACHED at step $i"
      return 0
    done
    uidump emu/shots/ui-$1-final.xml
    say "h1_$1_final texts=$(texts emu/shots/ui-$1-final.xml)"
    if has emu/shots/ui-$1-final.xml "welcome to haven"; then return 1; fi
    if has emu/shots/ui-$1-final.xml "while using the app"; then return 1; fi
    return 0
  }

  CARDNEEDLE=""
  haven_open_card() { # $1 = tag; uses learned CARDNEEDLE first when set
    local needles=""
    if [ -n "$CARDNEEDLE" ]; then needles="$CARDNEEDLE|"; fi
    needles="${needles}food pantry|pantry|shelter|mission|church|food bank|food|meals|health|housing|center|services|clothing|recovery"
    local IFS_BAK=$IFS; IFS='|'
    local n
    for n in $needles; do
      IFS=$IFS_BAK
      uidump emu/shots/ui-$1-pre.xml
      if has emu/shots/ui-$1-pre.xml "$n"; then
        tapfind emu/shots/ui-$1-pre.xml "$n"; sleep 5
        uidump emu/shots/ui-$1-card.xml
        say "h1_$1_card_via=$n texts=$(texts emu/shots/ui-$1-card.xml)"
        if has emu/shots/ui-$1-card.xml "directions" || has emu/shots/ui-$1-card.xml "hours" || has emu/shots/ui-$1-card.xml "call" || has emu/shots/ui-$1-card.xml "open now" || has emu/shots/ui-$1-card.xml "website" || has emu/shots/ui-$1-card.xml "get directions"; then
          CARDNEEDLE="$n"; say "h1_$1 CARD_OK via $n"; return 0
        fi
        adb shell input keyevent 4; sleep 2
      fi
      IFS='|'
    done
    IFS=$IFS_BAK
    # fraction fallbacks (mid-list cards)
    local fy
    for fy in 40 58; do
      adb shell input tap $((W/2)) $((H*fy/100)); sleep 5
      uidump emu/shots/ui-$1-card.xml
      say "h1_$1_card_via=fraction$fy texts=$(texts emu/shots/ui-$1-card.xml)"
      if has emu/shots/ui-$1-card.xml "directions" || has emu/shots/ui-$1-card.xml "hours" || has emu/shots/ui-$1-card.xml "call" || has emu/shots/ui-$1-card.xml "website"; then
        say "h1_$1 CARD_OK via fraction$fy"; return 0
      fi
      adb shell input keyevent 4; sleep 2
    done
    say "h1_$1 CARD_NOT_CONFIRMED"
    return 1
  }

  # ---- explore pass ----
  if haven_to_list h2x; then say "EXPLORE_LIST_OK"; else say "EXPLORE_LIST_FAIL"; fi
  adb exec-out screencap -p > emu/shots/H1-explore2-list.png
  adb shell input swipe $((W/2)) $((H*70/100)) $((W/2)) $((H*45/100)) 400; sleep 2
  uidump emu/shots/ui-h2x-scrolled.xml
  say "h1_scrolled texts=$(texts emu/shots/ui-h2x-scrolled.xml)"
  if haven_open_card h2x; then say "EXPLORE_CARD_OK needle=$CARDNEEDLE"; else say "EXPLORE_CARD_FAIL"; fi
  adb exec-out screencap -p > emu/shots/H1-explore2-card.png
  say "haven_pid=$(adb shell pidof $PKG | tr -d '\r')"
  adb shell am force-stop $PKG; sleep 2

  # ---- recorded pass ----
  recstart /sdcard/H1.mp4
  if haven_to_list h2r; then say "REC_LIST_OK"; else say "REC_LIST_FAIL"; fi
  sleep 2
  adb shell input swipe $((W/2)) $((H*70/100)) $((W/2)) $((H*45/100)) 400; sleep 2
  adb exec-out screencap -p > emu/shots/H1-list.png
  if haven_open_card h2r; then say "REC_CARD_OK needle=$CARDNEEDLE"; else say "REC_CARD_FAIL"; fi
  sleep 3
  adb exec-out screencap -p > emu/shots/H1-card.png
  sleep 4
  recstop_pull /sdcard/H1.mp4 emu/shots/H1.mp4
  say "haven_pid_end=$(adb shell pidof $PKG | tr -d '\r')"
  adb logcat -d > emu/shots/logcat-r2-h1.txt 2>&1
  say "fatal_h1=$(grep -c 'FATAL EXCEPTION' emu/shots/logcat-r2-h1.txt)"
  adb emu kill 2>/dev/null
  say "H1_REPAIR_DONE"
fi

# ============================== E1 APK EDITOR ==============================
if [ "$MODE" = "e1" ]; then
  PKG=com.onion.apkeditor
  bootavd cape2
  fetchapk cap-OnionAPKEditor.apk 4f1f19422e171adabc45248c1720ca75 /tmp/e2.apk || exit 0
  fetchapk cap-OnionBrowser.apk 897528dc0f65cb16221c9b906483ddb5 /tmp/e2b.apk || say "BROWSER_FETCH_FAIL (list will lack Onion Browser)"
  installapk /tmp/e2.apk $PKG e2 || { say "VERDICT=INSTALL_FAIL"; exit 0; }
  if [ -s /tmp/e2b.apk ]; then installapk /tmp/e2b.apk com.onion.browser e2b || say "BROWSER_INSTALL_FAIL"; fi
  adb logcat -c

  APPNEEDLE=""
  e1_open_app() { # $1 = tag; Library -> Browse installed apps -> open one app
    uidump emu/shots/ui-$1-lib.xml
    say "e1_$1_lib texts=$(texts emu/shots/ui-$1-lib.xml)"
    if ! tapfind emu/shots/ui-$1-lib.xml "browse installed apps"; then say "e1_$1 BROWSE_NOT_FOUND"; return 1; fi
    sleep 5
    uidump emu/shots/ui-$1-apps.xml
    say "e1_$1_apps texts=$(texts emu/shots/ui-$1-apps.xml)"
    adb exec-out screencap -p > emu/shots/E1-stage-app.png
    local needles="onion browser|browser|haven|onion"
    if [ -n "$APPNEEDLE" ]; then needles="$APPNEEDLE|$needles"; fi
    local IFS_BAK=$IFS; IFS='|'; local n
    for n in $needles; do
      IFS=$IFS_BAK
      if has emu/shots/ui-$1-apps.xml "$n"; then
        tapfind emu/shots/ui-$1-apps.xml "$n"; sleep 5
        uidump emu/shots/ui-$1-insp.xml
        say "e1_$1_insp_via=$n texts=$(texts emu/shots/ui-$1-insp.xml)"
        APPNEEDLE="$n"; return 0
      fi
      IFS='|'
    done
    IFS=$IFS_BAK
    local row=$(python3 /tmp/firstrow.py emu/shots/ui-$1-apps.xml "installed apps,search,library,projects,installer,settings,onion apk editor" 2>emu/shots/firstrow-$1.txt)
    say "e1_$1_firstrow=$(cat emu/shots/firstrow-$1.txt) xy=$row"
    if [ -n "$row" ]; then
      adb shell input tap $row; sleep 5
      uidump emu/shots/ui-$1-insp.xml
      say "e1_$1_insp_via=firstrow texts=$(texts emu/shots/ui-$1-insp.xml)"
      return 0
    fi
    say "e1_$1 NO_APP_ROW_FOUND"
    return 1
  }

  e1_deeper() { # $1 = tag; from inspector: contents/code view, then extract/export
    uidump emu/shots/ui-$1-insp2.xml
    local needles="contents|code|manifest|resources|files|inspector|permissions|activities|signatures|details"
    local IFS_BAK=$IFS; IFS='|'; local n; local hit=0
    for n in $needles; do
      IFS=$IFS_BAK
      if has emu/shots/ui-$1-insp2.xml "$n"; then
        # do not tap the screen title / current tab label if it is the header:
        tapfind emu/shots/ui-$1-insp2.xml "$n"; sleep 4; hit=1
        say "e1_$1_deep_via=$n"
        break
      fi
      IFS='|'
    done
    IFS=$IFS_BAK
    [ "$hit" = "0" ] && say "e1_$1 NO_DEEP_TAB_FOUND"
    adb shell input swipe $((W/2)) $((H*70/100)) $((W/2)) $((H*40/100)) 300; sleep 2
    uidump emu/shots/ui-$1-deep.xml
    say "e1_$1_deep texts=$(texts emu/shots/ui-$1-deep.xml)"
    local xneedles="extract|export|pull|save|share"
    IFS='|'; local xn; local xhit=0
    for xn in $xneedles; do
      IFS=$IFS_BAK
      if has emu/shots/ui-$1-deep.xml "$xn"; then tapfind emu/shots/ui-$1-deep.xml "$xn"; sleep 4; xhit=1; say "e1_$1_extract_via=$xn"; break; fi
      if has emu/shots/ui-$1-insp2.xml "$xn"; then tapfind emu/shots/ui-$1-insp2.xml "$xn"; sleep 4; xhit=1; say "e1_$1_extract_via_insp=$xn"; break; fi
      IFS='|'
    done
    IFS=$IFS_BAK
    [ "$xhit" = "0" ] && say "e1_$1 EXTRACT_NOT_FOUND"
    uidump emu/shots/ui-$1-extract.xml
    say "e1_$1_extract texts=$(texts emu/shots/ui-$1-extract.xml)"
  }

  # ---- explore pass ----
  adb shell monkey -p $PKG -c android.intent.category.LAUNCHER 1 > /dev/null 2>&1
  sleep 9
  adb shell input tap $(awk -v w=$W -v h=$H 'BEGIN{printf "%d %d", w*0.80, h*0.27}')
  sleep 1
  adb exec-out screencap -p > emu/shots/E1-stage-lib.png
  if e1_open_app e2x; then say "EXPLORE_APP_OK needle=$APPNEEDLE"; else say "EXPLORE_APP_FAIL"; fi
  adb exec-out screencap -p > emu/shots/E1-stage-insp.png
  e1_deeper e2x
  adb exec-out screencap -p > emu/shots/E1-stage-extract.png
  say "editor_pid=$(adb shell pidof $PKG | tr -d '\r')"
  adb shell am force-stop $PKG; sleep 2

  # ---- recorded pass ----
  adb shell monkey -p $PKG -c android.intent.category.LAUNCHER 1 > /dev/null 2>&1
  sleep 8
  recstart /sdcard/E1.mp4
  sleep 2
  if e1_open_app e2r; then say "REC_APP_OK needle=$APPNEEDLE"; else say "REC_APP_FAIL"; fi
  adb exec-out screencap -p > emu/shots/E1-stage-insp.png
  e1_deeper e2r
  adb exec-out screencap -p > emu/shots/E1-stage-extract.png
  sleep 4
  recstop_pull /sdcard/E1.mp4 emu/shots/E1.mp4
  say "editor_pid_end=$(adb shell pidof $PKG | tr -d '\r')"
  adb logcat -d > emu/shots/logcat-r2-e1.txt 2>&1
  say "fatal_e1=$(grep -c 'FATAL EXCEPTION' emu/shots/logcat-r2-e1.txt)"
  adb emu kill 2>/dev/null
  say "E1_REPAIR_DONE"
fi

# ============================== B1 LEAK CHECK (bounded) ==============================
if [ "$MODE" = "b1leak" ]; then
  PKG=com.onion.browser
  bootavd capb2
  fetchapk cap-OnionBrowser.apk 897528dc0f65cb16221c9b906483ddb5 /tmp/b2.apk || exit 0
  installapk /tmp/b2.apk $PKG b2 || { say "VERDICT=INSTALL_FAIL"; exit 0; }
  adb logcat -c

  MENUXY=""; MENU_SWIPES=0; SET_SWIPES=0; LEAK_VIA=""
  b1_open_menu() { # $1 = tag; leaves menu open, sets MENUXY
    uidump emu/shots/ui-$1-home.xml
    say "b1_$1_home texts=$(texts emu/shots/ui-$1-home.xml)"
    MENUXY=$(findxy emu/shots/ui-$1-home.xml "btn_menu")
    if [ -z "$MENUXY" ]; then MENUXY=$(findxy emu/shots/ui-$1-home.xml "menu"); fi
    if [ -z "$MENUXY" ]; then MENUXY="$((W*94/100)) $((H*94/100))"; fi
    say "b1_$1 menu_xy=$MENUXY"
    adb shell input tap $MENUXY; sleep 2
  }
  b1_menu_pass() { # $1 = tag; bounded: initial dump + up to 4 scrolls.
    # Sets LEAK_VIA=direct (+taps leak) or =settings (leaves menu open on it), else empty.
    LEAK_VIA=""; MENU_SWIPES=0
    local i
    for i in 0 1 2 3 4; do
      uidump emu/shots/ui-$1-menu$i.xml
      say "b1_$1_menu$i texts=$(texts emu/shots/ui-$1-menu$i.xml)"
      if has emu/shots/ui-$1-menu$i.xml "leak"; then
        say "b1_$1 LEAK_IN_MENU swipes=$i"
        MENU_SWIPES=$i; LEAK_VIA="direct"
        tapfind emu/shots/ui-$1-menu$i.xml "leak"; sleep 5
        return 0
      fi
      if has emu/shots/ui-$1-menu$i.xml "settings"; then
        say "b1_$1 SETTINGS_IN_MENU swipes=$i"
        MENU_SWIPES=$i; LEAK_VIA="settings"
        return 0
      fi
      if [ "$i" != "4" ]; then adb shell input swipe $((W/2)) $((H*78/100)) $((W/2)) $((H*35/100)) 300; sleep 2; fi
    done
    say "b1_$1 MENU_PASS_EXHAUSTED (no Settings, no Leak Check)"
    return 1
  }
  b1_settings_pass() { # $1 = tag; menu is open with Settings visible in last menu dump ($2)
    tapfind "$2" "settings"; sleep 4
    SET_SWIPES=0
    local i
    for i in 0 1 2 3; do
      uidump emu/shots/ui-$1-set$i.xml
      say "b1_$1_set$i texts=$(texts emu/shots/ui-$1-set$i.xml)"
      if has emu/shots/ui-$1-set$i.xml "leak"; then
        say "b1_$1 LEAK_IN_SETTINGS swipes=$i"
        SET_SWIPES=$i
        tapfind emu/shots/ui-$1-set$i.xml "leak"; sleep 5
        return 0
      fi
      if [ "$i" != "3" ]; then adb shell input swipe $((W/2)) $((H*75/100)) $((W/2)) $((H*35/100)) 300; sleep 2; fi
    done
    say "b1_$1 SETTINGS_PASS_EXHAUSTED (no Leak Check)"
    return 1
  }

  # ---- explore pass ----
  adb shell monkey -p $PKG -c android.intent.category.LAUNCHER 1 > /dev/null 2>&1
  sleep 12
  adb shell input tap $(awk -v w=$W -v h=$H 'BEGIN{printf "%d %d", w*0.80, h*0.27}')
  sleep 2
  say "browser_pid=$(adb shell pidof $PKG | tr -d '\r')"
  FOUND=0
  b1_open_menu b2x
  if b1_menu_pass b2x; then
    if [ "$LEAK_VIA" = "settings" ]; then
      if b1_settings_pass b2x emu/shots/ui-b2x-menu$MENU_SWIPES.xml; then FOUND=1; fi
    else
      FOUND=1
    fi
  fi
  if [ "$FOUND" = "1" ]; then
    uidump emu/shots/ui-b2x-leak.xml
    say "b1_leak_screen texts=$(texts emu/shots/ui-b2x-leak.xml)"
    adb exec-out screencap -p > emu/shots/B1-leak-explore.png
    say "EXPLORE_LEAK_OK via=$LEAK_VIA menu_swipes=$MENU_SWIPES set_swipes=$SET_SWIPES"
  else
    say "EXPLORE_LEAK_NOT_REACHABLE (bounded attempt exhausted)"
    say "VERDICT=LEAK_NOT_REACHABLE"
    adb logcat -d > emu/shots/logcat-r2-b1.txt 2>&1
    adb emu kill 2>/dev/null
    say "B1LEAK_DONE"
    exit 0
  fi
  adb shell am force-stop $PKG; sleep 2

  # ---- recorded pass (replay learned swipe counts) ----
  adb shell monkey -p $PKG -c android.intent.category.LAUNCHER 1 > /dev/null 2>&1
  sleep 11
  adb shell input tap $(awk -v w=$W -v h=$H 'BEGIN{printf "%d %d", w*0.80, h*0.27}')
  sleep 1
  recstart /sdcard/B1L.mp4
  sleep 1
  b1_open_menu b2r
  local_ok=0
  if [ "$LEAK_VIA" = "direct" ]; then
    i=0; while [ $i -lt $MENU_SWIPES ]; do adb shell input swipe $((W/2)) $((H*78/100)) $((W/2)) $((H*35/100)) 300; sleep 1; i=$((i+1)); done
    uidump emu/shots/ui-b2r-menu.xml
    if tapfind emu/shots/ui-b2r-menu.xml "leak"; then local_ok=1; fi
    sleep 5
  else
    i=0; while [ $i -lt $MENU_SWIPES ]; do adb shell input swipe $((W/2)) $((H*78/100)) $((W/2)) $((H*35/100)) 300; sleep 1; i=$((i+1)); done
    uidump emu/shots/ui-b2r-menu.xml
    if tapfind emu/shots/ui-b2r-menu.xml "settings"; then
      sleep 4
      i=0; while [ $i -lt $SET_SWIPES ]; do adb shell input swipe $((W/2)) $((H*75/100)) $((W/2)) $((H*35/100)) 300; sleep 1; i=$((i+1)); done
      uidump emu/shots/ui-b2r-set.xml
      if tapfind emu/shots/ui-b2r-set.xml "leak"; then local_ok=1; fi
      sleep 5
    fi
  fi
  say "b1_rec_leak_reached=$local_ok"
  uidump emu/shots/ui-b2r-leak.xml
  say "b1_rec_leak texts=$(texts emu/shots/ui-b2r-leak.xml)"
  adb exec-out screencap -p > emu/shots/B1-leak.png
  sleep 4
  recstop_pull /sdcard/B1L.mp4 emu/shots/B1-leak.mp4
  say "browser_pid_end=$(adb shell pidof $PKG | tr -d '\r')"
  adb logcat -d > emu/shots/logcat-r2-b1.txt 2>&1
  say "fatal_b1=$(grep -c 'FATAL EXCEPTION' emu/shots/logcat-r2-b1.txt)"
  adb emu kill 2>/dev/null
  say "B1LEAK_DONE"
fi
