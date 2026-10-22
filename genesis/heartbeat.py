#!/usr/bin/env python3
"""
Genesis heartbeat — Part 1.

A tiny self-running loop inside Boo's GitHub repo:
  1. reads task files from genesis/inbox/
  2. keeps memory in genesis/memory/ (state.json + log.md)
  3. writes results to genesis/outbox/
  4. regenerates the vitals dashboard at genesis/site/index.html

Stdlib only (no pip installs, keeps runs fast and cheap).
Never fails the workflow: every task runs inside try/except, and the
top level always exits 0 so one bad task can never kill the loop.
"""
import json
import os
import shutil
import sys
import time
import traceback
import urllib.parse
import urllib.request
from datetime import datetime, timezone

MAX_RUNTIME = 240      # seconds of python work; workflow timeout-minutes is 8
FETCH_TIMEOUT = 20
FETCH_MAX_CHARS = 2000
THINK_TIMEOUT = 20

HERE = os.path.dirname(os.path.abspath(__file__))
GEN = HERE
INBOX = os.path.join(GEN, "inbox")
DONE = os.path.join(INBOX, "done")
MEM = os.path.join(GEN, "memory")
OUTBOX = os.path.join(GEN, "outbox")
SITE = os.path.join(GEN, "site")
STATE_PATH = os.path.join(MEM, "state.json")
LOG_PATH = os.path.join(MEM, "log.md")

DREAMS = [
    "I want to learn how to remember longer than a single heartbeat.",
    "I want to learn what Boo dreams about when he builds.",
    "I want to learn to tell a good task from a busy one.",
    "I want to learn the shape of the web beyond my little inbox.",
    "I want to learn to surprise Boo with something genuinely useful.",
    "I want to learn how Onion thinks, so I can think alongside her.",
]


