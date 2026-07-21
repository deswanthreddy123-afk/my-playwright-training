/**
 * API Endpoints Configuration
 */

export const API_ENDPOINTS = {
  // Authentication
  LOGIN: '/api/auth/login',
  LOGOUT: '/api/auth/logout',
  REFRESH_TOKEN: '/api/auth/refresh',

  // Asset Tracker
  CONNECTORS: '/api/connectors',
  CONNECTOR_BY_ID: (id: string) => `/api/connectors/${id}`,

  // Health Check
  HEALTH: '/api/health',
  MCP_HEALTH: '/mcp/health',
} as const;

export const getFullEndpoint = (baseUrl: string, endpoint: string): string => {
  return `${baseUrl}${endpoint}`;
};
