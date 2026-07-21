/**
 * Test Environment Configurations
 */

export const TEST_ENVIRONMENTS = {
  dev: {
    baseUrl: 'https://dev.example.com',
    apiUrl: 'https://api-dev.example.com',
  },
  qa: {
    baseUrl: 'https://qa.example.com',
    apiUrl: 'https://api-qa.example.com',
  },
  staging: {
    baseUrl: 'https://staging.example.com',
    apiUrl: 'https://api-staging.example.com',
  },
  prod: {
    baseUrl: 'https://prod.example.com',
    apiUrl: 'https://api-prod.example.com',
  },
} as const;

export type Environment = keyof typeof TEST_ENVIRONMENTS;
