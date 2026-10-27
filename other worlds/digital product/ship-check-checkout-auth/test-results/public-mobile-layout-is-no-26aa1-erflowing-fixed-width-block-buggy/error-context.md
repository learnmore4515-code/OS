# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: public.test.ts >> mobile layout is not broken by an overflowing fixed-width block
- Location: e2e\journeys\public.test.ts:13:1

# Error details

```
Error: expect(locator).toHaveCount(expected) failed

Locator:  locator('div[style*="1200"]')
Expected: 0
Received: 1
Timeout:  5000ms

Call log:
  - Expect "toHaveCount" with timeout 5000ms
  - waiting for locator('div[style*="1200"]')
    13 × locator resolved to 1 element
       - unexpected value "1"

```

# Page snapshot

```yaml
- generic [ref=e2]:
  - heading "Healthy SaaS Demo" [level=1] [ref=e3]
  - paragraph [ref=e4]:
    - text: This is the
    - strong [ref=e5]: healthy
    - text: demonstration of SHIP CHECK. Signup, login, checkout, and paid access all behave correctly.
  - navigation [ref=e6]:
    - link "Home" [ref=e7] [cursor=pointer]:
      - /url: /
    - link "Login" [ref=e8] [cursor=pointer]:
      - /url: /login
    - link "Signup" [ref=e9] [cursor=pointer]:
      - /url: /signup
    - link "Checkout" [ref=e10] [cursor=pointer]:
      - /url: /checkout
    - link "Dashboard" [ref=e11] [cursor=pointer]:
      - /url: /dashboard
      - text: Dashboard (paid)
    - link "Broken link" [ref=e12] [cursor=pointer]:
      - /url: /nonexistent
  - generic [ref=e13]:
    - 'heading "Status: buggy" [level=2] [ref=e14]'
    - list [ref=e15]:
      - listitem [ref=e16]: Broken navigation link to /nonexistent.
      - listitem [ref=e17]: Login accepts any password (validation removed).
      - listitem [ref=e18]: Protected pages accessible without a session.
      - listitem [ref=e19]: Checkout cancellation incorrectly grants paid access.
      - listitem [ref=e20]: Webhooks are not idempotent (duplicates processed).
  - generic [ref=e21]: "Mobile layout broken: this 1200px-wide block overflows narrow viewports."
```

# Test source

```ts
  1  | import { test, expect } from "@playwright/test";
  2  | 
  3  | test("homepage loads", async ({ page }) => {
  4  |   await page.goto("/");
  5  |   await expect(page.locator("h1")).toBeVisible();
  6  | });
  7  | 
  8  | test("homepage has no broken navigation links", async ({ page }) => {
  9  |   await page.goto("/");
  10 |   await expect(page.locator('a[href="/nonexistent"]')).toHaveCount(0);
  11 | });
  12 | 
  13 | test("mobile layout is not broken by an overflowing fixed-width block", async ({ page }) => {
  14 |   await page.goto("/");
> 15 |   await expect(page.locator('div[style*="1200"]')).toHaveCount(0);
     |                                                    ^ Error: expect(locator).toHaveCount(expected) failed
  16 | });
  17 | 
```