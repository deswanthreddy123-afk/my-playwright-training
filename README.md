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

DOS runs log in at the configured Authentik login page before opening the
planned-operations job. Login failures stop setup rather than saving an
unauthenticated session. Set `REUSE_SESSION=true` to explicitly reuse
`.auth/user.json` instead. If that session is rejected by the test site, refresh
it with `node scripts/save-session.js` and complete sign-in in the opened browser.

For direct access in headed mode, run `npm run auth:save` once and complete the
test site's sign-in (including MFA if prompted). Keep the browser open until
the script confirms the session is saved. Then run `npm run test:direct`.
That command reuses the saved session and does not enter credentials again.
Repeat session saving if the test site expires the session.

UI and BDD tests, login setup, and session saving grant geolocation permission
and use Houston coordinates (latitude `29.7604`, longitude `-95.3698`).
This controls the browser location API, not the computer's actual location.

Trajectory feature files are grouped under `tests/e2e/features/Trajectory/`.
Matching step definitions are in `tests/e2e/steps/Trajectory/`, and page objects
are in `src/pages/Trajectory/`. Shared login and file-panel helpers remain in
`src/pages/`.
BDD generation discovers feature files recursively, including this folder.

Trajectory scenarios select the exact `Deswanth Well` card each time rather than
reusing a trajectory URL from another scenario. Missing or duplicate exact
matches fail before any file actions are performed.

`Well-Details.feature` opens the verified `Deswanth Well / Deswanth Wellbore /
Deswanth Design` job (`f67c6a06-8c6d-467e-8e7f-bcc5e4a417ce`) directly because
two home-page cards share the same well and wellbore names. It verifies all three
names before file actions, scopes those actions to the Well Details panel, and
creates its own file preconditions so individual scenarios can run independently.
Downloads are saved under the scenario's test-results directory and checked
against the uploaded fixture.

`Plan-Version.feature` covers the current Plan Revisions table, not file uploads.
Its nine cases verify table/author rendering, unchanged and incomplete revision
validation, valid draft enablement, adding a draft, and cancelling/confirming
draft deletion. Edits remain local: these cases do not save over existing
revisions or verify persisted Save behavior.

`Well-Plan-Consideration.feature` uses the same verified Deswanth Design job.
Its upload, delete, download, and overwrite scenarios operate only inside the
Well Plan & Consideration panel, with their own file preconditions. Shared
trajectory file-panel helpers keep its behavior consistent with Well Details.

`Targets-Sizing.feature` and `Directional-Plot.feature` use this same direct
design navigation and shared file-panel helpers, scoped to their respective
panels. Both use `testdata/Testing.jpg` (an accepted image format), create
independent file preconditions, verify download bytes, and open the actual
overwrite confirmation before accepting or cancelling it.

`3D-Plot.feature` mirrors the nine Directional Plot file-management scenarios
using the same verified design and fixture, with all actions scoped to the
3D Plot panel. Existing files with other names are left untouched.

`Offset Well Analysis/Offset-Well-Details.feature` runs the same nine scenarios
in the Offset Well Details section. It opens the verified design, then uses the
sidebar to go to Offset Well Analysis > Drilling Engineering (the
`/offset-well-analysis/drilling-engineering` link, not the Engineering & Modeling
one) and confirms the Deswanth names before acting. Its page, steps and feature
live in the `Offset Well Analysis` folders. The section's Mark as Completed
toggle is not touched.

`Offset Well Analysis/No-Drilling-Surprises.feature` opens the same design, goes
to Offset Well Analysis > Subsurface (the `/offset-well-analysis/subsurface`
link) and expands No Drilling Surprises. It runs the same nine file scenarios
(other existing files such as `DOS_121.png` are left untouched) plus a tenth
that types `ಪೆದ್ದಿರೆಡ್ಡಿ ದೇಶವಂತ್ ರೆಡ್ಡಿ` into the editor, clicks the empty area to
save it, clicks Translate, and verifies the text becomes Latin-script English
(currently `Peddireddi Deshavant Reddy`, recorded as a `translation` annotation
in the report). Any text already in the editor is deleted first, and that
deletion is saved, so every run enters a real change and checks a real save
request. Editor behavior worth knowing: input typed while the editor lock is
being acquired can be discarded, so the test retries until the text sticks;
the app only saves when the content changed; clicking out of the editor
(including clicking Translate) saves the text as it was before translating; the
translated result is not saved; and saving can switch the section's Mark as
Completed status to In Progress, which the tests do not change back.

