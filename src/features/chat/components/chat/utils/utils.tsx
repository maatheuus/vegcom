import { z } from "zod";
import type { Chat } from "./types";

export const STORAGE_KEY = "chat_history_v2";

const MetadataSchema = z.object({
  recipes: z.array(z.any()), // using z.any() to avoid importing/replicating deep complex Recipe schema for local storage validation
  error: z.string().nullable(),
  chatId: z.number(),
  messageContent: z.string(),
  chatTitle: z.string(),
});

const LastMessageSchema = z.object({
  id: z.number(),
  chatId: z.number(),
  role: z.enum(["assistant", "user"]),
  content: z.string(),
  isRead: z.boolean(),
  metadata: MetadataSchema.nullable(),
  createdAt: z.string(),
});

const ChatSchema = z.object({
  id: z.string(),
  title: z.string(),
  messages: z.array(LastMessageSchema),
  createdAt: z.number(),
  updatedAt: z.number(),
});

const ChatsArraySchema = z.array(ChatSchema);

export const loadChats = (): Chat[] => {
  if (typeof window === "undefined") return [];
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) return [];

    const parsed = JSON.parse(data);
    const result = ChatsArraySchema.safeParse(parsed);

    if (result.success) {
      return result.data;
    } else {
      console.error("Failed to parse chat history:", result.error);
      localStorage.removeItem(STORAGE_KEY);
      return [];
    }
  } catch {
    return [];
  }
};

export const saveChats = (chats: Chat[]) => {
  try {
    const result = ChatsArraySchema.safeParse(chats);
    if (!result.success) {
      console.error("Refusing to save malformed chats:", result.error);
      return;
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(result.data));
  } catch (e) {
    console.error("Failed to save chats:", e);
  }
};
