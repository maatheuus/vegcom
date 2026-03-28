import axios from "axios";

const TOKEN_STORAGE_KEY = "vegcom_access_token";

export function getAccessToken(): string | null {
  if (typeof window === "undefined") return null;
  return window.localStorage.getItem(TOKEN_STORAGE_KEY);
}

export function setAccessToken(token: string): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(TOKEN_STORAGE_KEY, token);
}

export function removeAccessToken(): void {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(TOKEN_STORAGE_KEY);
}

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 60000, // 60 seconds
  validateStatus: (status) => status >= 200 && status < 300,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// RESPONSE INTERCEPTOR
api.interceptors.request.use(
  (config) => {
    const token = getAccessToken();

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error),
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (!error.response) {
      return Promise.reject({
        message: "Erro de conexão. Verifique sua internet.",
        original: error,
      });
    }

    const { status, data } = error.response;

    if (status === 401) {
      removeAccessToken();
    }

    return Promise.reject({
      status,
      message: data?.message || "Erro inesperado.",
      code: data?.code,
      ...data,
    });
  },
);
