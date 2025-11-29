/**
 * Auth feature types
 */

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface SignupData {
  username: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  user: {
    id: string;
    email: string;
    username: string;
  } | null;
  session: {
    access_token: string;
    refresh_token: string;
  } | null;
}

export interface AuthError {
  message: string;
  status: number;
}
