/**
 * Auth API - Fake implementation
 * Replace with real API calls when backend is ready
 */

import { generateMockId, mockAuth, mockDelay } from "@/shared/api/mock";
import type { AuthResponse, LoginCredentials, SignupData } from "../types";

/**
 * Authenticates a user with email and password.
 *
 * @param {LoginCredentials} credentials - The user's login credentials.
 * @returns {Promise<{ error: null; loginData: AuthResponse }>} A promise resolving to the login response data.
 */
export const login = async (
  credentials: LoginCredentials,
): Promise<{ error: null; loginData: AuthResponse }> => {
  await mockDelay(1000);

  // Fake login - always succeeds
  const fakeToken = generateMockId();
  mockAuth.setToken(fakeToken);

  return {
    error: null,
    loginData: {
      user: {
        id: generateMockId(),
        email: credentials.email,
        username: credentials.email.split("@")[0],
      },
      session: {
        access_token: fakeToken,
        refresh_token: generateMockId(),
      },
    },
  };
};

/**
 * Simulates authentication via Google OAuth.
 *
 * @returns {Promise<{ error: null; loginData: AuthResponse }>} A promise resolving to the login response data.
 */
export const loginWithGoogle = async (): Promise<{
  error: null;
  loginData: AuthResponse;
}> => {
  await mockDelay(1500);

  // Fake OAuth login
  const fakeToken = generateMockId();
  mockAuth.setToken(fakeToken);

  return {
    error: null,
    loginData: {
      user: {
        id: generateMockId(),
        email: "user@google.com",
        username: "Google User",
      },
      session: {
        access_token: fakeToken,
        refresh_token: generateMockId(),
      },
    },
  };
};

/**
 * Registers a new user account.
 *
 * @param {SignupData} data - The data required for registration.
 * @returns {Promise<{ error: null; singupData: AuthResponse }>} A promise resolving to the signup response data.
 */
export const signup = async (data: SignupData): Promise<{
  error: null;
  singupData: AuthResponse;
}> => {
  await mockDelay(1200);

  // Fake signup - always succeeds
  const fakeToken = generateMockId();
  mockAuth.setToken(fakeToken);

  return {
    error: null,
    singupData: {
      user: {
        id: generateMockId(),
        email: data.email,
        username: data.username,
      },
      session: {
        access_token: fakeToken,
        refresh_token: generateMockId(),
      },
    },
  };
};

/**
 * Logs out the current user by removing the auth token.
 *
 * @returns {Promise<{ error: null }>} A promise indicating completion.
 */
export const logout = async (): Promise<{ error: null }> => {
  await mockDelay(500);

  mockAuth.removeToken();

  return { error: null };
};

/**
 * Retrieves the currently authenticated user session.
 *
 * @returns {Promise<{ data: { user: AuthResponse["user"] } | null; error: null }>} A promise resolving to the current user data or null if not authenticated.
 */
export const getUser = async (): Promise<{
  data: { user: AuthResponse["user"] } | null;
  error: null;
}> => {
  await mockDelay(300);

  const token = mockAuth.getToken();

  if (!token) {
    return { data: null, error: null };
  }

  // Return fake user data
  return {
    data: {
      user: {
        id: "mock_user_id",
        email: "user@example.com",
        username: "Mock User",
      },
    },
    error: null,
  };
};
