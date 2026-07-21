# Playwright + MCP Testing Framework Template

A **reusable template** for end-to-end testing that combines **Playwright** with **Model Context Protocol (MCP)** for robust, self-healing UI automation with dynamic selector resolution.

> **This is a template framework** ready to be customized for any web application. See [TEMPLATE_CUSTOMIZATION.md](docs/TEMPLATE_CUSTOMIZATION.md) for setup guide.

## 🏗️ Framework Architecture

This framework addresses common UI testing challenges including dynamic content, changing selectors, and cross-platform browser testing.

### Key Components:

- **Playwright**: Cross-browser automation (Chromium, Chrome, Firefox, Edge, WebKit)
- **MCP Server**: Custom Model Context Protocol server for self-healing selectors
- **BDD Support**: Cucumber integration with playwright-bdd
- **Page Object Model**: Clean separation of test logic and page interactions
- **TypeScript**: Full type safety and IntelliSense support
- **Configurable Browsers**: Cross-platform browser selection

## 📋 Prerequisites

### System Requirements:

- **Operating System**: Windows, macOS, or Linux
- **Node.js** v18+
- **Git** for version control
- **Visual Studio Code** (recommended IDE)

### Browser Requirements:

- **Chromium** (included with Playwright)
- **Chrome** (optional, for branded Chrome testing)
- **Firefox** (optional, for Firefox testing)
- **Edge** (optional, default for Windows local development)
- **WebKit** (included with Playwright, for Safari-like testing)

> **Note**: Playwright automatically downloads Chromium, Firefox, and WebKit. Chrome and Edge require separate installation if you want to use the branded versions.

## 🎯 Quick Start

### For Complete Beginners:

👉 **Start here**: [GETTING_STARTED.md](docs/GETTING_STARTED.md) - Complete guide from installing VS Code to running tests

### For New Projects (Using This Template):

1. **Read the customization guide**: [TEMPLATE_CUSTOMIZATION.md](docs/TEMPLATE_CUSTOMIZATION.md)
2. **Update environment config**: Modify `src/config/env.ts` with your app URLs
3. **Customize page objects**: Update `src/pages/LoginPage.ts` and `src/pages/HomePage.ts`
4. **Update MCP selectors**: Modify `src/mcp-server.js` with your selectors
5. **Create your tests**: Use templates in `tests/` as starting points

### Running Tests:

```bash
# Install dependencies
npm install

# Run all tests
npm test

# Run UI tests only
npm run test:ui

# Run E2E BDD tests
npm run test:e2e

# Run API tests
npm run test:api

# Run with specific browser
BROWSER=firefox npm test  # Linux/Mac
$env:BROWSER="firefox"; npm test  # Windows PowerShell
```

## 📂 Template Structure

```
pw_mcp_poc/
├── src/
│   ├── pages/
│   │   ├── BasePage.ts              # Base class for all page objects
│   │   ├── LoginPage.ts             # TEMPLATE - Customize for your app
│   │   ├── HomePage.ts              # TEMPLATE - Customize for your app
│   │   └── examples/                # Real-world implementations for reference
│   ├── helper/utils/                # Reusable utilities (keep as-is)
│   ├── mcp-server.js               # TEMPLATE - Add your selectors
│   └── config/env.ts               # TEMPLATE - Add your URLs
├── tests/
│   ├── ui/                         # UI test templates
│   ├── e2e/                        # BDD feature files and steps
│   ├── api/                        # API test templates
│   └── examples/                   # Real-world tests for reference
├── testdata/                       # JSON test data files
└── docs/                           # Comprehensive documentation
    └── TEMPLATE_CUSTOMIZATION.md   # ⭐ START HERE
```

```
pw_mcp_poc/
├── src/
│   ├── pages/           # Page Object Model classes
│   │   ├── LoginPage.ts
│   │   └── HomePage.ts
│   ├── auth/           # Authentication utilities
│   ├── browser/        # Browser management
│   ├── config/         # Environment configuration
│   ├── interfaces/     # TypeScript interfaces
│   ├── utils/          # Utility functions
│   └── mcp-server.js   # MCP server for selector healing
├── tests/
│   ├── ui/            # UI test specifications
│   └── api/           # API test specifications
├── playwright.config.ts
├── tsconfig.json
└── package.json
```

