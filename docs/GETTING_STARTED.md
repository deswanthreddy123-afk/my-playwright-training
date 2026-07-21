# Getting Started - From Zero to Automated Tests

**Complete beginner's guide** to setting up this AI-powered testing framework that writes test code for you!

## 🎯 What This Framework Does

You write **feature files** describing your tests in plain English, and the **MCP (Model Context Protocol) server** automatically:

- ✨ Finds the right selectors on your web page
- ✨ Generates step definitions
- ✨ Creates page objects
- ✨ Self-heals when UI changes

**You focus on WHAT to test. The framework handles HOW to test it.**

---

## 📋 Prerequisites - Install These First

### 1. Install Visual Studio Code (VS Code)

**Windows:**

1. Download VS Code from: https://code.visualstudio.com/
2. Run the installer (`VSCodeUserSetup-x64-*.exe`)
3. During installation, check these options:
   - ✅ Add "Open with Code" action to Windows Explorer
   - ✅ Add to PATH (important!)
4. Click **Install**
5. Launch VS Code when complete

**Mac:**

1. Download from: https://code.visualstudio.com/
2. Open the `.dmg` file
3. Drag VS Code to Applications folder
4. Open VS Code from Applications

**Linux:**

```bash
# Ubuntu/Debian
sudo snap install code --classic

# Or download .deb from https://code.visualstudio.com/
```

### 2. Install Node.js

**Windows/Mac:**

1. Go to: https://nodejs.org/
2. Download the **LTS version** (18.x or higher)
3. Run the installer
4. Keep all default settings
5. Click through to complete installation

**Verify Installation:**

```bash
# Open Terminal (Mac/Linux) or PowerShell (Windows)
node --version   # Should show v18.x.x or higher
npm --version    # Should show 9.x.x or higher
```

**Linux:**

```bash
# Ubuntu/Debian
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs
```

### 3. Install Git

**Windows:**

1. Download from: https://git-scm.com/download/win
2. Run installer
3. Use default settings (Git Bash + Git from command line)
4. Complete installation

**Mac:**

```bash
# Install via Xcode Command Line Tools
xcode-select --install

# Or via Homebrew
brew install git
```

**Linux:**

```bash
sudo apt-get install git
```

**Verify Installation:**

```bash
git --version   # Should show git version 2.x.x
```

---

## 🚀 Quick Start - 5 Steps to Your First Test

### Step 1: Clone the Framework (2 minutes)

**Option A: Using VS Code (Recommended for Beginners)**

1. Open VS Code
2. Press `Ctrl+Shift+P` (Windows/Linux) or `Cmd+Shift+P` (Mac)
3. Type: `Git: Clone`
4. Enter repository URL:
   ```
   https://dev.azure.com/HAL-Sperry/RigHive/_git/sds-playwright-bdd-mcp-framework
   ```
5. Choose a folder location
6. Click **Open** when prompted

**Option B: Using Command Line**

```bash
# Navigate to your projects folder
cd C:\Projects         # Windows
cd ~/Projects          # Mac/Linux

# Clone the repository
git clone https://dev.azure.com/HAL-Sperry/RigHive/_git/sds-playwright-bdd-mcp-framework

# Open in VS Code
cd sds-playwright-bdd-mcp-framework
code .
```

### Step 2: Install Dependencies (3 minutes)

**In VS Code:**

1. Open Terminal: `Terminal → New Terminal` (or `Ctrl+```)
2. Run:
   ```bash
   npm install
   ```
3. Wait for installation to complete (~2-3 minutes)
4. Install Playwright browsers:
   ```bash
   npx playwright install
   ```

**You should see:**

```
✓ Packages installed successfully
✓ Browsers installed: chromium, firefox, webkit
```

### Step 3: Configure Your Application URL (2 minutes)

1. Open `src/config/env.ts` in VS Code
2. Update the `local` environment with your app's URL:

```typescript
local: {
  baseURL: 'https://your-app.com',        // ← Change this
  apiBaseURL: 'https://your-app.com/api', // ← Change this
  browser: 'chromium',                     // Keep as-is
}
```

**Example for a local app:**

