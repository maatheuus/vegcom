import Button from "@/shared/ui/Button";
import Row from "@/shared/ui/Layout/Helpers/Row";
import { Popover, PopoverContent, PopoverTrigger } from "@/shared/ui/popover";
import data from "@emoji-mart/data";
import EmojiPicker from "@emoji-mart/react";
import {
  ImageIcon,
  PaperPlaneTiltIcon,
  SmileyIcon,
} from "@phosphor-icons/react";
import type { Editor } from "@tiptap/react";
import clsx from "clsx";
import { type HTMLAttributes } from "react";

interface Props extends HTMLAttributes<HTMLDivElement> {
  addEmoji: (emoji: { native: string }) => void;
  imageInputRef: React.RefObject<HTMLInputElement | null>;
  postTitleInputRef: React.RefObject<HTMLInputElement | null>;
  editor: Editor | null;
  isImageLimitReached?: boolean;
  handleSubmit?: () => void;
}

export default function PostComposerActions({
  className,
  editor,
  addEmoji,
  handleSubmit,
  postTitleInputRef,
  imageInputRef,
  isImageLimitReached,
  ...props
}: Props) {
  const handleImageClick = () => {
    if (!isImageLimitReached) {
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
      <Row className="items-center gap-x-4">
        <Button.Icon
          variant="text"
          className={clsx(
            "p-0",
            isImageLimitReached
              ? "cursor-not-allowed text-gray-400 opacity-50"
              : "text-green-200 hover:text-green-500",
          )}
          disabled={isImageLimitReached}
          leftIcon={<ImageIcon size={24} className="text-current" />}
          onClick={handleImageClick}
        />

        <Popover modal={true}>
          <PopoverTrigger asChild>
            <Button.Icon
              variant="text"
              className="p-0 text-green-200 hover:text-green-500"
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

      <Button.Icon
        variant="filled"
        rightIcon={<PaperPlaneTiltIcon size={24} />}
        disabled={editor?.isEmpty || postTitleInputRef?.current?.value === ""}
        className="rounded-full"
        title="Enviar mensagem"
        onClick={handleSubmit}
      />
    </Row>
  );
}
