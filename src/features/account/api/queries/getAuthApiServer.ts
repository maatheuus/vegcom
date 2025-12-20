"use server";

import type { User } from "@/entities/user/types";
import type { AuthResponse, LoginCredentials } from "@/features/auth/types";
import { serverFetch } from "@/shared/api/axios/serverFetch";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

interface ApiResponse<T> {
  success: boolean;
  data: T;
}

export const getUser = async () => {
  return serverFetch<ApiResponse<User>>("/auth/me", {
    method: "GET",
    next: { tags: ["user"] },
  });
};

export const getSignin = async (credentials: LoginCredentials) => {
  const responseData = await serverFetch<AuthResponse>("/auth/signin", {
    method: "POST",
    next: { tags: ["user"] },
    body: credentials,
  });

  const cookieStore = await cookies();

  cookieStore.set("token", responseData.accessToken, {
    // httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7, // 7 days in seconds
    path: "/",
  });

  revalidatePath("/auth/me");
  return responseData;
};

export const logout = async () => {
  const cookieStore = await cookies();
  cookieStore.delete("token");
  revalidatePath("/");
};
