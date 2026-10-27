import type { ShipcheckConfig } from "./types.js";
export declare function loadConfig(configPath: string): ShipcheckConfig;
export declare function detectProductionUrl(baseUrl: string): boolean;
export declare function inspectEnv(varNames: string[]): Record<string, string>;
export declare function validateConfig(config: ShipcheckConfig): string[];
//# sourceMappingURL=config.d.ts.map