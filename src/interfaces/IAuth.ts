export interface ILoginPayload {
  email: string;
  password: string;
}

export interface TokenPayload {
  accessToken: string;
  refreshToken: string;
}
