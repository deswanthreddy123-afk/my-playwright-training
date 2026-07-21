# Project Structure Documentation

This project follows a well-organized structure similar to enterprise-level test automation frameworks.

## Directory Structure

```
pw_mcp_poc/
├── constants/              # Configuration constants
│   ├── env.ts             # Environment configuration
│   └── env.test.ts        # Test environment configurations
│
├── helper/                 # Utility functions and helpers
│   ├── auth/              # Authentication helpers
│   └── utils/             # Common utility functions
│       ├── apiEndpoints.ts       # API endpoint definitions
│       ├── apiUtils.ts           # API utility functions
│       ├── checkboxUtils.ts      # Checkbox interaction utilities
│       ├── commonActions.ts      # Common page actions
│       ├── commonAssertions.ts   # Common assertions
│       ├── commonUtils.ts        # General utility functions
│       ├── datePickerUtils.ts    # Date picker utilities
│       ├── dropdownUtils.ts      # Dropdown utilities
│       ├── searchUtils.ts        # Search functionality utilities
│       ├── tableUtils.ts         # Table interaction utilities
│       └── testDataUtils.ts      # Test data management
│
├── hooks/                  # Test hooks (setup/teardown)
│
├── nginx/                  # NGINX configuration (if needed)
│
├── pages/                  # Page Object Models
│   ├── HomePage.ts
│   └── LoginPage.ts
│
├── pipeline/              # CI/CD pipeline configurations
│   └── templates/
│       └── autotest-pipeline-steps.yml
│
├── report/                # Custom reporting
│   ├── init.ts           # Report configuration
│   └── report.ts         # Custom reporter
│
├── runtime-info/          # Runtime logs and information
│
├── src/                   # Source files
│   ├── auth/             # Authentication modules
│   ├── browser/          # Browser management
│   ├── config/           # Configuration files
│   ├── interfaces/       # TypeScript interfaces
│   ├── steps/            # BDD step definitions
│   └── utils/            # Core utilities
│
├── test-results/         # Test execution results
│
├── testdata/             # Test data files
│   ├── users.json       # User test data
│   └── connectors.json  # Connector test data
│
├── tests/                # Test files
│   ├── api/             # API tests
│   └── ui/              # UI tests
│
└── types/                # TypeScript type definitions
    ├── env.d.ts         # Environment variable types
    ├── index.ts         # Framework types
    └── examples.ts      # Usage examples
```

## Key Features

### 1. **Constants** (`/constants`)

Centralized configuration and constants for:

- Environment settings
- Test environment configurations
- Global constants

### 2. **Helper Utilities** (`/helper/utils`)

Comprehensive utility library including:

- **API Utilities**: HTTP request helpers
- **Common Actions**: Reusable page interactions
- **Common Assertions**: Standard verification methods
- **UI Component Utilities**: Checkbox, dropdown, table, date picker, search
- **Test Data Management**: JSON/CSV data loading and generation

### 3. **Page Objects** (`/pages`)

Page Object Model (POM) pattern implementation for maintainable UI tests.

### 4. **Pipeline** (`/pipeline`)

Azure DevOps pipeline templates for CI/CD integration.

### 5. **Test Data** (`/testdata`)

JSON files containing test data for different scenarios.

### 6. **Custom Reporting** (`/report`)

Custom test reporters and report configurations.

## Path Aliases

The project uses TypeScript path aliases for cleaner imports:

```typescript
import { ENV } from '@constants/env';
import { CommonUtils } from '@helper/utils/commonUtils';
import { HomePage } from '@pages/HomePage';
import { TestUser } from '@types';
```

Available aliases:

- `@constants/*` → `./constants/*`
- `@helper/*` → `./helper/*`
- `@pages/*` → `./src/pages/*`
- `@utils/*` → `./src/utils/*`
- `@interfaces/*` → `./src/interfaces/*`
- `@hooks/*` → `./src/hooks/*`
- `@browser/*` → `./src/browser/*`
- `@auth/*` → `./src/auth/*`
- `@config/*` → `./src/config/*`
- `@types/*` → `./types/*`

## Usage Examples

### Using Environment Constants

```typescript
import { ENV, AUTH } from '@constants/env';

console.log(ENV.BASE_URL);
console.log(AUTH.USERNAME);
```

### Using Utility Functions

```typescript
import { TableUtils } from '@helper/utils/tableUtils';
import { CommonUtils } from '@helper/utils/commonUtils';

// Table operations
const rowCount = await TableUtils.getRowCount(tableLocator);

// Generate random data
const email = CommonUtils.generateRandomEmail();
```

### Loading Test Data

```typescript
import { TestDataUtils } from '@helper/utils/testDataUtils';

const users = TestDataUtils.loadJsonData('users.json');
const testUser = TestDataUtils.generateTestUser('automation');
```

## Best Practices

1. **Keep utilities reusable** - Write generic functions in helper utilities
2. **Use constants** - Store all configuration in constants directory
3. **Organize test data** - Keep test data separate in testdata directory
4. **Page Objects** - Use POM pattern for UI interactions
5. **Type safety** - Leverage TypeScript types from types directory
6. **Path aliases** - Use @ aliases for cleaner imports

## Running Tests

```bash
# Run all tests
npm test

# Run specific test suite
npm run test:ui
npm run test:api

# Run BDD tests
npm run test:bdd

# Lint code
npm run lint

# Type check
npm run type-check
```

## CI/CD Integration

The project includes Azure DevOps pipeline templates in `/pipeline/templates` for automated test execution in CI/CD pipelines.
