/**
 * API Utility Functions
 * Core framework utility for API testing with comprehensive HTTP methods and response validations
 */

import { APIResponse, expect } from '@playwright/test';
import * as fs from 'node:fs/promises';

export class ApiUtils {
  private responseDataCode: number;
  protected apiResponse: APIResponse | undefined;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor(private readonly request?: any) {
    this.apiResponse = undefined;
    this.responseDataCode = 0;
  }

  async sendGetRequest(
    apiendpoint: string,
    headers?: Record<string, string>,
  ): Promise<APIResponse> {
    try {
      const apiContext = this.request;
      const defaultHeaders: Record<string, string> = {
        'Content-Type': 'application/json',
      };
      const requestHeaders = { ...defaultHeaders, ...headers };
      const response = await apiContext.get(apiendpoint, {
        headers: requestHeaders,
      });
      this.responseDataCode = response.status();
      this.apiResponse = response;
      return response;
    } catch (error) {
      throw new Error(`Failed to send the GET request: ${error}`);
    }
  }

  async sendPostRequestWithParsedPayload({
    apiendpoint,
    payloaddata,
  }: {
    apiendpoint: string;
    payloaddata?: string | object;
  }): Promise<APIResponse> {
    try {
      const apiContext = this.request;
      let dataToSend: unknown = undefined;
      if (typeof payloaddata === 'string') {
        const trimmedPayload = payloaddata.trim();
        if (trimmedPayload) {
          dataToSend = await this.parseJSONPayload(payloaddata);
        }
      } else if (typeof payloaddata === 'object' && payloaddata !== null) {
        dataToSend = payloaddata;
      }
      const requestHeaders: Record<string, string> = {
        'Content-Type': 'application/json',
      };
      const response = await apiContext.post(apiendpoint, {
        data: dataToSend,
        headers: requestHeaders,
        timeout: 45000,
      });
      this.responseDataCode = response.status();
      this.apiResponse = response;
      return response;
    } catch (error) {
      throw new Error(`Failed to send the POST request with Parsed JSON payload: ${error}`);
    }
  }

  async sendPutRequestWithFullBodyPayload({
    apiendpoint,
    data,
  }: {
    apiendpoint: string;
    data: string;
  }): Promise<APIResponse> {
    try {
      const apiContext = this.request;
      const parsedPayload = await this.parseJSONPayload(data);
      const requestHeaders: Record<string, string> = {
        'Content-Type': 'application/json',
      };
      const response = await apiContext.put(apiendpoint, {
        data: parsedPayload,
        headers: requestHeaders,
      });
      this.responseDataCode = response.status();
      this.apiResponse = response;
      return response;
    } catch (error) {
      throw new Error(`Failed to send the PUT request with full JSON payload: ${error}`);
    }
  }

  async sendDeleteRequest(
    apiendpoint: string,
    headers?: Record<string, string>,
  ): Promise<APIResponse> {
    try {
      const apiContext = this.request;
      const requestHeaders: Record<string, string> = {
        'Content-Type': 'application/json',
        ...headers,
      };
      const response = await apiContext.delete(apiendpoint, {
        headers: requestHeaders,
      });
      this.responseDataCode = response.status();
      this.apiResponse = response;
      return response;
    } catch (error) {
      throw new Error(`Failed to send the DELETE request:  ${error}`);
    }
  }

  async sendDeleteRequestWithPayload({
    apiendpoint,
    payloaddata,
  }: {
    apiendpoint: string;
    payloaddata: string;
  }): Promise<APIResponse> {
    try {
      const apiContext = this.request;
      const parsedPayload = await this.parseJSONPayload(payloaddata);
      const requestHeaders: Record<string, string> = {
        'Content-Type': 'application/json',
      };
      const response = await apiContext.delete(apiendpoint, {
        data: parsedPayload,
        headers: requestHeaders,
      });
      this.responseDataCode = response.status();
      this.apiResponse = response;
      return response;
    } catch (error) {
      throw new Error(`Failed to send the DELETE request with JSON payload: ${error}`);
    }
  }

  async sendPatchRequest({
    apiendpoint,
    data,
  }: {
    apiendpoint: string;
    data: string;
  }): Promise<APIResponse> {
    try {
      const apiContext = this.request;
      const parsedPayload = await this.parseJSONPayload(data);
      const requestHeaders: Record<string, string> = {
        'Content-Type': 'application/json',
      };
      const response = await apiContext.patch(apiendpoint, {
        data: parsedPayload,
        headers: requestHeaders,
      });
      this.responseDataCode = response.status();
      this.apiResponse = response;
      return response;
    } catch (error) {
      throw new Error(`Failed to send the PATCH request with full JSON payload: ${error}`);
    }
  }

