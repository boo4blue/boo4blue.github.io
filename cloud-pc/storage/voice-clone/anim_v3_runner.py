#!/usr/bin/env python3
"""anim_v3_runner.py — Animated Blaze v3 single-line zero-shot synth, Cloud PC side.

Synthesizes ONE brand-new line (never used in any earlier clip) with
Chatterbox zero-shot, using Blaze's own excited reference, proven
settings exaggeration=0.7 / cfg_weight=0.35, raw ref.
Writes anim_out/animated_v3_voice.wav (24 kHz mono).
Strict logging: [animv3] prefix. Blaze's own voice only.
"""
import argparse, math, os, re, sys, time, wave
from pathlib import Path
import numpy as np

STAGE = Path(__file__).resolve().parent
OUT = STAGE / "anim_out"
TEXT = ("Yo, new room, new words. I'm on the couch with the controller "
        "in my hands, we about to run it up in here tonight, let's go.")
MAX_CHUNK_CHARS = 180
CROSSFADE_MS = 120


def log(msg):
    print(f"[animv3] {msg}", flush=True)


def write_wav(path, arr, sr):
    pcm = (np.clip(arr, -1.0, 1.0) * 32767).astype(np.int16)
    with wave.open(str(path), "wb") as w:
        w.setnchannels(1); w.setsampwidth(2); w.setframerate(sr)
        w.writeframes(pcm.tobytes())


_SENTENCE_SPLIT = re.compile(r"(?<=[.!?…])\s+")


def chunk_text(text, max_chars=MAX_CHUNK_CHARS):
    sentences = [s.strip() for s in _SENTENCE_SPLIT.split(text.strip()) if s.strip()]
    chunks, buf = [], ""
    for s in sentences:
        if buf and len(buf) + 1 + len(s) > max_chars:
            chunks.append(buf); buf = s
        else:
            buf = f"{buf} {s}" if buf else s
    if buf:
        chunks.append(buf)
    return chunks


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
    ap.add_argument("--ex", type=float, default=0.7)
    ap.add_argument("--cfg", type=float, default=0.35)
    ap.add_argument("--ref", required=True)
    ap.add_argument("--name", required=True)
    args = ap.parse_args()

    OUT.mkdir(parents=True, exist_ok=True)
    ref_path = STAGE / args.ref
    if not ref_path.exists():
        log(f"FAIL: ref missing: {ref_path}")
        return 2
    chunks = chunk_text(TEXT)
    log(f"synth {args.name}: ex={args.ex} cfg={args.cfg} ref={args.ref} chunks={len(chunks)} text={TEXT!r}")
    os.environ.setdefault("HF_HOME", os.path.expanduser("~/.cache/cloudpc-models/hf"))
    from chatterbox.tts import ChatterboxTTS
    t0 = time.time()
    model = ChatterboxTTS.from_pretrained(device="cpu")
    sr = model.sr
    log(f"model loaded in {time.time()-t0:.1f}s sr={sr}")
    parts = []
    for i, ctext in enumerate(chunks):
        wav = model.generate(ctext, audio_prompt_path=str(ref_path),
                             exaggeration=args.ex, cfg_weight=args.cfg)
        arr = wav.detach().cpu().numpy().squeeze().astype(np.float64)
        peak = max(1e-8, float(np.max(np.abs(arr)))) if arr.size else 1.0
        arr = arr / peak * 0.89
        parts.append(arr)
        log(f"chunk {i}: {len(arr)/sr:.1f}s")
    final = crossfade_concat(parts, sr)
    out_wav = OUT / f"{args.name}.wav"
    write_wav(out_wav, final, sr)
    dur = len(final) / sr
    log(f"wrote {out_wav} ({dur:.2f}s, {out_wav.stat().st_size} B)")
    print(f"[animv3] RESULT name={args.name} duration_s={dur:.2f} bytes={out_wav.stat().st_size}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
