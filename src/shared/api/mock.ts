/**
 * Mock utilities for simulating API behavior
 */

/**
 * Simulates network delay.
 *
 * @param {number} [ms=800] - The delay in milliseconds.
 * @returns {Promise<void>} A promise that resolves after the specified delay.
 */
export const mockDelay = (ms: number = 800): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

/**
 * Simulates random success/failure based on a probability.
 *
 * @param {number} [successRate=0.9] - The probability of success (between 0 and 1).
 * @returns {boolean} True if successful, false otherwise.
 */
export const randomSuccess = (successRate: number = 0.9): boolean => {
  return Math.random() < successRate;
};

/**
 * Generates a mock ID string.
 *
 * @returns {string} A unique-ish string suitable for use as an ID.
 */
export const generateMockId = (): string => {
  return `mock_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
};

/**
 * Simulates pagination for an array of data.
 *
 * @template T
 * @param {T[]} data - The full dataset.
 * @param {number} [page=1] - The current page number (1-based).
 * @param {number} [pageSize=10] - The number of items per page.
 * @returns {Object} An object containing the paginated data and metadata.
 * @returns {T[]} return.data - The subset of data for the current page.
 * @returns {number} return.page - The current page number.
 * @returns {number} return.pageSize - The page size.
 * @returns {number} return.total - The total number of items.
 * @returns {number} return.totalPages - The total number of pages.
 */
export const paginate = <T>(
  data: T[],
  page: number = 1,
  pageSize: number = 10,
): {
  data: T[];
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
} => {
  const start = (page - 1) * pageSize;
  const end = start + pageSize;

  return {
    data: data.slice(start, end),
    page,
    pageSize,
    total: data.length,
    totalPages: Math.ceil(data.length / pageSize),
  };
};

/**
 * Mock local storage for fake auth token.
 * Provides methods to set, get, remove, and check the existence of a token.
 */
export const mockAuth = {
  /**
   * Sets the mock auth token in local storage.
   * @param {string} token - The token string.
   */
  setToken: (token: string) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("mock_auth_token", token);
    }
  },
  /**
   * Retrieves the mock auth token from local storage.
   * @returns {string | null} The token or null if not found.
   */
  getToken: (): string | null => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("mock_auth_token");
    }
    return null;
  },
  /**
   * Removes the mock auth token from local storage.
   */
  removeToken: () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("mock_auth_token");
    }
  },
  /**
   * Checks if the user is authenticated (i.e., if a token exists).
   * @returns {boolean} True if authenticated, false otherwise.
   */
  isAuthenticated: (): boolean => {
    return mockAuth.getToken() !== null;
  },
};
