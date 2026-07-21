import { request } from '@playwright/test';
import { getConfig } from '../config/env';
import type { AuthToken, Credentials } from '../helper/auth/auth';

export async function login(creds: Credentials): Promise<AuthToken> {
  const { apiBaseURL } = getConfig();
  const api = await request.newContext({ baseURL: apiBaseURL });
  const res = await api.post('/auth/login', { data: creds });
  if (!res.ok()) throw new Error(`Login failed: ${res.status()} ${res.statusText()}`);
  return (await res.json()) as AuthToken;
}
