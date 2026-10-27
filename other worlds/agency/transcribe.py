# Transcription pipeline: yt-dlp audio download + faster-whisper transcription.
# Usage: python transcribe.py <VIDEO_ID> <OUTPUT_TRANSCRIPT_PATH> [MODEL_SIZE]
# MODEL_SIZE defaults to "tiny" (fast CPU transcription; good enough for extracting
# offers, pricing, tactics). Skips if transcript already exists.
import sys
import os
import subprocess
import tempfile
from faster_whisper import WhisperModel

MODEL_SIZE = sys.argv[3] if len(sys.argv) > 3 else "tiny"
DEVICE = "cpu"
COMPUTE_TYPE = "int8"  # faster on CPU


def download_audio(video_id, out_dir):
    url = f"https://youtu.be/{video_id}"
    out_tmpl = os.path.join(out_dir, "%(id)s.%(ext)s")
    cmd = [
        "yt-dlp",
        "-x", "--audio-format", "mp3", "--audio-quality", "0",
        "-o", out_tmpl,
        url,
    ]
    subprocess.run(cmd, check=True, capture_output=True)
    for f in os.listdir(out_dir):
        if f.startswith(video_id + "."):
            return os.path.join(out_dir, f)
    raise FileNotFoundError(f"audio not downloaded for {video_id}")


def main():
    if len(sys.argv) < 3:
        print("usage: python transcribe.py <VIDEO_ID> <OUTPUT_TRANSCRIPT_PATH>")
        sys.exit(2)
    video_id = sys.argv[1]
    out_path = sys.argv[2]
    if os.path.exists(out_path) and os.path.getsize(out_path) > 0:
        print(f"SKIP (exists): {out_path}")
        return
    model = WhisperModel(MODEL_SIZE, device=DEVICE, compute_type=COMPUTE_TYPE)
    with tempfile.TemporaryDirectory() as td:
        audio_path = download_audio(video_id, td)
        segments, info = model.transcribe(
            audio_path,
            beam_size=1,
            vad_filter=False,  # disabled: VAD (Silero) allocates huge arrays on long audio -> OOM on this machine
            language=None,
        )
        lines = [f"# Transcript: {video_id}", f"Language: {info.language}", ""]
        for seg in segments:
            lines.append(f"[{seg.start:.1f}s - {seg.end:.1f}s] {seg.text.strip()}")
        transcript = "\n".join(lines)
    os.makedirs(os.path.dirname(out_path) or ".", exist_ok=True)
    with open(out_path, "w", encoding="utf-8") as f:
        f.write(transcript)
    print(f"DROVE: {out_path} ({len(transcript)} chars)")


if __name__ == "__main__":
    main()
