import {
  AlienOutlinedIcon,
  ArrowRightOutlinedIcon,
  LoadingOutlinedIcon,
  PaperPlaneOutlinedIcon,
  SquareFilledIcon,
} from "@/components/icons";
import Button from "@/components/ui/Button";
import Col from "@/components/ui/Layout/Helpers/Col";
import Text from "@/components/ui/Text";
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

  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const lastMessageCountRef = useRef(0);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const [containerEl, setContainerEl] = useState<HTMLDivElement | null>(null);
  const isEndVisibleRef = useRef(true);
  const hasProcessedPrompt = useRef(false);

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
    const promptParam = searchParams.get("prompt");
    if (promptParam && !hasProcessedPrompt.current) {
      setMessageInput(decodeURIComponent(promptParam));
      hasProcessedPrompt.current = true;

      setTimeout(() => {
        textareaRef.current?.focus();
        if (textareaRef.current) {
          const length = textareaRef.current.value.length;
          textareaRef.current.setSelectionRange(length, length);
        }
      }, 100);

      const newUrl = window.location.pathname;
      window.history.replaceState({}, "", newUrl);
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
      }
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

  if (!currentChat) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <LoadingOutlinedIcon size={48} />
      </div>
    );
  }

  return (
    <Col className="h-full justify-end w-full overflow-hidden">
      <ChatProvider>
        <div className="h-full flex overflow-hidden">
          <Col className="flex-1 relative min-h-0">
            <div
              ref={containerRefCallback}
              className="flex-1 overflow-y-auto p-4 scroll-smooth min-h-0"
            >
              <div className="max-w-4xl mx-auto space-y-4">
                {currentChat.messages.length === 0 ? (
                  <Col className="text-center items-center justify-center mt-16 gap-y-2">
                    <div className="bg-green-500 rounded-full p-2 w-fit">
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
                        className="text-green-500"
                      >
                        Como posso ajudar você hoje?
                      </Text>
                      <Text
                        type={Text.Type.BodyFour}
                        className="text-sm text-green-500/90"
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
                          msg.role === "assistant"
                        }
                      />
                    ))}
                  </>
                )}

                {isLoading && (
                  <div className="flex gap-3 animate-pulse">
                    <div className="size-8 rounded-full bg-green-200 shrink-0" />
                    <div className="px-2 py-3">
                      <div className="flex gap-1">
                        <span className="w-2 h-2 bg-green-500 rounded-full animate-bounce" />
                        <span className="w-2 h-2 bg-green-500 rounded-full animate-bounce [animation-delay:100ms]" />
                        <span className="w-2 h-2 bg-green-500 rounded-full animate-bounce [animation-delay:200ms]" />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div ref={messagesEndRef} />
            </div>

            {showScrollButton && (
              <div className="absolute bottom-24 right-[50%] translate-x-[-50%] group">
                <button
                  onClick={scrollToBottom}
                  className="p-2.5 cursor-pointer bg-green-50 border border-green-500 rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-105 animate-slideUp"
                  aria-label="Ir para mensagens recentes"
                >
                  <ArrowRightOutlinedIcon className="size-4 rotate-90 text-green-500" />
                  {hasNewMessages && (
                    <div className="absolute -top-1 right-0.5 flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-200 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-green-200"></span>
                    </div>
                  )}
                </button>
              </div>
            )}

            {/* Input */}
            <div className="w-full max-w-4xl mx-auto mb-2">
              <div className="flex gap-2 items-end">
                <div className="flex-1 px-4 py-1 rounded-xl h-fit overflow-y-auto border border-green-500 bg-transparent focus-visible:outline-none focus-visible:ring-0">
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
                    disabled={isLoading}
                    className="w-full style-scrollbar resize-none overflow-y-auto bg-transparent md:text-base max-h-[400px] text-sm text-green-500 placeholder:text-green-200 focus-visible:outline-none focus-visible:ring-0 disabled:cursor-not-allowed"
                    name="messageTextarea"
                  />
                </div>
                <Button.Icon
                  onClick={isLoading ? cancelRequest : handleSubmit}
                  disabled={!isLoading && !messageInput.trim()}
                  className="items-end"
                  icon={
                    isLoading ? (
                      <SquareFilledIcon className="fill-green-50" />
                    ) : messageInput !== "" ? (
                      <PaperPlaneOutlinedIcon className="-rotate-45 transition-all duration-300" />
                    ) : (
                      <PaperPlaneOutlinedIcon className="rotate-0 transition-all duration-300" />
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
