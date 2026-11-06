#!/usr/bin/env python3
"""imp_runner.py — voice-clone improvement loop, Cloud PC side.

Modes:
  decode     Decode imp_inputs.json / imp_refs.json (base64 WAVs) to disk.
  scorebase  GE2E-score the 3 delivered baseline clips + controls vs ref.
  synth      Generate one clip (chatterbox zero-shot) with given
             exaggeration/cfg/ref, write WAV, GE2E-score it, write JSON.

Scoring mirrors clone2/score_similarity.py's embedding engine exactly
(resemblyzer preprocess_wav + embed_utterance, cosine vs blaze-ref).
Strict logging: [imp] prefix. Blaze's own voice only.
"""
import argparse, base64, json, math, os, re, sys, time, wave
from pathlib import Path
import numpy as np

STAGE = Path(__file__).resolve().parent
WORK = STAGE / "imp_work"
OUT = STAGE / "imp_out"
MAX_CHUNK_CHARS = 180
CROSSFADE_MS = 120
TARGET_SR = 16000

TEXTS = {
    "hype": "Listen listen listen, okay, we are not doing the mannequin ever again, that thing was horrible bro. We build it the right way, the cartoon way. And watch, watch and see, Onion Core is gonna take over Texas, I swear. Okay lets go lets go lets go.",
    "family": "Okay girls come here, Callie, Mia, Buddha come here, I made food okay. We're gonna eat and then movie night here at the house, and if y'all are good, maybe, maybe we play the game after. Luv y'all, come on.",
    "joking": "Bro Merlin you hearing this? This is me and it's not even me, it's the clone. I trained it on my own voice, like that's crazy, it sounds like me saying stuff I never even said. Okay that's genius, that's actually genius.",
}


def log(msg):
    print(f"[imp] {msg}", flush=True)


# ---------------------------------------------------------------- decode
def decode():
    WORK.mkdir(parents=True, exist_ok=True)
    n = 0
    for fname in ("imp_inputs.json", "imp_refs.json"):
        p = STAGE / fname
        if not p.exists():
            continue
        data = json.loads(p.read_text())
        for name, b64 in data.items():
            dest = WORK / name
            if dest.exists() and dest.stat().st_size > 1000:
                continue
            dest.write_bytes(base64.b64decode(b64))
            n += 1
            log(f"decoded {name} ({dest.stat().st_size} B)")
    log(f"decode done, {n} new file(s)")


# ---------------------------------------------------------------- audio io
def write_wav(path, arr, sr):
    pcm = (np.clip(arr, -1.0, 1.0) * 32767).astype(np.int16)
    with wave.open(str(path), "wb") as w:
        w.setnchannels(1); w.setsampwidth(2); w.setframerate(sr)
        w.writeframes(pcm.tobytes())


def _to_float_mono(data):
    if data.ndim > 1:
        data = data.mean(axis=1)
    if data.dtype == np.int16:
        return data.astype(np.float32) / 32768.0
    if data.dtype == np.int32:
        return data.astype(np.float32) / 2147483648.0
    if data.dtype == np.uint8:
        return (data.astype(np.float32) - 128.0) / 128.0
    return data.astype(np.float32)


