export interface Credentials {
  username: string;
  password: string;
}

export interface AuthToken {
  accessToken: string;
  refreshToken?: string;
  expiresAt?: number;
}
