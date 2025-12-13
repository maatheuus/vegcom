"use client";

import { generateResponse } from "@/shared/api/ai/queries/getAiApiServer";
import Button from "@/shared/ui/Button";
import Col from "@/shared/ui/Layout/Helpers/Col";
import Text from "@/shared/ui/Text";
import {
  AlienIcon,
  ArrowRightIcon,
  CircleNotchIcon,
  PaperPlaneIcon,
  SquareIcon,
} from "@phosphor-icons/react";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef, useState, useTransition } from "react";
import type { GetChatByIdResponse } from "../../api/types";
import ChatProvider from "./ChatProvider";
import MessageBubble from "./MessageBubble";
import { useChat } from "./useChat";

interface Props {
  chat: GetChatByIdResponse;
}

export default function ChatPage({ chat }: Props) {
  const { currentChat, cancelRequest } = useChat();
  const [isPending, startTransition] = useTransition();
  const [optimisticMessages, setOptimisticMessages] = useState<any[]>([]);

  useEffect(() => {
    setOptimisticMessages([]);
  }, [chat.data.messages]);

  const messages = [...chat.data.messages, ...optimisticMessages];

  const searchParams = useSearchParams();

  const [messageInput, setMessageInput] = useState("");
  const [showScrollButton, setShowScrollButton] = useState(false);
  const [hasNewMessages, setHasNewMessages] = useState(false);
  const [messageCopied, setMessageCopied] = useState<boolean>(false);
  const [isCancelling, setIsCancelling] = useState(false);
  const [containerEl, setContainerEl] = useState<HTMLDivElement | null>(null);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const lastMessageCountRef = useRef(0);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const isEndVisibleRef = useRef(true);

  async function handleRegenerateLastMessage() {
    const query = messages[messages.length - 1].content;
    startTransition(async () => {
      try {
        await generateResponse({
          query,
          chatId: chat.data.id,
          userId: chat.data.userId,
        });
      } catch (error) {
        console.error("Failed to regenerate response:", error);
      }
    });
  }

  const containerRefCallback = (el: HTMLDivElement | null) => {
    scrollContainerRef.current = el;
    setContainerEl(el);
  };

  function onCopyMessage(message: string) {
    navigator.clipboard.writeText(message);
    setMessageCopied(true);
    setTimeout(() => setMessageCopied(false), 2000);
  }

  function onShareMessage(message: string) {
    navigator.share({
      title: "Conversa com o especialista",
      text: message,
    });
  }

  useEffect(() => {
    if (!isPending) {
      setIsCancelling(false);
    }
  }, [isPending]);

  useEffect(() => {
    const promptParam = searchParams.get("prompt");

    if (promptParam) {
      setMessageInput(decodeURIComponent(promptParam));

      setTimeout(() => {
        textareaRef.current?.focus();
        if (textareaRef.current) {
          const length = textareaRef.current.value.length;
          textareaRef.current.setSelectionRange(length, length);
        }
      }, 100);
    }
  }, [searchParams]);

  useEffect(() => {
    const textarea = textareaRef.current;
    if (!textarea) return;
    textarea.style.height = "auto";
    const newHeight = Math.min(textarea.scrollHeight, 250);
    textarea.style.height = `${newHeight}px`;
  }, [messageInput]);

  useEffect(() => {
    const end = messagesEndRef.current;
    if (!end) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        isEndVisibleRef.current = entry.isIntersecting;

        const canScroll =
          (containerEl &&
            containerEl.scrollHeight > containerEl.clientHeight) ||
          (!containerEl &&
            document.documentElement.scrollHeight > window.innerHeight);

        const shouldShow = !entry.isIntersecting && canScroll;
        setShowScrollButton(shouldShow);

        if (entry.isIntersecting) {
          setHasNewMessages(false);
        }
      },
      {
        root: containerEl || null,
        threshold: 0.1,
        rootMargin: "0px",
      },
    );

    observer.observe(end);
    return () => observer.disconnect();
  }, [containerEl]);

  useEffect(() => {
    if (!currentChat) return;
    const newCount = currentChat.messages.length;
    const increased = newCount > lastMessageCountRef.current;

    if (increased) {
      if (isEndVisibleRef.current) {
        messagesEndRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "end",
        });
        setHasNewMessages(false);
      } else {
        setHasNewMessages(true);
        setShowScrollButton(true);
      }
    }

    lastMessageCountRef.current = newCount;
  }, [currentChat?.messages?.length, currentChat?.id]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });
    setHasNewMessages(false);
    setShowScrollButton(false);
  };

  const handleSubmit = () => {
    if (messageInput.trim() && !isPending) {
      const query = messageInput.trim();

      // Optimistic update
      const tempUserMessage = {
        id: Date.now(), // Temporary ID
        chatId: chat.data.id,
        role: "user" as const,
        content: query,
        isRead: true,
        metadata: null,
        createdAt: new Date(),
      };

      setOptimisticMessages((prev) => [...prev, tempUserMessage]);
      setMessageInput("");
      setTimeout(scrollToBottom, 100);

      startTransition(async () => {
        try {
          await generateResponse({
            query,
            chatId: chat.data.id,
            userId: chat.data.userId,
          });
        } catch (error) {
          console.error("Failed to generate response:", error);
          // Optionally handle error by removing the optimistic message or showing a toast
        }
      });
    }
  };

  const handleCancelRequest = async () => {
    setIsCancelling(true);
    try {
      await cancelRequest();
    } catch (error) {
      console.error("Erro ao cancelar:", error);
    }
  };

  const isButtonDisabled = !messageInput.trim() || isCancelling;
  const showStopButton = isPending && !isCancelling;

  if (!currentChat) {
    return (
      <div className="flex h-full flex-1 items-center justify-center">
        <CircleNotchIcon
          size={44}
          className="my-auto animate-spin text-green-500"
        />
      </div>
    );
  }

  return (
    <Col className="h-full w-full justify-end overflow-hidden">
      <ChatProvider>
        <div className="flex h-full overflow-hidden">
          <Col className="relative min-h-0 flex-1">
            <div
              ref={containerRefCallback}
              className="min-h-0 flex-1 overflow-y-auto scroll-smooth md:p-4"
            >
              <div className="mx-auto max-w-4xl space-y-4">
                {messages.length === 0 ? (
                  <Col className="mt-16 items-center justify-center gap-y-2 text-center">
                    <div className="w-fit rounded-full bg-green-500 p-2">
                      <AlienIcon
                        size={32}
                        className="text-green-50 opacity-90"
                      />
                    </div>
                    <div className="space-y-2">
                      <Text
                        as="h2"
                        type={Text.Type.BodyTwo}
                        weight={Text.Weight.SemiBold}
                        className="font-maitree font-semibold text-green-500"
                      >
                        Como posso ajudar você hoje?
                      </Text>
                      <Text
                        type={Text.Type.BodyFour}
                        className="font-maitree text-sm font-medium text-green-500/90"
                      >
                        Digite sua mensagem abaixo para começar
                      </Text>
                    </div>
                  </Col>
                ) : (
                  <>
                    {messages.map((msg, index) => (
                      <MessageBubble
                        key={index}
                        message={msg}
                        onRegenerate={
                          index === messages.length - 1 &&
                          msg.role === "assistant"
                            ? handleRegenerateLastMessage
                            : undefined
                        }
                        onShare={onShareMessage}
                        onCopy={onCopyMessage}
                        messageCopied={messageCopied}
                        showActions={
                          index === messages.length - 1 &&
                          msg.role === "assistant" &&
                          !isPending
                        }
                      />
                    ))}
                  </>
                )}

                {isPending && (
                  <div className="flex animate-pulse gap-3">
                    <div className="size-8 shrink-0 rounded-full bg-green-200" />
                    <div className="px-2 py-3">
                      <div className="flex gap-1">
                        <span className="h-2 w-2 animate-bounce rounded-full bg-green-500" />
                        <span className="h-2 w-2 animate-bounce rounded-full bg-green-500 [animation-delay:100ms]" />
                        <span className="h-2 w-2 animate-bounce rounded-full bg-green-500 [animation-delay:200ms]" />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div ref={messagesEndRef} />
            </div>

            {showScrollButton && (
              <div className="group absolute right-[50%] bottom-24 translate-x-[50%]">
                <button
                  onClick={scrollToBottom}
                  className="animate-slideUp cursor-pointer rounded-full border border-green-500 bg-green-50 p-2.5 shadow-lg transition-all hover:scale-105 hover:shadow-xl"
                  aria-label="Ir para mensagens recentes"
                >
                  <ArrowRightIcon className="size-4 rotate-90 text-green-500" />
                  {hasNewMessages && (
                    <div className="absolute -top-1 -right-1 flex h-3 w-3">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75"></span>
                      <span className="relative inline-flex h-3 w-3 rounded-full bg-red-500"></span>
                    </div>
                  )}
                </button>
              </div>
            )}

            <div className="mx-auto mb-2 w-full max-w-4xl">
              <div className="flex w-full items-end gap-2 rounded-2xl border border-green-500 bg-transparent p-2 transition-all focus-within:border-green-600">
                <textarea
                  ref={textareaRef}
                  value={messageInput}
                  onChange={(e) => setMessageInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      handleSubmit();
                    }
                  }}
                  placeholder="Digite sua mensagem..."
                  disabled={isCancelling}
                  className={`${isButtonDisabled ? "hidden-scrollbar" : "style-scrollbar"} font-lora my-auto max-h-[400px] w-full flex-1 resize-none overflow-y-auto bg-transparent px-2 py-0 text-sm text-green-500 placeholder:text-green-200 focus:ring-0 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-base`}
                  name="messageTextarea"
                  rows={1}
                />

                <Button.Icon
                  onClick={showStopButton ? handleCancelRequest : handleSubmit}
                  disabled={showStopButton ? false : isButtonDisabled}
                  className="group relative flex size-10 items-center justify-center rounded-full bg-green-500 text-green-50 transition-all duration-300 hover:bg-green-600 disabled:cursor-not-allowed disabled:bg-green-200 disabled:opacity-50"
                  aria-label={
                    showStopButton
                      ? "Parar geração"
                      : isCancelling
                        ? "Cancelando..."
                        : "Enviar mensagem"
                  }
                  icon={
                    showStopButton ? (
                      <div className="relative">
                        <SquareIcon size={20} className="fill-green-50" />
                      </div>
                    ) : isCancelling ? (
                      <CircleNotchIcon size={20} className="animate-spin" />
                    ) : messageInput.trim() !== "" ? (
                      <PaperPlaneIcon
                        size={20}
                        className="transition-all duration-300 group-hover:scale-110"
                      />
                    ) : (
                      <PaperPlaneIcon
                        size={20}
                        className="opacity-50 transition-opacity duration-300"
                      />
                    )
                  }
                />
              </div>
            </div>
          </Col>
        </div>
      </ChatProvider>
    </Col>
  );
}
