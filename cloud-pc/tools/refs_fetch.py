#!/usr/bin/env python3
"""Fetch 4 reference tracks via yt-dlp (runs in a Cloud PC job).

Downloads one bestaudio result per search into cloud-pc/storage/refs/<slug>/,
writes meta.json (title/sha256/size/ext) and splits the audio into 90KB
base64 text chunks so the runner's results commit carries the audio home
(Gofile programmatic downloads are dead; repo storage is the proven route).
"""
import base64
import hashlib
import json
import os
import subprocess
import sys

HERE = os.path.dirname(os.path.abspath(__file__))
STORAGE = os.path.normpath(os.path.join(HERE, "..", "storage"))
REFS = os.path.join(STORAGE, "refs")
os.makedirs(REFS, exist_ok=True)

SEARCHES = [
    ("sueco-paralyzed", "ytsearch1:Sueco Paralyzed official audio"),
    ("sueco-loser", "ytsearch1:Sueco Loser official audio"),
    ("stellar-ashes", "ytsearch1:Stellar Ashes official audio"),
    ("stellar-baddream", "ytsearch1:Stellar Bad Dream official audio"),
]

CHUNK = 90000


def run(cmd, **kw):
    return subprocess.run(cmd, capture_output=True, text=True, **kw)


def main():
    r = run([sys.executable, "-m", "pip", "install", "-q", "yt-dlp"])
    if r.returncode != 0:
        print("REFS_FAIL ALL pip install yt-dlp failed: " + (r.stderr or "")[-300:], flush=True)
        return
    print("YTDLP_READY", flush=True)

    for slug, query in SEARCHES:
        sdir = os.path.join(REFS, slug)
        os.makedirs(sdir, exist_ok=True)
        # clean stale chunks/meta from any previous attempt
        for f in os.listdir(sdir):
            if f.startswith("chunk-") or f == "meta.json" or f.startswith("audio."):
                os.unlink(os.path.join(sdir, f))
        try:
            t = run([sys.executable, "-m", "yt_dlp", "--no-playlist",
                     "--skip-download", "--no-warnings",
                     "--print", "%(title)s", query], timeout=120)
            title = (t.stdout or "").strip().splitlines()
            title = title[0].strip() if title else ""
            if t.returncode != 0 or not title:
                print("REFS_FAIL %s title lookup failed: %s" % (
                    slug, (t.stderr or "no title")[-200:]), flush=True)
                continue
            tmpl = os.path.join(sdir, "audio.%(ext)s")
            d = run([sys.executable, "-m", "yt_dlp", "-f",
                     "bestaudio[abr<=96]/bestaudio", "--no-playlist",
                     "--no-warnings", "-o", tmpl, query], timeout=420)
            files = [f for f in os.listdir(sdir) if f.startswith("audio.")]
            if d.returncode != 0 or not files:
                print("REFS_FAIL %s download failed: %s" % (
                    slug, (d.stderr or "no file")[-200:]), flush=True)
                continue
            fname = files[0]
            ext = fname.split(".", 1)[1]
            raw = open(os.path.join(sdir, fname), "rb").read()
            size = len(raw)
            sha = hashlib.sha256(raw).hexdigest()
            meta = {"slug": slug, "title": title, "file": fname, "ext": ext,
                    "size": size, "sha256": sha}
            with open(os.path.join(sdir, "meta.json"), "w") as f:
                json.dump(meta, f, indent=1)
            b64 = base64.b64encode(raw).decode()
            nch = (len(b64) + CHUNK - 1) // CHUNK
            for k in range(nch):
                with open(os.path.join(sdir, "chunk-%03d.txt" % k), "w") as f:
                    f.write(b64[k * CHUNK:(k + 1) * CHUNK])
            print("REFS_OK %s %s %d %d" % (slug, title, size, nch), flush=True)
        except Exception as e:  # keep going with the other slugs
            print("REFS_FAIL %s %s" % (slug, str(e)[:200]), flush=True)
    print("REFS_DONE", flush=True)


if __name__ == "__main__":
    main()
