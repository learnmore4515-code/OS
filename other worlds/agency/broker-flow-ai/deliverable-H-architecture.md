# Deliverable H — Recommended Architecture

## Constraint
No custom backend code yet (per CLAUDE.md "no coding yet"). Architecture uses existing project tools: single-file HTML (zero install) + n8n workflows (operations-hub pattern). Implementation is phase 7; this is the design for it.

## Components

| Component | Technology | Role |
|-----------|-----------|------|
| Broker dashboard | Single-file HTML, mobile-first (like `quote_compare.html`) | Create cases, view outstanding chases, exception queue, communication history |
| Document upload portal | Single-file HTML, tokenised links, mobile-friendly, no app install | Client uploads KYC/claim docs |
| Orchestration | n8n workflows (`operations-hub.ts` Chain 4 + exception chains) | Requirement list, channel nudges, escalation, verification routing, exception queue |
| WhatsApp | WhatsApp Business Platform via HabariChat (0% markup, KES billing) | Primary nudge channel; free replies in 24h service window |
| SMS | Kenyan SMS provider (rankingkenya.co.ke, kenyasms.com, sokosauti.com, yoolasms.com, thabititechnologies.com, esmsafrica.io, helloduty.com) | Fallback channel; short codes / phone numbers, no rich media |
| Email | TBD | Formal channel with attachments + links |
| Document tracker | Google Sheets (real sheet IDs, replacing placeholders) | Case state, chase history, SLA timers |
| Document storage | TBD (ODPC-compliant) | Store uploaded KYC/claim documents |
| Verification | AI/LLM document verification (provider TBD) | accept / request_missing / reject with reason |

## Data flow

1. Broker creates case in dashboard → written to Google Sheets.
2. n8n generates personalised requirement list from policy type.
3. n8n sends WhatsApp/SMS/email with secure upload link to client.
4. Client uploads via portal → document stored → n8n verifies.
5. n8n returns result to client (accept / missing fields / reject with reason).
6. If no response: n8n escalates WhatsApp → SMS → email → phone → exception queue (>7 days).
7. Broker dashboard reads Google Sheets for unified chase view with SLA timers.

## What is NOT in architecture
- Payment reconciliation (excluded).
- Custom SaaS backend (not yet — phase 7 implementation decision).
- International instances (Deliverable E — deferred).

## Open technical questions
- Document storage provider and ODPC-compliant retention/deletion policy.
- AI verification provider and per-document cost.
- Whether one n8n instance serves all brokers or per-broker instances.
