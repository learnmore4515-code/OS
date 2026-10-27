# LeoPisha Design Direction — Phase 4

**Date:** 2026-10-27  
**Basis:** Existing design system (`design-system/leopisha/MASTER.md`, `app/globals.css`), Phase 3 positioning, Phase 2 competitive intelligence.  
**Status:** Proposed visual direction, not yet implemented.

---

## Core design principle

**Premise, not polish.** LeoPisha's credibility comes from demonstrating real automation competence (diagnosis, build, handover, insurance domain), not from looking like a venture-funded SaaS. The visual direction should communicate premium expertise, technical depth, clarity, and reliability — without generic AI gradients, meaningless animated backgrounds, excessive cards, or decorative dashboards that serve no purpose.

**Design principle:** "Show the work." Every visual element should serve the job-to-be-done (trust, clarity, conversion). Ornament that doesn't explain, evidence, or convert is removed.

---

## Visual identity (extend, don't replace, the existing design system)

The existing design system is already a strength — keep it, tighten it, and apply it consistently across new pages.

| Token | Existing value | Direction |
|---|---|---|
| Primary | `#151517` (near-black) | Keep. Premium, serious, consultancy-grade. |
| On primary | `#F7F4EE` (cream) | Keep. |
| Accent | `#A67C36` (refined gold) | Keep. Used sparingly for CTAs and emphasis only — not as background washes. |
| Background | `#F5F2EC` (warm off-white) | Keep. Avoid stark white and avoid dark mode unless needed. |
| Foreground | `#171717` | Keep. |
| Card | `#FBF8F2` | Keep. |
| Border | `#D7CDBE` | Keep. Subtle, not heavy. |
| Heading font | Cormorant (serif) | Keep. Distinguishes from generic sans-serif AI agencies. |
| Body font | Inter (sans-serif) | Keep. Highly legible. |

**Mood:** Premium, editorial, consultancy. Think professional-services firm, not consumer app. Black + gold + generous whitespace + serif headings.

---

## Layout & composition rules (adopted from design system anti-patterns + new)

- **No emojis as icons.** SVG icons only (Lucide), consistent set.
- **cursor:pointer on all clickable elements.**
- **Hover states with smooth transitions (150–300ms); no layout-shifting hovers (no scale transforms that reflow).**
- **Light-mode text contrast ≥ 4.5:1.**
- **Visible focus states for keyboard navigation.**
- **`prefers-reduced-motion` respected** — GSAP scroll animations disable under reduced motion; no parallax or scroll-scrub.
- **Responsive breakpoints:** 375px, 768px, 1024px, 1440px. No horizontal scroll on mobile.
- **No content hidden behind fixed navbar.** Account for Header height in scroll anchors.
- **One component or class per file; named exports over defaults.** (existing convention)

---

## Page-level visual patterns

### Home
- Hero: large serif headline, problem-first subcopy, two-column layout (copy left / illustration or calm panel right), primary CTA button, secondary "See how I work" anchor link.
- Avoid: hero video autoplay with sound, animated gradient backgrounds, floating 3D elements.
- Illustration: if used, a calm workflow diagram (boxes + arrows), not abstract tech blobs.

### Services
- Service cards: consistent height, problem → what we automate → outcomes → timeline, one CTA per card. Avoid "featured" ring clutter unless it genuinely marks the entry point (Diagnosis).
- Avoid: generic icon grids, animated counters, "trusted by" logo carousels without real permission.

### About
- Principles as concise cards, "Why this exists" narrative, honesty about stage. Avoid stock-photo team grids; use real photos or none.

### Resources
- Guide library as a clean list (title, audience, one-line summary, read time), not a magazine grid. Avoid infinite-scroll article feeds.

### CTA
- Primary: solid accent button ("Book a consultation"). Secondary: outline button ("See how I work" / "Read the guide"). All CTAs lead to Calendly or a real page — never `#`.

---

## What to avoid (carried from design system + Phase 2 findings)

| Avoid | Why |
|---|---|
| Generic AI gradients / glowing blobs | Signals "AI wrapper," not consultancy |
| Meaningless animated backgrounds | Decorative, harms performance and reduced-motion users |
| Excessive card grids | Looks like a template, not a firm |
| Inflated claims ("world's first," "1000x") | Erodes trust; unverifiable |
| Decorative dashboards showing fake metrics | Fabrication risk; no real data |
| SaaS-style pricing tiers | Consultancy pricing is scoping-dependent |
| Fabricated testimonials / case studies | Trust-destroying and unethical |

---

## Accessibility & performance (non-negotiable)

- WCAG 2.1 AA contrast and focus states.
- Semantic HTML + ARIA labels (existing Header/Footer already use them).
- `prefers-reduced-motion` toggle respected.
- Images optimized (avif/webp per `next.config.ts`); hero image lazy-loaded appropriately.
- No layout shift on hover or font load (use `font-display: swap` via Google Fonts `display=swap`).

---

## Design deliverables (specification, not mockups)

The following are defined in this document and `leopisha-information-architecture.md`:
- Color palette, typography, spacing, shadows (existing design system, kept).
- Layout rules and anti-patterns (above).
- Page-level patterns for Home, Services, About, Resources, CTA (above).
- Navigation spec (header/footer) in the IA document.

No Figma files or mockups are required at this stage; the existing Tailwind design system is implementation-ready. Visual refinements happen during Phase 9 implementation against this specification.

---

## Next step

Phase 5: revenue model (`research/leopisha-business-model.md`). Phase 7: SEO strategy. Phase 8: prioritized 30-day + 90-day roadmap. Phase 9: implementation against this spec.
