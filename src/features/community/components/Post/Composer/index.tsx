import {
  createPostClient,
  createPostWithImages,
} from "@/features/community/api/communityApiClient";
import AuthenticatedBlocker from "@/shared/components/ui/AuthenticatedBlocker";
import { useToast } from "@/shared/hooks/use-toast";
import { usePostComposerEditor } from "@/shared/hooks/usePostComposerEditor";
import { Input } from "@/shared/ui/Input";
import Col from "@/shared/ui/Layout/Helpers/Col";
import { compressImages } from "@shared/lib/compressImage";
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
  const { toast } = useToast();
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

  const MAX_TOTAL_MB = 10;

  const handleImageUpload = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const files = event.target.files;
      if (!files) return;

      const currentCount = attachments.length;
      const newImagesCount = files.length;

      const slotsAvailable = 4 - currentCount;

      if (slotsAvailable <= 0) {
        toast({
          title: "Limite de imagens atingido",
          description:
            "Você pode adicionar no máximo 4 imagens por publicação.",
          variant: "destructive",
        });
        if (imageInputRef.current) imageInputRef.current.value = "";
        return;
      }

      const filesToAdd = Array.from(files).slice(0, slotsAvailable);

      if (filesToAdd.length < newImagesCount) {
        toast({
          title: "Algumas imagens não foram adicionadas",
          description: `Apenas ${filesToAdd.length} ${filesToAdd.length > 1 ? "imagens foram adicionadas" : "imagem foi adicionada"} para não ultrapassar o limite.`,
          variant: "destructive",
        });
      }

      const existingTotalBytes = attachments.reduce(
        (sum, a) => sum + a.file.size,
        0,
      );
      const newTotalBytes =
        existingTotalBytes + filesToAdd.reduce((sum, f) => sum + f.size, 0);

      if (newTotalBytes > MAX_TOTAL_MB * 1024 * 1024) {
        toast({
          title: "Imagens muito grandes",
          description: `O total das imagens não pode ultrapassar ${MAX_TOTAL_MB}MB. Escolha imagens menores.`,
          variant: "destructive",
        });
        if (imageInputRef.current) imageInputRef.current.value = "";
        return;
      }

      const newAttachments: PostImageAttachment[] = [];

      filesToAdd.forEach((file) => {
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
    [attachments],
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

  const SLOW_WARN_MS = 10_000;
  const ABORT_MS = 30_000;

  const handleSubmit = async () => {
    if (disabled || !editor) return;

    const title = postTitleRef.current?.value || "";
    const type = attachments.length > 0 ? "RESOURCE" : "POST";

    startTransition(async () => {
      if (attachments.length > 0) {
        const compressedFiles = await compressImages(
          attachments.map((a) => a.file),
        );

        const formData = new FormData();
        formData.append(
          "data",
          JSON.stringify({
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
            postTags: [],
          }),
        );

        compressedFiles.forEach((file) => {
          formData.append("images", file);
        });

        const controller = new AbortController();

        const slowTimer = setTimeout(() => {
          toast({
            title: "Enviando...",
            description:
              "O envio está demorando mais que o esperado. Por favor, aguarde.",
            duration: 5000,
          });
        }, SLOW_WARN_MS);

        const abortTimer = setTimeout(() => {
          controller.abort();
        }, ABORT_MS);

        try {
          // // TODO: remover delay de teste
          // await new Promise<void>((resolve, reject) => {
          //   const t = setTimeout(resolve, 60_000);
          //   controller.signal.addEventListener("abort", () => {
          //     clearTimeout(t);
          //     reject(new DOMException("Aborted", "AbortError"));
          //   });
          // });
          await createPostWithImages(formData, controller.signal);
          window.dispatchEvent(new CustomEvent("community:post-created"));
          // @ts-ignore
          postTitleRef?.current?.value = "";
          editor.commands.clearContent();
          setAttachments([]);
        } catch (err) {
          const isAbort =
            err instanceof Error &&
            (err.name === "CanceledError" || err.name === "AbortError");
          toast({
            title: isAbort ? "Tempo esgotado" : "Erro ao publicar",
            description: isAbort
              ? "O envio demorou mais de 30 segundos e foi cancelado. Tente com imagens menores."
              : "Não foi possível publicar. Tente novamente.",
            variant: "destructive",
          });
          return;
        } finally {
          clearTimeout(slowTimer);
          clearTimeout(abortTimer);
        }
      } else {
        try {
          await createPostClient({
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
            postTags: [],
          });
          window.dispatchEvent(new CustomEvent("community:post-created"));
          // @ts-ignore
          postTitleRef?.current?.value = "";
          editor.commands.clearContent();
        } catch {
          toast({
            title: "Erro ao publicar",
            description: "Não foi possível publicar. Tente novamente.",
            variant: "destructive",
          });
          return;
        }
      }
    });
  };

  return (
    <Col
      id="post-composer"
      className={clsx("relative overflow-hidden", className)}
      {...props}
    >
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
                isLoading={disabled || isTransitioning}
                images={attachments}
                onRemoveImage={handleRemoveImage}
              />
              <Input
                ref={postTitleRef}
                disabled={disabled || isTransitioning}
                type="text"
                placeholder="Título do post"
                className="font-lora border-none px-0 !text-xl font-semibold tracking-tight text-green-500 italic placeholder:text-green-500/80 focus:!ring-0 disabled:opacity-50"
                maxLength={150}
              />

              <EditorContent
                editor={editor}
                className={clsx(
                  isTransitioning && "pointer-events-none opacity-50",
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
          disabled={isImageLimitReached || isTransitioning}
        />
      </div>
    </Col>
  );
}
