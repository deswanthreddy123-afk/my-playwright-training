export type AppEnv = 'dev' | 'qa' | 'stage' | 'prod' | 'local';
export type BrowserType = 'chromium' | 'firefox' | 'webkit' | 'chrome' | 'edge';

type Config = {
  baseURL: string;
  apiBaseURL: string;
  browser: BrowserType;
  headless: boolean;
  slowMo: number;
};

const configs: Record<AppEnv, Config> = {
  // TODO: Update these URLs with your application's endpoints
  // Override with environment variables: BASE_URL, API_BASE_URL, BROWSER
  local: {
    baseURL: 'http://localhost:3000', // TODO: Update with your local app URL
    apiBaseURL: 'http://localhost:3000/api', // TODO: Update with your API endpoint
    browser: 'chromium',
    headless: false,
    slowMo: 0,
  },
  dev: {
    baseURL: 'https://dev.example.com',
    apiBaseURL: 'https://dev.example.com/api',
    browser: 'chromium',
    headless: false,
    slowMo: 0,
  },
  qa: {
    baseURL: 'https://qa.example.com',
    apiBaseURL: 'https://qa.example.com/api',
    browser: 'chromium',
    headless: false,
    slowMo: 0,
  },
  stage: {
    baseURL: 'https://stage.example.com',
    apiBaseURL: 'https://stage.example.com/api',
    browser: 'chromium',
    headless: false,
    slowMo: 0,
  },
  prod: {
    baseURL: 'https://example.com',
    apiBaseURL: 'https://example.com/api',
    browser: 'chromium',
    headless: true,
    slowMo: 0,
  },
};

export function getConfig(env: AppEnv = (process.env.APP_ENV as AppEnv) ?? 'local'): Config {
  const base = configs[env];
  return {
    baseURL: process.env.BASE_URL ?? base.baseURL,
    apiBaseURL: process.env.API_BASE_URL ?? base.apiBaseURL,
    browser: (process.env.BROWSER as BrowserType) ?? base.browser,
    headless: process.env.HEADLESS === 'true' ? true : base.headless,
    slowMo: process.env.SLOW_MO ? Number.parseInt(process.env.SLOW_MO, 10) : base.slowMo,
  };
}
