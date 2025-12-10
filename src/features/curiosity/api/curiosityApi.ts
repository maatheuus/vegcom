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
 * Sends a message to the AI assistant and receives a simulated response.
 *
 * @param {SendMessageData} _data - The message content sent by the user.
 * @returns {Promise<ChatMessage>} A promise resolving to the AI's response message.
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
 * Retrieves the history of the chat conversation.
 *
 * @returns {Promise<ChatMessage[]>} A promise resolving to an array of past messages (currently empty mock).
 */
export const getChatHistory = async (): Promise<ChatMessage[]> => {
  await mockDelay(600);
  return [];
};
