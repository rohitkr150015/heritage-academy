import { defineConfig } from "@playwright/test";
export default defineConfig({
  webServer: {
    command:
      process.env.HERITAGE_QA_PRODUCTION === "1"
        ? "npm.cmd run preview -- --host 127.0.0.1 --port 8080"
        : "npm.cmd run dev -- --host 127.0.0.1",
    url: "http://127.0.0.1:8080",
    reuseExistingServer: true,
    timeout: 30000,
  },
  testDir: "./tests",
  testMatch: "**/*.spec.ts",
  timeout: 45000,
  expect: { timeout: 8000 },
  fullyParallel: false,
  workers: 1,
  use: {
    baseURL: "http://127.0.0.1:8080",
    browserName: "chromium",
    channel: "chrome",
    headless: true,
    viewport: { width: 1440, height: 1000 },
    trace: "retain-on-failure",
  },
  reporter: [["list"], ["json", { outputFile: "qa-results.json" }]],
  outputDir: "test-results",
});
