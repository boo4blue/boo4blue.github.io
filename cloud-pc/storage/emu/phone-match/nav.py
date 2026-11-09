#!/usr/bin/env python3
"""nav.py — runner-side page driver for the phone-match rig (Cloud PC).

Runs on the GitHub Actions runner with cwd = cloud-pc/storage.
Drives com.onioncore.oniontv on emulator-5554 by uiautomator dumps +
text/desc search + taps, and captures every reached page into
emu/phone-match/real/NN-slug-ORIENTATION.png (1080x2280 @ 420dpi).
Every step is logged; a failed route still captures where it landed
(evidence) and logs ROUTE-MISS so the route can be fixed next batch.
"""
import os
import re
import subprocess
import sys
import time
import xml.etree.ElementTree as ET

SERIAL = "emulator-5554"
PKG = "com.onioncore.oniontv"
OUT = "emu/phone-match/real"
DUMPS = "emu/phone-match/logs/dumps"
BATCH = os.environ.get("PM_BATCH", "A")
os.makedirs(OUT, exist_ok=True)
os.makedirs(DUMPS, exist_ok=True)


def log(*a):
    print(f"[nav {time.strftime('%H:%M:%S')}]", *a, flush=True)


def adb(*args, t=30):
    return subprocess.run(["adb", "-s", SERIAL, *args],
                          capture_output=True, text=True, timeout=t)


def sh(cmd, t=30):
    return adb("shell", cmd, t=t).stdout.strip()


def shot(name, ori):
    path = os.path.join(OUT, f"{name}-{ori}.png")
    r = subprocess.run(["adb", "-s", SERIAL, "exec-out", "screencap", "-p"],
                       capture_output=True, timeout=60)
    if r.returncode != 0 or len(r.stdout) < 1000:
        log(f"SHOT FAILED {path} rc={r.returncode} bytes={len(r.stdout)}")
        return False
    with open(path, "wb") as f:
        f.write(r.stdout)
    log(f"shot {path} ({len(r.stdout)} B)")
    return True


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
    """Shot both orientations of the current screen."""
    rotate("upright")
    time.sleep(1.5)
    shot(name, "upright")
    rotate("sideways")
    time.sleep(1.5)
    shot(name, "sideways")
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


if __name__ == "__main__":
    log(f"nav.py batch {BATCH} starting; top before: {top_activity()}")
    if BATCH == "A":
        batch_a()
    else:
        log(f"batch {BATCH} has no routes yet")
    log("nav.py done")
