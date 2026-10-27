# Claims Follow-Up Tracker — Handoff Document

**Asset:** `growth-lab/prototype/claims-tracker/index.html`  
**Owner:** Session 2 (Competitive Intelligence / Growth)  
**Intended recipient:** Session 1 (production website / SEO) — for validation and possible on-site integration  
**Status:** Prototype, not production-ready

---

## What it is

A free, self-contained, single-file web tool for Kenyan insurance brokers and claims teams. A user logs a claim (reference, client, policy type, date of loss), ticks off the documents they have, and the tool auto-computes which documents are still missing with suggested follow-up steps per missing document. It produces a printable summary and offers a "Book a free discovery call" CTA to `leopisha.co.ke/book`.

This directly supports **Experiment 1** (free claims follow-up / missing-document tracker) from `growth-lab/GROWTH-EXPERIMENTS.md` and closes gap **G3** (no competitor offers a free practical tool) and **G5** (no competitor positions document follow-up as a standalone problem) from `growth-lab/COMPETITIVE-MAP.md`.

---

## How it works

- **Form:** claim reference, client/policyholder name, policy type (Motor / Health / Life / Travel / Property), date of loss. All fields required.
- **Document checklist:** 8 required documents grouped as Core, Supporting, and Life & other claims, each with a checkbox and an explanatory note.
- **Auto-calculation:** on every change, the tool counts completed documents (`X / 8 complete`), lists missing documents, and renders a suggested next step for each missing one (e.g. "Call client to request the police abstract (OB extract)").
- **Printable summary:** clicking "Print summary" populates a read-only summary block and triggers `window.print()`. A print stylesheet hides buttons/CTA/footer and shows only the summary.
- **Clear/reset:** "Clear form" resets all inputs and checkboxes.
- **Client-side only:** no backend, no database, no build step, no dependencies. Runs entirely in the browser.

## Technology

- Single self-contained HTML file with embedded CSS (design tokens via CSS custom properties) and vanilla JavaScript (IIFE, no framework).
- Semantic HTML, associated `<label>`s on every input, visible focus outlines, 44px minimum touch targets, mobile-first responsive layout (`@media (max-width: 480px)`).
- ~19.8 KB, zero dependencies.

---

## Test results

**Verified via code review:**
- All four form fields present with `required` attributes and descriptive placeholders (fictional examples only, e.g. `CL-2026-0412`, `Wanjiku Mwangi`).
- 8 document checkboxes tracked; checked state toggles a `done` class (line-through + muted) on each label.
- Missing-document calculation correct: unchecked docs are collected into `missing[]`; progress counter updates to `X / 8 complete`.
- Follow-up suggestions render per missing document with a `Doc N` tag and the follow-up text.
- `printBtn` populates the summary block (claim ref, client, policy type, loss date, progress, generated date, missing count, follow-up text) and calls `window.print()`.
- `clearBtn` confirms, resets the form, removes `done` classes, hides the missing panel and summary.
- Print media query hides buttons/CTA/footer and forces the summary to display.
- Responsive adjustments for screens ≤ 480px.
- Year auto-populated in footer via `new Date().getFullYear()`.

**Could NOT verify (browser tooling not enabled):**
- Actual rendered layout in a real browser.
- Computed styles (colours, spacing, typography, contrast ratios).
- Screenshots / visual inspection at mobile/tablet/desktop widths.
- Print output and `window.print()` behaviour.
- Console errors at runtime.

Per the frontend-design-implementation skill, browser visual verification is mandatory when tooling is available; here the in-app Browser preview was not enabled (`skipped-gate-off`), so the above items are **unverified**, not passed. An HTTP 200 from a local server was confirmed earlier, but that is not visual verification.

---

## Known limitations

1. **No data persistence.** There is no `localStorage` or backend. Refreshing or closing the page loses all entered data. Suitable for a one-off illustrative demo only.
2. **Not production-ready.** No authentication, no access controls, no encryption, no audit log, no backend, no persistence. Do not expose real claims data through it.
3. **No server-side validation.** All validation is client-side HTML `required` attributes only.
4. **Visual rendering unverified** (see "Could NOT verify" above).
5. **Suggestions are generic.** Follow-up text is illustrative, not tied to any specific insurer's or the IRA's actual requirements.

---

## Privacy & data handling

- A prominent warning banner at the top of the tool states: do not enter real claimant personal information, ID numbers, or sensitive claims documents; the tool runs in the browser with no secure storage, no access controls, and no server-side protection; use fictional test data only; results are suggestions, not a system of record.
- Nothing is saved to a server. Data lives only in the page's memory for the duration of the session.
- The tool does not claim to be GDPR/Data Protection Act 2019 compliant for real personal data; any on-site integration by Session 1 must add appropriate privacy controls, a privacy notice, and lawful basis before collecting real data.

**Test data rule:** Only fictional data (e.g. `CL-2026-0412`, `Wanjiku Mwangi`) should be used in any demonstration. Do not claim the tracker is production-ready.

---

## Hosting requirements

- **Cost:** KES 0. Any static file host works (GitHub Pages, Vercel Hobby, Netlify Free, etc.).
- **Build step:** none. Serve `index.html` directly.
- **Domain:** none required for the prototype; if Session 1 exposes it on-site, it can live as a page under `leopisha.co.ke` (Session 1's decision).
- **Do not purchase** hosting, domains, or subscriptions for this prototype.

---

## Integration recommendations (Session 1's decision)

- Expose as a new on-site page targeting long-tail insurance-ops queries (e.g. "claims follow up tracker Kenya", "insurance missing documents tracker") — this supports organic search and is a gap competitors don't address.
- Keep the privacy warning and fictional-data framing prominent.
- Add server-side privacy controls, a privacy notice, and lawful basis before exposing it to real users or collecting real data.
- The existing CTA already links to `https://www.leopisha.co.ke/book`; confirm this matches Session 1's current booking URL before publishing.
- Do not modify the production website or deploy anything without Session 1's explicit approval. Session 2 provides the asset and recommendations only.

---

## Exact paths

- Prototype: `C:\Users\profe\Downloads\OS\other worlds\Ai saas product\growth-lab\prototype\claims-tracker\index.html`
- Handoff document: `C:\Users\profe\Downloads\OS\other worlds\Ai saas product\growth-lab\CLAIMS-TRACKER-HANDOFF.md` (this file)
- Companion strategy: `growth-lab/GROWTH-EXPERIMENTS.md` (Experiment 1)
- Companion gaps: `growth-lab/COMPETITIVE-MAP.md` (G3, G5)

---

## Bottom line for Session 1

A functional, free, zero-dependency claims tracker prototype exists and is ready for your validation. It is **not** production-ready (no persistence, no access controls, visual rendering unverified). If you want to expose it on `leopisha.co.ke`, review the privacy warning, add lawful-basis/privacy controls, confirm the booking CTA URL, and arrange browser-based visual verification before publishing. Session 2 will not touch the production website or deploy anything.
