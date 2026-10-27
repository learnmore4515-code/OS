# Research — AI Sales Agent Prospect Database

Persistent, evidence-backed source of truth for Workstream A of the AI Sales Agent mission: discovering, investigating and qualifying Kenyan e-commerce / retail businesses that could buy the autonomous AI Sales Agent and CRM system.

## Files

| File | Purpose |
|------|---------|
| `prospects.csv` | One row per candidate business; stable ID; source of truth for structured fields |
| `prospects.json` | Same data as CSV, JSON form for programmatic use |
| `qualified-prospects.md` | Ranked shortlist of businesses that passed qualification, with evidence |
| `disqualified-prospects.md` | Businesses that did not qualify, with reason and evidence |
| `priority-buyers.md` | Top-ranked priority buyers with sales angle, outreach plan, next action |
| `research-methodology.md` | Rubric, sources, confidence definitions, how each field is populated |
| `research-log.md` | Resume point, batch counts, blockers, next tasks |
| `outreach-tracker.csv` | Per-prospect outreach status: angle, demo, date, reply, objections, follow-up |
| `objections-and-findings.md` | Recurring objections observed and evidence-based responses |

## Conventions

- Every prospect has a stable ID (PROS-0001, ...) and canonical URLs to prevent duplicates.
- Facts are recorded separately from hypotheses; confidence level stated per claim.
- Absence of evidence is not proof of automation; record confidence and investigate further.
- A comparable, functioning existing automation = disqualified; preserve evidence.
- Save after every batch; resume from the saved state.

## Status (initial)

- Target: 100 qualified businesses
- Completed: 0
- Disqualified: 0
- Pending verification: 0
- Next task: Batch 1 prospect discovery on Instagram/TikTok + Google Search
