# Deliverable F — Proposed End-to-End Workflow (KYC / Document Chasing)

## Scope

This is the immediate focus per CLAUDE.md: client follow-up for missing KYC and onboarding documentation. It is **not** an automated-reminder assumption — Deliverable C established why follow-ups fail (clients don't understand what's needed, incomplete requests, postponement, difficult submission, distrust, lost tracking, disconnected channels, multiple parties). The workflow below addresses each verified cause directly.

## Channel cadence (escalation order)

1. **WhatsApp** — first touch; free replies within 24-hour service window; low-cost utility templates for document requests.
2. **SMS** — fallback for clients without smartphones/data; no rich media, sends short codes or phone numbers, not upload links directly.
3. **Email** — formal, document-friendly (attachments + links), lower urgency, not all clients have email.
4. **Phone-call escalation** — final step after WhatsApp/SMS/email fail; highest cost, highest personal touch.
5. **Exception queue** — cases overdue >7 days route here for broker manual review with SLA timer.

## End-to-end flow

### 1. Broker creates case (trigger)
Broker onboards a client or opens a renewal/claim in the broker dashboard. System records: client name, phone, email, preferred channel, policy type, required document list, deadline.

### 2. Requirement engine (addresses: clients don't understand what's needed)
System generates a **personalised document requirement list** per policy type, showing exactly what is needed, why, and by when. Examples:
- Motor: national ID, KRA PIN, logbook.
- Commercial/PSV: national ID, KRA PIN, risk notes.
- Fire/burglary: national ID, KRA PIN, material-facts disclosure.
- Claims: claim form, supporting docs, loss adjuster reports.

### 3. Initial request (addresses: incomplete/confusing requests)
System sends a structured document request via the client's preferred channel with a **secure, tokenised, mobile-friendly upload link** unique to the quote/claim/renewal. No app installation required. Request includes:
- Exact documents needed (from requirement engine).
- Why each is needed.
- Deadline.
- Alternative submission: WhatsApp direct or email for clients who distrust links (addresses: link distrust).

### 4. Client uploads (addresses: documents difficult to submit)
Client opens the upload link on any mobile browser (feature-phone-friendly where possible), drags/drops or selects files, submits. System sends upload confirmation to the client (addresses: submitted documents overlooked).

### 5. Verification (addresses: rejections without clear explanations)
AI document verification checks each upload against the requirement list:
- **Accept** → all required docs present and readable.
- **Request missing** → specific missing fields listed, client notified exactly what to add.
- **Reject** → reason given (unreadable, wrong doc type, expired).

### 6. Completion or escalation
- If complete: broker notified, case advances, client gets confirmation.
- If incomplete: client re-uploads missing items via same link.
- If no response: escalation cadence WhatsApp → SMS → email → phone → exception queue (>7 days).

### 7. Broker dashboard (addresses: brokers lose track, can't see blocking action)
Unified view showing all outstanding chases: client, case, missing docs, last contact date, channel used, SLA timer, blocking action and recommended next step. Communication history across WhatsApp/SMS/email/phone in one place (addresses: disconnected channels).

### 8. Multi-party alignment (addresses: multiple parties responsible)
Shared milestone tracker visible to broker, client, insurer, and loss adjuster per their role:
Lodged → Documents Received → Verification → Adjuster Assigned → Assessment Received → Underwriter Sign-off.

## What this does NOT do (out of scope)

- Payment reconciliation (explicitly excluded per CLAUDE.md).
- Automated underwriting or policy issuance.
- Replacing broker judgment — the system nudges and tracks; the broker decides.

## Success measures (inform Deliverable G)

- % of first-time submissions that are complete (target: improve over manual baseline).
- Average days from request to submission.
- % of chase tasks reaching exception queue without resolution.
- Broker willingness to pay ($1,000–$2,000 target).
