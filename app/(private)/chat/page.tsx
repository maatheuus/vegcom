"use client";

import { chatKeys } from "@/features/chat/api/queries/getChatApiClient";
import type {
  GetChatByIdResponse,
  LastMessage,
} from "@/features/chat/api/types";
import ChatWindow from "@/features/chat/components/chat";
import {
  useGenerateResponse,
  useGetUsageStats,
} from "@/shared/api/ai/queries/getAiApiClient";
import Col from "@/shared/ui/Layout/Helpers/Col";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function Page() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const queryClient = useQueryClient();

  const [isNavigating, setIsNavigating] = useState(false);
  const [messages, setMessages] = useState<LastMessage[]>([]);

  const { mutateAsync: generateResponse, isPending } = useGenerateResponse();
  const { data: usageStats } = useGetUsageStats();

  const promptParam = searchParams.get("prompt");
  const defaultMessage = promptParam ? decodeURIComponent(promptParam) : "";

  const handleSendMessage = async (content: string) => {
    if (usageStats && usageStats.remaining === 0) return;
    setMessages([
      {
        id: -2,
        chatId: 0,
        role: "user",
        content: content,
        isRead: true,
        metadata: null,
        createdAt: new Date().toISOString(),
      },
    ]);

    try {
      const response = await generateResponse({
        query: content,
        chatId: 0,
      });

      const metadata = response;

      if (metadata && metadata.chatId) {
        setIsNavigating(true);

        const newChatId = metadata.chatId;

        const optimisticChat: GetChatByIdResponse = {
          success: true,
          data: {
            id: newChatId,
            userId: 1,
            title: metadata.chatTitle || "Nova Conversa",
            topic: metadata.chatTitle || "Nova Conversa",
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            messages: [
              {
                id: -2,
                chatId: newChatId,
                role: "user",
                content: content,
                isRead: true,
                metadata: null,
                createdAt: new Date().toISOString(),
              },
              {
                id: -1,
                chatId: newChatId,
                role: "assistant",
                content: metadata.messageContent,
                isRead: true,
                metadata: metadata,
                createdAt: new Date().toISOString(),
              },
            ],
          },
        };

        queryClient.setQueryData(chatKeys.detail(newChatId), optimisticChat);

        router.push(`/chat/${newChatId}`);
      }
    } catch (error) {
      console.error("Erro ao criar chat:", error);
      setIsNavigating(false);
      setMessages([]);
    }
  };

  return (
    <Col className="h-full w-full justify-end overflow-hidden">
      <ChatWindow
        messages={messages}
        isGenerating={isPending || isNavigating}
        onSendMessage={handleSendMessage}
        defaultMessage={defaultMessage}
        usageStats={usageStats}
      />
    </Col>
  );
}
