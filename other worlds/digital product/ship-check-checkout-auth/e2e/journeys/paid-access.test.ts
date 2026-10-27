import { test, expect } from "@playwright/test";

test("protected dashboard requires a session", async ({ page }) => {
  await page.goto("/dashboard");
  await expect(page).toHaveURL(/.*\/login/);
});

test("me reports not authenticated without a session", async ({ request }) => {
  const res = await request.post("/api/auth/me");
  expect(res.status()).toBe(401);
  const body = await res.json();
  expect(body.authenticated).toBe(false);
});
