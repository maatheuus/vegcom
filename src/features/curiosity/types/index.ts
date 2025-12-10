/**
 * Curiosity feature types
 */

/**
 * Represents a single message in the chat history.
 */
export interface ChatMessage {
  /** Unique identifier for the message. */
  id: string;
  /** The sender of the message (user or AI assistant). */
  role: "user" | "assistant";
  /** The text content of the message. */
  content: string;
  /** Timestamp when the message was sent (ISO string). */
  createdAt: string;
}

/**
 * Data required to send a new message to the chat.
 */
export interface SendMessageData {
  /** The text content of the message to send. */
  content: string;
}
