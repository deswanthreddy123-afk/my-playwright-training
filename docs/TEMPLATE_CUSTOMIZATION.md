# Template Customization Guide

This framework has been converted into a **reusable template** ready for any web application. All application-specific code has been removed and moved to the `examples` folder for reference.

## 🎯 Quick Start Checklist

- [ ] Update `src/config/env.ts` with your application URLs
- [ ] Customize `src/pages/LoginPage.ts` selectors
- [ ] Customize `src/pages/HomePage.ts` methods
- [ ] Update `src/mcp-server.js` with your selectors
- [ ] Update test data in `testdata/` folder
- [ ] Create your test scenarios
- [ ] Run tests and verify

## 📁 What to Customize

### 1. Environment Configuration (`src/config/env.ts`)

**Current Template:**

```typescript
local: {
  baseURL: 'http://localhost:3000', // TODO: Update
  apiBaseURL: 'http://localhost:3000/api', // TODO: Update
  browser: 'chromium',
}
```

**Action Required:**

1. Replace `baseURL` with your application's URL
2. Replace `apiBaseURL` with your API endpoint
3. Update for each environment (dev, qa, stage, prod)

### 2. Page Objects

#### LoginPage (`src/pages/LoginPage.ts`)

**What to Update:**

- Login URL path (currently `/login`)
- Username field selectors
- Password field selectors
- Submit button selectors

**Example:**

```typescript
// TODO: Update these selectors to match your login form
const usernameSelectors = [
  this.page.getByLabel('Email'), // Change to your label
  this.page.locator('input[name="email"]'), // Change to your field name
];
```

#### HomePage (`src/pages/HomePage.ts`)

**What to Update:**

- Rename class if needed (e.g., `DashboardPage`)
- Update logged-in indicators
- Add your page-specific methods
- Remove example methods you don't need

**Example:**

```typescript
// Add methods specific to your application
async openSettings(): Promise<void> {
  await this.clickElement([
    this.page.getByRole('link', { name: 'Settings' }),
  ], 'Settings link');
}
```

### 3. MCP Server (`src/mcp-server.js`)

**Current Template:**

```javascript
const selectors = {
  login: {
    username: "input[name='username']", // TODO: Update
    password: "input[name='password']", // TODO: Update
    submit: "button[type='submit']",
  },
  home: {
    userMenu: "[data-testid='user-menu']", // TODO: Update
  },
};
```

**Action Required:**

1. Update selectors to match your application
2. Add new page configurations as needed
3. MCP will auto-update when tests find better selectors

### 4. Test Data (`testdata/`)

#### `users.json`

```json
{
  "validUser": {
    "username": "your-test-user@example.com",
    "password": "YourPassword123"
  }
}
```

#### `connectors.json` (or rename to your data type)

Update with test data relevant to your application.

### 5. Test Specifications

#### UI Tests (`tests/ui/home.spec.ts`)

**Replace placeholders:**

```typescript
// Current
await login.login('your-username', 'your-password');

// Update to
await login.login('actual-test-user', 'actual-password');
// Or better: use test data
const testUser = testDataUtils.getUser('validUser');
await login.login(testUser.username, testUser.password);
```

#### BDD Features (`tests/e2e/features/`)

**Update scenarios:**

```gherkin
Feature: Your Application Feature

  Scenario: Your specific test case
    Given I am on the login page
    When I login with valid credentials
    Then I should see my dashboard
```

#### BDD Steps (`tests/e2e/steps/`)

Implement step definitions using your page objects:

```typescript
When('I should see my dashboard', async ({ page }) => {
  const dashboard = new DashboardPage(page);
  await dashboard.verifyDashboardLoaded();
});
```

## 🔧 Configuration Options

### Browser Selection

```bash
# Via environment variable
BROWSER=firefox npm test

# Via npm scripts
npm run test:chrome
npm run test:firefox
npm run test:edge
npm run test:webkit
```

### Environment Selection

```bash
# Run tests in QA environment
APP_ENV=qa npm test

# Run in production with custom URL
APP_ENV=prod BASE_URL=https://your-app.com npm test
```

### Test Execution

```bash
# Headless mode
HEADLESS=true npm test

# With slow motion
SLOW_MO=500 npm test

# Parallel workers
WORKERS=4 npm test
```

## 📚 Reference Examples

The `examples` folders contain complete implementations from an asset tracker application:

### Page Object Examples

- `src/pages/examples/LoginPage.example.ts` - MCP-integrated login with fallbacks
- `src/pages/examples/HomePage.example.ts` - Complex navigation and form handling

### Test Examples

