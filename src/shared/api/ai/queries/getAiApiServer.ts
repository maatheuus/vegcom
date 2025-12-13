"use server";

import type { Metadata } from "@/features/chat/api/types";
import { serverFetch } from "@/shared/api/axios/serverFetch";
import type { GenerateParams } from "../ai";

export const generateResponse = async ({
  query,
  chatId,
  userId,
}: GenerateParams) => {
  return serverFetch<Metadata[]>("/ai/generate", {
    method: "POST",
    body: { query, chatId, userId },
  });
};
