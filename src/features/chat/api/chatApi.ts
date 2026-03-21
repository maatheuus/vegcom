import { api } from "@/shared/api/axios/axiosInstance";
import type {
  CreateChatResponse,
  GetChatByIdResponse,
  GetChatMessageDataPayload,
  GetChatMessageDataResponse,
  SendMessagePayload,
} from "./types";

const chatApi = {
  createChat: async (data: SendMessagePayload) => {
    const { data: responseData } = await api.post<CreateChatResponse>(
      "/chat/create",
      data,
    );
    return responseData;
  },

  getChats: async () => {
    const { data } = await api.get<CreateChatResponse[]>("/chat/list");
    return data;
  },

  getChatMessage: async (payload: GetChatMessageDataPayload) => {
    const { data } = await api.post<GetChatMessageDataResponse>(
      "/chat/message",
      payload,
    );
    return data;
  },

  getChatById: async (id: number) => {
    const { data } = await api.get<GetChatByIdResponse>(`/chat/${id}`);
    return data;
  },

  updateChat: async (id: number, data: SendMessagePayload) => {
    const { data: responseData } = await api.put<CreateChatResponse>(
      `/chat/${id}`,
      data,
    );
    return responseData;
  },

  updateChatTitle: async (payload: { id: number; title: string }) => {
    const { data } = await api.patch<CreateChatResponse>(
      `/chat/${payload.id}/title`,
      { title: payload.title },
    );

    return data;
  },

  deleteChat: async (id: number) => {
    const { data } = await api.delete<CreateChatResponse>(`/chat/${id}`);
    return data;
  },
};

export { chatApi };