- `tests/examples/home.spec.example.ts` - Complete UI test suite
- `tests/examples/asset-tracker-steps.example.ts` - BDD step definitions
- `tests/examples/asset-tracker.feature.example` - Real-world scenarios

**Use these to:**

- Understand MCP integration patterns
- See fallback selector strategies
- Learn complex page interaction handling
- Reference complete test implementations

## 🚀 Step-by-Step Setup

### Step 1: Environment Setup (5 minutes)

1. Update `src/config/env.ts`:

   ```typescript
   local: {
     baseURL: 'http://localhost:8080', // Your app URL
     apiBaseURL: 'http://localhost:8080/api',
     browser: 'chromium',
   }
   ```

2. Test configuration:
   ```bash
   npm test -- tests/api/health.spec.ts
   ```

### Step 2: Login Page (15 minutes)

1. Open your application's login page
2. Inspect the form elements
3. Update `src/pages/LoginPage.ts`:
   - Username field selector
   - Password field selector
   - Submit button selector

4. Update `src/mcp-server.js` with same selectors

5. Test login:
   ```bash
   npm test -- tests/ui/home.spec.ts -g "login"
   ```

### Step 3: Home Page (20 minutes)

1. Update `src/pages/HomePage.ts`:
   - Rename class if needed
   - Update `verifyLoggedIn()` indicators
   - Add 2-3 basic methods for your app

2. Update test to use new methods

3. Run and verify:
   ```bash
   npm test -- tests/ui/
   ```

### Step 4: Add Your Tests (30+ minutes)

1. Create new test scenarios based on your requirements
2. Add new page objects as needed
3. Expand BDD features

## 🎨 Customization Best Practices

### 1. Start Simple

- Get login working first
- Add one page at a time
- Verify each step before moving forward

### 2. Use BasePage Methods

Instead of creating utility wrappers, use BasePage directly:

```typescript
// Good ✅
await this.clickElement([selector1, selector2], 'Button');
await this.fillField([selector1, selector2], value, 'Input');

// Avoid ❌
const commonActions = new CommonActions(this.page);
await commonActions.clickElement(selector);
```

### 3. Leverage Multiple Selectors

Provide fallbacks for resilience:

```typescript
const selectors = [
  this.page.getByRole('button', { name: 'Submit' }), // Best
  this.page.locator('[data-testid="submit"]'), // Fallback 1
  this.page.locator('button[type="submit"]'), // Fallback 2
];
```

### 4. Use MCP for Self-Healing

Let the MCP server learn better selectors over time:

```typescript
// MCP will try saved selector first, then fallbacks
const selector = await getSelector('login', 'username');
// If fallback works better, it updates MCP automatically
```

## 🛠️ Optional Utilities

The framework includes several utilities - use what you need:

### Essential (Recommended)

- ✅ **CheckboxUtils** - Checkbox state management
- ✅ **DropdownUtils** - Select options handling
- ✅ **TableUtils** - Table data extraction
- ✅ **TestDataUtils** - JSON test data loading
- ✅ **Logger** - Test execution logging
- ✅ **ApiUtils** - API testing helpers

### Optional (Use if needed)

- **DatePickerUtils** - For calendar/date components
- **SearchUtils** - Search functionality testing
- **McpClient** - Direct MCP integration (advanced)

### Not Recommended

- ❌ **CommonActions** - Use BasePage methods instead
- ❌ **CommonAssertions** - Use BasePage methods instead

## ❓ Troubleshooting

### Tests fail with selector errors

1. Check browser dev tools for actual selectors
2. Update selectors in page objects
3. Update MCP server with new selectors
4. Add fallback selectors

### Environment variables not working

```bash
# Windows PowerShell
$env:BROWSER="firefox"; npm test

# Linux/Mac
export BROWSER=firefox && npm test

# Or use cross-env (already installed)
npx cross-env BROWSER=firefox npm test
```

### TypeScript errors

```bash
npm run type-check
# Fix any errors before running tests
```

## 📖 Additional Documentation

- **Browser Configuration**: `docs/BROWSER_CONFIGURATION.md`
- **BasePage API**: `docs/BASE_PAGE.md`
- **Project Structure**: `PROJECT_STRUCTURE.md`
- **MCP Integration**: `runtime-info/README.md`

## 🆘 Need Help?

1. Check the `examples/` folder for reference implementations
2. Review `docs/` for detailed documentation
3. Run with verbose logging: `DEBUG=pw:api npm test`
4. Check the MCP server logs for selector resolution

---

**Remember**: This is a template framework. The more you customize it to match your application, the more valuable and maintainable it becomes. Start small, iterate, and expand coverage over time!
