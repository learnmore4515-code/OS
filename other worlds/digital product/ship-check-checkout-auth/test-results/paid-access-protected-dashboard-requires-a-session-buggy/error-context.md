# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: paid-access.test.ts >> protected dashboard requires a session
- Location: e2e\journeys\paid-access.test.ts:3:1

# Error details

```
Error: expect(page).toHaveURL(expected) failed

Expected pattern: /.*\/login/
Received string:  "http://localhost:3001/dashboard"
Timeout: 5000ms

Call log:
  - Expect "toHaveURL" with timeout 5000ms
    12 × locator resolved to <html lang="en">…</html>
       - unexpected value "http://localhost:3001/dashboard"

```

```yaml
- heading "Dashboard" [level=1]
- paragraph: Loading…
```

# Test source

```ts
  1  | import { test, expect } from "@playwright/test";
  2  | 
  3  | test("protected dashboard requires a session", async ({ page }) => {
  4  |   await page.goto("/dashboard");
> 5  |   await expect(page).toHaveURL(/.*\/login/);
     |                      ^ Error: expect(page).toHaveURL(expected) failed
  6  | });
  7  | 
  8  | test("me reports not authenticated without a session", async ({ request }) => {
  9  |   const res = await request.post("/api/auth/me");
  10 |   expect(res.status()).toBe(401);
  11 |   const body = await res.json();
  12 |   expect(body.authenticated).toBe(false);
  13 | });
  14 | 
```