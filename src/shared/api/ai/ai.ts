import type { Metadata } from "@/features/chat/api/types";
import { api } from "../axios/axiosInstance";

export interface GenerateParams {
  query: string;
  chatId?: number;
  isRegeneration?: boolean;
}

export interface UsageStats {
  used: number;
  limit: number;
  remaining: number;
  isPremium: boolean;
  resetDate: Date;
}

const aiApi = {
  generateResponse: async ({
    query,
    chatId,
    isRegeneration,
  }: GenerateParams): Promise<Metadata> => {
    const res = await api.post("/ai/generate", {
      query,
      ...(chatId ? { chatId } : {}),
      ...(isRegeneration ? { isRegeneration } : {}),
    });
    return res.data;
  },

  getUsageStats: async (): Promise<UsageStats> => {
    const { data } = await api.get<UsageStats>("/ai/usage");
    return data;
  },
};

export { aiApi };
