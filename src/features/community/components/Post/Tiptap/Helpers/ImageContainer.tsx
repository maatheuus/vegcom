import Button from "@/shared/ui/Button";
import Row from "@/shared/ui/Layout/Helpers/Row";
import { XIcon } from "@phosphor-icons/react/ssr";
import { Editor } from "@tiptap/react";
import Image from "next/image";
import { useCallback } from "react";

interface ImageContainerProps {
  editor: Editor;
  images: Array<{ src: string; alt?: string; title?: string }>;
  onRemoveImage?: (src: string) => void;
}

const ImageContainer = ({
  editor,
  images,
  onRemoveImage,
}: ImageContainerProps) => {
  const removeImage = useCallback(
    (src: string) => {
      const transaction = editor.state.tr;
      let hasRemoved = false;

      editor.state.doc.descendants((node, pos) => {
        if (node.type.name === "customImage" && node.attrs.src === src) {
          transaction.delete(pos, pos + node.nodeSize);
          hasRemoved = true;
        }
      });

      if (hasRemoved) {
        editor.view.dispatch(transaction);

        if (onRemoveImage) {
          onRemoveImage(src);
        }
      }
    },
    [editor, onRemoveImage],
  );

  if (images.length === 0) return null;

  return (
    <div className="mt-3 rounded-md p-3">
      <Row className="flex-wrap justify-end gap-2">
        {images.map((image, index) => (
          <div key={`${image.src}-${index}`} className="group relative">
            <Image
              width={200}
              height={150}
              loading="lazy"
              src={image.src}
              alt={image.alt || "uploaded image"}
              className="max-h-40 max-w-[200px] rounded-lg object-cover"
            />

            <Button
              variant="text"
              size="none"
              type="button"
              onClick={() => removeImage(image.src)}
              className="absolute -top-2 -right-2 flex cursor-pointer items-center justify-center rounded-full bg-red-500 p-1 text-white opacity-0 transition-all group-hover:opacity-100 hover:bg-red-600"
              title="Remover imagem"
            >
              <XIcon size={16} />
            </Button>
          </div>
        ))}
      </Row>
    </div>
  );
};

export default ImageContainer;
