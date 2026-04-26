# Feature: chat

Provides the AI chat interface at `/chat` and `/chat/[id]` (private routes). Users can have conversations with a Google Gemini-powered assistant that helps with recipe suggestions, vegan tips, and food-related questions.

## Responsibilities

- List all chat sessions for the current user (sidebar)
- Start a new chat session with a title and topic
- Send messages and receive AI responses
- Display full message history for a selected session (`/chat/[id]`)
- Rename and delete chat sessions
- Show recipe embeds when the AI references a recipe
- Render AI response content as Markdown

## Structure

```
chat/
├── api/
│   ├── chatApi.ts                      # GET /chat, POST /chat, GET /chat/:id, POST /chat/:id/message, DELETE /chat/:id
│   ├── types.ts                        # Chat, Message, Metadata, SendMessagePayload types
│   └── queries/
│       ├── getChatApiClient.ts         # React Query hooks for all chat operations
│       └── getChatApiServer.ts         # Server-side fetch for initial chat data
├── components/
│   ├── workspace/
│   │   ├── ChatWorkspace.tsx           # Root layout: sidebar + active chat area
│   │   ├── ChatHistorySidebar.tsx      # Left panel — list of past sessions
│   │   └── ChatViewTabs.tsx            # Tabs to switch between chat and history views
│   ├── chat/
│   │   ├── index.tsx                   # New chat entry point (title/topic form)
│   │   ├── ChatHandler/
│   │   │   ├── ExistingChatPage.tsx    # Active session message display
│   │   │   ├── MessageBubble.tsx       # Single message (user or assistant)
│   │   │   └── MarkdownRenderer.tsx    # Renders assistant Markdown content
│   │   ├── embeds/
│   │   │   └── RecipeEmbed.tsx         # Inline recipe card embedded in a message
│   │   ├── hook/
│   │   │   └── useChat.tsx             # Hook: send message, manage optimistic state
│   │   └── utils/
│   │       ├── groupMessages.ts        # Groups consecutive messages by role
│   │       ├── types.tsx               # Component-level types
│   │       └── utils.tsx               # Misc helpers
│   ├── historyChats/
│   │   ├── index.tsx                   # History list container
│   │   ├── ChatsCard.tsx               # Single session card in the history list
│   │   ├── SheetMobile.tsx             # Mobile slide-out sheet for session history
│   │   └── modals/
│   │       ├── DeleteChat.tsx          # Confirm delete dialog
│   │       └── RenameChat.tsx          # Rename session dialog
│   ├── suggestion/
│   │   ├── index.tsx                   # Suggestion prompt cards on new chat screen
│   │   ├── SuggestionCard.tsx          # Individual suggestion chip
│   │   └── utils.ts                    # Pre-defined suggestion topics
│   ├── tabsComponents/
│   │   └── TabsLayout.tsx              # Tab bar component used in workspace
│   └── tabsComponentsPage/
│       └── HistoryChatPage.tsx         # Full-page history view (mobile/tab)
├── types/index.ts
└── index.ts
```

## Data Types

```ts
type Chat = {
  id: number
  userId: number
  title: string
  topic: string
  createdAt: string
  updatedAt: string
  lastMessage: Message
}

type Message = {
  id: number
  chatId: number
  role: "user" | "assistant"
  content: string
  isRead: boolean
  metadata: { recipes: Recipe[]; chatId: number; messageContent: string; chatTitle: string } | null
  createdAt: string
}
```

## Message Flow

1. User picks a suggestion or types a title + topic on the new chat screen
2. `POST /chat` creates a session; user is redirected to `/chat/[id]`
3. User types a message in the input
4. `POST /chat/:id/message` sends `{ title, topic }` to the backend
5. Backend calls Google Gemini with the conversation history
6. Response arrives with `role: "assistant"`, optional `metadata.recipes` for embeds
7. UI appends both messages; recipe embeds render inline if `metadata.recipes` is non-empty

## AI Context

The Gemini AI client is initialized in `src/shared/api/ai/ai.ts`. The backend handles the Gemini API call — the frontend only sends and receives structured message objects.
