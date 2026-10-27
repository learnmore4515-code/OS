# Deliverable D — Kenya-Specific Operating Requirements

## Communication Channels for Kenya

### WhatsApp Business Platform
**Source:** habarichat.ai (fetched Oct 2026)

- Since July 2025: Meta charges per delivered message, not per 24-hour conversation
- Categories: Marketing (highest cost), Utility, Authentication, Service (replies within 24h = free)
- Exact Kenyan per-message rates not published; vary by recipient country and Meta's rate card
- Free allowances: replies during 24-hour service window, messages in 72-hour window after click-to-WhatsApp ads
- Volume discounts apply to utility and authentication categories
- HabariChat passes Meta's rates at 0% markup, billed in KES
- Sample: 500-contact marketing broadcast could cost "a few hundred to a couple of thousand shillings"

**Applicability to BrokerFlow AI:**
- Service replies (24h window) are free → ideal for document status updates, client responses
- Utility templates (payment reminders, document requests) → low cost with volume discounts
- Marketing broadcasts → highest cost, use sparingly
- WhatsApp is widely used in Kenya → strong channel choice for client communication

### SMS
**Source:** WebSearch results (not fetched — WebFetch blocked)

Multiple Kenyan providers found: rankingkenya.co.ke, kenyasms.com, sokosauti.com, yoolasms.com, thabititechnologies.com, esmsafrica.io, helloduty.com

**Exact per-SMS pricing not yet extracted** — needs manual browsing.

**Applicability to BrokerFlow AI:**
- SMS works on all phones (no smartphone required) → important for clients without smartphones
- SMS has no rich media → cannot send document upload links directly, can send short codes or phone numbers
- Lower cost than WhatsApp marketing, higher than WhatsApp service replies

### Email
**Source:** Not yet researched.

**Applicability to BrokerFlow AI:**
- Email is formal and document-friendly (can send attachments, links)
- Not all clients have email addresses → cannot be the only channel
- Lower urgency than WhatsApp/SMS

### Phone-Call Escalation
**Source:** Not yet researched.

**Applicability to BrokerFlow AI:**
- Highest cost, highest personal touch
- Should be the final escalation step after WhatsApp/SMS/email fail
- Brokers already make phone calls → familiar channel

### Secure Document Upload Links
**Source:** Not yet researched — no specific Kenyan secure file-sharing providers identified.

**Applicability to BrokerFlow AI:**
- Tokenized, mobile-friendly links unique to each quote/claim/renewal
- Must work on basic smartphones (many Kenyan clients use feature phones or low-end Android)
- Must not require app installation (per user requirement)

### Mobile-Friendly Web Portal
**Source:** Not yet researched.

**Applicability to BrokerFlow AI:**
- Mobile-first design essential (Kenya is mobile-first market)
- Must work on low-bandwidth connections
- Must not require app installation

## Data Protection (ODPC)

**Source:** WebSearch returned no results for ODPC Kenya. WebFetch was blocked.

**Status:** NOT VERIFIED — needs manual research on odpc.go.ke or equivalent.

**Applicability to BrokerFlow AI:**
- Kenya Data Protection Act 2019 applies to personal data processing
- Insurance documents (ID, KRA PIN, medical reports, logbooks) are sensitive personal data
- BrokerFlow AI must register as a data controller with ODPC (if required)
- Must obtain client consent before collecting documents
- Must implement appropriate security for document storage and transmission
- Must have data retention and deletion policies

## Cost Estimates

**WhatsApp Business** (partial data):
- Service replies (24h window): Free
- Utility templates: Low cost, volume discounts
- Marketing broadcasts: Highest cost ("a few hundred to a couple of thousand shillings" for 500 contacts)

**SMS:** Not yet extracted — needs manual browsing of Kenyan SMS providers.

**Email:** Not yet researched.

**Phone calls:** Not yet researched.

## Operational Constraints (Kenya-specific)

1. **Connectivity:** Many clients have intermittent data access → offline-capable upload links, SMS fallback
2. **Device capability:** Mix of smartphones and feature phones → mobile web (not app) is essential
3. **Language:** English and Swahili → multilingual support may be needed
4. **Trust:** Clients may distrust upload links → branded links, alternative channels (WhatsApp direct, email)
5. **Cost sensitivity:** Brokers are cost-conscious → pricing must be accessible

## Gaps Requiring Further Research
- ODPC registration requirements for data controllers in Kenya
- Exact WhatsApp Business per-message rates in KES
- Exact SMS per-message rates in KES
- Email and phone call costs in Kenya
- Kenyan secure document storage providers
- Whether brokerFlow AI needs ODPC registration before collecting client documents
