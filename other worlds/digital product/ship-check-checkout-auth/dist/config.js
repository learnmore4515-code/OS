// Configuration loading and validation.
// Supports a shipcheck.config.json next to the target application, plus an
// .env file whose variable NAMES (never values) are inspected.
import { readFileSync, existsSync } from "node:fs";
import { isSecretKey } from "./redact.js";
const DEFAULT_CONFIG = {
    timeouts: { navigation: 30000, action: 10000 },
    safety: { allowRemoteStaging: false, allowStateChangingTests: false },
};
export function loadConfig(configPath) {
    if (!existsSync(configPath)) {
        throw new Error(`Config file not found: ${configPath}`);
    }
    const raw = JSON.parse(readFileSync(configPath, "utf8"));
    const config = { ...DEFAULT_CONFIG, ...raw };
    if (!config.baseUrl)
        throw new Error("config.baseUrl is required");
    if (!config.name)
        config.name = "untitled";
    return config;
}
export function detectProductionUrl(baseUrl) {
    const productionSignals = [
        "vercel.app",
        "netlify.app",
        "herokuapp.com",
        "railway.app",
        "render.com",
        "fly.dev",
        ".com",
        ".net",
        ".org",
        ".io",
        ".app",
    ];
    try {
        const url = new URL(baseUrl);
        const host = url.hostname.toLowerCase();
        if (host === "localhost" || host === "127.0.0.1" || host === "0.0.0.0" || host === "::1") {
            return false;
        }
        return productionSignals.some((s) => host.includes(s));
    }
    catch {
        return true; // unparseable -> treat cautiously
    }
}
export function inspectEnv(varNames) {
    // Inspect presence/format of env var NAMES only; never print values.
    const out = {};
    for (const name of varNames) {
        const value = process.env[name];
        if (value === undefined) {
            out[name] = "(not set)";
        }
        else if (isSecretKey(name)) {
            out[name] = "set (redacted)";
        }
        else {
            out[name] = `set (${value.length} chars)`;
        }
    }
    return out;
}
export function validateConfig(config) {
    const problems = [];
    if (detectProductionUrl(config.baseUrl)) {
        problems.push(`Target "${config.baseUrl}" looks like a production URL. Payment-mutating and state-changing tests are disabled by default.`);
    }
    if (config.stripe) {
        const skEnv = process.env[config.stripe.secretKeyEnv];
        if (skEnv && !skEnv.startsWith("sk_test_")) {
            problems.push(`Stripe secret key (${config.stripe.secretKeyEnv}) does not use the sk_test_ prefix. Live-mode keys are refused for payment-mutating tests.`);
        }
        if (config.stripe.webhook?.enabled && !config.stripe.webhook?.secretEnv) {
            problems.push("Webhook tests are enabled but no webhook secret env var is configured.");
        }
    }
    return problems;
}
