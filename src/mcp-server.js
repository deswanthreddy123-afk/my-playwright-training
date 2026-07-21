// Simple mock MCP server for selector resolution
const express = require('express');
const app = express();
app.use(express.json());
const port = 4000;

/**
 * TEMPLATE: Example selectors configuration
 *
 * TODO: Replace these with your application-specific selectors
 *
 * This MCP server provides self-healing selector resolution.
 * When a selector fails, the test framework can update it here for future runs.
 *
 * INSTRUCTIONS:
 * 1. Replace the example selectors below with selectors from your application
 * 2. Add new page configurations as your test coverage grows
 * 3. Selectors are automatically updated when tests discover better alternatives
 */
const selectors = {
  // Example: Login page selectors
  // TODO: Update with your actual login page selectors
  login: {
    username: "input[name='username']",
    password: "input[name='password']",
    submit: "button[type='submit']",
  },

  // Example: Home/Dashboard page selectors
  // TODO: Update with your actual main page selectors
  home: {
    userMenu: "[data-testid='user-menu']",
    searchInput: "input[type='search']",
    navigation: "[data-testid='nav-menu']",
  },

  // TODO: Add more page-specific selector configurations as needed
  // Example:
  // settings: {
  //   saveButton: "button[type='submit']",
  //   cancelButton: "button:has-text('Cancel')",
  // },
};

app.get('/mcp/selectors', (req, res) => {
  const { page, element } = req.query;
  const selector = selectors[page]?.[element];
  if (selector) {
    res.json({ selector });
  } else {
    res.status(404).json({ error: 'Selector not found' });
  }
});

// Upsert selector for a given page/element
app.post('/mcp/selectors', (req, res) => {
  const { page, element, selector } = req.body || {};
  if (!page || !element || !selector) {
    return res.status(400).json({ error: 'Missing page, element, or selector' });
  }
  selectors[page] = selectors[page] || {};
  selectors[page][element] = selector;
  res.json({ ok: true });
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Root endpoint with server info
app.get('/', (req, res) => {
  res.json({
    name: 'MCP Selector Server',
    status: 'running',
    endpoints: ['/mcp/selectors', '/health'],
    timestamp: new Date().toISOString(),
  });
});

app.listen(port, () => {
  console.log(`🚀 MCP server running at http://localhost:${port}`);
  console.log(`📊 Health check: http://localhost:${port}/health`);
  console.log(`🔍 Selectors API: http://localhost:${port}/mcp/selectors`);
});
