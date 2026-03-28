# Feature: chat

Provides the AI chat interface at `/chat` (private route). Users can have conversations with a Google Gemini-powered assistant that helps with recipe suggestions, vegan tips, and food-related questions.

## Responsibilities

- List all chat sessions for the current user
- Start a new chat session
- Send messages and receive AI responses
- Display full message history for a selected chat
- Delete chat sessions
- Handle streaming or async AI response display

## Structure

```
chat/
├── api/
│   ├── chatApi.ts                  # GET /chat, POST /chat, POST /chat/:id/message, DELETE /chat/:id
│   ├── types.ts                    # Chat and Message types
│   └── queries/
│       └── getChatApiClient.ts     # React Query hooks for chat operations
├── components/
│   ├── ChatSidebar.tsx             # List of past conversations
│   ├── ChatWindow.tsx              # Active conversation message display
│   ├── MessageInput.tsx            # Text input + send button
│   ├── MessageBubble.tsx           # Single message (user or assistant style)
│   └── EmptyChatState.tsx          # Shown when no chat is selected or started
├── hooks/
│   └── (mutations for send, delete; queries for list and detail)
├── types/
│   └── index.ts
└── index.ts
```

## Message Flow

1. User types a message in `MessageInput`
2. `POST /chat/:id/message` is called with `{ content: string }`
3. Backend forwards the conversation history to Google Gemini
4. Gemini response is returned as `{ role: "assistant", content: string }`
5. UI appends both the user message and assistant response to the chat

## Chat Session

- A **Chat** is a session (container for messages)
- Each **Message** has a `role` (`"user"` or `"assistant"`) and `content` string
- Sessions are listed in the sidebar; the user can switch between them
- A new session is created via `POST /chat` before the first message is sent

## Data Types

```ts
type Chat = {
  id: string
  title?: string
  messages: Message[]
  createdAt: string
  updatedAt: string
}

type Message = {
  id: string
  role: "user" | "assistant"
  content: string
  createdAt: string
}
```

## AI Context

The Gemini AI client is initialized in `src/shared/api/ai/ai.ts`. The backend handles the actual Gemini API call — the frontend only sends/receives structured message objects.
