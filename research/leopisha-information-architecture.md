# LeoPisha Information Architecture — Phase 4

**Date:** 2026-10-27  
**Basis:** Phase 1 current-state audit, Phase 2 competitive intelligence, Phase 3 strategic positioning (hybrid: specialist insurance consultancy + free resources + productized implementation).  
**Status:** Proposed specification, not yet implemented. No production changes made.

---

## Design constraints (from positioning)

- **Consultancy revenue stays central.** Every page must either sell or create demand for a paid engagement (Diagnosis → Build → Hand over).
- **Free assets are lead generators, not the product.** Tools/templates/guides exist to demonstrate competence and capture visitors not ready to book.
- **Insurance is the anchor domain.** Copy should not say "businesses" generically when the work is insurance-specific.
- **No fabrication.** Case studies and testimonials appear only with real, permissioned clients. Until then, the site stays honest about its stage.
- **Navigation stays simple.** No mega-menus, no forum, no member dashboard, no SaaS-style pricing tiers.
- **Build on existing stack.** Next.js 15, Tailwind v4, TypeScript, same design system (black/gold premium, Cormorant + Inter, liquid glass).

---

## Sitemap (proposed)

### Tier 1 — Launch (build now)

| URL | Purpose |
|---|---|
| `/` | Home: positioning statement, problem recognition, engagement model, primary booking CTA |
| `/services` | Services index: diagnosis + productized implementation packages |
| `/services/automation-diagnosis` | Paid diagnosis engagement detail (entry point) |
| `/services/claims-automation` | Claims automation service detail |
| `/services/underwriting-automation` | Underwriting automation service detail |
| `/services/customer-operations-automation` | Customer ops automation service detail |
| `/services/missing-documents-automation` | Missing document & KYC reminder automation |
| `/services/insurance-renewal-automation` | Insurance renewal reminder automation |
| `/services/managed-automation-operations` | Managed operations / retainer |
| `/services/fraud-detection-prevention` | Fraud detection & prevention |
| `/about` | Who we are, domain, process, honesty about stage |
| `/resources` | Resource library index (start: 3–5 guides) |
| `/resources/workflow-automation-small-business` | Existing guide (keep, improve) |
| `/book` | Redirect to Calendly (existing) — keep as primary conversion |

### Tier 2 — Build after Tier 1 is live and validated

| URL | Purpose | Depends on |
|---|---|---|
| `/case-studies` | Permissioned, quantified case studies | First 1–2 real client case studies with written permission |
| `/case-studies/[slug]` | Case study detail | Same |
| `/tools` | Free tools index (calculator/assessment) | One working free tool built |
| `/tools/[slug]` | Individual tool detail | Same |
| `/templates` | Public n8n template library | Sanitized templates ready to publish |
| `/templates/[slug]` | Template detail + download | Same |
| `/blog` | Ongoing articles | Capacity to publish regularly |

### Not recommended (explicitly out of scope for now)

- `/community`, `/forum`, `/members` — custom community platform; no evidence of demand yet.
- `/pricing` as SaaS-style tiers — consultancy, not software; pricing is scoping-dependent.
- `/partners`, `/affiliates` — expert-directory pilot can live as a section of `/about` or a simple page, not a full program yet.
- SaaS product or subscription routes.

---

## Navigation specification

### Header (all tiers)
| Label | Link | Notes |
|---|---|---|
| Leo Pisha (logo) | `/` | Home |
| Services | `/services` | Dropdown or single page; include "Automation Diagnosis" as first item |
| Resources | `/resources` | Guide library |
| About | `/about` | Firm, domain, process |
| Book a consultation | `https://calendly.com/leopishaagency/new-meeting` | Primary CTA, external |

**Mobile:** same links in a hamburger menu; Calendly CTA as a button.

**Do not add** a "Tools" or "Templates" header item until Tier 2 is live; adding empty sections harms credibility.

### Footer
| Column | Links |
|---|---|
| Company | About, Services, Resources, Contact |
| Resources | Existing guide + (later) new guides, tools, templates |
| Connect | Email (mailto:hello@leopisha.com), Calendly, (later) real social profiles |
| Legal | Privacy, Data Protection (reference Kenyan DPA) |

**Fix:** Replace `#` placeholder social links with real profiles or remove the icons.

### Internal linking strategy
- Every service page links to `/services/automation-diagnosis` as the entry point ("Start here").
- Every resource page links to `/services/automation-diagnosis` ("Not sure where to start?").
- Homepage links to `/services`, `/resources`, `/about`, and Calendly.
- About page links to Calendly and `/services`.
- No orphan pages: every page reachable from header/footer/homepage.

---

