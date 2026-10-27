// Browser test runner for `shipcheck test`.
// Spawns Playwright against the configured target and converts results into
// a report. Test credentials flow through environment variables only.
import { execFileSync } from "node:child_process";
import { mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { writeReport } from "./reporter.js";
const __dirname = dirname(fileURLToPath(import.meta.url));
const PLAYWRIGHT_DIR = join(__dirname, "..", "e2e");
function envFor(config) {
    const env = {};
    for (const [k, v] of Object.entries(process.env)) {
        if (v !== undefined)
            env[k] = v;
    }
    env.SHIPCHECK_BASE_URL = config.baseUrl;
    env.SHIPCHECK_HOME = config.routes.home;
    env.SHIPCHECK_LOGIN = config.routes.login;
    env.SHIPCHECK_SIGNUP = config.routes.signup;
    env.SHIPCHECK_PROTECTED = config.routes.protected;
    env.SHIPCHECK_CHECKOUT = config.routes.checkout;
    env.SHIPCHECK_SUCCESS = config.routes.success;
    env.SHIPCHECK_CANCEL = config.routes.cancel;
    if (config.testUsers?.[0]) {
        env.SHIPCHECK_TEST_EMAIL = config.testUsers[0].email;
        if (process.env[config.testUsers[0].passwordEnv]) {
            env.SHIPCHECK_TEST_PASSWORD = process.env[config.testUsers[0].passwordEnv];
        }
    }
    if (config.stripe) {
        env.STRIPE_SECRET_KEY = process.env[config.stripe.secretKeyEnv] ?? "";
        env.STRIPE_PUBLIC_KEY = process.env[config.stripe.publishableKeyEnv] ?? "";
    }
    return env;
}
export async function runBrowserTests(cwd, config, journey) {
    const outDir = join(cwd, ".shipcheck");
    mkdirSync(outDir, { recursive: true });
    // Safety: refuse remote/payment-mutating unless explicitly opted in.
    const isLocalhost = /^(https?:\/\/)?(localhost|127\.0\.0\.1|0\.0\.0\.0|::1)(:\d+)?($|\/)/i.test(config.baseUrl);
    if (!isLocalhost && !config.safety?.allowRemoteStaging) {
        console.error(`shipcheck: Refusing to run browser tests against a non-localhost target (${config.baseUrl}).\n` +
            `Set safety.allowRemoteStaging=true in shipcheck.config.json only after explicit opt-in to a test/staging target.`);
        process.exit(1);
    }
    const args = ["playwright", "test", "--reporter=json"];
    if (journey)
        args.push("--grep", journey);
    let output = "";
    let exitCode = 0;
    try {
        output = execFileSync("npx", args, {
            cwd: PLAYWRIGHT_DIR,
            env: envFor(config),
            encoding: "utf8",
            maxBuffer: 10 * 1024 * 1024,
            stdio: ["pipe", "pipe", "inherit"],
        });
    }
    catch (err) {
        exitCode = err.status ?? 1;
        output = err.stdout ?? String(err);
    }
    const browserResults = [];
    try {
        const data = JSON.parse(output);
        for (const suite of data.suites ?? []) {
            for (const test of suite.tests ?? []) {
                const status = mapStatus(test.status ?? test.outcome ?? "failed");
                browserResults.push({
                    journey: suite.title,
                    test: test.title,
                    status,
                    actual: test.status ?? test.outcome ?? "unknown",
                    nextStep: status === "FAIL"
                        ? "Inspect the failing test, screenshot, and trace in .shipcheck/playwright/"
                        : undefined,
                });
            }
        }
    }
    catch {
        // ignore parse errors; results stay empty
    }
    const groups = [
        {
            name: "Browser tests",
            results: browserResults.map((r) => ({
                name: `${r.journey} › ${r.test}`,
                status: r.status,
                what: `Browser test "${r.test}" in journey "${r.journey}"`,
                expected: "The user journey completes successfully.",
                actual: r.actual,
                evidence: r.evidence,
                nextStep: r.nextStep,
            })),
        },
    ];
    writeReport({ target: config.baseUrl, groups, browserResults, outDir }, ["md", "json", "html"]);
    console.log(`Browser tests complete. Exit code: ${exitCode}`);
    console.log(`Reports written to ${outDir}/`);
    process.exit(exitCode !== 0 ? exitCode : browserResults.some((r) => r.status === "FAIL") ? 1 : 0);
}
function mapStatus(s) {
    switch (s) {
        case "passed": return "PASS";
        case "failed": return "FAIL";
        case "skipped": return "SKIPPED";
        default: return "NOT_CHECKED";
    }
}
