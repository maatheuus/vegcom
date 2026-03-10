"use client";

import {
  chatKeys,
  useGetChatById,
} from "@/features/chat/api/queries/getChatApiClient";
import type {
  GetChatByIdResponse,
  LastMessage,
} from "@/features/chat/api/types";
import { useGenerateResponse } from "@/shared/api/ai/queries/getAiApiClient";
import Col from "@/shared/ui/Layout/Helpers/Col";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import ChatWindow from "./ChatWindow";

interface Props {
  chatId: number;
}

export default function ExistingChatPage({ chatId }: Props) {
  const queryClient = useQueryClient();
  const { data: chat, isLoading } = useGetChatById(chatId);
  const { mutateAsync: generateResponse, isPending: isGenerating } =
    useGenerateResponse();

  const [pendingUserMessage, setPendingUserMessage] =
    useState<LastMessage | null>(null);

  const messages = chat?.data.messages || [];

  const prevMessagesLength = useRef(messages.length);

  useEffect(() => {
    if (messages.length > prevMessagesLength.current) {
      setPendingUserMessage(null);
    }
    prevMessagesLength.current = messages.length;
  }, [messages]);

  const handleSendMessage = async (content: string) => {
    const userMessage: LastMessage = {
      id: Date.now(),
      chatId,
      role: "user",
      content: content,
      isRead: false,
      metadata: null,
      createdAt: new Date().toISOString(),
    };

    setPendingUserMessage(userMessage);

    try {
      const response = await generateResponse({
        query: content,
        chatId,
      });

      if (response) {
        const assistantMessage: LastMessage = {
          id: Date.now() + 1,
          chatId,
          role: "assistant",
          content: response.messageContent,
          isRead: true,
          metadata: response,
          createdAt: new Date().toISOString(),
        };

        // Update cache immediately with both messages
        queryClient.setQueryData<GetChatByIdResponse>(
          chatKeys.detail(chatId),
          (oldData) => {
            if (!oldData) return oldData;
            return {
              ...oldData,
              data: {
                ...oldData.data,
                messages: [
                  ...oldData.data.messages,
                  userMessage,
                  assistantMessage,
                ],
              },
            };
          },
        );

        setPendingUserMessage(null);
      }
    } catch (error) {
      console.error("Erro ao enviar mensagem:", error);
      setPendingUserMessage(null);
    }
  };

  const handleRegenerateLastMessage = async () => {
    if (!messages?.length) return;

    const lastUserMessage = [...messages]
      .reverse()
      .find((m) => m.role === "user");

    if (!lastUserMessage) return;

    try {
      const response = await generateResponse({
        query: lastUserMessage.content,
        chatId,
        isRegeneration: true,
      });

      if (response) {
        const assistantMessage: LastMessage = {
          id: Date.now(),
          chatId,
          role: "assistant",
          content: response.messageContent,
          isRead: true,
          metadata: response,
          createdAt: new Date().toISOString(),
        };

        // Replace last assistant message or add new one
        queryClient.setQueryData<GetChatByIdResponse>(
          chatKeys.detail(chatId),
          (oldData) => {
            if (!oldData) return oldData;

            const updatedMessages = [...oldData.data.messages];
            const lastIndex = updatedMessages.length - 1;

            if (
              lastIndex >= 0 &&
              updatedMessages[lastIndex].role === "assistant"
            ) {
              updatedMessages[lastIndex] = assistantMessage;
            } else {
              updatedMessages.push(assistantMessage);
            }

            return {
              ...oldData,
              data: {
                ...oldData.data,
                messages: updatedMessages,
              },
            };
          },
        );
      }
    } catch (error) {
      console.error("Erro ao regenerar mensagem:", error);
    }
  };

  const displayMessages = [
    ...messages,
    ...(pendingUserMessage ? [pendingUserMessage] : []),
  ];

  return (
    <Col className="h-full w-full justify-end">
      <ChatWindow
        messages={displayMessages}
        isLoading={isLoading}
        isGenerating={isGenerating}
        onSendMessage={handleSendMessage}
        onRegenerate={handleRegenerateLastMessage}
      />
    </Col>
  );
}