## Page specifications (implementation-ready)

### 1. Home (`/`)
**Target audience:** Insurance business owners/operators in Kenya feeling manual drag; international insurance prospects evaluating fit.  
**User intent:** "Can this firm fix my claims/underwriting/customer-response workflow, and is it credible?"  
**Job to be done:** Decide whether to book a consultation.  
**Sections (in order):** Hero (problem + value prop + CTA), AuthorityBar (bottlenecks + who it's for), Process (Diagnosis → Build → Hand over), Focus areas (claims/underwriting/customer ops), Trust bar (honest stage statement + "case studies coming as clients permit"), Final CTA (booking).  
**Core content:** Positioning statement; the three engagement steps; insurance-specific problem language; Calendly CTA repeated.  
**Evidence:** Honest stage statement; existing design system; no fabricated testimonials.  
**Internal links:** `/services`, `/services/automation-diagnosis`, `/resources`, `/about`, Calendly.  
**Primary CTA:** Book a consultation (Calendly). Secondary: "See how I work" (Process anchor).  
**SEO purpose:** Homepage keyword cluster — insurance automation consultant Kenya, claims automation Kenya, underwriting automation Kenya.  
**Launch vs later:** Launch.

### 2. Services index (`/services`)
**Target audience:** Visitors comparing service options.  
**User intent:** "What do you offer, and which one fits my situation?"  
**Job to be done:** Choose a service or start with diagnosis.  
**Core content:** Service cards (8 existing services), each with problem, what we automate, deliverables, timeline; "Zero-Risk Pilot" CTA card; "Not sure where to start?" → Automation Diagnosis.  
**Evidence:** Service descriptions already exist; keep problem-based framing.  
**Internal links:** each service detail page; `/services/automation-diagnosis`; `/case-studies` (Tier 2).  
**Primary CTA:** Book a Discovery Call (Calendly).  
**SEO purpose:** Service-category keywords; canonical `/services`.  
**Launch vs later:** Launch (already exists; refine).

### 3. Service detail pages (`/services/[slug]`)
**Target audience:** Visitors researching a specific problem.  
**User intent:** "How do you handle claims automation / underwriting automation / renewal automation specifically?"  
**Job to be done:** Understand the approach and decide to book diagnosis.  
**Core content:** Problem, what we automate, step-by-step workflow, outcomes, FAQ, schema.org Service JSON-LD, breadcrumb.  
**Evidence:** Existing service pages already have problem/automation/outcomes/FAQ structure; keep.  
**Internal links:** `/services`, `/services/automation-diagnosis`, `/about`, Calendly.  
**Primary CTA:** Book a Discovery Call.  
**SEO purpose:** Long-tail service keywords (claims automation Kenya, underwriting automation Kenya, etc.).  
**Launch vs later:** Launch (already exist; refine copy for insurance specificity).

### 4. Automation Diagnosis (`/services/automation-diagnosis`)
**Target audience:** Visitors not sure where to start.  
**User intent:** "What does a diagnosis cost, what do I get, how long?"  
**Job to be done:** Book the diagnosis engagement.  
**Core content:** What diagnosis is, deliverables (process audit report, ROI model, roadmap, quick wins), timeline (1–2 weeks), "you decide what to build," pricing note (scoping-dependent, not a SaaS tier), FAQ, CTA.  
**Evidence:** Existing ServicesPage already frames diagnosis as the entry point; strengthen.  
**Internal links:** `/services`, `/about`, Calendly.  
**Primary CTA:** Book a Discovery Call.  
**SEO purpose:** "automation diagnosis," "workflow diagnosis Kenya" keywords.  
**Launch vs later:** Launch (entry point to paid work).

### 5. About (`/about`)
**Target audience:** Visitors checking credibility.  
**User intent:** "Who is LeoPisha, where are they based, can I trust them with my insurance data?"  
**Job to be done:** Confirm credibility and domain fit.  
**Core content:** Firm story, insurance domain (Kenya), process (Diagnosis → Build → Hand over), principles, honesty about stage ("first public case studies in progress"), Data Protection Act awareness, contact email.  
**Evidence:** Existing AboutPage has principles; add domain + stage honesty + DPA reference.  
**Internal links:** `/services`, `/resources`, Calendly.  
**Primary CTA:** Book a consultation.  
**SEO purpose:** "about LeoPisha," branded search.  
**Launch vs later:** Launch (refine existing).

### 6. Resources index (`/resources`)
**Target audience:** Visitors seeking guidance, not ready to buy.  
**User intent:** "What can I learn about workflow automation for my insurance business?"  
**Job to be done:** Find a useful guide; join newsletter (later).  
**Core content:** 3–5 problem-organized guides (start small), each with audience, intent, one-line summary, link; "Where to start" box → diagnosis.  
**Evidence:** Existing `/resources` has one guide; expand to a small library, not hundreds of articles.  
**Internal links:** each guide; `/services/automation-diagnosis`; Calendly.  
**Primary CTA:** Read a guide; secondary: Book a Discovery Call.  
**SEO purpose:** Informational keywords (workflow automation Kenya, small business automation Kenya).  
**Launch vs later:** Launch (with 1 existing guide + 2–3 new).

### 7. Resource guide (`/resources/[slug]`)
**Target audience:** Reader of a specific guide.  
**User intent:** "How do I automate lead follow-ups / document collection / renewals?"  
**Job to be done:** Learn; consider diagnosis.  
**Core content:** Problem/solution structure, when to automate vs stay manual, implementation considerations, privacy/DPA note, "How LeoPisha approaches it," CTA.  
**Evidence:** Existing small-business guide is a strong template; replicate structure.  
**Internal links:** `/resources`, `/services/automation-diagnosis`, related guides, Calendly.  
**Primary CTA:** Book a Discovery Call / Learn About Diagnosis.  
**SEO purpose:** Long-tail informational keywords.  
**Launch vs later:** Launch (1 existing + 2–3 new).

### 8. Book (`/book`)
**Target audience:** Visitors ready to talk.  
**User intent:** "Book a call with LeoPisha."  
**Job to be done:** Convert to Calendly.  
**Core content:** Redirect to Calendly (existing behavior).  
**Launch vs later:** Launch (keep existing redirect).

---

## Tier 2 page specs (brief — build only after Tier 1 validated)

### Case studies (`/case-studies`, `/case-studies/[slug]`)
**Condition:** Only with real, permissioned clients; quantified outcomes.  
**Content:** Client context (named, with permission), workflow problem, automation intervention, measurable shift, quote.  
**CTA:** Book a consultation.

### Tools (`/tools`, `/tools/[slug]`)
**Condition:** One working free tool first (e.g., automation-readiness assessment or claims-cost estimator).  
**Content:** Tool, result, interpretation, "book diagnosis to act on this" CTA.  
**Privacy:** No customer data stored; inputs ephemeral; DPA-aligned.

### Templates (`/templates`, `/templates/[slug]`)
**Condition:** Sanitized n8n templates only; no customer data or secrets.  
**Content:** Template description, what it automates, download/import instructions, disclaimer.

### Blog (`/blog`)
**Condition:** Only if there is capacity to publish regularly; otherwise skip.  
**Content:** Original practical knowledge, not AI-generated generic articles.

---

## SEO purpose summary (per page cluster)

| Cluster | Pages | Keyword intent | Primary conversion |
|---|---|---|---|
| Commercial (services) | `/services`, `/services/[slug]` | claims automation Kenya, underwriting automation Kenya, insurance automation consultant Kenya | Diagnosis booking |
| Commercial (diagnosis) | `/services/automation-diagnosis` | automation diagnosis, workflow diagnosis | Diagnosis booking |
| Informational (resources) | `/resources`, `/resources/[slug]` | workflow automation Kenya, small business automation Kenya | Guide read → diagnosis |
| Branded | `/about`, `/` | LeoPisha, leopisha.co.ke | Booking |
| Trust (case studies, Tier 2) | `/case-studies` | insurance automation case study | Booking |

---

## What to preserve from existing site

- Canonical URLs, schema.org (Organization/Service/BreadcrumbList), sitemap.xml, robots.txt, Open Graph, Google verification — keep and extend to new pages.
- Design system (black/gold, Cormorant + Inter, liquid glass, scroll storytelling, prefers-reduced-motion) — keep.
- Engagement model (Diagnosis → Build → Hand over, 1–2 weeks, client owns IP) — keep.
- Honest "no public case studies yet" stance — keep until real cases exist.
- Existing service pages' problem/automation/outcomes/FAQ structure — keep and refine.

## What to change

- Homepage: replace generic "FeaturedCaseStudies" cards (not real cases) with problem-focused content or an honest trust bar.
- Copy: replace generic "businesses" with insurance-specific language where the work is insurance-specific.
- Footer: fix `#` social links (real profiles or remove).
- Resources: expand from 1 guide to a small library; add internal links.
- Conversion: add a secondary low-commitment capture (newsletter + one free tool) in Tier 2, alongside Calendly.

---

## Next step

Phase 5: revenue model (`research/leopisha-business-model.md`), then Phase 6: brand + design direction (`research/leopisha-design-direction.md`), Phase 7: SEO strategy, Phase 8: prioritized roadmap, Phase 9: implementation.
