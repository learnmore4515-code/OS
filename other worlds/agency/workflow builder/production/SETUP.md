# AI Sales Agent & CRM — Setup Instructions

This folder contains the production implementation of the autonomous AI Sales Agent and CRM System (WhatsApp-centred, M-Pesa payments, KES pricing) for Peter's AI automation agency.

## What's here

| File | Purpose |
|------|---------|
| `data-models.ts` | TypeScript data models (tenants, products, customers, orders, payments, fulfilment, audit logs) |
| `event-contracts.json` | JSON event schemas + sample payloads (order.created, payment.verified, fulfilment.updated, human.handoff, sync.sheets.failed) |
| `system-prompt.md` | Zara — the AI sales agent system prompt |
| `n8n-workflows/*.ts` | n8n Workflow SDK source files (importable workflows) |
| `env.example` | Environment variable template |
| This file | Setup & integration instructions |

## n8n workflows created on the connected instance

These have been built, validated (`validate_workflow`), and created as **drafts** (not activated) on the connected n8n instance. None are live until you configure credentials and activate them.

| Workflow | n8n ID | Status | Credential needed |
|----------|--------|--------|-------------------|
| WhatsApp AI Sales Agent - Inbound | uAZm8JudhqlIic7t | Draft (not activated) | WhatsApp Business Cloud |
| Google Sheets Sync - Orders | om3PBHBW5mYUDRck | Draft (not activated) | Google Sheets OAuth2 |
| Human Handoff - Staff Notification | CKVK2JrvAdqEZ3NC | Draft (not activated) | Slack OAuth2 |

All three are in Simon Green's personal n8n project (`dHO7QZUgQlETGMEP`). Move them to Peter's project before activating.

## Prerequisites

1. **n8n instance connected** — already done (OpenAI, Anthropic, Google Sheets, Slack, Firecrawl, Browserbase, Brave Search gateway credits available).
2. **WhatsApp Business Platform** — NOT yet configured. You need a verified Meta Business, a WhatsApp phone number ID, and an access token. A SIM card alone does NOT activate this API.
3. **M-Pesa Daraja** — NOT yet configured. You need Safaricom merchant registration and Daraja credentials (consumer key/secret, shortcode, passkey).
4. **Google Sheet** — create a spreadsheet with an "Orders" tab and header row: Order ID, Customer Name, Total (KES), Status.
5. **Slack channel** — create a channel for staff handoff notifications.

## Step-by-step setup

### 1. Configure environment
```bash
cp production/env.example .env
# Edit .env with your values (see CREDENTIALS.md for what each is for)
```

### 2. WhatsApp Business Platform (production)
1. Create a Meta Business and WhatsApp Business API app at https://developers.facebook.com
2. Verify your business and add a phone number
3. Get the Phone Number ID and a long-lived access token
4. Set the webhook URL to: `<n8n-url>/webhook/whatsapp-inbound`
5. Set the verify token to match `WHATSAPP_VERIFY_TOKEN` in `.env`
6. Create a "WhatsApp Business Cloud" credential in n8n with the access token
7. Put the Phone Number ID in the workflow's `phoneNumberId` placeholder (or `.env`)

### 3. M-Pesa Daraja (production payment verification)
1. Register as a Safaricom developer at https://developer.safaricom.co.ke
2. Create an app and get Consumer Key + Consumer Secret
3. Get your Till or Paybill number and the Daraja Passkey
4. Set `MPESA_ENVIRONMENT=sandbox` for testing, `production` for live
5. Configure the STK push / STK push callback URL to your order-verification endpoint
6. Store credentials via the n8n credential system (never in workflow parameters)

### 4. Google Sheets sync
1. Create a Google Sheet with tab "Orders" and header row: Order ID | Customer Name | Total (KES) | Status
2. Share the sheet with the service account / OAuth2 client email
3. Put the Spreadsheet ID in `GOOGLE_SHEETS_SPREADSHEET_ID` and tab name in `.env`
4. Create "Google API" + "Google Sheets" credentials in n8n
5. Activate the "Google Sheets Sync - Orders" workflow

### 6. Slack staff notification
1. Create a Slack app with `chat:write` scope
2. Install it to your workspace and get a channel ID
3. Create a "Slack" OAuth2 credential in n8n
4. Put the channel ID in the human-handoff workflow's `channelId` placeholder
5. Activate the "Human Handoff - Staff Notification" workflow

### 7. Activate workflows
Only activate after all credentials above are configured:
1. WhatsApp AI Sales Agent - Inbound
2. Google Sheets Sync - Orders
3. Human Handoff - Staff Notification

Do NOT activate the WhatsApp workflow until the WhatsApp credential is configured — it will fail on every inbound message.

## Demo vs production

- **Demo mode** (`DEMO_MODE=true`): All orders/payments are simulated. Orders are labelled `DEMO ORDER CREATED`. Payment stays unverified until a simulated trusted callback confirms it. Sync status only reads `SYNCED TO GOOGLE SHEETS` after a genuine Sheets write. No production credentials needed to run the demo (`index.html`).
- **Production**: Requires WhatsApp Business API + M-Pesa Daraja credentials. Orders are real. Payment is verified only via trusted M-Pesa callback.

## Security

- Never commit `.env` to git (it's gitignored).
- Store all tokens/API keys in the n8n credential system — never in workflow parameters or frontend code.
- Tenant isolation: each retailer's data is isolated by `tenantId`.
- Validate all webhook signatures before processing.
- Never mark an order paid based on the customer's claim alone — require a trusted M-Pesa callback.

## Credential checklist

See `CREDENTIALS.md` for the consolidated list of what to obtain, where, which component needs it, mandatory vs optional, cost, storage, and the test that confirms each integration.

## Files to hand over

- `production/index.html` — the standalone demo (already at workflow builder root)
- `production/data-models.ts`, `event-contracts.json`, `system-prompt.md`
- `production/n8n-workflows/*.ts`
- `production/env.example`, `production/SETUP.md`, `production/CREDENTIALS.md`
