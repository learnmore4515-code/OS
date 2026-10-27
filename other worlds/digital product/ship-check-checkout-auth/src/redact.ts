// Secret redaction for diagnostic output.
// Never print secret values. A variable being present is not proof an integration works.

const SECRET_SUFFIXES = ["_KEY", "_SECRET", "_TOKEN", "_PASSWORD", "_PW", "_CREDENTIAL"];
const STRIPE_PREFIXES = ["sk_", "pk_"];

export function isSecretKey(name: string): boolean {
  const upper = name.toUpperCase();
  return SECRET_SUFFIXES.some((s) => upper.endsWith(s));
}

export function looksLikeStripeSecret(value: string): boolean {
  return STRIPE_PREFIXES.some((p) => value.startsWith(p));
}

export function redactValue(name: string, value: string | undefined): string {
  if (value === undefined || value === "") {
    return "(not set)";
  }
  if (isSecretKey(name)) {
    if (looksLikeStripeSecret(value)) {
      // Show only the prefix + length to confirm format without exposing the key.
      const prefix = value.slice(0, 3);
      return `${prefix}…(${value.length} chars)`;
    }
    return "***REDACTED***";
  }
  return value;
}

export function redactEnv(obj: Record<string, string | undefined>): Record<string, string> {
  const out: Record<string, string> = {};
  for (const [k, v] of Object.entries(obj)) {
    out[k] = redactValue(k, v);
  }
  return out;
}
