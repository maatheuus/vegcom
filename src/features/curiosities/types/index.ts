/**
 * Curiosity feature types
 */

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  createdAt: string;
}

export interface SendMessageData {
  content: string;
}
