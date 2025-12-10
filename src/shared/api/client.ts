/**
 * Centralized API Client
 * This is a fake API client that simulates async operations
 * Replace with real API calls when backend is ready
 */

import { mockDelay } from "./mock";

/**
 * Custom error class for API-related errors.
 *
 * @class ApiError
 * @extends {Error}
 */
export class ApiError extends Error {
  /**
   * Creates an instance of ApiError.
   *
   * @param {string} message - The error message.
   * @param {number} status - The HTTP status code associated with the error.
   * @param {unknown} [data] - Optional data payload related to the error.
   */
  constructor(
    message: string,
    public status: number,
    public data?: unknown,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

/**
 * Interface representing a standardized API response.
 *
 * @template T
 */
export interface ApiResponse<T> {
  /** The data returned by the API. */
  data: T;
  /** The HTTP status code of the response. */
  status: number;
  /** An optional message accompanying the response. */
  message?: string;
}

/**
 * Configuration options for the API Client.
 */
export interface ApiClientConfig {
  /** The base URL for the API. */
  baseURL?: string;
  /** The request timeout in milliseconds. */
  timeout?: number;
  /** Custom headers to be included in requests. */
  headers?: Record<string, string>;
}

/**
 * A client class for making API requests.
 *
 * This implementation currently simulates requests but is designed to be
 * easily swappable with a real HTTP client (like fetch or axios).
 *
 * @class ApiClient
 */
class ApiClient {
  private config: ApiClientConfig;

  /**
   * Creates an instance of ApiClient.
   *
   * @param {ApiClientConfig} [config={}] - Configuration options for the client.
   */
  constructor(config: ApiClientConfig = {}) {
    this.config = {
      baseURL: config.baseURL || "/api",
      timeout: config.timeout || 5000,
      headers: config.headers || {},
    };
  }

  /**
   * Simulates an API request with optional delay and failure.
   *
   * @private
   * @template T
   * @param {string} endpoint - The API endpoint to hit.
   * @param {Object} [options={}] - Options for the request.
   * @param {string} [options.method] - The HTTP method (GET, POST, etc.).
   * @param {unknown} [options.data] - The data to send with the request.
   * @param {number} [options.delay] - The simulation delay in milliseconds.
   * @param {boolean} [options.shouldFail] - Whether the request should intentionally fail.
   * @returns {Promise<ApiResponse<T>>} A promise resolving to the API response.
   * @throws {ApiError} If the request is configured to fail.
   */
  private async simulateRequest<T>(
    endpoint: string,
    options: {
      method?: string;
      data?: unknown;
      delay?: number;
      shouldFail?: boolean;
    } = {},
  ): Promise<ApiResponse<T>> {
    const { delay = 800, shouldFail = false } = options;

    // Simulate network delay
    await mockDelay(delay);

    if (shouldFail) {
      throw new ApiError("Request failed", 500);
    }

    // In a real implementation, this would be:
    // const response = await fetch(`${this.config.baseURL}${endpoint}`, {
    //   method: options.method || 'GET',
    //   headers: this.config.headers,
    //   body: options.data ? JSON.stringify(options.data) : undefined,
    // });

    return {
      data: options.data as T,
      status: 200,
      message: "Success",
    };
  }

  /**
   * Performs a GET request.
   *
   * @template T
   * @param {string} endpoint - The endpoint URL.
   * @param {Object} [options={}] - Additional options.
   * @param {number} [options.delay] - Simulation delay in milliseconds.
   * @returns {Promise<ApiResponse<T>>} The response data.
   */
  async get<T>(
    endpoint: string,
    options: { delay?: number } = {},
  ): Promise<ApiResponse<T>> {
    return this.simulateRequest<T>(endpoint, { method: "GET", ...options });
  }

  /**
   * Performs a POST request.
   *
   * @template T
   * @param {string} endpoint - The endpoint URL.
   * @param {unknown} data - The payload to send.
   * @param {Object} [options={}] - Additional options.
   * @param {number} [options.delay] - Simulation delay in milliseconds.
   * @returns {Promise<ApiResponse<T>>} The response data.
   */
  async post<T>(
    endpoint: string,
    data: unknown,
    options: { delay?: number } = {},
  ): Promise<ApiResponse<T>> {
    return this.simulateRequest<T>(endpoint, {
      method: "POST",
      data,
      ...options,
    });
  }

  /**
   * Performs a PUT request.
   *
   * @template T
   * @param {string} endpoint - The endpoint URL.
   * @param {unknown} data - The payload to send.
   * @param {Object} [options={}] - Additional options.
   * @param {number} [options.delay] - Simulation delay in milliseconds.
   * @returns {Promise<ApiResponse<T>>} The response data.
   */
  async put<T>(
    endpoint: string,
    data: unknown,
    options: { delay?: number } = {},
  ): Promise<ApiResponse<T>> {
    return this.simulateRequest<T>(endpoint, {
      method: "PUT",
      data,
      ...options,
    });
  }

  /**
   * Performs a PATCH request.
   *
   * @template T
   * @param {string} endpoint - The endpoint URL.
   * @param {unknown} data - The payload to send.
   * @param {Object} [options={}] - Additional options.
   * @param {number} [options.delay] - Simulation delay in milliseconds.
   * @returns {Promise<ApiResponse<T>>} The response data.
   */
  async patch<T>(
    endpoint: string,
    data: unknown,
    options: { delay?: number } = {},
  ): Promise<ApiResponse<T>> {
    return this.simulateRequest<T>(endpoint, {
      method: "PATCH",
      data,
      ...options,
    });
  }

  /**
   * Performs a DELETE request.
   *
   * @template T
   * @param {string} endpoint - The endpoint URL.
   * @param {Object} [options={}] - Additional options.
   * @param {number} [options.delay] - Simulation delay in milliseconds.
   * @returns {Promise<ApiResponse<T>>} The response data.
   */
  async delete<T>(
    endpoint: string,
    options: { delay?: number } = {},
  ): Promise<ApiResponse<T>> {
    return this.simulateRequest<T>(endpoint, { method: "DELETE", ...options });
  }
}

/**
 * Singleton instance of the ApiClient.
 */
export const apiClient = new ApiClient();

/**
 * Factory function to create custom ApiClient instances.
 *
 * @param {ApiClientConfig} config - The configuration for the new client.
 * @returns {ApiClient} A new ApiClient instance.
 */
export const createApiClient = (config: ApiClientConfig) =>
  new ApiClient(config);
