/**
 * Example Usage of Framework Types
 * This file demonstrates how to use the type definitions in the framework
 */

// ============================================
// 1. Environment Variables (Auto-typed)
// ============================================

// TypeScript now provides autocomplete and type checking for process.env
const _baseUrl = process.env.BASE_URL; // string | undefined
const _nodeEnv = process.env.NODE_ENV; // 'development' | 'staging' | 'production' | 'test' | undefined
const _mcpPort = process.env.MCP_SERVER_PORT; // string | undefined

// With type guards for safe usage
if (process.env.NODE_ENV === 'production') {
  console.log('Running in production mode');
}

// ============================================
// 2. Custom Types from Framework
// ============================================

// import type { Page } from '@playwright/test';
import type {
  BrowserConfig,
  Connector,
  McpSelector,
  // PageObject,
  TestReport,
  TestUser,
} from '../types';

// Example: Define test users with type safety
const adminUser: TestUser = {
  username: 'admin',
  password: 'admin123',
  role: 'admin',
  email: 'admin@example.com',
};

const testUser: TestUser = {
  username: 'autotest',
  password: 'Password123',
  role: 'user',
};

// Example: Define connector data
const testConnector: Connector = {
  name: 'Test Insite Connector',
  ipAddress: '10.133.88.157',
  username: 'sa',
  password: 'password123',
  type: 'Insite',
  status: 'pending',
};

// Example: Browser configuration
const browserConfig: BrowserConfig = {
  browserType: 'edge',
  headless: false,
  slowMo: 100,
  viewport: {
    width: 1920,
    height: 1080,
  },
};

// Example: MCP selector data
const _mcpSelector: McpSelector = {
  type: 'connector',
  field: 'addButton',
  selector: 'button:has-text("Add Data Connector")',
  lastUpdated: new Date().toISOString(),
};

// Example: Test report structure
const _testReport: TestReport = {
  total: 5,
  passed: 4,
  failed: 1,
  skipped: 0,
  duration: 125000,
  timestamp: new Date().toISOString(),
};

// ============================================
// 3. Type Guards and Utility Functions
// ============================================

function isValidBrowserType(browser: string): browser is BrowserConfig['browserType'] {
  return ['chromium', 'firefox', 'webkit', 'edge'].includes(browser);
}

function getTestUserByRole(role: TestUser['role']): TestUser | null {
  const users: TestUser[] = [adminUser, testUser];
  return users.find((user) => user.role === role) || null;
}

// ============================================
// 4. Using Types in Page Objects
// ============================================

/* Example page class - uncomment to use
class ExamplePage implements PageObject {
  constructor(private readonly page: Page) {}

  async goto(): Promise<void> {
    await this.page.goto(process.env.BASE_URL || 'https://example.com');
  }

  async isLoaded(): Promise<boolean> {
    return await this.page.isVisible('body');
  }
}
*/

// ============================================
// 5. Exporting for Use in Tests
// ============================================

export { adminUser, browserConfig, getTestUserByRole, isValidBrowserType, testConnector, testUser };
