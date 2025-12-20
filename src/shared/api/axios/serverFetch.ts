import { isTokenExpired } from "@/shared/lib/jwt";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

interface FetchOptions extends Omit<RequestInit, "body"> {
  body?: object;
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
    if (response.status === 401) {
      redirect("/login?expired=true");
    }

    const errorData = await response.json().catch(() => null);
    throw new Error(
      errorData?.message || `Request failed with status ${response.status}`,
    );
  }

  return response.json();
};
