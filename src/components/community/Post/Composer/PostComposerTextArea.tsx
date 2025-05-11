import Col from "@/components/ui/Layout/Helpers/Col";
import clsx from "clsx";

import { MAX_LENGTH_FOR_TEXTAREA } from "@/lib/globalVariables";
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
        "py-3 px-4 w-full h-[250px] font-frank text-green-500",
        className
      )}
      {...props}
    >
      <div className="relative size-full">
        {children}

        {editor && (
          <div className="absolute bottom-2 right-2 text-sm text-green-200 font-rancho">
            {characters}/{MAX_LENGTH_FOR_TEXTAREA}
          </div>
        )}
      </div>
    </Col>
  );
}
