import Col from "@/shared/ui/Layout/Helpers/Col";
import clsx from "clsx";

import { MAX_LENGTH_FOR_TEXTAREA } from "@/shared/lib/globalVariables";
import type { Editor } from "@tiptap/react";
import { type HTMLAttributes } from "react";

interface Props extends HTMLAttributes<HTMLDivElement> {
  editor: Editor | null;
}

export default function PostComposerTextArea({
  className,
  editor,
  children,
  ...props
}: Props) {
  const characters = editor?.getText().length || 0;

  return (
    <Col
      className={clsx(
        "font-maitree h-[250px] w-full px-4 text-green-500",
        className,
      )}
      {...props}
    >
      <div className="relative size-full">
        {children}

        {editor && (
          <div className="font-lora absolute right-2 bottom-2 text-xs text-green-200 italic">
            {characters}/{MAX_LENGTH_FOR_TEXTAREA}
          </div>
        )}
      </div>
    </Col>
  );
}
