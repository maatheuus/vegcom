/**
 * Mock utilities for simulating API behavior
 */

/**
 * Simulates network delay
 */
export const mockDelay = (ms: number = 800): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

/**
 * Simulates random success/failure
 */
export const randomSuccess = (successRate: number = 0.9): boolean => {
  return Math.random() < successRate;
};

/**
 * Generates a mock ID
 */
export const generateMockId = (): string => {
  return `mock_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
};

/**
 * Simulates pagination
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
 * Mock local storage for fake auth token
 */
export const mockAuth = {
  setToken: (token: string) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("mock_auth_token", token);
    }
  },
  getToken: (): string | null => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("mock_auth_token");
    }
    return null;
  },
  removeToken: () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("mock_auth_token");
    }
  },
  isAuthenticated: (): boolean => {
    return mockAuth.getToken() !== null;
  },
};
