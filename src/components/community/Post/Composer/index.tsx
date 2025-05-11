import { Input } from "@/components/ui/Input";
import Col from "@/components/ui/Layout/Helpers/Col";
import { usePostComposerEditor } from "@/hooks/usePostComposerEditor";
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
  const editor = usePostComposerEditor();
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
              .chain()
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
    [editor]
  );

  const addEmoji = useCallback(
    (emoji: { native: string }) => {
      editor?.chain().focus().insertContent(emoji.native).run();
    },
    [editor]
  );

  return (
    <Col className={clsx(className)} {...props}>
      <div className="relative">
        <PostComposerTextArea editor={editor}>
          <Input
            ref={postTitleRef}
            type="text"
            placeholder="Título do post"
            className="border-none focus:!ring-0 !text-xl sm:!text-2xl/tight text-green-500 placeholder:text-green-500/80 font-frank font-medium leading-none tracking-tight px-0"
            maxLength={50}
          />

          <EditorContent
            editor={editor}
            className={clsx(
              "h-full w-full py-2 overflow-hidden max-h-[20rem] hidden-scrollbar",
              "[&_.is-editor-empty]:before:content-[attr(data-placeholder)]",
              "[&_.is-editor-empty]:before:absolute",
              "[&_.is-editor-empty]:before:text-green-500/80",
              "[&_.is-editor-empty]:before:top-0 [&_.is-editor-empty]:before:left-0",
              "[&_.is-editor-empty]:before:pointer-events-none",
              "[&_.is-editor-empty]:before:text-base"
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
