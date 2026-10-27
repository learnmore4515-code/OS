# Deliverable C — Root-Cause Analysis: Why Document Follow-Ups Fail

## Method
Cause-and-effect analysis based on:
- 28 LinkedIn DM discovery conversations (responses.md, Oct 13–22, 2026)
- Darlington Munhuwani discovery call (decisions/log.md, Oct 22, 2026)
- Internal exploration of existing n8n operations hub and premium-reconciliation.html tool

For each plausible cause: evidence, validation method, whether software can address it, suggested intervention, and success measure.

## Root Causes

### 1. Clients do not understand which documents are required
**Evidence:** Josephine Wanjiru (CCIS) reported "chasing signed documents" — no detail on whether clients knew what was needed. Darlington noted "collating client data" as ~60% of broker time. Kelvin Omondi listed specific missing documents (motor: logbook, national ID, KRA PIN; commercial/PSV: risk notes; fire/burglary: material-facts disclosure).

**Status:** Partial evidence — document types are known, but client understanding not directly confirmed.

**Can software address it?** Yes — clear, personalized document requirement lists per policy type.

**Intervention:** Personalized, context-aware document requests showing exactly what's needed, why, and by when.

**Success measure:** % of first-time submissions that are complete (no missing fields).

### 2. Requests are incomplete or confusing
**Evidence:** Brenda Mutea reported "repeated follow-ups across email threads" for outstanding claims info. Martin Ayallo reported "multiple email rounds" chasing complete submission info (exposure data, claims experience, signed docs).

**Status:** Partial evidence — incomplete requests implied by repeated email rounds, but not directly confirmed.

**Can software address it?** Yes — structured requirement engine with validation.

**Intervention:** Structured intake forms with real-time validation, preventing submission of incomplete requests.

**Success measure:** Reduction in email rounds per document submission.

### 3. Clients postpone submission
**Evidence:** Daisy Ndiya (AIIK) stated "most clients rarely want to cooperate." Lucy Odhiambo reported "following up on outstanding premiums, chasing missing documentation."

**Status:** Anecdotal evidence — broker perception, not client-verified.

**Can software address it?** Partially — automated nudges can help, but can't force client action.

**Intervention:** Multi-channel nudging (WhatsApp, SMS, email) with escalating urgency; secure upload links with expiry.

**Success measure:** Average days from request to submission.

### 4. Documents are difficult to submit
**Evidence:** Not directly stated in discovery conversations. Darlington noted assessors are "not digital" and "deal with paper ties," suggesting paper-based processes on the insurer/assessor side.

**Status:** Hypothesis — no direct evidence from brokers.

**Can software address it?** Yes — mobile-friendly upload links, OCR, drag-and-drop.

**Intervention:** Secure, tokenized, mobile-friendly upload links unique to each quote/claim/renewal.

**Success measure:** % of documents successfully uploaded on first attempt.

### 5. Clients distrust upload links
**Evidence:** Not directly stated. No discovery conversation mentioned distrust of links.

**Status:** Hypothesis — no evidence.

**Can software address it?** Partially — branded, verified links with clear sender identity.

**Intervention:** Branded magic links with clear broker/agency identification; alternative submission via WhatsApp/email for clients who distrust links.

**Success measure:** Link click-through rate vs. alternative submission rate.

### 6. Brokers lose track of conversations
**Evidence:** Kevin Osiga reported "lead follow-ups in Excel" — manual tracking in spreadsheets. Brenda reported "repeated follow-ups across email threads" — fragmented communication.

**Status:** Partial evidence — manual tracking tools (Excel) imply tracking difficulty.

**Can software address it?** Yes — unified communication history and task management.

**Intervention:** Unified broker task dashboard showing all outstanding chases, status, and last contact date per client.

**Success measure:** % of chase tasks with no lost/forgotten follow-ups.

### 7. Submitted documents are overlooked
**Evidence:** Not directly stated. Darlington noted "docs lost along chain" between broker, insurer, and loss adjuster.

