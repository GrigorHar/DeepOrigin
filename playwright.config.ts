import { defineConfig, devices } from '@playwright/test';

/**
 * Playwright configuration for API testing
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [
    ['html', { outputFolder: 'playwright-report' }],
    ['list'],
    ['json', { outputFile: 'test-results.json' }]
  ],
  use: {
    baseURL: 'https://dummyjson.com',
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'api-tests',
      use: {
        ...devices['Desktop Chrome'],
      },
    },
  ],
  timeout: 30000,
});