### 3. Dependencies Installation

```json
{
  "devDependencies": {
    "@playwright/test": "^1.55.0",
    "@types/node": "^24.3.1",
    "axios": "^1.11.0",
    "concurrently": "^9.2.1",
    "cross-env": "^10.0.0",
    "express": "^5.1.0"
  }
}
```

### 4. Playwright Configuration

Key configuration in `playwright.config.ts`:

```typescript
export default defineConfig({
  testDir: './tests',
  timeout: 60000,
  expect: { timeout: 15000 },
  fullyParallel: false,
  workers: 1,
  reporter: 'html',
  use: {
    baseURL: process.env.BASE_URL || 'https://sperrydigital.local/',
    trace: 'on-first-retry',
    video: 'retain-on-failure',
    screenshot: 'only-on-failure',
    headless: cfg.headless, // Configurable via HEADLESS env var
    ignoreHTTPSErrors: true,
  },
  projects: [
    {
      name: `ui-${cfg.browser}`, // Dynamic browser name
      use: {
        ...getBrowserConfig(cfg.browser), // Configurable browser
        ignoreHTTPSErrors: true,
      },
    },
  ],
});
```

### 5. Browser Configuration

The framework supports **all major browsers** across platforms:

```powershell
# Run tests on Chrome
$env:BROWSER = 'chrome'
npm test

# Run tests on Firefox
$env:BROWSER = 'firefox'
npm test

# Run tests on Edge (default for local)
$env:BROWSER = 'edge'
npm test

# Run tests on WebKit (Safari)
$env:BROWSER = 'webkit'
npm test
```

See [Browser Configuration Guide](./docs/BROWSER_CONFIGURATION.md) for detailed setup.

### 6. Install Playwright Browsers

```bash
# Install all browsers
npx playwright install

# Install specific browser
npx playwright install chrome
npx playwright install firefox
```

## Environment Configuration

The framework supports multiple environments and browsers:

### Environment Variables

```bash
# Application Environment (default: local)
APP_ENV=dev|qa|stage|prod|local

# Browser Selection (default: chromium)
BROWSER=chromium|chrome|firefox|edge|webkit

# Base URLs (optional - overrides env.ts defaults)
BASE_URL=https://your-app.com
API_BASE_URL=https://your-app.com/api

# Test Execution
HEADLESS=true|false
SLOW_MO=100
WORKERS=2
```

### Quick Start

1. **Update environment configuration** (`src/config/env.ts`):

   ```typescript
   local: {
     baseURL: 'http://localhost:3000', // TODO: Update with your app URL
     apiBaseURL: 'http://localhost:3000/api',
     browser: 'chromium',
   }
   ```

2. **Run tests with different browsers**:

   ```bash
   # Chrome
   npm run test:chrome

   # Firefox
   npm run test:firefox

   # Edge
   npm run test:edge

   # Safari (WebKit)
   npm run test:webkit

   # Cross-browser
   npm run test:cross-browser
   ```

3. **Run tests in different environments**:
   ```bash
   APP_ENV=qa npm test
   APP_ENV=stage BROWSER=firefox npm test
   BASE_URL=https://custom-url.com npm test
   ```

## Features

### 1. MCP Server Integration

**Purpose**: Dynamic selector resolution and self-healing capabilities

**Location**: `src/mcp-server.js`

**Features**:

- Runtime selector discovery
- Fallback selector strategies
- Element healing when selectors change
- Mock server capabilities for testing

**Usage**:

```bash
# Start MCP server
npm run start:mcp

# Run tests with MCP
npm run test:with-mcp
```

### 2. Page Object Model

**BasePage.ts**: Base class for all page objects with common functionality

**LoginPage.ts**: Handles authentication flow

- Extends BasePage for common functionality
- Environment-flexible base URL support
- MCP integration for selector healing
- Fallback authentication strategies

**HomePage.ts**: Manages application navigation and interactions

