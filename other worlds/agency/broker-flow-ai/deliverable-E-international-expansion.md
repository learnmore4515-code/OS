# Deliverable E — International Expansion Considerations

## Position

BrokerFlow AI is Kenya-first. International expansion is **Phase 4 / Deliverable E** — it is considered only after the Kenyan MVP has paying customers. Per the agency playbook condition carried over as discipline (not as the service-first model): defer expansion until after 1–2 paid proof clients in Kenya. Do not build for international markets before the local product works.

## Why Kenya first

- ODPC Data Protection Act 2024 (Kenya) is well-defined and directly applicable to the core product (collecting ID, KRA PIN, medical reports, logbooks).
- M-Pesa and WhatsApp dominate Kenyan client communication; the nudge cadence (WhatsApp → SMS → email → phone → exception queue) is designed around them.
- 28 discovery conversations were with Kenyan brokers; the evidence base is Kenyan.

## Markets to consider (in order)

| Market | Rationale | Regulatory body | Payment method | Language |
|--------|-----------|-----------------|----------------|----------|
| Uganda | East African Community, similar M-Pesa/mobile-money landscape, English-speaking | Insurance Regulatory Authority (Uganda) | MTN/Airtel mobile money | English |
| Tanzania | EAC, similar structure, larger population | Tanzania Insurance Regulatory Authority | M-Pesa (Tigo, Vodacom), Airtel Money | English, Swahili |
| Rwanda | EAC, small but digitised, easy to pilot | National Bank of Rwanda (insurance supervision) | Mobile money | English, French, Kinyarwanda |
| Nigeria | Largest African insurance market, but different regulatory regime | NAICOM | Bank transfer, mobile money, cards | English |
| Ghana | Growing insurance sector, English-speaking | National Insurance Commission (Ghana) | Mobile money | English |

## What changes per market

1. **Data protection regulator** — ODPC (Kenya) → NDPC (Nigeria), Data Protection Commission (Ghana), etc. Each country has its own authority and registration requirements. The ODPC compliance work done for Kenya must be redone per market.
2. **Insurance regulator** — IRA (Kenya) → NAICOM (Nigeria), etc. Broker licensing and conduct rules differ.
3. **Currency** — KES → NGN, GHS, UGX, TZS, RWF. Pricing must be local, not USD-converted.
4. **Payments** — M-Pesa → country-specific mobile money and bank integrations.
5. **Language** — English/Swahili → add French for Francophone West Africa, local languages as needed.
6. **Communication cost** — WhatsApp Business rates and SMS pricing vary by country and must be re-queried per market.

## What stays the same

- Core workflow: document request → upload → verify → nudge escalation → exception queue.
- Multi-party alignment hub (broker, client, insurer, loss adjuster).
- Mobile-first, zero-install portal.
- Channel cadence order (WhatsApp → SMS → email → phone → exception queue), though channel mix and cost shift per market.

## Decision

**Do not expand internationally yet.** Treat international expansion as a later-phase consideration (after Kenyan revenue proof). When expanding, start with Uganda or Tanzania (regulatory and payment similarity to Kenya), not Nigeria or Ghana.

## Open questions for later

- Exact data-protection registration cost and timeline per target market.
- Whether a single multi-tenant instance can serve multiple countries, or if per-country instances are needed for data residency.
- Mobile money API pricing and KYC requirements per country.
