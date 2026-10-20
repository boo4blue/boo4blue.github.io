#!/usr/bin/env python3
"""Onion AI brain: Ollama + Qwen2.5-Coder-14B running on the Cloud PC,
chatting with the website over MQTT (streaming tokens).

Usage: python3 aimodel.py <session-secret> <minutes>
Topics: onionpc/v1/<secret>/ai/status | ai/in | ai/out
Model cache lives in ~/.cache/cloudpc-models/ollama (persisted by the
workflow's actions/cache), so only the first boot downloads ~9GB.
"""
import json
import os
import subprocess
import sys
import time
import urllib.request

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from mqtt import MQTTClient  # noqa: E402

BROKERS = [("broker.emqx.io", 1883), ("test.mosquitto.org", 1883),
           ("broker.hivemq.com", 1883)]
MODEL = "qwen2.5-coder:14b"
OLLAMA_VER = "v0.40.6"
OLLAMA_URL = ("https://github.com/ollama/ollama/releases/download/%s/"
              "ollama-linux-amd64.tar.zst" % OLLAMA_VER)
SECRET = sys.argv[1] if len(sys.argv) > 1 else "test"
MINUTES = min(int(sys.argv[2]) if len(sys.argv) > 2 else 30, 45)
BASE = "onionpc/v1/" + SECRET
CACHE = os.path.expanduser("~/.cache/cloudpc-models")
BINDIR = os.path.join(CACHE, "ollama-bin")
MODELS = os.path.join(CACHE, "ollama-models")
DEVNULL = subprocess.DEVNULL
stop_flag = False


def log(*a):
    print("[aimodel]", *a, flush=True)


def download(url, dest):
    log("downloading", url.split("/")[-1])
    req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
    with urllib.request.urlopen(req, timeout=120) as r, open(dest, "wb") as f:
        while True:
            chunk = r.read(1024 * 1024)
            if not chunk:
                break
            f.write(chunk)


def ensure_ollama():
    binpath = os.path.join(BINDIR, "ollama")
    if os.path.exists(binpath):
        return binpath
    os.makedirs(BINDIR, exist_ok=True)
    tarpath = os.path.join(BINDIR, "ollama.tar.zst")
    download(OLLAMA_URL, tarpath)
    os.makedirs(os.path.join(BINDIR, "x"), exist_ok=True)
    ok = False
    for prog in (["tar", "-I", "zstd", "-xf", tarpath, "-C", BINDIR + "/x"],
                 ["tar", "--use-compress-program=unzstd", "-xf",
                  tarpath, "-C", BINDIR + "/x"]):
        r = subprocess.run(prog, stdout=DEVNULL, stderr=DEVNULL, timeout=120)
        if r.returncode == 0:
            ok = True
            break
    if not ok:
        raise RuntimeError("could not extract ollama (no zstd)")
    # tarball holds bin/ollama
    for root, _, files in os.walk(BINDIR + "/x"):
        if "ollama" in files:
            os.replace(os.path.join(root, "ollama"), binpath)
            break
    os.chmod(binpath, 0o755)
    return binpath


def main():
    global stop_flag
    os.makedirs(MODELS, exist_ok=True)
    ollama = ensure_ollama()
    env = dict(os.environ, OLLAMA_MODELS=MODELS,
               OLLAMA_HOST="127.0.0.1:11434")
    log("starting ollama serve")
    serve = subprocess.Popen([ollama, "serve"], env=env,
                             stdout=DEVNULL, stderr=DEVNULL)
    try:
        for _ in range(90):
            try:
                urllib.request.urlopen("http://127.0.0.1:11434/api/tags",
                                       timeout=2).read()
                break
            except Exception:
                time.sleep(2)
        else:
            raise RuntimeError("ollama serve did not come up")
        log("pulling", MODEL, "(cached after first boot)")
        r = subprocess.run([ollama, "pull", MODEL], env=env,
                           stdout=subprocess.PIPE, stderr=subprocess.STDOUT,
                           timeout=2400, text=True)
        if r.returncode != 0:
            raise RuntimeError("ollama pull failed: " + r.stdout[-500:])
        log("model ready")
    except Exception as e:
        serve.terminate()
        print(json.dumps({"ok": False, "error": str(e)[:200]}))
        return

    client = None
    for host, port in BROKERS:
        try:
            client = MQTTClient(host, port, client_id="ai-%s" % SECRET[:8])
            client.connect(timeout=15)
            log("mqtt up via", host)
            break
        except Exception as e:
            log(host, "mqtt failed:", str(e)[:100])
            client = None
    if not client:
        serve.terminate()
        print(json.dumps({"ok": False, "error": "no mqtt broker reachable"}))
        return

    status_t, in_t, out_t = BASE + "/ai/status", BASE + "/ai/in", BASE + "/ai/out"
    client.subscribe(in_t)
    client.publish(status_t, json.dumps({"state": "ready", "model": MODEL}))

    def chat(messages, req_id):
        payload = json.dumps({
            "model": MODEL,
            "messages": messages[-20:],
            "stream": True,
            "options": {"num_ctx": 4096},
        }).encode()
        req = urllib.request.Request(
            "http://127.0.0.1:11434/api/chat", data=payload,
            headers={"Content-Type": "application/json"})
        try:
            resp = urllib.request.urlopen(req, timeout=600)
        except Exception as e:
            client.publish(out_t, json.dumps(
                {"id": req_id, "t": "error", "error": str(e)[:200]}))
            return
        full = []
        try:
            for line in resp:
                line = line.strip()
                if not line:
                    continue
                try:
                    d = json.loads(line)
                except Exception:
                    continue
                piece = (d.get("message") or {}).get("content", "")
                if piece:
                    full.append(piece)
                    client.publish(out_t, json.dumps(
                        {"id": req_id, "t": "tok", "text": piece}))
                if d.get("done"):
                    client.publish(out_t, json.dumps(
                        {"id": req_id, "t": "done",
                         "eval_count": d.get("eval_count", 0)}))
                    break
        finally:
            resp.close()
        log("answered", req_id, len("".join(full)), "chars")

    def on_msg(topic, payload):
        global stop_flag
        try:
            msg = json.loads(payload.decode("utf-8", "replace"))
        except Exception:
            return
        if msg.get("t") == "stop":
            stop_flag = True
        elif msg.get("t") == "chat":
            chat(msg.get("messages", []), msg.get("id", "?"))

    deadline = time.time() + MINUTES * 60
    try:
        while not stop_flag and time.time() < deadline:
            client._handle(on_msg)
            if time.time() - client._last_ping > 40:
                client.sock.sendall(b"\xc0\x00")
                client._last_ping = time.time()
            time.sleep(0.05)
    finally:
        try:
            client.publish(status_t, json.dumps({"state": "ended"}))
            client.close()
        except Exception:
            pass
        serve.terminate()
    print(json.dumps({"ok": True, "session": SECRET, "model": MODEL}))


if __name__ == "__main__":
    main()
