# Deliverable K — Major Risks and Unresolved Questions

## Major risks

| Risk | Impact | Mitigation |
|------|--------|------------|
| ODPC compliance not verified | Cannot legally collect Kenyan client documents (ID, KRA PIN, medical reports, logbooks) without confirming registration/consent requirements | Research ODPC before collecting real client documents; obtain client consent |
| Automated reminders may not be the correct solution | Building a nudge system that doesn't solve the root cause | Deliverable C investigated root causes; confirm with real broker before automating |
| No paid client yet | Objective (first paid client $1,000–$2,000 within 30–60 days from ~Oct 19) not met | Pilot with Kevin Osiga; convert free MVP to paid |
| Workflows on synthetic data, placeholder sheet IDs | No real credentials or live sheets; untested in production | Connect real Google Sheets and channel credentials during pilot |
| Clients rarely cooperate (Daisy Ndiya: "most clients rarely want to cooperate") | Software can nudge but cannot force client action | Multi-channel cadence + exception queue; don't over-promise automation |
| Broker-flow-ai is separate from agency folder | Risk of diluting the independent SaaS product with service-first playbook | Keep broker-flow-ai independent; no service-first delivery |

## Unresolved questions

- ODPC registration requirements for data controllers in Kenya; whether brokerFlow AI must register before collecting client documents.
- Exact WhatsApp Business per-message rates in KES.
- Exact SMS per-message rates in KES (providers identified, pricing not extracted).
- Email and phone call costs in Kenya.
- Kenyan secure document storage providers.
- AI document verification provider and per-document cost.
- Whether Kevin Osiga converts from free MVP to paid ($1,000–$2,000).
- Whether a single n8n instance serves all brokers or per-broker instances are needed.

## Decision gate
Do not proceed to implementation (phase 7) until ODPC compliance is confirmed and a pilot broker indicates willingness to pay.
