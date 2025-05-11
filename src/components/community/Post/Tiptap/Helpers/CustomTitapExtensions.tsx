import { Editor } from "@tiptap/react";
import { useEffect, useRef, useState } from "react";
import ImageContainer from "./ImageContainer";

interface CustomImageTiptapExtensionProps {
  editor: Editor | null;
}

export const CustomImageTiptapExtension = ({
  editor,
}: CustomImageTiptapExtensionProps) => {
  const [images, setImages] = useState<
    Array<{ src: string; alt?: string; title?: string }>
  >([]);
  const imageMapRef = useRef(
    new Map<string, { src: string; alt?: string; title?: string }>()
  );

  useEffect(() => {
    if (!editor) return;

    const updateImagesList = () => {
      const content = editor.getJSON();
      const currentImageMap = imageMapRef.current;
      let hasChanges = false;

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const findImageNodes = (nodes: any[]) => {
        if (!nodes) return;

        nodes.forEach((node) => {
          if (node.type === "customImage" && node.attrs?.src) {
            const imageKey = node.attrs.src;

            if (!currentImageMap.has(imageKey)) {
              currentImageMap.set(imageKey, {
                src: node.attrs.src,
                alt: node.attrs.alt,
                title: node.attrs.title,
              });
              hasChanges = true;
            }
          }

          if (node.content) {
            findImageNodes(node.content);
          }
        });
      };

      if (content.content) {
        findImageNodes(content.content);
      }

      const foundImages = Array.from(currentImageMap.values());

      if (hasChanges || foundImages.length !== images.length) {
        setImages(foundImages);
      }
    };

    const handleUpdate = () => {
      updateImagesList();
    };

    editor.on("update", handleUpdate);
    updateImagesList();

    return () => {
      editor.off("update", handleUpdate);
    };
  }, [editor, images.length]);

  const handleRemoveImage = (src: string) => {
    imageMapRef.current.delete(src);
    setImages(Array.from(imageMapRef.current.values()));
  };

  return (
    editor &&
    images.length > 0 && (
      <ImageContainer
        editor={editor}
        images={images}
        onRemoveImage={handleRemoveImage}
      />
    )
  );
};
