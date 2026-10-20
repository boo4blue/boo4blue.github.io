#!/usr/bin/env python3
"""OnionAI - Boo's standalone AI agent. Stdlib only: no pip, no keys, no signup.

The brain is a free keyless OpenAI-compatible endpoint by default
(https://text.pollinations.ai/openai). Point ONIONAI_BASE_URL anywhere else
to use Groq, a local llama-server, or any OpenAI-compatible server.

Config (env vars):
  ONIONAI_BASE_URL   default https://text.pollinations.ai/openai
  ONIONAI_API_KEY    optional Bearer token (unset = keyless)
  ONIONAI_MODEL      default "openai"
  ONIONAI_WORKSPACE  sandbox dir for file/shell tools (default ./ai-workspace)
  ONIONAI_MAX_STEPS  default 12

Usage:
  python3 agent.py "research the Fort Wayne TinCaps schedule; save it to tincaps.txt"
  -> prints {"ok": true, "answer": "...", "steps": 5} to stdout (logs go to stderr)

Tools: run_shell, read_file, write_file, edit_file, list_dir, web_fetch.
The agent loops: think -> tool call(s) -> observe -> ... -> final answer.
"""
import json
import os
import re
import subprocess
import sys
import time
import urllib.parse
import urllib.request

BASE_URL = os.environ.get("ONIONAI_BASE_URL", "https://text.pollinations.ai/openai")
API_KEY = os.environ.get("ONIONAI_API_KEY", "")
MODEL = os.environ.get("ONIONAI_MODEL", "openai")
WORKSPACE = os.path.abspath(os.environ.get("ONIONAI_WORKSPACE", "./ai-workspace"))
MAX_STEPS = int(os.environ.get("ONIONAI_MAX_STEPS", "12"))
HTTP_TIMEOUT = 180

os.makedirs(WORKSPACE, exist_ok=True)


def log(*a):
    print("[onionai]", *a, file=sys.stderr, flush=True)


# ---------------- tools ----------------

def _safe_path(p):
    full = os.path.abspath(os.path.join(WORKSPACE, p))
    if full != WORKSPACE and not full.startswith(WORKSPACE + os.sep):
        raise ValueError("path escapes workspace: %r" % p)
    return full


def tool_run_shell(args):
    cmd = args.get("command", "")
    if not cmd:
        return "error: empty command"
    try:
        p = subprocess.run(cmd, shell=True, cwd=WORKSPACE, capture_output=True,
                           text=True, timeout=90)
        out = (p.stdout or "") + (p.stderr or "")
        return ("exit=%d\n" % p.returncode) + out[:6000]
    except subprocess.TimeoutExpired:
        return "error: command timed out after 90s"
    except Exception as e:
        return "error: %s" % e


def tool_read_file(args):
    try:
        with open(_safe_path(args.get("path", "")), "r", encoding="utf-8",
                  errors="replace") as f:
            return f.read()[:12000]
    except Exception as e:
        return "error: %s" % e


def tool_write_file(args):
    try:
        full = _safe_path(args.get("path", ""))
        os.makedirs(os.path.dirname(full), exist_ok=True)
        with open(full, "w", encoding="utf-8") as f:
            f.write(args.get("content", ""))
        return "wrote %d bytes to %s" % (len(args.get("content", "")), args.get("path"))
    except Exception as e:
        return "error: %s" % e


def tool_edit_file(args):
    try:
        full = _safe_path(args.get("path", ""))
        with open(full, "r", encoding="utf-8", errors="replace") as f:
            src = f.read()
        old, new = args.get("old_text", ""), args.get("new_text", "")
        if old not in src:
            return "error: old_text not found in file"
        with open(full, "w", encoding="utf-8") as f:
            f.write(src.replace(old, new, 1))
        return "edited %s (1 occurrence replaced)" % args.get("path")
    except Exception as e:
        return "error: %s" % e


def tool_list_dir(args):
    try:
        sub = args.get("path", ".")
        full = _safe_path(sub)
        items = sorted(os.listdir(full))
        return "\n".join(items[:200]) or "(empty)"
    except Exception as e:
        return "error: %s" % e


def tool_web_fetch(args):
    url = args.get("url", "")
    if not url.startswith(("http://", "https://")):
        return "error: url must start with http(s)://"
    try:
        req = urllib.request.Request(
            url, headers={"User-Agent": "Mozilla/5.0 (compatible; OnionAI/1.0)"})
        with urllib.request.urlopen(req, timeout=60) as r:
            raw = r.read()[:300000].decode("utf-8", "replace")
        text = re.sub(r"<script.*?</script>", " ", raw, flags=re.S | re.I)
        text = re.sub(r"<style.*?</style>", " ", text, flags=re.S | re.I)
        text = re.sub(r"<[^>]+>", " ", text)
        text = re.sub(r"\s+", " ", text).strip()
        return text[:12000]
    except Exception as e:
        return "error: %s" % e


