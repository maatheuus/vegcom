import type { Metadata } from "@/features/chat/api/types";
import { api } from "../axios/axiosInstance";

export interface GenerateParams {
  query: string;
  chatId: number;
  userId: number;
  isRegeneration?: boolean;
}

const aiApi = {
  generateResponse: async ({
    query,
    chatId,
    userId,
    isRegeneration,
  }: GenerateParams): Promise<Metadata[]> => {
    const res = await api.post("/ai/generate", {
      query,
      chatId,
      userId,
      isRegeneration,
    });
    return res.data;
  },
};

export { aiApi };