**Status:** Hypothesis — implied by "lost along chain" but not confirmed at broker level.

**Can software address it?** Yes — automatic document classification, status tracking, upload confirmation.

**Intervention:** Automatic document classification on upload; upload confirmation to client; status tracking visible to broker.

**Success measure:** % of uploaded documents that reach verification without being overlooked.

### 8. Documents rejected without clear explanations
**Evidence:** Not directly stated in discovery conversations.

**Status:** Hypothesis — no evidence.

**Can software address it?** Yes — AI verification with specific missing-field feedback.

**Intervention:** AI document verification returning specific missing fields and recommended actions (accept / request_missing / reject with reason).

**Success measure:** % of rejected documents with clear rejection reasons.

### 9. Multiple parties responsible for different requirements
**Evidence:** Darlington described fragmented touch points across client/broker/insurer/loss adjuster systems. Peter Makokha (Britam claims officer) noted "insurers waste time getting documents from broker, frequent follow-ups."

**Status:** Verified — Darlington confirmed fragmented systems; Peter Makokha confirmed broker-insurer friction.

**Can software address it?** Partially — shared claim/quote lifecycle boards can align parties.

**Intervention:** Multi-party alignment hub with shared milestone tracker (Lodged → Adjuster Assigned → Assessment Received → Underwriter Sign-off).

**Success measure:** Reduction in inter-party follow-up time.

### 10. Brokers cannot see which action is blocking completion
**Evidence:** Not directly stated. But Willy Kiptoo listed 5 distinct pains (reconciliation, member validity, reimbursement, quarterly reports, new business/renewal comparisons) suggesting lack of unified visibility.

**Status:** Hypothesis — implied by multiple separate pains, not directly confirmed.

**Can software address it?** Yes — exception queue with SLA timers and blocking-action visibility.

**Intervention:** Exception queue showing exactly which action is blocking each case, with SLA timers and recommended next step.

**Success measure:** Time from blockage identified to resolution.

### 11. Existing software is too expensive or cumbersome
**Evidence:** Not directly stated in discovery conversations. Kevin Osiga rejected Google Sheets/Excel as "too basic" — implying existing tools are either too basic or too complex/costly.

**Status:** Partial evidence — Kevin's rejection of basic tools implies a gap in the middle market.

**Can software address it?** Yes — simple, focused tool at accessible price point.

**Intervention:** Single-file HTML broker-facing dashboard (zero installation) + n8n backend automation.

**Success measure:** Broker willingness to pay ($1,000–$2,000 target).

### 12. Communication channels are disconnected
**Evidence:** Brenda reported follow-ups "across email threads." Darlington noted "no unified view across client/broker/insurer/loss adjuster systems."

**Status:** Partial evidence — fragmented channels confirmed.

**Can software address it?** Yes — unified communication history across channels.

**Intervention:** Unified communication history in broker dashboard; WhatsApp/SMS/Email integration.

**Success measure:** % of client interactions tracked in unified history.

## Summary: Verified vs. Hypothesized Causes

| Cause | Evidence Status | Software Can Address? |
|-------|----------------|----------------------|
| Clients don't understand required docs | Partial | Yes |
| Incomplete/confusing requests | Partial | Yes |
| Clients postpone submission | Anecdotal | Partially |
| Documents difficult to submit | Hypothesis | Yes |
| Clients distrust upload links | Hypothesis | Partially |
| Brokers lose track | Partial | Yes |
| Submitted docs overlooked | Hypothesis | Yes |
| Rejections without explanation | Hypothesis | Yes |
| Multiple parties responsible | Verified | Partially |
| Can't see blocking action | Hypothesis | Yes |
| Software too expensive/cumbersome | Partial | Yes |
| Channels disconnected | Partial | Yes |

## Key Insight
The most verified causes are: (1) fragmented systems across parties, (2) manual tracking in Excel, (3) repeated email rounds, (4) clients rarely cooperating. Software should prioritize: unified tracking, clear document requirements, multi-party alignment, and automated nudging — in that order.
