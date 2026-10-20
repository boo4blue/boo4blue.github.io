#!/usr/bin/env python3
"""Onion Cloud daily digest. Stdlib only."""
import json
import os
import datetime
import urllib.request

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DATA = os.path.join(ROOT, "site", "data")
os.makedirs(DATA, exist_ok=True)


def fetch(url, timeout=60):
    req = urllib.request.Request(url, headers={"User-Agent": "OnionCloud/1.0"})
    with urllib.request.urlopen(req, timeout=timeout) as r:
        return r.read().decode("utf-8", "replace")


def main():
    now = datetime.datetime.now(datetime.timezone.utc)
    digest = {"date": now.date().isoformat(), "built_at": now.isoformat()}
    try:
        url = ("https://api.open-meteo.com/v1/forecast?latitude=41.0793&longitude=-85.1394"
               "&daily=temperature_2m_max,temperature_2m_min,weathercode&temperature_unit=fahrenheit"
               "&timezone=America%2FIndiana%2FIndianapolis&forecast_days=3")
        digest["weather"] = json.loads(fetch(url))["daily"]
    except Exception as e:
        digest["weather_error"] = str(e)
    try:
        idx = json.load(open(os.path.join(DATA, "index.json")))
        digest["tasks_completed"] = len(idx)
        digest["tasks_ok"] = sum(1 for t in idx if t.get("ok"))
    except Exception:
        digest["tasks_completed"] = 0
    with open(os.path.join(DATA, "digest.json"), "w") as f:
        json.dump(digest, f, indent=2)
    print("digest written for", digest["date"])


main()
