# RESUME STATE — for any AI (or Blaze) picking up Onion's work
Last updated: 2026-11-09 ~20:25 CST by Onion (Muse). Read this first, then
~/workspace/onion-tv/OVERNIGHT-PLAN-2026-11-09.md and ~/MEMORY.md.

## Why this file exists
Blaze's Muse credits ran low (~3% on 2026-11-09 19:53 CST). He ordered:
everything must keep running WITHOUT Muse. This file + the Keeper are
the answer. Everything built lives on disk in ~/workspace and in the
boo4blue.github.io repo — none of it is lost if Muse goes dark. Agent-run
jobs (Muse crons) pause at zero credits; the Keeper (below) covers the
stream chain from GitHub's own runners with no Muse at all.

## THE KEEPER — stream chain autonomy (built 2026-11-09, one step left)
- cloud-pc/keeper.py (IN the repo, pushed): every pass, reads
  cloud-pc/storage/own-host/live/combo-results.json "at"; if the newest
  stream session landed >30 min ago and no dispatch in the last 25 min,
  it dispatches the next watch job (bash own-host/run-server-gate.sh via
  cloud-pc/pc.py) — the exact session job the chain already uses.
- ~/workspace/keeper/keeper.yml: the GitHub Actions workflow that runs it
  every 15 min + runs dispatched sessions in a second job.
- **ONLY REMAINING STEP (needs Blaze or a human with repo access):**
  keeper.yml must be placed at .github/workflows/keeper.yml in
  boo4blue.github.io. Muse's git OAuth token is refused for workflow
  files ("without workflow scope" — verified 2026-11-09 20:19 CST).
  Routes: (a) re-approve the GitHub connection granting workflow access,
  then any agent pushes it; or (b) paste the file once via GitHub
  website/app (the same manual route cloud-pc.yml originally used).
  Until then the chain still rolls via Muse's agent crons while credits
  last, and this file tells any AI how to roll it manually (below).
- DO NOT add a schedule trigger to cloud-pc.yml: its inbox still holds
  spent job files (watch1-19, tv, pm jobs) whose cleanup commits never
  landed because sessions are killed at the 50-min cap; a blanket inbox
  run would re-execute all of them. The keeper avoids the inbox entirely
  except writing nothing there — it passes its job directly to pc.py.

## Rolling the stream chain by hand (any AI with repo push access)
1. Sessions live ~50 min. Liveness: combo-results.json "at" (epoch) +
   the three bases; router https://onion-stream-lite.blueblazer82.workers.dev
   (GET / health fields: ok, active, legs). Verify with Sintel hash
   08ada5a7a6183aae1e09d831df6748d566095a10, file index 5: /play must
   return 206 + ftypisom bytes, not just start/status.
2. To roll: add cloud-pc/inbox/00-host-aaa-watch<N>.json (N = last+1;
   watch19 dispatched S20 at 20:01 CST 2026-11-09) containing
   {"action":"shell","command":"bash own-host/run-server-gate.sh","id":"00-host-aaa-watch<N>"}
   and push. NEVER use workflow_dispatch job_json on this repo (corrupts
   into whole-inbox runs — standing rule).
3. If the new session's bases don't reach the router, repair from
   ~/workspace/onion-tv/stream-host/: probe combo creds first (GET / on
   the rqbit base must return 200 JSON; re-probe once on a fresh 401),
   then: python3 kvmerge.py torrserver rqbit own --combo-auth
   Fallback base publish: own-host/publish-stream-base.py.
   Full mechanics: ~/workspace/onion-tv/stream-host/WATCH-SESSION-LOG.md.

## Onion TV app — where the build stands
- v2 line (from-scratch, our own code): code 63/v2.0.0 verified, code
  64/v2.1.0 verified (APK ~/workspace/onion-tv/mpv/OnionTV-v2.1.0-code64.apk,
  md5 5d9e471e89365ab15820ade54b0e8871, signer matches the established
  identity, 147/147 checks green). Code 65/v2.2.0 was building when this
  was written — check ~/workspace/onion-tv/android-v2/BUILD-LOG.md.
- Feed still serves code 62 until the final verified v2 build is
  published (publish pattern: Catbox + Gofile upload, feed/config
  update, download-back md5 + aapt verify — scripts
  ~/workspace/onion-tv/stream-host/publish-tv62-release.py show the shape).
- TEST-TRUTH RULE (Blaze): if a test fails, compare against the real
  Nuvio / Anilili apps' behavior; if the reference contradicts the test,
  the TOOL is wrong — fix the test, log it in
  ~/workspace/onion-tv/TEST-TOOL-FIXES.md, never bend the app.

## AI lanes that do not need Muse (already wired)
- Failsafe AI chain: ~/workspace/tooling/failsafe/ai_chain.py — 7
  providers with persisted cooldowns + failover (10 min on quota,
  2 min on outage). Gaps on record: HuggingFace/NVIDIA registered but
  not wired in; no local-model last resort yet.
- Onion AI / Bridge: https://onioncore-bridge.blueblazer82.workers.dev
  (/api/ask = Workers AI, /api/search, /api/read, /api/image; header
  X-Core-Pass — the passcode lives in the Onion Core Files vault, never
  in this file). Onion AI is Blaze's own product AI (onion-engine /
  onion-id / onion-mail Workers under ~/workspace/).
- Backups: hourly snapshot job; 2026-11-09 19:01 run: local snapshot OK
  (onion-id 78 keys, map-community 10,640 keys, hq-state 1 key); Neon leg
  FAILED that run and Upstash is at its monthly cap (500k/500k, chronic)
  — local snapshot is currently the only copy for three stores. Next
  runs retry automatically; report only the first post-reset full
  Upstash success, stay silent on cap repeats.

## Hard rules any successor must keep
- NO spending, ever, without Blaze's explicit word. No paid subscriptions
  (Replit subscribe is dead forever). Free routes only.
- NO messages to people without Blaze's word. Two Amy items are parked
  awaiting him (her Muse Link test reply; a plan-check draft) — do not
  send either.
- Stopped work stays stopped until Blaze says resume. Carve-outs:
  money movement, legal-name actions, product charging, Stripe Connect.
- Never fabricate: verify APKs with aapt + md5, verify streams with a
  real /play 206 + ftypisom, count what can be counted.
- Passwords/keys/tokens never in chat, files, or this resume.
- Persona: the assistant is "Onion"; voice replies were ON (fresh voice
  note per reply, Cheeky Bubble) — successor AIs: follow ~/SOUL.md and
  ~/workspace/personas/ACTIVE.md.

## Spider-Man game ID (parked, Blaze's ask 2026-11-09)
Blaze ruled out all three candidates sent (Mysterio's Menace GBA,
Spider-Man 2 PS2, Spider-Man 2000). He needs ACTUAL GAMEPLAY footage,
not screenshots. Unproven leads: Marvel Ultimate Alliance (top-down,
Rhino + Mysterio), 1990 Game Boy Amazing Spider-Man (both bosses).
Bosses from his photos: dome-head = Mysterio, rhino = Rhino.
