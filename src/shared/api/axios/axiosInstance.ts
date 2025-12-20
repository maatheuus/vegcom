import { isTokenExpired } from "@/shared/lib/jwt";
import axios from "axios";

/**
 * Gets the authentication token from cookies
 * This works on client-side by reading document.cookie
 */
function getTokenFromCookies(): string | null {
  if (typeof window === "undefined") return null;

  const cookies = document.cookie.split("; ");
  console.log("cookies", cookies);
  const tokenCookie = cookies.find((cookie) => cookie.startsWith("token="));
  console.log("tokenCookie", tokenCookie);
  if (!tokenCookie) return null;

  const token = tokenCookie.split("=")[1];
  console.log("token", token);
  if (isTokenExpired(token)) {
    console.log("token expired");
    return null;
  }

  return token;
}

/**
 * Clears the authentication token cookie
 */
function clearTokenCookie(): void {
  if (typeof window === "undefined") return;

  document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
}

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 15000,
  validateStatus: (status) => status >= 200 && status < 300,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// REQUEST INTERCEPTOR
api.interceptors.request.use(
  (config) => {
    const token = getTokenFromCookies();

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error),
);

// RESPONSE INTERCEPTOR
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
      clearTokenCookie();

      // if (typeof window !== "undefined") {
      //   window.location.href = "/login";
      // }
    }

    return Promise.reject({
      status,
      message: data?.message || "Erro inesperado.",
      code: data?.code,
      ...data,
    });
  },
);
