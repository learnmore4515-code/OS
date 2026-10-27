# LeoPisha Prioritized Roadmap — Phase 8

**Date:** 2026-10-27  
**Basis:** Phases 1–7 (current-state audit, competitive intelligence, positioning, information architecture, business model, SEO strategy).  
**Estimation convention:** Effort = person-days for one practitioner (the founder). Ongoing cost = monthly. No traffic or revenue forecasts are invented; estimates use explicit assumptions. Success measures are observable behaviors, not fabricated numbers.

---

## Tier classification

### Tier 1 — Immediate foundations (high impact, minimal cost, build now)

| # | Recommendation | User value | Strategic impact | Effort | Ongoing cost | Dependencies | Risks | Success measure |
|---|---|---|---|---|---|---|---|---|
| T1-1 | Restore LeoPisha source from git to working tree; verify build/lint/type-check pass | Restores the deployable site | Enables all future work | 1 day | $0 (existing Vercel) | Git access | None | `npm run build` and `npm run type-check` pass locally |
| T1-2 | Fix homepage: replace generic non-case-study cards with problem-focused content or honest trust bar | Visitors see real problems, not fabricated proof | Credibility | 1 day | $0 | None | None | Homepage renders without fake case studies |
| T1-3 | Fix footer social links (real profiles or remove icons) | No broken/trust-eroding links | Credibility | 0.5 day | $0 | Decide which profiles are real | None | Footer links resolve or icons removed |
| T1-4 | Refine service-page copy for insurance specificity (reduce generic "businesses" language) | Clearer niche fit | Differentiation | 1 day | $0 | None | None | Service pages name insurance workflows explicitly |
| T1-5 | Confirm mobile rendering + measure Core Web Vitals | Confirms baseline performance | SEO/UX foundation | 0.5 day | $0 | None | None | Mobile layout checked; CWV numbers recorded |
| T1-6 | Add BreadcrumbList schema to all service/resource pages (extend existing pattern) | Better search result presentation | SEO | 0.5 day | $0 | None | None | Schema valid on all pages |
| T1-7 | Publish 2–3 new insurance-specific resource guides (claims, underwriting, renewals) | Useful content for visitors not ready to buy | SEO authority | 3 days | $0 | Writing capacity | None | 3 guides live, internally linked |
| T1-8 | Confirm Search Console access; record baseline branded impressions | Measurable SEO baseline | Measurement | 0.5 day | $0 | Search Console access | Access not granted | Baseline recorded or limitation noted |

**Tier 1 total effort:** ~8.5 person-days. All reversible, no production DNS/infrastructure changes.

---

### Tier 2 — Differentiating assets (build after Tier 1 live)

| # | Recommendation | User value | Strategic impact | Effort | Ongoing cost | Dependencies | Risks | Success measure |
|---|---|---|---|---|---|---|---|---|
| T2-1 | Free automation-readiness assessment (lightweight scored questionnaire) | Low-friction first value for non-buyers | Lead gen; differentiation | 3–5 days | ~$0/month (existing stack) | T1 complete | Tool must not collect/store personal data (DPA) | Tool works; visitors complete it; some book diagnosis |
| T2-2 | Public sanitized n8n template library (claims intake, renewal reminders, doc follow-up) | Demonstrates competence; shareable/linkable | Distribution; SEO | 3–5 days | ~$0/month | Sanitized templates ready (no customer data/secrets) | Publishing customer data by mistake | Templates live; downloads/links occur |
| T2-3 | First 1–2 permissioned, quantified case studies | Real proof of work | Trust; conversion | 2–4 days | $0 | Real clients + written permission | Fabrication risk; no clients yet | Case studies live with named clients + metrics |
| T2-4 | Newsletter signup + occasional email (only if content cadence is sustainable) | Repeat engagement | Recurring audience | 1–2 days | ~$0–$20/month | Something to send regularly | Empty newsletter harms credibility | Signup form works; first issue sent only if cadence real |

**Tier 2 total effort:** ~9–16 person-days. Depends on Tier 1 being live and (for case studies) on real customer validation.

---

### Tier 3 — Audience and ecosystem (experiments only after demand signals)

