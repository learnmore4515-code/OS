# LeoPisha Current-State Audit — Phase 1

**Date:** 2026-10-27  
**Source of truth:** Git history at `C:\Users\profe\Downloads\OS\leopisha` (branch `main`, HEAD `cd784e0`). The working tree is currently empty (all source files deleted from disk, but intact in git).  
**Live site:** https://www.leopisha.co.ke (Vercel project `prj_s3gWI514lS7hpnJgGAaH1k8Vu2Ju`, org `team_UgK6XPnDMsIqUXCqHy63sieH`)  
**Method:** Inspected all tracked source files in git HEAD. Did not modify production, DNS, deployment settings, credentials, or business-critical workflows.

---

## 1. What exists (inventory from git HEAD)

### Tech stack
- **Framework:** Next.js 15 (App Router), React 19, TypeScript
- **Styling:** Tailwind CSS v4, custom design tokens in `app/globals.css`
- **Animations:** GSAP (scroll-triggered reveal animations, `prefers-reduced-motion` respected)
- **Forms/email:** react-hook-form, zod, nodemailer, googleapis
- **Deployment:** Vercel (production). `package.json` scripts: `dev`, `build`, `start`, `lint`, `type-check`, `test`
- **Domain:** `www.leopisha.co.ke`; canonical URLs throughout; Google Search Console verification present (`ngWTpi7kVz8a18rC-EC0IXPpUEWa8lJ_dsD0V666Hr8`)

### Pages and routes
| Route | File | Purpose |
|---|---|---|
| `/` | `app/page.tsx` | Homepage: Hero, AuthorityBar, FeaturedCaseStudies, Process, Testimonials, FinalCTA |
| `/about` | `app/about/page.tsx` | About page (principles + "Why this exists") |
| `/book` | `app/book/page.tsx` | Redirects to Calendly (`calendly.com/leopishaagency/new-meeting`) |
| `/services` | `app/services/page.tsx` | Services index |
| `/services/automation-diagnosis` | service page | Paid diagnosis engagement |
| `/services/claims-automation` | service page | Claims processing automation |
| `/services/underwriting-automation` | service page | Underwriting automation |
| `/services/customer-operations-automation` | service page | Customer ops automation |
| `/services/fraud-detection-prevention` | service page | Fraud detection & prevention |
| `/services/managed-automation-operations` | service page | Managed/retainer operations |
| `/services/missing-documents-automation` | service page | Missing document & KYC reminder automation |
| `/services/insurance-renewal-automation` | service page | Insurance renewal reminder automation |
| `/services/kenya` | service page | Kenya-positioned service page |
| `/case-studies` | `app/case-studies/page.tsx` | Case studies index (empty — no public case studies yet) |
| `/case-studies/[slug]` | dynamic route | Case study detail (no data populated) |
| `/resources` | `app/resources/page.tsx` | Resources index |
| `/resources/workflow-automation-small-business` | guide page | One practical guide article |

### Components
- **Home:** `Hero.tsx`, `AuthorityBar.tsx`, `Process.tsx`, `FeaturedCaseStudies.tsx`, `Testimonials.tsx`, `FinalCTA.tsx`
- **Layout:** `Header.tsx` (nav: Focus areas, Delivery process, Services, About; Calendly CTA), `Footer.tsx` (Company / Resources / Connect columns, social icons to `#` placeholders)
- **UI:** `Button.tsx`, `Card.tsx`, `Input.tsx`
- **Case studies:** `CaseStudiesIndex.tsx`, `CaseStudyDetail.tsx`
- **About:** `AboutPage.tsx`
- **Services:** `ServicesPage.tsx`

### Data
- `lib/case-studies.ts`: `caseStudies` array is **empty** (`[]`). The index page honestly states "Client case studies are not public yet."
- `lib/utils.ts`: `cn`, `formatCurrency` (KES), `formatNumber`, `debounce`, `throttle`

