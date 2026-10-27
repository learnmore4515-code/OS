import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./e2e/journeys",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 2 : undefined,
  reporter: "list",
  use: {
    trace: "on-first-retry",
  },
  projects: [
    {
      name: "healthy",
      use: { baseURL: "http://localhost:3000" },
      webServer: {
        command: "bash e2e/serve-healthy.sh",
        port: 3000,
        timeout: 180 * 1000,
        reuseExistingServer: !process.env.CI,
      },
    },
    {
      name: "buggy",
      use: { baseURL: "http://localhost:3001" },
      webServer: {
        command: "bash e2e/serve-buggy.sh",
        port: 3001,
        timeout: 180 * 1000,
        reuseExistingServer: !process.env.CI,
      },
    },
  ],
});
