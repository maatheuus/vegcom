import { usePostComposerEditor } from "@/shared/hooks/usePostComposerEditor";
import { Input } from "@/shared/ui/Input";
import Col from "@/shared/ui/Layout/Helpers/Col";
import { EditorContent } from "@tiptap/react";
import clsx from "clsx";
import { useCallback, useRef, useState, type HTMLAttributes } from "react";
import type { PostImageAttachment } from "../Tiptap/Helpers/ImageContainer";
import ImageContainer from "../Tiptap/Helpers/ImageContainer";
import PostComposerActions from "./Actions";
import PostComposerTextArea from "./PostComposerTextArea";

export default function PostComposer({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  const { editor } = usePostComposerEditor();
  const imageInputRef = useRef<HTMLInputElement | null>(null);
  const postTitleRef = useRef<HTMLInputElement | null>(null);

  const [attachments, setAttachments] = useState<PostImageAttachment[]>([]);

  const isImageLimitReached = attachments.length >= 4;

  const handleImageUpload = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const files = event.target.files;
      if (!files) return;

      const currentCount = attachments.length;
      const newImagesCount = files.length;

      if (currentCount + newImagesCount > 4) {
        alert("Você só pode adicionar até 4 imagens por post.");
        if (imageInputRef.current) {
          imageInputRef.current.value = "";
        }
        return;
      }

      const newAttachments: PostImageAttachment[] = [];

      Array.from(files).forEach((file) => {
        if (file.type.startsWith("image/")) {
          const previewSrc = URL.createObjectURL(file);

          newAttachments.push({
            file,
            previewSrc,
            id: previewSrc,
          });
        }
      });

      setAttachments((prev) => [...prev, ...newAttachments]);

      if (imageInputRef.current) {
        imageInputRef.current.value = "";
      }
    },
    [attachments.length],
  );

  const handleRemoveImage = useCallback((id: string) => {
    setAttachments((prev) => prev.filter((img) => img.id !== id));
  }, []);

  const addEmoji = useCallback(
    (emoji: { native: string }) => {
      if (!editor) return;

      editor.chain().focus().insertContent(emoji.native).run();
    },
    [editor],
  );

  const handleSubmit = () => {
    if (!editor) return;

    const payload = {
      title: postTitleRef.current?.value,
      contentHTML: editor.getHTML(),
      contentText: editor.getText(),
      images: attachments.map((a) => a.file),
    };

    console.log("Enviando:", payload);
    editor.commands.clearContent();
    setAttachments([]);
    if (postTitleRef.current) {
      postTitleRef.current.value = "";
    }
  };

  return (
    <Col className={clsx(className)} {...props}>
      <div className="relative">
        <PostComposerTextArea editor={editor}>
          <ImageContainer
            images={attachments}
            onRemoveImage={handleRemoveImage}
          />
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
              "hidden-scrollbar h-auto max-h-[20rem] min-h-24 w-full overflow-y-auto py-2",
              "[&_.is-editor-empty]:before:content-[attr(data-placeholder)]",
              "[&_.is-editor-empty]:before:absolute",
              "[&_.is-editor-empty]:before:text-green-500/80",
              "[&_.is-editor-empty]:before:top-0 [&_.is-editor-empty]:before:left-0",
              "[&_.is-editor-empty]:before:pointer-events-none",
              "[&_.is-editor-empty]:before:text-base",
              "[&_.ProseMirror]:pb-8",
              "[&_.ProseMirror]:min-h-[100px]",
            )}
          />
        </PostComposerTextArea>
      </div>

      <PostComposerActions
        postTitleInputRef={postTitleRef}
        editor={editor}
        imageInputRef={imageInputRef}
        addEmoji={addEmoji}
        isImageLimitReached={isImageLimitReached}
        handleSubmit={handleSubmit}
      />

      <input
        type="file"
        ref={imageInputRef}
        accept="image/*"
        multiple
        onChange={handleImageUpload}
        className="hidden"
        disabled={isImageLimitReached}
      />
    </Col>
  );
}
