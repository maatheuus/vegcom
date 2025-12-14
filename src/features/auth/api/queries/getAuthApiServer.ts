"use server";

import { serverFetch } from "@/shared/api/axios/serverFetch";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import type { AuthResponse, LoginCredentials } from "../../types";
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
  });
  const cookieStore = await cookies();
  cookieStore.set("token", responseData.accessToken);
  revalidatePath("/auth/me");
  return responseData;
};
