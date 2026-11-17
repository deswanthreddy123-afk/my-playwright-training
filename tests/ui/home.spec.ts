import { expect, test } from '@playwright/test';
import { LoginPage } from '../../src/pages/login.page';

test.describe('UI - DOS Planned Operations', () => {
  test('loads the requested planned-operations job', async ({ page }) => {
    const login = new LoginPage(page);

    await login.gotoPlannedOperations();

    await expect(page).toHaveURL(
      /test\.sperrydigital\.ienergy\.halliburton\.com\/digital-design-of-service\/planned-operations\?job=96f99f6b-6b24-4cea-9ff8-613eed2948ea/,
    );
  });
});
