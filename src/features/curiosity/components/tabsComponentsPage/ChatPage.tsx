import {
  AlienOutlinedIcon,
  ArrowRightOutlinedIcon,
  LoadingOutlinedIcon,
  PaperPlaneOutlinedIcon,
  SquareFilledIcon,
} from "@/shared/icons";
import Button from "@/shared/ui/Button";
import Col from "@/shared/ui/Layout/Helpers/Col";
import Text from "@/shared/ui/Text";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import ChatProvider from "../chat/ChatProvider";
import MessageBubble from "../chat/MessageBubble";
import { useChat } from "../chat/useChat";

export default function ChatPage() {
  const {
    currentChat,
    sendMessage,
    regenerateLastMessage,
    cancelRequest,
    isLoading,
    selectChat,
    chats,
  } = useChat();
  const searchParams = useSearchParams();
  const chatId = searchParams.get("chatId");

  const [messageInput, setMessageInput] = useState("");
  const [showScrollButton, setShowScrollButton] = useState(false);
  const [hasNewMessages, setHasNewMessages] = useState(false);
  const [messageCopied, setMessageCopied] = useState<boolean>(false);
  const [isCancelling, setIsCancelling] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const lastMessageCountRef = useRef(0);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const [containerEl, setContainerEl] = useState<HTMLDivElement | null>(null);
  const isEndVisibleRef = useRef(true);

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
    if (!isLoading) {
      setIsCancelling(false);
    }
  }, [isLoading]);

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
    if (!chatId) return;

    const found = chats.some((c) => c.id === chatId);
    if (found) {
      selectChat(chatId);
    }
  }, [chatId, chats, selectChat]);

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
    if (messageInput.trim() && !isLoading) {
      sendMessage(messageInput.trim());
      setMessageInput("");
      setTimeout(scrollToBottom, 100);
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
  const showStopButton = isLoading && !isCancelling;

  if (!currentChat) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <LoadingOutlinedIcon
          size={48}
          className="animate-spin text-green-500"
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
              className="min-h-0 flex-1 overflow-y-auto scroll-smooth p-4"
            >
              <div className="mx-auto max-w-4xl space-y-4">
                {currentChat.messages.length === 0 ? (
                  <Col className="mt-16 items-center justify-center gap-y-2 text-center">
                    <div className="w-fit rounded-full bg-green-500 p-2">
                      <AlienOutlinedIcon
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
                    {currentChat.messages.map((msg, index) => (
                      <MessageBubble
                        key={msg.id}
                        message={msg}
                        onRegenerate={
                          index === currentChat.messages.length - 1 &&
                          msg.role === "assistant"
                            ? regenerateLastMessage
                            : undefined
                        }
                        onShare={onShareMessage}
                        onCopy={onCopyMessage}
                        messageCopied={messageCopied}
                        showActions={
                          index === currentChat.messages.length - 1 &&
                          msg.role === "assistant" &&
                          !isLoading
                        }
                      />
                    ))}
                  </>
                )}

                {isLoading && (
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
                  <ArrowRightOutlinedIcon className="size-4 rotate-90 text-green-500" />
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
                        <SquareFilledIcon size={20} className="fill-green-50" />
                        {/* <span className="absolute inset-0 animate-ping rounded-sm bg-green-50/20" /> */}
                      </div>
                    ) : isCancelling ? (
                      <LoadingOutlinedIcon size={20} className="animate-spin" />
                    ) : messageInput.trim() !== "" ? (
                      <PaperPlaneOutlinedIcon
                        size={20}
                        className="-rotate-45 transition-all duration-300 group-hover:scale-110"
                      />
                    ) : (
                      <PaperPlaneOutlinedIcon
                        size={20}
                        className="rotate-0 opacity-50 transition-all duration-300"
                      />
                    )
                  }
                />
              </div>

              {/* {showStopButton && (
                <div className="mt-2 flex items-center justify-center gap-2 text-xs text-green-600">
                  <span className="flex h-2 w-2">
                    <span className="absolute inline-flex h-2 w-2 animate-ping rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500"></span>
                  </span>
                  <span className="font-maitree font-medium">
                    Gerando resposta... Clique para parar
                  </span>
                </div>
              )} */}
            </div>
          </Col>
        </div>
      </ChatProvider>
    </Col>
  );
}
