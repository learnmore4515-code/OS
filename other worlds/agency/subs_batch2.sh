#!/bin/bash
# Batch 2: download auto-subtitles + convert to transcripts for REMAINING videos.
# Skips existing transcripts. Retries once on failure. Sleeps between downloads to avoid YouTube 429.
cd "C:\Users\profe\Downloads\OS\other worlds\agency"
mkdir -p /tmp/subs
jobs=(
  "1kJ8IUANR8s 001 research/videos/001-1kJ8IUANR8s.transcript.txt"
  "rU1vjOzM158 002 research/videos/002-rU1vjOzM158.transcript.txt"
  "ZT4LqD2_GwM 005 research/videos/005-ZT4LqD2_GwM.transcript.txt"
  "w-XPlC3a2oI 006 research/videos/006-w-XPlC3a2oI.transcript.txt"
  "VzOYty0siaM 008 research/videos/008-VzOYty0siaM.transcript.txt"
  "XUYvDbAv1IA 009 research/videos/009-XUYvDbAv1IA.transcript.txt"
  "WzrY8kat1Os 011 research/videos/011-WzrY8kat1Os.transcript.txt"
  "C2NZs1fCLfo 013 research/videos/013-C2NZs1fCLfo.transcript.txt"
  "lDJ2hWhUH8I 016 research/videos/016-lDJ2hWhUH8I.transcript.txt"
  "Qag4LAvWqms 018 research/videos/018-Qag4LAvWqms.transcript.txt"
  "43MdhyYl2hY 020 research/videos/020-43MdhyYl2hY.transcript.txt"
  "5aZZNskTsx0 024 research/videos/024-5aZZNskTsx0.transcript.txt"
  "8CreHb-P0mU 025 research/videos/025-8CreHb-P0mU.transcript.txt"
  "bMmlCPLDk1c 026 research/videos/026-bMmlCPLDk1c.transcript.txt"
  "t_FUcOE4stk 027 research/videos/027-t_FUcOE4stk.transcript.txt"
  "AShyOwbXvIw 028 research/videos/028-AShyOwbXvIw.transcript.txt"
  "5TxSqvPbnWw 029 research/videos/029-5TxSqvPbnWw.transcript.txt"
  "5OUWur-Lv5c 030 research/videos/030-5OUWur-Lv5c.transcript.txt"
  "EMcxBnlAVxE 031 research/videos/031-EMcxBnlAVxE.transcript.txt"
  "PXgUq9ZMcjA 032 research/videos/032-PXgUq9ZMcjA.transcript.txt"
  "kQFW3bUrOu4 033 research/videos/033-kQFW3bUrOu4.transcript.txt"
  "eTSqLF8heZA 034 research/videos/034-eTSqLF8heZA.transcript.txt"
  "j4WPALlRO3c 035 research/videos/035-j4WPALlRO3c.transcript.txt"
  "4UOqP9-q8ak 036 research/videos/036-4UOqP9-q8ak.transcript.txt"
  "Ru5zvyvClnI 037 research/videos/037-Ru5zvyvClnI.transcript.txt"
  "n5BumiSVRuA 038 research/videos/038-n5BumiSVRuA.transcript.txt"
  "5egtM2Eat_E 039 research/videos/039-5egtM2Eat_E.transcript.txt"
  "KTkwih-rK3Q 040 research/videos/040-KTkwih-rK3Q.transcript.txt"
  "m4AINeLyx1A 041 research/videos/041-m4AINeLyx1A.transcript.txt"
  "2NCXyvDR5Yk 042 research/videos/042-2NCXyvDR5Yk.transcript.txt"
  "AqzFRaxi5Mg 048 research/videos/048-AqzFRaxi5Mg.transcript.txt"
  "2gjvMZJ8MCk 050 research/videos/050-2gjvMZJ8MCk.transcript.txt"
  "Vy5Gj8Ma7oc 051 research/videos/051-Vy5Gj8Ma7oc.transcript.txt"
  "r0dQOaTzexI 052 research/videos/052-r0dQOaTzexI.transcript.txt"
  "mjNDpscDL2U 053 research/videos/053-mjNDpscDL2U.transcript.txt"
  "blg-OJc68U0 054 research/videos/054-blg-OJc68U0.transcript.txt"
  "jpBoKl7VjuI 055 research/videos/055-jpBoKl7VjuI.transcript.txt"
  "zvhlgkPnPmk 056 research/videos/056-zvhlgkPnPmk.transcript.txt"
  "WcW6nSE1F_k 057 research/videos/057-WcW6nSE1F_k.transcript.txt"
  "uaEXcgBpLbo 058 research/videos/058-uaEXcgBpLbo.transcript.txt"
  "cWHnKZFgQg4 059 research/videos/059-cWHnKZFgQg4.transcript.txt"
  "cYi7JM5IOE0 060 research/videos/060-cYi7JM5IOE0.transcript.txt"
  "c2C_SbZk6iI 061 research/videos/061-c2C_SbZk6iI.transcript.txt"
  "SAerRtQLD0I 062 research/videos/062-SAerRtQLD0I.transcript.txt"
  "-TFXSGABlRE 063 research/videos/063--TFXSGABlRE.transcript.txt"
  "GNoiPpcCbgo 064 research/videos/064-GNoiPpcCbgo.transcript.txt"
)
for job in "${jobs[@]}"; do
  set -- $job
  id=$1; num=$2; out=$3
  if [ -f "$out" ] && [ -s "$out" ]; then echo "SKIP $out"; continue; fi
  echo "=== SUBS $id ==="
  ok=0
  for attempt in 1 2; do
    rm -f "/tmp/subs/${id}.en.vtt"
    yt-dlp --write-auto-subs --sub-lang en --skip-download -o "/tmp/subs/${id}" "https://youtu.be/${id}" >/dev/null 2>&1
    if [ -f "/tmp/subs/${id}.en.vtt" ]; then ok=1; break; fi
    echo "  retry $attempt failed for $id, sleeping..."
    sleep 5
  done
  if [ $ok -eq 1 ]; then
    python vtt2transcript.py "/tmp/subs/${id}.en.vtt" "$out" "$id"
  else
    echo "NO SUBS $id"
  fi
  sleep 3
done
echo "SUBS BATCH 2 DONE"
