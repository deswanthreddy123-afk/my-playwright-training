/**
 * Framework Type Definitions
 * Export custom types for use across the framework
 */

// Re-export environment types (automatically loaded via env.d.ts)

/**
 * Custom Test Data Types
 */
export interface TestUser {
  username: string;
  password: string;
  role?: 'admin' | 'user' | 'viewer';
  email?: string;
}

export interface Connector {
  name: string;
  ipAddress: string;
  username?: string;
  password?: string;
  type?: 'Insite' | 'SQL Server' | 'Custom';
  status?: 'connected' | 'disconnected' | 'pending';
}

/**
 * Page Object Base Types
 */
export interface PageObject {
  goto(): Promise<void>;
  isLoaded(): Promise<boolean>;
}

/**
 * MCP Types
 */
export interface McpSelector {
  type: string;
  field: string;
  selector: string;
  lastUpdated?: string;
}

export interface McpResponse {
  success: boolean;
  selector?: string;
  error?: string;
}

/**
 * Test Result Types
 */
export interface TestMetadata {
  testName: string;
  duration: number;
  status: 'passed' | 'failed' | 'skipped';
  retries?: number;
  screenshot?: string;
  video?: string;
}

/**
 * Browser Configuration Types
 */
export type BrowserType = 'chromium' | 'firefox' | 'webkit' | 'edge';

export interface BrowserConfig {
  browserType: BrowserType;
  headless: boolean;
  slowMo?: number;
  viewport?: {
    width: number;
    height: number;
  };
}

/**
 * Reporting Types
 */
export interface TestReport {
  total: number;
  passed: number;
  failed: number;
  skipped: number;
  duration: number;
  timestamp: string;
}
