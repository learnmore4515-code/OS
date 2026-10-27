# LeoPisha SEO & Authority Strategy — Phase 7

**Date:** 2026-10-27  
**Basis:** Phase 1 audit (actual metadata/sitemap/robots/schema observed), Phase 2 competitive intelligence (how reference companies earn visibility), Phase 3 positioning.  
**Core rule:** Do not claim that adding many pages or articles will automatically produce rankings. Prioritize original, practical knowledge and tools that competitors cannot easily reproduce with generic AI content.

---

## 1. Technical SEO — current state (observed in Phase 1)

| Element | Status | Notes |
|---|---|---|
| Canonical URLs | ✅ Present on all pages | `https://www.leopisha.co.ke/` + per-page canonicals |
| Sitemap.xml | ✅ Present | 15 URLs, weekly/monthly changefreq, priorities set |
| Robots.txt | ✅ Present | `Allow: /`, sitemap reference |
| Schema.org | ✅ Present | Organization (with OfferCatalog), WebSite, Service, BreadcrumbList, BlogPosting |
| Open Graph / Twitter cards | ✅ Present | On all pages |
| Google Search Console verification | ✅ Present | `verification.google` in root layout |
| Locale | ✅ `en_KE` | Kenya-targeted |
| Meta robots | ✅ `index, follow` | |
| next.config image optimization | ✅ avif/webp | |
| Mobile | ⚠ Not verified | Responsive classes exist; mobile rendering not independently tested |
| Page speed / Core Web Vitals | ⚠ Not measured | GSAP animations present; needs measurement |
| Internal linking | ⚠ Partial | Header/footer link main pages; service pages link to diagnosis and case-studies |
| 404 / redirect handling | ⚠ Not verified | `/book` redirects to Calendly |

**Technical to-do:** Confirm mobile rendering, measure Core Web Vitals, verify no orphan pages, confirm sitemap stays current as pages are added. No structural migration needed — the foundation is sound.

---

## 2. Search intent & keyword opportunities (prioritized, achievable)

These are grounded in LeoPisha's actual domain (insurance automation, Kenya) and the reference-company finding that specific, quantified problem language wins.

### Commercial-intent keywords (priority 1 — conversion)

| Cluster | Example terms | Target page | Intent |
|---|---|---|---|
| Insurance automation consultant | insurance automation consultant Kenya, insurance workflow automation Kenya, insurance operations consultant Kenya | `/`, `/about`, `/services` | Hire a consultant |
| Claims automation | claims automation Kenya, claims processing automation, claims automation for insurers | `/services/claims-automation` | Automate claims |
| Underwriting automation | underwriting automation Kenya, underwriting automation for insurers | `/services/underwriting-automation` | Automate underwriting |
| Renewal automation | insurance renewal reminder automation, policy expiry automation | `/services/insurance-renewal-automation` | Reduce lapsed policies |
| Missing documents / KYC | missing document automation, KYC reminder automation, claims document follow-up | `/services/missing-documents-automation` | Stop chasing documents |
| Diagnosis | automation diagnosis, workflow diagnosis Kenya | `/services/automation-diagnosis` | Assess before building |

### Informational keywords (priority 2 — authority, top of funnel)

| Cluster | Example terms | Target page | Intent |
|---|---|---|---|
| Small business automation | workflow automation Kenya, small business automation Kenya, which workflows to automate | `/resources/workflow-automation-small-business`, `/resources` | Learn before buying |
| Insurance-specific operations | claims document collection Kenya, insurance follow-up automation, insurance reconciliation workflow | `/resources/[new guides]` | Solve a specific problem |

**Keyword discipline:** Target one primary keyword cluster per page. Do not create dozens of thin pages. Each page needs real content, not just a keyword stuffed into a template.

---

## 3. Helpful, original content (the authority engine)

Following the reference-company finding that education pillars (Make Academy, LangChain Academy, n8n docs/community) create repeat visits and topical authority:

### Content clusters (launch with 3–5 guides, not dozens)

| Cluster | Audience | Intent | Proposed content | Supporting resource | Conversion path |
|---|---|---|---|---|---|
| Claims workflow | Kenyan insurance ops | Reduce claim turnaround | "Claims processing automation for Kenyan insurers: FNOL to settlement" | Claims service page | Book diagnosis |
| Underwriting | Kenyan insurers/brokers | Faster quote-to-bind | "Underwriting automation for motor, property and SME lines" | Underwriting service page | Book diagnosis |
| Renewals | Kenyan insurers | Reduce lapsed policies | "Insurance renewal reminder automation: track expiry, improve retention" | Renewal service page | Book diagnosis |
| Small business | Kenyan small businesses (non-insurance) | Which workflows to automate | Existing: "Workflow Automation for Small Businesses in Kenya" | Automation Diagnosis | Book diagnosis |
| When to automate | Anyone considering automation | Decide build vs. manual | "When to automate and when to stay manual" | Small-business guide | Book diagnosis |

**Content rules:**
- Original practical knowledge only. No AI-generated generic articles.
- Each guide: problem, when to automate vs. stay manual, implementation considerations, privacy/Data Protection Act note, "How LeoPisha approaches it," CTA to diagnosis.
- Publish only as capacity allows. One good guide per month beats twelve thin ones.

---

## 4. Internal linking

