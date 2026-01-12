import type { Recipe } from "@/entities/recipe";

interface Ingredient {
  name: string;
  quantity: string;
  notes?: string;
}

export interface Metadata {
  recipes: Recipe[];
  error: null | string;
  chatId: number;
  messageContent: string;
  chatTitle: string;
}

export interface SendMessagePayload {
  title: string;
  topic: string;
}

export interface CreateChatResponseData {
  id: number;
  userId: number;
  createdAt: string;
  updatedAt: string;
  title: string;
  topic: string;
}

export interface LastMessage {
  id: number;
  chatId: number;
  role: Role;
  content: string;
  isRead: boolean;
  metadata: Metadata | null;
  createdAt: string;
}

export interface GetChatsDataResponse extends CreateChatResponseData {
  lastMessage: LastMessage;
}

export interface GetChatsData {
  success: boolean;
  data: GetChatsDataResponse[];
}

export interface CreateChatResponse {
  success: boolean;
  data: CreateChatResponseData | CreateChatResponseData[];
}

export interface GetChatByIdDataResponse extends CreateChatResponseData {
  messages: LastMessage[];
}

export interface GetChatByIdResponse {
  success: boolean;
  data: GetChatByIdDataResponse;
}

export interface GetChatMessageDataPayload {
  chatId: number;
  role: Role;
  content: string;
}

export interface GetChatMessageDataResponse {
  id: number;
  chatId: number;
  role: Role;
  content: string;
  isRead: boolean;
  metadata: Metadata | null;
  createdAt: Date;
}

export interface GetChatMessageResponse {
  success: boolean;
  data: GetChatMessageDataResponse;
}

type Role = "assistant" | "user";
