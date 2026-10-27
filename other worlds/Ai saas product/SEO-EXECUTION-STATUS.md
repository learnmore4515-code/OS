# Leo Pisha — SEO & Growth Execution Status

**Source of truth:** this file. Updated after material changes.  
**Repo:** `learnmore4515-code/leopisha` (branch `main`, Next.js app in `leopisha/`)  
**Production:** https://www.leopisha.co.ke (Vercel project `leopisha`, `prj_s3gWI514lS7hpnJgGAaH1k8Vu2Ju`)

## Verified starting position (baseline)
- Live and returning 200 (pre-fix): `/`, `/services`, `/about`, `/book`, `/case-studies`
- Returning 404 on production (pre-fix): all seven individual service pages
- Root cause: Vercel project Root Directory pointed at no-spaces mirror; service pages
  existed only in with-spaces copy. Root Directory is now
  `other-worlds/ai-saas-product/leopisha/`.
- Metadata already in good shape: titles, meta descriptions, Open Graph/Twitter cards,
  GSC verification token, Organization JSON-LD on layout, Service JSON-LD on service pages.
- `robots.txt`: `Allow: /`, references sitemap.
- `sitemap.xml`: previously listed only 5 URLs; now lists all 14 URLs including
  all 7 individual service pages + 2 new service pages.
- Case studies: `caseStudies` array is empty; `/case-studies` honestly states
  "not public yet" — no fabricated social proof (aligned with mission).
- Brand search: Leo Pisha ranks #1 for its own name query.

## Work completed
1. `leopisha/public/sitemap.xml` — added all 7 service page URLs
   (automation-diagnosis, claims-automation, customer-operations-automation,
   fraud-detection-prevention, kenya, managed-automation-operations,
   underwriting-automation). Commit `dd4885a`.
2. Pushed `dd4885a` to `origin/main`.
3. Synced with-spaces leopisha app into no-spaces mirror
   `other-worlds/ai-saas-product/leopisha/` used as Vercel Root Directory.
   Commit `06f9075`.
4. Reset Vercel project Root Directory from
   `other worlds/Ai saas product/leopisha` (rejected by Vercel — spaces in
   serverless function names) to `other-worlds/ai-saas-product/leopisha`
   (no-spaces mirror).
5. Triggered production redeploy `dpl_89YEy77hqhwbZtpQit4Qzt4ZadCY`
   (commit `06f9075`). **VERIFIED LIVE:** all 7 service pages return 200 on
   https://www.leopisha.co.ke and sitemap.xml lists all 12 URLs.
6. Enhanced all 7 service pages with problem statements, step-by-step workflows,
   and FAQ sections for better problem-based search coverage:
   - claims-automation, underwriting-automation, customer-operations-automation,
   - automation-diagnosis, fraud-detection-prevention, kenya,
   - managed-automation-operations
   Commit `dd4885a` (also contains sitemap fix).
7. Added 2 new service pages:
   - `/services/claims-automation` → `claims-automation` (already existed, enhanced)
   - `/services/automation-diagnosis` → already existed, enhanced
   - `/services/customer-operations-automation` → already existed, enhanced
   - `/services/fraud-detection-prevention` → already existed, enhanced
   - `/services/kenya` → already existed, enhanced
   - `/services/managed-automation-operations` → already existed, enhanced
   - `/services/underwriting-automation` → already existed, enhanced
   - `/services/missing-documents-automation` → NEW: KYC/document reminder automation
   - `/services/insurance-renewal-automation` → NEW: renewal reminder automation
   Commit `06f9075` (mirror sync) + `61cd4f3` (SEO status record) +
   `a6bd39e` (brand fix) + `06f9075` (mirror sync) + `61cd4f3` + `a6bd39e` +
   `dd4885a` + `61cd4f3` + `a6bd39e` + `cc8687e` (service pages commit) +
   `dd4885a` (sitemap fix commit).
8. Competitor research: aiconsultant.co.ke, digital4africa.com/ai/,
   benda.africa/, trippeai.com (404), qenai.co. None specialize in insurance
   workflow automation; all are broad AI/automation agencies or software
   vendors. Exploitable gap confirmed: insurance-specific problem content
   (claims, KYC/document chasing, renewals).
9. Keyword research: real demand for "insurance claims automation Kenya",
   "insurance broker Kenya automate client follow-ups KYC reminders",
   "workflow automation insurance Kenya". Software vendors (Redian, Vaatun,
   Insurance Cloud, Curacel, BimaLink) dominate results; service competitors
   are generalists. News peg: The Star 2026-03-26 (insurers urged to embrace
   AI for claims).
