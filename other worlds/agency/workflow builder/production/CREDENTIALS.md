# AI Sales Agent & CRM — Credential & Configuration Checklist

Consolidated list of credentials and configuration values required for production. Grouped by integration. **Never paste secrets into a public source file** — store them via the n8n credential system (or `.env` for local demo config only).

## How to use this checklist

1. Obtain each credential from the "Where obtained" column.
2. Store it via the n8n credential system (never hardcode in workflow parameters).
3. Wire it into the component listed in "Component".
4. Run the "Confirmation test" to verify the integration works.
5. Mark mandatory vs optional — do not activate production flows for missing mandatory credentials.

---

## 1. WhatsApp Business Platform (MANDATORY for live WhatsApp)

| Field | Value |
|-------|-------|
| What it's for | Send/receive WhatsApp messages via WhatsApp Business Platform API (inbound webhook + outbound replies) |
| Where obtained | https://developers.facebook.com → WhatsApp Business API app (verified Meta Business + phone number) |
| Account requirement | Verified Meta Business + WhatsApp phone number (a SIM card alone does NOT activate the API) |
| Component | `n8n-workflows/wa-inbound.ts` → WhatsApp - Send Reply node + webhook trigger |
| Mandatory | Yes (for live WhatsApp) |
| Cost | Free to develop; conversation-based pricing in production (Meta) |
| Secure storage | n8n credential: `WhatsApp Business Cloud` (type `whatsAppApi`) |
| n8n config key | `WHATSAPP_PHONE_NUMBER_ID` |
| Confirmation test | Send a test message from the workflow to a WhatsApp number; confirm delivery + webhook receives inbound replies |

## 2. M-Pesa Daraja (MANDATORY for live payment verification)

| Field | Value |
|-------|-------|
| What it's for | Trusted M-Pesa payment callback verification (STK push) — confirms order paid only when order, merchant, amount, and transaction reference all match |
| Where obtained | https://developer.safaricom.co.ke → Daraja API app |
| Account requirement | Safaricom merchant registration (Till or Paybill number) |
| Component | Production payment-verification endpoint (not yet built as n8n workflow — adapter + webhook contract in `event-contracts.json`) |
| Mandatory | Yes (for live payments) |
| Cost | Free developer sandbox; transaction fees in production |
| Secure storage | n8n credential (consumer key/secret, passkey) — never in workflow parameters |
| n8n config keys | `MPESA_CONSUMER_KEY`, `MPESA_CONSUMER_SECRET`, `MPESA_SHORTCODE`, `MPESA_PASSKEY`, `MPESA_ENVIRONMENT` |
| Confirmation test | Trigger a test STK push in sandbox; confirm `payment.verified` event fires with correct amount and `Total Paid (KES)` updates from 0 to the order total |

## 3. OpenAI / AI model (MANDATORY for Zara AI agent)

| Field | Value |
|-------|-------|
| What it's for | Powers Zara's natural-language understanding, product recommendations, and conversation |
| Where obtained | n8n gateway credits (pre-configured in connected instance: `openAiApi`) OR direct OpenAI API key |
| Account requirement | OpenAI account (or n8n gateway credits) |
| Component | `n8n-workflows/wa-inbound.ts` → OpenAI Model (Zara) node |
| Mandatory | Yes |
| Cost | n8n gateway credits (pre-loaded) OR OpenAI per-token pricing |
| Secure storage | n8n credential: `OpenAI` (type `openAiApi`) — auto-assigned via gateway credits in connected instance |
| Confirmation test | Activate wa-inbound workflow; send a test message; confirm Zara replies coherently |

## 4. Google Sheets (OPTIONAL — order synchronisation)

| Field | Value |
|-------|-------|
| What it's for | Sync confirmed orders to a Google Sheet (only after a genuine successful write) |
| Where obtained | Google Cloud Console → service account OR Google OAuth2 + a spreadsheet |
| Account requirement | Google account + a spreadsheet shared with the service account/client email |
| Component | `n8n-workflows/google-sheets-sync.ts` → Google Sheets - Append Order node |
| Mandatory | No |
| Cost | Free (Google Sheets) |
| Secure storage | n8n credentials: `Google API` + `Google Sheets` (types `googleApi`, `googleSheetsOAuth2Api`) — Google Sheets auto-assigned in connected instance |
| n8n config keys | `GOOGLE_SHEETS_SPREADSHEET_ID`, `GOOGLE_SHEETS_TAB` |
| Confirmation test | Activate google-sheets-sync; confirm a new row appears in the sheet; confirm `SYNCED TO GOOGLE SHEETS` only shows after a real write |

## 5. Slack (OPTIONAL — staff notification on human handoff)

| Field | Value |
|-------|-------|
| What it's for | Notify staff when a conversation is escalated to a human |
| Where obtained | Slack app (https://api.slack.com) with `chat:write` scope + channel ID |
| Account requirement | Slack workspace |
| Component | `n8n-workflows/human-handoff.ts` → Slack - Notify Staff node |
| Mandatory | No |
| Cost | Free (Slack) |
| Secure storage | n8n credential: `Slack` (type `slackOAuth2Api`) — auto-assigned in connected instance |
| n8n config key | `SLACK_CHANNEL_ID` |
| Confirmation test | Trigger a human-handoff webhook; confirm a message appears in the Slack channel |

## 6. Demo mode (NO credentials required)

| Field | Value |
|-------|-------|
| What it's for | Standalone demo (`index.html`) — complete customer-to-order journey with simulated WhatsApp + M-Pesa |
| Where obtained | N/A (local file) |
| Component | `index.html` (workflow builder root) + `production/system-prompt.md` |
| Mandatory | N/A |
| Cost | Free |
| Confirmation test | Open `index.html`; complete a purchase; confirm dashboard shows the order with `Total Paid (KES) = 0` until simulated payment verification |

---

## Credentials already available in the connected n8n instance

| Credential | Type | Status |
|------------|------|--------|
| OpenAI | `openAiApi` | Available (gateway credits) |
| Google Sheets | `googleSheetsOAuth2Api` | Available (user credential) |
| Slack | `slackOAuth2Api` | Available (user credential) |
| Gmail | `gmailOAuth2` | Available (not used by AI Sales Agent) |

## Credentials NOT yet available (must be obtained)

| Credential | Type | Needed for |
|------------|------|------------|
| WhatsApp Business Cloud | `whatsAppApi` | Live WhatsApp inbound/outbound |
| M-Pesa Daraja | (n8n credential) | Live payment verification |

## Confirmation summary

| Integration | Status | Blocks production activation? |
|-------------|--------|-------------------------------|
| Demo (`index.html`) | ✅ Working | No |
| OpenAI / Zara agent | ✅ Credential available | No |
| Google Sheets sync | ✅ Credential available | No |
| Slack handoff | ✅ Credential available | No |
| WhatsApp Business API | ❌ Not configured | Yes (live WhatsApp) |
| M-Pesa Daraja | ❌ Not configured | Yes (live payments) |

**Do not activate the WhatsApp workflow or payment verification until WhatsApp + M-Pesa credentials are configured and tested.**
