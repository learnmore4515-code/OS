# Project Status — Autonomous AI Sales Agent & CRM (Peter's AI Automation Agency)

**Date:** 2026-10-27
**Workspace:** `C:\Users\profe\Downloads\OS\other worlds\agency\workflow builder`
**Mission:** Secure a paying pilot within 72 hours (target, not guarantee). Two workstreams: (A) research & qualify Kenyan e-commerce buyers; (B) build AI Sales Agent + CRM demo + production n8n workflows.

---

## A. Research — Workstream A (VERIFIED COUNTS)

**Target:** 100 qualified Kenyan e-commerce/retail businesses.
**Actual verified count:** 28 qualified out of 56 candidates investigated.
**Disqualified:** 0. **Insufficient-evidence (re-investigate):** 2 (Veda Fashion, Nayomi).
**Blocked (could not inspect):** 8 (BeautyClick, Phone Place Kenya, Duvena Cosmetics, Victoria Homestore, Monsoon Furniture, Wellive Kenya, Decor Hub, Jamwas Beauty — Cloudflare 403/timeout).

### Research database files
| File | Purpose |
|------|---------|
| `research/prospects.csv` | 56 candidates; 28 qualified; stable IDs PROS-0001…PROS-0056 |
| `research/prospects.json` | JSON mirror of CSV |
| `research/qualified-prospects.md` | Ranked shortlist of all 28 qualified with scores |
| `research/priority-buyers.md` | 10 detailed priority buyers with Loom outlines, outreach messages, objections, pilot scope |
| `research/research-log.md` | Resume point, batch counts, blockers, next tasks |
| `research/outreach-tracker.csv` | 11 priority buyers, all "not started" |
| `research/objections-and-findings.md` | Recurring objections + responses |
| `research/research-methodology.md` | Rubric, sources, confidence definitions |

### Top priority buyers (qualified, manual WhatsApp ordering, no AI agent)
| Rank | ID | Business | Score | Location | Gap |
|------|----|----------|-------|----------|-----|
| 1 | PROS-0045 | Bree Style | 90 | Nairobi | No cart; WhatsApp Stylist manual ordering |
| 2 | PROS-0016 | Original Makeup Kenya | 88 | Nairobi | No cart; manual WhatsApp +254 740 666 666 |
| 3 | PROS-0049 | Benus Beauty | 89 | Nairobi | No cart; skincare routine via WhatsApp |
| 4 | PROS-0047 | Mbaka Smart Collections | 88 | Nairobi | No cart; "Order on WhatsApp" |
| 5 | PROS-0055 | Sikam Furniture | 87 | Nairobi | High-ticket custom furniture via WhatsApp |
| 6 | PROS-0048 | Aleena Beauty | 87 | Nairobi | No cart; "ORDER ON WHATSAPP" |
| 7 | PROS-0051 | Hussein The Plug | 86 | Nairobi | No cart; phones/accessories, cash on delivery |
| 8 | PROS-0021 | Beauty Ridge | 85 | Moi Avenue | Premium fragrances, manual WhatsApp 24/7 |
| 9 | PROS-0042 | MissiSippi Fashion House 254 | 85 | Nairobi CBD | No catalog checkout, WhatsApp ordering |

### Research blocker
Instagram/TikTok are behind login walls — cannot browse logged-in social profiles. TikTok shows loading state. All qualification evidence so far comes from public websites + WebSearch (Tavily). Research can resume from `research/research-log.md` resume point.

---

## B. Product — Workstream B

### Layer 1: Demo (`index.html`) — WORKING & VERIFIED
**Location:** `index.html` (workflow builder root)
**Status:** PASS — complete customer-to-order journey verified via Playwright (Chromium headless), zero console errors.
**No production credentials required.** Can be opened, operated, reset, repeated, and recorded (Loom) immediately.

Verified journey: greeting → product cards → variant selection → cart (KES 4500) → delivery zone (CBD, +KES 150 = KES 4650) → customer details → explicit confirmation → order created once → dashboard auto-updates (Total Paid KES 0, Sync "DEMO ORDER CREATED") → simulated M-Pesa verification → payment verified → fulfilment → completed → reset → repeat.

