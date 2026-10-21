#!/usr/bin/env python3
"""Free voice cloning on Boo's Cloud PC (GitHub Actions runner).
Uses Chatterbox (Resemble AI) — zero-shot voice cloning, no API key, no GPU.

Setup (run once per Cloud PC session):
  export HF_HOME=~/.cache/cloudpc-models/hf   # persist model in Actions cache
  pip install torch torchaudio --index-url https://download.pytorch.org/whl/cpu
  pip install chatterbox-tts psutil numpy

Usage:
  python3 cloud_cloner.py --ref reference_voice.mp3 --text "Hello world" --out cloned.wav

The reference should be 5-30 seconds of clear speech. Output is 24kHz WAV.
On the Cloud PC runner: ~25s model load, ~4GB RAM, ~95s inference for ~8s of audio.
"""
import argparse, base64, time, wave
import numpy as np

def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--ref", required=True, help="Reference voice audio (mp3/wav, 5-30s)")
    ap.add_argument("--text", required=True, help="Text to speak in the cloned voice")
    ap.add_argument("--out", required=True, help="Output WAV path")
    ap.add_argument("--device", default="cpu")
    ns = ap.parse_args()

    from chatterbox.tts import ChatterboxTTS
    t0 = time.time()
    model = ChatterboxTTS.from_pretrained(device=ns.device)
    print(f"Model loaded in {time.time()-t0:.1f}s")

    t0 = time.time()
    wav = model.generate(ns.text, audio_prompt_path=ns.ref)
    print(f"Inference took {time.time()-t0:.1f}s")

    arr = wav.detach().cpu().numpy().squeeze()
    arr = (arr / max(1e-8, abs(arr).max()) * 32767).astype(np.int16)
    with wave.open(ns.out, "wb") as w:
        w.setnchannels(1)
        w.setsampwidth(2)
        w.setframerate(model.sr)
        w.writeframes(arr.tobytes())
    print(f"Wrote {ns.out} ({model.sr}Hz, {len(arr)/model.sr:.1f}s)")

if __name__ == "__main__":
    main()
