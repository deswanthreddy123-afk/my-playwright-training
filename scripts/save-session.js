// Opens a headed browser, clicks "Login with Halliburton Account" and waits for you
// to finish the Microsoft sign-in (+ MFA). The authenticated session is saved to
// .auth/user.json so tests can run with REUSE_SESSION=true.
const { chromium, expect } = require('@playwright/test');
const fs = require('node:fs');
const path = require('node:path');

const APP_URL = 'https://test.sperrydigital.ienergy.halliburton.com/digital-design-of-service/home';
const PLANNED_OPERATIONS_URL =
  'https://test.sperrydigital.ienergy.halliburton.com/digital-design-of-service/planned-operations?job=96f99f6b-6b24-4cea-9ff8-613eed2948ea';
const STORAGE_STATE = path.join(process.cwd(), '.auth', 'user.json');

(async () => {
  const browser = await chromium.launch({ headless: false });
  try {
    const context = await browser.newContext({
      ignoreHTTPSErrors: true,
      viewport: null,
      geolocation: { latitude: 29.7604, longitude: -95.3698 },
      permissions: ['geolocation'],
      storageState: fs.existsSync(STORAGE_STATE) ? STORAGE_STATE : undefined,
    });
    const page = await context.newPage();
    await page.goto(APP_URL, { waitUntil: 'domcontentloaded' });
    console.log('Complete the Halliburton sign-in in the browser window. Keep it open until the session is saved.');

    const allWells = page.getByText('All Wells', { exact: true });
    const chooser = page.getByRole('button', { name: /Login with Halliburton Account/ });
    const needsSignIn = await Promise.race([
      chooser.waitFor({ state: 'visible', timeout: 10 * 60 * 1000 }).then(() => true),
      allWells.waitFor({ state: 'visible', timeout: 10 * 60 * 1000 }).then(() => false),
    ]);
    if (needsSignIn) {
      await chooser.click();
    }

    await allWells.waitFor({ state: 'visible', timeout: 10 * 60 * 1000 });
    await expect(page).toHaveURL(APP_URL);
    await page.goto(PLANNED_OPERATIONS_URL, { waitUntil: 'domcontentloaded' });
    await expect(page).toHaveURL(PLANNED_OPERATIONS_URL, { timeout: 30000 });

    fs.mkdirSync(path.dirname(STORAGE_STATE), { recursive: true });
    await context.storageState({ path: STORAGE_STATE });
    console.log(`Session saved to ${STORAGE_STATE}`);
  } finally {
    await browser.close();
  }
})().catch((error) => {
  console.error('Session was not saved:', error.message);
  process.exitCode = 1;
});
