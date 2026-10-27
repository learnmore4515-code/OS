# CLAUDE.md — AI Agency Research Project

## Purpose
Persistent research knowledge base for Kim's AI automation agency. Survives across sessions. Built from processed YouTube video evidence (not generic advice).

## Directory structure

| Path | Purpose |
|------|---------|
| `research/videos/<NNN>-<ID>.md` | One research note per processed video |
| `research/videos/<NNN>-<ID>.transcript.txt` | Raw transcript per video |
| `research/creators/` | Aggregated notes per creator |
| `research/topics/` | Thematic synthesis (niche, offers, acquisition, sales, fulfillment, pricing, tools, scaling, failures) |
| `research/evidence-matrix.md` | Major claims, supporting/contradicting sources, evidence strength |
| `research/contradictions.md` | Conflicting advice resolved as conditional rules |
| `research/research-synthesis.md` | Cross-video value-chain synthesis |
| `research/CURRENT-RECOMMENDATION.md` | Current answer to "what should Kim do right now?" |
| `research/MASTER-AI-AGENCY-PLAYBOOK.md` | PLAYBOOK-v1 (2026-10-19), all 22 parts, audit PASS WITH CONDITIONS |
| `research/PLAYBOOK-AUDIT.md` | Mandatory audit; passed with 4 conditions |
| `research/playbooks/CURRENT-PLAYBOOK.md` | Points to active versioned playbook |
| `research/video-research-ledger.md` | Every source URL accounted for, status per video |
| `decisions/log.md` | Append-only record of decisions and why |
| `responses.md` | LinkedIn DM scripts + reply log for broker discovery |
| `transcribe.py` | yt-dlp audio + faster-whisper (tiny, CPU) transcription |
| `vtt2transcript.py` | YouTube auto-caption VTT → timestamped transcript |
| `subs_batch1.sh`, `subs_batch2.sh` | Caption download batches |

## Transcription pipeline usage

```
python transcribe.py <VIDEO_ID> <OUTPUT_TRANSCRIPT_PATH> [MODEL_SIZE]
```
- MODEL_SIZE defaults to "tiny" (fast CPU). Skips if output already exists.
- VAD disabled (Silero OOMs on long audio on this machine).
- VTT route: `python vtt2transcript.py <INPUT.VTT> <OUTPUT.TXT> <VIDEO_ID>`

## Active playbook

**Adopted direction:** service-first AI Automation Agency (PLAYBOOK-v1, 2026-10-19). Audit passed with conditions.

**Niche:** insurance brokers (4-factor unfair-advantage audit — business access).

**Current stage:** Stage 4 — Getting the first customer (problem discovery with insurance brokers).

**Objective:** first paid AI-automation client at $1,000–$2,000 within 30–60 days.

**Audit conditions (must be met):**
1. 20-person warm-contact trust map before Stage 4.
2. Verify ability to receive payment (Stripe/USD equivalent) from Kenya, or price in local currency.
3. Treat all revenue figures except Liam Ottley's $1,000 Stripe proof as directional; measure own conversion.
4. Cold outreach deferred until after 1–2 paid proof clients.

## Key files to edit
- `decisions/log.md` — record decisions here, append-only.
- `responses.md` — LinkedIn DM scripts and reply log; add each new conversation as a row.

## Rules
- A video is PROCESSED only when its substance is extracted into `research/videos/<id>.md`. Finding a title is not enough.
- No SaaS/custom code/employees/paid ads until after proof + revenue.
- Discovery first, pitch never on the first call. Testimonial/referral only after delivered proof.
