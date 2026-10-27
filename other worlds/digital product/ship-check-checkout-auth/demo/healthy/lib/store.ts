// File-backed shared demo state.
// Next.js route handlers do not share module-level in-memory state, so the
// demo persists users, sessions, and paid access to a JSON file that every
// route handler reads and writes. This is a simulation for demonstration only
// and is not a real authentication system.

import { readFileSync, writeFileSync, existsSync, mkdirSync } from "node:fs";
import { join } from "node:path";

const DATA_DIR = join(process.cwd(), "data");
const STATE_FILE = join(DATA_DIR, "state.json");

export interface DemoState {
  users: Record<string, string>; // email -> password (plaintext, demo only)
  sessions: Record<string, string>; // token -> email
  paid: Record<string, boolean>; // email -> true
  checkouts: Record<string, { email: string; paid: boolean }>;
  processed: string[]; // webhook event ids already handled
}

const DEFAULT: DemoState = {
  users: {},
  sessions: {},
  paid: {},
  checkouts: {},
  processed: [],
};

export function readState(): DemoState {
  try {
    if (!existsSync(STATE_FILE)) return structuredClone(DEFAULT);
    return JSON.parse(readFileSync(STATE_FILE, "utf8")) as DemoState;
  } catch {
    return structuredClone(DEFAULT);
  }
}

export function writeState(state: DemoState): void {
  mkdirSync(DATA_DIR, { recursive: true });
  writeFileSync(STATE_FILE, JSON.stringify(state, null, 2), "utf8");
}

// Reads state, runs a mutating fn, writes back. Shared across route handlers
// via the filesystem.
export function withState<T>(fn: (state: DemoState) => { state: DemoState; result: T }): T {
  const state = readState();
  const out = fn(state);
  writeState(out.state);
  return out.result;
}

export function makeToken(): string {
  return `sess_${Math.random().toString(36).slice(2)}`;
}

export function registerUser(email: string, password: string): boolean {
  return withState((state) => {
    if (state.users[email]) return { state, result: false };
    state.users[email] = password;
    return { state, result: true };
  });
}

export function validateCredentials(email: string, password: string): boolean {
  return withState((state) => ({ state, result: state.users[email] === password }));
}

export function createSession(email: string): string {
  return withState((state) => {
    const token = makeToken();
    state.sessions[token] = email;
    return { state, result: token };
  });
}

export function validateSession(token: string): string | null {
  return withState((state) => ({ state, result: state.sessions[token] ?? null }));
}

export function destroySession(token: string): void {
  withState((state) => {
    delete state.sessions[token];
    return { state, result: undefined };
  });
}

export function setPaid(email: string, paid: boolean): void {
  withState((state) => {
    if (paid) state.paid[email] = true;
    else delete state.paid[email];
    return { state, result: undefined };
  });
}

export function isPaid(email: string): boolean {
  return withState((state) => ({ state, result: !!state.paid[email] }));
}

export function createCheckout(checkoutId: string, email: string): void {
  withState((state) => {
    state.checkouts[checkoutId] = { email, paid: false };
    return { state, result: undefined };
  });
}

export function markCheckoutPaid(checkoutId: string): boolean {
  return withState((state) => {
    const c = state.checkouts[checkoutId];
    if (!c || c.paid) return { state, result: false };
    c.paid = true;
    state.paid[c.email] = true;
    return { state, result: true };
  });
}

export function isProcessed(eventId: string): boolean {
  return withState((state) => ({ state, result: state.processed.includes(eventId) }));
}

export function markProcessed(eventId: string): void {
  withState((state) => {
    if (!state.processed.includes(eventId)) state.processed.push(eventId);
    return { state, result: undefined };
  });
}
