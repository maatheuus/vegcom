import { usePostComposerEditor } from "@/shared/hooks/usePostComposerEditor";
import { Input } from "@/shared/ui/Input";
import Col from "@/shared/ui/Layout/Helpers/Col";
import { EditorContent } from "@tiptap/react";
import clsx from "clsx";
import { useCallback, useRef, type HTMLAttributes } from "react";
import { CustomImageTiptapExtension } from "../Tiptap/Helpers/CustomTitapExtensions";
import PostComposerActions from "./Actions";
import PostComposerTextArea from "./PostComposerTextArea";

export default function PostComposer({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  const { editor } = usePostComposerEditor();
  const imageInputRef = useRef<HTMLInputElement | null>(null);
  const postTitleRef = useRef<HTMLInputElement | null>(null);

  const handleImageUpload = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const files = event.target.files;
      if (!files || !editor) return;

      Array.from(files).forEach((file) => {
        if (file.type.startsWith("image/")) {
          const reader = new FileReader();
          reader.onload = () => {
            const src = reader.result as string;
            editor
              ?.chain()
              .focus()
              .setCustomImage({
                src,
                alt: file.name,
                title: file.name,
              })
              .run();
          };
          reader.readAsDataURL(file);
        }
      });

      if (imageInputRef.current) {
        imageInputRef.current.value = "";
      }
    },
    [editor],
  );

  const addEmoji = useCallback(
    (emoji: { native: string }) => {
      editor?.chain().focus().insertContent(emoji.native).run();
    },
    [editor],
  );

  return (
    <Col className={clsx(className)} {...props}>
      <div className="relative">
        <PostComposerTextArea editor={editor}>
          <Input
            ref={postTitleRef}
            type="text"
            placeholder="Título do post"
            className="font-lora border-none px-0 !text-xl leading-none font-medium tracking-tight text-green-500 italic placeholder:text-green-500/80 focus:!ring-0 sm:!text-2xl/tight"
            maxLength={50}
          />

          <EditorContent
            editor={editor}
            className={clsx(
              "hidden-scrollbar h-full max-h-[20rem] w-full overflow-hidden py-2",
              "[&_.is-editor-empty]:before:content-[attr(data-placeholder)]",
              "[&_.is-editor-empty]:before:absolute",
              "[&_.is-editor-empty]:before:text-green-500/80",
              "[&_.is-editor-empty]:before:top-0 [&_.is-editor-empty]:before:left-0",
              "[&_.is-editor-empty]:before:pointer-events-none",
              "[&_.is-editor-empty]:before:text-base",
            )}
          />
        </PostComposerTextArea>

        {editor && <CustomImageTiptapExtension editor={editor} />}
      </div>

      <PostComposerActions
        postTitleInputRef={postTitleRef}
        editor={editor}
        imageInputRef={imageInputRef}
        addEmoji={addEmoji}
      />

      <input
        type="file"
        ref={imageInputRef}
        accept="image/*"
        multiple
        onChange={handleImageUpload}
        className="hidden"
      />
    </Col>
  );
}
