import type { Metadata } from "@/features/chat/api/types";
import { api } from "../axios/axiosInstance";

export interface GenerateParams {
  query: string;
  chatId: number;
  userId: number;
}

const aiApi = {
  generateResponse: async ({
    query,
    chatId,
    userId,
  }: GenerateParams): Promise<Metadata[]> => {
    const res = await api.post("/ai/generate", { query, chatId, userId });

    if (res.status !== 200) {
      throw new Error("Failed to generate response");
    }

    return res.data;
  },
};

export { aiApi };
