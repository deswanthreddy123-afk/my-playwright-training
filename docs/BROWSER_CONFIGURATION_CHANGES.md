# Browser Configuration Changes - Migration Guide

## Overview

The framework has been updated to support **configurable browser selection** across all major browsers and platforms. Previously hardcoded to Microsoft Edge on Windows, it now supports Chrome, Firefox, Chromium, Edge, and WebKit on any operating system.

## What Changed

### 1. Configuration Files Updated

#### `src/config/env.ts`

- ✅ Added `BrowserType` type definition
- ✅ Extended `Config` type with browser settings
- ✅ Added browser configuration per environment
- ✅ Added support for `BROWSER`, `HEADLESS`, and `SLOW_MO` environment variables

```typescript
export type BrowserType = 'chromium' | 'firefox' | 'webkit' | 'chrome' | 'edge';

type Config = {
  baseURL: string;
  apiBaseURL: string;
  browser: BrowserType; // NEW
  headless: boolean; // NEW
  slowMo: number; // NEW
};
```

#### `playwright.config.ts`

- ✅ Added `getBrowserConfig()` helper function
- ✅ Dynamic project naming based on selected browser
- ✅ Removed hardcoded Edge-only configuration
- ✅ Added proper TypeScript typing for browser configs
- ✅ Configurable workers via `WORKERS` environment variable

**Before:**

```typescript
projects: [
  {
    name: 'ui-edge',
    use: { ...devices['Desktop Edge'], channel: 'msedge' },
  },
],
```

**After:**

```typescript
projects: [
  {
    name: `ui-${cfg.browser}`,
    use: {
      ...getBrowserConfig(cfg.browser),
      ignoreHTTPSErrors: true,
    },
  },
],
```

#### `playwright.bdd.config.ts`

- ✅ Added `getBrowserConfig()` helper function
- ✅ Dynamic browser selection for BDD tests
- ✅ Configurable workers
- ✅ Uses centralized config from `env.ts`

### 2. New Documentation

#### `docs/BROWSER_CONFIGURATION.md`

Comprehensive guide covering:

- All supported browsers
- Configuration methods
- Environment variables
- Platform-specific considerations
- Cross-browser testing strategies
- Troubleshooting guide
- CI/CD integration examples

### 3. Enhanced Scripts

#### `package.json`

Added browser-specific test scripts:

- `npm run test:chrome` - Run tests on Chrome
- `npm run test:firefox` - Run tests on Firefox
- `npm run test:edge` - Run tests on Edge
- `npm run test:webkit` - Run tests on WebKit
- `npm run test:chromium` - Run tests on Chromium
- `npm run test:cross-browser` - Run tests on multiple browsers

#### `scripts/test-all-browsers.ps1` (PowerShell)

Automated cross-browser test runner for Windows

#### `scripts/test-all-browsers.sh` (Bash)

Automated cross-browser test runner for macOS/Linux

### 4. Environment Configuration

#### `.env.example`

Template for environment variables including:

- `BROWSER` - Browser selection
- `HEADLESS` - Headless mode toggle
- `SLOW_MO` - Slow motion debugging
- `WORKERS` - Parallel execution control

### 5. Updated README

- Updated prerequisites section (cross-platform support)
- Added browser configuration section
- Updated running tests section with browser examples
- Removed Windows-only assumptions
- Added cross-browser testing examples

## Migration Guide

### For Existing Projects

1. **Update your environment variables** (optional):

   ```powershell
   # Windows PowerShell
   $env:BROWSER = 'chrome'

   # macOS/Linux
   export BROWSER=chrome
   ```

2. **Update test commands**:

   ```bash
   # Old (still works but uses configured browser)
   npm test

   # New (explicit browser selection)
   npm run test:chrome
   npm run test:firefox
   ```

3. **Update CI/CD pipelines**:
   ```yaml
   # Azure DevOps example
   - script: |
       $env:BROWSER = 'chromium'
       $env:HEADLESS = 'true'
       npm test
     displayName: 'Run Chromium Tests'
   ```

### For New Projects

1. **Clone and install**:

   ```bash
   npm install
   npx playwright install
   ```

2. **Configure environment**:

   ```bash
   cp .env.example .env
   # Edit .env with your settings
   ```

3. **Run tests**:
   ```bash
   npm test                    # Uses default browser (edge for local)
   npm run test:chrome         # Specific browser
   ```

## Breaking Changes

### ⚠️ None!

The changes are **fully backward compatible**:

- Default behavior unchanged (uses Edge for local environment)
- Existing tests continue to work without modification
- Project names updated but old names still work via pattern matching

## New Capabilities

### ✅ Cross-Platform Testing

Run the same tests on Windows, macOS, and Linux

### ✅ Multi-Browser Support

Test on 5 different browsers without code changes

### ✅ Environment-Based Configuration

Different browsers for different environments (local, dev, qa, prod)

### ✅ Dynamic Project Names

Projects now reflect the browser being used

### ✅ Simplified CI/CD

Easy browser switching in automated pipelines

## Environment Variables Reference

| Variable   | Type                                      | Default              | Description       |
| ---------- | ----------------------------------------- | -------------------- | ----------------- |
| `BROWSER`  | `chromium\|chrome\|edge\|firefox\|webkit` | `edge` (local)       | Browser to use    |
| `HEADLESS` | `true\|false`                             | `false` (local)      | Headless mode     |
| `SLOW_MO`  | `number`                                  | `0`                  | Slow motion (ms)  |
| `WORKERS`  | `number`                                  | `1`                  | Parallel workers  |
| `APP_ENV`  | `local\|dev\|qa\|stage\|prod`             | `local`              | Environment       |
| `BASE_URL` | `string`                                  | Environment-specific | Base URL override |

## Testing the Changes

### Verify Browser Configuration

```powershell
# Test with different browsers
$env:BROWSER = 'chromium'
npm test

$env:BROWSER = 'firefox'
npm test

$env:BROWSER = 'chrome'
npm test
```

### Verify Type Safety

```bash
npm run type-check
```

### Verify Linting

```bash
npm run lint
```

## Rollback Instructions

If you need to rollback to Edge-only configuration:

1. Set environment variable:

   ```powershell
   $env:BROWSER = 'edge'
   ```

2. Or modify `src/config/env.ts`:
   ```typescript
   local: {
     browser: 'edge',
     // ...
   }
   ```

## Support

For issues or questions:

1. Check `docs/BROWSER_CONFIGURATION.md`
2. Review `.env.example` for proper configuration
3. Verify browser installation: `npx playwright install`

## Future Enhancements

Potential future improvements:

- [ ] Mobile browser support
- [ ] Browser-specific test scenarios
- [ ] Parallel cross-browser execution
- [ ] Visual regression testing across browsers
- [ ] Performance metrics per browser
- [ ] Accessibility testing on multiple browsers

---

**Summary**: The framework is now truly cross-platform and multi-browser capable while maintaining full backward compatibility. No changes required for existing tests, but new powerful configuration options are available for advanced use cases.
