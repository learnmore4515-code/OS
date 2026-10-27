import { test, expect } from "@playwright/test";

function uniqueEmail(prefix = "user") {
  return `${prefix}-${Date.now()}-${Math.floor(Math.random() * 10000)}@example.com`;
}

test("signup creates an account", async ({ request }) => {
  const email = uniqueEmail();
  const res = await request.post("/api/auth/signup", { data: { email, password: "password123" } });
  expect(res.status()).toBe(200);
  const body = await res.json();
  expect(body.ok).toBe(true);
});

test("login with correct credentials succeeds", async ({ request }) => {
  const email = uniqueEmail();
  await request.post("/api/auth/signup", { data: { email, password: "password123" } });
  const res = await request.post("/api/auth/login", { data: { email, password: "password123" } });
  expect(res.status()).toBe(200);
});

test("login rejects a wrong password", async ({ request }) => {
  const email = uniqueEmail();
  await request.post("/api/auth/signup", { data: { email, password: "password123" } });
  const res = await request.post("/api/auth/login", { data: { email, password: "wrongpassword" } });
  expect(res.status()).toBe(401);
});
