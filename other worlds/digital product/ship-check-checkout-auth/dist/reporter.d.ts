import type { Status } from "./types.js";
export interface RunOptions {
    target: string;
    groups: CheckGroupLike[];
    browserResults?: BrowserResult[];
    outDir: string;
}
export interface CheckGroupLike {
    name: string;
    results: CheckResultLike[];
}
export interface CheckResultLike {
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
export interface BrowserResult {
    journey: string;
    test: string;
    status: Status;
    actual: string;
    evidence?: string[];
    nextStep?: string;
}
export declare function summarize(groups: CheckGroupLike[], browserResults?: BrowserResult[]): {
    total: number;
    pass: number;
    fail: number;
    warn: number;
    skipped: number;
    notChecked: number;
};
export declare function toMarkdown(opts: RunOptions): string;
export declare function toJSON(opts: RunOptions): string;
export declare function toHTML(opts: RunOptions): string;
export declare function writeReport(opts: RunOptions, formats?: ("md" | "json" | "html")[]): string[];
//# sourceMappingURL=reporter.d.ts.map