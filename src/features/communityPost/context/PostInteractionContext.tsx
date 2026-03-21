"use client";

import { createContext, useContext } from "react";

export interface CommentInputHandle {
  focus: () => void;
  insertMention: (username: string) => void;
}

interface PostInteractionContextType {
  isCommentOpen: boolean;
  setIsCommentOpen: (value: boolean) => void;
  commentInputRef: React.RefObject<CommentInputHandle | null>;
  handleReplyTo: (username: string) => void;
}

export const PostInteractionContext = createContext<
  PostInteractionContextType | undefined
>(undefined);

export function usePostInteraction() {
  const context = useContext(PostInteractionContext);
  if (!context) {
    throw new Error(
      "usePostInteraction must be used within a PostInteractionProvider",
    );
  }
  return context;
}
