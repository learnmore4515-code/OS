# Workflow Builder — n8n Client & Demo Projects

This is the build space for Peter's AI automation agency (Kim's agency, `C:\Users\profe\Downloads\OS\other worlds\agency`). All client n8n projects, demo projects, and sophisticated workflow builds live here.

## Agency context

The agency is a service-first AI Automation Agency (PLAYBOOK-v1, 2026-10-19) serving insurance brokers. Current stage: Stage 4 — Getting the first customer (problem discovery with insurance brokers). Objective: first paid AI-automation client at $1,000–$2,000 within 30–60 days. Audit conditions must be met before Stage 4 proceeds (see the agency CLAUDE.md).

Workflows built here are deliverables for that agency — n8n automations for clients, demo workflows to win proof clients, and sophisticated internal automations.

## n8n skills pack (mandatory)

The n8n workflow-building skills live at `C:\Users\profe\Downloads\OS\n8n-skills`. There are 14 skills. **Invoke `using-n8n-mcp-skills` (the router) before any n8n workflow action** — designing, building, editing, validating, testing, or debugging. It routes to the right specialist skill:

| Skill | Purpose |
|---|---|
| `using-n8n-mcp-skills` | Router — entry point for every n8n task |
| `n8n-mcp-tools-expert` | Choosing/calling n8n-mcp tools, node discovery, credentials, data tables |
| `n8n-workflow-patterns` | Workflow architecture (webhook, HTTP API, database, AI agent, scheduled, batch) |
| `n8n-node-configuration` | Configuring any node, operation-aware fields, property dependencies |
| `n8n-expression-syntax` | `{{ }}` expressions, `$json`/`$node`, data mapping, Set-node discipline |
| `n8n-validation-expert` | Validation errors, false positives, auto-fix, workflow review |
| `n8n-code-javascript` | Code nodes in JavaScript |
| `n8n-code-python` | Code nodes in Python (only on explicit request) |
| `n8n-code-tool` | AI-agent-callable Custom Code Tool |
| `n8n-error-handling` | Error branches, retries, 4xx/5xx shapes |
| `n8n-binary-and-data` | Files, images, PDFs, binary across the agent boundary |
| `n8n-subworkflows` | Reusable sub-workflows, Execute Workflow |
| `n8n-agents` | AI Agent / LLM-with-tools / Text Classifier workflows |
| `n8n-multi-instance` | Multiple n8n instances, instance switching, credential writes |
| `n8n-self-hosting` | Deploying/operating self-hosted n8n (ops, not building) |

**Non-negotiables** (from the router skill):
1. Invoke the relevant skill before any n8n action — every time.
2. Validate AND verify before activating: `validate_workflow`/`n8n_validate_workflow`, then `n8n_get_workflow` to inspect `connections`. Validation passing is necessary, not sufficient.
3. Secrets never go in text fields — tokens/API keys/passwords always go through the n8n credential system.

## MCP server rotation

Peter rotates MCP servers as free tiers are exhausted. Do not be surprised when the connected n8n-mcp instance changes. Before any instance-dependent call (create, update, validate-by-id, test, credential write), confirm the current target instance with `n8n_health_check` / `n8n_instances` and verify with `n8n-multi-instance` when more than one instance is available. Credential writes fail closed with `INSTANCE_AMBIGUOUS` when the target is ambiguous.

## Working conventions

- Follow the agency's rules: discovery first, pitch never on the first call; no SaaS/custom code/employees/paid ads until after proof + revenue.
- One component or class per file; named exports over default; verb-first function names.
- `TODO(author): desc (#issue)`, `FIXME(author): desc (#issue)`, `HACK(author): desc (#issue)`, `NOTE: desc` markers only — never `XXX`, `TEMP`, `REMOVEME`.
- WHY comments only, never WHAT.
- Secrets never committed to git. `.env` files are gitignored.