```typescript
local: {
  baseURL: 'http://localhost:8080',
  apiBaseURL: 'http://localhost:8080/api',
  browser: 'chromium',
}
```

**Save the file** (`Ctrl+S` or `Cmd+S`)

### Step 4: Start the MCP Server (1 minute)

The MCP server is the AI that automatically finds selectors and generates code for you.

**In VS Code Terminal:**

```bash
npm run mcp:start
```

**You should see:**

```
MCP Server running on http://localhost:4000
✓ Selector resolution enabled
✓ Self-healing ready
```

**Keep this terminal running!** Open a new terminal for the next steps:

- Click the `+` button in the terminal panel, OR
- `Terminal → New Terminal`

### Step 5: Write Your First Feature File (5 minutes)

Now comes the magic! You write what you want to test, and MCP handles the rest.

**Create a new feature file:**

1. In VS Code, navigate to `tests/e2e/features/`
2. Create a new file: `my-first-test.feature`
3. Write your test in plain English:

```gherkin
Feature: Login to My Application

  Scenario: Successful login with valid credentials
    Given I am on the login page
    When I enter username "testuser@example.com"
    And I enter password "TestPass123"
    And I click the login button
    Then I should see the dashboard
    And I should see my username "testuser@example.com"
```

**Save the file** (`Ctrl+S`)

---

## ✨ The Magic Happens - MCP Auto-Generation

### What Happens Next (Automatically!)

When you run your test for the first time, the MCP server will:

1. **Navigate to your application** using the URL from `env.ts`
2. **Analyze the login page** and find:
   - Username input field
   - Password input field
   - Login button
3. **Generate step definitions** in `tests/e2e/steps/my-first-test-steps.ts`
4. **Create page objects** in `src/pages/` if needed
5. **Save the selectors** in `src/mcp-server.js` for reuse

### Run Your First Test

**In the second terminal (MCP server still running in first):**

```bash
# Run your feature file
npx playwright test --grep "Successful login"
```

**Watch the magic:**

```
Running 1 test using 1 worker

✓ 1. MCP: Analyzing login page...
✓ 2. MCP: Found username field: input[name="email"]
✓ 3. MCP: Found password field: input[type="password"]
✓ 4. MCP: Found login button: button[type="submit"]
✓ 5. MCP: Generating step definitions...
✓ 6. MCP: Creating LoginPage object...
✓ 7. MCP: Saving selectors for reuse...
✓ 8. Running test...

[chromium] › my-first-test.feature:3:3 › Successful login
  ✓ Given I am on the login page
  ✓ When I enter username "testuser@example.com"
  ✓ And I enter password "TestPass123"
  ✓ And I click the login button
  ✓ Then I should see the dashboard

1 passed (5.2s)
```

### What Got Created Automatically

**Check these files that MCP generated for you:**

1. **Step Definitions**: `tests/e2e/steps/my-first-test-steps.ts`

   ```typescript
   // MCP auto-generated this!
   Given('I am on the login page', async ({ page }) => {
     await page.goto('/login');
   });

   When('I enter username {string}', async ({ page }, username: string) => {
     await page.locator('input[name="email"]').fill(username);
   });
   // ... more steps
   ```

2. **Page Object** (if you requested it): `src/pages/LoginPage.ts`

   ```typescript
   // MCP created this based on your app's structure
   export class LoginPage {
     // Selectors MCP found on your page
     usernameInput = 'input[name="email"]';
     passwordInput = 'input[type="password"]';
     // ... methods
   }
   ```

3. **Saved Selectors**: `src/mcp-server.js`
   ```javascript
   // MCP saved these for faster reuse
   const selectors = {
     login: {
       username: "input[name='email']",
       password: "input[type='password']",
       submit: "button[type='submit']",
     },
   };
   ```

---

## 🎓 Understanding the Workflow

### Traditional Testing (Without This Framework)

```
You: Write feature file
You: Manually inspect page for selectors
You: Write step definitions manually
You: Create page objects manually
You: Update everything when UI changes 😫
Time: Hours or days
```

### With This MCP Framework