def load_audio_16k(path):
    from scipy.io import wavfile
    from scipy import signal as sp_signal
    sr, data = wavfile.read(str(path))
    x = _to_float_mono(data)
    if sr != TARGET_SR:
        g = math.gcd(int(sr), TARGET_SR)
        x = sp_signal.resample_poly(x, TARGET_SR // g, int(sr) // g).astype(np.float32)
    return x


# ---------------------------------------------------------------- scoring
_ENCODER = None


def get_encoder():
    global _ENCODER
    if _ENCODER is None:
        from resemblyzer import VoiceEncoder
        _ENCODER = VoiceEncoder(verbose=False)
    return _ENCODER


def embed(path):
    from resemblyzer import preprocess_wav
    x = load_audio_16k(path)
    wav = preprocess_wav(x, source_sr=TARGET_SR)
    return np.asarray(get_encoder().embed_utterance(wav), dtype=np.float64)


def cosine(a, b):
    return float(np.dot(a, b) / (np.linalg.norm(a) * np.linalg.norm(b)))


def stats_of(path):
    from scipy.io import wavfile
    sr, data = wavfile.read(str(path))
    x = _to_float_mono(data).astype(np.float64)
    rms = float(np.sqrt(np.mean(x ** 2))) if x.size else 0.0
    peak = float(np.max(np.abs(x))) if x.size else 0.0
    return {"duration_s": round(len(x) / sr, 2),
            "rms_db": round(20 * math.log10(rms + 1e-12), 2),
            "peak_db": round(20 * math.log10(peak + 1e-12), 2)}


# ---------------------------------------------------------------- chunking
_SENTENCE_SPLIT = re.compile(r"(?<=[.!?…])\s+")


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


# ---------------------------------------------------------------- modes
def mode_scorebase():
    decode()
    OUT.mkdir(parents=True, exist_ok=True)
    ref_emb = embed(WORK / "ref.wav")
    results = {}
    for key in ("base1", "base2", "base3", "heldout", "neg"):
        p = WORK / f"{key}.wav"
        s = cosine(ref_emb, embed(p))
        results[key] = round(s, 4)
        log(f"score {key}: {s:.4f}")
    (OUT / "scores_base.json").write_text(json.dumps(results, indent=2))
    print("[imp] RESULT " + json.dumps(results))
    return 0


def mode_synth(args):
    decode()
    OUT.mkdir(parents=True, exist_ok=True)
    ref_path = STAGE / args.ref if not args.ref.startswith("imp_work") else STAGE / args.ref
    if not ref_path.exists():
        log(f"FAIL: ref missing: {ref_path}")
        return 2
    text = TEXTS[args.clip]
    chunks = chunk_text(text)
    log(f"synth {args.name}: clip={args.clip} ex={args.ex} cfg={args.cfg} "
        f"ref={args.ref} chunks={len(chunks)}")
    os.environ.setdefault("HF_HOME", os.path.expanduser("~/.cache/cloudpc-models/hf"))
    from chatterbox.tts import ChatterboxTTS
    t0 = time.time()
    model = ChatterboxTTS.from_pretrained(device="cpu")
    sr = model.sr
    log(f"model loaded in {time.time()-t0:.1f}s sr={sr}")
    parts = []
    for i, ctext in enumerate(chunks):
        try:
            wav = model.generate(ctext, audio_prompt_path=str(ref_path),
                                 exaggeration=args.ex, cfg_weight=args.cfg)
        except TypeError as e:
            log(f"chunk {i}: kwargs rejected ({e}); retrying bare")
            wav = model.generate(ctext, audio_prompt_path=str(ref_path))
        arr = wav.detach().cpu().numpy().squeeze().astype(np.float64)
        peak = max(1e-8, float(np.max(np.abs(arr)))) if arr.size else 1.0
        arr = arr / peak * 0.89
        parts.append(arr)
        log(f"chunk {i}: {len(arr)/sr:.1f}s")
    final = crossfade_concat(parts, sr)
    out_wav = OUT / f"{args.name}.wav"
    write_wav(out_wav, final, sr)
    st = stats_of(out_wav)
    ref_emb = embed(WORK / "ref.wav")
    score = cosine(ref_emb, embed(out_wav))
    rec = {"name": args.name, "clip": args.clip, "exaggeration": args.ex,
           "cfg_weight": args.cfg, "ref": args.ref, "ge2e": round(score, 4), **st}
    (OUT / f"score_{args.name}.json").write_text(json.dumps(rec, indent=2))
    print("[imp] RESULT " + json.dumps(rec))
    return 0


def main():
    ap = argparse.ArgumentParser()
    sub = ap.add_subparsers(dest="mode", required=True)
    sub.add_parser("decode")
    sub.add_parser("scorebase")
    sp = sub.add_parser("synth")
    sp.add_argument("--clip", required=True, choices=list(TEXTS))
    sp.add_argument("--ex", type=float, required=True)
    sp.add_argument("--cfg", type=float, required=True)
    sp.add_argument("--ref", required=True)
    sp.add_argument("--name", required=True)
    args = ap.parse_args()
    if args.mode == "decode":
        decode(); return 0
    if args.mode == "scorebase":
        return mode_scorebase()
    if args.mode == "synth":
        return mode_synth(args)
    return 2


if __name__ == "__main__":
    sys.exit(main())
