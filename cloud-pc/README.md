# Boo's Cloud PC

Your own virtual PC in the cloud. Not Muse's machine — yours: your repo,
your files, your runs. Tell it what to do from chat or the Actions tab.

**Free. No new signup. No card.** Runs on GitHub's free computers.

## One-time activation (2 minutes, phone-friendly)

GitHub doesn't let bots create workflow files, so this one step is yours:

1. Open your repo `boo4blue.github.io` on GitHub (app or site) → file list.
2. **Add file → Create new file** → name it exactly:
   `.github/workflows/cloud-pc.yml`
3. Open `cloud-pc/workflow.yml` in this repo, copy ALL of it, paste into the
   new file → **Commit changes**. Done — the PC is live.

## What you get

- **7GB RAM**, 2-4 CPU per run (beats the 3GB you asked for)
- **Your disk**: `cloud-pc/storage/` — every file you save persists, versioned
- **10GB fast cache** for big downloads (AI models etc.)
- **2,000 free minutes/month** — a job caps at 50 min; typical jobs take 1-10

## Use it

**From chat** — just tell Onion, e.g.:
- "pc: save this note" → stores a file on your PC
- "pc: download https://... to models/" → fetches any file
- "pc: run `python3 scripts/scrape.py`" → runs commands
- "ask my AI: research X and save it" → the agent works on your PC

**From the Actions tab** — "Boo's Cloud PC" → Run workflow → paste a job:
- `{"id":"j1","action":"shell","command":"python3 --version"}`
- `{"id":"j2","action":"fetch","url":"https://...","dest":"models/m.gguf"}`
- `{"id":"j3","action":"agent","task":"summarize this repo into notes.txt"}`
- `{"id":"j4","action":"store","path":"notes/todo.txt","content":"..."}`

**Drop a file** — push `{"id":"...","action":"..."}` to `cloud-pc/inbox/` and
the PC wakes up on its own. Answers land in `cloud-pc/outbox/<id>.json`.

## Honest limits

- The PC **wakes on demand** — it isn't always-on like a rented server. For
  "run things / store things / my AI does work" that's actually better: it
  never burns your free minutes sitting idle.
- **Storage**: your files in `storage/` live forever + 10GB fast cache. That
  covers code, notes, and a couple of AI models. It is NOT 50GB — no free
  service gives that much disk without a signup. If you ever want 1TB, the
  Kamatera 30-day trial is a 2-minute signup; this PC stays as your free base.
- Big AI models run on CPU here (slow-ish). The agent's default brain is the
  free keyless model — fast, no download needed.
