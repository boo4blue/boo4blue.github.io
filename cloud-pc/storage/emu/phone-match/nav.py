#!/usr/bin/env python3
"""nav.py — runner-side page driver for the phone-match rig (Cloud PC).

Runs on the GitHub Actions runner with cwd = cloud-pc/storage.
Drives com.onioncore.oniontv on emulator-5554 by uiautomator dumps +
text/desc search + taps, and captures every reached page into
emu/phone-match/real/NN-slug-ORIENTATION.png (1080x2280 @ 420dpi).
Every step is logged; a failed route still captures where it landed
(evidence) and logs ROUTE-MISS so the route can be fixed next batch.

DEDUPE GATE (added 2026-11-09 after the parent's md5 audit): batch A
produced byte-identical frames filed under different pages (routes that
never left Home). Every shot is now md5-checked against all frames
already in real/ (this run + previous runs): a frame identical to a
DIFFERENT page's frame is rejected — one re-shot after a 2 s settle,
then the page is recorded in failed_pages.txt and NO file is left under
its name. A capture must be distinct to count as proof. The gate also
checks PNG dimensions (upright must be 1080x2280, sideways 2280x1080)
so a failed rotation can never file a portrait frame as sideways.
"""
import hashlib
import os
import re
import struct
import subprocess
import sys
import time
import xml.etree.ElementTree as ET

SERIAL = "emulator-5554"
PKG = "com.onioncore.oniontv"
OUT = "emu/phone-match/real"
DUMPS = "emu/phone-match/logs/dumps"
FAILED = f"emu/phone-match/failed_pages-{os.environ.get('PM_BATCH', 'A')}.txt"
BATCH = os.environ.get("PM_BATCH", "A")
os.makedirs(OUT, exist_ok=True)
os.makedirs(DUMPS, exist_ok=True)


def _png_size(path):
    with open(path, "rb") as f:
        head = f.read(33)
    if len(head) < 29 or head[1:4] != b"PNG":
        return None
    w, h = struct.unpack(">II", head[16:24])
    return (w, h)


def _page_key(filename):
    base = filename[:-4] if filename.endswith(".png") else filename
    for suf in ("-upright", "-sideways"):
        if base.endswith(suf):
            return base[: -len(suf)]
    return base


# md5 -> page key of every frame already captured (this checkout).
SEEN = {}
for _f in os.listdir(OUT):
    if _f.endswith(".png"):
        try:
            SEEN[hashlib.md5(open(os.path.join(OUT, _f), "rb").read()).hexdigest()] = _page_key(_f)
        except OSError:
            pass
# Blocklisted md5s: quarantined batch-A duplicates. A re-capture that
# reproduces one is rejected even for the page it was filed under.
BLOCKED = set()
for _p in ("emu/phone-match/dup-md5.txt", "dup-md5.txt"):
    if os.path.exists(_p):
        BLOCKED = {l.strip() for l in open(_p)
                   if l.strip() and not l.startswith("#")}
        break
def _fail_page(name, why):
    with open(FAILED, "a") as f:
        f.write(f"{name} {why}\n")
    log(f"CAPTURE-FAILED {name}: {why} (recorded in failed_pages.txt)")


def log(*a):
    print(f"[nav {time.strftime('%H:%M:%S')}]", *a, flush=True)


def adb(*args, t=30):
    return subprocess.run(["adb", "-s", SERIAL, *args],
                          capture_output=True, text=True, timeout=t)


def sh(cmd, t=30):
    return adb("shell", cmd, t=t).stdout.strip()


