/**
 * Environment Configuration Constants
 */

export const ENV = {
  BASE_URL: process.env.BASE_URL || 'https://default-url.com',
  BROWSER: process.env.BROWSER || 'chromium',
  HEADLESS: process.env.HEADLESS === 'true',
  ENV: process.env.ENV || 'dev',
  TIMEOUT: Number.parseInt(process.env.TIMEOUT || '30000', 10),
} as const;

export const AUTH = {
  USERNAME: process.env.USERNAME || '',
  PASSWORD: process.env.PASSWORD || '',
  MCP_SERVER_URL: process.env.MCP_SERVER_URL || 'http://localhost:3000',
} as const;

export const URLS = {
  LOGIN: `${ENV.BASE_URL}/login`,
  DASHBOARD: `${ENV.BASE_URL}/dashboard`,
  ASSET_TRACKER: `${ENV.BASE_URL}/asset-tracker`,
} as const;
