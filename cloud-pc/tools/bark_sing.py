#!/usr/bin/env python3
"""Bark sung-vocal renderer (runs inside a Cloud PC job, CWD=cloud-pc/).
Usage: bark_sing.py <lyrics-file> <start-line> <end-line> <tag>
Renders each line as a sung segment (Bark, CPU), uploads each WAV to
Gofile immediately (survives a job timeout), prints SEGMENT lines.
"""
import sys, subprocess, os

lyrics_file, a, b, tag = sys.argv[1], int(sys.argv[2]), int(sys.argv[3]), sys.argv[4]
lines = [l.strip() for l in open(lyrics_file) if l.strip()]
sel = lines[a - 1:b]
print("rendering %d lines (%d-%d)" % (len(sel), a, b), flush=True)

from bark import SAMPLE_RATE, generate_audio, preload_models
from scipy.io.wavfile import write as write_wav

preload_models()
print("MODELS_READY", flush=True)

for i, line in enumerate(sel, start=a):
    text = "\u266a " + line + " \u266a"
    audio = generate_audio(text, history_prompt="v2/en_speaker_6")
    out = "/tmp/%s-%d.wav" % (tag, i)
    write_wav(out, SAMPLE_RATE, audio)
    r = subprocess.run(["curl", "-s", "-F", "file=@%s" % out,
                        "https://store1.gofile.io/uploadFile"],
                       capture_output=True, text=True)
    print("SEGMENT %d %s -> %s" % (i, line[:40], r.stdout[:300]), flush=True)
print("BARK_SING_DONE", flush=True)
