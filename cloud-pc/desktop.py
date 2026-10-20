#!/usr/bin/env python3
"""Cloud PC desktop bridge: a real Linux desktop (Xvfb + openbox) streamed
over MQTT. The website shows the screen; clicks/keys come back as input.

Usage: python3 desktop.py <session-secret> <minutes>
Topics: onionpc/v1/<secret>/status | screen | input
Needs on the runner: xvfb, openbox, pcmanfm, lxterminal, obconf,
                     imagemagick, xdotool (installed by pc.py's desktop action).
"""
import base64
import json
import os
import random
import subprocess
import sys
import time

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from mqtt import MQTTClient  # noqa: E402

BROKERS = [("broker.emqx.io", 1883), ("test.mosquitto.org", 1883),
           ("broker.hivemq.com", 1883)]
W, H = 1024, 768
DEVNULL = subprocess.DEVNULL

SECRET = sys.argv[1] if len(sys.argv) > 1 else "%016x" % random.getrandbits(64)
MINUTES = min(int(sys.argv[2]) if len(sys.argv) > 2 else 30, 45)
BASE = "onionpc/v1/" + SECRET
HERE = os.path.dirname(os.path.abspath(__file__))
STORAGE = os.path.join(HERE, "storage")

stop_flag = False


def log(*a):
    print("[desktop]", *a, flush=True)


def sh(*args, **kw):
    return subprocess.Popen(args, stdout=DEVNULL, stderr=DEVNULL, **kw)


def setup_desktop():
    env = dict(os.environ, DISPLAY=":99")
    sh("Xvfb", ":99", "-screen", "0", "%dx%dx24" % (W, H))
    time.sleep(2)
    sh("openbox", env=env)
    time.sleep(2)
    # File manager open on the PC's disk, terminal handy, settings available.
    sh("pcmanfm", STORAGE, env=env)
    time.sleep(1)
    return env


def screenshot(env):
    p1 = subprocess.Popen(["import", "-window", "root", "png:-"],
                          stdout=subprocess.PIPE, stderr=DEVNULL, env=env)
    p2 = subprocess.Popen(
        ["convert", "png:-", "-resize", "800x", "-quality", "45", "jpg:-"],
        stdin=p1.stdout, stdout=subprocess.PIPE, stderr=DEVNULL)
    p1.stdout.close()
    data = p2.communicate()[0]
    return data


def handle_input(payload, env):
    global stop_flag
    try:
        msg = json.loads(payload.decode("utf-8", "replace"))
    except Exception:
        return
    t = msg.get("type")
    try:
        if t == "stop":
            stop_flag = True
        elif t == "click":
            x = max(0, min(W - 1, int(msg.get("x", 0))))
            y = max(0, min(H - 1, int(msg.get("y", 0))))
            btn = int(msg.get("button", 1))
            subprocess.run(["xdotool", "mousemove", str(x), str(y),
                            "click", str(btn)], env=env,
                           stdout=DEVNULL, stderr=DEVNULL, timeout=10)
        elif t == "type":
            text = msg.get("text", "")[:500]
            if text:
                subprocess.run(["xdotool", "type", "--delay", "25", "--", text],
                               env=env, stdout=DEVNULL, stderr=DEVNULL,
                               timeout=15)
        elif t == "key":
            key = msg.get("key", "")[:30].replace(" ", "")
            if key:
                subprocess.run(["xdotool", "key", key], env=env,
                               stdout=DEVNULL, stderr=DEVNULL, timeout=10)
        elif t == "launch":
            app = msg.get("app", "")
            if app == "pcmanfm":
                sh(app, STORAGE, env=env)
            elif app in ("lxterminal", "obconf"):
                sh(app, env=env)
    except Exception as e:
        log("input error:", e)


def main():
    env = setup_desktop()
    client = None
    for host, port in BROKERS:
        try:
            client = MQTTClient(host, port, client_id="pc-%s" % SECRET[:8])
            client.connect(timeout=15)
            log("mqtt up via", host)
            break
        except Exception as e:
            log(host, "mqtt failed:", str(e)[:100])
            client = None
    if not client:
        print(json.dumps({"ok": False, "error": "no mqtt broker reachable"}))
        return

    status_t = BASE + "/status"
    screen_t = BASE + "/screen"
    input_t = BASE + "/input"
    client.subscribe(input_t)
    client.publish(status_t, json.dumps(
        {"state": "ready", "w": W, "h": H, "t": time.time()}))

    def on_msg(topic, payload):
        if topic == input_t:
            handle_input(payload, env)

    deadline = time.time() + MINUTES * 60
    last_shot, shots = 0, 0
    last_img = None
    shot_dir = os.path.join(STORAGE, "screenshots")
    os.makedirs(shot_dir, exist_ok=True)
    try:
        while not stop_flag and time.time() < deadline:
            client._handle(on_msg)
            if time.time() - client._last_ping > 40:
                client.sock.sendall(b"\xc0\x00")
                client._last_ping = time.time()
            if time.time() - last_shot >= 1.0:
                last_shot = time.time()
                try:
                    img = screenshot(env)
                    if img:
                        client.publish(screen_t, base64.b64encode(img).decode())
                        shots += 1
                        last_img = img
                        if shots == 1:
                            with open(os.path.join(
                                    shot_dir, SECRET[:8] + "_first.jpg"), "wb") as f:
                                f.write(img)
                except Exception as e:
                    log("shot failed:", str(e)[:80])
            time.sleep(0.05)
    finally:
        try:
            if last_img:
                with open(os.path.join(
                        shot_dir, SECRET[:8] + "_last.jpg"), "wb") as f:
                    f.write(last_img)
            client.publish(status_t, json.dumps({"state": "ended", "shots": shots}))
            client.close()
        except Exception:
            pass
        subprocess.run(["pkill", "-f", "Xvfb :99"], stdout=DEVNULL, stderr=DEVNULL)
    print(json.dumps({"ok": True, "session": SECRET, "shots": shots}))


if __name__ == "__main__":
    main()
