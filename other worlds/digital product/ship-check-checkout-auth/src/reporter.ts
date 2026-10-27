// Report generation: Markdown, JSON, and HTML reports from a run result.

import type { RunReport, CheckResult, Status } from "./types.js";
import { writeFileSync, existsSync, mkdirSync } from "node:fs";
import { join } from "node:path";

export interface RunOptions {
  target: string;
  groups: CheckGroupLike[];
  browserResults?: BrowserResult[];
  outDir: string;
}

export interface CheckGroupLike {
  name: string;
  results: CheckResultLike[];
}

export interface CheckResultLike {
  name: string;
  status: Status;
  what: string;
  expected: string;
  actual: string;
  evidence?: string[];
  likelyCause?: string;
  nextStep?: string;
  skippedReason?: string;
}

export interface BrowserResult {
  journey: string;
  test: string;
  status: Status;
  actual: string;
  evidence?: string[];
  nextStep?: string;
}

function statusMark(status: Status): string {
  switch (status) {
    case "PASS": return "PASS";
    case "FAIL": return "FAIL";
    case "WARN": return "WARN";
    case "NOT_CHECKED": return "NOT CHECKED";
    case "SKIPPED": return "SKIPPED";
  }
}

function statusColor(status: Status): string {
  switch (status) {
    case "PASS": return "#16a34a";
    case "FAIL": return "#dc2626";
    case "WARN": return "#d97706";
    default: return "#6b7280";
  }
}

export function summarize(groups: CheckGroupLike[], browserResults?: BrowserResult[]) {
  let total = 0, pass = 0, fail = 0, warn = 0, skipped = 0, notChecked = 0;
  const count = (r: { status: Status }) => {
    total++;
    switch (r.status) {
      case "PASS": pass++; break;
      case "FAIL": fail++; break;
      case "WARN": warn++; break;
      case "SKIPPED": skipped++; break;
      case "NOT_CHECKED": notChecked++; break;
    }
  };
  for (const g of groups) for (const r of g.results) count(r);
  if (browserResults) for (const r of browserResults) count(r);
  return { total, pass, fail, warn, skipped, notChecked };
}

export function toMarkdown(opts: RunOptions): string {
  const s = summarize(opts.groups, opts.browserResults);
  const lines: string[] = [];
  lines.push("# SHIP CHECK Test Report");
  lines.push("");
  lines.push(`- **Target:** ${opts.target}`);
  lines.push(`- **Generated:** ${new Date().toISOString()}`);
  lines.push("");
  lines.push("## Summary");
  lines.push("");
  lines.push(`- Total: ${s.total}`);
  lines.push(`- Passed: ${s.pass}`);
  lines.push(`- Failed: ${s.fail}`);
  lines.push(`- Warnings: ${s.warn}`);
  lines.push(`- Skipped: ${s.skipped}`);
  lines.push(`- Not checked: ${s.notChecked}`);
  lines.push("");
  lines.push("## Preflight Checks");
  lines.push("");
  for (const g of opts.groups) {
    lines.push(`### ${g.name}`);
    lines.push("");
    lines.push("| Check | Status | What | Expected | Actual | Next step |");
    lines.push("|---|---|---|---|---|---|");
    for (const r of g.results) {
      lines.push(
        `| ${r.name} | ${statusMark(r.status)} | ${r.what} | ${r.expected} | ${r.actual} | ${r.nextStep ?? "-"} |`,
      );
    }
    lines.push("");
  }
  if (opts.browserResults && opts.browserResults.length) {
    lines.push("## Browser Tests");
    lines.push("");
    lines.push("| Journey | Test | Status | Actual | Next step |");
    lines.push("|---|---|---|---|---|");
    for (const r of opts.browserResults) {
      lines.push(`| ${r.journey} | ${r.test} | ${statusMark(r.status)} | ${r.actual} | ${r.nextStep ?? "-"} |`);
    }
    lines.push("");
  }
  lines.push("## Evidence");
  lines.push("");
  lines.push("Screenshots and evidence files are stored in the `.shipcheck/` directory of your target project.");
  lines.push("");
  lines.push("> Likely causes are hypotheses, not confirmed root causes. Investigate each failure against your own application code.");
  return lines.join("\n");
}

export function toJSON(opts: RunOptions): string {
  const report: RunReport = {
    schemaVersion: "1",
    generatedAt: new Date().toISOString(),
    target: opts.target,
    summary: summarize(opts.groups, opts.browserResults),
    groups: opts.groups.map((g) => ({ name: g.name, results: g.results })),
  };
  return JSON.stringify(report, null, 2);
}

