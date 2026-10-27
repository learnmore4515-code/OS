import { test, expect } from "@playwright/test";

function uniqueEmail(prefix = "user") {
  return `${prefix}-${Date.now()}-${Math.floor(Math.random() * 10000)}@example.com`;
}

test("checkout success grants paid access", async ({ page }) => {
  const email = uniqueEmail("checkout");
  await page.request.post("/api/auth/signup", { data: { email, password: "password123" } });
  await page.request.post("/api/auth/login", { data: { email, password: "password123" } });
  const create = await page.request.post("/api/checkout", { data: { priceId: "price_monthly_19" } });
  expect(create.status()).toBe(200);
  const { url } = await create.json();
  await page.goto(url);
  const me = await page.request.post("/api/auth/me");
  const body = await me.json();
  expect(body.authenticated).toBe(true);
  expect(body.paid).toBe(true);
});

test("cancelled checkout does not grant paid access", async ({ page }) => {
  const email = "demo@example.com";
  await page.request.post("/api/auth/signup", { data: { email, password: "password123" } });
  await page.request.post("/api/auth/login", { data: { email, password: "password123" } });
  await page.goto("/checkout/cancel");
  const me = await page.request.post("/api/auth/me");
  const body = await me.json();
  expect(body.paid).toBe(false);
});

test("webhooks are idempotent (duplicate events not double-processed)", async ({ request }) => {
  const payload = {
    type: "checkout.session.completed",
    data: { id: `evt_idem_${Date.now()}`, email: "idem@example.com" },
  };
  const r1 = await request.post("/api/webhook/stripe", { data: payload });
  const r2 = await request.post("/api/webhook/stripe", { data: payload });
  const b1 = await r1.json();
  const b2 = await r2.json();
  // First occurrence is not flagged as a duplicate (field absent/falsy); second is.
  expect(b1.duplicate).not.toBe(true);
  expect(b2.duplicate).toBe(true);
});
