#!/usr/bin/env python3
"""Cloud PC job runner - Boo's virtual PC. Stdlib only.

A job is JSON: {"id": "abc", "action": "shell|fetch|agent|store", ...}
Reads one job from a file path (argv[1]) or stdin. Writes the result to
cloud-pc/outbox/<id>.json. The "disk" is cloud-pc/storage/ (persisted via git).

Actions:
  shell  {"command": "..."}            run a command, capture output
  fetch  {"url": "...", "dest": "f"}   download a file into storage/
  agent  {"task": "..."}               run the OnionAI agent on a task
  store  {"path": "a/b.txt", "content": "..."}  save a file into storage/
"""
import json
import os
import subprocess
import sys
import time
import urllib.request

HERE = os.path.dirname(os.path.abspath(__file__))
STORAGE = os.path.join(HERE, "storage")
OUTBOX = os.path.join(HERE, "outbox")
AGENT = os.path.abspath(os.path.join(HERE, "..", "onion-ai", "agent.py"))
os.makedirs(STORAGE, exist_ok=True)
os.makedirs(OUTBOX, exist_ok=True)


def log(*a):
    print("[cloudpc]", *a, file=sys.stderr, flush=True)


def _safe(rel):
    full = os.path.abspath(os.path.join(STORAGE, rel))
    if full != STORAGE and not full.startswith(STORAGE + os.sep):
        raise ValueError("path escapes storage")
    return full


def do_shell(job):
    cmd = job.get("command", "")
    try:
        p = subprocess.run(cmd, shell=True, cwd=STORAGE, capture_output=True,
                           text=True, timeout=600)
        return {"ok": True, "exit": p.returncode,
                "stdout": (p.stdout or "")[:20000],
                "stderr": (p.stderr or "")[:8000]}
    except subprocess.TimeoutExpired:
        return {"ok": False, "error": "command timed out after 10 min"}
    except Exception as e:
        return {"ok": False, "error": str(e)}


def do_fetch(job):
    url, dest = job.get("url", ""), job.get("dest", "")
    if not url.startswith(("http://", "https://")) or not dest:
        return {"ok": False, "error": "need url + dest"}
    try:
        full = _safe(dest)
        os.makedirs(os.path.dirname(full), exist_ok=True)
        req = urllib.request.Request(
            url, headers={"User-Agent": "Mozilla/5.0 (compatible; CloudPC/1.0)"})
        total = 0
        with urllib.request.urlopen(req, timeout=120) as r, open(full, "wb") as f:
            while True:
                chunk = r.read(1 << 20)
                if not chunk:
                    break
                total += len(chunk)
                if total > 9 * (1 << 30):
                    raise ValueError("file exceeds 9GB cap")
                f.write(chunk)
        return {"ok": True, "path": dest, "bytes": total}
    except Exception as e:
        return {"ok": False, "error": str(e)}


def do_agent(job):
    task = job.get("task", "")
    if not task:
        return {"ok": False, "error": "need task"}
    try:
        env = dict(os.environ, ONIONAI_WORKSPACE=os.path.join(STORAGE, ".agent-ws"))
        p = subprocess.run([sys.executable, AGENT, task], capture_output=True,
                           text=True, timeout=2400, env=env, cwd=HERE)
        try:
            return {"ok": True, "agent": json.loads(p.stdout)}
        except Exception:
            return {"ok": False, "error": "agent bad output",
                    "stdout": p.stdout[:2000], "stderr": p.stderr[:2000]}
    except subprocess.TimeoutExpired:
        return {"ok": False, "error": "agent timed out after 40 min"}
    except Exception as e:
        return {"ok": False, "error": str(e)}


def do_store(job):
    try:
        full = _safe(job.get("path", ""))
        os.makedirs(os.path.dirname(full), exist_ok=True)
        content = job.get("content", "")
        with open(full, "w", encoding="utf-8") as f:
            f.write(content)
        return {"ok": True, "path": job.get("path"), "bytes": len(content)}
    except Exception as e:
        return {"ok": False, "error": str(e)}


ACTIONS = {"shell": do_shell, "fetch": do_fetch, "agent": do_agent,
           "store": do_store}


def main():
    if len(sys.argv) > 1:
        job = json.load(open(sys.argv[1]))
    else:
        job = json.loads(sys.stdin.read() or "{}")
    jid = job.get("id") or ("job-%d" % int(time.time()))
    action = job.get("action", "")
    log("job %s action=%s" % (jid, action))
    fn = ACTIONS.get(action)
    result = fn(job) if fn else {"ok": False,
                                "error": "unknown action %r" % action}
    out = {"id": jid, "action": action, "at": time.strftime("%Y-%m-%dT%H:%M:%SZ",
           time.gmtime()), "job": {k: v for k, v in job.items() if k != "content"},
           "result": result}
    if action == "store":
        out["job"]["content_bytes"] = len(job.get("content", ""))
    dest = os.path.join(OUTBOX, jid + ".json")
    json.dump(out, open(dest, "w"), indent=2)
    print(dest)


if __name__ == "__main__":
    main()
