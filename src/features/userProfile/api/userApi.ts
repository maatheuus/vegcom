"use server";

import type { ApiResponse } from "@/shared";
import { serverFetch } from "@/shared/api/axios/serverFetch";
import { cookies } from "next/headers";
import type { UserProfileDetails } from "../types";

export const getUserDetails = async (id: number) => {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    throw new Error("Usuário não está autenticado");
  }

  return serverFetch<ApiResponse<UserProfileDetails>>(`/user/${id}`, {
    method: "GET",
    next: { tags: ["user_details"] },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
