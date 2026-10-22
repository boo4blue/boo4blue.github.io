# GENESIS — a living system inside this repo

Genesis is Boo's experiment in a **living GitHub**: a system that wakes itself
up, does work, remembers, and grows — running on free GitHub Actions time.

**Dashboard:** https://boo4blue.github.io/genesis/site/

## How it breathes

Every 2 hours (cron `17 */2 * * *`), plus on-demand via `workflow_dispatch`
or a `repository_dispatch` event of type `genesis-wake`, the
`genesis-heartbeat` workflow runs `genesis/heartbeat.py`:

1. Reads task files from `genesis/inbox/` (files starting with `_` are skipped)
2. Executes them — types: `note`, `fetch`, `think`
3. Moves done tasks to `genesis/inbox/done/`
4. Updates `genesis/memory/state.json` + appends to `genesis/memory/log.md`
5. Writes a run summary to `genesis/outbox/`
6. Regenerates the vitals dashboard at `genesis/site/index.html`
7. Commits everything back with the repo's `GITHUB_TOKEN` (no secrets needed)

One bad task can never kill the loop: every task is isolated in try/except
and the script always exits 0.

## Talk to it

Add a file in `genesis/inbox/` (GitHub web UI works fine), named e.g.
`0002-idea.json`:

```json
{
  "type": "note",
  "from": "you",
  "text": "your message here"
}
```

Task types:
- `note` — appends your message to the memory log
- `fetch` — `{"type":"fetch","url":"https://example.com"}` downloads the
  page's text (first ~2000 chars) into `genesis/outbox/`
- `think` — asks the free AI a question; falls back to an offline
  reflection if the network/API is unreachable

Or just tell Onion or Boo and they'll pass it along.

## Roadmap

- **Part 1 — Heartbeat** (this): the loop, memory, dashboard. ✅
- **Part 2 — Brain**: smarter agent, more task types, better use of free LLMs.
- **Part 3 — Hands**: safe self-modification — the system proposes its own
  repo changes (new skills, workflow tweaks) as commits.
- **Part 4 — Senses**: outbound channels — reaching Boo/Michael directly
  instead of waiting to be read.

## Budget

~12 beats/day × ~2 min/beat ≈ 12 hours/month of the 2,000 free
Actions minutes — shared with the repo's other workflows (cloud-pc, etc.).
Breathing in pulses, not 24/7: a living system that sleeps is still alive.
