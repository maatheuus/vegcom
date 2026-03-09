"use client";

import { MAX_LENGTH_FOR_INPUT } from "@/shared/lib/globalVariables";
import Button from "@/shared/ui/Button";
import Col from "@/shared/ui/Layout/Helpers/Col";
import Row from "@/shared/ui/Layout/Helpers/Row";
import {
  TextBIcon,
  TextItalicIcon,
  TextStrikethroughIcon,
} from "@phosphor-icons/react";
import { useEffect, useRef, useState } from "react";

const FORMATTING_BUTTONS = [
  { icon: TextBIcon, label: "Negrito", action: "bold" },
  { icon: TextItalicIcon, label: "Itálico", action: "italic" },
  { icon: TextStrikethroughIcon, label: "Tachado", action: "strikethrough" },
];

export default function CommentInput() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [comment, setComment] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (isExpanded && textareaRef.current) textareaRef.current.focus();
  }, [isExpanded]);

  const handleCancel = () => {
    setIsExpanded(false);
    setComment("");
  };

  if (!isExpanded) {
    return (
      <div
        onClick={() => setIsExpanded(true)}
        className="flex w-full cursor-text items-center rounded-full border border-green-500/20 bg-transparent px-4 py-3 text-sm text-gray-400 opacity-80 shadow-sm transition-all hover:border-green-500/40 hover:bg-green-50"
      >
        <span className="font-medium">Participe da conversa</span>
      </div>
    );
  }

  const progress = comment.length / MAX_LENGTH_FOR_INPUT;
  const isNearLimit = progress > 0.8;

  return (
    <Col className="gap-y-0 overflow-hidden rounded-2xl border border-green-500/30 bg-green-50/40 ring-1 shadow-sm ring-green-100 transition-all">
      <textarea
        ref={textareaRef}
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="No que você está pensando?"
        className="font-maitree min-h-[110px] w-full resize-none bg-transparent px-4 pt-4 pb-2 text-base text-gray-800 placeholder:text-gray-400 focus:outline-none"
        maxLength={MAX_LENGTH_FOR_INPUT}
      />

      <div className="flex items-center justify-between gap-x-2 border-t border-green-500/15 bg-green-50/60 px-3 py-2">
        <Row className="items-center gap-x-1">
          {FORMATTING_BUTTONS.map(({ icon: Icon, label }) => (
            <button
              key={label}
              type="button"
              aria-label={label}
              className="flex size-7 items-center justify-center rounded-lg text-green-600 transition-colors hover:bg-green-100"
            >
              <Icon size={15} weight="bold" />
            </button>
          ))}

          <span className="mx-1 h-4 w-px bg-green-300/60" />

          <span
            className={`font-lora text-xs italic transition-colors ${
              isNearLimit ? "text-red-400" : "text-green-400"
            }`}
          >
            {comment.length}/{MAX_LENGTH_FOR_INPUT}
          </span>
        </Row>

        <Row className="items-center gap-x-2">
          <Button
            variant="text"
            size="sm"
            onClick={handleCancel}
            className="h-8 rounded-full px-4 text-sm font-semibold text-green-600 hover:bg-green-100"
          >
            Cancelar
          </Button>
          <Button
            variant="default"
            size="sm"
            disabled={!comment.trim()}
            className="h-8 rounded-full bg-green-600 px-4 text-sm font-semibold text-white transition-all hover:bg-green-700 disabled:bg-green-200 disabled:text-green-400"
          >
            Comentarrr
          </Button>
        </Row>
      </div>
    </Col>
  );
}
