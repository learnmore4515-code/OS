# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: checkout.test.ts >> webhooks are idempotent (duplicate events not double-processed)
- Location: e2e\journeys\checkout.test.ts:31:1

# Error details

```
Error: expect(received).toBe(expected) // Object.is equality

Expected: true
Received: undefined
```

# Test source

```ts
  1  | import { test, expect } from "@playwright/test";
  2  | 
  3  | function uniqueEmail(prefix = "user") {
  4  |   return `${prefix}-${Date.now()}-${Math.floor(Math.random() * 10000)}@example.com`;
  5  | }
  6  | 
  7  | test("checkout success grants paid access", async ({ page }) => {
  8  |   const email = uniqueEmail("checkout");
  9  |   await page.request.post("/api/auth/signup", { data: { email, password: "password123" } });
  10 |   await page.request.post("/api/auth/login", { data: { email, password: "password123" } });
  11 |   const create = await page.request.post("/api/checkout", { data: { priceId: "price_monthly_19" } });
  12 |   expect(create.status()).toBe(200);
  13 |   const { url } = await create.json();
  14 |   await page.goto(url);
  15 |   const me = await page.request.post("/api/auth/me");
  16 |   const body = await me.json();
  17 |   expect(body.authenticated).toBe(true);
  18 |   expect(body.paid).toBe(true);
  19 | });
  20 | 
  21 | test("cancelled checkout does not grant paid access", async ({ page }) => {
  22 |   const email = "demo@example.com";
  23 |   await page.request.post("/api/auth/signup", { data: { email, password: "password123" } });
  24 |   await page.request.post("/api/auth/login", { data: { email, password: "password123" } });
  25 |   await page.goto("/checkout/cancel");
  26 |   const me = await page.request.post("/api/auth/me");
  27 |   const body = await me.json();
  28 |   expect(body.paid).toBe(false);
  29 | });
  30 | 
  31 | test("webhooks are idempotent (duplicate events not double-processed)", async ({ request }) => {
  32 |   const payload = {
  33 |     type: "checkout.session.completed",
  34 |     data: { id: `evt_idem_${Date.now()}`, email: "idem@example.com" },
  35 |   };
  36 |   const r1 = await request.post("/api/webhook/stripe", { data: payload });
  37 |   const r2 = await request.post("/api/webhook/stripe", { data: payload });
  38 |   const b1 = await r1.json();
  39 |   const b2 = await r2.json();
  40 |   // First occurrence is not flagged as a duplicate (field absent/falsy); second is.
  41 |   expect(b1.duplicate).not.toBe(true);
> 42 |   expect(b2.duplicate).toBe(true);
     |                        ^ Error: expect(received).toBe(expected) // Object.is equality
  43 | });
  44 | 
```