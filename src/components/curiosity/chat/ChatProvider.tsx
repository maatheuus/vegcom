import React, { useCallback, useEffect, useRef, useState } from "react";
import type { Chat, Message } from "./types";
import { ChatContext } from "./useChat";
import { loadChats, saveChats } from "./utils";

const ChatProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [chats, setChats] = useState<Chat[]>([]);
  const [currentChatId, setCurrentChatId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const abortControllerRef = useRef<AbortController | null>(null);

  useEffect(() => {
    const loaded = loadChats();
    setChats(loaded);
    if (loaded.length > 0) {
      setCurrentChatId(loaded[0].id);
    } else {
      const initialChat: Chat = {
        id: Date.now().toString(),
        title: "Nova conversa",
        messages: [],
        createdAt: Date.now(),
        updatedAt: Date.now(),
      };
      setChats([initialChat]);
      setCurrentChatId(initialChat.id);
    }
  }, []);

  useEffect(() => {
    saveChats(chats);
  }, [chats]);

  const currentChat = chats.find((c) => c.id === currentChatId) || null;

  const createNewChat = useCallback(() => {
    const newChat: Chat = {
      id: Date.now().toString(),
      title: "Nova conversa",
      messages: [],
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    setChats((prev) => [newChat, ...prev]);
    setCurrentChatId(newChat.id);
  }, []);

  const selectChat = useCallback((id: string) => {
    setCurrentChatId(id);
  }, []);

  const deleteChat = useCallback((id: string) => {
    setChats((prev) => {
      const newChats = prev.filter((c) => c.id !== id);
      setCurrentChatId((curId) => {
        if (curId !== id) return curId;
        return newChats.length > 0 ? newChats[0].id : null;
      });
      return newChats;
    });
  }, []);

  const cancelRequest = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
      setIsLoading(false);
    }
  }, []);

  const sendMessage = useCallback(
    async (content: string) => {
      if (!currentChatId || isLoading) return;

      cancelRequest();

      const userMessage: Message = {
        id: Date.now().toString(),
        role: "user",
        content,
        timestamp: Date.now(),
      };

      setChats((prev) =>
        prev.map((chat) => {
          if (chat.id === currentChatId) {
            const updatedChat = {
              ...chat,
              messages: [...chat.messages, userMessage],
              updatedAt: Date.now(),
            };
            if (chat.messages.length === 0) {
              updatedChat.title =
                content.slice(0, 30) + (content.length > 30 ? "..." : "");
            }
            return updatedChat;
          }
          return chat;
        })
      );

      setIsLoading(true);
      abortControllerRef.current = new AbortController();

      try {
        await new Promise((resolve, reject) => {
          const timeout = setTimeout(resolve, 1500);
          abortControllerRef.current?.signal.addEventListener("abort", () => {
            clearTimeout(timeout);
            reject(new Error("Aborted"));
          });
        });

        const assistantMessage: Message = {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: `Aqui está uma resposta exemplo para: "${content}"\n\nEsta é uma simulação. Integre com sua API real para respostas verdadeiras.`,
          timestamp: Date.now(),
        };

        setChats((prev) =>
          prev.map((chat) => {
            if (chat.id === currentChatId) {
              return {
                ...chat,
                messages: [...chat.messages, assistantMessage],
                updatedAt: Date.now(),
              };
            }
            return chat;
          })
        );
      } catch (error: any) {
        if (error.message !== "Aborted") {
          console.error("Error sending message:", error);
          const errorMessage: Message = {
            id: (Date.now() + 1).toString(),
            role: "assistant",
            content:
              "Desculpe, ocorreu um erro ao processar sua mensagem. Por favor, tente novamente.",
            timestamp: Date.now(),
          };

          setChats((prev) =>
            prev.map((chat) => {
              if (chat.id === currentChatId) {
                return {
                  ...chat,
                  messages: [...chat.messages, errorMessage],
                  updatedAt: Date.now(),
                };
              }
              return chat;
            })
          );
        }
      } finally {
        setIsLoading(false);
        abortControllerRef.current = null;
      }
    },
    [currentChatId, isLoading, cancelRequest]
  );

  const regenerateLastMessage = useCallback(async () => {
    if (!currentChat || isLoading) return;

    const lastUserMsgIndex = currentChat.messages.findLastIndex(
      (m) => m.role === "user"
    );
    if (lastUserMsgIndex === -1) return;

    const lastUserMsg = currentChat.messages[lastUserMsgIndex];

    setChats((prev) =>
      prev.map((chat) => {
        if (chat.id === currentChatId) {
          return {
            ...chat,
            messages: chat.messages.slice(0, lastUserMsgIndex + 1),
          };
        }
        return chat;
      })
    );

    setTimeout(() => {
      sendMessage(lastUserMsg.content);
    }, 100);
  }, [currentChat, currentChatId, isLoading, sendMessage]);

  return (
    <ChatContext.Provider
      value={{
        chats,
        currentChatId,
        currentChat,
        createNewChat,
        selectChat,
        sendMessage,
        regenerateLastMessage,
        deleteChat,
        cancelRequest,
        isLoading,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
export default ChatProvider;
