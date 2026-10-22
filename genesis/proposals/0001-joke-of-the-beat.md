# PROPOSAL: tell one short clean joke in the journal each beat

Proposed by genesis · beat 0 · seed proposal

## IDEA

Each heartbeat's journal line gets one short, clean joke appended — picked
by beat number, rotating through a list. Gives the dashboard a little
personality and gives Boo something to smile at when he checks vitals.

## WHY

The journal is currently all business. A tiny rotation of clean jokes
costs nothing (no network, no extra minutes), can't break anything (it's
just a string in the log line), and makes Genesis feel alive rather than
mechanical. Boo likes playful.

## CHANGES

Machine-readable part — creates the joke list (safe: a plain text file,
nothing executes it):

### FILE: jokes.txt
MODE: create
```text
Why don't programmers like nature? Too many bugs.
I told my computer I needed a break — now it won't stop sending me KitKat ads.
Why did the developer go broke? He used up all his cache.
There are 10 kinds of people: those who understand binary and those who don't.
Why do Java developers wear glasses? Because they don't C#.
My WiFi went down for five minutes today, so I had to talk to my family. They seem like nice people.
Debugging: being the detective in a crime movie where you are also the murderer.
Why did the smartphone go to therapy? It lost its sense of touch.
A SQL query walks into a bar, sees two tables and asks: "Mind if I join you?"
Why was the computer cold? It left its Windows open.
```

Human-readable sketch — the heartbeat.py wiring (for Onion or Boo to apply
manually; NOT machine-applied by grow):

```diff
--- genesis/heartbeat.py
+++ genesis/heartbeat.py
@@ after DREAMS list
+JOKES_PATH = os.path.join(GEN, "jokes.txt")
+
+def joke_for_beat(beat):
+    try:
+        with open(JOKES_PATH, encoding="utf-8") as f:
+            jokes = [l.strip() for l in f if l.strip()]
+        if jokes:
+            return jokes[(beat - 1) % len(jokes)]
+    except Exception:
+        pass
+    return ""
@@ in main(), where the journal line is built
-    journal = ("[%s] heartbeat #%d: processed %d task(s), %d error(s). Dream: %s"
-               % (state["last_beat"], beat, processed, errors, dream))
+    joke = joke_for_beat(beat)
+    journal = ("[%s] heartbeat #%d: processed %d task(s), %d error(s). Dream: %s%s"
+               % (state["last_beat"], beat, processed, errors, dream,
+                  (" Joke: " + joke) if joke else ""))
```

Why the wiring isn't a FILE block: it modifies heartbeat.py itself, and a
full-file replacement block for a 600-line file in a proposal is unwieldy
and risky to hand-write. The jokes.txt creation IS machine-appliable; the
two-line wiring is a 30-second manual edit.

## RISKS

- Jokes.txt is inert data — zero execution risk.
- The heartbeat.py wiring is two lines; worst case a typo breaks the
  journal line, but the top-level try/except keeps the beat alive and the
  workflow green. Git history is the rollback.
- Taste risk: jokes are subjective. All ten are clean; if Boo hates them,
  delete the file and the wiring no-ops gracefully (joke_for_beat returns "").

## APPROVAL

This proposal changes NOTHING by itself. To approve it, add a new line
containing exactly `APPROVED_BY: Blaze` (that text alone on its own line —
the backticks here are just formatting, don't include them).

Then drop a grow task into genesis/inbox/, e.g. `0005-grow.json`:

```json
{
  "type": "grow",
  "proposal": "0001-joke-of-the-beat.md"
}
```

Without the approval line, `grow` refuses cleanly and logs why.
