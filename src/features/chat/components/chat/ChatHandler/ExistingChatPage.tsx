"use client";

import { useGetChatById } from "@/features/chat/api/queries/getChatApiClient";
import type { LastMessage } from "@/features/chat/api/types";
import { useGenerateResponse } from "@/shared/api/ai/queries/getAiApiClient";
import Col from "@/shared/ui/Layout/Helpers/Col";
import { useEffect, useRef, useState } from "react";
import ChatWindow from "./ChatWindow";

interface Props {
  chatId: number;
}

export default function ExistingChatPage({ chatId }: Props) {
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
    setPendingUserMessage({
      id: -1,
      chatId,
      role: "user",
      content: content,
      isRead: false,
      metadata: null,
      createdAt: new Date().toISOString(),
    });

    try {
      await generateResponse({
        query: content,
        chatId,
      });
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

    await generateResponse({
      query: lastUserMessage.content,
      chatId,
      isRegeneration: true,
    });
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
