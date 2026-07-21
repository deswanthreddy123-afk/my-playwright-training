# Browser Quick Reference

## Quick Commands

### Run Tests on Specific Browser

```powershell
# Windows PowerShell
$env:BROWSER = 'chrome';  npm test
$env:BROWSER = 'firefox'; npm test
$env:BROWSER = 'edge';    npm test
$env:BROWSER = 'webkit';  npm test

# Or use shortcuts
npm run test:chrome
npm run test:firefox
npm run test:edge
npm run test:webkit
```

```bash
# macOS/Linux
BROWSER=chrome  npm test
BROWSER=firefox npm test
BROWSER=edge    npm test
BROWSER=webkit  npm test
```

## Supported Browsers

| Browser  | Value      | Platform | Notes                           |
| -------- | ---------- | -------- | ------------------------------- |
| Chromium | `chromium` | All      | Open-source, recommended for CI |
| Chrome   | `chrome`   | All      | Branded Google Chrome           |
| Edge     | `edge`     | All      | Default for Windows local       |
| Firefox  | `firefox`  | All      | Mozilla Firefox                 |
| WebKit   | `webkit`   | All      | Safari engine                   |

## Common Scenarios

### Local Development (Headed)

```powershell
$env:BROWSER = 'chrome'
$env:HEADLESS = 'false'
npm test
```

### CI/CD (Headless)

```powershell
$env:BROWSER = 'chromium'
$env:HEADLESS = 'true'
npm test
```

### Debug Mode (Slow Motion)

```powershell
$env:BROWSER = 'chrome'
$env:SLOW_MO = '500'
npm test
```

### Cross-Browser Testing

```powershell
npm run test:cross-browser
```

## Default Settings

| Environment | Browser  | Headless |
| ----------- | -------- | -------- |
| local       | edge     | false    |
| dev         | chromium | false    |
| qa          | chromium | false    |
| stage       | chromium | false    |
| prod        | chromium | true     |

## Installation

```bash
# Install all browsers
npx playwright install

# Install specific browser
npx playwright install chrome
npx playwright install firefox
npx playwright install webkit
npx playwright install msedge
```

## Troubleshooting

| Issue                 | Solution                           |
| --------------------- | ---------------------------------- |
| Browser not found     | `npx playwright install <browser>` |
| Wrong browser running | Check `$env:BROWSER` value         |
| Tests failing on CI   | Use `chromium` and `HEADLESS=true` |
| Slow execution        | Remove `SLOW_MO` or set to `0`     |

## Environment Variables

```powershell
# Set multiple at once
$env:BROWSER = 'chrome'
$env:HEADLESS = 'true'
$env:WORKERS = '2'
npm test
```

## More Info

- Full guide: `docs/BROWSER_CONFIGURATION.md`
- Changes: `docs/BROWSER_CONFIGURATION_CHANGES.md`
- Examples: `.env.example`
