# Independent Audit — n8n Workflows (AI Sales Agent & CRM)

**Date:** 2026-10-27
**Auditor:** Claude Code (independent of implementation)
**Files audited:** `production/n8n-workflows/wa-inbound.ts`, `human-handoff.ts`, `google-sheets-sync.ts`; plus `data-models.ts`, `event-contracts.json`, `system-prompt.md`, `SETUP.md`, `CREDENTIALS.md`
**Demo (`index.html`):** Verified end-to-end via Playwright (see `research/test-report.md`) — PASS, no credentials required.

## Overall verdict
The demo (`index.html`) is a **working, verified, standalone implementation**. The production n8n workflows are **structurally valid but incomplete skeletons** — they define the right flow shape but do not implement the full order lifecycle, payment verification, tenant isolation, or duplicate protection. None are activated; none can run live without WhatsApp Business API and M-Pesa Daraja credentials.

## 1. `wa-inbound.ts` — WhatsApp AI Sales Agent Inbound

n8n draft ID: `uAZm8JudhqlIic7t` (Simon Green's personal project, not activated)

### What is validated (structure correct)
- Webhook trigger (`n8n-nodes-base.webhook` v2.2, `responseMode: responseNode`) — correct pattern for returning 200 OK to WhatsApp.
- Input normalization extracts `from`, `messageText`, `messageId`, `timestamp` from the nested WhatsApp payload.
- Input validation IF node requires `from` + `messageText` (combinator `and`); invalid input → 400 JSON response.
- AI Agent node (`n8n-nodes-langchain.agent` v3.1) wired to OpenAI chat model + conversation memory buffer window.
- Outbound: format-response Set node → WhatsApp send node (credential placeholder) → Respond 200 OK.

### What is MISSING / not implemented (gaps vs. mission requirements)
| Requirement | Status | Evidence |
|-------------|--------|----------|
| Duplicate-message protection | ❌ Missing | `messageId` is normalized but never stored/checked; no idempotency guard on inbound messages. |
| Tenant identification & isolation | ❌ Missing | Phone used directly; no `tenantId` mapping or multi-tenant scoping anywhere in the flow. |
| Catalogue & inventory retrieval | ❌ Missing | No `getCatalogue`/`getInventory` node; AI agent has no product lookup tool. |
| AI agent tool contracts | ❌ Missing | `system-prompt.md` §9 defines `getCatalogue`, `validateCart`, `createOrder`, `verifyPayment`, `updateFulfilment`, `escalateToHuman`, `recordOptOut` — **none are implemented as n8n tools the agent can call**. The agent prompt is generic text; it cannot calculate totals or create orders. |
| Cart management | ❌ Missing | No cart create/update node. |
| Order creation (idempotent) | ❌ Missing | No order creation node; no idempotency key handling. |
| Trusted payment verification (M-Pesa) | ❌ Missing | No M-Pesa callback node; no payment state machine (`unpaid → pending → verified`). |
| Google Sheets sync integration | ❌ Missing | Not connected to order creation; separate scheduled workflow only. |
| Fulfilment & order-status | ❌ Missing | No fulfilment node. |
| Human handoff from inbound flow | ❌ Missing | `human-handoff.ts` is a standalone workflow, not invoked from `wa-inbound`. |
| Error handling & retries | ❌ Missing | No retry on WhatsApp send failure; no dead-letter / error branch. |
| Webhook signature verification | ❌ Missing | No validation of WhatsApp webhook signature (security gap — `WEBHOOK_VERIFY_TOKEN` defined in `.env` but unused). |

### Demo vs. production divergence
The demo `index.html` implements the full state machine (GREETING → … → COMPLETED), deterministic totals (`line_total = unit_price × qty`, `grand_total = subtotal − discount + delivery_fee`), idempotent order creation, pending-vs-verified payment, and honest `DEMO ORDER CREATED` labels. The n8n `wa-inbound.ts` implements **none** of this server-side — it only relays text to an LLM and back.

## 2. `human-handoff.ts` — Staff Notification

n8n draft ID: `CKVK2JrvAdqEZ3NC` (not activated)

### What is validated
- Webhook trigger → Slack message post (OAuth2) → Respond 200 OK. Flow shape is correct.

### Gaps
- No error handling or retry if Slack notify fails.
- No persistence of the handoff record (no order/conversation write).
- No escalation acknowledgment back to the customer beyond the static 200 response.

## 3. `google-sheets-sync.ts` — Order Export

n8n draft ID: `om3PBHBW5mYUDRck` (not activated)

### What is validated
- Schedule trigger → IF (only sync unsynced orders) → Google Sheets append → result set. Correct conditional shape.

### Gaps
- **Orders data is hardcoded demo data** (`ORD-0001`, Jane Wanjiku, grandTotal 6300) — not read from a real orders store/Data Table, so it cannot sync actual live orders.
- No error handling or retry if the Sheets write fails.
- Does **not** update the order's `syncedToSheets` flag after a successful write, so re-runs would duplicate rows.
- Not connected to the order-creation flow; runs on its own schedule.
- Honest-label rule not enforced in code: nothing prevents showing `SYNCED TO GOOGLE SHEETS` before a genuine write succeeds (that rule lives only in the demo frontend).

## 4. Credential / integration status

Per `CREDENTIALS.md` and `env.example`:

| Integration | Credential | Available in connected n8n instance? | Blocks live activation? |
|-------------|-----------|--------------------------------------|-------------------------|
| OpenAI / Zara agent | `openAiApi` | ✅ Yes (gateway credits) | No |
| Google Sheets | `googleSheetsOAuth2Api` | ✅ Yes (user credential) | No |
| Slack | `slackOAuth2Api` | ✅ Yes (user credential) | No |
| WhatsApp Business Cloud | `whatsAppApi` | ❌ No | **Yes** (live WhatsApp) |
| M-Pesa Daraja | n8n credential | ❌ No | **Yes** (live payments) |

Connected instance: `https://simongreenmmm.app.n8n.cloud` (`N8N_BASE_URL`). All three workflows sit in project `dHO7QZUgQlETGMEP` (Simon Green's personal project) and must be moved to Peter's project before activation.

## 5. Security notes
- No secrets are hardcoded in workflow parameters (placeholders used) — good.
- `.env` template exists; `.env` is gitignored — good.
- **Missing:** webhook signature verification for WhatsApp inbound; no encryption-at-rest note for stored customer data; tenant isolation not enforced in workflows (only modeled in `data-models.ts`).
- `system-prompt.md` §5 correctly states: never mark an order paid on customer claim alone; require trusted M-Pesa callback. This rule is **not yet enforced server-side** because payment verification isn't implemented.

## 6. What works vs. simulated vs. blocked

| Component | Status | Evidence |
|-----------|--------|----------|
| Demo (`index.html`) full journey | ✅ Working, verified | Playwright test: greeting → products → cart → delivery → details → confirm → order (KES 0) → payment verified → reset/repeat. Zero console errors. |
| Demo deterministic totals | ✅ Working | sneakers 4500 + CBD 150 = 4650 verified. |
| Demo honest labels | ✅ Working | `Total Paid (KES)` = 0 until verify; sync = `DEMO ORDER CREATED`. |
| n8n `wa-inbound.ts` | ⚠️ Structurally valid, not live | Draft on n8n instance; missing catalogue/cart/order/payment/duplicate-protection; cannot activate without WhatsApp credential. |
| n8n `human-handoff.ts` | ⚠️ Structurally valid, not live | Draft; no error handling/persistence. |
| n8n `google-sheets-sync.ts` | ⚠️ Simulated data, not live | Hardcoded demo order; not connected to real orders. |
| Live WhatsApp integration | 🔒 Blocked | WhatsApp Business Cloud credential not configured (Meta Business + phone number ID required). |
| Live M-Pesa verification | 🔒 Blocked | M-Pesa Daraja credential not configured (Safaricom merchant registration required). |
| n8n workflow activation | 🔒 Blocked | All 3 are drafts; not activated; in wrong project. |

## 7. Recommended next steps (production)
1. Implement server-side tool nodes in `wa-inbound.ts` for `getCatalogue`, `validateCart`, `createOrder`, `verifyPayment`, `updateFulfilment`, `escalateToHuman`, `recordOptOut` per `system-prompt.md` §9, wired to `data-models.ts`.
2. Add duplicate-message protection (idempotency key on `messageId`) and tenant identification/isolation.
3. Add WhatsApp webhook signature verification.
4. Connect `google-sheets-sync.ts` to real order data, add error handling/retry, and update the `syncedToSheets` flag on success.
5. Wire `human-handoff.ts` into `wa-inbound.ts` escalation path.
6. Configure WhatsApp Business Cloud + M-Pesa Daraja credentials, move workflows to Peter's n8n project, then activate.
7. Re-run this audit after activation to confirm live behavior.
