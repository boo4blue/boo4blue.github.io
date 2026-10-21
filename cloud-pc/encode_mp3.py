#!/usr/bin/env python3
"""Encode WAV -> MP3 on the Cloud PC runner.
Tries ffmpeg, then lameenc (pip), else copies WAV bytes to the .mp3 path.
Usage: python3 encode_mp3.py <in.wav> <out.mp3>
"""
import os
import shutil
import subprocess
import sys
import wave

wav, mp3 = sys.argv[1], sys.argv[2]
ok = False

if shutil.which("ffmpeg"):
    r = subprocess.run(
        ["ffmpeg", "-y", "-v", "error", "-i", wav,
         "-codec:a", "libmp3lame", "-b:a", "128k", mp3])
    ok = r.returncode == 0 and os.path.getsize(mp3) > 10000
    print("ffmpeg:", "ok" if ok else "failed")

if not ok:
    try:
        subprocess.run([sys.executable, "-m", "pip", "install", "-q", "lameenc"],
                       check=True, timeout=600)
        import lameenc
        w = wave.open(wav)
        pcm = w.readframes(w.getnframes())
        sr, nch = w.getframerate(), w.getnchannels()
        enc = lameenc.Encoder()
        enc.set_bit_rate(128)
        enc.set_in_sample_rate(sr)
        enc.set_channels(nch)
        enc.set_quality(2)
        open(mp3, "wb").write(enc.encode(pcm) + enc.flush())
        ok = True
        print("lameenc ok")
    except Exception as e:
        print("lameenc failed:", str(e)[:200])

if not ok:
    shutil.copy(wav, mp3)
    print("fallback: wav bytes written to .mp3 path")

print("final size:", os.path.getsize(mp3))
