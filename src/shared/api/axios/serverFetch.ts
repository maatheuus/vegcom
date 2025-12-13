import { cookies } from "next/headers";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;
const TEMPORARY_TOKEN = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6IlRlc3QgMiIsImVtYWlsIjoidGVzdCsxNkBjb20uY29tIiwiaWF0IjoxNzY1NDg5NTQzLCJleHAiOjE3NjYwOTQzNDN9.eUATS0OyyyC-8a3Jwg25CYRP8I1V4-G9BNG5EyzEKxQ`;

interface FetchOptions extends Omit<RequestInit, "body"> {
  body?: object;
}

export const serverFetch = async <T>(
  endpoint: string,
  options: FetchOptions = {},
): Promise<T> => {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value || TEMPORARY_TOKEN;

  const headers: HeadersInit = {
    "Content-Type": "application/json",
    ...options.headers,
  };

  if (token) {
    (headers as Record<string, string>)["Authorization"] = `Bearer ${token}`;
  }

  const response = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers,
    body: options.body ? JSON.stringify(options.body) : undefined,
    // cache: "no-store", // Descomente se quiser evitar cache do Next.js (SSR dinâmico)
  });

  if (!response.ok) {
    if (response.status === 401) {
      console.error("Token expirado ou inválido no servidor");
    }

    const errorData = await response.json().catch(() => null);
    throw new Error(
      errorData?.message || `Request failed with status ${response.status}`,
    );
  }

  return response.json();
};
