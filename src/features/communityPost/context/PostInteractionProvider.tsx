"use client";

import { useRef, useState, type ReactNode } from "react";
import {
  PostInteractionContext,
  type CommentInputHandle,
} from "./PostInteractionContext";

interface Props {
  children: ReactNode;
  defaultOpen?: boolean;
}

export function PostInteractionProvider({
  children,
  defaultOpen = false,
}: Props) {
  const [isCommentOpen, setIsCommentOpen] = useState(defaultOpen);
  const commentInputRef = useRef<CommentInputHandle>(null);

  const handleReplyTo = (username: string) => {
    setIsCommentOpen(true);
    setTimeout(() => {
      commentInputRef.current?.focus();
      commentInputRef.current?.insertMention(username);
    }, 50);
  };

  return (
    <PostInteractionContext.Provider
      value={{
        isCommentOpen,
        setIsCommentOpen,
        commentInputRef,
        handleReplyTo,
      }}
    >
      {children}
    </PostInteractionContext.Provider>
  );
}
