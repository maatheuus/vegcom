import Button from "@/shared/ui/Button";
import Row from "@/shared/ui/Layout/Helpers/Row";
import { Popover, PopoverContent, PopoverTrigger } from "@/shared/ui/popover";
import data from "@emoji-mart/data";
import EmojiPicker from "@emoji-mart/react";
import {
  CircleNotchIcon,
  ImageIcon,
  PaperPlaneTiltIcon,
  SmileyIcon,
  TextBIcon,
  TextItalicIcon,
  TextStrikethroughIcon,
} from "@phosphor-icons/react";
import type { Editor } from "@tiptap/react";
import clsx from "clsx";
import { type HTMLAttributes } from "react";

interface Props extends HTMLAttributes<HTMLDivElement> {
  addEmoji: (emoji: { native: string }) => void;
  handleSubmit?: () => void;
  imageInputRef: React.RefObject<HTMLInputElement | null>;
  postTitleInputRef: React.RefObject<HTMLInputElement | null>;
  editor: Editor | null;
  isImageLimitReached?: boolean;
  disabled?: boolean;
  isLoading?: boolean;
}

export default function PostComposerActions({
  className,
  editor,
  addEmoji,
  handleSubmit,
  postTitleInputRef,
  imageInputRef,
  isImageLimitReached,
  disabled,
  isLoading,
  ...props
}: Props) {
  const handleImageClick = () => {
    if (!isImageLimitReached && !disabled) {
      imageInputRef.current?.click();
    }
  };

  return (
    <Row
      className={clsx(
        "z-50 w-full justify-between border-t border-t-green-100 px-4 py-5",
        className,
      )}
      {...props}
    >
      <Row className="items-center gap-x-3">
        <Row className="items-center gap-x-4">
          <Button.Icon
            variant="text"
            className={clsx(
              "p-0",
              isImageLimitReached || disabled
                ? "cursor-not-allowed text-gray-400 opacity-50"
                : "text-green-200 hover:text-green-500",
            )}
            disabled={isImageLimitReached || disabled}
            leftIcon={<ImageIcon size={24} className="text-current" />}
            onClick={handleImageClick}
          />

          <Popover modal={true}>
            <PopoverTrigger asChild>
              <Button.Icon
                variant="text"
                disabled={disabled}
                className={clsx(
                  "p-0",
                  disabled
                    ? "cursor-not-allowed text-gray-400 opacity-50"
                    : "text-green-200 hover:text-green-500",
                )}
                icon={<SmileyIcon size={24} className="text-current" />}
              />
            </PopoverTrigger>
            <PopoverContent
              className="w-auto border-none p-0 shadow-xl"
              side="top"
              align="start"
              onOpenAutoFocus={(e) => e.preventDefault()}
              onCloseAutoFocus={(e) => e.preventDefault()}
            >
              <div
                onPointerDown={(e) => {
                  e.preventDefault();
                }}
              >
                <EmojiPicker
                  data={data}
                  onEmojiSelect={addEmoji}
                  theme="light"
                  locale="pt"
                  autoFocus={false}
                  navPosition="bottom"
                  previewPosition="top"
                  skinTonePosition="search"
                  icons="solid"
                />
              </div>
            </PopoverContent>
          </Popover>
        </Row>

        <div className="h-6 w-px bg-green-500 opacity-20" />

        <Row className="items-center gap-x-1">
          <Button.Icon
            variant="text"
            className={clsx(
              "h-8 w-8 p-0 text-green-200 transition-colors duration-200 hover:bg-green-50 hover:text-green-500",
              editor?.isActive("bold") && "bg-green-100 text-green-500",
            )}
            onClick={() => editor?.chain().focus().toggleBold().run()}
            icon={<TextBIcon size={20} weight="bold" />}
          />
          <Button.Icon
            variant="text"
            className={clsx(
              "h-8 w-8 p-0 text-green-200 transition-colors duration-200 hover:bg-green-50 hover:text-green-500",
              editor?.isActive("italic") && "bg-green-100 text-green-500",
            )}
            onClick={() => editor?.chain().focus().toggleItalic().run()}
            icon={<TextItalicIcon size={20} />}
          />
          <Button.Icon
            variant="text"
            className={clsx(
              "h-8 w-8 p-0 text-green-200 transition-colors duration-200 hover:bg-green-50 hover:text-green-500",
              editor?.isActive("strike") && "bg-green-100 text-green-500",
            )}
            onClick={() => editor?.chain().focus().toggleStrike().run()}
            icon={<TextStrikethroughIcon size={20} />}
          />
        </Row>
      </Row>

      <Button.Icon
        variant="filled"
        rightIcon={
          isLoading ? (
            <CircleNotchIcon size={24} className="animate-spin" />
          ) : (
            <PaperPlaneTiltIcon size={24} />
          )
        }
        disabled={
          disabled ||
          editor?.isEmpty ||
          postTitleInputRef?.current?.value === ""
        }
        className="rounded-full"
        title="Enviar"
        onClick={handleSubmit}
      />
    </Row>
  );
}