### Layer 2: Production — `production/`
| File | Purpose | Status |
|------|---------|--------|
| `production/data-models.ts` | Tenant-isolated TS data models (tenants, products, customers, orders, payments, fulfilment, audit logs) | Complete |
| `production/event-contracts.json` | JSON event schemas + samples (order.created, payment.verified, fulfilment.updated, human.handoff, sync.sheets.failed) | Complete |
| `production/system-prompt.md` | Zara AI sales agent system prompt + tool contracts (§9) | Complete |
| `production/n8n-workflows/wa-inbound.ts` | WhatsApp inbound webhook workflow SDK | Draft structure; missing catalogue/cart/order/payment/duplicate-protection |
| `production/n8n-workflows/human-handoff.ts` | Slack staff notification workflow SDK | Draft structure; basic |
| `production/n8n-workflows/google-sheets-sync.ts` | Google Sheets order sync workflow SDK | Draft; hardcoded demo data, no real orders |
| `production/env.example` | Environment variable template | Complete |
| `production/CREDENTIALS.md` | Consolidated credential & configuration checklist | Complete |
| `production/SETUP.md` | Setup & integration instructions; 3 n8n draft IDs listed | Complete |
| `production/AUDIT.md` | Independent audit findings (this session) | Complete |

### Demo test report
`research/test-report.md` — 13 test cases, all PASS.

---

## C. Integration states (honest distinction)

| Integration | Demo | Production | Live? | Blocked by |
|-------------|------|------------|-------|------------|
| WhatsApp chat | Simulated channel in demo | `wa-inbound.ts` draft | ❌ No | WhatsApp Business Cloud credential (Meta Business + phone number ID); a SIM card alone does NOT activate the API |
| M-Pesa payments | Simulated Till 554433, unverified until callback | No payment-verification workflow built | ❌ No | M-Pesa Daraja credential (Safaricom merchant registration) |
| Google Sheets sync | Labelled "DEMO ORDER CREATED" (no real write) | `google-sheets-sync.ts` draft; hardcoded demo data | ❌ No | Google Sheet + OAuth2 credential |
| Slack handoff | Not in demo | `human-handoff.ts` draft | ❌ No | Slack channel ID + OAuth2 credential |
| OpenAI / Zara agent | Not used (demo is deterministic state machine) | `wa-inbound.ts` agent node; credential available | ⚠️ Credential available, agent prompt generic (no tool contracts implemented) | None for dev; not connected to catalogue/cart/order |

**Do not claim the production system is live.** Demo is simulated; production requires WhatsApp Business API + M-Pesa Daraja credentials configured and tested.

---

## D. Credential checklist (consolidated) — see `production/CREDENTIALS.md`

Mandatory for live: WhatsApp Business Cloud (developers.facebook.com), M-Pesa Daraja (developer.safaricom.co.ke).
Available in connected n8n instance (`simongreenmmm.app.n8n.cloud`): OpenAI, Google Sheets, Slack.
Not configured: WhatsApp Business Cloud, M-Pesa Daraja.
All 3 n8n workflows are drafts (IDs in `production/SETUP.md`) in Simon Green's personal project `dHO7QZUgQlETGMEP` — move to Peter's project before activating.

---

## E. Blockers
1. Instagram/TikTok login walls — social research limited to public pages + WebSearch.
2. 8 websites blocked by Cloudflare 403 or timeouts — retry via WebSearch snippets.
3. No WhatsApp Business API or M-Pesa Daraja credentials — live integrations blocked until buyer provides/configures.
4. n8n workflows not activated; in wrong project.

---

## F. Resume point (exact)
- Research: 28 qualified / 56 candidates; continue from `research/research-log.md` to reach 100 qualified; retry blocked sites via WebSearch.
- Product: demo verified (PASS). Production n8n workflows need the gaps in `production/AUDIT.md` closed (catalogue/cart/order/payment/duplicate-protection/tenant-isolation) before activation.
- Sales: 10 detailed priority buyers + outreach-tracker.csv all "not started". User to record Loom videos and send outreach.
- Next: obtain WhatsApp + M-Pesa credentials for live activation; deliver consolidated checklist to user.