### Design system
- `design-system/leopisha/MASTER.md`: "Luxury/Premium Brand" — black `#1C1917` / gold `#A16207` accent, Cormorant headings + Montserrat/Inter body, liquid-glass style, scroll-triggered storytelling pattern. Anti-patterns listed (no emoji icons, no cheap visuals, 4.5:1 contrast, prefers-reduced-motion, etc.)
- `app/globals.css`: Custom theme tokens (primary `#151517`, accent `#A67C36`, background `#F5F2EC`), type scale up to 6xl, spacing scale.

### SEO / technical
- `public/sitemap.xml`: 15 URLs (home, about, services, case-studies, 8 service pages, resources, small-business guide). Weekly/monthly changefreq.
- `public/robots.txt`: `Allow: /`, sitemap reference.
- `next.config.ts`: image formats avif/webp, remotePatterns `**`.
- Schema.org JSON-LD: Organization (with OfferCatalog of 8 services), WebSite, Service, BreadcrumbList, BlogPosting on the guide page.
- Open Graph + Twitter cards on all pages.
- `verification.google` present in root layout.

### Assets
- `public/hero-poster.jpg`, `public/hero-video.mp4`, `public/grid-pattern.svg`, `public/favicon.ico`
- `public/case-studies/`: 3 poster images + 3 preview mp4s (health-customer-ops, kenya-life-claims, motor-underwriting) — but no case study data references them.
- `public/testimonials/`: 3 avatar images (aisha-mohamed.jpg, grace-wanjiku.jpg, james-ochieng.jpg) — not currently used on the homepage (Testimonials section uses principles, not people).

### Conversion
- Single CTA throughout: Calendly booking (`calendly.com/leopishaagency/new-meeting`). "Book a consultation" / "Book a Discovery Call".
- `/book` hard-redirects to Calendly.
- No newsletter signup, no lead magnet, no free tool, no assessment.

### Positioning (from copy)
- "Leo Pisha is a workflow automation agency helping businesses improve operations through claims, underwriting, and client response automation."
- Niche: insurance (Kenya), with services named around insurance workflows.
- Engagement model: Diagnosis → Build → Hand over; "1-2 weeks" timelines; "Zero-Risk Pilot Available."
- Contact: `hello@leopisha.com`; Instagram `https://www.instagram.com/leopisha_/`.

---

## 2. Strengths to preserve

1. **Honest, specific niche.** The site is clearly about insurance workflow automation in Kenya, not generic "AI for everything." The copy avoids hype ("not AI for insurance... fixing the workflows").
2. **Honest about proof.** The case-studies page admits no public case studies yet rather than fabricating them — a credibility asset.
3. **Solid technical SEO foundation.** Canonical URLs, schema.org (Organization/Service/BreadcrumbList/BlogPosting), sitemap.xml, robots.txt, Open Graph, Google verification, locale `en_KE`.
4. **Accessibility-conscious.** `prefers-reduced-motion` respected, semantic HTML, aria labels, skip of layout-shifting hovers per design system.
5. **Clear engagement model.** Diagnosis → Build → Hand over with stated timelines; consultancy-first model intact.
6. **Premium design direction.** Consistent black/gold palette, serif headings, generous whitespace — differentiated from typical neon-gradient AI agency sites.

---

## 3. Problems and gaps (evidence-based)

