import { defineConfig, devices, PlaywrightTestProject } from '@playwright/test';
import { defineBddConfig } from 'playwright-bdd';
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

const testDir = defineBddConfig({
  paths: ['tests/e2e/features/*.feature'],
  require: ['tests/e2e/steps/*.ts', 'src/fixtures/bdd-fixtures.ts'],
  disableWarnings: { importTestFrom: true },
});

export default defineConfig({
  testDir,
  fullyParallel: false,
  workers: process.env.WORKERS ? Number.parseInt(process.env.WORKERS, 10) : 1,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
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
    {
      name: `bdd-${cfg.browser}`,
      use: {
        ...getBrowserConfig(cfg.browser),
        ignoreHTTPSErrors: true,
        launchOptions: {
          args: ['--ignore-certificate-errors', '--ignore-ssl-errors'],
        },
      },
    },
  ],
});
