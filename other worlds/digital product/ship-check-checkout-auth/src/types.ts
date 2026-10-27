// Shared types for the SHIP CHECK toolkit.

export type Status = "PASS" | "FAIL" | "WARN" | "NOT_CHECKED" | "SKIPPED";

export interface CheckResult {
  name: string;
  status: Status;
  what: string;          // what was checked
  expected: string;      // expected behaviour
  actual: string;        // actual outcome
  evidence?: string[];   // paths to evidence files
  likelyCause?: string;  // clearly distinguished from confirmed facts
  nextStep?: string;     // suggested diagnostic step
  skippedReason?: string;
}

export interface CheckGroup {
  name: string;
  results: CheckResult[];
}

export interface RunReport {
  schemaVersion: "1";
  generatedAt: string;
  target: string;
  summary: { total: number; pass: number; fail: number; warn: number; skipped: number; notChecked: number };
  groups: CheckGroup[];
}

export interface ShipcheckConfig {
  baseUrl: string;
  name: string;
  routes: {
    home: string;
    login: string;
    signup: string;
    protected: string;
    checkout: string;
    success: string;
    cancel: string;
  };
  selectors?: {
    loginEmail?: string;
    loginPassword?: string;
    loginSubmit?: string;
    checkoutButton?: string;
  };
  testUsers?: {
    email: string;
    passwordEnv: string; // env var holding the password, never the password itself
  }[];
  stripe?: {
    secretKeyEnv: string;
    publishableKeyEnv: string;
    mode: "test" | "live" | "unknown";
    webhook?: {
      enabled: boolean;
      localForwarding: boolean;
      endpoint?: string;
      secretEnv?: string;
    };
  };
  webhook?: {
    enabled: boolean;
    localForwarding: boolean; // uses stripe listen
  };
  timeouts?: {
    navigation: number;
    action: number;
  };
  safety: {
    allowRemoteStaging: boolean; // explicit opt-in for remote target
    allowStateChangingTests: boolean; // explicit opt-in for mutating tests
  };
}

export interface DoctorOptions {
  json: boolean;
}
