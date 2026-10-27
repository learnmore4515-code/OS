import type { CheckResult, CheckGroup, ShipcheckConfig } from "./types.js";
export declare function reachable(baseUrl: string): Promise<CheckResult>;
export declare function routesRespond(config: ShipcheckConfig): Promise<CheckResult[]>;
export declare function envVarsPresent(names: string[]): CheckResult[];
export declare function stripeMode(config: ShipcheckConfig): CheckResult[];
export declare function configMismatches(config: ShipcheckConfig): CheckResult[];
export declare function testCredentials(config: ShipcheckConfig): CheckResult[];
export declare function doctor(config: ShipcheckConfig): Promise<CheckGroup[]>;
export declare function formatDoctor(groups: CheckGroup[], json: boolean): string;
//# sourceMappingURL=checks.d.ts.map