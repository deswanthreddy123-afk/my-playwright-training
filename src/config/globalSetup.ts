import { chromium, FullConfig } from '@playwright/test';
import axios from 'axios';

const MCP_URL = process.env.MCP_URL || 'http://localhost:4000';
const MAX_RETRIES = 30;
const RETRY_DELAY = 1000;

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

async function globalSetup(_config: FullConfig) {
  // Wait for MCP server to be available
  await waitForMcpServer();

  // Optional: Warm up the browser for faster test execution
  const browser = await chromium.launch();
  await browser.close();

  console.log('🚀 Global setup completed - tests ready to run!');
}

export default globalSetup;
