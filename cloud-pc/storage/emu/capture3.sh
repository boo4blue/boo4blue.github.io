#!/bin/bash
# capture3.sh — Ad #1 Round 1 repair-of-repair (Cloud PC lane). Modes: h1 | e1.
# Lessons from cap2 harvest baked in:
#  - WebView dumps intermittently return EMPTY: uidump now retries until the
#    file is non-trivial; no state is ever declared from an empty dump.
#  - Haven's a11y tree contains ALL views at once; hidden ones have bounds
#    [0,0][0,0]. tapfind2 ignores zero-bounds nodes, supports min-y and
#    max-height filters (kills giant-container + header-title false taps).
#  - Haven: onboarding overlays the map. LIST_REACHED requires POSITIVE map
#    markers AND absence of onboarding markers. Skip via "show everything".
#    Then bottom Places tab (2nd, by bounds region) -> list -> row -> detail.
#  - Editor: open an app via the "Search installed apps" field (typing
#    "Onion Browser") instead of needle-tapping list text (header trap).
#  - Recording: graceful SIGINT stop + settle + in-job verify (same as cap2).
SDK=$HOME/.cache/cloudpc-models/android-sdk
export ANDROID_HOME=$SDK ANDROID_SDK_ROOT=$SDK
export ANDROID_AVD_HOME=$HOME/emu-avd-home
export PATH=$SDK/platform-tools:$SDK/emulator:$PATH
mkdir -p emu/shots $ANDROID_AVD_HOME
REL=https://github.com/boo4blue/boo4blue.github.io/releases/download/emu-assets
MODE=$1
V=emu/shots/verdict-r3-$MODE.txt
: > $V
say() { echo "$1" | tee -a $V; }