def shot(name, ori):
    """One screencap with the dedupe gate. Returns 'ok' | 'dup' | 'rot' | 'fail'.

    'dup' = frame is byte-identical to a DIFFERENT page's frame (route
    never landed, or a duplicated write). 'rot' = PNG dimensions don't
    match the requested orientation (rotation never took effect).
    On 'dup' the file is moved to dumps/ as forensics and NO file is
    left under the page's name; the failure is recorded in failed_pages.txt.
    """
    path = os.path.join(OUT, f"{name}-{ori}.png")
    r = subprocess.run(["adb", "-s", SERIAL, "exec-out", "screencap", "-p"],
                       capture_output=True, timeout=60)
    if r.returncode != 0 or len(r.stdout) < 1000:
        log(f"SHOT FAILED {path} rc={r.returncode} bytes={len(r.stdout)}")
        return "fail"
    with open(path, "wb") as f:
        f.write(r.stdout)
    size = _png_size(path)
    want = (1080, 2280) if ori == "upright" else (2280, 1080)
    if size != want:
        log(f"ROTATION-FAIL {path}: got {size}, want {want}")
        os.remove(path)
        return "rot"
    digest = hashlib.md5(r.stdout).hexdigest()
    if digest in BLOCKED:
        log(f"DEDUP-FAIL {path}: md5 {digest} is a blocklisted batch-A duplicate")
        os.rename(path, os.path.join(DUMPS, f"dup-{name}-{ori}.png"))
        return "dup"
    other = SEEN.get(digest)
    if other is not None and other != name:
        log(f"DEDUP-FAIL {path}: md5 {digest} == {other}'s frame")
        os.rename(path, os.path.join(DUMPS, f"dup-{name}-{ori}.png"))
        return "dup"
    SEEN[digest] = name
    log(f"shot {path} ({len(r.stdout)} B) md5 {digest[:12]} distinct")
    return "ok"


def _shot_once(name, ori):
    """shot() with one retry on dup (settle) or rot (re-rotate)."""
    res = shot(name, ori)
    if res == "dup":
        time.sleep(2)
        res = shot(name, ori)
        if res == "dup":
            _fail_page(name, f"{ori} frame duplicates another page's frame")
    elif res == "rot":
        rotate(ori)
        time.sleep(1.5)
        res = shot(name, ori)
        if res == "rot":
            _fail_page(name, f"{ori} rotation never took effect")
    elif res == "fail":
        _fail_page(name, f"{ori} screencap failed")
    return res


def rotate(ori):
    sh("settings put system accelerometer_rotation 0")
    sh(f"settings put system user_rotation {1 if ori == 'sideways' else 0}")
    time.sleep(2.5)


def dump(tag=""):
    sh("uiautomator dump /sdcard/pm-dump.xml", t=60)
    xml = adb("exec-out", "cat", "/sdcard/pm-dump.xml", t=30).stdout
    if tag:
        with open(os.path.join(DUMPS, f"{BATCH}-{tag}.xml"), "w") as f:
            f.write(xml)
    return xml


