# Hyperframes Composition Brief: BrokerFlow AI (Fiverr Gig Promo)

## Objective
Create a short, polished launch-style brag video for the BrokerFlow AI Fiverr gig — business workflow automation (n8n workflows, integrations, operations systems).

## Output
- Composition directory: broker-flow-ai/brag-output-2026-10-24-001915/composition/
- Rendered video: broker-flow-ai/brag-output-2026-10-24-001915/brag.mp4
- Format: landscape — 1920x1080
- Duration: 24 seconds

## Source Material
- Project root: broker-flow-ai / fiverr-gallery
- Primary files read: broker-dashboard.html (real dashboard UI), workflow builder/insurance-broker-demo/workflows/wb-08-document-chasing-escalation.ts (real n8n workflow), fiverr-gallery/01-03.png (gallery images)
- Product name: BrokerFlow AI (business workflow automation service)
- Tagline / strongest claim: "n8n Workflows · Integrations · Operations Systems"
- Key UI or visual moment to recreate: dashboard stat cards + case table; WB-08 node diagram; finished gallery cover
- Copy that must appear verbatim:
  - "Business workflow automation"
  - "n8n Workflows · Integrations · Operations Systems"
  - "Tell me what you want to automate."
  - Real node names: Document Chasing Trigger, Normalize New Chase, Gmail — Secure Upload Link, Notify Insurer, Notify Loss Adjuster, Update Tracker Sheet, Switch — Escalation Day, Phone Task Day +7, Exception Queue

## Creative Direction
- Tone preset: polished
- Creative direction: restrained premium B2B film; the product speaks for itself
- Interpretation: ~24s across 5 beats, long holds, soft crossfades, generously letter-spaced typography, no corporate buzzwords, no invented metrics
- Angle: show real UI and a real n8n workflow; end with a direct buyer invitation
- Hook: "Repetitive tasks. Fragmented tools." + dashboard stat flip
- Outro / punchline: "Tell me what you want to automate."
- Avoid: Generic SaaS language, abstract filler visuals, unrelated visual redesign, invented metrics/testimonials

## Visual Identity
- Background: #F8F5F0 / #F7F3EC
- Text: #0F172A
- Accent: #059669 (emerald); #D97706 (amber) for exceptions
- Display font: Georgia, serif
- Body font: system sans (-apple-system, Segoe UI, Roboto)
- Data font: SF Mono, monospace
- Visual references from the project: broker-dashboard.html stat cards/case table/chips; WB-08 node names and cadence; gallery cover design

## Storyboard (scene summary from brag-plan.md)
1. Hook — 3s — "Repetitive tasks. Fragmented tools." + dashboard "Awaiting docs: 6" stat card
2. Introduction — 5s — gallery cover (01-gig-cover.png) + service line "n8n Workflows · Integrations · Operations Systems"
3. Proof — 7s — WB-08 n8n workflow nodes appearing one by one (trigger → Gmail upload link → Sheets tracker → exception queue)
4. Practical application — 5s — dashboard case table (synthetic clients); case flips to "Docs received", Completed stat flips 0→1
5. Scope + closing — 4s — "Built around your existing process — WhatsApp, SMS, email, secure upload links." → "Tell me what you want to automate."

## Audio
- Audio role: warm professional bed with tasteful SFX
- Audio arc: bed fades in under hook, sits at ~0.30, fades under closing line
- Music: assets/music/happy-beats-business-moves-vol-1-by-ende-dot-app.mp3
- Music treatment: volume ~0.30, fade-out under final line
- Music cue guidance: strong cues for service lockup (scene 2) and closing line (scene 5); beat-grid for sequential node reveals in scene 3
- Audio-reactive treatment: subtle; hero panel presence breathes with music RMS
- Audio-coupled moments:
  - Scene 1 — text lines card-place, stat card drop
  - Scene 2 — service line card-place
  - Scene 3 — each node card card-slide on consecutive beats
  - Scene 4 — impact-bell on stat flip
  - Scene 5 — impact-bell on closing line
- SFX selection guidance: card-place for reveals, drop for landings, impact-bell for major payoffs
- SFX analysis guidance: assets/sfx/ interface + impact folders; low HF-risk for repeated/polished moments
- Exact SFX choice: Hyperframes decides filenames/timestamps/density based on implemented animation
- Audio files: copy chosen music + SFX into composition/assets/ (done: music + click_001 + drop_001 + impactBell_heavy_000)

## Hyperframes Instructions
Load hyperframes-core, hyperframes-animation, hyperframes-creative, hyperframes-keyframes, hyperframes-cli. Do not enter the hyperframes entry-point intent interview or generic promo workflow.
Requirements:
- Show at least one real UI/copy/visual from the source project (dashboard screenshot + gallery images + real node names)
- Keep all text readable in the final render
- Keep the video within 15-25 seconds (target 24s)
- Include the music/SFX layer
- Treat music cue metadata as optional timing hints
- Run hyperframes check before render — it is brag's single gate
- Keep creation and rendering local
