import { MAX_LENGTH_FOR_COMPOSER } from "@/shared/lib/globalVariables";
import CharacterCount from "@tiptap/extension-character-count";
import Placeholder from "@tiptap/extension-placeholder";
import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

/**
 * Custom hook to initialize and configure the Tiptap editor for post composition.
 *
 * Configures the editor with:
 * - StarterKit (basic formatting)
 * - Heading levels 1-3
 * - Placeholder text "Escreva algo..."
 * - Character count limit based on `MAX_LENGTH_FOR_COMPOSER`
 * - Tailwind CSS classes for styling
 *
 * @returns {Object} An object containing the editor instance.
 * @returns {Editor | null} return.editor - The Tiptap editor instance.
 */
export function usePostComposerEditor() {
  const editor = useEditor({
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
