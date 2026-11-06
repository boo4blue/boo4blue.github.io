#!/usr/bin/env python3
"""ad_runner.py - Onion Core Ad #1 voice synth, Cloud PC side.
Whole-line Chatterbox zero-shot takes for the lines named on argv.
Standing recipe: ex 0.7 / cfg 0.35, Blaze's OWN refs only, peak-norm 0.89.
One model load per job; skips existing outputs (resume-friendly).
Outputs ad_out/<OUT>.wav at 24 kHz. Strict [ad-voice] logging.
"""
import json, os, sys, time, wave
from pathlib import Path

STAGE = Path(__file__).resolve().parent
os.environ.setdefault("HF_HOME", os.path.expanduser("~/.cache/cloudpc-models/hf"))
os.environ["HF_HUB_DISABLE_XET"] = "1"
import numpy as np

REFS = {
    "neutral": "refs/neutral/blaze-ref.wav",
    "calm": "refs/calm/BV3_1_21_piir_c011.wav",
    "excited": "refs/excited/BV2_19_tndw_long25.wav",
}

def log(m): print(f"[ad-voice] {m}", flush=True)

def write_wav(path, arr, sr):
    pcm = (np.clip(arr, -1.0, 1.0) * 32767).astype(np.int16)
    with wave.open(str(path), "wb") as w:
        w.setnchannels(1); w.setsampwidth(2); w.setframerate(sr)
        w.writeframes(pcm.tobytes())

def main():
    keys = sys.argv[1:]
    lines = json.loads((STAGE / "ad_lines.json").read_text())
    out_dir = STAGE / "ad_out"; out_dir.mkdir(parents=True, exist_ok=True)
    import torch
    from chatterbox.tts import ChatterboxTTS
    t0 = time.time()
    model = ChatterboxTTS.from_pretrained(device="cpu")
    sr = model.sr
    log(f"model loaded in {time.time()-t0:.1f}s sr={sr} lines={keys}")
    for key in keys:
        spec = lines[key]
        dest = out_dir / f"{spec['out']}.wav"
        if dest.exists() and dest.stat().st_size > 1000:
            log(f"skip {dest.name} (exists)"); continue
        ref = str(STAGE / REFS[spec["ref"]])
        torch.manual_seed(spec["seed"])
        t0 = time.time()
        try:
            wav = model.generate(spec["text"], audio_prompt_path=ref,
                                 exaggeration=0.7, cfg_weight=0.35)
        except TypeError as e:
            log(f"kwargs rejected ({e}); retrying bare")
            wav = model.generate(spec["text"], audio_prompt_path=ref)
        arr = wav.detach().cpu().numpy().squeeze().astype(np.float64)
        peak = max(1e-8, float(np.max(np.abs(arr)))) if arr.size else 1.0
        arr = arr / peak * 0.89
        write_wav(dest, arr, sr)
        log(f"wrote {dest.name}: {len(arr)/sr:.2f}s audio in {time.time()-t0:.1f}s ref={spec['ref']} seed={spec['seed']}")
    log("AD PART DONE")
    return 0

if __name__ == "__main__":
    sys.exit(main())
