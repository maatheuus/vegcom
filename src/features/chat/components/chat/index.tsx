import type { LastMessage } from "@/features/chat/api/types";
import type { UsageStats } from "@/shared/api/ai/ai";
import Button from "@/shared/ui/Button";
import Col from "@/shared/ui/Layout/Helpers/Col";
import Text from "@/shared/ui/Text";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/shared/ui/Tooltip";
import {
  AlienIcon,
  ArrowRightIcon,
  CircleNotchIcon,
  LockIcon,
  PaperPlaneRightIcon,
} from "@phosphor-icons/react";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import MessageBubble from "./ChatHandler/MessageBubble";
import { groupMessages } from "./utils/groupMessages";

interface ChatWindowProps {
  messages: LastMessage[];
  isLoading?: boolean;
  isGenerating?: boolean;
  onSendMessage: (content: string) => Promise<void>;
  onRegenerate?: () => void;
  onCancel?: () => void;
  defaultMessage?: string;
  usageStats?: UsageStats;
}

export default function ChatWindow({
  messages,
  isLoading = false,
  isGenerating = false,
  onSendMessage,
  onRegenerate,
  onCancel,
  defaultMessage = "",
  usageStats,
}: ChatWindowProps) {
  const isLimitReached = usageStats !== undefined && usageStats.remaining === 0;
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
    if (!messageInput.trim() || isGenerating || isLimitReached) return;
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
                <Col className="mt-12 items-center justify-center gap-y-2 text-center md:mt-16">
                  <div className="w-fit rounded-full bg-green-500 p-2">
                    <AlienIcon size={32} className="text-green-50 opacity-90" />
                  </div>
                  <div className="space-y-2">
                    <Text
                      as="h1"
                      type={Text.Type.BodyTwo}
                      weight={Text.Weight.SemiBold}
                      className="font-maitree font-semibold text-green-500"
                    >
                      Como posso ajudar você hoje?
                    </Text>
                  </div>
                </Col>
              ) : (
                groupedMessages.map((group, index) => {
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
                })
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

          <div className="mx-auto mb-2 w-full max-w-4xl space-y-1.5 md:space-y-4">
            {isLimitReached && (
              <div className="flex items-center gap-2 rounded-xl border border-amber-300 bg-amber-50 px-4 py-2.5 text-amber-700">
                <LockIcon size={16} className="shrink-0" />
                <span className="text-sm">
                  Você atingiu o limite semanal de{" "}
                  <strong>{usageStats?.limit}</strong> mensagens.
                  {!usageStats?.isPremium && (
                    <>
                      {" "}
                      Faça upgrade para o plano{" "}
                      <Link
                        href="/account/subscription"
                        className="font-semibold underline hover:text-amber-900"
                      >
                        Premium
                      </Link>{" "}
                      para continuar.
                    </>
                  )}{" "}
                  Limite reseta no dia{" "}
                  {usageStats?.resetDate
                    ? new Date(usageStats.resetDate).toLocaleDateString(
                        "pt-BR",
                        { day: "numeric", month: "long" },
                      )
                    : "domingo"}
                  .
                </span>
              </div>
            )}

            <div
              className={`flex w-full items-end gap-2 rounded-2xl border bg-transparent p-2 transition-all ${
                isLimitReached
                  ? "border-gray-300 opacity-60"
                  : "border-green-500 focus-within:border-green-600"
              }`}
            >
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
                placeholder={
                  isLimitReached
                    ? "Limite semanal atingido..."
                    : "Digite sua mensagem..."
                }
                disabled={(isGenerating && !onCancel) || isLimitReached}
                className="style-scrollbar font-lora my-auto max-h-[200px] w-full flex-1 resize-none overflow-y-auto bg-transparent px-2 py-0 text-sm text-green-500 placeholder:text-green-200 focus:ring-0 focus:outline-none disabled:cursor-not-allowed md:max-h-[400px] md:text-base"
                rows={1}
              />
              <Button.Icon
                onClick={isGenerating && onCancel ? onCancel : handleSubmit}
                disabled={
                  (!messageInput.trim() && !isGenerating) || isLimitReached
                }
                className="group relative flex size-8 items-center justify-center rounded-full bg-green-500 text-green-50 hover:bg-green-600 disabled:cursor-not-allowed disabled:opacity-50 md:size-10"
                icon={
                  isGenerating ? (
                    <CircleNotchIcon size={16} className="animate-spin" />
                  ) : (
                    <PaperPlaneRightIcon size={16} />
                  )
                }
              />
            </div>

            {usageStats && !isLimitReached && (
              <div className="ml-auto w-full text-right">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger className="cursor-text">
                      <p className="font-lora text-right text-xs text-green-200">
                        {usageStats.remaining} de {usageStats.limit} mensagens
                        restantes esta semana
                      </p>
                    </TooltipTrigger>
                    <TooltipContent className="mr-2 mb-2 flex items-start">
                      <Text
                        type={Text.Type.BodyThree}
                        className="text-green-50"
                      >
                        Me ajuda a comprar um café <br /> pra continuar sua
                        conversa :)
                      </Text>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            )}
          </div>
        </Col>
      </div>
    </Col>
  );
}
