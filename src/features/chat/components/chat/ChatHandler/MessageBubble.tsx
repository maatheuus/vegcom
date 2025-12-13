import Button from "@/shared/ui/Button";
import Col from "@/shared/ui/Layout/Helpers/Col";
import Row from "@/shared/ui/Layout/Helpers/Row";
import Text from "@/shared/ui/Text";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/shared/ui/Tooltip";
import {
  ArrowClockwiseIcon,
  CaretLeftIcon,
  CaretRightIcon,
  CheckIcon,
  CopyIcon,
  ShareNetworkIcon,
} from "@phosphor-icons/react";
import { useEffect, useState } from "react";
import RecipeEmbed from "../embeds/RecipeEmbed";
import type { MessageGroup } from "../utils/groupMessages";

interface MessageBubbleProps {
  group: MessageGroup;
  showActions?: boolean;
  onRegenerate?: () => void;
  onShare?: (message: string) => void;
  onCopy?: (message: string) => void;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({
  group,
  onRegenerate,
}) => {
  const isUser = group.role === "user";

  const [currentIndex, setCurrentIndex] = useState(group.versions.length - 1);
  const [messageCopied, setMessageCopied] = useState(false);

  useEffect(() => {
    setCurrentIndex(group.versions.length - 1);
  }, [group.versions.length]);

  const currentMessage = group.versions[currentIndex];
  const generatedRecipes = currentMessage.metadata?.recipes;
  const totalVersions = group.versions.length;

  const handleCopy = () => {
    navigator.clipboard.writeText(currentMessage.content);
    setMessageCopied(true);
    setTimeout(() => setMessageCopied(false), 2000);
  };

  const handleShare = () => {
    navigator.share({
      title: "Conversa com o especialista",
      text: currentMessage.content,
    });
  };

  return (
    <Row
      className={`gap-3 ${isUser ? "flex-row-reverse" : ""} animate-fadeIn w-full`}
    >
      <Col
        className={`group relative w-fit max-w-[85%] ${isUser ? "items-end" : "items-start"}`}
      >
        <div
          className={`relative rounded-2xl px-4 py-3 ${
            isUser
              ? "bg-green-500 text-green-50"
              : "bg-green-100 text-green-900"
          }`}
        >
          <Text
            as="p"
            className="font-maitree text-sm leading-relaxed whitespace-pre-wrap"
          >
            {currentMessage.metadata?.error ||
              currentMessage.metadata?.messageContent ||
              currentMessage.content}
          </Text>

          {generatedRecipes && generatedRecipes.length > 0 && !isUser && (
            <div className="mt-4 flex w-full flex-col gap-3">
              {generatedRecipes.map((recipe, index) => (
                <RecipeEmbed key={index} recipe={recipe} />
              ))}
            </div>
          )}
        </div>

        {isUser && (
          <div className="invisible mt-1 flex h-6 w-full items-center justify-end px-2 opacity-0 transition-all duration-200 select-none group-hover:visible group-hover:opacity-100">
            <Button.Icon
              onClick={handleCopy}
              className="rounded p-1 text-green-500 transition-colors hover:bg-green-100"
              variant="text"
              icon={
                messageCopied ? <CheckIcon size={16} /> : <CopyIcon size={16} />
              }
            />
          </div>
        )}

        {!isUser && (
          <div className="mt-1 flex h-6 w-full items-center justify-between px-2 select-none">
            {totalVersions > 1 ? (
              <div className="flex items-center gap-2 text-xs font-bold text-green-700">
                <button
                  onClick={() =>
                    setCurrentIndex((prev) => Math.max(0, prev - 1))
                  }
                  disabled={currentIndex === 0}
                  className="rounded-full p-1 transition-colors hover:bg-green-100 hover:text-green-900 disabled:cursor-not-allowed disabled:opacity-30"
                >
                  <CaretLeftIcon size={14} weight="bold" />
                </button>

                <span className="font-lora">
                  {currentIndex + 1} / {totalVersions}
                </span>

                <button
                  onClick={() =>
                    setCurrentIndex((prev) =>
                      Math.min(totalVersions - 1, prev + 1),
                    )
                  }
                  disabled={currentIndex === totalVersions - 1}
                  className="rounded-full p-1 transition-colors hover:bg-green-100 hover:text-green-900 disabled:cursor-not-allowed disabled:opacity-30"
                >
                  <CaretRightIcon size={14} weight="bold" />
                </button>
              </div>
            ) : null}

            <div className="flex items-center justify-end gap-1">
              {onRegenerate && (
                <TooltipProvider>
                  <Tooltip delayDuration={60}>
                    <TooltipTrigger asChild>
                      <Button.Icon
                        onClick={onRegenerate}
                        className="rounded p-1 text-green-500 transition-colors hover:bg-green-100"
                        variant="text"
                        icon={<ArrowClockwiseIcon size={16} />}
                      />
                    </TooltipTrigger>
                    <TooltipContent>Regenerar resposta</TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              )}

              <Button.Icon
                onClick={handleCopy}
                className="rounded p-1 text-green-500 transition-colors hover:bg-green-100"
                variant="text"
                icon={
                  messageCopied ? (
                    <CheckIcon size={16} />
                  ) : (
                    <CopyIcon size={16} />
                  )
                }
              />

              <Button.Icon
                onClick={handleShare}
                className="rounded p-1 text-green-500 transition-colors hover:bg-green-100"
                variant="text"
                icon={<ShareNetworkIcon size={16} />}
              />
            </div>
          </div>
        )}
      </Col>
    </Row>
  );
};

export default MessageBubble;
