import { defineConfig, devices, PlaywrightTestProject } from '@playwright/test';
import { getConfig } from './src/config/env';

const cfg = getConfig();

// Helper to get browser-specific config based on environment
function getBrowserConfig(browser: string): Partial<PlaywrightTestProject['use']> {
  const browserConfigs: Record<string, Partial<PlaywrightTestProject['use']>> = {
    chromium: {
      ...devices['Desktop Chrome'],
    },
    chrome: {
      ...devices['Desktop Chrome'],
      channel: 'chrome',
    },
    edge: {
      ...devices['Desktop Edge'],
      channel: 'msedge',
    },
    firefox: {
      ...devices['Desktop Firefox'],
    },
    webkit: {
      ...devices['Desktop Safari'],
    },
  };

  return browserConfigs[browser] || browserConfigs.chromium;
}

export default defineConfig({
  testDir: './tests',
  testMatch: ['**/*.spec.ts', '**/*.spec.js'],
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.WORKERS ? Number.parseInt(process.env.WORKERS, 10) : 1,
  reporter: [
    ['list'],
    ['html', { open: 'never', outputFolder: 'playwright-report' }],
    ['json', { outputFile: 'test-results/results.json' }],
  ],
  globalSetup: require.resolve('./src/config/globalSetup.ts'),
  use: {
    baseURL: cfg.baseURL,
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    headless: cfg.headless,
    ignoreHTTPSErrors: true,
    actionTimeout: 15000,
    navigationTimeout: 30000,
  },
  projects: [
    // UI tests - browser configurable via BROWSER env var
    {
      name: `ui-${cfg.browser}`,
      testDir: './tests/ui',
      use: {
        ...getBrowserConfig(cfg.browser),
        ignoreHTTPSErrors: true,
      },
    },
    // E2E BDD tests - browser configurable via BROWSER env var
    {
      name: `e2e-${cfg.browser}`,
      testDir: './tests/e2e',
      use: {
        ...getBrowserConfig(cfg.browser),
        ignoreHTTPSErrors: true,
      },
    },
    // API suite (uses built-in APIRequestContext, no browser)
    {
      name: 'api',
      testDir: './tests/api',
      use: { ignoreHTTPSErrors: true },
    },
  ],
});
