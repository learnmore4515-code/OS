# BrokerFlow AI — Independent Project Instructions

## Purpose
BrokerFlow AI is an AI-powered SaaS platform for Kenyan insurance brokers that solves two core problems:
1. **Chasing clients for missing documentation** (KYC docs, claim documents, onboarding paperwork)
2. **Reconciliation and reporting** (premium reconciliation, member validity, reimbursement tracking, quarterly reports, new business vs renewal comparisons)

## Mission
Build a solution that demonstrably improves document collection for Kenyan insurance brokers — not a service, but a product that solves the problem autonomously.

## Constraints
- **No coding yet.** Research first (7 phases), design second (Phase 5), MVP third (Phase 6), implementation last (Phase 7).
- **Service-first playbook does not apply here.** User explicitly wants an AI-powered SaaS product, not done-for-you service delivery.
- **Zero dilution of main agency folder.** This subfolder is independent with its own CLAUDE.md.
- **Kenya-first design.** WhatsApp, SMS, email, phone-call escalation, secure upload links, mobile-friendly portals. ODPC data protection compliance required.
- **Not basic.** Full platform vision: zero-touch document intake, multi-party alignment hub, intelligent reconciliation engine.

## Existing Artifacts to Reference (read-only, in parent agency folder)
- `../responses.md` — 28 discovery conversations with confirmed broker pains
- `../decisions/log.md` — Stage 4 playbook context, Darlington discovery call (Oct 22)
- `../CURRENT-RECOMMENDATION.md` — current business model and offer
- `../HANDOVER-quote-compare-mvp.md` — quote comparison MVP handover
- `../project builder/tools/quote_compare.html` — quote comparison MVP (~38KB single-file HTML)
- `../project builder/tools/quote_compare_example.md` — worked example
- `../tools/premium-reconciliation.html` — reconciliation UI pattern + design tokens
- `../workflow builder/insurance-broker-operations-hub.ts` — n8n ops hub patterns (Chain 4 document chasing)
- `../workflow builder/insurance-broker-demo/workflows/wb-01 through wb-07.ts` — demo workflows
- `../project builder/tools/quote_compare.html` — already-built MVP for Kevin Osiga

## Deliverables to Produce (A–K)
A. Evidence-backed problem analysis
B. Existing solutions and competitive landscape
C. Root-cause analysis
D. Kenya-specific operating requirements
E. International expansion considerations
F. Proposed end-to-end workflow
G. MVP requirements and acceptance tests
H. Recommended architecture
I. Estimated operating costs and dependencies
J. Pilot design and success metrics
K. Major risks and unresolved questions

## Research Phases
1. Investigate Kenyan insurance brokerage environment (IRA, AKI, ODPC, broker websites, vendors)
2. Identify why follow-ups fail (cause-and-effect analysis)
3. Design for Kenya first (WhatsApp, SMS, email, phone, upload links, portals — with cost estimates and ODPC compliance)
4. Consider international expansion
5. Design the actual end-to-end solution
6. Define a testable MVP with success metrics
7. Implementation architecture using existing project/tools

## Immediate Focus
Client follow-up for missing KYC and onboarding documentation. Do not assume automated reminders are the correct solution — investigate why the problem persists first.
