"use server";

import { serverFetch } from "@/shared/api/axios/serverFetch";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import type { AuthResponse, LoginCredentials, SignupData } from "../../types";
import type { ApiResponse, User } from "../types";

export const getUser = async () => {
  try {
    return await serverFetch<ApiResponse<User>>("/auth/me", {
      method: "GET",
      next: { tags: ["user"] },
    });
  } catch (error) {
    return { data: null } as unknown as ApiResponse<User>;
  }
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
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7,
    path: "/",
  });

  revalidatePath("/", "layout");
  return responseData;
};

export const getSignup = async (data: SignupData) => {
  return serverFetch<AuthResponse>("/auth/signup", {
    method: "POST",
    next: { tags: ["signup"] },
    body: data,
  });
};

export const logout = async () => {
  const cookieStore = await cookies();
  cookieStore.delete("token");
  revalidatePath("/", "layout");
  redirect("/login");
};
