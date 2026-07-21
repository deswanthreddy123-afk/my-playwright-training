import { chromium, firefox, webkit, type Browser, type BrowserType } from '@playwright/test';

export type BrowserName = 'chromium' | 'firefox' | 'webkit';

const types: Record<BrowserName, BrowserType> = { chromium, firefox, webkit } as const;

export async function launch(name: BrowserName = 'chromium'): Promise<Browser> {
  return types[name].launch();
}
