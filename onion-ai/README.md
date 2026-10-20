# OnionAI — Boo's own standalone AI

Your own AI assistant, like Muse, that lives OUTSIDE Muse. I (Onion) can use
it, but it doesn't run on me — it's yours: your repo, your runs, your files.

**100% free. No signup. No API keys. No card.** The brain is a free keyless
model; the muscle is GitHub's free compute.

## What's here

- `agent.py` — the agent. Stdlib Python only (no pip packages). Reads a task,
  thinks, calls tools (shell, files, web), and finishes the job. Brain is
  configured by env vars; default is the free keyless endpoint.
- `workflow.yml` — the GitHub Actions runner. **Staged here because GitHub
  doesn't let bots write to `.github/`. One-time manual step below.**
- `queue/` — drop a task file here: `{"id": "t1", "task": "do X"}`
- `results/` — answers land here as `<id>.json` (+ `<id>.log` with the play-by-play)

## One-time activation (2 minutes, phone-friendly)

1. Open the repo in GitHub (app or browser) → **Actions tab** → if it asks,
   enable workflows.
2. Go to the file list → **Add file → Create new file** → name it exactly:
   `.github/workflows/onion-ai.yml`
3. Open `onion-ai/workflow.yml` in this repo, copy ALL of it, paste into the
   new file → **Commit**. Done — the agent is live.

## Use it

- **From the Actions tab:** Run workflow → type your task → watch it work →
  read `onion-ai/results/<id>.json`.
- **From chat:** tell Onion "ask my AI: ..." — Onion queues the file, the
  runner picks it up, the answer lands in `results/`.
- **From anywhere:** push `{"id": "...", "task": "..."}` to
  `onion-ai/queue/` and push — the workflow fires on its own.

## Point it at your own box later

When you have the VPS, on the box run `llama-server` (see
`../vpswala-setup/setup.sh`), then set in the workflow env:
`ONIONAI_BASE_URL: http://your-box-ip:8080/v1` and `ONIONAI_MODEL` to your
model name. Same agent, your hardware, zero APIs.

## Honest limits

- GitHub free = 2,000 Actions minutes/month. A task takes ~3-10 min, so that's
  roughly 200-600 tasks a month. Plenty for real use.
- One run caps at 50 minutes; the agent caps at 12 tool steps per task.
- The keyless brain is a shared free service: occasionally slow or busy.
  If it ever degrades, set `ONIONAI_API_KEY` (Pollinations or Groq key) as a
  repo secret and add it to the workflow env.
- Ephemeral runners: `ai-workspace/` starts empty every run. The agent
  `write_file`s anything it must keep into `onion-ai/results/` (committed).
