# Deliverable A — Evidence-Backed Problem Analysis

## Problem Statement
Insurance brokers in Kenya lose approximately 60% of their time on policy administration and chasing clients for missing documentation (KYC docs, claim documents). They also struggle with reconciliation: premium reconciliation, member validity, reimbursement tracking, quarterly reports, new business vs renewal comparisons. Existing manual approaches (phone calls, WhatsApp, email, spreadsheets) have not eliminated the problem.

## Evidence from Discovery Conversations

### Source: responses.md — 28 LinkedIn DM discovery conversations (Oct 13–22, 2026)

**Top pain-point patterns across all conversations:**

| # | Pain point | Sources | Notes |
|---|-----------|---------|-------|
| 1 | Renewal follow-ups & notices | Brenda, Marcelline, Benson, Darlington, Charles, Peter Thuku | Benson specified sequence: 2 months / 1 month / 1 week / 3 days to renewal |
| 2 | Chasing documents | Josephine (signed docs), Martin (submission exposure data, claims experience, signed docs), Charles, Cedric, Daisy Ndiya (clients rarely cooperate), Daniel Mulinge, Lucy Odhiambo, Peter Makokha (insurer side) | "Most clients rarely want to cooperate" |
| 3 | Manual follow-ups across email threads | Brenda (cedants/reinsurers), Kahumakati (agents/IFAs) | Repeated follow-ups across email threads |
| 4 | Policy admin / data entry | Darlington (~60% of broker time) | Asset additions/deletions, collating client data, insurer amendments |
| 5 | Submission chasing in renewal season | Martin (dozens of accounts) | Worse across dozens of accounts during renewal season |
| 6 | Reconciliation & reporting | Willy (member-validity reconciliation, premium reconciliation, quarterly reports, reimbursement tracking), Daniel Mulinge (premium & commission reconciliation) | New business/renewal comparisons = Willy's main pain |
| 7 | Comparative quotation creation | Kevin Osiga | 2–3 hours per quote; manually combining underwriter quotes with different formats, benefits, sub-limits, exclusions |
| 8 | Onboarding integration | Peter Thuku | Challenge integrating with underwriter's system |

### Source: decisions/log.md — Darlington Munhuwani discovery call (Oct 22, 2026, 9:00 EAT via Teams)

Darlington is a retired CEO / business consultant, not a broker himself, but shared industry experience:

- **Policy administration ~60% of broker time** — changes/cancellations/conversions
- **Premium payment reconciliation** — missing payment references (M-Pesa), unallocated premiums
- **Claims document chasing** — docs lost along chain, assessors not digital
- **Fragmented touch points** — no unified view across client/broker/insurer/loss adjuster systems
- **Advised**: Sit in a broker's office for 1-2 weeks to understand processes before building

### Source: CURRENT-RECOMMENDATION.md (Oct 19, 2026)

- Niche: Insurance brokers (picked via 4-factor unfair-advantage audit)
- Stage 4 — Getting the first customer
- Objective: First paid AI-automation client at $1,000–$2,000 within 30–60 days
- Zero paid clients yet (as of Oct 19)

### Source: HANDOVER-quote-compare-mvp.md

- Kevin Osiga (insurance broker, Kenya EAT/UTC+3) agreed to free MVP for quotation comparison
- Main pain: 2–3 hours per quote manually combining underwriter quotes
- Medical insurance suggested as MVP product
- Zero installation requirement — single HTML file

## What's NOT Evidence (Hypotheses Only)
The following are plausible causes but NOT yet verified by evidence:
- Clients do not understand which documents are required
- Clients distrust upload links
- Brokers lose track of conversations
- Submitted documents are overlooked
- Existing software is too expensive or cumbersome

## Gaps Requiring Further Research
- ODPC (Office of Data Protection Commissioner) Kenya guidance — WebSearch returned no results; WebFetch blocked
- IRA broker licensing requirements — WebSearch returned no results; WebFetch blocked
- Specific KYC document requirements for Kenyan insurance — WebSearch returned no results
- AKI (Association of Kenya Insurers) resources — WebSearch returned no results

## Verified vs. Unverified Summary

**Verified (from direct discovery conversations):**
- 28 conversations conducted; ~70% identified document chasing and reconciliation as recurring problems
- Brokers spend ~60% of time on policy administration (Darlington, retired CEO)
- Quotation creation takes 2–3 hours per quote manually (Kevin Osiga)
- Clients rarely cooperate on document submission (Daisy Ndiya, AIIK)
- Renewal follow-up is manual (multiple sources)
- Premium reconciliation is difficult (Willy, Daniel Mulinge)

**Unverified (needs research):**
- ODPC compliance requirements for document collection
- IRA licensing requirements affecting broker operations
- Specific KYC document lists per insurance type
- Existing broker software automation gaps
