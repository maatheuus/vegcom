import { mockDelay } from "./mock";

export class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
    public data?: unknown,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

export interface ApiResponse<T> {
  data: T;
  status: number;
  message?: string;
  code?: string;
}

export interface ApiClientConfig {
  baseURL?: string;
  timeout?: number;
  headers?: Record<string, string>;
}

class ApiClient {
  private config: ApiClientConfig;

  constructor(config: ApiClientConfig = {}) {
    this.config = {
      baseURL: config.baseURL || "/api",
      timeout: config.timeout || 5000,
      headers: config.headers || {},
    };
  }

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

  async get<T>(
    endpoint: string,
    options: { delay?: number } = {},
  ): Promise<ApiResponse<T>> {
    return this.simulateRequest<T>(endpoint, { method: "GET", ...options });
  }

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

  async delete<T>(
    endpoint: string,
    options: { delay?: number } = {},
  ): Promise<ApiResponse<T>> {
    return this.simulateRequest<T>(endpoint, { method: "DELETE", ...options });
  }
}

// Export singleton instance
export const apiClient = new ApiClient();

// Export factory for custom instances
export const createApiClient = (config: ApiClientConfig) =>
  new ApiClient(config);
