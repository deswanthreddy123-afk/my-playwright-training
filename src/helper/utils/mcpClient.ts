import axios from 'axios';

const MCP_URL = process.env.MCP_URL || 'http://localhost:4000';

// Example: fetch selector for a given page and element from MCP server, with fallback
export async function getSelector(page: string, element: string): Promise<string> {
  try {
    const url = `${MCP_URL}/mcp/selectors?page=${encodeURIComponent(page)}&element=${encodeURIComponent(element)}`;
    const response = await axios.get(url);
    return response.data.selector;
  } catch (e) {
    // Fallback: return a hardcoded selector if MCP server is unavailable
    if (element === 'username') return 'input[type="email"]';
    if (element === 'password') return 'input[name="password"]';
    if (element === 'submit') return 'button[type="submit"]';
    throw e;
  }
}

export async function updateSelector(
  page: string,
  element: string,
  selector: string,
): Promise<void> {
  try {
    await axios.post(`${MCP_URL}/mcp/selectors`, { page, element, selector });
  } catch {
    // Non-fatal: ignore update failures
  }
}
