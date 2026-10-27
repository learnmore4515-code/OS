# Hyperframes Composition Brief: BrokerFlow AI

## Objective
Create a short launch-style brag video for BrokerFlow AI, a document chase dashboard for Kenyan insurance brokers.

## Output
- Composition directory: `brag-output/composition/`
- Rendered video: `brag-output/brag.mp4`
- Format: landscape — 1920x1080
- Duration: 20 seconds

## Source Material
- Project root: `C:/Users/profe/Downloads/OS/other worlds/agency/broker-flow-ai`
- Primary files read: `broker-dashboard.html`, `client-upload.html`, `CLAUDE.md`
- Product name: BrokerFlow AI
- Tagline / strongest claim: "Zero-touch document intake for KYC, claims, and onboarding paperwork. Chasing clients for missing documents — autonomously."
- Key UI or visual moment to recreate: the create-case form and the client upload page
- Copy that must appear verbatim:
  - "Document Chase Dashboard"
  - "Zero-touch document intake for KYC, claims, and onboarding paperwork."
  - "Create document-chase case"
  - "Create case & send request"
  - "Upload your documents"
  - "Documents submitted"
  - "Mark docs received"
  - "Exception queue (>7d)"
  - "BrokerFlow AI. Zero-touch document intake. Stop chasing."

## Creative Direction
- Tone preset: default
- Creative direction: a clean, playful admin dashboard film — the paperwork is the star
- Interpretation: comfortable 4-5 scenes, soft transitions, warm energy, no corporate buzzwords
- Angle: insurance broking runs on paperwork clients never send; BrokerFlow AI makes it zero-touch
- Hook: a broker stares at "Docs received: 0" while the exception queue ticks over 7 days, then a client upload lands
- Outro / punchline: "BrokerFlow AI. Zero-touch document intake. Stop chasing."
- Avoid:
  - Generic SaaS language ("streamline your workflow")
  - Abstract filler visuals
  - Unrelated visual redesign

## Visual Identity
- Background: #F8FAFC (paper-soft)
- Text: #0F172A (ink)
- Accent: #059669 (mpesa-green), #DC2626 (stamp-red) for exceptions, #D97706 (exception-amber)
- Display font: system sans (-apple-system, BlinkMacSystemFont, Segoe UI, Roboto)
- Body font: system sans
- Data font: SF Mono / monospace
- Visual references from the project: stat cards, create-case form, client upload page, status badges

## Storyboard
Scene summary:
1. Hook — 3s — "Docs received: 0" stat + red exception queue pill
2. Reveal — 4s — dashboard title, subtitle, full stat row settling one card at a time
3. Highlight: create case — 5s — form fields appear one by one, submit clicked
4. Highlight: client upload — 4s — choose files, upload clicked, "Documents submitted"
5. Outro — 4s — mark docs received, stat flips 0→1, final punchline

## Audio
- Audio role: warm professional bed with tasteful SFX
- Audio arc: bed fades in under hook, carries through highlights, fades under final logo
- Music: happy-beats-business-moves-vol-1-by-ende-dot-app.mp3
- Music treatment: bed at ~0.35 volume, fade under final logo
- Music cue guidance: bundled preset for vol-1; 1-3 strong cues for major reveals; beat-grid for sequential form fields; detect at composition if preset unavailable
- Audio-reactive treatment: subtle; hero glow breathes with music RMS
- Audio-coupled moments:
  - Scene 2 — stat cards arrive → card-place sound each
  - Scene 3 — form fields appear → card-slide sound each; submit → click
  - Scene 4 — upload clicked → click; "Documents submitted" → success bell
  - Scene 5 — mark received → success bell; stat flip → soft tick
- SFX selection guidance: card sounds for card-like reveals, short announcement cue for major payoffs, key/click sounds for user actions, restraint when the edit is busy
- SFX analysis guidance: skills/brag/assets/sfx/sfx-analysis.md present; prefer low high-frequency-risk sounds for repeated/polished moments
- Exact SFX choice: Hyperframes chooses filenames, timestamps, density, and volume based on the implemented animation
- Audio files: copy chosen music and Hyperframes-selected SFX into `brag-output/composition/assets/`

## Hyperframes Instructions
Load the composition-building Hyperframes domain skills — `hyperframes-core` (composition contract + `data-*` timing), `hyperframes-animation` (motion), `hyperframes-creative` (design spec, beats, audio-reactive), `hyperframes-keyframes` (seek-safe keyframes), and `hyperframes-cli` (lint/check/render). /brag is its own workflow: do not enter the `hyperframes` entry-point intent interview and do not route into its generic promo / launch-video workflow. Prefer native Hyperframes conventions over anything in `/brag`.

Requirements:
- Show at least one real UI, copy, or visual element from the source project.
- Keep all text readable in the final render.
- Keep the video within 15-25 seconds.
- Include the planned music/SFX layer.
- Treat `/brag` audio notes as guidance, not a fixed cue sheet. Choose SFX after the visual animation exists.
- Treat music cue metadata as optional timing hints. Hyperframes decides exact animation timing and should ignore cues that hurt readability, scene pacing, or the product story.
- Major reveals may move toward nearby strong cues within about 0.15s. Smaller entrances may align to nearby beat points within about 0.10s. Use only 1-3 strong cue locks.
- Use SFX to support motion and interaction: card sounds for card-like reveals, short announcement cues for major payoffs, key/click sounds for text or user actions, restraint when the edit is already busy.
- Honor planned music treatment such as fade-outs, ducking, beat-aligned reveals, or letting a final SFX ring over the music.
- When music is present, consider Hyperframes audio-reactive workflow: extract audio data and use RMS/frequency bands for subtle motion (glow, presence), not waveform/equalizer visuals.
- Use local assets for audio and any required runtime/media dependencies.
- Run `hyperframes check` before render — it is brag's single gate.
- Keep creation and rendering local.

## Audio asset preparation
Copy the planned music into `brag-output/composition/assets/music/` before building the composition.

## Voiceover
Disabled. Do not write a voiceover script, generate narration, or merge narration into the video.

## Self-review checklist
- [ ] `brag-output/composition-brief.md` exists.
- [ ] The brief clearly identifies the exact product moments to show.
- [ ] The composition uses the current Hyperframes workflow, not a hardcoded `/brag` template.
- [ ] Music file is copied into `brag-output/composition/assets/music/`.
- [ ] At least one visual element subtly reacts to the music, or extraction failure is documented.
- [ ] At least 1 major tween is beat-locked to a strong cue within ±0.15s, marked `// beat-locked` (or natural timing was chosen for readability).
- [ ] Sequential events snap to consecutive `beats[]` timestamps (±0.10s), marked `// beat-grid` (or natural timing was chosen for readability).
- [ ] The composition shows at least one real UI, copy, or visual element from the project.
- [ ] Every factual claim on screen is grounded in the project.
- [ ] Total duration is 15-25 seconds.
- [ ] Hyperframes check passes, or any blocker is documented for the user.
