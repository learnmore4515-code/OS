# Deliverable B — Existing Solutions and Competitive Landscape

## Existing Broker Management Software Vendors in Kenya

Source: WebSearch results (vendor names found, but detailed feature/pricing info not yet fetched — WebFetch was blocked). These are leads requiring verification.

| Vendor | Website | Reported Focus | Verification Status |
|--------|---------|---------------|---------------------|
| Insurance Cloud | insurancecloud.co.ke | Insurance management software in Kenya | Unverified — website not fetched |
| Vaatun | vaatun.com | Insurance broking software for Kenya | Unverified — website not fetched |
| INSYS | insys.co.ke | Insurance agency management system | Unverified — website not fetched |
| Rensoft Solutions | rensoft.co.ke | Insurance automation software for Africa | Unverified — website not fetched |
| Corepoint | corepoint.co.ke | Insurance agency management system, Nairobi | Unverified — website not fetched |
| INAT | inat.co.ke | Insurance agency technology | Unverified — website not fetched |
| Waridi Broker | bizsolutions.co.ke | Insurance brokerage software | Unverified — website not fetched |
| BIA Insurance Broker App | biatechnologies.co.ke | Software for brokers & agents | Unverified — website not fetched |
| Smart Policy | sav-ita.com | Insurance management system, SAV IT Africa | Unverified — website not fetched |
| CRM Africa | crmafrica.co.ke | Insurance CRM system, Nairobi | Unverified — website not fetched |

## Internal Existing Artifacts (Agency's Own Tools)

These are artifacts already built within the agency project that BrokerFlow AI can reference or integrate:

| Artifact | Path | Purpose | Status |
|----------|------|---------|--------|
| Quote comparison MVP | `../project builder/tools/quote_compare.html` | Single-file HTML web app for comparing medical insurance quotes from 3–4 underwriters | Built — delivered to Kevin Osiga |
| Quote comparison example | `../project builder/tools/quote_compare_example.md` | Worked example: Jubilee vs Britam | Built |
| Premium reconciliation tool | `../tools/premium-reconciliation.html` | Single-file HTML reconciliation tool: M-Pesa vs policy matching | Built — no document chasing, no persistence |
| Insurance broker operations hub | `../workflow builder/insurance-broker-operations-hub.ts` | n8n workflow with 5 chains (leads, renewals, reporting, document management, claims) | Built — no reconciliation chain |
| Demo workflows (wb-01–wb-07) | `../workflow builder/insurance-broker-demo/workflows/` | n8n demo: launcher, triage, qualification, renewal, reconciliation, exceptions, reporting | Built — synthetic data, no external credentials |

## Communication Channel Options for Kenya

**WhatsApp Business Platform** (from habarichat.ai, fetched Oct 2026):
- Since July 2025: Meta charges per delivered message, not per 24-hour conversation
- Categories: Marketing (highest cost), Utility, Authentication, Service (replies within 24h = free)
- Exact Kenyan per-message rates not published; vary by recipient country and Meta's rate card
- Free allowances: replies during 24-hour service window, messages in 72-hour window after click-to-WhatsApp ads
- Volume discounts apply to utility and authentication categories
- HabariChat passes Meta's rates at 0% markup, billed in KES
- Sample: 500-contact marketing broadcast could cost "a few hundred to a couple of thousand shillings"

**SMS** (from WebSearch results — not fetched):
- Multiple Kenyan providers: rankingkenya.co.ke, kenyasms.com, sokosauti.com, yoolasms.com, thabititechnologies.com, esmsafrica.io, helloduty.com
- Exact per-SMS pricing not yet extracted

**Email:** No specific cost data gathered yet.

**Phone-call escalation:** No cost data gathered yet.

## Gap Analysis: What Existing Tools Don't Do

Based on internal exploration of the operations hub (insurance-broker-operations-hub.ts):

1. **No reconciliation chain** — Chain 4 handles document management (upload → OCR → verify → request missing docs) but there is no reconciliation chain to match payments to policies
2. **Single-shot document chasing** — Chain 4 sends one reminder email; no escalation cadence, no re-chasing after N days, no overdue aging
3. **No unified dashboard** — No broker-facing screen showing reconciliation exceptions + outstanding document chases together
4. **No client status portal** — Clients can't see what's missing or upload docs through a tracked portal
5. **Reconciliation and document chasing are separate silos** — `premium-reconciliation.html` (frontend tool) and `operations-hub.ts` (n8n backend) are not connected
6. **Placeholder sheet IDs** — Google Sheets document IDs are hardcoded placeholders, not connected to real sheets

## What Needs Verification
- Detailed feature comparison of each Kenyan vendor (WebFetch blocked; needs manual browsing)
- Pricing for each vendor
- Whether any vendor offers document chasing + reconciliation combined
- WhatsApp Business exact per-message rates in KES
- SMS per-message rates in KES
- Email costs in Kenya