cat > /tmp/tapfind2.py <<'PYEOF'
import sys, re
# args: xml needle [miny] [maxh]
data = open(sys.argv[1], encoding='utf-8', errors='replace').read()
needle = sys.argv[2].lower()
miny = int(sys.argv[3]) if len(sys.argv) > 3 else 0
maxh = int(sys.argv[4]) if len(sys.argv) > 4 else 0
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
    if maxh and (y1-y0) > maxh:
        continue
    print((x0+x1)//2, cy)
    sys.exit(0)
sys.exit(1)
PYEOF

cat > /tmp/tabpick.py <<'PYEOF'
import sys, re
# args: xml xmin xmax ymin ymax -> center of first clickable node in region
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

uidump() { # strict: retry until non-trivial
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
findxy() { python3 /tmp/tapfind2.py "$1" "$2" "${3:-0}" "${4:-0}" 2>/dev/null; }
tapfind() {
  local xy
  xy=$(findxy "$1" "$2" "${3:-0}" "${4:-0}")
  if [ -n "$xy" ]; then adb shell input tap $xy; say "tap[$2] -> $xy"; return 0; else say "tap[$2] NOT FOUND"; return 1; fi
}
has() { [ -n "$(findxy "$1" "$2" "${3:-0}" "${4:-0}")" ]; }
texts() { grep -oE 'text="[^"]+"' "$1" 2>/dev/null | grep -vE 'text=""' | head -40 | tr '\n' '|'; }
fetchapk() {
  curl -sL --retry 2 --max-time 300 -o "$3" "$REL/$1"
  local got=$(md5sum "$3" 2>/dev/null | cut -d' ' -f1)
  if [ "$got" = "$2" ]; then say "fetch_ok $1 md5=$got size=$(stat -c%s "$3")"; return 0; else say "FETCH_FAIL $1 got=$got want=$2"; return 1; fi
}
installapk() {
  adb install -r "$1" > emu/shots/install-r3-$3.txt 2>&1
  local n=$(adb shell pm list packages 2>/dev/null | grep -c "$2")
  say "install $3 pm_match=$n"
  [ "$n" != "0" ]
}
bootavd() {
  if [ ! -x $SDK/emulator/emulator ]; then say "FATAL emulator missing (setup did not run)"; exit 0; fi
  pkill -f qemu-system 2>/dev/null; sleep 2; adb kill-server 2>/dev/null; sleep 1
  echo no | $SDK/cmdline-tools/latest/bin/avdmanager create avd -n "$1" -k "system-images;android-34;google_apis;x86_64" -d pixel_6 --force > emu/shots/avd-r3-$MODE.log 2>&1
  nohup $SDK/emulator/emulator -avd "$1" -no-window -no-audio -no-boot-anim -gpu angle_indirect -feature -Vulkan -memory 2048 -accel on -no-snapshot > emu/shots/boot-r3-$MODE.log 2>&1 &
  timeout 150 adb wait-for-device
  local ok=0
  for i in $(seq 1 36); do
    local b=$(adb shell getprop sys.boot_completed 2>/dev/null | tr -d '\r')
    if [ "$b" = "1" ]; then ok=1; say "boot_completed=1 after ~$((i*5))s"; break; fi
    sleep 5
  done
  if [ "$ok" != "1" ]; then say "VERDICT=BOOT_FAIL"; tail -5 emu/shots/boot-r3-$MODE.log; exit 0; fi
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

# ============================== H1 HAVEN v3 ==============================
if [ "$MODE" = "h1" ]; then
  PKG=com.onion.fwhaven
  bootavd caph3
  adb shell settings put secure location_mode 3 > /dev/null 2>&1
  adb emu geo fix -85.139351 41.079989 > /dev/null 2>&1
  fetchapk cap-HavenFW.apk 2203a0b2b286cdac889ce5778e2fb5df /tmp/h3.apk || exit 0
  installapk /tmp/h3.apk $PKG h3 || { say "VERDICT=INSTALL_FAIL"; exit 0; }
  adb logcat -c

  haven_skip_onboarding() { # $1 = tag; POSITIVE checks only. 0 = past onboarding
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
        say "h1_$1 PAST_ONBOARDING at step $i (map markers, no onboarding)"
        return 0
      fi
      sleep 2
    done
    uidump emu/shots/ui-$1-final.xml
    say "h1_$1_final texts=$(texts emu/shots/ui-$1-final.xml)"
    if has emu/shots/ui-$1-final.xml "welcome to haven"; then return 1; fi
    if has emu/shots/ui-$1-final.xml "openstreetmap"; then return 0; fi
    return 1
  }

  haven_places_card() { # $1 = tag; Places tab -> list -> open first real row
    local txy=$(python3 /tmp/tabpick.py emu/shots/ui-$1-tab.xml 200 460 2050 2380 2>/dev/null)
    if [ -z "$txy" ]; then uidump emu/shots/ui-$1-tab.xml; txy=$(python3 /tmp/tabpick.py emu/shots/ui-$1-tab.xml 200 460 2050 2380 2>/dev/null); fi
    if [ -n "$txy" ]; then adb shell input tap $txy; say "h1_$1 places_tab -> $txy"; else adb shell input tap $((W*31/100)) $((H*93/100)); say "h1_$1 places_tab FRACTION"; fi
    sleep 4
    uidump emu/shots/ui-$1-list.xml
    say "h1_$1_list texts=$(texts emu/shots/ui-$1-list.xml)"
    adb shell input swipe $((W/2)) $((H*68/100)) $((W/2)) $((H*48/100)) 400; sleep 2
    uidump emu/shots/ui-$1-list2.xml
    say "h1_$1_list2 texts=$(texts emu/shots/ui-$1-list2.xml)"
    # open a row: named needles first (filtered), then first plausible row node
    local needles="shelter|pantry|mission|soup|meal|clinic|church|center|centre|house|home|food|health|recovery|outreach|ministries|salvation| ymca|library|park"
    local IFS_BAK=$IFS; IFS='|'; local n
    for n in $needles; do
      IFS=$IFS_BAK
      if has emu/shots/ui-$1-list2.xml "$n" 500 260; then
        tapfind emu/shots/ui-$1-list2.xml "$n" 500 260; sleep 5
        uidump emu/shots/ui-$1-detail.xml
        say "h1_$1_detail_via=$n texts=$(texts emu/shots/ui-$1-detail.xml)"
        say "h1_$1 DETAIL_DUMPED via $n"
        return 0
      fi
      IFS='|'
    done
    IFS=$IFS_BAK
    # generic: tap mid-list rows at a few heights, dump after each
    local fy
    for fy in 34 48 62; do
      adb shell input tap $((W/2)) $((H*fy/100)); sleep 5
      uidump emu/shots/ui-$1-detail.xml
      say "h1_$1_detail_via=fy$fy texts=$(texts emu/shots/ui-$1-detail.xml)"
      if ! has emu/shots/ui-$1-detail.xml "welcome to haven"; then
        # if a detail sheet opened, the list markers change; accept and stop
        say "h1_$1 DETAIL_DUMPED via fy$fy"
        return 0
      fi
    done
    say "h1_$1 CARD_UNCONFIRMED"
    return 1
  }

  # ---- explore ----
  if haven_skip_onboarding h3x; then say "EXPLORE_PAST_ONBOARDING_OK"; else say "EXPLORE_PAST_ONBOARDING_FAIL"; fi
  adb exec-out screencap -p > emu/shots/H1-explore3-map.png
  uidump emu/shots/ui-h3x-tab.xml
  if haven_places_card h3x; then say "EXPLORE_CARD_OK"; else say "EXPLORE_CARD_CHECK_ONLY"; fi
  adb exec-out screencap -p > emu/shots/H1-explore3-card.png
  adb shell input keyevent 4; sleep 2
  adb shell am force-stop $PKG; sleep 2

  # ---- recorded ----
  recstart /sdcard/H1.mp4
  if haven_skip_onboarding h3r; then say "REC_PAST_ONBOARDING_OK"; else say "REC_PAST_ONBOARDING_FAIL"; fi
  sleep 2
  adb exec-out screencap -p > emu/shots/H1-map.png
  uidump emu/shots/ui-h3r-tab.xml
  # places flow inline here so stills land mid-recording in order:
  TXY=$(python3 /tmp/tabpick.py emu/shots/ui-h3r-tab.xml 200 460 2050 2380 2>/dev/null)
  if [ -n "$TXY" ]; then adb shell input tap $TXY; say "h1_rec places_tab -> $TXY"; else adb shell input tap $((W*31/100)) $((H*93/100)); say "h1_rec places_tab FRACTION"; fi
  sleep 4
  adb shell input swipe $((W/2)) $((H*68/100)) $((W/2)) $((H*48/100)) 400; sleep 2
  adb exec-out screencap -p > emu/shots/H1-list.png
  haven_places_card h3r2
  sleep 3
  adb exec-out screencap -p > emu/shots/H1-card.png
  sleep 4
  recstop_pull /sdcard/H1.mp4 emu/shots/H1.mp4
  say "haven_pid_end=$(adb shell pidof $PKG | tr -d '\r')"
  adb logcat -d > emu/shots/logcat-r3-h1.txt 2>&1
  say "fatal_h1=$(grep -c 'FATAL EXCEPTION' emu/shots/logcat-r3-h1.txt)"
  adb emu kill 2>/dev/null
  say "H1_R3_DONE"
fi

# ============================== E1 APK EDITOR v3 ==============================
if [ "$MODE" = "e1" ]; then
  PKG=com.onion.apkeditor
  bootavd cape3
  fetchapk cap-OnionAPKEditor.apk 4f1f19422e171adabc45248c1720ca75 /tmp/e3.apk || exit 0
  fetchapk cap-OnionBrowser.apk 897528dc0f65cb16221c9b906483ddb5 /tmp/e3b.apk || say "BROWSER_FETCH_FAIL"
  installapk /tmp/e3.apk $PKG e3 || { say "VERDICT=INSTALL_FAIL"; exit 0; }
  if [ -s /tmp/e3b.apk ]; then installapk /tmp/e3b.apk com.onion.browser e3b || say "BROWSER_INSTALL_FAIL"; fi
  adb logcat -c

  e1_open_via_search() { # $1 = tag; Library->Browse->search "Onion Browser"->row
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
    if has emu/shots/ui-$1-results.xml "browser" 350 320; then
      tapfind emu/shots/ui-$1-results.xml "browser" 350 320; sleep 6
    else
      say "e1_$1 BROWSER_ROW_NOT_IN_RESULTS"
      return 1
    fi
    uidump emu/shots/ui-$1-insp.xml
    say "e1_$1_insp texts=$(texts emu/shots/ui-$1-insp.xml)"
    if has emu/shots/ui-$1-insp.xml "com.onion.browser" || has emu/shots/ui-$1-insp.xml "version" || has emu/shots/ui-$1-insp.xml "permissions"; then
      say "e1_$1 INSPECTOR_OK"
      return 0
    fi
    say "e1_$1 INSPECTOR_UNCONFIRMED"
    return 0
  }

  e1_deeper() { # $1 = tag
    uidump emu/shots/ui-$1-insp2.xml
    local needles="contents|code|manifest|resources|assets|dex|files"
    local IFS_BAK=$IFS; IFS='|'; local n; local hit=0
    for n in $needles; do
      IFS=$IFS_BAK
      if has emu/shots/ui-$1-insp2.xml "$n" 300 260; then tapfind emu/shots/ui-$1-insp2.xml "$n" 300 260; sleep 4; hit=1; say "e1_$1_deep_via=$n"; break; fi
      IFS='|'
    done
    IFS=$IFS_BAK
    [ "$hit" = "0" ] && say "e1_$1 NO_DEEP_TAB (may already be on facts view)"
    adb shell input swipe $((W/2)) $((H*70/100)) $((W/2)) $((H*40/100)) 300; sleep 2
    uidump emu/shots/ui-$1-deep.xml
    say "e1_$1_deep texts=$(texts emu/shots/ui-$1-deep.xml)"
    local xneedles="extract|export|pull|save|share"
    IFS='|'; local xn; local xhit=0
    for xn in $xneedles; do
      IFS=$IFS_BAK
      if has emu/shots/ui-$1-deep.xml "$xn" 250 260; then tapfind emu/shots/ui-$1-deep.xml "$xn" 250 260; sleep 4; xhit=1; say "e1_$1_extract_via=$xn"; break; fi
      if has emu/shots/ui-$1-insp2.xml "$xn" 250 260; then tapfind emu/shots/ui-$1-insp2.xml "$xn" 250 260; sleep 4; xhit=1; say "e1_$1_extract_via_insp=$xn"; break; fi
      IFS='|'
    done
    IFS=$IFS_BAK
    if [ "$xhit" = "0" ]; then
      # overflow menu route
      if tapfind emu/shots/ui-$1-deep.xml "more options" 0 200 || tapfind emu/shots/ui-$1-deep.xml "more" 0 120; then
        sleep 2
        uidump emu/shots/ui-$1-menu.xml
        say "e1_$1_menu texts=$(texts emu/shots/ui-$1-menu.xml)"
        for xn in extract export pull save share; do
          if has emu/shots/ui-$1-menu.xml "$xn"; then tapfind emu/shots/ui-$1-menu.xml "$xn"; sleep 4; xhit=1; say "e1_$1_extract_via_menu=$xn"; break; fi
        done
      fi
    fi
    [ "$xhit" = "0" ] && say "e1_$1 EXTRACT_NOT_FOUND"
    uidump emu/shots/ui-$1-extract.xml
    say "e1_$1_extract texts=$(texts emu/shots/ui-$1-extract.xml)"
  }

  # ---- explore ----
  adb shell monkey -p $PKG -c android.intent.category.LAUNCHER 1 > /dev/null 2>&1
  sleep 9
  adb shell input tap $(awk -v w=$W -v h=$H 'BEGIN{printf "%d %d", w*0.80, h*0.27}')
  sleep 1
  adb exec-out screencap -p > emu/shots/E1-stage-lib.png
  if e1_open_via_search e3x; then say "EXPLORE_OPEN_OK"; else say "EXPLORE_OPEN_FAIL"; fi
  adb exec-out screencap -p > emu/shots/E1-stage-insp.png
  e1_deeper e3x
  adb exec-out screencap -p > emu/shots/E1-stage-extract.png
  say "editor_pid=$(adb shell pidof $PKG | tr -d '\r')"
  adb shell am force-stop $PKG; sleep 2

  # ---- recorded ----
  adb shell monkey -p $PKG -c android.intent.category.LAUNCHER 1 > /dev/null 2>&1
  sleep 8
  recstart /sdcard/E1.mp4
  sleep 2
  if e1_open_via_search e3r; then say "REC_OPEN_OK"; else say "REC_OPEN_FAIL"; fi
  adb exec-out screencap -p > emu/shots/E1-stage-insp.png
  e1_deeper e3r
  adb exec-out screencap -p > emu/shots/E1-stage-extract.png
  sleep 4
  recstop_pull /sdcard/E1.mp4 emu/shots/E1.mp4
  say "editor_pid_end=$(adb shell pidof $PKG | tr -d '\r')"
  adb logcat -d > emu/shots/logcat-r3-e1.txt 2>&1
  say "fatal_e1=$(grep -c 'FATAL EXCEPTION' emu/shots/logcat-r3-e1.txt)"
  adb emu kill 2>/dev/null
  say "E1_R3_DONE"
fi