```
You: Write feature file in plain English
MCP: "I'll handle the rest!"
  ✓ Finds selectors automatically
  ✓ Generates step definitions
  ✓ Creates page objects
  ✓ Self-heals when UI changes 😊
Time: Minutes
```

---

## 📝 Writing More Tests

### Example: Testing a Search Feature

**Create**: `tests/e2e/features/search.feature`

```gherkin
Feature: Product Search

  Scenario: Search for products
    Given I am logged in
    When I search for "laptop"
    Then I should see search results
    And the results should contain "laptop"

  Scenario: Filter search results
    Given I am on the search results page for "laptop"
    When I apply filter "Price: Low to High"
    Then the results should be sorted by price ascending
```

**Run it:**

```bash
npx playwright test tests/e2e/features/search.feature
```

**MCP will automatically:**

- Find your search input field
- Find the search button
- Generate search-related steps
- Create helper methods for verification

### Example: API Testing

**Create**: `tests/api/features/user-api.feature`

```gherkin
Feature: User API

  Scenario: Get user profile
    When I send a GET request to "/api/users/123"
    Then the response status should be 200
    And the response should contain "email"
    And the response JSON should have "name" equal to "Test User"
```

**MCP generates the API step definitions automatically!**

---

## 🔧 Useful Commands

### Running Tests

```bash
# Run all tests
npm test

# Run only UI tests
npm run test:ui

# Run only E2E BDD tests
npm run test:e2e

# Run only API tests
npm run test:api

# Run specific feature file
npx playwright test tests/e2e/features/my-first-test.feature

# Run in headed mode (see browser)
npx playwright test --headed

# Run in debug mode
npx playwright test --debug

# Run with specific browser
BROWSER=firefox npm test              # Mac/Linux
$env:BROWSER="firefox"; npm test      # Windows PowerShell
```

### MCP Server Commands

```bash
# Start MCP server
npm run mcp:start

# Stop MCP server
# Press Ctrl+C in the terminal running MCP

# View MCP logs
# Check the terminal where MCP is running

# Test MCP health
curl http://localhost:4000/health
```

### View Test Reports

```bash
# View HTML report
npx playwright show-report

# This opens a browser with:
# - Test results
# - Screenshots of failures
# - Videos of test runs
# - Trace files for debugging
```

---

## 🛠️ Troubleshooting

### "npm: command not found"

**Problem:** Node.js not installed or not in PATH
**Solution:**

1. Reinstall Node.js from https://nodejs.org/
2. Make sure to check "Add to PATH" during installation
3. Restart VS Code and terminal

### "git: command not found"

**Problem:** Git not installed
**Solution:** Install Git from https://git-scm.com/

### "MCP server not starting"

**Problem:** Port 4000 might be in use
**Solution:**

```bash
# Windows - Find and kill process on port 4000
netstat -ano | findstr :4000
taskkill /PID <PID_NUMBER> /F

# Mac/Linux
lsof -ti:4000 | xargs kill -9
```

### "Selectors not found"

**Problem:** MCP can't find elements on your page
**Solution:**

1. Make sure your app is running and accessible
2. Check the URL in `src/config/env.ts` is correct
3. Open your app manually and verify the page loads
4. Check MCP server logs for errors

### "Tests fail after UI changes"

**Problem:** UI changed, selectors outdated
**Solution:**

- MCP automatically heals! Just rerun the test
- MCP will find new selectors and update them
- This is the self-healing feature in action! ✨

### "Browser not launching"

**Problem:** Playwright browsers not installed
**Solution:**

```bash
npx playwright install
```

---

## 📚 Next Steps - Become a Pro

### 1. Learn More About BDD

- Read: `docs/TEMPLATE_CUSTOMIZATION.md`
- Understand: Gherkin syntax (Given/When/Then)
- Practice: Writing clear, readable scenarios

### 2. Explore the Examples

- Check: `tests/examples/` folder
- See: Real-world test implementations
- Learn: Advanced patterns and techniques

### 3. Customize Page Objects

- Review: `src/pages/BasePage.ts` for available methods
- Create: Custom page objects for your app
- Extend: Add reusable helper methods

### 4. Use Utilities

