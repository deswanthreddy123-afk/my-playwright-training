import { expect, test } from '@playwright/test';
import { LoginPage } from '../../src/pages/login.page';

test('selects only the exact Deswanth Well card', async ({ page }) => {
  await page.setContent(`
    <button class="card-title" onclick="document.body.dataset.selected = 'other'">Deswanth Well Copy</button>
    <button class="card-title" onclick="document.body.dataset.selected = 'deswanth'">Deswanth Well</button>
  `);

  await new LoginPage(page).clickDeswanthWellCard();

  await expect(page.locator('body')).toHaveAttribute('data-selected', 'deswanth');
});

test('does not choose the first card when Deswanth Well is ambiguous', async ({ page }) => {
  await page.setContent(`
    <button class="card-title" onclick="document.body.dataset.selected = 'first'">Deswanth Well</button>
    <button class="card-title" onclick="document.body.dataset.selected = 'second'">Deswanth Well</button>
  `);

  await expect(new LoginPage(page).clickDeswanthWellCard()).rejects.toThrow(
    'Exactly one Deswanth Well card must be available',
  );
  await expect(page.locator('body')).not.toHaveAttribute('data-selected');
});
