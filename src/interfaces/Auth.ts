export interface User {
  email: string;
  password: string;
}

export interface LoginState {
  login: boolean;
  access_token: string;
  email: string;
  error: string | null | undefined;
}
