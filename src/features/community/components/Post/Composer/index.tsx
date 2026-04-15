import { createPost } from "@/features/community/api/communityApi";
import AuthenticatedBlocker from "@/shared/components/ui/AuthenticatedBlocker";
import { usePostComposerEditor } from "@/shared/hooks/usePostComposerEditor";
import { Input } from "@/shared/ui/Input";
import Col from "@/shared/ui/Layout/Helpers/Col";
import { EditorContent } from "@tiptap/react";
import clsx from "clsx";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  useTransition,
  type HTMLAttributes,
} from "react";
import type { PostImageAttachment } from "../Tiptap/Helpers/ImageContainer";
import ImageContainer from "../Tiptap/Helpers/ImageContainer";
import PostComposerActions from "./Actions";
import PostComposerTextArea from "./PostComposerTextArea";

interface Props extends HTMLAttributes<HTMLDivElement> {
  disabled?: boolean;
}

export default function PostComposer({ className, disabled, ...props }: Props) {
  const { editor } = usePostComposerEditor();
  const imageInputRef = useRef<HTMLInputElement | null>(null);
  const postTitleRef = useRef<HTMLInputElement | null>(null);
  const [isTransitioning, startTransition] = useTransition();

  const [attachments, setAttachments] = useState<PostImageAttachment[]>([]);

  const isImageLimitReached = attachments.length >= 4;

  useEffect(() => {
    if (editor) {
      editor.setEditable(!disabled);
    }
  }, [editor, disabled]);

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

  const handleSubmit = async () => {
    if (disabled || !editor) return;

    const title = postTitleRef.current?.value || "";
    const type = attachments.length > 0 ? "RESOURCE" : "POST";

    startTransition(async () => {
      if (attachments.length > 0) {
        const formData = new FormData();
        formData.append("postTitle", title);
        formData.append("type", type);
        formData.append(
          "postContent[postResources][content]",
          editor.getText(),
        );
        formData.append(
          "postContent[postResources][contentHTML]",
          editor.getHTML(),
        );

        attachments.forEach((attachment) => {
          formData.append("images", attachment.file);
        });

        await createPost(formData);
      } else {
        await createPost({
          postTitle: title,
          type,
          postContent: {
            postResources: {
              content: editor.getText(),
              contentHTML: editor.getHTML(),
              images: [],
              links: [],
            },
          },
        });
      }

      window.dispatchEvent(new CustomEvent("community:post-created"));
    });

    editor.commands.clearContent();
    setAttachments([]);
    if (postTitleRef.current) {
      postTitleRef.current.value = "";
    }
  };

  return (
    <Col id="post-composer" className={clsx("relative overflow-hidden", className)} {...props}>
      {disabled && <AuthenticatedBlocker />}
      <div
        className={clsx(
          "relative transition-all duration-300",
          disabled &&
            "pointer-events-none z-10 blur-sm grayscale-[0.5] select-none",
        )}
      >
        <div className="relative">
          <div className={clsx("relative transition-all duration-300")}>
            <PostComposerTextArea editor={editor}>
              <ImageContainer
                images={attachments}
                onRemoveImage={handleRemoveImage}
              />
              <Input
                ref={postTitleRef}
                disabled={disabled}
                type="text"
                placeholder="Título do post"
                className="font-lora border-none px-0 !text-xl leading-none font-medium tracking-tight text-green-500 placeholder:text-green-500/80 focus:!ring-0 sm:!text-2xl/tight"
                maxLength={50}
              />

              <EditorContent
                editor={editor}
                className={clsx(
                  "hidden-scrollbar font-maitree h-auto max-h-[20rem] min-h-24 w-full overflow-y-auto py-2 text-green-500",
                  "[&_.is-editor-empty]:before:content-[attr(data-placeholder)]",
                  "[&_.is-editor-empty]:before:absolute",
                  "[&_.is-editor-empty]:before:text-green-500/80",
                  "[&_.is-editor-empty]:before:font-maitree",
                  "[&_.is-editor-empty]:before:top-0 [&_.is-editor-empty]:before:left-0",
                  "[&_.is-editor-empty]:before:pointer-events-none",
                  "[&_.is-editor-empty]:before:text-base",
                  "[&_.ProseMirror]:pb-8",
                  "[&_.ProseMirror]:min-h-[100px]",
                )}
              />
            </PostComposerTextArea>
          </div>
        </div>

        <PostComposerActions
          postTitleInputRef={postTitleRef}
          editor={editor}
          imageInputRef={imageInputRef}
          addEmoji={addEmoji}
          isImageLimitReached={isImageLimitReached}
          handleSubmit={handleSubmit}
          disabled={disabled || isTransitioning}
          isLoading={isTransitioning}
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
      </div>
    </Col>
  );
}
