# ESLint Configuration

This framework uses ESLint with TypeScript support for code quality and consistency.

## Packages Installed

- `eslint@^9.23.0` - Core linting engine
- `@typescript-eslint/eslint-plugin@^8.29.0` - TypeScript-specific rules
- `@typescript-eslint/parser@^8.29.0` - TypeScript parser for ESLint

## Configuration

The ESLint configuration is in `eslint.config.mjs` (ESLint 9 flat config format).

### Key Rules

**TypeScript Rules:**

- `@typescript-eslint/no-explicit-any` - Warns about `any` types (should use specific types)
- `@typescript-eslint/no-unused-vars` - Warns about unused variables (prefix with `_` to ignore)

**General Rules:**

- `no-console` - OFF (allowed in test automation)
- `no-var` - ERROR (use `const` or `let`)
- `eqeqeq` - ERROR (always use `===` and `!==`)
- `max-len` - WARN (120 characters per line)
- `complexity` - WARN (max cyclomatic complexity of 15)

**Best Practices:**

- `no-eval` - ERROR (no eval())
- `no-throw-literal` - ERROR (throw Error objects)
- Single-line if statements allowed (curly braces optional)

## NPM Scripts

```bash
# Check for linting issues
npm run lint

# Auto-fix linting issues
npm run lint:fix

# Type check without building
npm run type-check
```

## VS Code Integration

The `.vscode/settings.json` is configured to:

- Run ESLint on save
- Auto-fix issues on save
- Format with ESLint for TypeScript and JavaScript files

## Ignored Files

The following are ignored from linting (configured in `eslint.config.mjs`):

- `node_modules/`
- `playwright-report/`
- `test-results/`
- `.features-gen/`
- `dist/`, `build/`, `coverage/`

## Fixing Common Issues

### Unused Variables

Prefix with underscore to ignore:

```typescript
// ❌ Warning
async function example({ page }) {}

// ✅ No warning
async function example({ page: _page }) {}
```

### Any Types

Use specific types:

```typescript
// ❌ Warning
const data: any = {};

// ✅ No warning
const data: Record<string, string> = {};
```

### Line Length

Break long lines:

```typescript
// ❌ Warning (>120 chars)
const result = await page
  .locator('very-long-selector')
  .filter({ hasText: 'some text' })
  .first()
  .isVisible();

// ✅ No warning
const locator = page.locator('very-long-selector').filter({ hasText: 'some text' }).first();
const result = await locator.isVisible();
```

## CI/CD Integration

Add to your CI pipeline:

```yaml
- name: Lint
  run: npm run lint

- name: Type Check
  run: npm run type-check
```

## Customization

To modify rules, edit `eslint.config.mjs`:

```javascript
rules: {
  'rule-name': 'off',    // Disable
  'rule-name': 'warn',   // Warning only
  'rule-name': 'error',  // Error (fails build)
}
```

## Best Practices

1. **Run lint before committing** - Catch issues early
2. **Fix warnings incrementally** - Don't ignore them
3. **Use type-check** - Catch TypeScript errors
4. **Configure pre-commit hooks** - Automate linting
5. **Team consensus** - Agree on rule strictness
