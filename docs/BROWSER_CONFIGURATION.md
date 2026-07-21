# Browser Configuration Guide

The framework now supports **configurable browser selection** across all major browsers on any platform (Windows, macOS, Linux).

## Supported Browsers

- **Chromium** - Open-source browser (default for most environments)
- **Chrome** - Google Chrome (branded Chromium)
- **Edge** - Microsoft Edge (default for local environment)
- **Firefox** - Mozilla Firefox
- **WebKit** - Safari engine (for cross-platform Safari testing)

## Configuration Methods

### 1. Environment Variable (Recommended)

Set the `BROWSER` environment variable before running tests:

#### Windows (PowerShell)

```powershell
# Chrome
$env:BROWSER = 'chrome'
npm test

# Firefox
$env:BROWSER = 'firefox'
npm test

# Edge
$env:BROWSER = 'edge'
npm test

# Chromium
$env:BROWSER = 'chromium'
npm test

# WebKit (Safari)
$env:BROWSER = 'webkit'
npm test
```

#### Windows (CMD)

```cmd
set BROWSER=chrome
npm test
```

#### macOS/Linux (Bash)

```bash
export BROWSER=chrome
npm test

# Or inline
BROWSER=firefox npm test
```

### 2. Environment-Based Configuration

The browser is configured per environment in `src/config/env.ts`:

```typescript
const configs: Record<AppEnv, Config> = {
  local: {
    browser: 'edge', // Edge for Windows local dev
    // ...
  },
  dev: {
    browser: 'chromium', // Chromium for dev environment
    // ...
  },
  qa: {
    browser: 'chromium', // Chromium for QA
    // ...
  },
  prod: {
    browser: 'chromium', // Chromium for production tests
    // ...
  },
};
```

Change the default browser for any environment by editing the config.

### 3. Combined with Other Settings

You can combine browser selection with other environment variables:

```powershell
# Chrome in headless mode
$env:BROWSER = 'chrome'
$env:HEADLESS = 'true'
npm test

# Firefox with slow motion
$env:BROWSER = 'firefox'
$env:SLOW_MO = '500'
npm test

# Edge with custom workers
$env:BROWSER = 'edge'
$env:WORKERS = '2'
npm test
```

## Available Environment Variables

| Variable   | Values                                            | Default              | Description                                    |
| ---------- | ------------------------------------------------- | -------------------- | ---------------------------------------------- |
| `BROWSER`  | `chromium`, `chrome`, `edge`, `firefox`, `webkit` | `edge` (local)       | Browser to use for tests                       |
| `HEADLESS` | `true`, `false`                                   | `false`              | Run browser in headless mode                   |
| `SLOW_MO`  | Number (ms)                                       | `0`                  | Slow down operations by specified milliseconds |
| `WORKERS`  | Number                                            | `1`                  | Number of parallel workers                     |
| `APP_ENV`  | `local`, `dev`, `qa`, `stage`, `prod`             | `local`              | Application environment                        |
| `BASE_URL` | URL string                                        | Environment-specific | Override base URL                              |

## Examples

### Run UI Tests on Chrome

```powershell
$env:BROWSER = 'chrome'
npm run test:ui
```

### Run BDD Tests on Firefox (Headless)

```powershell
$env:BROWSER = 'firefox'
$env:HEADLESS = 'true'
npm run test:bdd:headless
```

### Run All Tests on Edge (Default Local)

```powershell
# No env var needed, Edge is default for local
npm test
```

### Cross-Browser Testing

```powershell
# Test on all browsers
$env:BROWSER = 'chromium'; npm test
$env:BROWSER = 'chrome'; npm test
$env:BROWSER = 'edge'; npm test
$env:BROWSER = 'firefox'; npm test
$env:BROWSER = 'webkit'; npm test
```

### CI/CD Pipeline Example

```yaml
# Azure DevOps Pipeline
- task: PowerShell@2
  displayName: 'Run Chrome Tests'
  inputs:
    script: |
      $env:BROWSER = 'chrome'
      $env:HEADLESS = 'true'
      npm run test:ui

- task: PowerShell@2
  displayName: 'Run Firefox Tests'
  inputs:
    script: |
      $env:BROWSER = 'firefox'
      $env:HEADLESS = 'true'
      npm run test:ui
```

## Project Names

Project names now dynamically reflect the selected browser:

