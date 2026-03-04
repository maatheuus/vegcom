"use client";

import type { User } from "@/features/auth/api/types";
import { createComment } from "@/features/community/api/communityApi";
import { usePostInteraction } from "@/features/communityPost/context/PostInteractionContext";
import { MAX_LENGTH_FOR_INPUT } from "@/shared/lib/globalVariables";
import Button from "@/shared/ui/Button";
import Col from "@/shared/ui/Layout/Helpers/Col";
import Row from "@/shared/ui/Layout/Helpers/Row";
import {
  TextBIcon,
  TextItalicIcon,
  TextStrikethroughIcon,
} from "@phosphor-icons/react";
import { useQueryClient } from "@tanstack/react-query";
import Mention from "@tiptap/extension-mention";
import Placeholder from "@tiptap/extension-placeholder";
import { EditorContent, ReactRenderer, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import type { SuggestionKeyDownProps } from "@tiptap/suggestion";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import { useImperativeHandle, useState, useTransition } from "react";
import tippy, { type GetReferenceClientRect, type Instance } from "tippy.js";
import "tippy.js/dist/tippy.css";
import MentionList from "./MentionList";

interface CommentComposerProps {
  users?: { name: string }[];
  user?: User;
  postId: string;
}

export default function CommentComposer({
  users = [],
  user,
  postId,
}: CommentComposerProps) {
  const { isCommentOpen, setIsCommentOpen, commentInputRef } =
    usePostInteraction();
  const router = useRouter();
  const queryClient = useQueryClient();
  const [comment, setComment] = useState("");
  const [isPending, startTransition] = useTransition();

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: false,
        bulletList: false,
        orderedList: false,
        listItem: false,
        codeBlock: false,
        horizontalRule: false,
      }),
      Placeholder.configure({
        placeholder: "No que você está pensando? (Digite @ para mencionar)",
      }),
      Mention.configure({
        HTMLAttributes: {
          class:
            "font-semibold text-green-600 bg-green-50 px-1 py-0.5 rounded-sm decoration-clone",
        },
        suggestion: {
          items: ({ query }) => {
            return users
              .map((u) => u.name)
              .filter((item) =>
                item.toLowerCase().startsWith(query.toLowerCase()),
              )
              .slice(0, 5);
          },
          render: () => {
            let component: ReactRenderer;
            let popup: Instance[];

            return {
              onStart: (props) => {
                component = new ReactRenderer(MentionList, {
                  props,
                  editor: props.editor,
                });

                if (!props.clientRect) {
                  return;
                }

                popup = tippy("body", {
                  getReferenceClientRect:
                    props.clientRect as unknown as GetReferenceClientRect,
                  appendTo: () => document.body,
                  content: component.element,
                  showOnCreate: true,
                  interactive: true,
                  trigger: "manual",
                  placement: "bottom-start",
                });
              },
              onUpdate(props) {
                component.updateProps(props);

                if (!props.clientRect) {
                  return;
                }

                popup[0].setProps({
                  getReferenceClientRect:
                    props.clientRect as unknown as GetReferenceClientRect,
                });
              },
              onKeyDown(props) {
                if (props.event.key === "Escape") {
                  popup[0].hide();
                  return true;
                }

                return (
                  component.ref as {
                    onKeyDown: (props: SuggestionKeyDownProps) => boolean;
                  }
                )?.onKeyDown(props);
              },
              onExit() {
                popup[0].destroy();
                component.destroy();
              },
            };
          },
        },
      }),
    ],
    editorProps: {
      attributes: {
        class:
          "prose prose-sm focus:outline-none min-h-[120px] max-w-none text-gray-800 font-maitree px-0 py-0",
      },
    },
    onUpdate: ({ editor }) => {
      setComment(editor.getText());
    },
  });

  useImperativeHandle(commentInputRef, () => ({
    focus: () => {
      editor?.commands.focus();
    },
    insertMention: (username: string) => {
      editor
        ?.chain()
        .focus()
        .insertContent([
          {
            type: "mention",
            attrs: { id: username },
          },
          {
            type: "text",
            text: " ",
          },
        ])
        .run();
    },
  }));

  const handleCancel = () => {
    setIsCommentOpen(false);
    editor?.commands.clearContent();
    setComment("");
  };

  const handleComment = async () => {
    if (!comment.trim() || isPending) return;

    startTransition(async () => {
      try {
        await createComment(postId, { commentContent: comment });
        setIsCommentOpen(false);
        editor?.commands.clearContent();
        setComment("");

        queryClient.invalidateQueries({ queryKey: ["community-posts"] });

        router.refresh();
      } catch (error: any) {
        if (
          error?.message === "Usuário não está autenticado" ||
          error?.status === 401
        ) {
          router.push("/login");
        } else {
          console.error("Failed to post comment", error);
        }
      }
    });
  };

  if (!isCommentOpen) {
    return (
      <div
        onClick={() => {
          if (!user) {
            router.push("/login");
            return;
          }
          setIsCommentOpen(true);
        }}
        className="flex w-full cursor-text items-center justify-between rounded-full border border-green-500/20 bg-transparent px-4 py-3 text-sm text-gray-400 opacity-80 shadow-sm transition-all hover:border-green-500/40 hover:bg-green-50"
      >
        <span className="font-medium">Participe da conversa</span>
      </div>
    );
  }

  return (
    <Col className="gap-y-2 rounded-2xl border border-green-500/20 bg-transparent p-4 ring-1 shadow-sm ring-green-50 transition-all">
      <EditorContent editor={editor} className="w-full" />

      <Row className="mt-2 justify-between border-t border-green-500/20 pt-2">
        {/* Formatting Toolbar */}
        <Row className="gap-x-1">
          <Button.Icon
            variant="text"
            size="md"
            className={clsx(
              "font-maitree h-8 w-8 p-0 text-gray-500 hover:bg-green-50 hover:text-green-500",
              editor?.isActive("bold") && "bg-green-100 text-green-500",
            )}
            onClick={() => editor?.chain().focus().toggleBold().run()}
            icon={<TextBIcon size={20} weight="bold" />}
          />
          <Button.Icon
            variant="text"
            size="md"
            className={clsx(
              "font-maitree h-8 w-8 p-0 text-gray-500 hover:bg-green-50 hover:text-green-500",
              editor?.isActive("italic") && "bg-green-100 text-green-500",
            )}
            onClick={() => editor?.chain().focus().toggleItalic().run()}
            icon={<TextItalicIcon size={20} />}
          />
          <Button.Icon
            variant="text"
            size="md"
            className={clsx(
              "font-maitree h-8 w-8 p-0 text-gray-500 hover:bg-green-50 hover:text-green-500",
              editor?.isActive("strike") && "bg-green-100 text-green-500",
            )}
            onClick={() => editor?.chain().focus().toggleStrike().run()}
            icon={<TextStrikethroughIcon size={20} />}
          />
        </Row>

        <Row className="items-center gap-x-3">
          <div
            className={clsx(
              "font-lora text-[10px] tracking-wider uppercase italic opacity-60 transition-colors duration-300",
              comment.length > MAX_LENGTH_FOR_INPUT * 0.9
                ? "font-bold text-red-500 opacity-100"
                : "text-green-600",
            )}
          >
            {comment.length} / {MAX_LENGTH_FOR_INPUT}
          </div>
          <Button
            variant="text"
            size="sm"
            onClick={handleCancel}
            className="h-10 rounded-full px-6 text-sm font-semibold text-green-500 transition-all hover:bg-green-100 hover:text-green-500 active:scale-95"
          >
            Cancelar
          </Button>
          <Button
            variant="default"
            size="sm"
            disabled={!comment.trim() || isPending}
            onClick={handleComment}
            className={clsx(
              "h-10 min-w-[120px] rounded-full px-8 text-sm font-bold text-white transition-all duration-300 active:scale-95",
              "bg-green-200 hover:bg-green-500",
              "disabled:translate-y-0 disabled:cursor-not-allowed disabled:opacity-50",
            )}
          >
            {isPending ? (
              <div className="flex items-center justify-center gap-2">
                <div className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-white/20 border-t-white" />
                <span className="animate-pulse">Postando...</span>
              </div>
            ) : (
              "Comentar"
            )}
          </Button>
        </Row>
      </Row>
    </Col>
  );
}
