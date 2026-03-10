"use client";

import type { LastMessage } from "@/features/chat/api/types";
import Button from "@/shared/ui/Button";
import Col from "@/shared/ui/Layout/Helpers/Col";
import Text from "@/shared/ui/Text";
import {
  AlienIcon,
  ArrowRightIcon,
  CircleNotchIcon,
  PaperPlaneIcon,
} from "@phosphor-icons/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { groupMessages } from "../utils/groupMessages";
import MessageBubble from "./MessageBubble";

interface ChatWindowProps {
  messages: LastMessage[];
  isLoading?: boolean;
  isGenerating?: boolean;
  onSendMessage: (content: string) => Promise<void>;
  onRegenerate?: () => void;
  onCancel?: () => void;
  defaultMessage?: string;
}

export default function ChatWindow({
  messages,
  isLoading = false,
  isGenerating = false,
  onSendMessage,
  onRegenerate,
  onCancel,
  defaultMessage = "",
}: ChatWindowProps) {
  const [messageInput, setMessageInput] = useState(defaultMessage);
  const [showScrollButton, setShowScrollButton] = useState<boolean | null>(
    false,
  );
  const [hasNewMessages, setHasNewMessages] = useState(false);
  const [containerEl, setContainerEl] = useState<HTMLDivElement | null>(null);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const lastMessageCountRef = useRef(0);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const isEndVisibleRef = useRef(true);

  const groupedMessages = groupMessages(messages);

  const containerRefCallback = (el: HTMLDivElement | null) => {
    setContainerEl(el);
  };

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });
    setHasNewMessages(false);
    setShowScrollButton(false);
  }, []);

  useEffect(() => {
    const textarea = textareaRef.current;
    if (!textarea) return;
    textarea.style.height = "auto";
    const newHeight = Math.min(textarea.scrollHeight, 250);
    textarea.style.height = `${newHeight}px`;
  }, [messageInput]);

  useEffect(() => {
    const container = containerEl;
    if (!container) return;

    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = container;
      const isAtBottom = Math.abs(scrollHeight - scrollTop - clientHeight) < 50; // Tolerance of 50px

      isEndVisibleRef.current = isAtBottom;

      // If we are at the bottom, hide button. If not, show it.
      if (isAtBottom) {
        setShowScrollButton(false);
        setHasNewMessages(false);
      } else {
        setShowScrollButton(true);
      }
    };

    container.addEventListener("scroll", handleScroll);

    // Initial check
    handleScroll();

    return () => container.removeEventListener("scroll", handleScroll);
  }, [containerEl]);

  useEffect(() => {
    const newCount = messages?.length || 0;
    if (newCount > lastMessageCountRef.current) {
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
  }, [messages?.length]);

  const handleSubmit = async () => {
    if (!messageInput.trim() || isGenerating) return;
    const query = messageInput.trim();
    setMessageInput("");
    if (textareaRef.current) textareaRef.current.style.height = "auto";
    setTimeout(scrollToBottom, 100);
    await onSendMessage(query);
  };

  if (isLoading) {
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
    <Col className="h-full w-full justify-end">
      <div className="flex h-full">
        <Col className="relative min-h-0 flex-1">
          <div ref={containerRefCallback} className="min-h-0 flex-1 p-4">
            <div className="mx-auto max-w-4xl space-y-4">
              {groupedMessages.length === 0 && !isGenerating ? (
                <Col className="mt-16 items-center justify-center gap-y-2 text-center">
                  <div className="w-fit rounded-full bg-green-500 p-2">
                    <AlienIcon size={32} className="text-green-50 opacity-90" />
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
                  </div>
                </Col>
              ) : (
                <>
                  {groupedMessages.map((group, index) => {
                    const isLastGroup = index === groupedMessages.length - 1;
                    if (
                      isLastGroup &&
                      group.role === "assistant" &&
                      isGenerating
                    ) {
                      return null;
                    }

                    return (
                      <MessageBubble
                        key={group.id}
                        group={group}
                        onRegenerate={
                          isLastGroup &&
                          group.role === "assistant" &&
                          !isGenerating
                            ? onRegenerate
                            : undefined
                        }
                      />
                    );
                  })}
                </>
              )}

              {isGenerating && (
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
            <div className="group fixed right-[50%] bottom-8 z-10 translate-x-[50%]">
              <button
                onClick={scrollToBottom}
                className="animate-slideUp cursor-pointer rounded-full border border-green-500 bg-green-50 p-2.5 shadow-lg transition-all hover:scale-105"
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
                disabled={isGenerating && !onCancel}
                className="style-scrollbar font-lora my-auto max-h-[400px] w-full flex-1 resize-none overflow-y-auto bg-transparent px-2 py-0 text-sm text-green-500 placeholder:text-green-200 focus:ring-0 focus:outline-none md:text-base"
                rows={1}
              />
              <Button.Icon
                onClick={isGenerating && onCancel ? onCancel : handleSubmit}
                disabled={!messageInput.trim() && !isGenerating}
                className="group relative flex size-10 items-center justify-center rounded-full bg-green-500 text-green-50 hover:bg-green-600"
                icon={
                  isGenerating ? (
                    <CircleNotchIcon size={20} className="animate-spin" />
                  ) : (
                    <PaperPlaneIcon size={20} />
                  )
                }
              />
            </div>
          </div>
        </Col>
      </div>
    </Col>
  );
}