- `ui-chrome` - UI tests on Chrome
- `ui-edge` - UI tests on Edge
- `ui-firefox` - UI tests on Firefox
- `ui-chromium` - UI tests on Chromium
- `ui-webkit` - UI tests on WebKit
- `bdd-chrome` - BDD tests on Chrome
- `e2e-edge` - E2E tests on Edge
- `api` - API tests (browser-agnostic)

## Running Specific Projects

```powershell
# Run only Chrome UI tests
$env:BROWSER = 'chrome'
npx playwright test --project ui-chrome

# Run only Firefox BDD tests
$env:BROWSER = 'firefox'
npx playwright test --project bdd-firefox --config playwright.bdd.config.ts
```

## Browser Installation

Playwright automatically downloads browsers when needed. To manually install:

```bash
# Install all browsers
npx playwright install

# Install specific browser
npx playwright install chrome
npx playwright install firefox
npx playwright install webkit
npx playwright install msedge
```

## Platform-Specific Considerations

### Windows

- **Edge**: Available by default on Windows 10+
- **Chrome**: Requires Google Chrome installed
- **Firefox**: Requires Firefox installed
- **WebKit**: Playwright's WebKit build (not native Safari)

### macOS

- **Safari**: Use `webkit` browser
- **Chrome**: Requires Google Chrome installed
- **Firefox**: Requires Firefox installed
- **Edge**: Requires Microsoft Edge installed

### Linux

- **Chromium**: Best supported on Linux
- **Firefox**: Excellent support
- **WebKit**: Available via Playwright
- **Chrome**: Requires additional setup
- **Edge**: Limited support

## Troubleshooting

### Browser Not Found

```
Error: Browser 'chrome' not found
```

**Solution**: Install the browser

```bash
npx playwright install chrome
```

### Channel Error

```
Error: Unsupported channel 'msedge'
```

**Solution**: Use `edge` browser type with proper configuration

```powershell
$env:BROWSER = 'edge'
```

### Permission Issues (Linux)

```bash
# Install browser dependencies
npx playwright install-deps
```

## Best Practices

1. **Use Chromium for CI/CD** - Most stable and fastest
2. **Test locally on your primary browser** - Edge on Windows, Chrome on macOS
3. **Cross-browser test critical flows** - Use different browsers for smoke tests
4. **Headless in CI** - Always run headless in automated pipelines
5. **WebKit for Safari compatibility** - Test on WebKit if targeting Safari users

## Advanced Configuration

### Custom Browser Args

Edit `playwright.config.ts` or `playwright.bdd.config.ts`:

```typescript
projects: [
  {
    name: `ui-${cfg.browser}`,
    use: {
      ...getBrowserConfig(cfg.browser),
      launchOptions: {
        args: [
          '--disable-dev-shm-usage',
          '--disable-blink-features=AutomationControlled',
        ],
      },
    },
  },
],
```

### Device Emulation

```typescript
// In playwright.config.ts
import { devices } from '@playwright/test';

projects: [
  {
    name: 'Mobile Chrome',
    use: {
      ...devices['Pixel 5'],
      channel: 'chrome',
    },
  },
  {
    name: 'Mobile Safari',
    use: {
      ...devices['iPhone 13'],
    },
  },
],
```

## Migration from Old Configuration

### Before (Hardcoded Edge)

```typescript
projects: [
  {
    name: 'ui-edge',
    use: { ...devices['Desktop Edge'], channel: 'msedge' },
  },
],
```

### After (Configurable)

```typescript
projects: [
  {
    name: `ui-${cfg.browser}`,
    use: {
      ...getBrowserConfig(cfg.browser),
    },
  },
],
```

Now you can switch browsers without changing code!

## Quick Reference Card

| Task                 | Command                                                     |
| -------------------- | ----------------------------------------------------------- |
| Chrome               | `$env:BROWSER = 'chrome'; npm test`                         |
| Firefox              | `$env:BROWSER = 'firefox'; npm test`                        |
| Edge                 | `$env:BROWSER = 'edge'; npm test`                           |
| Safari (WebKit)      | `$env:BROWSER = 'webkit'; npm test`                         |
| Headless Chrome      | `$env:BROWSER = 'chrome'; $env:HEADLESS = 'true'; npm test` |
| Install all browsers | `npx playwright install`                                    |
| List projects        | `npx playwright test --list`                                |
