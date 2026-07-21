# Framework Type Definitions

This directory contains TypeScript type definitions that are part of the core framework.

## Files

### `env.d.ts`

TypeScript declarations for environment variables used throughout the framework.

**Purpose:**

- Provides IntelliSense and autocomplete for `process.env` variables
- Ensures type safety when accessing environment variables
- Documents all available environment configuration options

**Usage:**

```typescript
// TypeScript will now provide autocomplete and type checking
const baseUrl = process.env.BASE_URL; // ✅ Type: string | undefined
const nodeEnv = process.env.NODE_ENV; // ✅ Type: 'development' | 'staging' | 'production' | 'test' | undefined
```

**Adding New Environment Variables:**

1. Add the variable to `types/env.d.ts` in the `ProcessEnv` interface
2. Add the default value to `.env.example`
3. Document the variable in project documentation

## Type Safety Benefits

With these type definitions, you get:

- ✅ Autocomplete for environment variable names
- ✅ Type checking to prevent typos
- ✅ Clear documentation of available config options
- ✅ Easier refactoring when env variables change
- ✅ Better IDE support across the framework

## Framework Integration

The types are automatically loaded by TypeScript through:

- `tsconfig.json` includes the `types` directory
- `typeRoots` configuration points to this directory
- Path alias `@types/*` for importing custom types

## Best Practices

1. **Always update env.d.ts** when adding new environment variables
2. **Use optional types** (`?`) for non-required variables
3. **Use union types** for variables with specific allowed values
4. **Document each variable** with comments for clarity
5. **Keep .env.example in sync** with type definitions
