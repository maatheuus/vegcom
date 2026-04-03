import { MAX_LENGTH_FOR_COMPOSER } from "@/shared/lib/globalVariables";
import CharacterCount from "@tiptap/extension-character-count";
import Placeholder from "@tiptap/extension-placeholder";
import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

export function usePostComposerEditor() {
  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3],
        },
      }),
      Placeholder.configure({
        placeholder: "Escreva algo...",
      }),
      CharacterCount.configure({
        limit: MAX_LENGTH_FOR_COMPOSER,
      }),
    ],
    editorProps: {
      attributes: {
        class:
          "prose prose-sm sm:prose lg:prose-lg xl:prose-xl focus:outline-none max-w-none",
      },
    },
    content: "",
  });

  return {
    editor,
  };
}
