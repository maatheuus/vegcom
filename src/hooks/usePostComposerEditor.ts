import { CustomImage } from "@/components/community/Post/Tiptap/Helpers/customTiptap";
import Placeholder from "@tiptap/extension-placeholder";
import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

export function usePostComposerEditor() {
  return useEditor({
    extensions: [
      StarterKit,
      CustomImage,
      Placeholder.configure({
        placeholder: "O que você quer compartilhar?",
      }),
    ],
    content: "",
    immediatelyRender: false,
    editorProps: {
      attributes() {
        return {
          class:
            "relative focus:outline-none min-h-[64px] [&[data-placeholder]]:before:text-muted-foreground [&[data-placeholder]]:before:content-[attr(data-placeholder)] [&[data-placeholder]]:before:pointer-events-none [&[data-placeholder]]:before:absolute [&[data-placeholder]]:before:text-sm",
        };
      },
      handleDrop(view, event) {
        const files = event.dataTransfer?.files;
        event.preventDefault();

        if (files?.length) {
          Array.from(files).forEach((file) => {
            if (file.type.startsWith("image/")) {
              const reader = new FileReader();
              reader.onload = () => {
                const src = reader.result as string;
                view.dispatch(
                  view.state.tr.insert(
                    view.state.selection.from,
                    view.state.schema.nodes.customImage.create({
                      src,
                      id: `img-${Math.random().toString(36).substring(2, 11)}`,
                      alt: file.name,
                      title: file.name,
                      loading: "lazy",
                    })
                  )
                );
              };
              reader.readAsDataURL(file);
            }
          });
          return true;
        }
        return false;
      },
    },
  });
}
