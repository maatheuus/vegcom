import { isTokenExpired } from "@/shared/lib/jwt";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api/v1";

interface FetchOptions extends Omit<RequestInit, "body"> {
  body?: object;
  skipRedirectOn401?: boolean;
}

export class ApiError extends Error {
  code?: string;
  status?: number;

  constructor(message: string, code?: string, status?: number) {
    super(message);
    this.name = "ApiError";
    this.code = code;
    this.status = status;
  }
}

export const serverFetch = async <T>(
  endpoint: string,
  options: FetchOptions = {},
): Promise<T> => {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (token && isTokenExpired(token)) {
    redirect("/login");
  }

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
    cache: "no-store", // Disable cache for authenticated requests
  });

  if (!response.ok) {
    if (response.status === 401 && !options.skipRedirectOn401) {
      redirect("/login?expired=true");
    }

    const errorData = await response.json().catch(() => null);
    throw new ApiError(
      errorData?.message || `Request failed with status ${response.status}`,
      errorData?.code,
      response.status,
    );
  }

  return response.json();
};
