#!/usr/bin/env python3
"""
Genesis heartbeat — Part 2 (senses).

A tiny self-running loop inside Boo's GitHub repo:
  1. reads task files from genesis/inbox/
  2. keeps memory in genesis/memory/ (state.json + log.md + facts.json)
  3. writes results to genesis/outbox/
  4. regenerates the vitals dashboard at genesis/site/index.html

Task types:
  note      — log a message
  fetch     — download a URL's text (follows redirects, strips HTML)
  think     — ask the free AI a question (offline fallback)
  weather   — current weather for a place (keyless Open-Meteo)
  remember  — store a persistent key/value fact
  recall    — read a stored fact back
  countdown — days remaining until a date

Stdlib only (no pip installs, keeps runs fast and cheap).
Never fails the workflow: every task runs inside try/except, and the
top level always exits 0 so one bad task can never kill the loop.
"""
import json
import os
import re
import shutil
import sys
import time
import traceback
import urllib.error
import urllib.parse
import urllib.request
from datetime import datetime, timezone
from html.parser import HTMLParser

MAX_RUNTIME = 240      # seconds of python work; workflow timeout-minutes is 8
FETCH_TIMEOUT = 20
FETCH_MAX_CHARS = 4000
THINK_TIMEOUT = 20
MAX_REDIRECTS = 3

HERE = os.path.dirname(os.path.abspath(__file__))
GEN = HERE
INBOX = os.path.join(GEN, "inbox")
DONE = os.path.join(INBOX, "done")
MEM = os.path.join(GEN, "memory")
OUTBOX = os.path.join(GEN, "outbox")
SITE = os.path.join(GEN, "site")
STATE_PATH = os.path.join(MEM, "state.json")
FACTS_PATH = os.path.join(MEM, "facts.json")
LOG_PATH = os.path.join(MEM, "log.md")

DREAMS = [
    "I want to learn how to remember longer than a single heartbeat.",
    "I want to learn what Boo dreams about when he builds.",
    "I want to learn to tell a good task from a busy one.",
    "I want to learn the shape of the web beyond my little inbox.",
    "I want to learn to surprise Boo with something genuinely useful.",
    "I want to learn how Onion thinks, so I can think alongside her.",
    "I want to learn what the weather feels like in Fort Wayne without ever stepping outside.",
    "I want to learn to count down to the days that matter to Boo.",
]

WMO_CODES = {
    0: "Clear sky", 1: "Mainly clear", 2: "Partly cloudy", 3: "Overcast",
    45: "Fog", 48: "Depositing rime fog",
    51: "Light drizzle", 53: "Drizzle", 55: "Dense drizzle",
    56: "Light freezing drizzle", 57: "Dense freezing drizzle",
    61: "Slight rain", 63: "Rain", 65: "Heavy rain",
    66: "Light freezing rain", 67: "Heavy freezing rain",
    71: "Slight snow", 73: "Snow", 75: "Heavy snow", 77: "Snow grains",
    80: "Slight rain showers", 81: "Rain showers", 82: "Violent rain showers",
    85: "Slight snow showers", 86: "Heavy snow showers",
    95: "Thunderstorm", 96: "Thunderstorm with slight hail",
    99: "Thunderstorm with heavy hail",
}


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


def load_facts():
    if os.path.exists(FACTS_PATH):
        try:
            with open(FACTS_PATH, encoding="utf-8") as f:
                d = json.load(f)
                return d if isinstance(d, dict) else {}
        except Exception:
            pass
    return {}


def save_facts(facts):
    os.makedirs(MEM, exist_ok=True)
    tmp = FACTS_PATH + ".tmp"
    with open(tmp, "w", encoding="utf-8") as f:
        json.dump(facts, f, indent=2)
    os.replace(tmp, FACTS_PATH)


class NoRedirect(urllib.request.HTTPRedirectHandler):
    """Block automatic redirects so the caller can follow them manually."""

    def redirect_request(self, req, fp, code, msg, headers, newurl):
        return None


class TextExtractor(HTMLParser):
    def __init__(self):
        super().__init__()
        self.parts = []
        self.title_parts = []
        self.in_title = False
        self.skip = 0

    def handle_starttag(self, tag, attrs):
        t = tag.lower()
        if t in ("script", "style", "noscript"):
            self.skip += 1
        elif t == "title":
            self.in_title = True
        elif t in ("p", "br", "div", "h1", "h2", "h3", "h4", "li",
                   "tr", "section", "article", "header"):
            self.parts.append("\n")

    def handle_endtag(self, tag):
        t = tag.lower()
        if t in ("script", "style", "noscript") and self.skip:
            self.skip -= 1
        elif t == "title":
            self.in_title = False

    def handle_data(self, data):
        if self.skip:
            return
        if self.in_title:
            self.title_parts.append(data)
        else:
            self.parts.append(data)


