#!/usr/bin/env python3
"""Decode the base64 voice reference into a real WAV file."""
import base64, os
here = os.path.dirname(os.path.abspath(__file__))
src = os.path.join(here, "naruto-ref.wav.b64")
dst = os.path.join(here, "naruto-ref.wav")
with open(src) as f:
    data = base64.b64decode(f.read())
with open(dst, "wb") as f:
    f.write(data)
print(f"decoded {len(data)} bytes -> {dst}")