def nodes(xml=None):
    xml = xml if xml is not None else dump()
    try:
        root = ET.fromstring(xml)
    except ET.ParseError:
        return []
    out = []
    for n in root.iter("node"):
        m = re.match(r"\[(\d+),(\d+)\]\[(\d+),(\d+)\]", n.attrib.get("bounds", ""))
        if not m:
            continue
        x1, y1, x2, y2 = map(int, m.groups())
        out.append({"text": n.attrib.get("text", ""), "desc": n.attrib.get("content-desc", ""),
                    "cls": n.attrib.get("class", ""), "click": n.attrib.get("clickable", "") == "true",
                    "cx": (x1 + x2) // 2, "cy": (y1 + y2) // 2, "y1": y1, "x1": x1})
    return out


def visible_texts(xml=None):
    return [n["text"] or n["desc"] for n in nodes(xml) if n["text"] or n["desc"]]


def find(needle, xml=None):
    hits = [n for n in nodes(xml) if needle.lower() in (n["text"] + " " + n["desc"]).lower()]
    hits.sort(key=lambda n: (n["y1"], n["x1"]))
    return hits


def tap_xy(x, y, wait=1.4):
    sh(f"input tap {x} {y}")
    time.sleep(wait)


def tap_text(needle, xml=None, index=0, wait=1.4):
    hits = find(needle, xml)
    if not hits or index >= len(hits):
        log(f"tap MISS {needle!r}; visible: {visible_texts()[:24]}")
        return False
    n = hits[index]
    log(f"tap {needle!r} at ({n['cx']},{n['cy']})")
    tap_xy(n["cx"], n["cy"], wait)
    return True


def key(code, wait=0.8):
    sh(f"input keyevent {code}")
    time.sleep(wait)


def top_activity():
    out = sh("dumpsys activity activities | grep -E 'topResumedActivity' | head -1")
    return out


def launch(wait=9):
    sh(f"am force-stop {PKG}")
    time.sleep(1)
    sh(f"monkey -p {PKG} -c android.intent.category.LAUNCHER 1", t=60)
    time.sleep(wait)
    log("launched; top:", top_activity())
    log("visible:", visible_texts()[:24])


def capture(name, route_ok=True):
    """Shot both orientations of the current screen (gated)."""
    rotate("upright")
    time.sleep(1.5)
    _shot_once(name, "upright")
    rotate("sideways")
    time.sleep(1.5)
    _shot_once(name, "sideways")
    rotate("upright")
    if not route_ok:
        log(f"ROUTE-MISS recorded for {name}")


def go_home():
    launch()
    # If a profile picker is showing, pick the first profile tile.
    xml = dump("after-launch")
    if find("Who's watching", xml) or find("Who’s watching", xml):
        log("picker is the launch screen")
        return "picker"
    return "home"


# ---------------- batch A: home / profile / settings cluster ----------------

def batch_a():
    landing = go_home()
    dump("home")
    if landing == "picker":
        capture("01-profile-picker")
        # choose the first profile to get into the app
        tiles = [n for n in nodes() if n["click"] and n["cy"] > 300]
        if tiles:
            tap_xy(tiles[0]["cx"], tiles[0]["cy"], wait=3)
        time.sleep(4)
    capture("04-home")
    # --- profile page (26): tap the profile picture (desc starts 'Profile:') ---
    xml = dump("home2")
    pics = [n for n in nodes(xml) if n["desc"].startswith("Profile:")]
    ok = False
    if pics:
        tap_xy(pics[0]["cx"], pics[0]["cy"], wait=2.5)
        ok = True
    else:
        log("no profile picture found on home")
    dump("profile-page")
    capture("26-profile-page", ok)
    # --- add / edit profile (03): Add profile tile/button on the profile page ---
    ok = tap_text("Add profile") or tap_text("Add a profile")
    time.sleep(2)
    dump("add-edit-profile")
    capture("03-add-edit-profile", ok)
    key(4)  # close dialog if open
    time.sleep(1)
    # back to home for settings routes
    go_home()
    # --- settings (21): gear, content-desc 'Settings' ---
    xml = dump("home3")
    gears = [n for n in nodes(xml) if n["desc"] == "Settings"]
    ok = False
    if gears:
        tap_xy(gears[0]["cx"], gears[0]["cy"], wait=2.5)
        ok = True
    else:
        log("no gear found on home")
    dump("settings")
    capture("21-settings", ok)
    # --- add-ons (22): Sources tab, then the add-ons/sources entry ---
    ok = tap_text("Sources", wait=2)
    dump("settings-sources")
    ok2 = tap_text("Add-ons") or tap_text("Add-ons & sources") or tap_text("Plugins")
    time.sleep(2)
    dump("addons")
    capture("22-addons", ok and ok2)
    key(4)
    time.sleep(1)
    # --- sign-in (23): Accounts tab -> Onion ID card (re-enter settings) ---
    go_home()
    xml = dump("home4")
    gears = [n for n in nodes(xml) if n["desc"] == "Settings"]
    if gears:
        tap_xy(gears[0]["cx"], gears[0]["cy"], wait=2.5)
    ok = tap_text("Accounts", wait=2)
    dump("settings-accounts")
    ok2 = tap_text("Onion ID", wait=2.5)
    time.sleep(2)
    dump("signin")
    capture("23-signin", ok and ok2)
    key(4)
    time.sleep(1)
    # --- downloads (24): from wherever we are, back out to home, settings, Device tab ---
    go_home()
    xml = dump("home5")
    gears = [n for n in nodes(xml) if n["desc"] == "Settings"]
    if gears:
        tap_xy(gears[0]["cx"], gears[0]["cy"], wait=2.5)
    ok = tap_text("Device", wait=2)
    dump("settings-device")
    ok2 = tap_text("Downloads", wait=2.5)
    time.sleep(2)
    dump("downloads")
    capture("24-downloads", ok and ok2)
    key(4)
    time.sleep(1)
    # --- streaming server (27): profile page -> streaming server row ---
    go_home()
    xml = dump("home6")
    pics = [n for n in nodes(xml) if n["desc"].startswith("Profile:")]
    if pics:
        tap_xy(pics[0]["cx"], pics[0]["cy"], wait=2.5)
    ok = tap_text("Streaming server", wait=2.5) or tap_text("Stream server", wait=2.5)
    time.sleep(2)
    dump("streaming-server")
    capture("27-streaming-server", ok)
    log("batch A complete")


def scroll_down():
    sh("input swipe 540 1700 540 700 300")
    time.sleep(1.0)


def on_home(xml=None):
    return bool(find("Onion ID:", xml)) or bool(find("Search movies and shows", xml))


def tap_home_avatar():
    """PhoneHomeActivity's own header: the avatar ImageView has NO
    content-desc; it sits at [912,42][1017,147] on a 1080-wide screen."""
    log("tap home avatar at (964,94)")
    tap_xy(964, 94, wait=2.5)


def goto_profile():
    xml = dump()
    if find("Who's watching", xml):
        return True
    pics = [n for n in nodes(xml) if n["desc"].startswith("Profile:")]
    if pics:
        tap_xy(pics[0]["cx"], pics[0]["cy"], wait=2.5)
    elif on_home(xml):
        tap_home_avatar()
    else:
        go_home()
        tap_home_avatar()
    xml = dump()
    ok = bool(find("Who's watching", xml))
    log("goto_profile ->", "profile page" if ok else f"UNKNOWN; visible: {visible_texts(xml)[:16]}")
    return ok


def goto_settings():
    if not goto_profile():
        return False
    xml = dump()
    gears = [n for n in nodes(xml) if n["desc"] == "Settings"]
    if not gears:
        log("goto_settings: no gear on profile page")
        return False
    tap_xy(gears[0]["cx"], gears[0]["cy"], wait=2.5)
    xml = dump()
    ok = bool(find("Profile PIN", xml)) or bool(find("Settings tab:", xml)) or bool(find("Playback", xml))
    log("goto_settings ->", "settings" if ok else f"UNKNOWN; visible: {visible_texts(xml)[:16]}")
    return ok


# ------------- batch A2: corrected routes for the settings/profile cluster -------------

def batch_a2():
    ok = goto_profile()
    dump("a2-profile")
    capture("26-profile-page", ok)
    # add / edit profile (03): the Add a profile dialog
    ok = tap_text("Add a profile", wait=2)
    time.sleep(1.5)
    dump("a2-add-edit")
    capture("03-add-edit-profile", ok)
    key(4)
    time.sleep(1)
    # settings (21)
    ok = goto_settings()
    dump("a2-settings")
    capture("21-settings", ok)
    # profile picker (01): Settings Profile tab -> Switch profile
    ok = tap_text("Switch profile", wait=2.5)
    time.sleep(2)
    dump("a2-picker")
    capture("01-profile-picker", ok)
    key(4)
    time.sleep(1)
    # add-ons (22): profile page -> Add-ons button (CatalogActivity)
    ok = goto_profile()
    ok = (tap_text("Add-ons", wait=2.5) or (scroll_down(), tap_text("Add-ons", wait=2.5))[1]) and ok
    time.sleep(2)
    dump("a2-addons")
    capture("22-addons", ok)
    key(4)
    time.sleep(1)
    # sign-in (23): profile page -> Link Onion ID
    ok = goto_profile()
    ok = tap_text("Link Onion ID", wait=2.5) and ok
    time.sleep(2)
    dump("a2-signin")
    capture("23-signin", ok)
    key(4)
    time.sleep(1)
    # downloads (24): settings -> Device tab -> Downloads
    ok = goto_settings()
    ok = tap_text("Device", wait=2) and ok
    dump("a2-settings-device")
    ok = tap_text("Downloads", wait=2.5) and ok
    time.sleep(2)
    dump("a2-downloads")
    capture("24-downloads", ok)
    key(4)
    time.sleep(1)
    # streaming server (27): profile page -> scroll -> Streaming server settings
    ok = goto_profile()
    scroll_down()
    ok = tap_text("Streaming server settings", wait=2.5) and ok
    time.sleep(2)
    dump("a2-streaming")
    capture("27-streaming-server", ok)
    log("batch A2 complete")


def tap_first_tile_after(anchor, dy=170):
    """Tap the first poster tile below a rail/section anchor text."""
    xml = dump()
    hits = find(anchor, xml)
    if not hits:
        log(f"tile anchor MISS {anchor!r}")
        return False
    y = hits[0]["cy"] + dy
    log(f"tap first tile after {anchor!r} at (170,{y})")
    tap_xy(170, y, wait=3)
    return True


def open_section(pill):
    # The series pill is labelled 'Series' on Home's own header and
    # 'Shows' in PhoneTopNav; try both spellings when navigating.
    alts = {pill}
    if pill == "Shows":
        alts.add("Series")
    if pill == "Series":
        alts.add("Shows")
    go_home()
    ok = False
    for lab in alts:
        if tap_text(lab, wait=3):
            ok = True
            break
    time.sleep(3)
    return ok


# ---------------- batch B: sections / detail / search / talk ----------------

def batch_b1():
    ok = open_section("Movies")
    dump("movies")
    capture("05-movies", ok)
    ok = open_section("Shows")
    dump("shows")
    capture("06-shows", ok)
    ok = open_section("Anime")
    dump("anime")
    capture("07-anime", ok)
    # see-all (08): from Movies section, tap a 'See all'
    ok = open_section("Movies")
    ok = tap_text("See all", wait=3) and ok
    time.sleep(2)
    dump("see-all")
    capture("08-see-all", ok)
    # sort & genres (09): control on the see-all page
    ok = tap_text("Sort & Genres", wait=2) or tap_text("Sort", wait=2) or tap_text("Genres", wait=2)
    time.sleep(1.5)
    dump("sort-genres")
    capture("09-sort-genres", ok)
    key(4)
    time.sleep(1)
    key(4)
    time.sleep(1)

def batch_b2():
    # movie title page (10): first tile of the Movies section
    ok = open_section("Movies")
    ok = tap_first_tile_after("Trending Movies") and ok
    time.sleep(3)
    dump("movie-title")
    capture("10-movie-title", ok)
    key(4)
    time.sleep(1)
    # series title page (11): first tile of the Shows section
    ok = open_section("Shows")
    ok = tap_first_tile_after("Trending Shows") and ok
    time.sleep(3)
    dump("series-title")
    capture("11-series-title", ok)
    key(4)
    time.sleep(1)
    # search (17): the search bar at the top of Home
    go_home()
    ok = tap_text("Search titles", wait=2.5)
    time.sleep(2)
    dump("search")
    capture("17-search", ok)
    # talk (18): mic inside search (desc or text mentions mic/voice/talk)
    xml = dump("search2")
    mics = [n for n in nodes(xml)
            if any(k in (n["desc"] + n["text"]).lower() for k in ("mic", "voice", "talk", "listen"))]
    ok = False
    if mics:
        tap_xy(mics[0]["cx"], mics[0]["cy"], wait=0.6)
        ok = True
        # listening state is transient: capture immediately, both orientations fast
        shot("18-talk", "upright")
        rotate("sideways")
        shot("18-talk", "sideways")
        rotate("upright")
    else:
        log("no mic control found in search; visible:", visible_texts()[:24])
        capture("18-talk", False)
    log("batch B complete")

# ------------- batch C: tv control / pairing / player / pin / party -------------

def open_player_from_section():
    ok = open_section("Movies")
    ok = tap_first_tile_after("Trending Movies") and ok
    time.sleep(3)
    ok = tap_text("Play", wait=2) and ok
    # source chain can take a while (5s hop per source, several sources)
    time.sleep(14)
    dump("player")
    log("player top:", top_activity())
    return ok


def open_player_menu(labels):
    xml = dump()
    for lab in labels:
        hits = [n for n in nodes(xml) if lab.lower() in (n["text"] + " " + n["desc"]).lower()]
        if hits:
            tap_xy(hits[0]["cx"], hits[0]["cy"], wait=2.5)
            return True
    log(f"player menu MISS {labels}; visible: {visible_texts()[:24]}")
    return False


def batch_c1():
    # tv control (19)
    go_home()
    ok = tap_text("TV Control", wait=3)
    time.sleep(3)
    dump("tv-control")
    capture("19-tv-control", ok)
    # tv pairing (20): companion Settings tab (TV list + code entry)
    ok = tap_text("Settings", wait=2.5)
    time.sleep(2)
    dump("tv-pairing")
    capture("20-tv-pairing", ok)
    key(4)
    time.sleep(1)
    # player cluster (12-16)
    ok = open_player_from_section()
    # show controls: tap center of the video area
    tap_xy(540, 1000, wait=1.2)
    dump("player-controls")
    capture("12-player-controls", ok)
    log("batch C1 complete")

def batch_c2():
    ok = open_player_from_section()
    tap_xy(540, 1000, wait=1.2)
    ok = open_player_menu(["Sources", "Source"])
    time.sleep(1.5)
    dump("player-sources")
    capture("13-player-sources", ok)
    key(4)
    time.sleep(1)
    tap_xy(540, 1000, wait=1)
    ok = open_player_menu(["Subtitles", "Subtitle", "Captions"])
    time.sleep(1.5)
    dump("player-subtitles")
    capture("14-player-subtitles", ok)
    key(4)
    time.sleep(1)
    tap_xy(540, 1000, wait=1)
    ok = open_player_menu(["Audio"])
    time.sleep(1.5)
    dump("player-audio")
    capture("15-player-audio", ok)
    key(4)
    time.sleep(1)
    tap_xy(540, 1000, wait=1)
    ok = open_player_menu(["Connect", "Cast"])
    time.sleep(1.5)
    dump("player-connect")
    capture("16-player-connect", ok)
    key(4)
    time.sleep(1)
    key(4)  # leave player
    time.sleep(1)
    log("batch C2 complete")

def batch_c3():
    # pin pad (02): add a PIN'd profile, then switch to it
    goto_profile()
    ok = tap_text("Add a profile", wait=2)
    time.sleep(1.5)
    dump("c-add-profile")
    # dialog fields: type a name, set PIN fields if present
    xml = dump()
    edits = [n for n in nodes(xml) if "EditText" in n["cls"]]
    edits.sort(key=lambda n: n["y1"])
    log(f"add-profile dialog EditTexts: {len(edits)}")
    if edits:
        tap_xy(edits[0]["cx"], edits[0]["cy"], wait=0.8)
        sh("input text PinTest")
        time.sleep(0.6)
    for n in list(nodes()):
        if "pin" in (n["text"] + n["desc"]).lower() and "EditText" in n["cls"]:
            tap_xy(n["cx"], n["cy"], wait=0.6)
            sh("input text 1234")
            time.sleep(0.5)
    ok2 = tap_text("Save", wait=2) or tap_text("Add", wait=2) or tap_text("OK", wait=2)
    time.sleep(2)
    dump("c-after-add")
    ok3 = tap_text("PinTest", wait=2.5)  # switching to it should raise the pad
    time.sleep(2)
    dump("pin-pad")
    capture("02-pin-pad", ok and ok3)
    key(4)
    time.sleep(1)
    # watch party (25): Settings -> Playback -> Watch party card
    goto_settings()
    tap_text("Playback", wait=2)
    dump("c-settings-playback")
    ok = tap_text("Watch party", wait=2.5)
    time.sleep(2)
    dump("watch-party")
    capture("25-watch-party", ok)
    pass
    log("batch C3 complete")

# ---------------- batch P04: Home re-proof (gated) ----------------
# Page 04's batch-A frames were byte-identical to page 03's and were
# quarantined. This batch re-captures Home alone, with the dedupe gate
# proving the frames are distinct before they count as proof.

def batch_p04():
    landing = go_home()
    dump("home-p04")
    if landing == "picker":
        capture("01-profile-picker")
        return
    capture("04-home")
    log("batch P04 complete")


if __name__ == "__main__":
    log(f"nav.py batch {BATCH} starting; top before: {top_activity()}")
    if BATCH == "A":
        batch_a()
    elif BATCH == "A2":
        batch_a2()
    elif BATCH == "B1":
        batch_b1()
    elif BATCH == "B2":
        batch_b2()
    elif BATCH == "C1":
        batch_c1()
    elif BATCH == "C2":
        batch_c2()
    elif BATCH == "C3":
        batch_c3()
    elif BATCH == "P04":
        batch_p04()
    else:
        log(f"batch {BATCH} has no routes yet")
    log("nav.py done")
