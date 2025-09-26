import {
  CheckOutlinedIcon,
  CopyOutlinedIcon,
  RotateOutlinedIcon,
  ShareOutlinedIcon,
} from "@/components/icons";
import Button from "@/components/ui/Button";
import Col from "@/components/ui/Layout/Helpers/Col";
import Row from "@/components/ui/Layout/Helpers/Row";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/Tooltip";
import type { Message } from "./types";

interface MessageBubbleProps {
  message: Message;
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

  return (
    <Row
      className={`gap-3 ${isUser ? "flex-row-reverse" : ""} animate-fadeIn`}
      {...props}
    >
      <Col
        className={`flex-1 max-w-[70%] ${
          isUser ? "items-end group" : "items-start"
        }`}
      >
        <div
          className={`
          rounded-2xl px-4 py-2.5 relative
          ${
            isUser
              ? "bg-green-500 text-green-50"
              : "bg-green-100 text-green-900"
          }
        `}
        >
          <p className="text-sm whitespace-pre-wrap break-words">
            {message.content}
          </p>
          {/* 
          {!isUser && (
            <span className="w-full text-[10px] text-gray-400 flex items-center justify-end gap-1 mt-1.5">
              <ClockOutlinedIcon size={14} />
              {formatDate(message.timestamp)}
            </span>
          )} */}
        </div>

        {isUser && (
          <TooltipProvider>
            <Tooltip delayDuration={60}>
              <TooltipTrigger asChild>
                <Button.Icon
                  onClick={() => onCopy?.(message.content)}
                  className="text-xs text-green-500 hover:text-green-500 flex items-center px-1 py-1 rounded hover:bg-green-500/20 opacity-0 translate-y-1 invisible group-hover:opacity-100 group-hover:visible transition-all duration-500"
                  variant="text"
                  icon={
                    messageCopied ? (
                      <CheckOutlinedIcon size={16} />
                    ) : (
                      <CopyOutlinedIcon size={16} />
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
                    className="text-xs text-green-500 hover:text-green-500 flex items-center px-1 py-1 rounded hover:bg-green-500/20 transition-colors"
                    variant="text"
                    icon={<RotateOutlinedIcon size={16} />}
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
                    className="text-xs text-green-500 hover:text-green-500 flex items-center px-1 py-1 rounded hover:bg-green-500/20 transition-colors"
                    variant="text"
                    icon={
                      messageCopied ? (
                        <CheckOutlinedIcon size={16} />
                      ) : (
                        <CopyOutlinedIcon size={16} />
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
                    className="text-xs text-green-500 hover:text-green-500 flex items-center px-1 py-1 rounded hover:bg-green-500/20 transition-colors"
                    variant="text"
                    icon={<ShareOutlinedIcon size={16} />}
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
