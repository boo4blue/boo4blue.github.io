#!/usr/bin/env python3
"""synth3.py — runner-side zero-shot synth for the 3 new Blaze clips.

Runs on the Cloud PC (cwd = cloud-pc/storage). Loads Chatterbox ONCE,
synthesizes ONE named clip from jobs3.json: text split into sentence
chunks (<=180 chars), each chunk generated with the clip's reference
clip (RAW, trim only) at the verified fidelity settings
(exaggeration 0.7, cfg_weight 0.35), chunks joined with a 120ms
equal-power crossfade, final written as a 24kHz WAV to out/<name>.wav.

Strict logging: [synth] prefix.
Scope: Blaze's own voice references only.
"""
import argparse, json, math, os, re, sys, time, wave
from pathlib import Path
import numpy as np

STAGE = Path(__file__).resolve().parent
MAX_CHUNK_CHARS = 180
CROSSFADE_MS = 120
EXAGGERATION = 0.7
CFG_WEIGHT = 0.35

_SENTENCE_SPLIT = re.compile(r"(?<=[.!?…])\s+")


def log(msg):
    print(f"[synth] {msg}", flush=True)


def chunk_text(text, max_chars=MAX_CHUNK_CHARS):
    sentences = [s.strip() for s in _SENTENCE_SPLIT.split(text.strip()) if s.strip()]
    chunks, buf = [], ""
    for s in sentences:
        while len(s) > max_chars:
            if buf:
                chunks.append(buf); buf = ""
            cut = s.rfind(" ", 0, max_chars)
            if cut <= 0:
                cut = max_chars
            chunks.append(s[:cut].strip())
            s = s[cut:].strip()
        if not s:
            continue
        if buf and len(buf) + 1 + len(s) > max_chars:
            chunks.append(buf); buf = s
        else:
            buf = f"{buf} {s}" if buf else s
    if buf:
        chunks.append(buf)
    return chunks


def write_wav(path, arr, sr):
    pcm = (np.clip(arr, -1.0, 1.0) * 32767).astype(np.int16)
    with wave.open(str(path), "wb") as w:
        w.setnchannels(1); w.setsampwidth(2); w.setframerate(sr)
        w.writeframes(pcm.tobytes())


def crossfade_concat(parts, sr, fade_ms=CROSSFADE_MS):
    fade = int(sr * fade_ms / 1000)
    out = None
    for part in parts:
        part = np.asarray(part, dtype=np.float64)
        if out is None:
            out = part; continue
        n = min(fade, len(out), len(part))
        if n <= 0:
            out = np.concatenate([out, part]); continue
        t = np.linspace(0.0, math.pi / 2.0, n)
        tail = out[-n:] * np.cos(t) + part[:n] * np.sin(t)
        out = np.concatenate([out[:-n], tail, part[n:]])
    return out if out is not None else np.zeros(0)


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--only", required=True, help="clip name from jobs3.json")
    args = ap.parse_args()

    jobs = json.loads((STAGE / "jobs3.json").read_text())
    job = next((j for j in jobs if j["name"] == args.only), None)
    if job is None:
        log(f"FAIL: no job named {args.only!r} in jobs3.json")
        return 2
    ref_path = STAGE / job["ref"]
    if not ref_path.exists():
        log(f"FAIL: reference clip missing: {ref_path}")
        return 2
    chunks = chunk_text(job["text"])
    log(f"clip {job['name']}: {len(chunks)} chunk(s), ref={job['ref']}, "
        f"exaggeration={EXAGGERATION}, cfg_weight={CFG_WEIGHT}")
    for i, c in enumerate(chunks):
        log(f"chunk {i}: {len(c)} chars: {c[:60]!r}")

    os.environ.setdefault("HF_HOME", os.path.expanduser("~/.cache/cloudpc-models/hf"))
    from chatterbox.tts import ChatterboxTTS
    t0 = time.time()
    model = ChatterboxTTS.from_pretrained(device="cpu")
    sr = model.sr
    log(f"model loaded in {time.time()-t0:.1f}s, sr={sr}")

    out_dir = STAGE / "out"; out_dir.mkdir(parents=True, exist_ok=True)
    parts = []
    for i, ctext in enumerate(chunks):
        t0 = time.time()
        try:
            wav = model.generate(ctext, audio_prompt_path=str(ref_path),
                                 exaggeration=EXAGGERATION, cfg_weight=CFG_WEIGHT)
        except TypeError as e:
            log(f"chunk {i}: generate() rejected fidelity kwargs ({e}); "
                f"retrying without them")
            wav = model.generate(ctext, audio_prompt_path=str(ref_path))
        arr = wav.detach().cpu().numpy().squeeze().astype(np.float64)
        peak = max(1e-8, float(np.max(np.abs(arr)))) if arr.size else 1.0
        arr = arr / peak * 0.89
        write_wav(out_dir / f"{job['name']}_chunk_{i:03d}.wav", arr, sr)
        log(f"chunk {i}: {len(arr)/sr:.1f}s in {time.time()-t0:.1f}s")
        parts.append(arr)
    final = crossfade_concat(parts, sr)
    write_wav(out_dir / f"{job['name']}.wav", final, sr)
    log(f"wrote out/{job['name']}.wav ({sr}Hz, {len(final)/sr:.1f}s)")
    return 0


if __name__ == "__main__":
    sys.exit(main())
