import axios from "axios";

// const TEMPORARY_TOKEN = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6IlRlc3QgMiIsImVtYWlsIjoidGVzdCsxNkBjb20uY29tIiwiaWF0IjoxNzY1NDg5NTQzLCJleHAiOjE3NjYwOTQzNDN9.eUATS0OyyyC-8a3Jwg25CYRP8I1V4-G9BNG5EyzEKxQ`;

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 15000,
  validateStatus: (status) => status >= 200 && status < 300,
  headers: {
    "Content-Type": "application/json",
  },
});

// REQUEST INTERCEPTOR
api.interceptors.request.use(
  (config) => {
    const token =
      typeof window !== "undefined" ? localStorage.getItem("token") : null;

    if (token) config.headers.Authorization = `Bearer ${token}`;

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
      localStorage.removeItem("token");
    }

    return Promise.reject({
      status,
      message: data?.message || "Erro inesperado.",
      code: data?.code,
      ...data,
    });
  },
);
