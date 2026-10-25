#!/usr/bin/env python3
"""Bark sung-vocal renderer with GIT-STORAGE delivery (runs in a Cloud PC job).
Usage: bark_sing_store.py <lyrics-file> <start-line> <end-line> <tag>
Like bark_sing.py, but after each line it also writes base64 chunks of the
WAV into cloud-pc/storage/voices/ so the runner's results commit carries the
audio home (Gofile's download API is premium-gated now). Per-line writes mean
a later line's timeout can't take finished lines with it.
"""
import sys, os, base64
os.environ["TORCH_FORCE_NO_WEIGHTS_ONLY_LOAD"] = "1"  # torch>=2.6 default breaks bark ckpts

lyrics_file, a, b, tag = sys.argv[1], int(sys.argv[2]), int(sys.argv[3]), sys.argv[4]
lines = [l.strip() for l in open(lyrics_file) if l.strip()]
sel = lines[a - 1:b]
print("rendering %d lines (%d-%d)" % (len(sel), a, b), flush=True)

STORE_DIR = os.path.normpath(os.path.join(
    os.path.dirname(os.path.abspath(__file__)), "..", "storage", "voices"))
os.makedirs(STORE_DIR, exist_ok=True)

from bark import SAMPLE_RATE, generate_audio, preload_models
from scipy.io.wavfile import write as write_wav

preload_models()
print("MODELS_READY", flush=True)

CH = 250000
for i, line in enumerate(sel, start=a):
    text = "♪ " + line + " ♪"
    audio = generate_audio(text, history_prompt="v2/en_speaker_6")
    out = "/tmp/%s-%d.wav" % (tag, i)
    write_wav(out, SAMPLE_RATE, audio)
    raw = open(out, "rb").read()
    b64 = base64.b64encode(raw).decode()
    nch = (len(b64) + CH - 1) // CH
    for k in range(nch):
        with open(os.path.join(STORE_DIR, "%s-%d.b64.p%02d" % (tag, i, k)), "w") as f:
            f.write(b64[k * CH:(k + 1) * CH])
    print("SEGMENT %d %s | wav %d bytes, %d chunks stored" % (i, line[:40], len(raw), nch), flush=True)
print("BARK_SING_DONE", flush=True)
