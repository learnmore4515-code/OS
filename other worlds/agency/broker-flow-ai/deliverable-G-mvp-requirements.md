# Deliverable G — MVP Requirements and Acceptance Tests

## MVP scope

A single broker-facing product that chases missing KYC/onboarding documents autonomously, built with zero custom backend code (per "no coding yet" constraint): single-file HTML dashboard + upload portal (like `quote_compare.html`), orchestrated by n8n workflows (operations-hub Chain 4 pattern), using real channel providers.

### Requirements

| ID | Requirement |
|----|-------------|
| G1 | Broker creates a document-chase case: client name, phone, email, preferred channel, policy type, required documents, deadline. |
| G2 | System generates a personalised document requirement list per policy type (what, why, by when). |
| G3 | System sends a secure, tokenised, mobile-friendly upload link via the client's preferred channel (WhatsApp → SMS → email fallback). No app installation required. |
| G4 | Alternative submission via WhatsApp direct or email for clients who distrust links. |
| G5 | Client uploads documents through a mobile browser; system sends upload confirmation to client. |
| G6 | AI document verification returns: accept / request_missing (specific missing fields) / reject (reason). |
| G7 | No client response triggers escalation cadence: WhatsApp → SMS → email → phone → exception queue (>7 days overdue). |
| G8 | Broker dashboard shows all outstanding chases: client, case, missing docs, last-contact date, channel, SLA timer, blocking action, recommended next step. |
| G9 | Unified communication history across WhatsApp/SMS/email/phone in one view. |
| G10 | Multi-party milestone tracker (broker / client / insurer / loss adjuster) per role. |

### Out of MVP scope
- Payment reconciliation (explicitly excluded per CLAUDE.md).
- Automated underwriting or policy issuance.
- International expansion (Deliverable E — deferred until Kenyan revenue proof).

### Acceptance tests (one assertion each)

1. A broker can create a KYC document-chase case in under 5 minutes.
2. A client receives a personalised document request with a working upload link via their preferred channel.
3. An incomplete submission returns specific missing fields, not a generic rejection.
4. Cases with no response after 7 days route to the exception queue with an SLA timer.
5. The broker dashboard lists all outstanding chases with last-contact date and blocking action.
6. First-time complete submission rate improves vs. the broker's manual baseline during the pilot.
7. Average days from request to submission decreases during the pilot.
8. The pilot broker indicates willingness to pay $1,000–$2,000.

If any test fails, the MVP does not ship.
