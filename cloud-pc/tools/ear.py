#!/usr/bin/env python3
"""Onion Ear — listen to a song the way ears do, with numbers.

Boo's rule (AC6): if it sounds like TALKING, it fails. Onion cannot hear,
so this tool measures the acoustic things that make singing sound like
singing and talking sound like talking:

  * note plateaus   — singers HOLD pitches; talkers glide through them
  * plateau length  — held notes last; speech pitch never sits still
  * vibrato         — periodic 4-7.5 Hz pitch wobble on held notes
  * pitch range     — songs span more semitones than speech
  * note grid fit   — sung notes land on a consistent semitone grid

Usage: ear.py <audio> [--json]
Exit code: 0 = SINGING or BORDERLINE, 2 = TALKING verdict.
"""
import json
import os
import subprocess
import sys
import tempfile

sys.path.insert(0, os.path.expanduser("~/workspace/.pylibs"))

import numpy as np  # noqa: E402


def decode_to_wav(path):
    """Decode any audio to mono 22050 Hz WAV via ffmpeg; return temp path."""
    fd, tmp = tempfile.mkstemp(suffix=".wav")
    os.close(fd)
    r = subprocess.run(
        ["ffmpeg", "-y", "-v", "error", "-i", path,
         "-ac", "1", "-ar", "22050", tmp],
        capture_output=True, text=True)
    if r.returncode != 0:
        raise RuntimeError("ffmpeg decode failed: " + r.stderr.strip()[:300])
    return tmp


def f0_track(wav):
    """Praat pitch track via parselmouth. Returns (times, f0_hz) at 10 ms hop."""
    import parselmouth
    snd = parselmouth.Sound(wav)
    pitch = snd.to_pitch(time_step=0.01, pitch_floor=60.0, pitch_ceiling=600.0)
    f0 = pitch.selected_array["frequency"]
    times = pitch.xs()
    return np.asarray(times), np.asarray(f0, dtype=float)


def cents(f0):
    out = np.full_like(f0, np.nan)
    voiced = f0 > 0
    out[voiced] = 1200.0 * np.log2(f0[voiced] / 110.0)  # ref A2, arbitrary
    return out, voiced


def median_filter(x, k=5):
    if len(x) < k:
        return x.copy()
    pad = k // 2
    xp = np.pad(x, pad, mode="edge")
    return np.array([np.median(xp[i:i + k]) for i in range(len(x))])


def find_plateaus(c, voiced, hop=0.01, win_s=0.12, tol_cents=60.0):
    """A frame is 'on a note' if voicing is continuous over a window and the
    pitch stays within +/-tol of the window median. Returns mask + segments."""
    n = len(c)
    w = max(3, int(round(win_s / hop)))
    half = w // 2
    mask = np.zeros(n, dtype=bool)
    for i in range(n):
        lo, hi = i - half, i + half + 1
        if lo < 0 or hi > n:
            continue
        seg_v = voiced[lo:hi]
        if seg_v.mean() < 0.9:
            continue
        seg = c[lo:hi][seg_v]
        med = np.median(seg)
        if np.max(np.abs(seg - med)) <= tol_cents:
            mask[i] = True
    # group into segments (merge gaps < 30 ms)
    segs = []
    i = 0
    while i < n:
        if mask[i]:
            j = i
            gap = 0
            last = i
            while j + 1 < n and (mask[j + 1] or gap < 3):
                j += 1
                if mask[j]:
                    last = j
                    gap = 0
                else:
                    gap += 1
            segs.append((i, last))
            i = last + 1
        else:
            i += 1
    segs = [(a, b) for a, b in segs if (b - a + 1) * hop >= win_s]
    return mask, segs


def vibrato_fraction(c, segs, hop=0.01):
    """Fraction of long-plateau time showing 4-7.5 Hz vibrato."""
    total = 0.0
    vib = 0.0
    for a, b in segs:
        dur = (b - a + 1) * hop
        if dur < 0.35:
            continue
        total += dur
        x = c[a:b + 1].copy()
        x = x - np.mean(x)
        if np.std(x) < 5:  # dead flat: no vibrato
            continue
        xw = x * np.hanning(len(x))
        spec = np.abs(np.fft.rfft(xw))
        freqs = np.fft.rfftfreq(len(x), d=hop)
        band = (freqs >= 3.5) & (freqs <= 8.0)
        if not band.any():
            continue
        peak = spec[band].max()
        med = np.median(spec[(freqs >= 1.0) & (freqs <= 15.0)]) + 1e-9
        extent = 2.0 * np.std(x)
        if peak > 2.5 * med and extent >= 20.0:
            vib += dur
    return (vib / total) if total > 0 else 0.0


