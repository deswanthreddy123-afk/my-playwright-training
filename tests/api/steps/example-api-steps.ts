import type { APIRequestContext, APIResponse } from '@playwright/test';
import { expect, test } from '@playwright/test';
import { createBdd } from 'playwright-bdd';

/**
 * API BDD Step Definitions - TEMPLATE
 *
 * TODO: Customize these steps for your API endpoints
 * - Update base URLs and endpoints
 * - Add authentication headers if needed
 * - Implement your API-specific validations
 */

const { Given, When, Then } = createBdd(test);

let _apiContext: APIRequestContext;
let response: APIResponse;
let requestBody: Record<string, unknown>;

// =============================================================================
// Background Steps
// =============================================================================

Given('the API base URL is configured', async ({ request }) => {
  _apiContext = request;
  // TODO: Add any API initialization (auth tokens, headers, etc.)
});

// =============================================================================
// Given Steps - Setup
// =============================================================================

Given('a resource exists with id {string}', async (_context, id: string) => {
  // TODO: Create test data or verify resource exists
  console.log(`Assuming resource ${id} exists for testing`);
});

Given('I have a request body with:', async (_context, docString: string) => {
  requestBody = JSON.parse(docString) as Record<string, unknown>;
});

// =============================================================================
// When Steps - Actions
// =============================================================================

When('I send a GET request to {string}', async ({ request }, endpoint: string) => {
  // TODO: Update base URL if needed
  response = await request.get(endpoint);
});

When('I send a POST request to {string}', async ({ request }, endpoint: string) => {
  response = await request.post(endpoint, {
    data: requestBody,
  });
});

When(
  'I send a POST request to {string} with invalid data',
  async ({ request }, endpoint: string) => {
    response = await request.post(endpoint, {
      data: { invalid: 'data' },
    });
  },
);

When('I send a PUT request to {string}', async ({ request }, endpoint: string) => {
  response = await request.put(endpoint, {
    data: requestBody,
  });
});

When('I send a DELETE request to {string}', async ({ request }, endpoint: string) => {
  response = await request.delete(endpoint);
});

// =============================================================================
// Then Steps - Assertions
// =============================================================================

Then('the response status should be {int}', async (_context, expectedStatus: number) => {
  expect(response.status()).toBe(expectedStatus);
});

Then('the response should contain {string}', async (_context, expectedField: string) => {
  const responseBody = await response.json();
  expect(responseBody).toHaveProperty(expectedField);
});

Then(
  'the response JSON should have {string} equal to {string}',
  async (_context, field: string, expectedValue: string) => {
    const responseBody = await response.json();
    expect(responseBody[field]).toBe(expectedValue);
  },
);

// =============================================================================
// TODO: Add more step definitions for your API testing needs
// Examples:
// - Authentication steps
// - Header validation steps
// - Response schema validation
// - Rate limiting tests
// - Error handling scenarios
// =============================================================================
