"use client";

import { MAX_LENGTH_FOR_INPUT } from "@/shared/lib/globalVariables";
import Button from "@/shared/ui/Button";
import Col from "@/shared/ui/Layout/Helpers/Col";
import Row from "@/shared/ui/Layout/Helpers/Row";
import { useEffect, useRef, useState } from "react";

export default function CommentInput() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [comment, setComment] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (isExpanded && textareaRef.current) {
      textareaRef.current.focus();
    }
  }, [isExpanded]);

  const handleCancel = () => {
    setIsExpanded(false);
    setComment("");
  };

  if (!isExpanded) {
    return (
      <div
        onClick={() => setIsExpanded(true)}
        className="flex w-full cursor-text items-center justify-between rounded-full border border-green-500/20 bg-transparent px-4 py-3 text-sm text-gray-400 opacity-80 shadow-sm transition-all hover:border-green-500/40 hover:bg-green-50"
      >
        <span className="font-medium">Participe da conversa</span>
      </div>
    );
  }

  return (
    <Col className="gap-y-2 rounded-2xl border border-green-500/20 bg-transparent p-4 ring-1 shadow-sm ring-green-50 transition-all">
      <textarea
        ref={textareaRef}
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="No que você está pensando?"
        className="font-maitree min-h-[120px] w-full resize-none border-none bg-transparent px-0 py-0 text-base text-gray-800 placeholder:text-gray-400 focus:outline-none"
        maxLength={MAX_LENGTH_FOR_INPUT}
      />
      <Row className="mt-2 justify-between border-t border-green-500/20 pt-2">
        <div className="font-lora text-xs text-green-500 italic">
          {comment.length}/{MAX_LENGTH_FOR_INPUT}
        </div>
        <Row className="gap-x-2">
          <Button
            variant="text"
            size="sm"
            onClick={handleCancel}
            className="h-9 rounded-full px-5 text-sm font-bold text-green-500 hover:bg-green-50"
          >
            Cancelar
          </Button>
          <Button
            variant="default"
            size="sm"
            disabled={!comment.trim()}
            className="h-9 rounded-full bg-green-600 px-5 text-sm font-bold text-white transition-all hover:bg-green-700 disabled:bg-green-500/40 disabled:text-green-500"
          >
            Comentar
          </Button>
        </Row>
      </Row>
    </Col>
  );
}