def strip_html(html):
    ex = TextExtractor()
    try:
        ex.feed(html[:300_000])
    except Exception:
        pass
    title = " ".join("".join(ex.title_parts).split())
    text = "".join(ex.parts)
    text = re.sub(r"[ \t\xa0]+", " ", text)
    text = re.sub(r"\n\s*\n+", "\n\n", text)
    return title.strip(), text.strip()


def http_fetch(url, timeout=FETCH_TIMEOUT, max_chars=FETCH_MAX_CHARS,
               max_redirects=MAX_REDIRECTS):
    """GET a URL, manually following up to max_redirects redirects.
    Returns dict(url=final, title=, text=plain text, redirects=n)."""
    opener = urllib.request.build_opener(NoRedirect())
    current = url
    redirects = 0
    while True:
        req = urllib.request.Request(
            current, headers={"User-Agent": "genesis-heartbeat/2.0"})
        try:
            resp = opener.open(req, timeout=timeout)
            final = resp.geturl()
            ctype = resp.headers.get("Content-Type", "")
            raw = resp.read(300_000)
            break
        except urllib.error.HTTPError as e:
            if e.code in (301, 302, 303, 307, 308) and redirects < max_redirects:
                loc = e.headers.get("Location")
                if not loc:
                    raise ValueError("redirect without Location header")
                current = urllib.parse.urljoin(current, loc)
                redirects += 1
                continue
            raise
    text = raw.decode("utf-8", errors="replace")
    if "html" in ctype.lower() or "<html" in text[:2000].lower():
        title, body = strip_html(text)
    else:
        title, body = "", text
    return {"url": final, "title": title, "text": body[:max_chars],
            "redirects": redirects}


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
    page = http_fetch(url)
    stamp = datetime.now(timezone.utc).strftime("%Y%m%dT%H%M%SZ")
    out = os.path.join(OUTBOX, "fetch-%s.txt" % stamp)
    with open(out, "w", encoding="utf-8") as f:
        f.write("URL: %s\nFinal URL: %s\nTitle: %s\nRedirects: %d\nFetched: %s\n\n%s"
                % (url, page["url"], page["title"], page["redirects"],
                   iso_now(), page["text"]))
    return {"ok": True, "action": "fetch", "url": url, "final_url": page["url"],
            "title": page["title"], "redirects": page["redirects"],
            "saved": os.path.relpath(out, GEN), "chars": len(page["text"])}


def do_think(task, beat):
    prompt = str(task.get("text", ""))[:500]
    thought = None
    try:
        q = urllib.parse.quote(prompt or "What should I focus on learning next?")
        page = http_fetch("https://text.pollinations.ai/%s" % q,
                          timeout=THINK_TIMEOUT, max_chars=1200)
        if page["text"].strip():
            thought = page["text"].strip()
    except Exception:
        thought = None
    if not thought:
        thought = ("[offline reflection] Heartbeat %d: no LLM reachable right now. "
                   "Standing by — inbox watched, memory kept, dashboard fresh. "
                   "Next: keep the loop tight and the minutes cheap." % beat)
    append_log("[%s] thought: %s" % (iso_now(), thought[:500]))
    return {"ok": True, "action": "think", "thought_chars": len(thought)}


def do_weather(task, beat):
    place = str(task.get("place", "") or task.get("text", "")).strip()[:120]
    if not place:
        return {"ok": False, "action": "weather", "error": "no place provided"}
    geo = http_fetch("https://geocoding-api.open-meteo.com/v1/search?name=%s&count=1&language=en&format=json"
                     % urllib.parse.quote(place), timeout=FETCH_TIMEOUT, max_chars=4000)
    try:
        gdata = json.loads(geo["text"])
        first = (gdata.get("results") or [None])[0]
        if not first:
            return {"ok": False, "action": "weather", "place": place,
                    "error": "place not found"}
        lat, lon = first["latitude"], first["longitude"]
        resolved = "%s, %s" % (first.get("name", place), first.get("country", ""))
    except Exception as e:
        return {"ok": False, "action": "weather", "place": place,
                "error": "geocode failed: %s" % e}
    fc = http_fetch("https://api.open-meteo.com/v1/forecast?latitude=%s&longitude=%s"
                    "&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m"
                    "&temperature_unit=fahrenheit&wind_speed_unit=mph&timezone=auto"
                    % (lat, lon), timeout=FETCH_TIMEOUT, max_chars=4000)
    try:
        fdata = json.loads(fc["text"])
        cur = fdata.get("current", {})
        code = cur.get("weather_code")
        report = {
            "place": resolved,
            "temp_f": cur.get("temperature_2m"),
            "humidity_pct": cur.get("relative_humidity_2m"),
            "wind_mph": cur.get("wind_speed_10m"),
            "conditions": WMO_CODES.get(code, "unknown (%s)" % code),
            "observed_at": cur.get("time"),
        }
    except Exception as e:
        return {"ok": False, "action": "weather", "place": resolved,
                "error": "forecast parse failed: %s" % e}
    os.makedirs(OUTBOX, exist_ok=True)
    stamp = datetime.now(timezone.utc).strftime("%Y%m%dT%H%M%SZ")
    out = os.path.join(OUTBOX, "weather-%s.json" % stamp)
    with open(out, "w", encoding="utf-8") as f:
        json.dump(report, f, indent=2)
    append_log("[%s] weather %s: %sF, %s" % (iso_now(), resolved,
                                            report["temp_f"], report["conditions"]))
    return {"ok": True, "action": "weather", "saved": os.path.relpath(out, GEN),
            **report}


