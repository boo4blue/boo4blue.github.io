#!/bin/bash
# capture5.sh — Ad #1 Round 1 repair, iteration 5 (Cloud PC lane). Modes: h1 | e1.
# From cap4 harvest (both videos valid; E1 inspector+code+extract all reached
# in explore; H1 Places list reached with inline-expanded cards):
#  - H1: card-open attempts A (card title tap) / B (chevron) / C (Directions),
#    screenshot after each (H1-cardA/B/C) for an eyeball pick.
#  - E1: Extract tab is tapped from the Overview dump FIRST (unambiguous
#    coords), then Code tab, then a class — so stage-extract is the real
#    Extract screen this time.
# Recording: graceful SIGINT stop + settle + in-job verify (as cap2-cap4).
export ANDROID_HOME=$SDK ANDROID_SDK_ROOT=$SDK
export ANDROID_AVD_HOME=$HOME/emu-avd-home
export PATH=$SDK/platform-tools:$SDK/emulator:$PATH
mkdir -p emu/shots $ANDROID_AVD_HOME
REL=https://github.com/boo4blue/boo4blue.github.io/releases/download/emu-assets
MODE=$1
V=emu/shots/verdict-r5-$MODE.txt
: > $V
say() { echo "$1" | tee -a $V; }

cat > /tmp/tapfind2.py <<'PYEOF'
import sys, re
data = open(sys.argv[1], encoding='utf-8', errors='replace').read()
needle = sys.argv[2].lower()
miny = int(sys.argv[3]) if len(sys.argv) > 3 else 0
maxh = int(sys.argv[4]) if len(sys.argv) > 4 else 0
maxy = int(sys.argv[5]) if len(sys.argv) > 5 else 0
for m in re.finditer(r'<node[^>]*>', data):
    tag = m.group(0)
    attrs = dict(re.findall(r'([\w-]+)="([^"]*)"', tag))
    hay = ' '.join([attrs.get('text',''), attrs.get('content-desc',''), attrs.get('resource-id','')]).lower()
    if needle not in hay:
        continue
    b = re.findall(r'\d+', attrs.get('bounds',''))
    if len(b) != 4:
        continue
    x0,y0,x1,y1 = [int(v) for v in b]
    if x1 == 0 and y1 == 0:
        continue
    cy = (y0+y1)//2
    if cy < miny:
        continue
    if maxy and cy > maxy:
        continue
    if maxh and (y1-y0) > maxh:
        continue
    print((x0+x1)//2, cy)
    sys.exit(0)
sys.exit(1)
PYEOF

cat > /tmp/tabpick.py <<'PYEOF'
import sys, re
data = open(sys.argv[1], encoding='utf-8', errors='replace').read()
xmin,xmax,ymin,ymax = [int(v) for v in sys.argv[2:6]]
for m in re.finditer(r'<node[^>]*>', data):
    tag = m.group(0)
    attrs = dict(re.findall(r'([\w-]+)="([^"]*)"', tag))
    if attrs.get('clickable') != 'true':
        continue
    b = re.findall(r'\d+', attrs.get('bounds',''))
    if len(b) != 4:
        continue
    x0,y0,x1,y1 = [int(v) for v in b]
    cx, cy = (x0+x1)//2, (y0+y1)//2
    if xmin <= cx <= xmax and ymin <= cy <= ymax:
        print(cx, cy)
        sys.exit(0)
sys.exit(1)
PYEOF

cat > /tmp/rowpick.py <<'PYEOF'
import sys, re
data = open(sys.argv[1], encoding='utf-8', errors='replace').read()
skip = [s.strip().lower() for s in sys.argv[2].split(',') if s.strip()]
rows = []
for m in re.finditer(r'<node[^>]*>', data):
    tag = m.group(0)
    attrs = dict(re.findall(r'([\w-]+)="([^"]*)"', tag))
    t = attrs.get('text','').strip()
    if len(t) < 4:
        continue
    tl = t.lower()
    if any(s in tl for s in skip):
        continue
    b = re.findall(r'\d+', attrs.get('bounds',''))
    if len(b) != 4:
        continue
    x0,y0,x1,y1 = [int(v) for v in b]
    if x1 == 0 and y1 == 0:
        continue
    cy = (y0+y1)//2
    if cy < 420 or cy > 2050 or (y1-y0) > 240:
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
  local try
  for try in 1 2 3 4; do
    adb shell uiautomator dump /sdcard/ui.xml > /dev/null 2>&1
    adb exec-out cat /sdcard/ui.xml > "$1" 2>/dev/null
    local sz=$(stat -c%s "$1" 2>/dev/null || echo 0)
    if [ "$sz" -gt 1500 ]; then return 0; fi
    sleep 3
  done
  say "uidump WEAK size=$sz file=$1"
}
findxy() { python3 /tmp/tapfind2.py "$1" "$2" "${3:-0}" "${4:-0}" "${5:-0}" 2>/dev/null; }
tapfind() {
  local xy
  xy=$(findxy "$1" "$2" "${3:-0}" "${4:-0}" "${5:-0}")
  if [ -n "$xy" ]; then adb shell input tap $xy; say "tap[$2] -> $xy"; return 0; else say "tap[$2] NOT FOUND"; return 1; fi
}
has() { [ -n "$(findxy "$1" "$2" "${3:-0}" "${4:-0}" "${5:-0}")" ]; }
texts() { grep -oE 'text="[^"]+"' "$1" 2>/dev/null | grep -vE 'text=""' | head -40 | tr '\n' '|'; }
fetchapk() {
  curl -sL --retry 2 --max-time 300 -o "$3" "$REL/$1"
  local got=$(md5sum "$3" 2>/dev/null | cut -d' ' -f1)
  if [ "$got" = "$2" ]; then say "fetch_ok $1 md5=$got size=$(stat -c%s "$3")"; return 0; else say "FETCH_FAIL $1 got=$got want=$2"; return 1; fi
}
installapk() {
  adb install -r "$1" > emu/shots/install-r5-$3.txt 2>&1
  local n=$(adb shell pm list packages 2>/dev/null | grep -c "$2")
  say "install $3 pm_match=$n"
  [ "$n" != "0" ]
}
bootavd() {
  if [ ! -x $SDK/emulator/emulator ]; then say "FATAL emulator missing (setup did not run)"; exit 0; fi
  pkill -f qemu-system 2>/dev/null; sleep 2; adb kill-server 2>/dev/null; sleep 1
  echo no | $SDK/cmdline-tools/latest/bin/avdmanager create avd -n "$1" -k "system-images;android-34;google_apis;x86_64" -d pixel_6 --force > emu/shots/avd-r5-$MODE.log 2>&1
  nohup $SDK/emulator/emulator -avd "$1" -no-window -no-audio -no-boot-anim -gpu angle_indirect -feature -Vulkan -memory 2048 -accel on -no-snapshot > emu/shots/boot-r5-$MODE.log 2>&1 &
  timeout 150 adb wait-for-device
  local ok=0
  for i in $(seq 1 36); do
    local b=$(adb shell getprop sys.boot_completed 2>/dev/null | tr -d '\r')
    if [ "$b" = "1" ]; then ok=1; say "boot_completed=1 after ~$((i*5))s"; break; fi
    sleep 5
  done
  if [ "$ok" != "1" ]; then say "VERDICT=BOOT_FAIL"; tail -5 emu/shots/boot-r5-$MODE.log; exit 0; fi
  SZ=$(adb shell wm size | grep -o '[0-9]*x[0-9]*' | head -1); W=${SZ%x*}; H=${SZ#*x}
  say "screen=${W}x${H}"
}
recstart() {
  adb shell rm -f "$1" > /dev/null 2>&1
  adb shell screenrecord --bit-rate 6000000 --time-limit 170 "$1" > /dev/null 2>&1 &
  sleep 1
  say "rec_start $1 pid=$(adb shell pidof screenrecord | tr -d '\r')"
}
recstop_pull() {
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

# ============================== H1 HAVEN v4 ==============================
if [ "$MODE" = "h1" ]; then
  PKG=com.onion.fwhaven
  bootavd caph5
  adb shell settings put secure location_mode 3 > /dev/null 2>&1
  adb emu geo fix -85.139351 41.079989 > /dev/null 2>&1
  fetchapk cap-HavenFW.apk 2203a0b2b286cdac889ce5778e2fb5df /tmp/h5.apk || exit 0
  installapk /tmp/h5.apk $PKG h5 || { say "VERDICT=INSTALL_FAIL"; exit 0; }
  adb logcat -c

  haven_past_onboarding() { # $1 = tag
    adb shell monkey -p $PKG -c android.intent.category.LAUNCHER 1 > /dev/null 2>&1
    sleep 12
    adb shell input tap $(awk -v w=$W -v h=$H 'BEGIN{printf "%d %d", w*0.80, h*0.27}')
    sleep 2
    local i
    for i in 1 2 3 4 5 6 7 8; do
      uidump emu/shots/ui-$1-$i.xml
      say "h1_$1_step$i texts=$(texts emu/shots/ui-$1-$i.xml)"
      if has emu/shots/ui-$1-$i.xml "while using the app"; then
        tapfind emu/shots/ui-$1-$i.xml "while using the app"; sleep 3; continue
      fi
      if has emu/shots/ui-$1-$i.xml "welcome to haven" || has emu/shots/ui-$1-$i.xml "show everything"; then
        if tapfind emu/shots/ui-$1-$i.xml "show everything" 0 300; then sleep 4; continue; fi
        if tapfind emu/shots/ui-$1-$i.xml "next" 1500 300; then sleep 3; continue; fi
        sleep 2; continue
      fi
      if has emu/shots/ui-$1-$i.xml "openstreetmap" || has emu/shots/ui-$1-$i.xml "zoom in"; then
        say "h1_$1 PAST_ONBOARDING at step $i"
        return 0
      fi
      sleep 2
    done
    uidump emu/shots/ui-$1-final.xml
    if has emu/shots/ui-$1-final.xml "welcome to haven"; then return 1; fi
    if has emu/shots/ui-$1-final.xml "openstreetmap"; then return 0; fi
    return 1
  }

  haven_list_and_card() { # $1 = tag, $2 = still prefix (H1 or H1-explore4)
    uidump emu/shots/ui-$1-cur.xml
    local txy=$(python3 /tmp/tabpick.py emu/shots/ui-$1-cur.xml 200 460 2050 2380 2>/dev/null)
    if [ -n "$txy" ]; then adb shell input tap $txy; say "h1_$1 places_tab -> $txy"; else adb shell input tap $((W*31/100)) $((H*93/100)); say "h1_$1 places_tab FRACTION"; fi
    sleep 4
    uidump emu/shots/ui-$1-aftertab.xml
    say "h1_$1_aftertab texts=$(texts emu/shots/ui-$1-aftertab.xml)"
    # ZIP / area sheet handling
    if has emu/shots/ui-$1-aftertab.xml "where are you"; then
      say "h1_$1 AREA_SHEET detected"
      if tapfind emu/shots/ui-$1-aftertab.xml "location instead" 0 260; then sleep 6; fi
      uidump emu/shots/ui-$1-area2.xml
      say "h1_$1_area2 texts=$(texts emu/shots/ui-$1-area2.xml)"
      if has emu/shots/ui-$1-area2.xml "where are you"; then
        say "h1_$1 area sheet still up; ZIP fallback 46802"
        if tapfind emu/shots/ui-$1-area2.xml "zip code" 0 260; then sleep 1; adb shell input text "46802"; sleep 1; fi
        if tapfind emu/shots/ui-$1-area2.xml "show my area" 0 260; then sleep 6; fi
        uidump emu/shots/ui-$1-area3.xml
        say "h1_$1_area3 texts=$(texts emu/shots/ui-$1-area3.xml)"
      fi
    fi
    sleep 2
    adb shell input swipe $((W/2)) $((H*68/100)) $((W/2)) $((H*48/100)) 400; sleep 2
    adb exec-out screencap -p > emu/shots/$2-list.png
    uidump emu/shots/ui-$1-list.xml
    say "h1_$1_list texts=$(texts emu/shots/ui-$1-list.xml)"
    # ---- open a card: three attempts on DIFFERENT cards, shot after each ----
    # A: tap a card TITLE (Veteran's Court / Law Library are the known top cards)
    local tn=""
    local cand
    for cand in "veteran" "law library" "legal services"; do
      if has emu/shots/ui-$1-list.xml "$cand" 950 220; then tn="$cand"; break; fi
    done
    if [ -n "$tn" ]; then tapfind emu/shots/ui-$1-list.xml "$tn" 950 220; sleep 5; say "h1_$1 cardA_tap=$tn"; else say "h1_$1 cardA_no_title_found"; fi
    adb exec-out screencap -p > emu/shots/$2-cardA.png
    uidump emu/shots/ui-$1-dA.xml
    say "h1_$1_cardA texts=$(texts emu/shots/ui-$1-dA.xml)"
    # B: scroll a little, tap the chevron/expander of a visible card
    adb shell input swipe $((W/2)) $((H*62/100)) $((W/2)) $((H*50/100)) 300; sleep 2
    uidump emu/shots/ui-$1-dB0.xml
    local ch=$(python3 /tmp/tabpick.py emu/shots/ui-$1-dB0.xml 880 1080 1100 2100 2>/dev/null)
    if [ -n "$ch" ]; then adb shell input tap $ch; say "h1_$1 cardB_chevron -> $ch"; sleep 5; else say "h1_$1 cardB_no_chevron"; fi
    adb exec-out screencap -p > emu/shots/$2-cardB.png
    uidump emu/shots/ui-$1-dB.xml
    say "h1_$1_cardB texts=$(texts emu/shots/ui-$1-dB.xml)"
    # C: tap the Directions action of a visible card
    if tapfind emu/shots/ui-$1-dB.xml "directions" 1250 200; then sleep 6; say "h1_$1 cardC_directions_tapped"; else say "h1_$1 cardC_no_directions"; fi
    adb exec-out screencap -p > emu/shots/$2-cardC.png
    uidump emu/shots/ui-$1-dC.xml
    say "h1_$1_cardC texts=$(texts emu/shots/ui-$1-dC.xml)"
    cp emu/shots/$2-cardA.png emu/shots/$2-card.png
    say "h1_$1 CARD_ATTEMPTS_DONE (A/B/C saved for eyeball pick)"
    return 0
  }

  # ---- explore ----
  if haven_past_onboarding h5x; then say "EXPLORE_PAST_OK"; else say "EXPLORE_PAST_FAIL"; fi
  adb exec-out screencap -p > emu/shots/H1-explore5-map.png
  if haven_list_and_card h5x H1-explore5; then say "EXPLORE_LISTCARD_OK"; else say "EXPLORE_LISTCARD_UNCONFIRMED"; fi
  adb shell am force-stop $PKG; sleep 2

  # ---- recorded ----
  recstart /sdcard/H1.mp4
  if haven_past_onboarding h5r; then say "REC_PAST_OK"; else say "REC_PAST_FAIL"; fi
  sleep 2
  adb exec-out screencap -p > emu/shots/H1-map.png
  if haven_list_and_card h5r H1; then say "REC_LISTCARD_OK"; else say "REC_LISTCARD_UNCONFIRMED"; fi
  adb shell input keyevent 4; sleep 2
  sleep 3
  recstop_pull /sdcard/H1.mp4 emu/shots/H1.mp4
  say "haven_pid_end=$(adb shell pidof $PKG | tr -d '\r')"
  adb logcat -d > emu/shots/logcat-r5-h1.txt 2>&1
  say "fatal_h1=$(grep -c 'FATAL EXCEPTION' emu/shots/logcat-r5-h1.txt)"
  adb emu kill 2>/dev/null
  say "H1_R5_DONE"
fi

# ============================== E1 APK EDITOR v4 ==============================
if [ "$MODE" = "e1" ]; then
  PKG=com.onion.apkeditor
  bootavd cape5
  fetchapk cap-OnionAPKEditor.apk 4f1f19422e171adabc45248c1720ca75 /tmp/e5.apk || exit 0
  fetchapk cap-OnionBrowser.apk 897528dc0f65cb16221c9b906483ddb5 /tmp/e5b.apk || say "BROWSER_FETCH_FAIL"
  installapk /tmp/e5.apk $PKG e4 || { say "VERDICT=INSTALL_FAIL"; exit 0; }
  if [ -s /tmp/e5b.apk ]; then installapk /tmp/e5b.apk com.onion.browser e4b || say "BROWSER_INSTALL_FAIL"; fi
  adb logcat -c

  e1_open_row() { # $1 = tag
    uidump emu/shots/ui-$1-lib.xml
    say "e1_$1_lib texts=$(texts emu/shots/ui-$1-lib.xml)"
    if ! tapfind emu/shots/ui-$1-lib.xml "browse installed apps" 0 300; then say "e1_$1 BROWSE_NOT_FOUND"; return 1; fi
    sleep 5
    uidump emu/shots/ui-$1-apps.xml
    say "e1_$1_apps texts=$(texts emu/shots/ui-$1-apps.xml)"
    adb exec-out screencap -p > emu/shots/E1-stage-app.png
    if tapfind emu/shots/ui-$1-apps.xml "search installed apps" 0 300; then
      sleep 1
      adb shell input text "Onion%sBrowser"; sleep 3
    else
      say "e1_$1 SEARCH_FIELD_NOT_FOUND"
    fi
    uidump emu/shots/ui-$1-results.xml
    say "e1_$1_results texts=$(texts emu/shots/ui-$1-results.xml)"
    # THE fix: package-name text exists ONLY in the result row.
    if has emu/shots/ui-$1-results.xml "com.onion.browser" 900 220; then
      tapfind emu/shots/ui-$1-results.xml "com.onion.browser" 900 220; sleep 6
    else
      say "e1_$1 ROW_PKG_NOT_FOUND"
      return 1
    fi
    uidump emu/shots/ui-$1-insp.xml
    say "e1_$1_insp texts=$(texts emu/shots/ui-$1-insp.xml)"
    if has emu/shots/ui-$1-insp.xml "search installed apps"; then say "e1_$1 STILL_ON_LIST"; return 1; fi
    if has emu/shots/ui-$1-insp.xml "version" || has emu/shots/ui-$1-insp.xml "size" || has emu/shots/ui-$1-insp.xml "permissions" || has emu/shots/ui-$1-insp.xml "sdk"; then
      say "e1_$1 INSPECTOR_OK"
      return 0
    fi
    say "e1_$1 INSPECTOR_UNCONFIRMED (dump saved)"
    return 0
  }

  e1_tabs() { # $1 = tag; from Overview: Extract tab FIRST (its coords are
    # only unambiguous on the Overview dump), then back, Code tab, class view.
    uidump emu/shots/ui-$1-tabs.xml
    if tapfind emu/shots/ui-$1-tabs.xml "extract" 150 160 1150; then sleep 4; say "e1_$1 EXTRACT_TAB_OPENED"; else say "e1_$1 EXTRACT_TAB_NOT_FOUND"; fi
    adb exec-out screencap -p > emu/shots/E1-stage-extract.png
    uidump emu/shots/ui-$1-extract.xml
    say "e1_$1_extract texts=$(texts emu/shots/ui-$1-extract.xml)"
    adb shell input keyevent 4; sleep 3
    uidump emu/shots/ui-$1-tabs2.xml
    say "e1_$1_tabs2 texts=$(texts emu/shots/ui-$1-tabs2.xml)"
    if tapfind emu/shots/ui-$1-tabs2.xml "code" 150 160 1150; then sleep 4; say "e1_$1 CODE_TAB_OPENED"; else say "e1_$1 CODE_TAB_NOT_FOUND"; fi
    adb exec-out screencap -p > emu/shots/E1-stage-code.png
    uidump emu/shots/ui-$1-code.xml
    say "e1_$1_code texts=$(texts emu/shots/ui-$1-code.xml)"
    if tapfind emu/shots/ui-$1-code.xml "adblock" 300 140; then sleep 4; say "e1_$1 CLASS_OPENED"; else say "e1_$1 CLASS_NOT_FOUND"; fi
    adb exec-out screencap -p > emu/shots/E1-stage-class.png
    uidump emu/shots/ui-$1-class.xml
    say "e1_$1_class texts=$(texts emu/shots/ui-$1-class.xml)"
  }

  # ---- explore ----
  adb shell monkey -p $PKG -c android.intent.category.LAUNCHER 1 > /dev/null 2>&1
  sleep 9
  adb shell input tap $(awk -v w=$W -v h=$H 'BEGIN{printf "%d %d", w*0.80, h*0.27}')
  sleep 1
  adb exec-out screencap -p > emu/shots/E1-stage-lib.png
  if e1_open_row e5x; then say "EXPLORE_OPEN_OK"; else say "EXPLORE_OPEN_FAIL"; fi
  adb exec-out screencap -p > emu/shots/E1-stage-insp.png
  e1_tabs e5x
  say "editor_pid=$(adb shell pidof $PKG | tr -d '\r')"
  adb shell am force-stop $PKG; sleep 2

  # ---- recorded ----
  adb shell monkey -p $PKG -c android.intent.category.LAUNCHER 1 > /dev/null 2>&1
  sleep 8
  recstart /sdcard/E1.mp4
  sleep 2
  if e1_open_row e5r; then say "REC_OPEN_OK"; else say "REC_OPEN_FAIL"; fi
  adb exec-out screencap -p > emu/shots/E1-stage-insp.png
  e1_tabs e5r
  sleep 4
  recstop_pull /sdcard/E1.mp4 emu/shots/E1.mp4
  say "editor_pid_end=$(adb shell pidof $PKG | tr -d '\r')"
  adb logcat -d > emu/shots/logcat-r5-e1.txt 2>&1
  say "fatal_e1=$(grep -c 'FATAL EXCEPTION' emu/shots/logcat-r5-e1.txt)"
  adb emu kill 2>/dev/null
  say "E1_R5_DONE"
fi
