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
import type { EmojiPickerProps } from "./types";

interface Props extends HTMLAttributes<HTMLDivElement> {
  addEmoji: (emoji: { native: string }) => void;
  imageInputRef: React.RefObject<HTMLInputElement | null>;
  postTitleInputRef: React.RefObject<HTMLInputElement | null>;
  editor: Editor | null;
}

export default function PostComposerActions({
  className,
  editor,
  addEmoji,
  postTitleInputRef,
  imageInputRef,
  ...props
}: Props) {
  const handleImageClick = () => {
    imageInputRef.current?.click();
  };

  const handleSendMessage = () => {
    // editor?.commands.clearContent();
    console.log("postTitleInputRef:", postTitleInputRef.current?.value);
    console.log("Sending message:", editor?.getHTML());
  };

  const emojiPickerOptions: EmojiPickerProps = {
    theme: "light",
    data: data,
    onEmojiSelect: addEmoji,
    locale: "pt",
    autoFocus: true,
    navPosition: "bottom",
    previewPosition: "top",
    skinTonePosition: "search",
    icons: "solid",
    emojiButtonColors: [
      "rgba(87, 204, 153, 0.7)",
      "rgba(132, 255, 174, 0.7)",
      "rgba(255, 214, 10, 0.7)",
      "rgba(255, 123, 84, 0.7)",
      "rgba(72, 207, 173, 0.7)",
      "rgba(130, 181, 53, 0.7)",
    ],
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
          className="p-0 text-green-200 hover:text-green-500"
          leftIcon={<ImageIcon size={24} className="text-current" />}
          onClick={handleImageClick}
        />
        <Row className={clsx("items-center", className)} {...props}>
          <Popover>
            <PopoverTrigger asChild>
              <Button.Icon
                variant="text"
                className="p-0 text-green-200 hover:text-green-500"
                icon={<SmileyIcon size={24} className="text-current" />}
              />
            </PopoverTrigger>
            <PopoverContent className="border-none p-0 shadow-xl">
              <EmojiPicker {...emojiPickerOptions} />
            </PopoverContent>
          </Popover>
        </Row>
      </Row>

      <Button.Icon
        variant="filled"
        rightIcon={<PaperPlaneTiltIcon size={24} />}
        disabled={editor?.isEmpty && postTitleInputRef?.current?.value === ""}
        className="rounded-full"
        title="Send message"
        onClick={handleSendMessage}
      />
    </Row>
  );
}