export function toHTML(opts: RunOptions): string {
  const s = summarize(opts.groups, opts.browserResults);
  const groupHtml = opts.groups
    .map(
      (g) => `
    <details>
      <summary>${g.name} (${g.results.length} checks)</summary>
      <table>
        <thead><tr><th>Check</th><th>Status</th><th>What</th><th>Expected</th><th>Actual</th><th>Next step</th></tr></thead>
        <tbody>
          ${g.results
            .map(
              (r) => `<tr>
            <td>${escapeHtml(r.name)}</td>
            <td><span class="badge badge-${r.status}">${statusMark(r.status)}</span></td>
            <td>${escapeHtml(r.what)}</td>
            <td>${escapeHtml(r.expected)}</td>
            <td>${escapeHtml(r.actual)}</td>
            <td>${escapeHtml(r.nextStep ?? "-")}</td>
          </tr>`,
            )
            .join("")}
        </tbody>
      </table>
    </details>
  `,
    )
    .join("");
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>SHIP CHECK Report</title>
<style>
  body { font-family: system-ui, -apple-system, Segoe UI, Roboto, sans-serif; margin: 24px; color: #111827; }
  h1 { font-size: 24px; margin-bottom: 8px; }
  h2 { font-size: 18px; margin-top: 24px; border-bottom: 1px solid #e5e7eb; padding-bottom: 6px; }
  .summary { display: flex; gap: 16px; margin: 16px 0; }
  .stat { border: 1px solid #e5e7eb; border-radius: 8px; padding: 12px 16px; min-width: 110px; }
  .stat .v { font-size: 24px; font-weight: 700; }
  .stat .l { font-size: 12px; color: #6b7280; text-transform: uppercase; letter-spacing: 0.05em; }
  .badge { display: inline-block; padding: 2px 8px; border-radius: 999px; font-size: 12px; font-weight: 600; color: #fff; }
  .badge-PASS { background: #16a34a; }
  .badge-FAIL { background: #dc2626; }
  .badge-WARN { background: #d97706; }
  .badge-SKIPPED, .badge-NOT_CHECKED { background: #6b7280; }
  table { width: 100%; border-collapse: collapse; margin-top: 8px; }
  th, td { border: 1px solid #e5e7eb; padding: 6px 8px; text-align: left; font-size: 13px; vertical-align: top; }
  th { background: #f9fafb; }
  details summary { cursor: pointer; font-weight: 600; padding: 8px; }
  .note { font-size: 13px; color: #6b7280; margin-top: 16px; border-top: 1px solid #e5e7eb; padding-top: 12px; }
</style>
</head>
<body>
  <h1>SHIP CHECK Test Report</h1>
  <p><strong>Target:</strong> ${escapeHtml(opts.target)}</p>
  <p><strong>Generated:</strong> ${new Date().toISOString()}</p>
  <div class="summary">
    <div class="stat"><div class="v">${s.total}</div><div class="l">Total</div></div>
    <div class="stat"><div class="v" style="color:#16a34a">${s.pass}</div><div class="l">Passed</div></div>
    <div class="stat"><div class="v" style="color:#dc2626">${s.fail}</div><div class="l">Failed</div></div>
    <div class="stat"><div class="v" style="color:#d97706">${s.warn}</div><div class="l">Warnings</div></div>
    <div class="stat"><div class="v">${s.skipped}</div><div class="l">Skipped</div></div>
    <div class="stat"><div class="v">${s.notChecked}</div><div class="l">Not checked</div></div>
  </div>
  <h2>Preflight Checks</h2>
  ${groupHtml}
  <p class="note">Likely causes are hypotheses, not confirmed root causes. Investigate each failure against your own application code. Evidence files live in your project's .shipcheck/ directory.</p>
</body>
</html>`;
}

function escapeHtml(s: string): string {
  return s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]!));
}

export function writeReport(opts: RunOptions, formats: ("md" | "json" | "html")[] = ["md", "json", "html"]): string[] {
  mkdirSync(opts.outDir, { recursive: true });
  const written: string[] = [];
  for (const fmt of formats) {
    let content: string;
    let ext: string;
    if (fmt === "md") { content = toMarkdown(opts); ext = "md"; }
    else if (fmt === "json") { content = toJSON(opts); ext = "json"; }
    else { content = toHTML(opts); ext = "html"; }
    const path = join(opts.outDir, `report.${ext}`);
    writeFileSync(path, content, "utf8");
    written.push(path);
  }
  return written;
}