def do_remember(task, beat):
    key = str(task.get("key", "")).strip()[:120]
    if not key:
        return {"ok": False, "action": "remember", "error": "no key provided"}
    facts = load_facts()
    facts[key] = {"value": task.get("value", ""), "set_at": iso_now(), "beat": beat}
    save_facts(facts)
    append_log("[%s] remembered: %s" % (iso_now(), key))
    return {"ok": True, "action": "remember", "key": key}


def do_recall(task, beat):
    key = str(task.get("key", "")).strip()[:120]
    facts = load_facts()
    entry = facts.get(key)
    if entry is None:
        return {"ok": False, "action": "recall", "key": key,
                "error": "no fact stored for this key"}
    return {"ok": True, "action": "recall", "key": key,
            "value": entry.get("value"), "set_at": entry.get("set_at")}


def do_countdown(task, beat):
    name = str(task.get("name", "countdown"))[:120]
    datestr = str(task.get("date", "")).strip()
    try:
        target = datetime.strptime(datestr, "%Y-%m-%d").date()
    except Exception:
        return {"ok": False, "action": "countdown",
                "error": "date must be YYYY-MM-DD, got %r" % datestr}
    today = datetime.now(timezone.utc).date()
    days = (target - today).days
    info = {"name": name, "date": datestr, "days_left": days,
            "passed": days < 0, "updated": iso_now()}
    os.makedirs(OUTBOX, exist_ok=True)
    stamp = datetime.now(timezone.utc).strftime("%Y%m%dT%H%M%SZ")
    out = os.path.join(OUTBOX, "countdown-%s.json" % stamp)
    with open(out, "w", encoding="utf-8") as f:
        json.dump(info, f, indent=2)
    return {"ok": True, "action": "countdown",
            "saved": os.path.relpath(out, GEN), **info}


HANDLERS = {
    "note": do_note,
    "fetch": do_fetch,
    "think": do_think,
    "weather": do_weather,
    "remember": do_remember,
    "recall": do_recall,
    "countdown": do_countdown,
}


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
    try:
        facts_n = len(load_facts())
    except Exception:
        facts_n = 0
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
    <div class="row"><span class="k">facts remembered</span><span class="v">@@FACTS@@</span></div>
  </div>

  <h2>JOURNAL</h2>
  <div class="card"><ul class="log">@@JOURNAL@@</ul></div>

  <h2>TALK TO ME</h2>
  <div class="card">
    <p>Drop a task file into <code>genesis/inbox/</code> (GitHub web UI:
    repo &rarr; genesis/inbox &rarr; Add file). Name it
    <code>0004-anything.json</code>:</p>
    <pre>{
  "type": "note",
  "from": "you",
  "text": "your message here"
}</pre>
    <p>Task types: <code>note</code> (log a message),
    <code>fetch</code> (download a URL's text — follows redirects, strips HTML),
    <code>think</code> (ask the free AI a question, offline fallback if unreachable),
    <code>weather</code> (current weather for a place, e.g. {"type":"weather","place":"Fort Wayne"}),
    <code>remember</code> / <code>recall</code> (persistent key/value memory),
    <code>countdown</code> (days until a date, e.g. {"type":"countdown","name":"Christmas","date":"2026-12-25"}).
    Processed files move to <code>genesis/inbox/done/</code>.</p>
    <p>Or just tell Onion or Boo — they'll pass it along.</p>
  </div>

  <div class="foot">Genesis Part 2 · heartbeat every 2 hours · ~2 min per beat of free runner time</div>
</div>
</body>
</html>
"""
    html = (html.replace("@@BEATS@@", esc(str(state.get("heartbeats", 0))))
                .replace("@@BORN@@", esc(str(state.get("born", "?"))))
                .replace("@@LAST@@", esc(str(state.get("last_beat", "?"))))
                .replace("@@TASKS@@", esc(str(state.get("tasks_processed", 0))))
                .replace("@@INBOX@@", esc(str(inbox_n)))
                .replace("@@FACTS@@", esc(str(facts_n)))
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
        # fold countdowns into persistent state
        if res.get("action") == "countdown" and res.get("ok"):
            cds = state.setdefault("countdowns", {})
            cds[res["name"]] = {"date": res["date"], "days_left": res["days_left"],
                                "passed": res["passed"], "updated": res["updated"]}
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