| # | Recommendation | User value | Strategic impact | Effort | Ongoing cost | Dependencies | Risks | Success measure |
|---|---|---|---|---|---|---|---|---|
| T3-1 | Expert/partner directory pilot (simple page, no commissions) | Referral channel | Services channel | 2–3 days | ~$0/month | T2 case studies live | Low uptake | One referral generated |
| T3-2 | Community on an existing platform (LinkedIn/WhatsApp group), not custom forum | Repeat engagement | Ecosystem | 0.5–1 day setup | ~$0/month | Audience asking for it | Ghost town if premature | Real conversation occurs |
| T3-3 | Partner with complementary Kenyan service providers (accountants, brokers) | Co-published guides; referrals | Distribution | 2–4 days ongoing | $0 | Partner outreach | None | One co-published asset or referral |

**Tier 3 total effort:** ~4.5–8 person-days (plus ongoing outreach). Depends on Tier 2 proving demand.

---

### Tier 4 — Advanced capabilities (only with evidence/funding; not now)

| # | Recommendation | Why deferred |
|---|---|---|
| T4-1 | Custom forum / member database / leaderboard | Master prompt: do not build without evidence of demand |
| T4-2 | SaaS product or subscription | Business must remain consultancy-first |
| T4-3 | Paid digital products / certification | Only after free templates prove demand |
| T4-4 | Analyst recognition chasing (Gartner etc.) | Not reproducible at this stage |
| T4-5 | Massive integration ecosystem | Platform-level play, not consultancy |

---

## 30-day implementation plan (Days 1–30)

All Tier 1. No customer validation, funding, or external partnerships required.

| Week | Work | Output |
|---|---|---|
| Week 1 | Restore source from git; verify build/lint/type-check; fix homepage + footer social links | Site builds locally; homepage credible; footer fixed |
| Week 2 | Refine service-page copy for insurance specificity; confirm mobile rendering + CWV baseline | Insurance-specific service pages; performance baseline recorded |
| Week 3 | Add BreadcrumbList schema to all pages; publish 2–3 new resource guides | Schema valid; resource library has 3–4 guides |
| Week 4 | Confirm Search Console baseline; review all changes; prepare Tier 2 scoping | SEO baseline recorded; Tier 2 scope defined |

**30-day done criteria:** Source restored and builds; homepage/footer/copy fixed; 3–4 resource guides live; schema valid; SEO baseline recorded; Tier 2 scoped. Nothing deployed to production without approval.

---

## 90-day roadmap (Days 31–90)

| Phase | Days | Work | Depends on |
|---|---|---|---|
| Tier 1 completion + review | 31–45 | Finish any Tier 1 leftovers; review against positioning | Tier 1 |
| Tier 2: assessment tool | 46–60 | Build automation-readiness assessment | T1 complete |
| Tier 2: template library | 61–75 | Publish sanitized n8n templates | Templates sanitized |
| Tier 2: case studies | 61–90 | Secure permission; publish 1–2 quantified case studies | Real clients + permission |
| Tier 2: newsletter | 76–90 | Signup form only if cadence is sustainable | Content ready |

**90-day done criteria:** Tiers 1–2 live (or clearly scoped with owners); assessment tool works; templates live without customer data; case studies live only with real permission; no custom forum, no SaaS, no subscriptions built.

---

## Work explicitly NOT in the 30/90-day plan

- Custom forum, member database, leaderboard, social network (Tier 4 / never without demand).
- SaaS product or subscription (Tier 4 / never).
- DNS, production infrastructure, credentials, billing, external account changes (prohibited without permission).
- Paid services beyond what's already in the business model.
- Fabricated case studies, testimonials, or metrics.
- Deployment to production without approval.

---

## Risks & mitigations (roadmap-level)

| Risk | Mitigation |
|---|---|
| No permissioned clients yet → case studies slip | Keep honest "not public yet" stance; don't fabricate |
| Writing capacity limited → guides slip | Start with 1 guide per month; quality over quantity |
| DPA/data risk in assessment tool | Tool is ephemeral, no personal-data storage; Kenya DPA-aligned |
| Publishing customer data in templates | Sanitize all templates; review before publish |
| Search Console access not granted | Record limitation; proceed with observable on-page SEO |

---

## Approval required before

- Any deployment to production.
- Any change to DNS, hosting, domain, credentials, or billing.
- Publishing any case study or testimonial (requires customer permission).
- Any paid service or tool beyond the existing stack.

---

## Next step

Phase 9: implementation — begin Tier 1 (restore source, verify build, fix homepage/footer/copy) upon user approval.