- Extends BasePage for common functionality
- Asset Tracker navigation
- Data connector creation
- Form field population (name, IP, username, password)
- Dashboard verification
- Connector generation validation

### 3. Self-Healing Selectors

The framework uses multiple selector strategies:

```typescript
const selectors = [
  page.getByRole('button', { name: /create/i }),
  page.locator('button:has-text("Create")'),
  page.locator('[data-testid*="create"]'),
  page.locator('.create-btn'),
  // ... fallback selectors
];
```

### 4. Enterprise Network Support

**Edge Browser Configuration**:

- System certificate inheritance
- Enterprise DNS resolution
- Proxy support
- HTTPS error handling

## 📝 Test Examples

### Basic Login Test

```typescript
test('login to application', async ({ page }) => {
  const login = new LoginPage(page);
  const home = new HomePage(page);

  await login.goto();
  await login.login('autotest', 'Password123');
  await home.verifyUserElementsAfterLogin();
});
```

### Data Connector Creation Test

```typescript
test('create data connector', async ({ page }) => {
  const login = new LoginPage(page);
  const home = new HomePage(page);

  await login.goto();
  await login.login('autotest', 'Password123');

  await home.clickNavigationAndFindAssetTracker();
  await home.clickAssetTrackerInMenu();
  await home.handleConnectorCreation();

  // Fill connector form with credentials
  await home.fillConnectorForm(
    'test name', // Connector name
    '10.133.88.157', // IP address
    'sa', // Username
    'insite-11', // Password
  );

  await home.verifyConnectorGeneration();
});
```

## 🎯 Key Innovations

### 1. Dynamic Selector Resolution

- MCP server provides runtime selector discovery
- Multiple fallback strategies for element finding
- Self-healing when application changes

### 3. Enterprise-Ready Architecture

- Edge browser with system profiles
- Certificate and DNS inheritance
- Module Federation support
- **Cross-platform browser support** (Chrome, Firefox, Edge, WebKit)
- **Configurable browser selection** via environment variables

### 3. Cognitive Complexity Management

- Page Object Model reduces test complexity from 76+ to <15
- Clean separation of concerns
- Reusable component architecture

### 4. Robust Error Handling

- Comprehensive timeout management
- Graceful fallbacks for missing elements
- Detailed logging for debugging

## 🚀 Running Tests

### Environment Setup

```powershell
# Set base URL
$env:BASE_URL = 'https://sperrydigital.local/'

# Set browser (optional, defaults to 'edge' for local)
$env:BROWSER = 'chrome'

# Set headless mode (optional, defaults to false for local)
$env:HEADLESS = 'true'

# Run all tests
npm test
```

### Cross-Browser Testing

```powershell
# Test on Chrome
$env:BROWSER = 'chrome'
npm test

# Test on Firefox
$env:BROWSER = 'firefox'
npm test

# Test on Edge
$env:BROWSER = 'edge'
npm test

# Test on WebKit (Safari)
$env:BROWSER = 'webkit'
npm test
```

### Test Commands

```bash
# Run all UI tests
npm run test:ui

# Run UI tests (headless)
npm run test:ui:headless

# Run BDD tests
npm run test:bdd

# Run API tests
npm run test:api

# Run specific test file
npx playwright test tests/ui/home.spec.ts --headed --workers=1

# Run with specific browser
$env:BROWSER = 'firefox'
npx playwright test tests/ui --workers=1

# Debug mode
npx playwright test --debug --workers=1

# View HTML report
npm run test:report
```

## 📖 Documentation

All documentation is located in the `docs/` folder:

- **[GETTING_STARTED.md](docs/GETTING_STARTED.md)** - 🚀 Complete beginner's guide (start here!)
- **[TEMPLATE_CUSTOMIZATION.md](docs/TEMPLATE_CUSTOMIZATION.md)** - ⭐ Setup guide for customizing the framework
- **[BASE_PAGE.md](docs/BASE_PAGE.md)** - BasePage API reference
- **[BROWSER_CONFIGURATION.md](docs/BROWSER_CONFIGURATION.md)** - Cross-platform browser setup
- **[PROJECT_STRUCTURE.md](docs/PROJECT_STRUCTURE.md)** - Detailed folder structure
- **[TEMPLATE_CONVERSION_SUMMARY.md](docs/TEMPLATE_CONVERSION_SUMMARY.md)** - Framework conversion details