`Engineering & Modeling/Drilling Engineering/Section-Objectives-and-KPIs.feature`
opens Engineering & Modeling > Drilling Engineering (the
`/engineering-modeling/drilling-engineering` link, not the Offset Well Analysis
one), selects the `6.250 (in) Section` tab and expands Section Objectives and
KPIs. Each hole-section tab has its own copy of the panel, so the panel is
scoped to the selected tab. One scenario enters the Kannada text in the
Objectives editor, clicks the empty area (the editor's title) to save it,
clicks Translate and checks the English result, then does the same in the KPI
editor, and finally reloads the design to check both saved texts persisted.
Existing text is deleted first, as above. The Objectives, KPI and No Drilling
Surprises editors share `src/pages/rich-text-editor.ts`. The Copy to Domains /
Copy to Sections buttons and Mark as Completed are not touched, and saving
moves a Not Started section to In Progress.

`Engineering & Modeling/Drilling Engineering/Risk-Management-Prognosis.feature`
opens the same `6.250 (in) Section` tab and expands Risk Management +
Prognosis, then clicks Add Row, which opens a side drawer. It enters Risk
`Sensor` and Consequences `SAMPLE`, sets Initial RPC to `II — Significant` /
`C — Occasional`, edits and confirms Prevention and Mitigation (`SAMPLE`; the
text boxes are read-only until Edit is clicked and only count once confirmed),
sets Residual RPC to `III — Marginal` / `D — Remote`, and clicks Add. Every
field is mandatory, so the scenario checks Add stays disabled until the
Residual RPC is set, then enabled. It then checks the new table row column by
column, including the RPC score badges, which must match the scores the drawer
showed. Each run adds one more row, so repeated runs leave duplicate `Sensor`
rows. The Generate Risks, Copy to Sections and Copy to Domains buttons and Mark
as Completed are not touched, and adding a risk moves the section to In
Progress. This feature and Section Objectives and KPIs share
`drilling-engineering-section.page.ts` for the tab and panel handling.

`Offset Well Analysis/Offset-Well-Run-Details.feature` opens the same section
path, expands Offset Well Run Details, and selects `# 863`, `#1`, `#119`, `#867`
and `10150-11400 RA SUA; LL&E #1` in the Well Name dropdown (exact option names;
note the space in `# 863`). The list holds about 3,000 wells, so options are
found through its search box. The app reloads data after a selection and may
close the dropdown, so each well reopens it and checks its state first. The
scenario verifies `5 items selected`, `Selected: 5 wells` and one tab per well.
It dismisses the bottom "Latest release update" notice if it is covering the
dropdown, and it works whether or not a well was preselected.

`Offset Well Analysis/DDR-Summary.feature` does the same in the DDR Summary
section: it opens the Select wells to view data dropdown and selects
`25/11-BT-3`, `AFRAA-1`, `ARMB-002R1S1`, `BISBITA_SUR-01-ST2`,
`Business Insights Well - LOL!` and `Business Insights Well - LOL!!!` (exact
option names from the app), then verifies `6 items selected`,
`Selected: 6 wells` and the `NPT Summary` tab plus one tab per well. The
Country and Company filters are left alone. Both well-selection pages share
`well-multiselect-panel.page.ts`.

`CF-Ladder-TC-Plot.feature` covers eight file-management scenarios for each of
CF Plot, Ladder Plot, and TC Plot (24 total). It uses the same verified design
and shared file helpers, with each uploader and file row scoped to its exact
named subsection rather than a page-level file index. Download bytes and actual
delete/overwrite confirmations are verified; unrelated files are left untouched.

`Anti-Collision-Overview.feature` opens the same verified Deswanth Design and
fills the six questionnaire answers from the reference image: planned survey
`TEST`, backup survey `SAMPLE`, magnetic interference `DEMO`, policy `sensor`,
more stringent policy `Yes`, and sigma `3`. It verifies the displayed values
using question-scoped inputs, without relying on generated field IDs. It does
not mark the section completed or test reload persistence.

A second scenario opens Add Well, fills the reference image's `DESHU` / `3124`
entry, and clicks Add. It verifies all 15 values in the new summary row,
including the calculated, disabled Offshore well (`No`) and PTD Level (`Level 3`)
fields. Comments remain blank. Each run adds a row rather than deleting or
modifying existing rows; it does not click the page-level Save control.
All reference values are user-supplied test data, not engineering recommendations.

`Risk-Assessment.feature` opens the verified Deswanth Design, expands Risk
Assessment, and selects the existing `DESHU` offset-well tab. It fills all 12
questionnaire textareas with the reference answer `Sensors`, locating each by
its question's `aria-label`, and verifies the count and every answer. The DESHU
summary entry must already exist; the test does not create other wells, change
completion switches, click page-level Save, or verify reload persistence.
The supplied answers are test data, not engineering recommendations.

`Well-Planning-Checklist.feature` opens the same verified Deswanth Design,
expands Well Planning Checklist, clicks Start (or Edit for a saved checklist),
and opens Wellplan Components.
It checks the WP1, WP2, MWDC, and DDC select-all headers by their accessible
labels and verifies all four headers and 103 component checkboxes are selected.
It then opens Anti-Collision Analysis, selects WP1, WP2, and DDC, and verifies
all three headers and 27 analysis checkboxes. It clicks the checklist's Save
button and reloads the design to verify all 130 selections were persisted.
On unchanged repeat runs, the app disables Save. The test explicitly logs that
state and verifies the persisted selections after reload without another Save.
The sign-off count must remain unchanged; the test does not sign approvals.

`DES-Verification-Checklist.feature` expands DES Verification Checklist on the
same design, clicks Edit, and selects Yes to all in each of the 12 questionnaire
tabs. Of 97 questions, 96 are editable and are verified as Yes. The Anticollision
sigma question is not changed by the bulk button, so editable Yes radios are
also selected through normal UI controls after each bulk action. The Anticollision
question "Is the selected policy more stringent than Halliburton Standard?" is
read-only: its existing answer is captured and must remain unchanged.
The test saves changes and reloads the design to verify every expected answer
persisted (100% progress alone is insufficient).
Sign-Offs & Approvals and Sign Document are not operated. Unchanged repeat runs
explicitly log a disabled Save and still verify persisted answers after reload.
These are user-requested test-site answers, not engineering certification.

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
