import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: "list",
  timeout: 60_000,
  use: {
    baseURL: "http://localhost:2021",
    trace: "on-first-retry",
    serviceWorkers: "block",
  },
  projects: [
    { name: "desktop-chrome", use: { ...devices["Desktop Chrome"] } },
    { name: "mobile-safari", use: { ...devices["iPhone 13"] } },
  ],
  webServer: [
    {
      command: "npm run dev",
      url: "http://localhost:2020/health",
      cwd: "../trainforge-api",
      reuseExistingServer: !process.env.CI,
      timeout: 120_000,
    },
    {
      command: "npm run dev",
      url: "http://localhost:2021",
      cwd: ".",
      reuseExistingServer: !process.env.CI,
      timeout: 120_000,
    },
  ],
});
