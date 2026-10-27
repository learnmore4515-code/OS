# Convert YouTube auto-caption VTT to the project's timestamped transcript format.
# Usage: python vtt2transcript.py <INPUT.VTT> <OUTPUT_TRANSCRIPT.TXT> <VIDEO_ID>
import sys
import re
import html

if len(sys.argv) < 4:
    print("usage: python vtt2transcript.py <INPUT.VTT> <OUTPUT.TXT> <VIDEO_ID>")
    sys.exit(2)

inp, outp, vid = sys.argv[1], sys.argv[2], sys.argv[3]


def to_seconds(ts):
    # HH:MM:SS.mmm
    parts = ts.strip().split(":")
    h = int(parts[0]); m = int(parts[1]); s_ms = parts[2]
    if "." in s_ms:
        s, ms = s_ms.split(".")
    else:
        s, ms = s_ms, "0"
    return h * 3600 + m * 60 + int(s) + int(ms.ljust(3, "0")[:3]) / 1000.0


clean_tag = re.compile(r"<[^>]+>")
timestamp_line = re.compile(r"^(\d{2}:\d{2}:\d{2}\.\d{3})\s*-->\s*(\d{2}:\d{2}:\d{2}\.\d{3})")


def clean_text(t):
    t = clean_tag.sub(" ", t)
    t = html.unescape(t)
    t = re.sub(r"\s+", " ", t).strip()
    return t


segments = []
current = None
buf = []
with open(inp, "r", encoding="utf-8") as f:
    for line in f:
        line = line.rstrip("\n")
        m = timestamp_line.match(line)
        if m:
            if current is not None:
                text = clean_text(" ".join(buf))
                if text:
                    segments.append((current[0], current[1], text))
            current = (to_seconds(m.group(1)), to_seconds(m.group(2)))
            buf = []
            continue
        if line.strip() == "" or line.strip().upper() == "WEBVTT":
            continue
        if current is not None:
            buf.append(line)
if current is not None:
    text = clean_text(" ".join(buf))
    if text:
        segments.append((current[0], current[1], text))


lines = [f"# Transcript: {vid}", "Language: en", ""]
for s, e, t in segments:
    lines.append(f"[{s:.1f}s - {e:.1f}s] {t}")
transcript = "\n".join(lines)

import os
os.makedirs(os.path.dirname(outp) or ".", exist_ok=True)
with open(outp, "w", encoding="utf-8") as f:
    f.write(transcript)
print(f"WROTE: {outp} ({len(segments)} segments, {len(transcript)} chars)")
