import { expect, Locator, Page, test } from '@playwright/test';
import { URL } from 'node:url';

// Rich text editor with Undo/Translate buttons, scoped to a container that holds exactly one editor.
export class RichTextEditor {
  private enteredText = '';

  constructor(
    private readonly page: Page,
    private readonly container: Locator,
    // Part of the page with no controls, used to take focus out of the editor.
    private readonly emptyArea: Locator,
    private readonly label: string,
  ) {}

  private get editor(): Locator {
    return this.container.locator('.ql-editor');
  }

  // Toolbar button names start with an icon glyph, so match the visible text at the end.
  private get translateButton(): Locator {
    return this.container.getByRole('button', { name: /Translate$/ });
  }

  async enterText(text: string): Promise<void> {
    await expect(this.editor).toBeVisible();
    if ((await this.editor.innerText()).trim() !== '') {
      await this.deleteExistingText();
    }
    await this.typeText(text);
    this.enteredText = text;
  }

  // Previously saved text is removed, and that removal saved, before the new text is typed.
  private async deleteExistingText(): Promise<void> {
    await this.editor.click();
    await this.typeText('');
    await this.waitForSaveAfter(() => this.emptyArea.click({ position: { x: 2, y: 2 } }), '');
    await expect(this.editor).toHaveText('');
  }

  private typed = false;

  private async typeText(text: string): Promise<void> {
    await this.editor.click();
    // Input typed while the editor lock is being acquired can be discarded, so retry until it sticks.
    await expect(async () => {
      const lock = this.page
        .waitForResponse(
          (response) =>
            response.url().includes('/digital-design-of-service/api/v1/editor-lock') &&
            response.request().method() === 'POST',
          { timeout: this.typed ? 3000 : 10000 },
        )
        .catch(() => undefined);
      await this.editor.fill(text, { timeout: 5000 });
      await lock;
      await expect(this.editor).toHaveText(text, { timeout: 3000 });
    }).toPass({ timeout: 60000 });
    this.typed = true;
  }

  // Runs the action that makes the editor save, and checks the request carries the expected text.
  private async waitForSaveAfter(action: () => Promise<void>, expectedText: string): Promise<void> {
    const saved = this.page.waitForResponse(
      (response) =>
        new URL(response.url()).pathname === '/digital-design-of-service/api/v1/files' &&
        response.request().method() === 'POST' &&
        (response.request().postData() ?? '').includes('"TextContent"'),
      { timeout: 15000 },
    );
    await action();
    const response = await saved;
    expect(response.ok(), `Saving ${this.label} failed with HTTP ${response.status()}`).toBeTruthy();
    // The request carries the editor HTML as base64; compare the visible text only.
    const encoded = /"TextContent":"([^"]*)"/.exec(response.request().postData() ?? '')?.[1] ?? '';
    const requestText = Buffer.from(encoded, 'base64')
      .toString('utf8')
      .replace(/<[^>]*>/g, '')
      .replaceAll('&nbsp;', ' ');
    expect(requestText).toBe(expectedText);
  }

  async saveByClickingEmptyArea(): Promise<void> {
    expect(this.enteredText, `No text was entered in ${this.label} before saving`).not.toBe('');
    // Leaving the editor saves its content.
    await this.waitForSaveAfter(
      () => this.emptyArea.click({ position: { x: 2, y: 2 } }),
      this.enteredText,
    );
    await expect(this.editor).toHaveText(this.enteredText);
  }

  async clickTranslate(): Promise<void> {
    await expect(this.translateButton).toBeEnabled();
    await this.translateButton.click();
  }

  async verifySavedText(): Promise<void> {
    expect(this.enteredText, `No text was entered in ${this.label} before verifying`).not.toBe('');
    await expect(this.editor).toHaveText(this.enteredText, { timeout: 30000 });
  }

  async verifyTranslated(): Promise<void> {
    expect(this.enteredText, `No text was entered in ${this.label} before translating`).not.toBe('');
    // The translation is Latin-script text, so any remaining Kannada characters mean it did not translate.
    await expect(this.editor).toHaveText(/^[A-Za-z][A-Za-z .'-]*$/, { timeout: 30000 });
    const translated = (await this.editor.innerText()).trim();
    expect(translated).not.toBe(this.enteredText);
    test.info().annotations.push({
      type: 'translation',
      description: `${this.label}: ${this.enteredText} -> ${translated}`,
    });
  }
}