def grid_fit(c, mask):
    """How tightly held-note pitches sit on one semitone grid (0..1)."""
    vals = c[mask]
    if len(vals) < 20:
        return 0.0
    best = 1e9
    for off in np.arange(0, 100, 5):
        d = np.abs(((vals - off + 50) % 100) - 50)
        best = min(best, np.median(d))
    return float(max(0.0, 1.0 - best / 50.0))


def ramp(x, lo, hi):
    return float(min(1.0, max(0.0, (x - lo) / (hi - lo))))


def analyze(path):
    wav = decode_to_wav(path)
    try:
        times, f0 = f0_track(wav)
    finally:
        os.unlink(wav)
    c, voiced = cents(f0)
    cv = c[voiced]
    if len(cv) < 50:
        return {"file": path, "error": "too little voiced audio to judge"}
    cv_f = median_filter(cv, 5)
    # rebuild a full-length filtered cents array for plateau work
    c_full = np.full_like(c, np.nan)
    c_full[voiced] = cv_f
    c_work = np.where(voiced, c_full, 0.0)

    mask, segs = find_plateaus(c_work, voiced)
    plateau_cov = float(mask.sum() / max(1, voiced.sum()))
    durs = [(b - a + 1) * 0.01 for a, b in segs]
    mean_note = float(np.mean(durs)) if durs else 0.0
    longest = float(np.max(durs)) if durs else 0.0
    vib = vibrato_fraction(c_work, segs)
    lo, hi = np.percentile(cv, [5, 95])
    range_st = float((hi - lo) / 100.0)
    grid = grid_fit(c_work, mask)

    score = 100.0 * (
        0.35 * ramp(plateau_cov, 0.15, 0.65)
        + 0.20 * ramp(mean_note, 0.12, 0.45)
        + 0.20 * vib
        + 0.15 * ramp(range_st, 3.0, 12.0)
        + 0.10 * grid
    )
    verdict = "SINGING" if score >= 65 else ("BORDERLINE" if score >= 45 else "TALKING")
    return {
        "file": os.path.basename(path),
        "duration_s": round(float(times[-1]) if len(times) else 0.0, 2),
        "voiced_ratio": round(float(voiced.mean()), 3),
        "pitch_range_semitones": round(range_st, 1),
        "plateau_coverage": round(plateau_cov, 3),
        "mean_note_s": round(mean_note, 3),
        "longest_note_s": round(longest, 2),
        "vibrato_fraction": round(vib, 3),
        "grid_fit": round(grid, 3),
        "singing_score": round(score, 1),
        "verdict": verdict,
    }


def main():
    args = [a for a in sys.argv[1:] if not a.startswith("--")]
    as_json = "--json" in sys.argv
    if not args:
        print(__doc__)
        return 1
    worst = 0
    for path in args:
        r = analyze(path)
        if "error" in r:
            print(f"{path}: ERROR — {r['error']}")
            worst = 2
            continue
        if as_json:
            print(json.dumps(r))
        else:
            print(f"🎧 {r['file']}  ({r['duration_s']}s)")
            print(f"   pitch range {r['pitch_range_semitones']} st | "
                  f"voiced {r['voiced_ratio']:.0%}")
            print(f"   held-note coverage {r['plateau_coverage']:.0%} | "
                  f"avg note {r['mean_note_s']}s | longest {r['longest_note_s']}s")
            print(f"   vibrato {r['vibrato_fraction']:.0%} of held notes | "
                  f"note-grid fit {r['grid_fit']:.0%}")
            print(f"   👉 SINGING SCORE {r['singing_score']}/100 — {r['verdict']}")
        if r["verdict"] == "TALKING":
            worst = 2
    return worst


if __name__ == "__main__":
    sys.exit(main())
