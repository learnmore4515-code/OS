#!/usr/bin/env node
// SHIP CHECK CLI entry point.
// Commands: init | doctor | test | report

import { readFileSync, existsSync, writeFileSync, mkdirSync } from "node:fs";
import { join, dirname, resolve } from "node:path";
import { doctor, formatDoctor } from "./checks.js";
import type { CheckGroup } from "./types.js";
import { loadConfig } from "./config.js";
import { writeReport } from "./reporter.js";
import { runBrowserTests } from "./runtests.js";

const CONFIG_NAME = "shipcheck.config.json";

function die(message: string, code = 1): never {
  console.error(`shipcheck: ${message}`);
  process.exit(code);
}

function findConfig(cwd: string): string {
  const explicit = process.env.SHIPCHECK_CONFIG;
  if (explicit && existsSync(explicit)) return resolve(explicit);
  const local = join(cwd, CONFIG_NAME);
  if (existsSync(local)) return local;
  die(`No ${CONFIG_NAME} found in ${cwd}. Run "shipcheck init" first, or set SHIPCHECK_CONFIG.`);
}

function printUsage(): void {
  console.log(`
SHIP CHECK: Checkout & Auth Edition (v1.0.0)

Usage: shipcheck <command>

Commands:
  init        Create a project configuration template and explain minimal setup.
  doctor      Run a preflight inspection (connectivity, env, Stripe, safety).
  test        Run the automated browser test suite and save a report.
  report      Display or regenerate a report from the most recent run.

Options:
  --json           Emit machine-readable JSON (doctor/report).
  --config <path>  Path to shipcheck.config.json (or set SHIPCHECK_CONFIG).
  --journey <name> Run only a named browser journey (test).
  --format <fmt>   Report format: md | json | html (report).

Examples:
  shipcheck init
  shipcheck doctor
  shipcheck test
  shipcheck report --format html
`);
}

const CONFIG_TEMPLATE = {
  name: "my-saas",
  baseUrl: "http://localhost:3000",
  routes: {
    home: "/",
    login: "/login",
    signup: "/signup",
    protected: "/dashboard",
    checkout: "/checkout",
    success: "/checkout/success",
    cancel: "/checkout/cancel",
  },
  selectors: {
    loginEmail: 'input[name="email"]',
    loginPassword: 'input[name="password"]',
    loginSubmit: 'button[type="submit"]',
    checkoutButton: '[data-testid="checkout-button"]',
  },
  testUsers: [
    {
      email: "test@example.com",
      passwordEnv: "SHIPCHECK_TEST_PASSWORD",
    },
  ],
  stripe: {
    secretKeyEnv: "STRIPE_SECRET_KEY",
    publishableKeyEnv: "STRIPE_PUBLIC_KEY",
    mode: "test",
    webhook: {
      enabled: false,
      localForwarding: false,
    },
  },
  timeouts: { navigation: 30000, action: 10000 },
  safety: { allowRemoteStaging: false, allowStateChangingTests: false },
};

async function cmdInit(cwd: string): Promise<void> {
  const path = join(cwd, CONFIG_NAME);
  if (existsSync(path)) {
    console.error(`shipcheck: ${CONFIG_NAME} already exists. Refusing to overwrite without approval.`);
    console.error(`Remove or rename the existing file, then run "shipcheck init" again.`);
    process.exit(1);
  }
  const envExample = join(cwd, ".env.example");
  if (!existsSync(envExample)) {
    writeFileSync(
      envExample,
      `# SHIP CHECK environment variables (placeholder names only - never real values)
# Copy to .env and fill in values for your environment.

# Application
BASE_URL=http://localhost:3000

# Test user credentials (supply passwords via env vars, never hardcode)
SHIPCHECK_TEST_PASSWORD=your-test-password-here

# Stripe (test mode only)
STRIPE_SECRET_KEY=sk_test_...
STRIPE_PUBLIC_KEY=pk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
`,
      "utf8",
    );
  }
  writeFileSync(path, JSON.stringify(CONFIG_TEMPLATE, null, 2) + "\n", "utf8");
  console.log(`Created ${CONFIG_NAME} and .env.example.`);
  console.log("");
  console.log("Next steps:");
  console.log("  1. Copy .env.example to .env and fill in values (never commit .env).");
  console.log("  2. Edit shipcheck.config.json to match your app's routes and test accounts.");
  console.log("  3. Run 'shipcheck doctor' to verify connectivity and configuration.");
  console.log("  4. Run 'shipcheck test' to run the browser test suite.");
}

async function cmdDoctor(cwd: string, json: boolean): Promise<void> {
  const configPath = process.env.SHIPCHECK_CONFIG ?? findConfig(cwd);
  const config = loadConfig(configPath);
  const groups: CheckGroup[] = await doctor(config);
  console.log(formatDoctor(groups, json));
  const hasFail = groups.some((g) => g.results.some((r) => r.status === "FAIL"));
  process.exit(hasFail ? 1 : 0);
}

async function cmdTest(cwd: string, journey: string | undefined): Promise<void> {
  const configPath = process.env.SHIPCHECK_CONFIG ?? findConfig(cwd);
  const config = loadConfig(configPath);
  await runBrowserTests(cwd, config, journey);
}

async function cmdReport(cwd: string, format: string): Promise<void> {
  const outDir = join(cwd, ".shipcheck");
  const jsonPath = join(outDir, "report.json");
  const mdPath = join(outDir, "report.md");
  const htmlPath = join(outDir, "report.html");
  let content = "";
  let path = "";
  if (format === "json") {
    if (!existsSync(jsonPath)) die("No report.json found. Run 'shipcheck test' first.");
    content = readFileSync(jsonPath, "utf8");
    path = jsonPath;
  } else if (format === "html") {
    if (!existsSync(htmlPath)) die("No report.html found. Run 'shipcheck test' first.");
    content = readFileSync(htmlPath, "utf8");
    path = htmlPath;
  } else {
    if (!existsSync(mdPath)) die("No report.md found. Run 'shipcheck test' first.");
    content = readFileSync(mdPath, "utf8");
    path = mdPath;
  }
  console.log(content);
  console.log(`\n---\nReport: ${path}`);
}

async function main(): Promise<void> {
  const args = process.argv.slice(2);
  let json = false;
  let format = "md";
  let journey: string | undefined;
  let config: string | undefined;
  const command = args.find((a) => !a.startsWith("--"));
  for (let i = 0; i < args.length; i++) {
    if (args[i] === "--json") json = true;
    else if (args[i] === "--format" && args[i + 1]) { format = args[++i]; }
    else if (args[i] === "--journey" && args[i + 1]) { journey = args[++i]; }
    else if (args[i] === "--config" && args[i + 1]) { config = args[++i]; }
  }
  if (config) process.env.SHIPCHECK_CONFIG = config;
  const cwd = process.cwd();

  switch (command) {
    case "init":
      await cmdInit(cwd);
      break;
    case "doctor":
      await cmdDoctor(cwd, json);
      break;
    case "test":
      await cmdTest(cwd, journey);
      break;
    case "report":
      await cmdReport(cwd, format);
      break;
    case "--help":
    case "-h":
    case undefined:
      printUsage();
      process.exit(command ? 0 : 0);
    default:
      die(`Unknown command: ${command}`);
  }
}

main().catch((err) => {
  console.error(`shipcheck: ${err instanceof Error ? err.message : String(err)}`);
  process.exit(1);
});
