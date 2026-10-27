# Research Methodology

## Objective
Discover, investigate and qualify ~100 real Kenyan e-commerce and retail businesses that could realistically buy the autonomous AI Sales Agent and CRM system (WhatsApp-centred, M-Pesa payments, KES pricing).

## Priority criteria
Kenyan businesses, Nairobi preferred, selling physical products online or using social platforms (Instagram/TikTok/WhatsApp) as important sales channels. Business owners with buying authority, credible commercial activity, and a sales process that could benefit from automation.

## Sources (in order)
1. Instagram and TikTok via accessible browser sessions (Playwright / Open G Stack browser) — active selling evidence, posts, captions, comments, contact routes
2. Google Search (Tavily) — company websites, public business info
3. Public business registration / directory information where accessible

## What to record per prospect (all fields in prospects.csv / prospects.json)
- Business name, location, Instagram/TikTok/website URLs
- Product categories, price evidence
- Owner/decision-maker + supporting evidence
- Public business contact routes
- Sales-channel observations (WhatsApp, website, marketplace, physical shop)
- Observed sales friction + source evidence
- Existing automation + evidence
- Qualification status + reason
- Buying-potential indicators
- Owner accessibility indicators
- Opportunity hypothesis
- Source URLs + concise evidence notes
- Research date, last verification date, researcher, confidence level, qualification score
- Recommended personalised sales angle
- Loom status, outreach status, last contact date, replies, objections, next action

## Qualification rubric (0–100)
- Product fit (e-commerce / physical products sold online or via social) — 20
- Evidence of repetitive or costly sales work (manual WhatsApp enquiries, repeated price/stock questions) — 20
- Commercial viability (active selling, visible prices, repeat customers) — 15
- Owner accessibility + buying authority — 15
- Evidence quality (multiple corroborating sources) — 10
- Ease of piloting (can demo quickly, no major integration blockers) — 10
- Comparable solution already exists (−30 if yes, functioning) — gate

## Qualification statuses
- `qualified` — passed rubric, recommended for outreach
- `disqualified` — comparable automation exists, or no buying authority/activity
- `pending-verification` — insufficient evidence; investigate further
- `insufficient-evidence` — could not confirm key fields

## Confidence levels
- `high` — multiple sources corroborate the claim
- `medium` — one source, or observed directly but single data point
- `low` — inferred; treat as hypothesis

## Duplicate prevention
Merge duplicate accounts representing the same business using stable IDs and canonical URLs; preserve all evidence. Do not merge distinct businesses with similar names.

## Evidence rule
Every important claim traceable to a source URL. Record inaccessible pages and missing information explicitly.
