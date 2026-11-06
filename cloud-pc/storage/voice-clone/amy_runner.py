#!/usr/bin/env python3
"""amy_runner.py - Amy voice-test clone synth, Cloud PC side.
IDENTICAL recipe to local synth_clone.py: chunked Chatterbox zero-shot of
the held-out transcript, ref refs/neutral/blaze-ref.wav, ex 0.7 / cfg 0.35,
seed 101 per chunk, peak-norm 0.89, 0.28 s gaps, stitched to one WAV.
  --part a   chunks 0-2 -> amy_out/chunk_<i>.wav
  --part b   chunks 3-4 + stitch all 5 -> amy_out/clone_raw_cb.wav
Skips existing outputs. Strict [amy] logging. Blaze's OWN voice only.
"""
import os, sys, time, wave
from pathlib import Path

STAGE = Path(__file__).resolve().parent
os.environ.setdefault("HF_HOME", os.path.expanduser("~/.cache/cloudpc-models/hf"))
os.environ["HF_HUB_DISABLE_XET"] = "1"
import numpy as np

def log(m): print(f"[amy] {m}", flush=True)

CHUNKS = [
 "If you can dream it up, we can build it, watch and see.",
 "Anyway, this is my voice clip. This is my voice.",
 "I want you to clone it perfectly.",
 "Okay, I have higher pitch things like I'm talking right now, and then I could talk a little bit lower, pretty much.",
 "Thank you.",
]
REF = str(STAGE / "refs/neutral/blaze-ref.wav")
OUT_DIR = STAGE / "amy_out"

def read_wav(path):
    with wave.open(str(path), "rb") as w:
        sr = w.getframerate()
        pcm = np.frombuffer(w.readframes(w.getnframes()), dtype=np.int16)
    return pcm.astype(np.float64) / 32767.0, sr

def write_wav(path, arr, sr):
    pcm = (np.clip(arr, -1.0, 1.0) * 32767).astype(np.int16)
    with wave.open(str(path), "wb") as w:
        w.setnchannels(1); w.setsampwidth(2); w.setframerate(sr)
        w.writeframes(pcm.tobytes())

def main():
    part = sys.argv[sys.argv.index("--part") + 1] if "--part" in sys.argv else "a"
    OUT_DIR.mkdir(parents=True, exist_ok=True)
    import torch
    from chatterbox.tts import ChatterboxTTS
    t0 = time.time()
    model = ChatterboxTTS.from_pretrained(device="cpu")
    sr = model.sr
    log(f"model loaded in {time.time()-t0:.1f}s sr={sr} part={part}")

    def gen(i):
        dest = OUT_DIR / f"chunk_{i}.wav"
        if dest.exists() and dest.stat().st_size > 1000:
            log(f"skip chunk {i} (exists)"); return
        torch.manual_seed(101)
        t0 = time.time()
        wav = model.generate(CHUNKS[i], audio_prompt_path=REF,
                             exaggeration=0.7, cfg_weight=0.35)
        arr = wav.detach().cpu().numpy().squeeze().astype(np.float64)
        peak = max(1e-8, float(np.max(np.abs(arr)))) if arr.size else 1.0
        arr = arr / peak * 0.89
        write_wav(dest, arr, sr)
        log(f"chunk {i}: {len(arr)/sr:.1f}s in {time.time()-t0:.1f}s")

    if part == "a":
        for i in (0, 1, 2): gen(i)
    else:
        for i in (3, 4): gen(i)
        parts = []
        GAP = np.zeros(int(0.28 * sr))
        for i in range(5):
            arr, _ = read_wav(OUT_DIR / f"chunk_{i}.wav")
            parts.append(arr)
            if i < 4: parts.append(GAP)
        full = np.concatenate(parts)
        dest = OUT_DIR / "clone_raw_cb.wav"
        write_wav(dest, full, sr)
        log(f"wrote {dest}: dur={len(full)/sr:.1f}s")
    log("PART DONE")

if __name__ == "__main__":
    main()
