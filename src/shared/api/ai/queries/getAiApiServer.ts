"use server";

import { getUser } from "@/features/auth/api/queries/getAuthApiServer";
import type { Metadata } from "@/features/chat/api/types";
import { serverFetch } from "@/shared/api/axios/serverFetch";
import type { GenerateParams, UsageStats } from "../ai";

export const generateResponse = async ({ query, chatId }: GenerateParams) => {
  return serverFetch<Metadata[]>("/ai/generate", {
    method: "POST",
    body: { query, chatId },
  });
};

export const getUsageStats = async () => {
  const userId = (await getUser()).data?.id;

  return serverFetch<UsageStats>("/ai/usage", {
    method: "GET",
    body: { userId },
  });
};