Every page must be reachable and must link purposefully:

- Homepage → `/services`, `/services/automation-diagnosis`, `/resources`, `/about`, Calendly.
- `/services` → each service detail, `/services/automation-diagnosis` (entry point).
- Each service detail → `/services`, `/services/automation-diagnosis`, `/about`, Calendly.
- `/services/automation-diagnosis` → `/services`, `/about`, Calendly.
- `/resources` → each guide, `/services/automation-diagnosis`, Calendly.
- Each guide → `/resources`, `/services/automation-diagnosis`, related guides, Calendly.
- `/about` → `/services`, `/resources`, Calendly.
- No orphan pages. BreadcrumbList schema on service and resource pages (already implemented on some; extend to all).

**Anchor text:** Descriptive, keyword-relevant ("claims automation service," "automation diagnosis"), not "click here."

---

## 5. Industry-specific authority

LeoPisha's defensible edge is insurance domain depth + Kenya context. Authority content should lean into that, not generic AI:

- Reference the Kenyan Data Protection Act 2019 in privacy/data handling sections (already done in the small-business guide — extend).
- Reference motor, property, and SME insurance lines (already in copy).
- Publish process diagrams (before/after) for insurance workflows — original, not generic.
- Publish quantified, named case studies as clients permit (Phase 3: only real, permissioned clients).

This is the kind of original knowledge competitors cannot reproduce by generating generic articles — directly addressing the master prompt's guidance.

---

## 6. External references and backlinks

Reference companies earn backlinks through: templates, tools, original data/research, open-source examples, and community contributions. LeoPisha's linkable assets:

- Public n8n templates (sanitized) — other automation practitioners may link.
- Free automation-readiness assessment — linkable tool.
- Original guides with Kenya/insurance specificity — niche sites may cite.
- Case studies with permission — clients may link from their own sites.

**Backlink strategy (realistic, no purchased links):**
- Publish templates and tools that are genuinely useful → natural links.
- Contribute to existing communities (n8n community, Make community, LinkedIn insurance/automation groups) — participate, don't spam.
- Partner with complementary Kenyan service providers (accountants, brokers, insurers' tech partners) — co-published guides.
- Do not buy links, do not guest-post on low-quality sites, do not use link exchanges.

---

## 7. Branded search and reputation

- Branded term: "LeoPisha" / "leopisha.co.ke". Homepage and About should rank for these.
- Domain `leopisha.co.ke` is the canonical brand. Keep `www` canonical consistent.
- Google verification already in place; use Search Console to monitor branded impressions and indexing (read-only, if access available).
- Instagram `leopisha_` referenced in schema — confirm it's a real, maintained profile or remove (Phase 1 flagged placeholder social links).
- No reputation-management claims beyond what's verifiable.

---

## 8. Distribution beyond search engines

- **LinkedIn:** Founder's Upwork/freelancer profile exists (Phase 1 files). Share guides and case studies there; it's a real distribution channel for B2B services.
- **WhatsApp:** Dominant business channel in Kenya; customer-operations automation (WhatsApp bot) is a service — demonstrate via the service page, not a consumer WhatsApp broadcast list.
- **Email/newsletter:** Only if there is a capture mechanism (newsletter signup). Deferred until there's something to send regularly.
- **n8n / Make communities:** Share templates and answer questions — builds referral traffic and positions LeoPisha as a practitioner.
- **Direct outreach / Calendly:** Existing primary conversion; keep.

Do not promise virality. Design for usefulness and repeat engagement.

---

## 9. Conversion optimization (SEO → business)

Each SEO-targeted page ends with a clear next step:

- Commercial pages → "Book a Discovery Call" (Calendly) + "Learn About Diagnosis."
- Informational guides → "Not sure where to start? Begin with an Automation Diagnosis."
- Homepage → primary Calendly CTA + secondary "See how I work."

**Measurement (assumptions only, no fabricated forecasts):**
- Track: organic impressions/clicks (Search Console), diagnosis booking rate from organic, guide-to-diagnosis conversion.
- Do not invent traffic or revenue targets.

---

## Prioritized SEO actions

| Priority | Action | Effort | Depends on |
|---|---|---|---|
| 1 | Keep technical foundation (canonical, schema, sitemap, robots, OG) as pages are added | Low | None |
| 2 | Confirm mobile rendering + measure Core Web Vitals | Low | None |
| 3 | Publish 2–3 new insurance-specific guides (claims, underwriting, renewals) with internal links | Medium | Writing capacity |
| 4 | Add BreadcrumbList schema to all service/resource pages | Low | None |
| 5 | Build free automation-readiness assessment (linkable tool) | Medium | Tier 2 build |
| 6 | Publish sanitized n8n templates | Medium | Sanitized templates ready |
| 7 | Publish first permissioned, quantified case studies | Medium | Real clients + permission |
| 8 | Monitor branded search + indexing via Search Console | Low | Search Console access |

---

## What to explicitly avoid

- Publishing many thin/ AI-generated articles to "increase page count."
- Buying backlinks or link exchanges.
- Keyword-stuffing service pages.
- Claiming rankings, traffic, or conversion numbers that aren't measured.
- Creating a blog without capacity to maintain it.

---

## Next step

Phase 8: prioritized 30-day + 90-day roadmap, then Phase 9: implementation.
