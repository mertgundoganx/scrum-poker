import { defineConfig, devices } from '@playwright/test';

// End-to-end tests against a running production build (see "Running the
// tests" in CONTRIBUTING.md). E2E_BASE_URL points them at another server.
export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: [['list']],
  use: {
    baseURL: process.env.E2E_BASE_URL ?? 'http://localhost:3100',
    trace: 'retain-on-failure',
  },
  projects: [
    { name: 'desktop', use: { ...devices['Desktop Chrome'] }, testIgnore: /layout\.spec\.ts/ },
    { name: 'mobile', use: { ...devices['Pixel 7'] }, testMatch: /pages\.spec\.ts/ },
    // The slow layout audit, `pnpm test:layout` only (`pnpm test:e2e` picks the two above).
    // Its tests make their own touch and mouse contexts.
    { name: 'layout', use: { ...devices['Desktop Chrome'] }, testMatch: /layout\.spec\.ts/ },
  ],
});
