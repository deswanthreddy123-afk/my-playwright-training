import { createBdd } from 'playwright-bdd';
import { test } from '../fixtures/bdd-fixtures';
import { LoginPage } from '../pages/login.page';

const { Before, After, BeforeAll, AfterAll } = createBdd(test);

// URLs used to detect authentication state.
const LOGIN_URL  = 'https://authentik.sperrydigital-dev.ienergy.halliburton.com/if/flow/hal-local-authentication-flow/';
const APP_DOMAIN = 'test.sperrydigital.ienergy.halliburton.com';

/**
 * Returns true when the browser is on an authenticated app page.
 * Returns false when it has been redirected back to the authentik login page
 * or to any other non-app URL (e.g. after a session timeout).
 */
async function isLoggedIn(page: import('@playwright/test').Page): Promise<boolean> {
  const url = page.url();
  return url.includes(APP_DOMAIN) && !url.includes('authentik');
}

/**
 * Performs a full login and lands on the DOS home page.
 * Used by both the recovery After hook and the defensive Before hook.
 */
async function reLogin(page: import('@playwright/test').Page): Promise<void> {
  const loginPage = new LoginPage(page);
  await loginPage.navigate();
  await loginPage.login();
  await loginPage.gotoDOS();
  console.log('[Hook] Re-login completed — session restored.');
}

// ────────────────────────────────────────────────────────────────────────────
// Suite-level hooks
// ────────────────────────────────────────────────────────────────────────────

BeforeAll(async () => {
  console.log('=== Test Suite Started ===');
});

AfterAll(async () => {
  console.log('=== Test Suite Finished ===');
});

// ────────────────────────────────────────────────────────────────────────────
// Scenario-level hooks
// ────────────────────────────────────────────────────────────────────────────

/**
 * Runs BEFORE each scenario.
 * - Sets viewport to full HD.
 * - If the browser session has expired (URL is on the login/authentik page),
 *   re-authenticates so the next scenario starts from a valid state.
 */
Before(async ({ page, browserName }) => {
  console.log(`[Before] Starting scenario on browser: ${browserName}`);
  await page.setViewportSize({ width: 1920, height: 1080 });

  // Defensive login check: if the session was lost (e.g. after a previous
  // failure), re-login before the Background steps try to navigate.
  const url = page.url();
  const sessionLost =
    url === 'about:blank' ||                  // fresh page
    url.includes('authentik') ||              // redirected to login page
    (!url.includes(APP_DOMAIN) && url !== 'about:blank'); // any other unexpected page

  if (sessionLost && url !== 'about:blank') {
    console.log(`[Before] Session lost (URL: ${url}). Re-logging in...`);
    await reLogin(page);
  }
});

/**
 * Runs AFTER each scenario.
 * - Takes a full-page screenshot on failure.
 * - If the scenario failed, performs a fresh login so the NEXT scenario
 *   starts from a clean authenticated session instead of a broken state.
 */
After(async ({ page }) => {
  const testInfo = test.info();
  const failed = testInfo.status !== testInfo.expectedStatus;

  if (failed) {
    // Capture screenshot for debugging.
    const screenshotPath = `test-results/screenshots/${testInfo.title.replace(/[^a-zA-Z0-9_-]/g, '_')}.png`;
    await page.screenshot({ path: screenshotPath, fullPage: true }).catch(() => undefined);
    console.log(`[After] FAILED — screenshot saved: ${screenshotPath}`);

    // Dismiss any open dialog/overlay that might be blocking the page,
    // then navigate back to a known good state (logged-in DOS home).
    await page.keyboard.press('Escape').catch(() => undefined);
    await page.waitForTimeout(500);

    console.log('[After] Scenario failed — re-logging in for next scenario...');
    await reLogin(page).catch((err) =>
      console.error(`[After] Re-login failed: ${err.message}`)
    );
  }

  console.log(`[After] Scenario "${testInfo.title}" finished — status: ${testInfo.status}`);
});

/**
 * Runs before each scenario tagged with @login.
 * Navigates directly to the login page.
 */
Before({ tags: '@login' }, async ({ page }) => {
  console.log('[Before @login] Navigating to login page');
  await page.goto(LOGIN_URL);
});


/**
 * Runs before each scenario tagged with @dos.
 * Navigates directly to the DOS home page.
 */
Before({ tags: '@dos' }, async ({ page }) => {
  console.log('[Before @dos] Navigating to DOS home page');
  await page.goto(
    'https://test.sperrydigital.ienergy.halliburton.com/digital-design-of-service/home',
    { waitUntil: 'domcontentloaded' },
  );
  await page.waitForLoadState('networkidle').catch(() => undefined);
});
