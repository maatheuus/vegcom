"use server";

import { serverFetch } from "@/shared/api/axios/serverFetch";
import { revalidatePath } from "next/cache";
import type {
  CreateChatResponse,
  GetChatByIdResponse,
  GetChatMessageDataPayload,
  GetChatMessageDataResponse,
  GetChatsData,
  SendMessagePayload,
} from "../types";

export const getChats = async () => {
  return serverFetch<GetChatsData>("/chat/list", {
    method: "GET",
    next: { tags: ["chats"] },
  });
};

export const getChatById = async (id: number) => {
  return serverFetch<GetChatByIdResponse>(`/chat/${id}`, {
    method: "GET",
  });
};

export const createChat = async (data: SendMessagePayload) => {
  revalidatePath("/chat/list");
  return serverFetch<CreateChatResponse>("/chat/create", {
    method: "POST",
    body: data,
  });
};

export const getChatMessage = async (payload: GetChatMessageDataPayload) => {
  return serverFetch<GetChatMessageDataResponse>("/chat/message", {
    method: "POST",
    body: payload,
  });
};

export const updateChat = async (id: number, data: SendMessagePayload) => {
  revalidatePath("/chat/list");
  return serverFetch<CreateChatResponse>(`/chat/${id}`, {
    method: "PUT",
    body: data,
  });
};

export const updateChatTitle = async (payload: {
  id: number;
  title: string;
}) => {
  revalidatePath("/chat/list");
  return serverFetch<CreateChatResponse>(`/chat/${payload.id}/title`, {
    method: "PATCH",
    body: { title: payload.title },
  });
};

export const deleteChat = async (id: number) => {
  revalidatePath("/chat/list");
  return serverFetch<CreateChatResponse>(`/chat/${id}`, {
    method: "DELETE",
  });
};
