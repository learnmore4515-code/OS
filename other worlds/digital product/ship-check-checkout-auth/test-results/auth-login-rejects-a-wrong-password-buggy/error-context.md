# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: auth.test.ts >> login rejects a wrong password
- Location: e2e\journeys\auth.test.ts:22:1

# Error details

```
Error: expect(received).toBe(expected) // Object.is equality

Expected: 401
Received: 200
```

# Test source

```ts
  1  | import { test, expect } from "@playwright/test";
  2  | 
  3  | function uniqueEmail(prefix = "user") {
  4  |   return `${prefix}-${Date.now()}-${Math.floor(Math.random() * 10000)}@example.com`;
  5  | }
  6  | 
  7  | test("signup creates an account", async ({ request }) => {
  8  |   const email = uniqueEmail();
  9  |   const res = await request.post("/api/auth/signup", { data: { email, password: "password123" } });
  10 |   expect(res.status()).toBe(200);
  11 |   const body = await res.json();
  12 |   expect(body.ok).toBe(true);
  13 | });
  14 | 
  15 | test("login with correct credentials succeeds", async ({ request }) => {
  16 |   const email = uniqueEmail();
  17 |   await request.post("/api/auth/signup", { data: { email, password: "password123" } });
  18 |   const res = await request.post("/api/auth/login", { data: { email, password: "password123" } });
  19 |   expect(res.status()).toBe(200);
  20 | });
  21 | 
  22 | test("login rejects a wrong password", async ({ request }) => {
  23 |   const email = uniqueEmail();
  24 |   await request.post("/api/auth/signup", { data: { email, password: "password123" } });
  25 |   const res = await request.post("/api/auth/login", { data: { email, password: "wrongpassword" } });
> 26 |   expect(res.status()).toBe(401);
     |                        ^ Error: expect(received).toBe(expected) // Object.is equality
  27 | });
  28 | 
```