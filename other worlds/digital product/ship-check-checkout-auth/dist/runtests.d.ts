import type { ShipcheckConfig } from "./types.js";
export interface BrowserResult {
    journey: string;
    test: string;
    status: "PASS" | "FAIL" | "WARN" | "NOT_CHECKED" | "SKIPPED";
    actual: string;
    evidence?: string[];
    nextStep?: string;
}
export declare function runBrowserTests(cwd: string, config: ShipcheckConfig, journey: string | undefined): Promise<void>;
//# sourceMappingURL=runtests.d.ts.map