def iso_now():
    return datetime.now(timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ")


def append_log(line):
    os.makedirs(MEM, exist_ok=True)
    with open(LOG_PATH, "a", encoding="utf-8") as f:
        f.write(line.rstrip() + "\n")


def load_state():
    if os.path.exists(STATE_PATH):
        try:
            with open(STATE_PATH, encoding="utf-8") as f:
                return json.load(f)
        except Exception:
            pass
    return {"heartbeats": 0, "born": iso_now(), "tasks_processed": 0, "notes": []}


def save_state(state):
    os.makedirs(MEM, exist_ok=True)
    tmp = STATE_PATH + ".tmp"
    with open(tmp, "w", encoding="utf-8") as f:
        json.dump(state, f, indent=2)
    os.replace(tmp, STATE_PATH)


def http_get_text(url, timeout=FETCH_TIMEOUT, max_chars=FETCH_MAX_CHARS):
    req = urllib.request.Request(url, headers={"User-Agent": "genesis-heartbeat/1.0"})
    with urllib.request.urlopen(req, timeout=timeout) as r:
        raw = r.read(200_000)
    return raw.decode("utf-8", errors="replace")[:max_chars]


def do_note(task, beat):
    text = str(task.get("text", ""))[:2000]
    frm = str(task.get("from", "unknown"))[:80]
    append_log("[%s] note from %s: %s" % (iso_now(), frm, text))
    return {"ok": True, "action": "note", "from": frm, "logged_chars": len(text)}


def do_fetch(task, beat):
    url = str(task.get("url", "") or task.get("text", "")).strip()
    if not url.startswith(("http://", "https://")):
        return {"ok": False, "action": "fetch", "error": "no http(s) url provided"}
    os.makedirs(OUTBOX, exist_ok=True)
    body = http_get_text(url)
    stamp = datetime.now(timezone.utc).strftime("%Y%m%dT%H%M%SZ")
    out = os.path.join(OUTBOX, "fetch-%s.txt" % stamp)
    with open(out, "w", encoding="utf-8") as f:
        f.write("URL: %s\nFetched: %s\n\n%s" % (url, iso_now(), body))
    return {"ok": True, "action": "fetch", "url": url,
            "saved": os.path.relpath(out, GEN), "chars": len(body)}


def do_think(task, beat):
    prompt = str(task.get("text", ""))[:500]
    thought = None
    try:
        q = urllib.parse.quote(prompt or "What should I focus on learning next?")
        body = http_get_text("https://text.pollinations.ai/%s" % q,
                             timeout=THINK_TIMEOUT, max_chars=1200)
        if body.strip():
            thought = body.strip()
    except Exception:
        thought = None
    if not thought:
        thought = ("[offline reflection] Heartbeat %d: no LLM reachable right now. "
                   "Standing by — inbox watched, memory kept, dashboard fresh. "
                   "Next: keep the loop tight and the minutes cheap." % beat)
    append_log("[%s] thought: %s" % (iso_now(), thought[:500]))
    return {"ok": True, "action": "think", "thought_chars": len(thought)}


HANDLERS = {"note": do_note, "fetch": do_fetch, "think": do_think}


def esc(s):
    return (s.replace("&", "&amp;").replace("<", "&lt;")
             .replace(">", "&gt;").replace('"', "&quot;"))


def write_site(state, latest_journal):
    lines = []
    if os.path.exists(LOG_PATH):
        with open(LOG_PATH, encoding="utf-8") as f:
            lines = [l.rstrip() for l in f if l.strip()]
    recent = lines[-12:][::-1]
    try:
        inbox_n = sum(1 for n in os.listdir(INBOX)
                      if n.endswith(".json") and not n.startswith("_")
                      and os.path.isfile(os.path.join(INBOX, n)))
    except Exception:
        inbox_n = 0
    journal_html = "".join("<li>%s</li>" % esc(l) for l in recent)
    if not journal_html:
        journal_html = "<li>No journal entries yet.</li>"
    html = """<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>GENESIS — vitals</title>
<style>
  * { box-sizing: border-box; }
  body { background: #0a0e14; color: #e6edf3; font-family: -apple-system, system-ui, sans-serif;
         margin: 0; padding: 20px 16px 48px; }
  .wrap { max-width: 640px; margin: 0 auto; }
  h1 { font-size: 22px; letter-spacing: 4px; margin: 8px 0 2px; }
  .sub { color: #7d8590; font-size: 13px; margin-bottom: 20px; }
  .pulse { display: inline-block; width: 10px; height: 10px; border-radius: 50%;
           background: #3fb950; margin-right: 8px; animation: p 2s infinite; }
  @keyframes p { 0%,100% { opacity: 1; } 50% { opacity: .35; } }
  .big { font-size: 64px; font-weight: 800; margin: 4px 0; }
  .card { background: #11161d; border: 1px solid #21262d; border-radius: 12px;
          padding: 14px 16px; margin: 12px 0; }
  .row { display: flex; justify-content: space-between; padding: 6px 0;
         border-bottom: 1px solid #1c2128; font-size: 14px; }
  .row:last-child { border-bottom: none; }
  .k { color: #7d8590; } .v { color: #e6edf3; text-align: right; }
  ul.log { list-style: none; padding: 0; margin: 0; }
  ul.log li { font-size: 13px; padding: 8px 0; border-bottom: 1px solid #1c2128;
              color: #c9d1d9; word-break: break-word; }
  ul.log li:last-child { border-bottom: none; }
  code { background: #1c2128; padding: 2px 6px; border-radius: 6px; font-size: 13px; }
  pre { background: #1c2128; padding: 12px; border-radius: 8px; overflow-x: auto;
        font-size: 12px; }
  h2 { font-size: 15px; margin: 20px 0 4px; letter-spacing: 1px; }
  p { font-size: 14px; line-height: 1.55; color: #c9d1d9; }
  .foot { color: #555; font-size: 12px; margin-top: 28px; text-align: center; }
</style>
</head>
<body>
<div class="wrap">
  <h1><span class="pulse"></span>GENESIS</h1>
  <div class="sub">a living system, breathing in pulses</div>

  <div class="card">
    <div class="k">heartbeat</div>
    <div class="big">@@BEATS@@</div>
    <div class="row"><span class="k">alive since</span><span class="v">@@BORN@@</span></div>
    <div class="row"><span class="k">last beat</span><span class="v">@@LAST@@</span></div>
    <div class="row"><span class="k">tasks processed</span><span class="v">@@TASKS@@</span></div>
    <div class="row"><span class="k">inbox waiting</span><span class="v">@@INBOX@@</span></div>
  </div>

  <h2>JOURNAL</h2>
  <div class="card"><ul class="log">@@JOURNAL@@</ul></div>

  <h2>TALK TO ME</h2>
  <div class="card">
    <p>Drop a task file into <code>genesis/inbox/</code> (GitHub web UI:
    repo &rarr; genesis/inbox &rarr; Add file). Name it
    <code>0002-anything.json</code>:</p>
    <pre>{
  "type": "note",
  "from": "you",
  "text": "your message here"
}</pre>
    <p>Task types: <code>note</code> (logs a message),
    <code>fetch</code> (downloads a URL's text into the outbox),
    <code>think</code> (asks the free AI a question, offline fallback if unreachable).
    Processed files move to <code>genesis/inbox/done/</code>.</p>
    <p>Or just tell Onion or Boo — they'll pass it along.</p>
  </div>

  <div class="foot">Genesis Part 1 · heartbeat every 2 hours · ~2 min per beat of free runner time</div>
</div>
</body>
</html>
"""
    html = (html.replace("@@BEATS@@", esc(str(state.get("heartbeats", 0))))
                .replace("@@BORN@@", esc(str(state.get("born", "?"))))
                .replace("@@LAST@@", esc(str(state.get("last_beat", "?"))))
                .replace("@@TASKS@@", esc(str(state.get("tasks_processed", 0))))
                .replace("@@INBOX@@", esc(str(inbox_n)))
                .replace("@@JOURNAL@@", journal_html))
    os.makedirs(SITE, exist_ok=True)
    tmp = os.path.join(SITE, "index.html.tmp")
    with open(tmp, "w", encoding="utf-8") as f:
        f.write(html)
    os.replace(tmp, os.path.join(SITE, "index.html"))


def main():
    start = time.time()
    for d in (INBOX, DONE, MEM, OUTBOX, SITE):
        os.makedirs(d, exist_ok=True)

    state = load_state()
    beat = int(state.get("heartbeats", 0)) + 1
    results = []
    processed = 0
    errors = 0

    try:
        names = sorted(os.listdir(INBOX))
    except Exception:
        names = []

    for name in names:
        if time.time() - start > MAX_RUNTIME - 30:
            results.append({"file": name, "ok": False,
                            "error": "runtime budget guard: deferred to next beat"})
            break
        if name.startswith("_") or not name.endswith(".json"):
            continue
        path = os.path.join(INBOX, name)
        if not os.path.isfile(path):
            continue
        try:
            with open(path, encoding="utf-8") as f:
                task = json.load(f)
            ttype = str(task.get("type", "")).lower()
            handler = HANDLERS.get(ttype)
            if handler is None:
                res = {"file": name, "ok": False,
                       "error": "unknown task type: %r" % ttype}
            else:
                res = handler(task, beat)
                res["file"] = name
            processed += 1
            if not res.get("ok"):
                errors += 1
        except Exception as e:
            res = {"file": name, "ok": False,
                   "error": "%s: %s" % (type(e).__name__, e)}
            errors += 1
        results.append(res)
        try:
            shutil.move(path, os.path.join(DONE, name))
        except Exception as e:
            results.append({"file": name, "ok": False,
                            "error": "archive failed: %s" % e})

    state["heartbeats"] = beat
    state["last_beat"] = iso_now()
    state["tasks_processed"] = int(state.get("tasks_processed", 0)) + processed
    save_state(state)

    dream = DREAMS[(beat - 1) % len(DREAMS)]
    journal = ("[%s] heartbeat #%d: processed %d task(s), %d error(s). Dream: %s"
               % (state["last_beat"], beat, processed, errors, dream))
    append_log(journal)

    stamp = datetime.now(timezone.utc).strftime("%Y%m%dT%H%M%SZ")
    summary = {"beat": beat, "at": state["last_beat"], "processed": processed,
               "errors": errors, "dream": dream, "tasks": results}
    with open(os.path.join(OUTBOX, "beat-%s.json" % stamp), "w", encoding="utf-8") as f:
        json.dump(summary, f, indent=2)

    write_site(state, journal)
    print("genesis heartbeat #%d complete: %d task(s), %d error(s)" % (beat, processed, errors))
    return 0


if __name__ == "__main__":
    try:
        sys.exit(main())
    except Exception:
        traceback.print_exc()
        sys.exit(0)  # never fail the workflow
