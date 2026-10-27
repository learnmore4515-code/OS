// Preflight inspection checks for `shipcheck doctor`.
// Every check returns a status + explanation; secret values are never printed.
import { detectProductionUrl, inspectEnv, validateConfig } from "./config.js";
import { isSecretKey } from "./redact.js";
function result(name, status, what, expected, actual, opts) {
    return {
        name,
        status,
        what,
        expected,
        actual,
        likelyCause: opts?.likelyCause,
        nextStep: opts?.nextStep,
        evidence: opts?.evidence,
        skippedReason: opts?.skippedReason,
    };
}
export async function reachable(baseUrl) {
    const what = "Whether the configured application is reachable.";
    const expected = "The application responds to an HTTP request.";
    try {
        const res = await fetch(baseUrl, { signal: AbortSignal.timeout(15000) });
        const actual = `HTTP ${res.status} ${res.statusText} from ${baseUrl}`;
        return result("Application reachable", res.ok ? "PASS" : "WARN", what, expected, actual, {
            nextStep: res.ok ? undefined : "Check the application is running and the baseUrl is correct.",
        });
    }
    catch (err) {
        const actual = `Failed to reach ${baseUrl}: ${err instanceof Error ? err.message : String(err)}`;
        return result("Application reachable", "FAIL", what, expected, actual, {
            likelyCause: "Application not running, wrong baseUrl, or network unreachable.",
            nextStep: "Start the application and confirm baseUrl in shipcheck.config.json.",
        });
    }
}
export async function routesRespond(config) {
    const checks = [];
    const routes = [
        { name: "Homepage", path: config.routes.home },
        { name: "Login page", path: config.routes.login },
        { name: "Signup page", path: config.routes.signup },
        { name: "Protected page", path: config.routes.protected },
        { name: "Checkout page", path: config.routes.checkout },
    ];
    for (const r of routes) {
        const what = `Route ${r.path} responds as expected.`;
        const expected = "Returns a successful (or expected) HTTP status.";
        try {
            const res = await fetch(new URL(r.path, config.baseUrl).href, {
                signal: AbortSignal.timeout(15000),
            });
            const actual = `HTTP ${res.status} ${res.statusText}`;
            let status = "PASS";
            if (res.status >= 500)
                status = "FAIL";
            else if (res.status === 401 || res.status === 403)
                status = "WARN"; // protected pages may require auth
            else if (res.status >= 400)
                status = "WARN";
            checks.push(result(r.name, status, what, expected, actual, {
                nextStep: status !== "PASS" ? "Inspect the route handler and server logs." : undefined,
            }));
        }
        catch (err) {
            checks.push(result(r.name, "FAIL", what, expected, `Failed: ${err instanceof Error ? err.message : String(err)}`, {
                likelyCause: "Route not implemented or server not running.",
                nextStep: "Implement the route or start the server.",
            }));
        }
    }
    return checks;
}
export function envVarsPresent(names) {
    const results = [];
    const inspected = inspectEnv(names);
    let missing = 0;
    for (const [name, state] of Object.entries(inspected)) {
        const what = `Environment variable ${name} is configured.`;
        const expected = "The variable is set in the runtime environment.";
        if (state === "(not set)") {
            missing++;
            results.push(result(name, "FAIL", what, expected, state, {
                nextStep: `Add ${name} to your .env file (use .env.example for placeholder names).`,
            }));
        }
        else if (isSecretKey(name)) {
            results.push(result(name, "PASS", what, expected, state, {
                nextStep: "Confirm the value is correct for your environment (value itself is never printed).",
            }));
        }
        else {
            results.push(result(name, "PASS", what, expected, state));
        }
    }
    results.unshift(result("Environment variables", missing === 0 ? "PASS" : "FAIL", "All required environment variables are present.", "Every required variable is set.", `${names.length - missing}/${names.length} variables set.`, { nextStep: missing > 0 ? "Set the missing variables before running tests." : undefined }));
    return results;
}
export function stripeMode(config) {
    const results = [];
    if (!config.stripe) {
        results.push(result("Stripe configuration", "NOT_CHECKED", "Whether Stripe keys are present and test-mode.", "Stripe secret and publishable keys are configured in test mode.", "No Stripe settings in config.", { nextStep: "Add stripe settings to shipcheck.config.json if you use Stripe Checkout." }));
        return results;
    }
    const skState = inspectEnv([config.stripe.secretKeyEnv])[config.stripe.secretKeyEnv];
    const pkState = inspectEnv([config.stripe.publishableKeyEnv])[config.stripe.publishableKeyEnv];
    const sk = process.env[config.stripe.secretKeyEnv];
    const isTest = sk ? sk.startsWith("sk_test_") : undefined;
    results.push(result("Stripe secret key", isTest === true ? "PASS" : isTest === false ? "FAIL" : "NOT_CHECKED", "Whether the Stripe secret key is clearly test-mode.", "Key begins with sk_test_ (never a live sk_live_ key).", skState, {
        likelyCause: isTest === false ? "A live-mode key is configured." : undefined,
        nextStep: isTest === false ? "Use a sk_test_ key for testing. Never run payment-mutating tests with a live key." : undefined,
    }));
    results.push(result("Stripe publishable key", pkState === "(not set)" ? "WARN" : "PASS", "Whether the Stripe publishable key is configured.", "Key begins with pk_test_ in test mode.", pkState, { nextStep: pkState === "(not set)" ? "Add the publishable key to your environment." : undefined }));
    if (config.stripe.webhook?.enabled) {
        const whEnv = config.stripe.webhook?.secretEnv;
        const whState = whEnv
            ? inspectEnv([whEnv])[whEnv]
            : "(not set)";
        results.push(result("Stripe webhook secret", whState === "(not set)" ? "FAIL" : "PASS", "Whether webhook configuration appears present when webhook tests are enabled.", "Webhook signing secret is configured.", whState, { nextStep: whState === "(not set)" ? "Configure STRIPE_WEBHOOK_SECRET or disable webhook tests." : undefined }));
        results.push(result("Local webhook forwarding", config.stripe.webhook.localForwarding ? "PASS" : "WARN", "Whether Stripe CLI local forwarding is configured for webhook verification.", "stripe listen is running or can forward events to the local webhook endpoint.", config.stripe.webhook.localForwarding ? "Enabled" : "Not enabled", {
            nextStep: "Run `stripe listen --forward-to localhost:PORT/webhook` and point the webhook endpoint at it.",
        }));
    }
    return results;
}
export function configMismatches(config) {
    const problems = validateConfig(config);
    const production = detectProductionUrl(config.baseUrl);
    const results = [];
    results.push(result("Target environment", production ? "WARN" : "PASS", "Whether the working directory or target looks like production.", "Target is localhost or an explicitly designated test/staging environment.", production ? `Production-like target detected: ${config.baseUrl}` : `Local/test target: ${config.baseUrl}`, {
        likelyCause: production ? "baseUrl points at a non-localhost host." : undefined,
        nextStep: production ? "Use localhost for testing. Set allowRemoteStaging=true only after explicit opt-in." : undefined,
    }));
    for (const p of problems) {
        results.push(result("Configuration", "WARN", "Obvious configuration mismatches.", "No mismatches.", p));
    }
    if (problems.length === 0 && !production) {
        results.push(result("Configuration", "PASS", "Obvious configuration mismatches.", "No mismatches.", "No obvious mismatches detected."));
    }
    return results;
}
export function testCredentials(config) {
    const results = [];
    if (!config.testUsers || config.testUsers.length === 0) {
        results.push(result("Test credentials", "NOT_CHECKED", "Whether test credentials are configured.", "At least one test user with email + password env var is configured.", "No test users configured.", { nextStep: "Add testUsers to shipcheck.config.json, supplying passwords via environment variables only." }));
        return results;
    }
    let missingPasswords = 0;
    for (const u of config.testUsers) {
        const set = process.env[u.passwordEnv] !== undefined;
        if (!set)
            missingPasswords++;
        results.push(result(`Test user ${u.email}`, set ? "PASS" : "FAIL", "Whether test user password env var is configured.", `The env var ${u.passwordEnv} holds the test user's password.`, set ? "set (redacted)" : "(not set)", { nextStep: set ? undefined : `Set ${u.passwordEnv} in your environment.` }));
    }
    results.unshift(result("Test credentials", missingPasswords === 0 ? "PASS" : "FAIL", "All configured test users have passwords set.", "Every test user's password env var is populated.", `${config.testUsers.length - missingPasswords}/${config.testUsers.length} test users ready.`, { nextStep: missingPasswords > 0 ? "Set the missing password env vars." : undefined }));
    return results;
}
export async function doctor(config) {
    const reach = await reachable(config.baseUrl);
    const routeChecks = await routesRespond(config);
    const envNames = [
        config.stripe?.secretKeyEnv,
        config.stripe?.publishableKeyEnv,
        config.stripe?.webhook?.secretEnv,
        ...(config.testUsers ?? []).map((u) => u.passwordEnv),
    ].filter((x) => Boolean(x));
    const envChecks = envVarsPresent(envNames);
    const stripeChecks = stripeMode(config);
    const mismatchChecks = configMismatches(config);
    const credentialChecks = testCredentials(config);
    return [
        { name: "Connectivity", results: [reach, ...routeChecks] },
        { name: "Environment", results: envChecks },
        { name: "Stripe & Payments", results: stripeChecks },
        { name: "Configuration & Safety", results: mismatchChecks },
        { name: "Test Credentials", results: credentialChecks },
    ];
}
export function formatDoctor(groups, json) {
    if (json) {
        return JSON.stringify({ groups }, null, 2);
    }
    const lines = [];
    lines.push("# SHIP CHECK Doctor — Preflight Inspection");
    lines.push("");
    for (const g of groups) {
        lines.push(`## ${g.name}`);
        lines.push("");
        for (const r of g.results) {
            const mark = r.status === "PASS" ? "[PASS]" : r.status === "FAIL" ? "[FAIL]" : r.status === "WARN" ? "[WARN]" : "[SKIP]";
            lines.push(`- ${mark} ${r.name}`);
            lines.push(`  - What: ${r.what}`);
            lines.push(`  - Expected: ${r.expected}`);
            lines.push(`  - Actual: ${r.actual}`);
            if (r.likelyCause)
                lines.push(`  - Likely cause: ${r.likelyCause}`);
            if (r.nextStep)
                lines.push(`  - Next step: ${r.nextStep}`);
            if (r.skippedReason)
                lines.push(`  - Skipped: ${r.skippedReason}`);
        }
        lines.push("");
    }
    return lines.join("\n");
}