| # | Problem | Evidence | Impact |
|---|---|---|---|
| 1 | **No public proof of work.** `caseStudies` array is empty; homepage "FeaturedCaseStudies" renders generic problem/outcome cards, not real work. Testimonials section uses principles, not real clients. | `lib/case-studies.ts` = `[]`; homepage component | Weakens trust for a consultancy selling implementation |
| 2 | **Single conversion path.** Every CTA is Calendly booking. No newsletter, no lead magnet, no assessment/calculator to capture visitors not ready to buy. | All pages link only to Calendly | Loses the majority of visitors who aren't ready to book |
| 3 | **One resource only.** `/resources` has one guide; no blog, no article library, no topical authority building. | `app/resources/page.tsx` | No reason for repeat visits; weak SEO authority |
| 4 | **No free tools / interactive assets.** No calculator, assessment, checklist, or downloadable template. | No such files in repo | No shareable, linkable assets; no distribution beyond direct outreach |
| 5 | **No developer / technical resources.** No n8n templates, integration guides, GitHub repos, or public workflow examples. | No such files | Misses the developer/automation practitioner audience that references and links |
| 6 | **No community mechanism.** No forum, showcase, events, or member participation. | No such files | No recurring engagement or ecosystem |
| 7 | **Insurance-niche copy but broad "businesses" claim.** Homepage says "helping businesses" while every service and example is insurance-specific. | Homepage H1 + service pages | Dilutes positioning; unclear who the ideal customer is |
| 8 | **Social links are placeholders.** Footer LinkedIn/Twitter icons link to `#`. | `Footer.tsx` | Broken/trust-eroding; no actual social presence connected |
| 9 | **Case-study media orphaned.** 3 poster images + 3 videos in `public/case-studies/` but no case-study data references them. | `public/case-studies/*` vs empty `caseStudies` | Dead assets; suggests abandoned work |
| 10 | **No content update mechanism.** Resources are static pages; no CMS/blog. | Static Next.js pages | High friction to publish new guidance |
| 11 | **Working tree empty on disk.** All source files deleted from working tree (only exist in git). Site likely still deployed on Vercel from a prior build, but local source is not present. | `git status` shows all leopisha files as deleted | Risk: local copy not recoverable without git; production may drift from local source |

---

## 4. Recommended disposition of existing assets

**Preserve:**
- Tech stack (Next.js 15, Tailwind v4, TypeScript) — solid foundation, keep.
- Design system (black/gold premium, Cormorant, liquid-glass, scroll storytelling) — strong differentiator, keep and extend.
- Engagement model (Diagnosis → Build → Hand over, 1-2 weeks) — consultancy-first, keep.
- SEO foundation (canonical, schema, sitemap, robots, OG) — keep and expand.
- Honest "no public case studies yet" stance — keep until real permissioned case studies exist.
- `formatCurrency` (KES) utility — keep for Kenya-focused pricing.

**Improve / consolidate:**
- Homepage: replace generic "FeaturedCaseStudies" cards with real problems or remove; add a lightweight resource/tool section.
- Case studies: populate only after real permissioned client work; keep the honest placeholder until then.
- Resources: expand from one guide into a problem-organized library.
- Conversion: add a secondary, low-commitment capture (newsletter + one free tool) alongside Calendly.

**Remove / fix:**
- Footer social links pointing to `#` — either connect real profiles or remove.
- Orphaned case-study media — either publish 3 real case studies using them, or remove to avoid implying work that doesn't exist.
- Empty `caseStudies` array — keep the honest index; populate only with real work.

**Do not build yet (per Phase 8 prioritization):**
- Custom forum/member database, SaaS product, paid digital products, complex interactive tools — no evidence of demand yet; consultancy revenue must remain central.

---

## 5. Immediate next step

Move to Phase 2: investigate reference websites (enterprise AI consultancies, automation agencies, platforms, developer-first companies) to build a feature inventory and identify which mechanisms genuinely create competitive advantage vs. decorative complexity. Output goes to `research/competitive-intelligence/`.

---

**Files inspected (all from git HEAD, read-only):**
`leopisha/app/page.tsx`, `app/layout.tsx`, `app/globals.css`, `app/about/page.tsx`, `app/book/page.tsx`, `app/resources/page.tsx`, `app/services/page.tsx` + 8 service pages, `app/case-studies/page.tsx`, `app/case-studies/[slug]/page.tsx`, `components/home/{Hero,AuthorityBar,Process,FeaturedCaseStudies,Testimonials,FinalCTA}.tsx`, `components/layout/{Header,Footer}.tsx`, `components/services/ServicesPage.tsx`, `components/case-studies/{CaseStudiesIndex,CaseStudyDetail}.tsx`, `components/about/AboutPage.tsx`, `components/ui/{Button,Card,Input}.tsx`, `lib/case-studies.ts`, `lib/utils.ts`, `design-system/leopisha/MASTER.md`, `next.config.ts`, `package.json`, `public/sitemap.xml`, `public/robots.txt`, `.vercel/project.json`.
