# Deliverable I — Estimated Operating Costs and Dependencies

## Known costs

| Item | Cost basis | Status |
|------|-----------|--------|
| WhatsApp Business — service replies (24h window) | Free | Known (HabariChat) |
| WhatsApp Business — utility templates | Low cost, volume discounts | Known qualitatively; exact KES per-message not published |
| WhatsApp Business — marketing broadcasts | Highest ("a few hundred to a couple thousand shillings" per 500 contacts) | Known qualitatively |
| SMS | Kenyan providers identified | Per-SMS pricing not extracted |
| Email | Not researched | Unknown |
| Phone-call escalation | Not researched | Unknown |
| Document storage | Not researched | Unknown |
| AI verification | Not researched | Unknown |

## Known providers / dependencies

- WhatsApp Business Platform account (HabariChat or direct Meta).
- Kenyan SMS provider account (rankingkenya.co.ke, kenyasms.com, sokosauti.com, yoolasms.com, thabititechnologies.com, esmsafrica.io, helloduty.com).
- Google Sheets document tracker with real sheet IDs (replacing placeholders).
- ODPC-compliant document storage provider.
- AI document verification provider.
- Static hosting for single-file HTML dashboard + upload portal (zero/low cost options).

## Cost model (directional)

Per active case per month, dominated by:
- WhatsApp messages (service replies free; utility templates low cost).
- SMS fallbacks (per-message).
- AI verification (per-document, TBD).
- Document storage (per-GB, TBD).

Not yet quantified — requires manual browsing of Kenyan provider rate cards (WebFetch was blocked for several sources).
