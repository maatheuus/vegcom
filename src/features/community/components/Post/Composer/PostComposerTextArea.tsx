import Col from "@/shared/ui/Layout/Helpers/Col";
import clsx from "clsx";

import { MAX_LENGTH_FOR_COMPOSER } from "@/shared/lib/globalVariables";
import type { Editor } from "@tiptap/react";
import { type HTMLAttributes, useEffect, useState } from "react";

interface Props extends HTMLAttributes<HTMLDivElement> {
  editor: Editor | null;
}

export default function PostComposerTextArea({
  className,
  editor,
  children,
  ...props
}: Props) {
  const [characterCount, setCharacterCount] = useState(
    editor?.storage.characterCount?.characters?.() || 0,
  );

  useEffect(() => {
    if (!editor) return;

    const updateCount = () => {
      setCharacterCount(editor.storage.characterCount?.characters?.() || 0);
    };

    editor.on("update", updateCount);
    editor.on("transaction", updateCount);

    return () => {
      editor.off("update", updateCount);
      editor.off("transaction", updateCount);
    };
  }, [editor]);

  const isNearLimit = characterCount >= MAX_LENGTH_FOR_COMPOSER * 0.9;
  const isAtLimit = characterCount >= MAX_LENGTH_FOR_COMPOSER;

  return (
    <Col
      className={clsx(
        "font-maitree min-h-[150px] w-full px-4 text-green-500",
        className,
      )}
      {...props}
    >
      <div className="relative size-full">
        {children}

        {editor && (
          <div
            className={clsx(
              "font-lora pointer-events-none absolute right-2 bottom-2 text-xs italic transition-colors",
              isAtLimit
                ? "font-semibold text-red-500"
                : isNearLimit
                  ? "text-orange-500"
                  : "text-green-200",
            )}
          >
            {characterCount}/{MAX_LENGTH_FOR_COMPOSER}
          </div>
        )}
      </div>
    </Col>
  );
}
