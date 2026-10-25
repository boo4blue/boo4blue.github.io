#!/usr/bin/env python3
"""Bark multi-take sung-vocal renderer with GIT-STORAGE delivery (Cloud PC job).
Usage: bark_sing_takes.py <lyrics-file> <line-number> <preset> <tag> <takes-csv>
Example: bark_sing_takes.py lyrics.txt 3 v2/en_speaker_9 embers 1,2

Renders the given takes of ONE line, each take a fresh Bark generation with a
different RNG seed (Bark's own sampling randomness is the variation). Every
take's WAV is base64-chunked into its own dir under
cloud-pc/storage/voices/<tag>/L<line>-T<take>/ so the runner's results commit
carries the audio home (Gofile downloads are premium-gated now).
A failed take prints TAKE_FAIL and does not kill the others.
"""
import sys, os, base64, random
os.environ["TORCH_FORCE_NO_WEIGHTS_ONLY_LOAD"] = "1"  # torch>=2.6 default breaks bark ckpts

lyrics_file = sys.argv[1]
line_no = int(sys.argv[2])
preset = sys.argv[3]
tag = sys.argv[4]
takes = [int(x) for x in sys.argv[5].split(",") if x.strip()]

lines = [l.strip() for l in open(lyrics_file) if l.strip()]
line = lines[line_no - 1]
print("line %d: %s | preset %s | takes %s" % (line_no, line, preset, takes), flush=True)

STORE_DIR = os.path.normpath(os.path.join(
    os.path.dirname(os.path.abspath(__file__)), "..", "storage", "voices", tag))
os.makedirs(STORE_DIR, exist_ok=True)

from bark import SAMPLE_RATE, generate_audio, preload_models
import numpy as np
import torch
from scipy.io.wavfile import write as write_wav

preload_models()
print("MODELS_READY", flush=True)

CH = 250000
text = "♪ " + line + " ♪"
for take in takes:
    seed = line_no * 1000 + take * 131 + 7
    try:
        random.seed(seed)
        np.random.seed(seed % (2 ** 32))
        torch.manual_seed(seed)
        audio = generate_audio(text, history_prompt=preset)
        out = "/tmp/%s-L%d-T%d.wav" % (tag, line_no, take)
        write_wav(out, SAMPLE_RATE, audio)
        raw = open(out, "rb").read()
        b64 = base64.b64encode(raw).decode()
        nch = (len(b64) + CH - 1) // CH
        tdir = os.path.join(STORE_DIR, "L%d-T%d" % (line_no, take))
        os.makedirs(tdir, exist_ok=True)
        for k in range(nch):
            with open(os.path.join(tdir, "seg.b64.p%02d" % k), "w") as f:
                f.write(b64[k * CH:(k + 1) * CH])
        print("TAKE_OK L%d T%d seed %d | wav %d bytes, %d chunks stored"
              % (line_no, take, seed, len(raw), nch), flush=True)
    except Exception as e:
        print("TAKE_FAIL L%d T%d | %s: %s" % (line_no, take, type(e).__name__, e), flush=True)
print("BARK_TAKES_DONE", flush=True)