## 🧪 Example Tests Included

### UI Tests (`tests/ui/home.spec.ts`)

```typescript
test('should login successfully', async ({ page }) => {
  const login = new LoginPage(page);
  const home = new HomePage(page);

  await login.goto();
  await login.login('username', 'password'); // TODO: Customize
  await home.verifyLoggedIn();
});
```

### API BDD Tests (`tests/api/features/example-api.feature`)

```gherkin
Scenario: Health check endpoint returns success
  When I send a GET request to "/health"
  Then the response status should be 200
  And the response JSON should have "status" equal to "ok"
```

### E2E BDD Tests (`tests/e2e/features/example.feature`)

```gherkin
Scenario: User logs in successfully
  Given I am on the login page
  When I login with valid credentials
  Then I should see the home page
```

## 🛠️ Utilities Library (Ready to Use)

All utilities are production-ready and require no customization:

- ✅ **CheckboxUtils** - Checkbox state management
- ✅ **DropdownUtils** - Select options handling
- ✅ **TableUtils** - Table data extraction
- ✅ **TestDataUtils** - JSON test data loading
- ✅ **Logger** - Test execution logging
- ✅ **ApiUtils** - API testing helpers
- ✅ **DatePickerUtils** - Calendar component helpers
- ✅ **SearchUtils** - Search functionality testing

## 📊 Test Results & Reporting

### HTML Reports

Playwright generates comprehensive HTML reports with detailed test information:

```bash
# View the latest report
npx playwright show-report
```

### Test Artifacts:

- **Videos**: Recorded on test failures
- **Screenshots**: Captured on assertion failures
- **Traces**: Available for debugging
- **Network Logs**: HTTP request/response data

## 🔒 Security Considerations

- **Password Masking**: Credentials logged as `***`
- **Environment Variables**: Sensitive data in env vars
- **Certificate Management**: System-level certificate handling
- **Network Security**: HTTPS enforcement with error handling

## 📈 Performance Optimizations

- **Single Worker**: Prevents race conditions
- **Smart Waits**: NetworkIdle and element visibility
- **Timeout Management**: Graduated timeout strategies
- **Resource Cleanup**: Proper browser session management

## 🔄 CI/CD Integration

### GitHub Actions Example:

```yaml
- name: Run Playwright Tests
  run: |
    $env:BASE_URL = 'https://sperrydigital.local/'
    npx playwright test --project=ui-edge
```

### Jenkins Pipeline:

```groovy
stage('E2E Tests') {
  steps {
    powershell '''
      $env:BASE_URL = 'https://sperrydigital.local/'
      npm run test:ui:headless
    '''
  }
}
```

## 🛠️ Framework Extensions

### Adding New Page Objects:

1. Create new class extending base patterns
2. Implement MCP integration for selectors
3. Add comprehensive fallback strategies
4. Include proper TypeScript typing

### Custom Selectors:

```typescript
// Add to MCP server selector resolution
const customSelectors = [
  page.locator('[data-testid="custom-element"]'),
  page.getByRole('button', { name: /custom/i }),
  // ... fallback strategies
];
```

## 📚 Learning Resources

- **Playwright Documentation**: [playwright.dev](https://playwright.dev/)
- **Model Context Protocol**: [MCP Specification](https://modelcontextprotocol.io/)
- **TypeScript Guide**: [typescriptlang.org](https://www.typescriptlang.org/)
- **Page Object Model**: Design pattern documentation

## 🤝 Contributing

1. Fork the repository
2. Create feature branch
3. Implement changes with tests
4. Ensure all tests pass
5. Submit pull request with documentation

## 📞 Support

For issues and questions:

- Review test logs and screenshots
- Check MCP server connectivity
- Verify network and certificate configuration
- Consult Playwright documentation for advanced scenarios

---

**Built with ❤️ using Playwright + MCP for enterprise-grade UI automation**
