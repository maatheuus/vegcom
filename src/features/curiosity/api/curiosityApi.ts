/**
 * Curiosity (Chat/AI) API - Fake implementation
 * Replace with real API calls when backend is ready
 */

import { mockDelay, generateMockId } from "@/shared/api/mock";
import type { ChatMessage, SendMessageData } from "../types";

const mockResponses = [
  "That's a great question! Let me help you with that.",
  "Interesting! Here's what I think...",
  "Based on vegan cooking principles, I'd suggest...",
  "Great idea! You could try...",
];

/**
 * Send message and get AI response
 */
export const sendMessage = async (
  _data: SendMessageData,
): Promise<ChatMessage> => {
  await mockDelay(1500);

  const randomResponse =
    mockResponses[Math.floor(Math.random() * mockResponses.length)];

  const aiMessage: ChatMessage = {
    id: generateMockId(),
    role: "assistant",
    content: randomResponse,
    createdAt: new Date().toISOString(),
  };

  return aiMessage;
};

/**
 * Get chat history
 */
export const getChatHistory = async (): Promise<ChatMessage[]> => {
  await mockDelay(600);
  return [];
};
