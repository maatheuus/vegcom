/**
 * JWT utility functions for token validation
 */

interface JWTPayload {
  exp?: number;
  iat?: number;
  [key: string]: any;
}

/**
 * Decodes a JWT token without verification (client-side only)
 * Only use this for reading public claims like 'exp'
 */
export function decodeJWT(token: string): JWTPayload | null {
  try {
    const parts = token.split(".");
    if (parts.length !== 3) {
      return null;
    }

    const payload = parts[1];
    const decoded = atob(payload.replace(/-/g, "+").replace(/_/g, "/"));
    return JSON.parse(decoded);
  } catch (error) {
    console.error("Failed to decode JWT:", error);
    return null;
  }
}

/**
 * Checks if a JWT token is expired
 * @param token - The JWT token to check
 * @returns true if token is expired or invalid
 */
export function isTokenExpired(token: string): boolean {
  const payload = decodeJWT(token);

  if (!payload || !payload.exp) {
    return true;
  }

  // exp is in seconds, Date.now() is in milliseconds
  const currentTime = Math.floor(Date.now() / 1000);
  return payload.exp < currentTime;
}

/**
 * Gets the time until token expiration in seconds
 * @param token - The JWT token
 * @returns seconds until expiration, or 0 if expired/invalid
 */
export function getTokenExpirationTime(token: string): number {
  const payload = decodeJWT(token);

  if (!payload || !payload.exp) {
    return 0;
  }

  const currentTime = Math.floor(Date.now() / 1000);
  const timeRemaining = payload.exp - currentTime;

  return Math.max(0, timeRemaining);
}