  verifyResponseCode(code: number): void {
    expect(this.responseDataCode).toBe(code);
  }

  verifyResponseCodeMultiple(codes: number[]): void {
    const isValidStatusCode = codes.includes(this.responseDataCode);
    if (!isValidStatusCode) {
      throw new Error(
        `Expected status code to be one of [${codes.join(', ')}], but got ${this.responseDataCode}`,
      );
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async parseJSONPayload(payload: string): Promise<any> {
    try {
      return JSON.parse(payload);
    } catch (error) {
      throw new Error(`Failed to parse JSON payload: ${error}`);
    }
  }

  async verifyResponseBodyMatches(expectedResponse: string): Promise<void> {
    if (this.apiResponse) {
      const parsedExpectedResponse = await this.parseJSONPayload(expectedResponse);
      const actualResponse = await this.apiResponse.json();
      expect(actualResponse).toEqual(parsedExpectedResponse);
    }
  }

  async verifyApiResponseWithJsonFile(jsonFilePath: string): Promise<void> {
    const fileContent = await fs.readFile(jsonFilePath, 'utf-8');
    const expectedResponse = await this.parseJSONPayload(fileContent);
    if (this.apiResponse) {
      const actualResponse = await this.apiResponse.json();
      expect(actualResponse).toEqual(expectedResponse);
    }
  }

  async verifyPartialResponseBodyMatches(expectedPartialResponse: string): Promise<void> {
    const parsedExpectedPartialResponse = await this.parseJSONPayload(expectedPartialResponse);
    if (this.apiResponse) {
      const actualResponse = await this.apiResponse.json();
      for (const key in parsedExpectedPartialResponse) {
        if (Object.hasOwn(parsedExpectedPartialResponse, key)) {
          if (key === 'timestamp') {
            expect(actualResponse).toHaveProperty('timestamp');
            expect(typeof actualResponse['timestamp']).toBe('string');
            continue;
          }
          expect(actualResponse).toHaveProperty(key);
          expect(actualResponse[key]).toEqual(parsedExpectedPartialResponse[key]);
        }
      }
    }
  }

  async verifyArrayItemsPartiallyMatch(expectedItems: string): Promise<void> {
    if (!this.apiResponse) {
      throw new Error(
        'No API response available to verify array items. Please ensure an API request was sent before calling this verification.',
      );
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let parsedExpectedItems: any[];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let actualResponse: any[];

    try {
      parsedExpectedItems = await this.parseJSONPayload(expectedItems);
    } catch (parseError: unknown) {
      const errorMessage = parseError instanceof Error ? parseError.message : String(parseError);
      throw new Error(`Failed to parse expected JSON for comparison: ${errorMessage}`);
    }

    try {
      actualResponse = await this.apiResponse.json();
    } catch (jsonError: unknown) {
      const errorMessage = jsonError instanceof Error ? jsonError.message : String(jsonError);
      throw new Error(`Failed to parse actual API response as JSON: ${errorMessage}`);
    }
    if (!Array.isArray(parsedExpectedItems)) {
      throw new TypeError(
        `Expected JSON for array partial match must be an array. Received type: ${typeof parsedExpectedItems}. Value: ${JSON.stringify(
          parsedExpectedItems,
        )}`,
      );
    }
    if (!Array.isArray(actualResponse)) {
      throw new TypeError(
        `Actual API response is not an array. Received type: ${typeof actualResponse}. Full response: ${JSON.stringify(
          actualResponse,
          null,
          2,
        )}`,
      );
    }

    if (parsedExpectedItems.length === 0) {
      return;
    }
    try {
      expect(actualResponse).toEqual(
        expect.arrayContaining(
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          parsedExpectedItems.map((item: any) => expect.objectContaining(item)),
        ),
      );
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      throw new Error(
        `Failed to verify array items partially match.
        \nExpected partial items to be found: ${JSON.stringify(parsedExpectedItems, null, 2)}
        \nActual response array: ${JSON.stringify(actualResponse, null, 2)}
        \nDetailed Assertion Error: ${errorMessage}`,
      );
    }
  }

  async verifyResponseBodyContainsText(expectedText: string): Promise<void> {
    if (this.apiResponse) {
      const actualText = await this.apiResponse.text();
      expect(actualText).toEqual(expectedText);
    }
  }

  async verifyPartialResponseBodyMatchesWithJsonFile(jsonFilePath: string): Promise<void> {
    const fileContent = await fs.readFile(jsonFilePath, 'utf-8');
    const expectedResponse = await this.parseJSONPayload(fileContent);
    if (this.apiResponse) {
      const actualResponse = await this.apiResponse.json();
      for (const key in expectedResponse) {
        if (Object.hasOwn(expectedResponse, key)) {
          expect(actualResponse).toHaveProperty(key);
          expect(actualResponse[key]).toEqual(expectedResponse[key]);
        }
      }
    }
  }

  async verifySpecificKeyFromResponseBody(
    keyToCheck: string,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    expectedValue?: any,
  ): Promise<void> {
    if (!this.apiResponse) {
      throw new Error(`No API response available to check for key: ${keyToCheck}`);
    }
    const actualResponse = await this.apiResponse.json();
    if (Array.isArray(actualResponse)) {
      this.handleArrayResponse(actualResponse, keyToCheck, expectedValue);
    } else if (typeof actualResponse === 'object' && actualResponse !== null) {
      this.handleObjectResponse(actualResponse, keyToCheck, expectedValue);
    } else {
      throw new Error(
        `API response is not a JSON object or array, received: ${typeof actualResponse}`,
      );
    }
  }

  private handleArrayResponse(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    actualResponse: any[],
    keyToCheck: string,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    expectedValue?: any,
  ): void {
    const allItemsMatch = actualResponse.every((item) =>
      this.checkItemForKey(item, keyToCheck, expectedValue),
    );
    expect(allItemsMatch).toBe(true);
  }

  private handleObjectResponse(
    actualResponse: object,
    keyToCheck: string,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    expectedValue?: any,
  ): void {
    expect(actualResponse).toHaveProperty(keyToCheck);

    if (expectedValue !== undefined) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      expect((actualResponse as any)[keyToCheck]).toEqual(expectedValue);
    }
  }

  private checkItemForKey(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    item: any,
    keyToCheck: string,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    expectedValue?: any,
  ): boolean {
    if (typeof item !== 'object' || item === null || !Object.hasOwn(item, keyToCheck)) {
      return false;
    }
    return expectedValue === undefined || item[keyToCheck] === expectedValue;
  }

  async verifyKeyContainsMultipleValues(
    keyToCheck: string,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    expectedValues: any[],
  ): Promise<void> {
    if (!this.apiResponse) {
      throw new Error(`No API response available to check for key: ${keyToCheck}`);
    }
    const actualResponse = await this.apiResponse.json();
    if (!Array.isArray(actualResponse)) {
      throw new TypeError('Input is not an array.');
    }
    if (actualResponse.length === 0) {
      throw new Error('Response array is empty. Cannot check for values.');
    }
    if (expectedValues.length === 0) {
      throw new Error('No expected values provided to check.');
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const actualValuesFound = new Set<any>();
    for (const item of actualResponse) {
      if (typeof item !== 'object' || item === null) {
        continue;
      }
      if (!Object.hasOwn(item, keyToCheck)) {
        continue;
      }
      const value = item[keyToCheck];
      actualValuesFound.add(value);
    }
    const allExpectedValuesPresent = expectedValues.every((expectedVal) =>
      actualValuesFound.has(expectedVal),
    );
    expect(allExpectedValuesPresent).toBe(true);
  }

  // Legacy method aliases for backward compatibility
  async get(url: string, _options?: Record<string, unknown>): Promise<APIResponse> {
    return await this.sendGetRequest(url, _options as Record<string, string>);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async post(url: string, data?: any, _options?: Record<string, unknown>): Promise<APIResponse> {
    return await this.sendPostRequestWithParsedPayload({
      apiendpoint: url,
      payloaddata: data,
    });
  }

  async put(url: string, data?: string, _options?: Record<string, unknown>): Promise<APIResponse> {
    return await this.sendPutRequestWithFullBodyPayload({
      apiendpoint: url,
      data: data || '',
    });
  }

  async delete(url: string, _options?: Record<string, unknown>): Promise<APIResponse> {
    return await this.sendDeleteRequest(url, _options as Record<string, string>);
  }

  async patch(
    url: string,
    data?: string,
    _options?: Record<string, unknown>,
  ): Promise<APIResponse> {
    return await this.sendPatchRequest({
      apiendpoint: url,
      data: data || '',
    });
  }
}
