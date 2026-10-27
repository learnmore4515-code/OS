---
name: n8n-mcp-oauth-setup
description: "Use when the user provides a new n8n MCP server URL, creates a new n8n account, or asks to connect, reconnect, authenticate, or configure a replacement n8n MCP server. Automatically follows the proven OAuth setup procedure: inspect the endpoint's auth requirements, configure the MCP server, initiate the OAuth consent flow via `claude mcp login`, wait for user authorization in a terminal, verify the connection, and report status. Never asks the user to repeat instructions or paste secrets into chat."
---

# n8n MCP OAuth Setup

Reusable skill for connecting and authenticating n8n MCP servers via OAuth. Follow this procedure whenever the user provides a new n8n MCP server URL, reports a new n8n account, or asks to connect/reconnect/authenticate a replacement n8n MCP server.

## Trigger Conditions

Activate this skill when the user:

- Sends an n8n MCP server URL (e.g. `https://<instance>.app.n8n.cloud/mcp-server/http`)
- Tells you they created a new n8n account
- Asks you to connect, reconnect, authenticate, or configure a replacement n8n MCP server

Do not ask the user to repeat the original explanation or problem description.

## Required Workflow

### 1. Inspect

Extract the MCP server URL from the user's message.

Inspect the available MCP configuration:
- Run `claude mcp list` to see current MCP servers and their status
- Check if the new URL's instance is already configured
- Determine the authentication method required (do not assume it matches a previous instance)

Verify the new endpoint's authentication requirements:
- For n8n cloud instances, the OAuth endpoints typically follow the pattern:
  - `https://<instance>.app.n8n.cloud/mcp-oauth/authorize`
  - `https://<instance>.app.n8n.cloud/mcp-oauth/token`
  - `https://<instance>.app.n8n.cloud/mcp-oauth/register`
- Confirm the server supports OAuth before proceeding

### 2. Configure

Remove the existing n8n server if it points to a different instance:
```
claude mcp remove n8n
```

Add the new n8n MCP server:
```
claude mcp add --transport http n8n <url>
```

Replace `<url>` with the actual URL the user provided. Do not add headers, client IDs, or secrets manually — the OAuth flow handles authentication dynamically.

Preserve the old connection until the replacement is verified working.

### 3. Authenticate

Initiate the OAuth authorization flow:

```
claude mcp login n8n
```

This command requires an interactive terminal. You cannot run it from the Bash tool directly because stdin is not a terminal.

**Steps to execute:**

1. Open a terminal tab: `mcp__terminal__open_terminal_tab`
2. Run the login command in that terminal: `mcp__terminal__run_in_terminal` with command `claude mcp login n8n`
3. The terminal will display an authorization URL — share this URL with the user
4. The user opens the URL in their browser, signs in to their n8n instance, and grants consent
5. After consent, the browser redirects to a localhost callback URL
6. The user pastes the full redirect URL back into the terminal
7. The terminal will confirm: `Authenticated with "n8n". Its tools are now available in Claude Code.`

Rules:
- Never ask the user to paste client secrets, access tokens, or credentials into chat
- Never invent configuration options, endpoints, command-line flags, or test results
- Do not claim authentication succeeded until the terminal confirms it

### 4. Verify

Run `claude mcp list` to confirm the n8n server shows `✔ Connected`.

Confirm that n8n-mcp tools are discoverable and accessible (e.g. `search_nodes`, `get_node`, `validate_node`, `n8n_create_workflow`, etc.).

If authentication fails:
- Inspect the actual error message
- Troubleshoot the specific cause
- Do not repeatedly perform failed setup attempts without learning from the error

### 5. Report

Give a concise status report:

| Check | Status |
|---|---|
| MCP server configured | yes/no |
| OAuth authentication | successful/required/unsupported/failed |
| MCP tools accessible | yes/no |
| Remaining action required | description or "none" |

## Rules

- Execute the workflow rather than merely explaining it
- Do not ask the user to repeat instructions already provided
- Do not assume a new n8n account has the same OAuth client ID, secret, callback URL, or tokens as a previous account
- Never invent configuration options, endpoints, command-line flags, or successful test results
- Never expose or log credentials unnecessarily
- Do not delete unrelated MCP servers or change unrelated configurations
- Preserve the old working configuration until the replacement is verified
- If you lack a required capability (e.g. interactive terminal for OAuth), identify the precise limitation and give the user the shortest actionable workaround

## Successful Procedure Reference

The following procedure was successfully used to connect `https://simongreenmmm.app.n8n.cloud/mcp-server/http`:

1. `claude mcp remove n8n` — removed the expired shined instance
2. `claude mcp add --transport http n8n https://simongreenmmm.app.n8n.cloud/mcp-server/http` — added new server
3. `claude mcp login n8n` — initiated OAuth flow in an interactive terminal
4. The terminal displayed an authorization URL; the user visited it, granted consent, and pasted the redirect URL back
5. Terminal confirmed: `Authenticated with "n8n". Its tools are now available in Claude Code.`
6. `claude mcp list` confirmed `n8n ... ✔ Connected`

Key insight: `claude mcp login` triggers the OAuth consent flow but requires an interactive terminal. Use `mcp__terminal__open_terminal_tab` + `mcp__terminal__run_in_terminal` to run it. The server's OAuth endpoints are auto-discovered — no manual client registration needed for n8n cloud instances.

## Troubleshooting

| Symptom | Likely Cause | Fix |
|---|---|---|
| `stdin isn't a terminal` | Running `claude mcp login` from Bash | Use `mcp__terminal__open_terminal_tab` + `mcp__terminal__run_in_terminal` instead |
| `Needs authentication` in `claude mcp list` | OAuth flow not completed | Run `claude mcp login n8n` in a terminal and complete the browser consent |
| Tools not discoverable after connection | MCP server added but not authenticated | Complete `claude mcp login n8n`, then verify with `claude mcp list` |
| Old server still listed | Old n8n instance not removed | Run `claude mcp remove n8n` before adding the new one |
| Redirect URL paste hangs | User hasn't pasted the callback URL | Wait for user to complete browser consent and paste the full redirect URL |
| OAuth endpoints not found | Instance may not support MCP OAuth | Verify the instance version supports instance-level MCP (n8n 2.34+) |
