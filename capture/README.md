# Capture Lane

Real screenshots of shipped Android APKs, taken on a Note10-profile
emulator (API 31, google_apis x86_64, 1080x2280 @ 420dpi, fontScale 1.0,
animations off, SystemUI demo mode) running on a GitHub Actions runner.

- **Trigger:** push a job JSON to `capture/inbox/` — the dedicated
  `.github/workflows/capture.yml` workflow runs it. It never touches
  `cloud-pc/inbox/` (the TV stream chain) and runs under its own
  concurrency group, so captures can never delay or cancel stream jobs.
- **Results:** `capture/results/<job-id>/` — the runner commits + pushes
  EVERY screenshot the moment it exists, then a final `result.json`
  (boot/install/pid verdict + the real size/density/fontScale read back
  from the emulator). A timed-out run still leaves its captures behind.
- **Job JSON:** `{id, apkUrl, apkMd5?, package, script, api?, image?,
  width?, height?, density?, permissions?}` — `script` is a repo-relative
  screen script run with `shot <name>`, `tapfrac <fx,fy>`,
  `taptext <substring>` and `adb` available.
- **Local dispatch:** `~/workspace/capture-lane/capture.sh` (see
  `~/workspace/capture-lane/CAPTURE-PROTOCOL.md`).
