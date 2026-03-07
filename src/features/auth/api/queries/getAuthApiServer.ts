"use server";

import { serverFetch } from "@/shared/api/axios/serverFetch";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import type { AuthResponse, LoginCredentials, SignupData } from "../../types";
import type { ApiResponse, User } from "../types";

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
    skipRedirectOn401: true,
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

export const getSignup = async (data: SignupData) => {
  const responseData = await serverFetch<AuthResponse>("/auth/signup", {
    method: "POST",
    next: { tags: ["signup"] },
    body: data,
  });

  return responseData;
};

export const logout = async () => {
  const cookieStore = await cookies();
  cookieStore.delete("token");
  revalidatePath("/");
};
