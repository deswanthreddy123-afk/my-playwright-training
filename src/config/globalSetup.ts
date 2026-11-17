import { chromium, FullConfig } from '@playwright/test';
import * as fs from 'node:fs';
import * as path from 'node:path';
import axios from 'axios';
import { LoginPage } from '../pages/login.page';

const MCP_URL = process.env.MCP_URL || 'http://localhost:4000';
const MAX_RETRIES = 30;
const RETRY_DELAY = 1000;

// Shared authenticated session reused by every scenario (single login).
export const STORAGE_STATE = path.join(process.cwd(), '.auth', 'user.json');

async function waitForMcpServer(): Promise<void> {
  console.log('⏳ Waiting for MCP server to be ready...');

  for (let i = 0; i < MAX_RETRIES; i++) {
    const isHealthy = await checkMcpHealth();

    if (isHealthy) {
      logServerReady();
      return;
    }

    await handleRetry(i);
  }
}

async function checkMcpHealth(): Promise<boolean> {
  try {
    const response = await axios.get(`${MCP_URL}/health`);
    return response.status === 200 && response.data.status === 'ok';
  } catch {
    return false;
  }
}

function logServerReady(): void {
  console.log('✅ MCP server is ready and healthy!');
  console.log(`🔗 Server URL: ${MCP_URL}`);
}

async function handleRetry(attemptIndex: number): Promise<void> {
  if (attemptIndex === MAX_RETRIES - 1) {
    logServerFailure();
    throw new Error(`MCP server not available at ${MCP_URL} after ${MAX_RETRIES} retries`);
  }

  if (attemptIndex % 5 === 0) {
    console.log(`⏳ Waiting for MCP server... (attempt ${attemptIndex + 1}/${MAX_RETRIES})`);
  }

  await new Promise((resolve) => setTimeout(resolve, RETRY_DELAY));
}

function logServerFailure(): void {
  console.error('❌ MCP server failed to start within timeout');
  console.error(`💡 Make sure to run 'npm run start:mcp' or check if port 4000 is available`);
}

async function globalSetup(config: FullConfig) {
  // Wait for MCP server to be available
  await waitForMcpServer();

  const reuseSession = process.env.REUSE_SESSION === 'true';
  if (reuseSession && !fs.existsSync(STORAGE_STATE)) {
    throw new Error('No saved session found. Run node scripts/save-session.js to sign in and save one.');
  }

  if (reuseSession) {
    console.log(`♻️ Reusing saved session ${STORAGE_STATE}`);
  } else {
    await createAuthenticatedSession(config);
  }

  console.log('🚀 Global setup completed - tests ready to run!');
}

async function createAuthenticatedSession(config: FullConfig): Promise<void> {
  console.log('🔐 Performing one-time login to create shared session...');

  const browser = await chromium.launch({
    headless: config.projects[0]?.use.headless ?? false,
    args: ['--ignore-certificate-errors', '--ignore-ssl-errors'],
  });
  const context = await browser.newContext({
    ignoreHTTPSErrors: true,
    viewport: { width: 1920, height: 1080 },
    geolocation: { latitude: 29.7604, longitude: -95.3698 },
    permissions: ['geolocation'],
  });
  const page = await context.newPage();

  try {
    const loginPage = new LoginPage(page);
    await loginPage.navigate();
    await loginPage.login();
    await loginPage.gotoPlannedOperations();

    fs.mkdirSync(path.dirname(STORAGE_STATE), { recursive: true });
    await context.storageState({ path: STORAGE_STATE });
    console.log(`✅ Shared session saved to ${STORAGE_STATE}`);
  } finally {
    await browser.close();
  }
}

export default globalSetup;