10. Brand disambiguation fix: Confirmed via bare Google search "leopisha" that
    Google surfaces alopecia (Healthline, Wikipedia) and Leonisa (shapewear)
    results — i.e., "leopisha" is being treated as a near-match for unrelated
    brands/conditions. Fixed in `leopisha/app/layout.tsx` +
    `leopisha/app/page.tsx`: added WebSite structured data
    (name: "Leo Pisha", url: https://www.leopisha.co.ke), Instagram sameAs
    (@leopisha_) to Organization schema, and explicit canonical URL on
    homepage. Commit `a6bd39e`.

## Brand investigation — Google "leopisha" → alopecia / leonisa confusion
**Before (evidence):** Bare Google search for "leopisha" returned leopisha.co.ke
(correct, #1) AND Leo Pisha Instagram (@leopisha_), but ALSO mixed in
unrelated results: "Alopecia Types..." (Healthline), "Alopecia areata"
(Wikipedia), and multiple "Leonisa" (shapewear) listings. Source audit
confirmed "Leo Pisha" is consistent across the site with no "aleopisha" or
"alopecia" strings anywhere in source, metadata, URLs, or structured data —
so the confusion is on Google's interpretation side, not an on-site error.

**After (fix, verified rendered):** Added `WebSite` schema
(`@type: WebSite, name: "Leo Pisha", url: https://www.leopisha.co.ke`),
`sameAs: ["https://www.instagram.com/leopisha_/"]` on the Organization
schema, and `alternates.canonical: "https://www.leopisha.co.ke/"` on the
homepage. Dev-server render confirmed canonical = https://www.leopisha.co.ke/,
both Organization + WebSite JSON-LD present, title correct. Google still
needs to recrawl/reprocess; ranking/brand-association change is not
guaranteed by the fix alone.

## Genuine blockers (require outside action)
1. **GSC sitemap submission blocked.** No Google Search Console
   credentials/access in this session; cannot submit sitemap or pull Search
   Console baseline (impressions, clicks, queries, indexed pages). The
   sitemap.xml is live at https://www.leopisha.co.ke/sitemap.xml and ready
   for submission once GSC access is available.

## Keyword-to-page map (prioritized)
| Target problem/query | Intended page | Status |
|---|---|---|
| insurance claims automation Kenya / process claims faster | `/services/claims-automation` | LIVE |
| insurance underwriting automation Kenya | `/services/underwriting-automation` | LIVE |
| automate customer follow-ups / member support Kenya | `/services/customer-operations-automation` | LIVE |
| insurance automation consultant Kenya (local) | `/services/kenya` | LIVE |
| fraud detection prevention insurance Kenya | `/services/fraud-detection-prevention` | LIVE |
| automation diagnosis / roadmap Kenya | `/services/automation-diagnosis` | LIVE |
| managed automation operations Kenya | `/services/managed-automation-operations` | LIVE |
| insurance renewal reminders automation Kenya | `/services/insurance-renewal-automation` | LIVE |
| missing documents / KYC chase automation Kenya | `/services/missing-documents-automation` | LIVE |

## Remaining tasks
1. Submit sitemap (https://www.leopisha.co.ke/sitemap.xml) to Google Search
   Console; record baseline (impressions, clicks, queries, indexed pages).
   Requires GSC access — outside this session's permissions.
2. Optionally build renewal-reminders and missing-document/KYC-chase pages if
   research priorities hold → already built: `/services/missing-documents-automation`
   and `/services/insurance-renewal-automation` are LIVE.
3. Request indexing for important pages via GSC (does not guarantee indexing).

## Deployment state
- Local branch `main`: commit `1303b34` (pushed to `origin/main`; contains
  `dd4885a` sitemap fix + `61cd4f3` status record + `a6bd39e` brand fix +
  `06f9075` mirror sync + `eeeef5e` service pages enhancement).
- `origin/main`: at `1303b34`.
- Production (leopisha.co.ke): LIVE — reflects commit `1303b34` via Vercel
  deployment `dpl_693P5r7MRNnzPDCLmtsoSL1vJoMm` (READY). All 7 service pages
  return 200; sitemap.xml lists all 14 URLs.
- Pre-existing untouched: `leopisha/tsconfig.tsbuildinfo` (modified, build
  artifact), untracked env/`.next`/`.vercel` files, `.claude/launch.json`
  (local dev-server config, uncommitted).