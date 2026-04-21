import { isTokenExpired } from "@/shared/lib/jwt";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

interface FetchOptions extends Omit<RequestInit, "body"> {
  body?: object | FormData;
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

  const isFormData = options.body instanceof FormData;

  const headers: HeadersInit = {
    // For FormData, let the browser set Content-Type with the correct boundary
    ...(!isFormData && { "Content-Type": "application/json" }),
    ...options.headers,
  };

  if (token) {
    (headers as Record<string, string>)["Authorization"] = `Bearer ${token}`;
  }

  const response = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers,
    body: isFormData ? (options.body as FormData) : options.body ? JSON.stringify(options.body) : undefined,
    cache: "no-store",
  });

  if (!response.ok) {
    if (response.status === 401 && !options.skipRedirectOn401) {
      const expiredParam = token ? "?expired=true" : "";
      redirect(`/login${expiredParam}`);
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
