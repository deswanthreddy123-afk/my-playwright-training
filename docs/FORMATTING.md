# Code Formatting Guide

This project uses **Prettier** as the code formatter to maintain consistent code style across the entire codebase.

## Prettier Configuration

The formatter is configured via `.prettierrc.json`:

```json
{
  "semi": true, // Add semicolons at the end of statements
  "trailingComma": "all", // Add trailing commas in arrays/objects
  "singleQuote": true, // Use single quotes instead of double
  "printWidth": 100, // Line length before wrapping
  "tabWidth": 2, // Indentation width
  "useTabs": false, // Use spaces instead of tabs
  "arrowParens": "always", // Always include parens in arrow functions
  "endOfLine": "auto", // Auto-detect line endings
  "bracketSpacing": true, // Add spaces inside object braces
  "bracketSameLine": false, // Put closing bracket on new line
  "proseWrap": "preserve" // Don't wrap markdown text
}
```

## Available Scripts

### Format All Files

```bash
npm run format
```

Formats all TypeScript, JavaScript, JSON, YAML, and Markdown files in the project.

### Check Formatting

```bash
npm run format:check
```

Checks if files are properly formatted without making changes. Useful in CI/CD pipelines.

## VS Code Integration

The project is configured to format files automatically on save. Settings in `.vscode/settings.json`:

```json
{
  "editor.formatOnSave": true,
  "[typescript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[javascript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[json]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  }
}
```

### Required VS Code Extension

Install the **Prettier - Code formatter** extension:

- Extension ID: `esbenp.prettier-vscode`
- Search for "Prettier" in VS Code Extensions

## Ignored Files

Files and directories listed in `.prettierignore` are excluded from formatting:

- `node_modules/`
- `test-results/`
- `playwright-report/`
- `coverage/`
- `.bdd-gen/`
- `.features-gen/`
- Build outputs and logs

## Integration with ESLint

Prettier works alongside ESLint in this project:

- **Prettier**: Handles code formatting (spacing, quotes, line length)
- **ESLint**: Handles code quality (unused vars, type safety, best practices)

Both tools run on save:

1. ESLint fixes code quality issues
2. Prettier formats the code style

## Workflow

### Before Committing

```bash
# Check formatting
npm run format:check

# Auto-format all files
npm run format

# Lint and fix issues
npm run lint:fix

# Type check
npm run type-check
```

### CI/CD Pipeline

Add to your pipeline:

```yaml
- script: npm run format:check
  displayName: 'Check code formatting'

- script: npm run lint
  displayName: 'Lint code'

- script: npm run type-check
  displayName: 'TypeScript type check'
```

## File Types Formatted

- **TypeScript**: `.ts` files
- **JavaScript**: `.js` files
- **JSON**: `.json` files
- **YAML**: `.yml`, `.yaml` files
- **Markdown**: `.md` files

## Common Formatting Examples

### Before Prettier

```typescript
const user = { name: 'John', age: 30, email: 'john@example.com' };
function greet(name) {
  console.log('Hello ' + name);
}
```

### After Prettier

```typescript
const user = { name: 'John', age: 30, email: 'john@example.com' };
function greet(name) {
  console.log('Hello ' + name);
}
```

## Best Practices

1. **Always run format before committing**

   ```bash
   npm run format
   ```

2. **Enable format on save in VS Code**
   - Already configured in `.vscode/settings.json`

3. **Use format:check in PR validation**
   - Ensures all code follows formatting standards

4. **Don't fight the formatter**
   - Let Prettier handle all formatting decisions
   - Focus on logic, not formatting

5. **Combine with lint:fix for best results**
   ```bash
   npm run lint:fix && npm run format
   ```

## Troubleshooting

### Formatter not working in VS Code

1. Install Prettier extension: `esbenp.prettier-vscode`
2. Reload VS Code
3. Check default formatter in settings

### Conflicts with ESLint

- The project is configured to work with both tools
- If conflicts occur, Prettier takes precedence for formatting
- ESLint handles code quality, not formatting

### Format on Save not working

1. Check `.vscode/settings.json` has `"editor.formatOnSave": true`
2. Ensure file type has default formatter set to Prettier
3. Restart VS Code

## Additional Resources

- [Prettier Documentation](https://prettier.io/docs/en/)
- [Prettier VS Code Extension](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
- [Prettier Playground](https://prettier.io/playground/)
