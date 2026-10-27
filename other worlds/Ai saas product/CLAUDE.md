# AI SaaS Product — Client Report One-Click Studio

## MANDATORY FRONTEND ENGINEERING SKILL

**Before modifying any frontend code in this repository, invoke the
`frontend-design-implementation` skill and follow it end to end.**

Skill file: `.claude/skills/frontend-design-implementation/SKILL.md`

If your environment cannot auto-invoke skills, you MUST read that file directly
before any frontend work and follow its instructions.

### Automatic triggers

Invoke this skill whenever a task involves any of the following — with no
explicit request from the user needed:

- Building, modifying, restyling or debugging any frontend interface
- CSS, Tailwind, stylesheets, design tokens or theme work
- React components, layouts, pages, routes or UI
- Responsive layout or breakpoint behaviour
- Working from a visual reference, mockup or screenshot
- Landing pages, marketing pages or dashboards
- Images, icons, SVGs, logos or any product visual
- Browser rendering, layout bugs, "it looks wrong", or styling that isn't applying
- Any visual or UI quality review

### Non-negotiable rules

1. **Do not skip this workflow because a task looks simple.** Most failures
   started as "just a quick fix".
2. **Apply it to new projects and existing ones alike**, and **reapply it after
   switching between coding models or agents** — the skill does not carry over
   in memory between sessions.
3. **Diagnose before modifying.** Find the root cause; never rewrite components
   speculatively or add CSS overrides to mask an underlying problem.
4. **Reference images are specifications.** Reproduce the approved design; do
   not substitute a generic layout.
5. **A successful build is not visual verification.** Frontend completion
   requires opening the page in a real browser, capturing screenshots, and
   actually examining them. A build result, an HTTP 200, or reading the source
   code is not a substitute.
6. **If browser tooling is unavailable, say so explicitly** and never claim
   visual verification.
7. **Approved designs are frozen.** Once the user approves an implementation,
   fix only the stated defect. Do not redesign, restructure or refactor
   surrounding code.
8. **Never claim completion you did not verify.** Distinguish verified results
   from assumptions and disclose limitations honestly.

The skill's quality-gate checklist must be completed before any frontend task
is reported as done.

## Project Overview
Visual, non-technical AI SaaS for freelancers/consultants/agencies to create client-ready reports and proposals instantly.
Core value: sign up → 30s demo → branded, shareable visual artifact.

Selected direction: **Option B — Client Report One-Click Studio**
Paste data → instant white-labeled client report PDF/deck with narrative insights.

## Target Users
Primary: freelancers, consultants, small agencies who create client-facing proposals and monthly reports.
Pain: 4-12 hrs/client/cycle manual reporting, formatting tax, clients don’t use dashboards, need outcome narratives.

## Core Loop
1. Signup with email, no credit card
2. Instant demo: paste CSV / upload file / pick template
3. AI generates branded report with charts + 1-sentence insights
4. Export/share link or PDF
5. Free tier allows 1 real export/share; paid unlocks templates, white-label, recurring automation

## Immediate Value Artifacts
- One-page visual proposal / pitch deck
- White-labeled client report PDF/deck with logo/colors, period-over-period comps, red/green conditional formatting
- Outcome-focused summary slide answering: Did money work? Why? What are we doing?
- Template gallery: ad ROI, social metrics, sales funnel, retainer summary

## Non-Technical / Visual First Constraints
- No super-technical onboarding
- Visual first, charts and graphics generated automatically
- Public accessible platforms research driven: Reddit/X pain points validated
- Immediate value on signup, no waitlist

## Tech Notes for Claude/Codex Collaboration
- This project will involve graphs and visualizations. Use `dataviz` skill before creating any chart/graph/plot/dashboard code.
- For web app inspection/debugging/modification, prefer gstack browser tools over curl/Bash.
- Code quality rules apply: no premature abstractions, no scope creep, WHY comments only.
- Naming conventions: PascalCase components, kebab-case utilities.
- Testing: verify behavior, run specific test file, prefer real implementations.

## Production Deployment Investigation Protocol

Before diagnosing or fixing a production deployment issue:

1. Verify tool availability through actual calls — test the CLI/MCP connection with a read-only request; do not assume a platform is connected or disconnected.
2. Retrieve deployment records before making claims — list recent deployments and record IDs, URLs, states, targets, commit SHAs, creators, and assigned domains.
3. Verify project root and source commit before diagnosing production — confirm the configured Root Directory, that it exists in the source, and that the built commit actually contains the expected change.
4. Separate facts from hypotheses — record what is directly observed (tool output, HTTP responses, source) versus what is speculated.
5. Never assume cache problems from cache headers alone — `X-Vercel-Cache: HIT` or `Age` headers do not by themselves identify the root cause; test the actual deployment URL and production domain.
6. Never claim a fix worked without testing the live result — confirm the built commit, deployment status/URL, the expected route in the deployment, and the exact production response (status, Location header, body).
7. Never narrate tool actions that were not executed — only report what you actually performed and observed.

## Workflows
- Brainstorming skill used for product discovery. Architectural path selected.
- Design spec to be written to `docs/superpowers/specs/YYYY-MM-DD-client-report-studio-design.md` before implementation.
- Implementation plan via `writing-plans` skill after spec approval.

## Handoff Notes
When user gives handoff for graphs/visualizations:
- Use `dataviz` skill before writing first line of chart code
- Use `superpowers:brainstorming` for any new feature additions
- Keep visual outputs client-ready, branded, exportable

## Current Status
- Research complete: pain points validated from Reddit/X
- Direction approved: Option B Client Report One-Click Studio
- Next: design spec approval → implementation plan

Co-Authored-By: Claude Sonnet 4 <noreply@anthropic.com>

## Skill routing

When the user's request matches an available skill, invoke it via the Skill tool. When in doubt, invoke the skill.

Key routing rules:
- Product ideas/brainstorming → invoke /office-hours
- Strategy/scope → invoke /plan-ceo-review
- Architecture → invoke /plan-eng-review
- Design system/plan review → invoke /design-consultation or /plan-design-review
- Full review pipeline → invoke /autoplan
- Bugs/errors → invoke /investigate
- QA/testing site behavior → invoke /qa or /qa-only
- Code review/diff check → invoke /review
- Visual polish → invoke /design-review
- Ship/deploy/PR → invoke /ship or /land-and-deploy
- Save progress → invoke /context-save
- Resume context → invoke /context-restore
- Author a backlog-ready spec/issue → invoke /spec
