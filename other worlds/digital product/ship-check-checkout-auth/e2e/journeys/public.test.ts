import { test, expect } from "@playwright/test";

test("homepage loads", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator("h1")).toBeVisible();
});

test("homepage has no broken navigation links", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator('a[href="/nonexistent"]')).toHaveCount(0);
});

test("mobile layout is not broken by an overflowing fixed-width block", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator('div[style*="1200"]')).toHaveCount(0);
});
