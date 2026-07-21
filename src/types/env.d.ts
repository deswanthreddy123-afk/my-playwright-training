/// <reference types="node" />

/**
 * Type definitions for environment variables
 * This file provides TypeScript IntelliSense and type safety for process.env
 */

export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      // Browser & Environment Configuration
      BROWSER: 'chrome' | 'firefox' | 'webkit' | 'edge';
      ENV: 'test' | 'dev' | 'prod';
      HEADLESS: 'true' | 'false';

      // Application URLs
      BASE_URL: string;
      BASE_URL_API: string;
      LOGIN_URL?: string;
      ASSET_TRACKER_URL?: string;

      // Authentication Credentials
      USERNAME: string;
      PASSWORD: string;
      USERSINITIALS: string;
      TEST_USERNAME?: string;
      TEST_PASSWORD?: string;
      ADMIN_USERNAME?: string;
      ADMIN_PASSWORD?: string;

      // Playwright Browser Information
      PLAYWRIGHT_BROWSER_NAME?: string;
      PLAYWRIGHT_BROWSER_VERSION?: string;
      PLAYWRIGHT_OS_NAME?: string;
      PLAYWRIGHT_OS_VERSION?: string;

      // MCP Server Configuration
      MCP_SERVER_URL?: string;
      MCP_SERVER_PORT?: string;
      MCP_HEALTH_CHECK_TIMEOUT?: string;
      MCP_HEALTH_CHECK_RETRIES?: string;

      // Test Environment Configuration
      NODE_ENV?: 'development' | 'staging' | 'production' | 'test';
      CI?: 'true' | 'false';

      // Browser Configuration
      SLOW_MO?: string;
      TIMEOUT?: string;

      // Reporting & Logging
      LOG_LEVEL?: 'debug' | 'info' | 'warn' | 'error';
      REPORT_DIR?: string;
      SCREENSHOT_ON_FAILURE?: 'true' | 'false';
      VIDEO_ON_FAILURE?: 'true' | 'false';

      // Database Configuration (if needed)
      DB_HOST?: string;
      DB_PORT?: string;
      DB_NAME?: string;
      DB_USER?: string;
      DB_PASSWORD?: string;

      // API Configuration (if needed)
      API_BASE_URL?: string;
      API_KEY?: string;
      API_TIMEOUT?: string;

      // Feature Flags
      ENABLE_MCP?: 'true' | 'false';
      ENABLE_VISUAL_REGRESSION?: 'true' | 'false';
      ENABLE_ACCESSIBILITY_TESTS?: 'true' | 'false';

      // Parallel Execution
      WORKERS?: string;
      MAX_FAILURES?: string;

      // Custom Project Variables
      PROJECT_NAME?: string;
      TEST_DATA_PATH?: string;
      FIXTURES_PATH?: string;
    }
  }
}
