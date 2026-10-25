#!/usr/bin/env python3
"""StyleProbe — take a real song apart into a measurable style profile.

This is how Onion "listens" to reference artists: tempo, key, dynamics,
brightness, energy arc, and lead-vocal behavior (via the Onion Ear engine).
The profile JSON is the training target for stylematch + take selection.

Usage: styleprobe.py <audio> [--json] [--out profile.json]
"""
import importlib.util
import json
import os
import subprocess
import sys
import tempfile

sys.path.insert(0, os.path.expanduser("~/workspace/.pylibs"))
import numpy as np  # noqa: E402

SR = 22050


def load_mono(path, sr=SR):
    fd, tmp = tempfile.mkstemp(suffix=".f32")
    os.close(fd)
    r = subprocess.run(
        ["ffmpeg", "-y", "-v", "error", "-i", path, "-ac", "1", "-ar", str(sr),
         "-f", "f32le", tmp], capture_output=True, text=True)
    if r.returncode != 0:
        raise RuntimeError("ffmpeg decode failed: " + r.stderr.strip()[:200])
    y = np.fromfile(tmp, dtype=np.float32).astype(np.float64)
    os.unlink(tmp)
    return y


def estimate_bpm(y, sr=SR):
    """Spectral-flux onset envelope + autocorrelation tempo pick."""
    hop, win = 512, 2048
    n_frames = max(1, (len(y) - win) // hop)
    mags = np.empty((n_frames, win // 2 + 1))
    window = np.hanning(win)
    for i in range(n_frames):
        seg = y[i * hop:i * hop + win] * window
        mags[i] = np.abs(np.fft.rfft(seg))
    flux = np.maximum(0.0, np.diff(mags, axis=0)).sum(axis=1)
    if flux.max() <= 0:
        return None, 0.0
    flux = flux / flux.max()
    fps = sr / hop
    ac = np.correlate(flux - flux.mean(), flux - flux.mean(), "full")[len(flux) - 1:]
    lo = int(fps * 60 / 220)   # 220 BPM -> shortest lag
    hi = int(fps * 60 / 40)    # 40 BPM
    seg = ac[lo:hi]
    if len(seg) == 0:
        return None, 0.0
    lag = lo + int(np.argmax(seg))
    bpm = 60.0 * fps / lag
    conf = float(seg.max() / (ac[0] + 1e-9))
    # fold into the 70-180 sweet spot, keeping the raw pick visible
    folded = bpm
    while folded < 70:
        folded *= 2
    while folded > 180:
        folded /= 2
    return round(folded, 1), round(conf, 3)


NOTE_NAMES = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"]
MAJ = np.array([6.35, 2.23, 3.48, 2.33, 4.38, 4.09, 2.52, 5.19, 2.39, 3.66, 2.29, 2.88])
MIN = np.array([6.33, 2.68, 3.52, 5.38, 2.60, 3.53, 2.54, 4.75, 3.98, 2.69, 3.34, 3.17])


def estimate_key(y, sr=SR):
    hop, win = 4096, 8192
    n_frames = max(1, (len(y) - win) // hop)
    freqs = np.fft.rfftfreq(win, 1 / sr)
    chroma = np.zeros(12)
    window = np.hanning(win)
    for i in range(n_frames):
        seg = y[i * hop:i * hop + win] * window
        mag = np.abs(np.fft.rfft(seg))
        band = (freqs >= 55) & (freqs <= 2000)
        midi = 69 + 12 * np.log2(np.maximum(freqs[band], 1e-6) / 440.0)
        pc = np.round(midi).astype(int) % 12
        np.add.at(chroma, pc, mag[band] ** 2)
    if chroma.sum() <= 0:
        return None, None, 0.0
    chroma = chroma / chroma.sum()
    best = (None, None, -2.0)
    for t in range(12):
        for name, prof in (("major", MAJ), ("minor", MIN)):
            p = np.roll(prof, t)
            p = (p - p.mean()) / (p.std() + 1e-9)
            c = (chroma - chroma.mean()) / (chroma.std() + 1e-9)
            corr = float(np.dot(c, p) / 12.0)
            if corr > best[2]:
                best = (NOTE_NAMES[t], name, corr)
    return best[0], best[1], round(best[2], 3)


def dynamics(y, sr=SR):
    win = int(sr * 0.1)
    n = max(1, len(y) // win)
    rms = np.array([np.sqrt(np.mean(y[i * win:(i + 1) * win] ** 2) + 1e-12)
                    for i in range(n)])
    db = 20 * np.log10(rms + 1e-9)
    peak = float(np.max(np.abs(y)) + 1e-12)
    arc = []
    for s in range(10):
        seg = db[int(s * n / 10):int((s + 1) * n / 10)]
        arc.append(round(float(seg.mean()), 1) if len(seg) else None)
    return {
        "rms_db_mean": round(float(db.mean()), 1),
        "dynamic_range_db": round(float(np.percentile(db, 90) - np.percentile(db, 10)), 1),
        "crest_db": round(20 * np.log10(peak / (np.sqrt(np.mean(y ** 2)) + 1e-12)), 1),
        "energy_arc_db": arc,
    }


def brightness(y, sr=SR):
    hop, win = 4096, 8192
    n = max(1, (len(y) - win) // hop)
    freqs = np.fft.rfftfreq(win, 1 / sr)
    cents = []
    window = np.hanning(win)
    for i in range(0, n, 4):
        mag = np.abs(np.fft.rfft(y[i * hop:i * hop + win] * window))
        cents.append(float((freqs * mag).sum() / (mag.sum() + 1e-9)))
    return round(float(np.mean(cents)), 0) if cents else None


def ear_profile(path):
    """Reuse the Onion Ear engine for lead-vocal behavior."""
    here = os.path.dirname(os.path.abspath(__file__))
    spec = importlib.util.spec_from_file_location("ear", os.path.join(here, "ear.py"))
    ear = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(ear)
    return ear.analyze(path)


def probe(path):
    y = load_mono(path)
    bpm, bpm_conf = estimate_bpm(y)
    key, mode, key_conf = estimate_key(y)
    prof = {
        "file": os.path.basename(path),
        "duration_s": round(len(y) / SR, 1),
        "bpm": bpm, "bpm_confidence": bpm_conf,
        "key": key, "mode": mode, "key_confidence": key_conf,
        "brightness_hz": brightness(y),
        "dynamics": dynamics(y),
        "vocal": ear_profile(path),
    }
    return prof


def summarize(p):
    v, d = p["vocal"], p["dynamics"]
    lines = [
        f"🔬 {p['file']}  ({p['duration_s']}s)",
        f"   tempo {p['bpm']} BPM (conf {p['bpm_confidence']}) | "
        f"key {p['key']} {p['mode']} (conf {p['key_confidence']}) | "
        f"brightness {p['brightness_hz']} Hz",
        f"   dynamics: mean {d['rms_db_mean']} dB, range {d['dynamic_range_db']} dB, "
        f"crest {d['crest_db']} dB",
        f"   energy arc: {d['energy_arc_db']}",
    ]
    if "verdict" in v:
        lines.append(
            f"   lead vocal: range {v['pitch_range_semitones']} st, "
            f"held-note coverage {v['plateau_coverage']:.0%}, "
            f"avg note {v['mean_note_s']}s, vibrato {v['vibrato_fraction']:.0%}, "
            f"singing score {v['singing_score']} ({v['verdict']})")
    return "\n".join(lines)


def main():
    args = [a for a in sys.argv[1:] if not a.startswith("--")]
    out = None
    if "--out" in sys.argv:
        out = sys.argv[sys.argv.index("--out") + 1]
    if not args:
        print(__doc__)
        return 1
    prof = probe(args[0])
    if "--json" in sys.argv:
        print(json.dumps(prof, indent=1))
    else:
        print(summarize(prof))
    if out:
        with open(out, "w") as f:
            json.dump(prof, f, indent=1)
        print(f"   profile saved → {out}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
