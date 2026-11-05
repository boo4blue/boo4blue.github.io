#!/usr/bin/env python3
"""Blaze clone test synth - Chatterbox zero-shot, fidelity-favored settings.
Same engine and WAV write-out as cloud_cloner.py. generate() is tuned to
track the reference voice instead of polishing it flat:
  exaggeration=0.7  (lean into the reference's expressive prosody)
  cfg_weight=0.35   (follow the prompt voice over generic fluent speech)
  temperature=0.8   (library default; keeps natural variation)
Strict logging: every step is printed with timing.
"""
import argparse, time, wave
import numpy as np

def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--ref", required=True)
    ap.add_argument("--text", required=True)
    ap.add_argument("--out", required=True)
    ns = ap.parse_args()
    print(f"[synth] ref={ns.ref} text={ns.text!r}", flush=True)

    from chatterbox.tts import ChatterboxTTS
    t0 = time.time()
    model = ChatterboxTTS.from_pretrained(device="cpu")
    print(f"[synth] model loaded in {time.time()-t0:.1f}s sr={model.sr}", flush=True)

    t0 = time.time()
    wav = model.generate(ns.text, audio_prompt_path=ns.ref,
                         exaggeration=0.7, cfg_weight=0.35, temperature=0.8)
    print(f"[synth] inference took {time.time()-t0:.1f}s", flush=True)

    arr = wav.detach().cpu().numpy().squeeze()
    arr = (arr / max(1e-8, abs(arr).max()) * 32767).astype(np.int16)
    with wave.open(ns.out, "wb") as w:
        w.setnchannels(1); w.setsampwidth(2); w.setframerate(model.sr)
        w.writeframes(arr.tobytes())
    print(f"[synth] wrote {ns.out} ({model.sr}Hz, {len(arr)/model.sr:.1f}s)", flush=True)

if __name__ == "__main__":
    main()
