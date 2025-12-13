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
  CheckIcon,
  CopyIcon,
  ShareNetworkIcon,
} from "@phosphor-icons/react";
import type { LastMessage } from "../../api/types";
import RecipeEmbed from "./embeds/RecipeEmbed";

interface MessageBubbleProps {
  message: LastMessage;
  showActions?: boolean;
  messageCopied?: boolean;
  onRegenerate?: () => void;
  onShare?: (message: string) => void;
  onCopy?: (message: string) => void;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({
  message,
  showActions = false,
  messageCopied,
  onRegenerate,
  onShare,
  onCopy,
  ...props
}) => {
  const isUser = message.role === "user";
  const generatedRecipes = message.metadata?.recipes;

  return (
    <Row
      className={`gap-3 ${isUser ? "flex-row-reverse" : ""} animate-fadeIn`}
      {...props}
    >
      <Col
        className={`relative mb-6 flex-1 md:mb-4 md:max-w-[70%] ${
          isUser ? "group items-end" : "items-start"
        }`}
      >
        <div
          className={`relative rounded-2xl px-4 py-2.5 ${
            isUser
              ? "bg-green-500 text-green-50"
              : "bg-green-100 text-green-900"
          } `}
        >
          <Text
            as="p"
            className="font-maitree !text-sm break-words whitespace-pre-wrap"
          >
            {message.metadata?.error ||
              message.metadata?.answer ||
              message.content}
          </Text>
          {generatedRecipes && generatedRecipes.length > 0 && !isUser && (
            <div className="mt-4 flex w-full flex-col gap-4">
              {generatedRecipes.map((recipe, index) => (
                <RecipeEmbed key={index} recipe={recipe} />
              ))}
            </div>
          )}
        </div>

        {isUser && (
          <TooltipProvider>
            <Tooltip delayDuration={60}>
              <TooltipTrigger asChild>
                <Button.Icon
                  onClick={() => onCopy?.(message.content)}
                  className="invisible absolute right-2 -bottom-6 flex translate-y-1 items-center rounded px-1 py-1 text-xs text-green-500 transition-all duration-500 group-hover:visible group-hover:opacity-100 hover:bg-green-500/20 hover:text-green-500 md:opacity-0"
                  variant="text"
                  icon={
                    messageCopied ? (
                      <CheckIcon size={16} />
                    ) : (
                      <CopyIcon size={16} />
                    )
                  }
                />
              </TooltipTrigger>
              <TooltipContent side="bottom">
                <span>Copiar</span>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}

        {!isUser && showActions && (
          <TooltipProvider>
            <div className="mt-1 flex items-center gap-x-0.5 px-1">
              <Tooltip delayDuration={60}>
                <TooltipTrigger asChild>
                  <Button.Icon
                    onClick={onRegenerate}
                    className="flex items-center rounded px-1 py-1 text-xs text-green-500 transition-colors hover:bg-green-500/20 hover:text-green-500"
                    variant="text"
                    icon={<ArrowClockwiseIcon size={16} />}
                  />
                </TooltipTrigger>
                <TooltipContent side="bottom">
                  <span>Tentar novamente</span>
                </TooltipContent>
              </Tooltip>

              <Tooltip delayDuration={60}>
                <TooltipTrigger asChild>
                  <Button.Icon
                    onClick={() => onCopy?.(message.content)}
                    className="flex items-center rounded px-1 py-1 text-xs text-green-500 transition-colors hover:bg-green-500/20 hover:text-green-500"
                    variant="text"
                    icon={
                      messageCopied ? (
                        <CheckIcon size={16} />
                      ) : (
                        <CopyIcon size={16} />
                      )
                    }
                  />
                </TooltipTrigger>
                <TooltipContent side="bottom">
                  <span>Copiar</span>
                </TooltipContent>
              </Tooltip>

              <Tooltip delayDuration={60}>
                <TooltipTrigger asChild>
                  <Button.Icon
                    onClick={() => onShare?.(message.content)}
                    className="flex items-center rounded px-1 py-1 text-xs text-green-500 transition-colors hover:bg-green-500/20 hover:text-green-500"
                    variant="text"
                    icon={<ShareNetworkIcon size={16} />}
                  />
                </TooltipTrigger>
                <TooltipContent side="bottom">
                  <span>Compartilhar</span>
                </TooltipContent>
              </Tooltip>
            </div>
          </TooltipProvider>
        )}
      </Col>
    </Row>
  );
};

export default MessageBubble;
