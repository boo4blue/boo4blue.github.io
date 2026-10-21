#!/usr/bin/env python3
"""Decode a .b64 text file back to binary (stdlib only).
Usage: python3 decode_ref.py <src.b64> <dst>
"""
import base64
import sys

src, dst = sys.argv[1], sys.argv[2]
raw = open(src, "r").read()
data = base64.b64decode("".join(raw.split()))
open(dst, "wb").write(data)
print(f"decoded {len(raw)} chars -> {dst} ({len(data)} bytes)")
