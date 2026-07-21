/**
 * Custom Report Generator
 */

import { Reporter, TestCase, TestResult } from '@playwright/test/reporter';

export class CustomReporter implements Reporter {
  onBegin(): void {
    console.log('Starting test execution...');
  }

  onTestEnd(test: TestCase, result: TestResult): void {
    const status = result.status === 'passed' ? '✓' : '✗';
    console.log(`${status} ${test.title} - ${result.status}`);
  }

  onEnd(): void {
    console.log('Test execution completed!');
  }
}

export default CustomReporter;
