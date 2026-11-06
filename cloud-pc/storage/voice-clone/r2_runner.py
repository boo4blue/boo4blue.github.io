#!/usr/bin/env python3
"""r2_runner.py — Round 2 zero-shot synth, Cloud PC side.

Generates takes for one line (from r2_lines.json) in parts so each job
fits the pc.py 600 s cap:
  --part a   chunk takes, seed 101
  --part b   chunk takes, seed 202
  --part c   whole-line take, seed 777
Outputs r2_out/<line>/{chunk_<i>_s<seed>.wav, whole.wav} — same names as
the local lane, so local stitch/score tooling consumes them unchanged.
Skips files that already exist (resume-friendly). Peak-normalize 0.89.
Strict [r2] logging with per-generation timings. Blaze's voice only.
"""
import argparse, json, os, sys, time, wave
from pathlib import Path

STAGE = Path(__file__).resolve().parent
os.environ.setdefault("HF_HOME", os.path.expanduser("~/.cache/cloudpc-models/hf"))
os.environ["HF_HUB_DISABLE_XET"] = "1"

import numpy as np


def log(msg):
    print(f"[r2] {msg}", flush=True)


def write_wav(path, arr, sr):
    pcm = (np.clip(arr, -1.0, 1.0) * 32767).astype(np.int16)
    with wave.open(str(path), "wb") as w:
        w.setnchannels(1); w.setsampwidth(2); w.setframerate(sr)
        w.writeframes(pcm.tobytes())


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--line", required=True)
    ap.add_argument("--part", required=True, choices=["a", "b", "c"])
    args = ap.parse_args()

    lines = json.loads((STAGE / "r2_lines.json").read_text())
    spec = lines[args.line]
    out_dir = STAGE / "r2_out" / args.line
    out_dir.mkdir(parents=True, exist_ok=True)
    ref_path = str(STAGE / spec["ref"])
    log(f"line={args.line} part={args.part} ref={spec['ref']}")

    import torch
    from chatterbox.tts import ChatterboxTTS
    t0 = time.time()
    model = ChatterboxTTS.from_pretrained(device="cpu")
    sr = model.sr
    log(f"model loaded in {time.time()-t0:.1f}s sr={sr}")

    def gen(text, seed, dest):
        if dest.exists() and dest.stat().st_size > 1000:
            log(f"skip {dest.name} (exists)")
            return
        torch.manual_seed(seed)
        t0 = time.time()
        try:
            wav = model.generate(text, audio_prompt_path=ref_path,
                                 exaggeration=spec["ex"], cfg_weight=spec["cfg"])
        except TypeError as e:
            log(f"kwargs rejected ({e}); retrying bare")
            wav = model.generate(text, audio_prompt_path=ref_path)
        arr = wav.detach().cpu().numpy().squeeze().astype(np.float64)
        peak = max(1e-8, float(np.max(np.abs(arr)))) if arr.size else 1.0
        arr = arr / peak * 0.89
        write_wav(dest, arr, sr)
        log(f"wrote {dest.name}: {len(arr)/sr:.1f}s in {time.time()-t0:.1f}s (seed {seed})")

    if args.part == "a":
        for i, ctext in enumerate(spec["chunks"]):
            gen(ctext, 101, out_dir / f"chunk_{i}_s101.wav")
    elif args.part == "b":
        for i, ctext in enumerate(spec["chunks"]):
            gen(ctext, 202, out_dir / f"chunk_{i}_s202.wav")
    else:
        gen(spec["text"], 777, out_dir / "whole.wav")
    log("PART DONE")
    return 0


if __name__ == "__main__":
    sys.exit(main())
