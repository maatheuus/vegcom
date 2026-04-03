import { useGetUser } from "@/features/auth/api/queries/getAuthApiClient";
import {
  useGenerateResponse,
  useGetUsageStats,
} from "@/shared/api/ai/queries/getAiApiClient";
import Col from "@/shared/ui/Layout/Helpers/Col";
import Row from "@/shared/ui/Layout/Helpers/Row";
import Text from "@/shared/ui/Text";
import {
  ArrowBendUpRightIcon,
  ChatCircleTextIcon,
  ChefHatIcon,
  CircleNotchIcon,
  LockSimpleIcon,
  PaperPlaneRightIcon,
} from "@phosphor-icons/react";
import clsx from "clsx";
import Link from "next/link";
import { useState } from "react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export default function ChatWidget() {
  const { data: user } = useGetUser();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [chatId, setChatId] = useState<number>(0);
  const [hasRecipes, setHasRecipes] = useState(false);
  const { mutateAsync: generateResponse, isPending } = useGenerateResponse();
  const { data: usageStats } = useGetUsageStats();

  const isAuthenticated = !!user?.id;
  const isAtLimit = usageStats?.remaining === 0;

  const handleSend = async () => {
    const content = input.trim();
    if (!content || isPending || isAtLimit) return;

    setInput("");
    setHasRecipes(false);
    setMessages((prev) => [...prev, { role: "user", content }]);

    try {
      const response = await generateResponse({ query: content, chatId });

      if (response?.chatId) setChatId(response.chatId);

      if (response?.recipes?.length > 0) setHasRecipes(true);

      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: response.messageContent ?? "..." },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Ocorreu um erro. Tente novamente.",
        },
      ]);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <Col className="gap-y-3 rounded-xl border border-green-200/60 bg-green-50 p-3">
      <Row className="items-center gap-x-2">
        <ChatCircleTextIcon size={15} className="text-green-500" />
        <Text
          as="p"
          type={Text.Type.BodyFive}
          weight={Text.Weight.Bold}
          className="font-lora text-green-500 italic"
        >
          Chat VegCom
        </Text>
        {messages.length > 0 && (
          <Link
            href={chatId ? `/chat/${chatId}` : "/chat"}
            className="font-maitree ml-auto text-xs text-green-500/40 transition-colors hover:text-green-500"
          >
            Ver completo →
          </Link>
        )}
        {messages.length === 0 && (
          <Link
            href="/chat"
            className="ml-auto text-green-500/40 transition-colors hover:text-green-500"
          >
            <ArrowBendUpRightIcon size={13} />
          </Link>
        )}
      </Row>

      {!isAuthenticated ? (
        <>
          <Text
            as="p"
            type={Text.Type.BodyFive}
            className="font-maitree text-green-500/60"
          >
            Tire dúvidas sobre receitas, ingredientes e vida vegana.
          </Text>
          <Link
            href="/login"
            className="flex items-center gap-x-1.5 rounded-lg border border-green-200/60 bg-green-100/40 px-3 py-2 transition-colors hover:bg-green-100"
          >
            <LockSimpleIcon size={12} className="text-green-500/50" />
            <Text
              as="span"
              type={Text.Type.BodyFive}
              className="font-maitree text-green-500/60"
            >
              Faça login para usar o chat
            </Text>
          </Link>
        </>
      ) : (
        <>
          {messages.length === 0 ? (
            <Text
              as="p"
              type={Text.Type.BodyFive}
              className="font-maitree text-green-500/60"
            >
              Tire dúvidas sobre receitas, ingredientes e vida vegana.
            </Text>
          ) : (
            <div className="hidden-scrollbar flex max-h-[260px] flex-col gap-y-2 overflow-y-auto overscroll-contain">
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={clsx(
                    "font-maitree rounded-xl px-3 py-2 text-xs leading-relaxed",
                    msg.role === "user"
                      ? "ml-4 self-end bg-green-500 text-green-50"
                      : "mr-4 bg-green-100/70 text-green-600",
                  )}
                >
                  {msg.content}
                </div>
              ))}

              {isPending && (
                <div className="mr-4 flex items-center gap-x-1.5 rounded-xl bg-green-100/70 px-3 py-2">
                  <CircleNotchIcon
                    size={12}
                    className="animate-spin text-green-500"
                  />
                  <Text
                    as="span"
                    type={Text.Type.BodyFive}
                    className="font-maitree text-green-500/60"
                  >
                    Pensando...
                  </Text>
                </div>
              )}
            </div>
          )}

          {hasRecipes && chatId > 0 && (
            <Link
              href={`/chat/${chatId}`}
              className="flex items-center gap-x-2 rounded-lg border border-green-300/60 bg-green-100/60 px-3 py-2 transition-colors hover:bg-green-100"
            >
              <ChefHatIcon size={13} className="shrink-0 text-green-500" />
              <Text
                as="span"
                type={Text.Type.BodyFive}
                className="font-maitree text-green-600"
              >
                Ver receitas geradas →
              </Text>
            </Link>
          )}

          {usageStats && (
            <Text
              as="p"
              type={Text.Type.BodyFive}
              className="font-maitree text-green-500/40"
            >
              {isAtLimit
                ? "Limite de mensagens atingido."
                : `${usageStats.remaining} mensagens restantes`}
            </Text>
          )}

          <Row className="w-full items-center gap-x-1.5">
            <div className="flex w-full items-center rounded-lg border border-green-200 bg-white/60 px-2.5 py-1.5 focus-within:border-green-200">
              <input
                name="chat"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={isAtLimit ? "Limite atingido" : "Pergunte algo..."}
                disabled={isPending || isAtLimit}
                className="font-maitree w-full min-w-0 bg-transparent text-xs text-green-500 placeholder:text-green-500/40 focus:outline-none disabled:opacity-50"
              />
            </div>
            <button
              onClick={handleSend}
              disabled={!input.trim() || isPending || isAtLimit}
              className="w-fit text-green-500/40 transition-colors hover:text-green-500 disabled:opacity-30"
            >
              {isPending ? (
                <CircleNotchIcon size={14} className="animate-spin" />
              ) : (
                <PaperPlaneRightIcon size={14} />
              )}
            </button>
          </Row>
        </>
      )}
    </Col>
  );
}
