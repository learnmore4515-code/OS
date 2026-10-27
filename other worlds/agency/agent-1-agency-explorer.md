# Agent 1 — Agency Explorer: Findings

Source folder: `C:\Users\profe\Downloads\OS\other worlds\agency\`
Read: CLAUDE.md, responses.md, decisions/log.md, research/CURRENT-RECOMMENDATION.md, research/MASTER-AI-AGENCY-PLAYBOOK.md (via research/playbooks/CURRENT-PLAYBOOK.md), research/research-synthesis.md, research/evidence-matrix.md, research/contradictions.md, research/PLAYBOOK-AUDIT.md, research/video-research-ledger.md, research/topics/*, research/creators/creator-Liam-Ottley.md, research/videos/007-XJYbZLPDUhE.md, plus `.playwright-mcp/page-2026-10-23T19-03-42-605Z.yml` (Fiverr marketplace snapshot).

---

## 1. What Kim/Peter does (business model & service offering)

**Done-for-you AI Automation Agency (AIAA) / freelance AI-implementation service — service-first, not software.**

- Productized done-for-you offer: outward-facing AI chatbot (lead nurturing, lead capture, conversion-event push, customer support via custom knowledge base), AI audit/assessment, or done-for-you automation.
- Delivered with no-code/low-code so there is no delivery cost on first projects (self-delivery first).
- Revenue model: fixed project price upfront ($1,000 case-study / $2,000–$3,000 typical), then maintenance retainers ($300–$1,000/mo), then infrastructure upsells ($3,000–$8,000/mo target once 10–20 automations delivered).
- Stages: consulting → agency → SaaS only after repeatable service. No SaaS/custom code/employees/paid ads until after proof + revenue.
- Delivery lifecycle: planning → building → reviewing → deploying → handing over (signing is prerequisite "phase 0"). Client creates their own Botpress account, builder transfers the bot to it, client is billed/responsible; bot embedded via web-chat script URL.

---

## 2. Target audience / niche

- **Chosen niche:** insurance brokers in Kenya, picked via the 4-factor unfair-advantage audit (factor 1: business access — existing relationships/warm network).
- Broader playbook target: small-to-mid businesses (5–500 employees, ~$500K–$10M revenue) that can benefit from an outward-facing chatbot/automation, have no time to learn it, and are ignored by big consulting firms.
- Niche rule: business access > experience/connections > interest; interest alone is the weakest criterion. Do not pick a niche "because there's money in it."

---

## 3. Tech stack

- **Botpress** — chatbot logic, conversation flow, nodes/transitions, variable capture, custom code blocks, testing URL, deployment, web-chat embed script.
- **Stack AI via API** — knowledge base document search (GPT-3.5 Turbo), because Botpress's native KB querying "is not that great."
- **Figma** — conversation flow diagramming, validated with client before building.
- **Voiceflow, make.com, n8n** — mentioned as no-code automation alternatives in the broader corpus.
- **Twilio, Go High Level** — mentioned for voice/SMS and funnel fulfillment in other creators' playbooks.
- **Stripe** — payments; Stripe dashboard proof ($1,000 = 3,000 Dirhams from Morningside Ventures, Dubai) is the only documented payment proof in the corpus.

---

## 4. Current stage

**Stage 4 — Getting the first customer (problem discovery with insurance brokers).**

- Trust map built; discovery conversations in progress (45 conversations logged in responses.md).
- First free pilot not yet delivered. Zero paid clients yet.
- Next: Stage 5 — delivering the result (Botpress + Stack AI), then Stage 6 — getting proof (Stripe proof + testimonial + documented result).

---

## 5. Objective

Land the **first paid AI-automation client (case study + testimonial + proof of delivery) within 30–60 days**. Target: 1 paid client at **$1,000–$2,000** ($1,000 case-study rate, discounted from $2,000–$3,000 typical), then a second client, then paid retainers.

Success condition per playbook: 1 paid client at $1,000–$2,000 + 1 testimonial + documented result + payment proof.

---

## 6. Pain points identified from conversations (45 LinkedIn DM conversations logged)

Top patterns (from responses.md pain-point synthesis):

1. **Renewal follow-ups & notices** — Brenda Mutea, Marcelline Awuor, Benson Nderitu (specified sequence: 2 months / 1 month / 1 week / 3 days to renewal), Darlington Munhuwani, Charles Chidakwa, Peter Thuku. Willy Kiptoo names new-business/renewal comparisons as his main pain.
2. **Chasing documents** — Josephine Wanjiru (signed docs), Martin Ayallo (submission exposure data, claims experience, signed docs — worse in renewal season across dozens of accounts), Charles Chidakwa, Daisy Ndiya (clients rarely cooperate), Daniel Mulinge, Lucy Odhiambo, Peter Makokha (insurer side).
3. **Manual follow-ups across email threads** — Brenda Mutea (cedants/reinsurers on claims info/settlement updates), Kahumakati Vivian (agents/IFAs every morning).
4. **Policy admin / data entry** — Darlington Munhuwani (~60% of broker time on changes/cancellations/conversions; asset additions/deletions; collating client data; insurer amendments).
5. **Reconciliation & reporting** — Willy Kiptoo (member-validity reconciliation, premium reconciliation — M-Pesa missing references/unallocated premiums, reimbursement tracking, quarterly reports), Daniel Mulinge (premium & commission reconciliation — most difficult).
6. **Comparative quotation/proposal creation** — **Kevin Osiga** (insurance broker): 2–3 hours per quote, manually combining underwriter quotes with different formats, benefits, sub-limits, exclusions; lead follow-ups in Excel; payment confirmation/POPs manual. Motor easier to automate than medical. → **Agreed to a free MVP for quotation comparison.**
7. **Onboarding integration** — Peter Thuku (integrating with underwriter's system), Lucy Odhiambo (document collection and loading gaps).
8. **Premium follow-ups** — Frank Serem, Lucy Odhiambo (outstanding premiums), Nelly Gichohi (chasing documents).

Clearest offer shapes emerging: comparative quotation/proposal generator, automated renewal reminder sequence (2mo/1mo/1wk/3d), document-chasing tracker, submission-info collector.

---

## 7. Current progress

- **45 conversations logged** in the reply log; 31+ have replied with identified pains.
- **6 pending responses awaiting reply** (as of 2026-10-23): Kahumakati Vivian (intro request for brokerage owner), Brenda Mutea (booking confirmation/call), Martin Ayallo (booking confirmation/call), Charles Chidakwa (direct-broking answer + call), Josephine Wanjiru (signed-doc frequency/count), Simba Takawira (said he'd respond).
- **Strongest broker leads:**
  - **Kevin Osiga** — insurance broker, agreed to free MVP for quotation comparison (medical/motor), awaiting build + feedback.
  - **Simon Karugu** — Founder & CEO, KARISEL INSURANCE AGENCY; discovery call requested, awaiting reply.
  - **Peter Thuku (DipCII, YIPP)** — renewal follow-up manual + onboarding integration; awaiting discovery-call reply.
  - **Daisy Ndiya** (AIIK) — document chasing; discovery call requested, awaiting reply.
- **Completed call:** Darlington Munhuwani (retired CEO, business consultant) Oct 22 via Teams — not a brokerage prospect, but shared policy-admin (~60% of broker time), premium reconciliation (M-Pesa), claims-doc-chasing, fragmented-touch-point pains; offered intros to Minet COO and Ernest Wakhata (recommended starting with Ernest since Minet is already automating). Not a paid prospect.
- **Not brokerage / low priority:** underwriters, reinsurance pros, claims analysts at insurers (Britam, GA Insurance, SanlamAllianz, Heritage, Tausi, Africa Re, J.B. Boda, etc.) — useful pain data but not the target niche.
- **Closed:** Keryl Kelonye (insurance broker, medical) — has own tool (BimaSasa), no challenges; Clive Chibanda (captives, not brokerage); Jedidah Cherono (not broker space).

---

## 8. Constraints (must not be relaxed)

- No cold outreach until after **1–2 paid proof clients** (deferred; high quit rate, needs 4+ months runway).
- No SaaS / custom code / employees / paid ads until after proof + revenue.
- Capital-constrained (Kenya/Nairobi); wants decisions, not menus; real timelines, not encouragement.
- **Must verify** ability to receive payment (Stripe/USD equivalent) from Kenya, or price in local currency (audit condition #2).
- **20-person warm-contact trust map** required before Stage 4 (audit condition #1).
- Treat all revenue figures except Liam Ottley's $1,000 Stripe proof as directional; measure own conversion (audit condition #3).
- Discovery first, pitch never on the first call. Testimonial/referral only after delivered proof.

---

## 9. Pricing (from the research corpus)

- First client: **$1,000 case-study rate** (discounted from $2,000–$3,000 typical) — Liam Ottley's actual first-client payment, Stripe-dashboard proven.
- Typical chatbot project: **$2,000–$3,000** (non-discounted).
- Beginner Cost Plus: dev rate **$30–$50/hr** × estimated hours × markup (start 2× → scale 6×–7×); 50% upfront / 50% on completion for projects under $20K–$30K.
- Maintenance/retainer: **$300–$1,000/mo** per client; retainer target **$3,000–$8,000/mo** once 10–20 automations (single-source forward claim, unverified).
- Audits: **$5K–$15K** for sub-100-person businesses (Eliot Prince).
- Price on value/ROI (10× rule) once proof exists; anchor to what the problem costs, not what AI can do.

**Evidence quality caveat:** only Liam Ottley's $1,000 Stripe payment is documented proof; every other revenue figure in the corpus is self-reported/unverified.

---

## 10. Existing Fiverr-related notes

**There are no Fiverr gig notes or Fiverr strategy notes belonging to Peter/Kim in this folder.** The only Fiverr artifact is a browser snapshot (`.playwright-mcp/page-2026-10-23T19-03-42-605Z.yml`, captured 2026-10-23) of Fiverr's **Automations & Workflows** category page (`fiverr.com/categories/programming-tech/software-development/automations-workflows`) — competitive/marketplace intel, not Peter's own plans. Relevant details from it:

- Category average rating: **4.9/5** based on approx. 5K reviews in the category.
- Category FAQ states Automations & Workflows services on Fiverr **typically range from $120 to $140** (varies by experience, complexity, deliverables).
- Example gigs seen on page 1:
  - `tife_flows` — "I will n8n automation n8n ai automation n8n workflow automation n8n ai agent automation" — **From $10**, 4.7★ (13 reviews).
  - `devmannan` — "I will be generative ai ml llm ai agent ai chatbot python and full stack developer" — **From $100**, 5.0★ (12 reviews), offers video consultations.
- Typical turnaround: a few days to a few weeks.
- Buyer-facing skills listed: Python/JavaScript/SQL; Zapier, Integromat (Make), Microsoft Power Automate; process mapping; workflow analysis; tool selection; customization; testing & optimization.
- Trust signals buyers expect: NDAs, secure/encrypted communication, GDPR compliance.

Implication for Fiverr gig positioning: the category is commoditized at the low end ($10–$140 typical per Fiverr's own FAQ), while Peter's playbook pricing ($1,000 case-study / $2,000–$3,000 project) is positioned far above Fiverr commoditized automation gigs — consistent with the done-for-you, outcome-based, warm-network model rather than competing on Fiverr price. Fiverr is mentioned in the broader research only as one of several acquisition channels (Nicole McCain #63 lists BNI/Alignable/Fiverr/Upwork/local orgs), but the playbook explicitly defers cold-outreach/marketplace acquisition until after 1–2 paid proof clients.

---

## 11. Key facts for Fiverr gig positioning (summary)

- Peter's model is **done-for-you service at $1,000–$3,000/project**, not low-ticket freelance task work — Fiverr's Automations & Workflows category averages $120–$140 per its own FAQ, so Fiverr would undercut the playbook's pricing if used as the primary channel.
- Differentiators available: insurance-broker niche specialization (renewal sequences, document chasing, quotation comparison), outcome-based pricing (hours saved, errors reduced), done-for-you delivery with handover to the client's own account, maintenance retainers ($300–$1,000/mo).
- Tech differentiator vs. typical Fiverr automation gigs: Botpress + Stack AI chatbot with KB fallback loop, conversion-event push after every answer, client-account transfer model.
- Fiverr is not part of the current execution plan (cold/marketplace outreach deferred until after proof); if used later, it should be for lead flow only, not as the pricing anchor.
