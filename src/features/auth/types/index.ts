/**
 * Auth feature types
 */

/**
 * Credentials required for logging in.
 */
export interface LoginCredentials {
  /** The user's email address. */
  email: string;
  /** The user's password. */
  password: string;
}

/**
 * Data required for user registration.
 */
export interface SignupData {
  /** The desired username. */
  username: string;
  /** The user's email address. */
  email: string;
  /** The user's chosen password. */
  password: string;
}

/**
 * Structure of the authentication response from the API.
 */
export interface AuthResponse {
  /** The authenticated user's details, or null if login failed. */
  user: {
    /** Unique identifier for the user. */
    id: string;
    /** The user's email address. */
    email: string;
    /** The user's username. */
    username: string;
  } | null;
  /** The session tokens, or null if login failed. */
  session: {
    /** JWT access token. */
    access_token: string;
    /** Token used to refresh the access token. */
    refresh_token: string;
  } | null;
}

/**
 * Standard error structure for authentication failures.
 */
export interface AuthError {
  /** Descriptive error message. */
  message: string;
  /** HTTP status code associated with the error. */
  status: number;
}
