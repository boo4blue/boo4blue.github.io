#!/usr/bin/env python3
"""cloud_synth_long.py — runner-side long-form zero-shot synth (Cloud PC).

Loads Chatterbox ONCE (HF_HOME cache, like cloud_cloner.py), generates
each chunk with that chunk's reference clip, concatenates with a 120ms
equal-power crossfade, and writes a 24kHz final WAV + per-chunk WAVs.

Stage under cloud-pc/storage/voice-clone/:
  chunks.json, cloud_synth_long.py, refs/<tag>/*.wav
Output: cloud-pc/storage/voice-clone/out/final.wav + out/chunk_XXX.wav

Strict logging: [synth] prefix.
"""
import json, math, os, time, wave
from pathlib import Path
import numpy as np

STAGE = Path(os.environ.get("VOICE_CLONE_STAGE", "cloud-pc/storage/voice-clone"))
CROSSFADE_MS = 120


def log(msg):
    print(f"[synth] {msg}", flush=True)


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
        tail = out[-n:] * np.cos(t) + part[:n] * np.sin(t)  # equal-power
        out = np.concatenate([out[:-n], tail, part[n:]])
    return out if out is not None else np.zeros(0)


def main():
    chunks_doc = json.loads((STAGE / "chunks.json").read_text())
    chunks = chunks_doc["chunks"]
    log(f"{len(chunks)} chunk(s) to synthesize")
    os.environ.setdefault("HF_HOME", os.path.expanduser("~/.cache/cloudpc-models/hf"))
    from chatterbox.tts import ChatterboxTTS
    t0 = time.time()
    model = ChatterboxTTS.from_pretrained(device="cpu")
    sr = model.sr  # 24000
    log(f"model loaded in {time.time()-t0:.1f}s, sr={sr}")
    out_dir = STAGE / "out"; out_dir.mkdir(parents=True, exist_ok=True)
    parts = []
    for c in chunks:
        ref = c["ref"]
        # Refs are staged per tag; resolve basename against staged refs/.
        candidates = list((STAGE / "refs").rglob(Path(ref).name)) if ref else []
        ref_path = str(candidates[0]) if candidates else ref
        t0 = time.time()
        wav = model.generate(c["text"], audio_prompt_path=ref_path)
        arr = wav.detach().cpu().numpy().squeeze().astype(np.float64)
        peak = max(1e-8, float(np.max(np.abs(arr)))) if arr.size else 1.0
        arr = arr / peak * 0.89
        write_wav(out_dir / f"chunk_{c['i']:03d}.wav", arr, sr)
        log(f"chunk {c['i']}: tag={c['tag']} {len(arr)/sr:.1f}s "
            f"in {time.time()-t0:.1f}s")
        parts.append(arr)
    final = crossfade_concat(parts, sr)
    write_wav(out_dir / "final.wav", final, sr)
    log(f"wrote {out_dir / 'final.wav'} ({sr}Hz, {len(final)/sr:.1f}s, "
        f"{CROSSFADE_MS}ms equal-power crossfade)")


if __name__ == "__main__":
    main()
