/**
 * Test Data Utility Functions
 */

import * as fs from 'node:fs';
import * as path from 'node:path';

export class TestDataUtils {
  static loadJsonData<T>(fileName: string): T {
    const filePath = path.join(process.cwd(), 'testdata', fileName);
    const rawData = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(rawData) as T;
  }

  static saveJsonData<T>(fileName: string, data: T): void {
    const filePath = path.join(process.cwd(), 'testdata', fileName);
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  }

  static loadCsvData(fileName: string): string[][] {
    const filePath = path.join(process.cwd(), 'testdata', fileName);
    const rawData = fs.readFileSync(filePath, 'utf-8');
    return rawData.split('\n').map((row) => row.split(','));
  }

  static generateTestUser(prefix = 'test') {
    return {
      username: `${prefix}_${Date.now()}`,
      email: `${prefix}_${Date.now()}@example.com`,
      password: 'Test@1234',
      firstName: 'Test',
      lastName: 'User',
    };
  }
}
