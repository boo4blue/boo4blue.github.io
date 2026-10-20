#!/usr/bin/env python3
"""Onion Cloud task worker. Runs on Onion's VM via the onion-cloud-runner cron.
Stdlib only; authenticated connectors are reached through their helper scripts
(which pull credentials from secure storage themselves).

Task types:
  ask      - prompt -> free LLM answer (Pollinations, keyless)
  bigmodel - prompt -> 120B-parameter model answer (Groq gpt-oss-120b, Boo's free key)
  image    - prompt -> free image URL (Pollinations, keyless)
  weather  - Fort Wayne weather (Open-Meteo, keyless)
"""
import json
import os
import subprocess
import sys
import time
import datetime
import urllib.parse
import urllib.request

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
QUEUE = os.path.join(ROOT, "tasks", "queue")
DATA = os.path.join(ROOT, "site", "data", "tasks")
os.makedirs(DATA, exist_ok=True)


def fetch(url, timeout=90):
    req = urllib.request.Request(url, headers={"User-Agent": "OnionCloud/1.0"})
    with urllib.request.urlopen(req, timeout=timeout) as r:
        return r.read().decode("utf-8", "replace")


def do_ask(prompt):
    q = urllib.parse.quote(prompt[:2000])
    return {"text": fetch("https://text.pollinations.ai/%s?model=openai" % q)}


def do_image(prompt):
    q = urllib.parse.quote(prompt[:1500])
    return {
        "image_url": "https://image.pollinations.ai/prompt/%s?nologo=true&width=1024&height=1024" % q
    }


def do_weather(_prompt):
    url = ("https://api.open-meteo.com/v1/forecast?latitude=41.0793&longitude=-85.1394"
           "&current=temperature_2m,weather_code,wind_speed_10m&temperature_unit=fahrenheit"
           "&timezone=America%2FIndiana%2FIndianapolis")
    c = json.loads(fetch(url))["current"]
    return {
        "place": "Fort Wayne, IN",
        "fahrenheit": c["temperature_2m"],
        "weather_code": c["weather_code"],
        "wind_mph": c["wind_speed_10m"],
    }


GROQ_HELPER = "/home/hatch/workspace/custom-connectors/custom.groq/bin/llm_chat.py"


def do_bigmodel(prompt):
    """120B-parameter answer through Boo's free Groq key (gpt-oss-120b)."""
    p = subprocess.run(
        [sys.executable, GROQ_HELPER, "--provider", "groq",
         "--model", "openai/gpt-oss-120b",
         "--prompt", prompt[:4000], "--max-tokens", "2000"],
        capture_output=True, text=True, timeout=120)
    text = (p.stdout or "").strip()
    if not text:
        raise RuntimeError("groq helper returned empty (stderr: %s)"
                           % (p.stderr or "")[:200])
    return {"text": text, "model": "openai/gpt-oss-120b", "via": "groq"}


HANDLERS = {"ask": do_ask, "bigmodel": do_bigmodel,
            "image": do_image, "weather": do_weather}


def run_task(task):
    tid = task.get("id") or "task-%d" % int(time.time())
    ttype = task.get("type", "ask")
    prompt = task.get("prompt", "")
    out = {
        "id": tid,
        "type": ttype,
        "prompt": prompt,
        "at": datetime.datetime.now(datetime.timezone.utc).isoformat(),
        "run": os.environ.get("GITHUB_RUN_NUMBER", "?"),
    }
    try:
        if ttype not in HANDLERS:
            raise ValueError("unknown type '%s' (want ask|bigmodel|image|weather)"
                             % ttype)
        out["result"] = HANDLERS[ttype](prompt)
        out["ok"] = True
    except Exception as e:
        out["ok"] = False
        out["error"] = "%s: %s" % (type(e).__name__, e)
    with open(os.path.join(DATA, tid + ".json"), "w") as f:
        json.dump(out, f, indent=2)
    return tid


def rebuild_index():
    entries = []
    for fn in sorted(os.listdir(DATA), reverse=True):
        if fn.endswith(".json"):
            try:
                d = json.load(open(os.path.join(DATA, fn)))
                entries.append({"id": d["id"], "type": d.get("type"),
                                "ok": d.get("ok"), "at": d.get("at")})
            except Exception:
                pass
    entries = entries[:100]
    with open(os.path.join(ROOT, "site", "data", "index.json"), "w") as f:
        json.dump(entries, f, indent=2)


def main():
    tasks = []
    if os.path.isdir(QUEUE):
        for fn in sorted(os.listdir(QUEUE)):
            if fn.endswith(".json"):
                p = os.path.join(QUEUE, fn)
                try:
                    tasks.append(json.load(open(p)))
                except Exception as e:
                    print("bad queue file %s: %s" % (fn, e), file=sys.stderr)
                os.remove(p)
    dt = os.environ.get("DISPATCH_TYPE")
    dp = os.environ.get("DISPATCH_PROMPT")
    if dp:
        tasks.append({"id": "manual-%d" % int(time.time()),
                      "type": dt or "ask", "prompt": dp})
    if not tasks:
        print("nothing to do")
        return
    ids = [run_task(t) for t in tasks]
    rebuild_index()
    print("done:", ids)


if __name__ == "__main__":
    main()