- Explore: `src/helper/utils/` folder
- Tools available:
  - `checkboxUtils` - Checkbox handling
  - `dropdownUtils` - Select dropdowns
  - `tableUtils` - Extract table data
  - `apiUtils` - API testing helpers
  - `logger` - Test logging

### 5. Set Up CI/CD

- Integrate: With GitHub Actions, Jenkins, or Azure Pipelines
- Automate: Run tests on every commit
- Report: Test results to your team

---

## 🎯 Quick Reference Card

```bash
# 1. CLONE FRAMEWORK
git clone <repo-url>
cd sds-playwright-bdd-mcp-framework

# 2. INSTALL
npm install
npx playwright install

# 3. CONFIGURE
# Edit: src/config/env.ts
# Update: baseURL with your app URL

# 4. START MCP SERVER
npm run mcp:start
# (Keep running in one terminal)

# 5. WRITE FEATURE FILE
# Create: tests/e2e/features/my-test.feature
# Write: Your test in plain English

# 6. RUN TEST
npx playwright test my-test.feature

# 7. MCP MAGIC ✨
# Watch MCP auto-generate everything!

# 8. VIEW RESULTS
npx playwright show-report
```

---

## 💡 Pro Tips

### Tip 1: Descriptive Feature Names

```gherkin
# Good ✅
Scenario: User can login with valid email and password

# Bad ❌
Scenario: Test 1
```

### Tip 2: Use Background for Common Steps

```gherkin
Feature: User Profile

  Background:
    Given I am logged in as "testuser@example.com"

  Scenario: Update profile
    When I change my name to "New Name"
    Then my profile should show "New Name"

  Scenario: Upload avatar
    When I upload a profile picture
    Then I should see the new picture
```

### Tip 3: Use Scenario Outlines for Data-Driven Tests

```gherkin
Scenario Outline: Login with different users
  Given I am on the login page
  When I login as "<username>" with password "<password>"
  Then I should see "<message>"

  Examples:
    | username           | password    | message        |
    | admin@test.com     | Admin123    | Admin Dashboard|
    | user@test.com      | User123     | User Dashboard |
    | invalid@test.com   | wrong       | Login failed   |
```

### Tip 4: Keep MCP Server Running

- Start it once in the morning
- Keep it running all day
- Faster test execution
- Better selector caching

### Tip 5: Check MCP Logs

- MCP shows what selectors it found
- Helps understand what's happening
- Useful for debugging

---

## 🆘 Getting Help

### Documentation

- **This Guide**: You're reading it! 📖
- **Customization**: `docs/TEMPLATE_CUSTOMIZATION.md`
- **BasePage API**: `docs/BASE_PAGE.md`
- **Browser Config**: `docs/BROWSER_CONFIGURATION.md`

### Common Questions

**Q: Do I need to know programming?**
A: Not to start! Write feature files in English. As you grow, learn TypeScript to customize.

**Q: What if MCP can't find a selector?**
A: You can manually add it to the page object, and MCP will learn from it.

**Q: Can I use this for mobile testing?**
A: Yes! Playwright supports mobile viewports and emulation.

**Q: Does MCP work offline?**
A: Yes! MCP runs locally on your machine.

**Q: Can multiple people use the same MCP server?**
A: Each developer should run their own MCP server locally.

---

## 🎉 Success! You're Ready to Test!

You now have:

- ✅ VS Code installed and configured
- ✅ Framework cloned and dependencies installed
- ✅ MCP server running and auto-generating code
- ✅ Your first test written and passing
- ✅ Knowledge to write more tests

### What Makes This Framework Special

🤖 **AI-Powered**: MCP intelligently finds selectors
🔄 **Self-Healing**: Automatically adapts to UI changes
📝 **Write Tests in English**: No coding required to start
⚡ **Fast Setup**: From zero to testing in ~15 minutes
🎓 **Learn as You Go**: Start simple, grow advanced
🛠️ **Production-Ready**: Used for real enterprise applications

**Happy Testing! 🚀**

---

_For advanced topics, see `docs/TEMPLATE_CUSTOMIZATION.md`_
_For issues, check the MCP server logs and `docs/` folder_
