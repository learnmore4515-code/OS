export type Status = "PASS" | "FAIL" | "WARN" | "NOT_CHECKED" | "SKIPPED";
export interface CheckResult {
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
export interface CheckGroup {
    name: string;
    results: CheckResult[];
}
export interface RunReport {
    schemaVersion: "1";
    generatedAt: string;
    target: string;
    summary: {
        total: number;
        pass: number;
        fail: number;
        warn: number;
        skipped: number;
        notChecked: number;
    };
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
        passwordEnv: string;
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
        localForwarding: boolean;
    };
    timeouts?: {
        navigation: number;
        action: number;
    };
    safety: {
        allowRemoteStaging: boolean;
        allowStateChangingTests: boolean;
    };
}
export interface DoctorOptions {
    json: boolean;
}
//# sourceMappingURL=types.d.ts.map