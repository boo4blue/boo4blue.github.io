#!/usr/bin/env python3
"""Keeper - keeps the Onion TV stream chain alive with ZERO Muse involvement.

Runs on GitHub Actions (see keeper.yml) on GitHub's own runners, so it works
even when Muse is out of credits and completely offline.

How the chain works (unchanged): a "watch" job
({"action":"shell","command":"bash own-host/run-server-gate.sh",...}) run
through cloud-pc/pc.py starts a fresh ~50-minute stream session, which
writes its tunnels + a landing timestamp into
cloud-pc/storage/own-host/live/combo-results.json ("at" = epoch seconds).

The keeper's whole job, every pass:
  1. Read combo-results.json "at". If the newest session landed more than
     STALE_S ago and the keeper has not dispatched within COOLDOWN_S, hand
     the next watch job to the keeper workflow's "session" job (via
     GITHUB_OUTPUT) so it runs the gate script exactly like the Cloud PC
     workflow does. The old inbox watch files are spent litter (their runs
     were killed at the 50-minute cap before cleanup) and are ignored.
  2. Record a heartbeat + last decision in keeper-state.json and in
     keeper-dispatch.json so any human or AI can see the keeper is alive.

It never touches the router, never changes stream bases, never spends
anything. It only starts the same session job the chain already uses.
"""
import json
import os
import sys
import time

RESULTS = "cloud-pc/storage/own-host/live/combo-results.json"
STATE = "cloud-pc/storage/own-host/live/keeper-state.json"
FLAG = "cloud-pc/storage/own-host/live/keeper-dispatch.json"
STALE_S = 30 * 60        # dispatch a fresh session when the last landing is older than this
COOLDOWN_S = 25 * 60     # never dispatch twice inside this window


def log(*parts):
    print("[keeper]", *parts, flush=True)


def load_json(path, default):
    try:
        with open(path) as f:
            return json.load(f)
    except Exception as e:
        log("read failed", path, repr(e))
        return default


def save_json(path, data):
    os.makedirs(os.path.dirname(path), exist_ok=True)
    tmp = path + ".tmp"
    with open(tmp, "w") as f:
        json.dump(data, f, indent=1)
    os.replace(tmp, path)


def main():
    now = int(time.time())
    state = load_json(STATE, {"nextWatch": 20, "lastDispatch": 0, "lastCheck": 0, "checks": 0, "dispatches": 0})
    state["lastCheck"] = now
    state["checks"] = int(state.get("checks", 0)) + 1

    results = load_json(RESULTS, {})
    landed_at = int(results.get("at", 0) or 0)
    age = now - landed_at if landed_at else 10 ** 9
    since_dispatch = now - int(state.get("lastDispatch", 0) or 0)
    log(f"now={now} landed_at={landed_at} session_age={age}s since_last_dispatch={since_dispatch}s "
        f"nextWatch={state.get('nextWatch')} own_state={results.get('own', {}).get('state')}")

    job = None
    if age > STALE_S and since_dispatch > COOLDOWN_S:
        n = int(state.get("nextWatch", 20))
        wid = f"00-host-aaa-watch{n}"
        job = {"action": "shell", "command": "bash own-host/run-server-gate.sh", "id": wid}
        state["lastDispatch"] = now
        state["nextWatch"] = n + 1
        state["dispatches"] = int(state.get("dispatches", 0)) + 1
        log(f"STALE chain (age {age}s > {STALE_S}s): dispatching {wid}")
    else:
        log(f"chain healthy (age {age}s <= {STALE_S}s) or in cooldown ({since_dispatch}s); no dispatch")

    save_json(FLAG, {"at": now, "job": job})
    save_json(STATE, state)
    log("state saved:", json.dumps(state))

    out = os.environ.get("GITHUB_OUTPUT")
    if out:
        with open(out, "a") as f:
            if job:
                f.write("dispatch=true\n")
                f.write("job_json=" + json.dumps(job) + "\n")
            else:
                f.write("dispatch=false\n")
        log("GITHUB_OUTPUT written, dispatch =", bool(job))
    return 0


if __name__ == "__main__":
    sys.exit(main())
