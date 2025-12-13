"use server";

import type { Metadata } from "@/features/chat/api/types";
import { serverFetch } from "@/shared/api/axios/serverFetch";
import { revalidatePath } from "next/cache";
import type { GenerateParams } from "../ai";

export const generateResponse = async ({
  query,
  chatId,
  userId,
}: GenerateParams) => {
  const response = await serverFetch<Metadata[]>("/ai/generate", {
    method: "POST",
    body: { query, chatId },
  });

  revalidatePath(`/chat/${chatId}`);
  return response;
};
