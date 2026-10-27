# Handover Prompt — Insurance Quotation Comparison MVP for Kevin Osiga

## Context

Kevin Osiga is an insurance broker based in **Kenya (EAT, UTC+3)**. A discovery call was completed on **2026-10-21 at 6pm EAT**. His main pain point: creating comparative quotations/proposals for insurance clients takes **2–3 hours per quote** — manually combining quotes from multiple underwriters that each use different formats, benefits, sub-limits, and exclusions. He agreed to a **free MVP for quotation comparison** and suggested **medical insurance** as the MVP product. Per project rules: discovery first, no pitch, free pilot after discovery call, paid client only after the pilot demonstrates time saved.

**Goal:** Build a tool that helps write quotations faster — reduce quotation creation from 2–3 hours to **30 minutes or less**.

The MVP will be **sent to Kevin for him to use directly** — not just demonstrated by the builder. It must:
- Have an MVP vibe: focused, not generic, not over-engineered
- Be built in a way Kevin would love — valuable enough that refusing it would be "stupid"
- Be sendable to Kevin so he can use it himself (zero installation)

Kevin's location: **Kenya, EAT (UTC+3)** — keep this in mind when scheduling any demo/call with him.

## Constraints

- **Actual tool, not just a spreadsheet/template** — Google Sheets/Excel rejected as "too basic."
- **MVP scope only, not full SaaS** — no database, no auth, no hosting, no recurring infrastructure, no backend/server.
- **Sendable to Kevin — Kevin uses it directly** — zero installation on Kevin's side. Kevin opens it in his browser and fills a web form. No JSON, no CLI, no Python install required on Kevin's machine.
- **Capital-constrained, Kenya-based** — low- or no-cost to build and deliver.
- **Product:** Medical insurance only (per Kevin's suggestion).
- **Output:** Comparative quotation/proposal for client, with price comparison summary + disclaimer ("for price comparison purposes only; final terms subject to underwriter policy document").
- **3–4 underwriters per quotation.**
- **Next step after MVP:** Kevin tests it with a real quotation, gives feedback; if time saved is demonstrated → propose paid engagement.

## Underwriter data researched (basis for the worked example)

Researched official product pages, accessed 2026-10-21. Premiums and per-benefit sub-limits are **not published** by underwriters (quote required) — this is the manual work Kevin wants to cut, so the MVP uses manual web-form entry and normalizes quotes side by side.

| Insurer | Product | Inpatient cap | Plans | Maternity | PEC waiting | Quote method |
|---|---|---|---|---|---|---|
| Jubilee | J-Care Premium | KSh 10M | 6 options | Optional benefit | Typically ~12 months | digital.jubileeinsurance.com/jcare; callback form; 0709 949 000 |
| Britam | Milele Health | KSh 300K–10M | 5 tiers (Platinum→Essential) | Not itemized | Tier-dependent, not specific | Callback; WhatsApp Bella 254705100100; per-tier brochures |

**Jubilee benefits:** optional outpatient/maternity/dental/optical; cancer, HIV, chronic, congenital, psychiatric covered; annual checkups & vaccinations; telemedicine, drug delivery, wellness coaching; overseas treatment on credit + regional coverage; activates 24–48h after payment.

**Britam benefits:** outpatient seamless (no approvals) all tiers; hospital access tier-dependent (Platinum/Gold/Silver open panel incl. Aga Khan, Nairobi, MP Shah, Mater; Bronze Tier 2–3; Essential mission/govt); chronic conditions tier-dependent; Critical Illness Cash Benefit Platinum & Gold; mental health Platinum & Gold comprehensive; annual wellness checks all tiers.

**Shortlist (5 IRA-licensed Kenyan medical insurers):** Jubilee, Britam, Sanlam, APA Insurance, ICEA Lion — credible cross-insurer comparison base for the MVP.

## MVP Design

### Tool type: Single-file HTML web app

A standalone HTML file with embedded CSS/JS. Kevin opens it in any browser — zero installation, nothing to send but the file. Web form for client details + 3–4 underwriter quotes, instant side-by-side comparison table, printable/saveable as PDF from browser.

### Input: Web form in browser

Kevin fills labeled form fields:
- Client details: name, age, sum insured, location, pre-existing conditions
- Per underwriter (3–4): name, annual/monthly premium, benefits (inpatient, outpatient, dental, maternity, etc.), sub-limits per benefit, exclusions, waiting periods

No JSON files, no command line, no technical steps.

### Processing

The app reads the form inputs, normalizes benefit names across underwriters, aligns sub-limits and exclusions into comparable rows, and renders a side-by-side comparison table.

### Output: HTML comparison table in browser + printable/savable as PDF

- Comparison table: underwriter rows × benefit columns
- Premium comparison per underwriter
- Sub-limits and exclusions listed per underwriter
- Price comparison summary row
- Disclaimer footer: "for price comparison purposes only; final terms subject to underwriter policy document"
- Kevin can print or save as PDF from browser

### Scope (MVP v1)

- Medical insurance only (per Kevin)
- 3–4 underwriters per quotation
- Manual data entry via web form — no API integration
- Single HTML file, runs in any browser, no installation
- No database, no auth, no hosting, no user accounts, no cloud features
- No backend/server

### Non-scope (for v1)

- No motor insurance
- No CRM or lead management
- No payment/POP tracking
- No automated underwriter API
- No multi-user or cloud features

## Build steps

1. **Research underwriter product details — COMPLETE** (do not repeat). Jubilee (J-Care Premium) and Britam (Milele Health) researched; 5-insurer shortlist captured. Use this as the basis for the worked example defaults.
2. **Build single-file HTML web app** — web form + comparison generator + printable output; zero installation. File: `tools/quote_compare.html` (or equivalent single HTML file).
3. **Create worked example** — pre-filled Jubilee vs Britam sample data so Kevin can see how it works. File: `tools/quote_compare_example.md`.
4. **Send to Kevin** — he opens the HTML file in his browser and uses it directly to write quotations faster.
5. **Kevin tests with a real quotation** — feedback on usability, missing fields, time saved.
6. **Iterate** based on feedback.
7. **If time saved is demonstrated** → propose paid engagement.

## Verification criteria

- Kevin can create a comparative quotation in 30 minutes or less (vs. 2–3 hours manual) using the web form
- App produces a clean, client-ready HTML comparison table
- All 3–4 underwriters comparable side by side
- Kevin confirms the MVP saves time and wants to proceed to paid engagement

## Files to produce

- `tools/quote_compare.html` — single-file HTML web app (new file)
- `tools/quote_compare_example.md` — worked example instructions (new file)

## Handover notes

- Do NOT build a Streamlit app or any Python-based tool requiring Kevin to install anything. The deliverable must be a single HTML file Kevin can open directly in his browser.
- Kevin is in Kenya (EAT, UTC+3). Schedule demos accordingly.
- The plan file for this work lives at `C:\Users\profe\.claude\plans\synthetic-beaming-rivest.md` (status: handed over — different folder will build).
- Related project context: `C:\Users\profe\Downloads\OS\other worlds\agency\responses.md` (Kevin is row #23, agreed to free MVP for quotations) and `research/medical-insurance-quotes/` (Jubilee + Britam research).
