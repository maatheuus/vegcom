import { getUser } from "@/features/auth/api/queries/getAuthApiServer";
import type { Metadata } from "@/features/chat/api/types";
import { api } from "../axios/axiosInstance";

export interface GenerateParams {
  query: string;
  chatId: number;
  isRegeneration?: boolean;
}

const aiApi = {
  generateResponse: async ({
    query,
    chatId,
    isRegeneration,
  }: GenerateParams): Promise<Metadata[]> => {
    const userId = (await getUser()).data?.id;

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