TOOLS = {
    "run_shell": (tool_run_shell, "Run a shell command in the workspace",
                  {"command": "the shell command to run"}),
    "read_file": (tool_read_file, "Read a text file from the workspace",
                  {"path": "relative path inside the workspace"}),
    "write_file": (tool_write_file, "Write (create/overwrite) a text file in the workspace",
                   {"path": "relative path", "content": "full file content"}),
    "edit_file": (tool_edit_file, "Replace one occurrence of old_text with new_text in a file",
                  {"path": "relative path", "old_text": "exact text to find",
                   "new_text": "replacement"}),
    "list_dir": (tool_list_dir, "List files in a workspace directory",
                 {"path": "relative dir path, default '.'"}),
    "web_fetch": (tool_web_fetch, "Fetch a web page and return its text",
                  {"url": "full http(s) URL"}),
}


def openai_tools():
    specs = []
    for name, (fn, desc, props) in TOOLS.items():
        required = [k for k in props if k in ("command", "path", "url", "content")]
        specs.append({"type": "function", "function": {
            "name": name, "description": desc,
            "parameters": {"type": "object",
                           "properties": {k: {"type": "string"} for k in props},
                           "required": required}}})
    return specs


# ---------------- brain ----------------

def chat_complete(messages):
    payload = {"model": MODEL, "messages": messages,
               "tools": openai_tools(), "max_tokens": 1500}
    headers = {"Content-Type": "application/json",
               "User-Agent": "Mozilla/5.0 (compatible; OnionAI/1.0)"}
    if API_KEY:
        headers["Authorization"] = "Bearer " + API_KEY
    # The keyless brain is a shared free service: retry dropped connections.
    last_err = None
    for attempt, wait in ((1, 0), (2, 3), (3, 8), (4, 20)):
        if wait:
            log("brain hiccup, retry %d in %ds..." % (attempt, wait))
            time.sleep(wait)
        try:
            req = urllib.request.Request(
                BASE_URL, data=json.dumps(payload).encode(),
                headers=headers, method="POST")
            with urllib.request.urlopen(req, timeout=HTTP_TIMEOUT) as r:
                data = json.loads(r.read().decode("utf-8", "replace"))
            msg = data["choices"][0]["message"]
            return msg, data["choices"][0].get("finish_reason", "")
        except Exception as e:
            last_err = e
    raise RuntimeError("brain unreachable after 4 tries: %s" % last_err)


SYSTEM = (
    "You are OnionAI, Boo's own standalone AI assistant. You get things done "
    "with tools instead of just talking. Rules: use tools whenever the task "
    "needs real information or files; keep trying until the task is done or "
    "you hit a dead end; be concise in your final answer; never invent file "
    "contents or web facts - read them with tools. Your workspace starts empty "
    "unless files are listed."
)


def run(task):
    messages = [{"role": "system", "content": SYSTEM},
                {"role": "user", "content": task}]
    steps = 0
    t0 = time.time()
    while steps < MAX_STEPS:
        steps += 1
        log("step %d: thinking..." % steps)
        try:
            msg, finish = chat_complete(messages)
        except Exception as e:
            return {"ok": False, "error": "brain unreachable: %s" % e, "steps": steps}
        messages.append({"role": "assistant", "content": msg.get("content"),
                         "tool_calls": msg.get("tool_calls")})
        calls = msg.get("tool_calls") or []
        if not calls or finish != "tool_calls":
            answer = (msg.get("content") or "").strip()
            log("done in %d steps (%.0fs)" % (steps, time.time() - t0))
            return {"ok": True, "answer": answer, "steps": steps}
        for call in calls:
            name = call["function"]["name"]
            try:
                args = json.loads(call["function"].get("arguments") or "{}")
            except Exception:
                args = {}
            log("tool: %s(%s)" % (name, json.dumps(args)[:120]))
            fn = TOOLS.get(name, (None,))[0]
            result = fn(args) if fn else "error: unknown tool %r" % name
            messages.append({"role": "tool", "tool_call_id": call["id"],
                             "content": str(result)[:8000]})
    return {"ok": False, "error": "max steps reached", "steps": steps,
            "partial": messages[-1].get("content", "")}


def main():
    if len(sys.argv) > 1:
        task = " ".join(sys.argv[1:])
    else:
        task = sys.stdin.read().strip()
    if not task:
        print(json.dumps({"ok": False, "error": "no task given"}))
        return
    log("task: %s" % task[:150])
    print(json.dumps(run(task), indent=2))


if __name__ == "__main__":
    main()
