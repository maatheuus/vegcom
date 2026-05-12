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
import type { JSONContent } from "@tiptap/react";
import {
  EditorContent,
  ReactRenderer,
  useEditor,
  type Editor,
} from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import type { SuggestionKeyDownProps } from "@tiptap/suggestion";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import { useImperativeHandle, useState, useTransition } from "react";
import tippy, { type GetReferenceClientRect, type Instance } from "tippy.js";
import MentionList from "./Comments/MentionList";

function extractMentionIds(editor: Editor | null): number[] {
  if (!editor) return [];
  const ids: number[] = [];
  const walk = (node: JSONContent) => {
    if (node.type === "mention" && typeof node.attrs?.id === "number") {
      ids.push(node.attrs.id);
    }
    node.content?.forEach(walk);
  };
  editor.getJSON().content?.forEach(walk);
  return [...new Set(ids)];
}

interface CommentComposerProps {
  users?: { id: number; name: string }[];
  user?: User;
  postId: string;
}

const FORMATTING_BUTTONS = [
  {
    icon: TextBIcon,
    label: "Negrito",
    isActive: (editor: Editor | null) => editor?.isActive("bold"),
    action: (editor: Editor | null) =>
      editor?.chain().focus().toggleBold().run(),
    iconProps: { weight: "bold" as const },
  },
  {
    icon: TextItalicIcon,
    label: "Itálico",
    isActive: (editor: Editor | null) => editor?.isActive("italic"),
    action: (editor: Editor | null) =>
      editor?.chain().focus().toggleItalic().run(),
  },
  {
    icon: TextStrikethroughIcon,
    label: "Tachado",
    isActive: (editor: Editor | null) => editor?.isActive("strike"),
    action: (editor: Editor | null) =>
      editor?.chain().focus().toggleStrike().run(),
  },
];

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
  const [isMarkdownOpen, setIsMarkdownOpen] = useState(true);

  const isNearLimit = comment.length > MAX_LENGTH_FOR_INPUT * 0.8;

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
            "font-bold text-green-500 bg-green-50 px-1 py-0.5 rounded-sm decoration-clone",
        },
        suggestion: {
          items: ({ query }) =>
            users
              .filter((u) =>
                u.name.toLowerCase().startsWith(query.toLowerCase()),
              )
              .slice(0, 5)
              .map((u) => ({ id: u.id, label: u.name })),
          render: () => {
            let component: ReactRenderer;
            let popup: Instance[];
            return {
              onStart: (props) => {
                component = new ReactRenderer(MentionList, {
                  props,
                  editor: props.editor,
                });
                if (!props.clientRect) return;
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
                if (!props.clientRect) return;
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
          "prose prose-sm focus:outline-none min-h-[110px] max-w-none text-green-500 font-maitree px-4 pt-4 pb-2",
      },
    },
    onUpdate: ({ editor }) => {
      setComment(editor.getText());
    },
  });

  useImperativeHandle(commentInputRef, () => ({
    focus: () => editor?.commands.focus(),
    insertMention: (username: string) => {
      const user = users.find((u) => u.name === username);
      editor
        ?.chain()
        .focus()
        .insertContent([
          { type: "mention", attrs: { id: user?.id ?? null, label: username } },
          { type: "text", text: " " },
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
        const mentionedUserIds = extractMentionIds(editor);
        await createComment(postId, {
          commentContent: comment,
          mentionedUserIds,
        });
        setIsCommentOpen(false);
        editor?.commands.clearContent();
        setComment("");
        queryClient.invalidateQueries({ queryKey: ["community-posts"] });
        router.refresh();
      } catch (error) {
        const err = error as { message?: string; status?: number };
        if (
          err?.message === "Usuário não está autenticado" ||
          err?.status === 401
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
        className="flex w-full cursor-text items-center rounded-full border border-green-500/20 bg-transparent px-4 py-3 text-sm text-gray-400 opacity-80 shadow-sm transition-all hover:border-green-500/40 hover:bg-green-50"
      >
        <span className="font-medium">Participe da conversa</span>
      </div>
    );
  }

  return (
    <Col className="gap-y-0 overflow-hidden rounded-2xl border border-green-500/20 bg-green-50/30 ring-1 shadow-sm ring-green-100 transition-all">
      <div
        className={clsx(
          "flex items-center gap-x-0.5 overflow-hidden border-b border-green-500/15 bg-green-50/70 px-3 transition-all duration-300",
          isMarkdownOpen
            ? "max-h-12 py-2 opacity-100"
            : "max-h-0 py-0 opacity-0",
        )}
      >
        {FORMATTING_BUTTONS.map(
          ({ icon: Icon, label, isActive, action, iconProps }) => (
            <Button.Icon
              key={label}
              variant="text"
              size="md"
              aria-label={label}
              className={clsx(
                "h-7 w-7 p-0 text-gray-400 transition-colors hover:bg-green-100 hover:text-green-500",
                isActive(editor) && "bg-green-100 text-green-500",
              )}
              onClick={() => action(editor)}
              icon={<Icon size={16} {...(iconProps ?? {})} />}
            />
          ),
        )}

        <span
          className={clsx(
            "font-lora ml-auto text-[10px] tracking-wider uppercase italic transition-colors duration-300",
            isNearLimit
              ? "font-bold text-red-400 opacity-100"
              : "text-green-500 opacity-60",
          )}
        >
          {comment.length}/{MAX_LENGTH_FOR_INPUT}
        </span>
      </div>

      <EditorContent editor={editor} className="w-full" />

      <div className="flex items-center justify-between gap-x-2 border-t border-green-500/15 bg-green-50/70 px-3 py-2">
        <div
          className={clsx(
            "flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-green-100 text-xs font-bold text-green-500 transition-colors duration-200 hover:cursor-pointer hover:bg-green-100 hover:text-green-500 active:bg-green-100 active:text-green-500",
            isMarkdownOpen ? "bg-green-100" : "bg-transparent",
          )}
          onClick={() => setIsMarkdownOpen(!isMarkdownOpen)}
        >
          Aa
        </div>

        <Row className="items-center gap-x-2">
          <Button
            variant="text"
            size="sm"
            onClick={handleCancel}
            className="h-8 rounded-full px-4 text-sm font-semibold text-green-600 transition-all hover:bg-green-100 active:scale-95"
          >
            Cancelar
          </Button>

          <Button
            variant="default"
            size="sm"
            disabled={!comment.trim() || isPending}
            onClick={handleComment}
            className={clsx(
              "h-8 min-w-[100px] rounded-full px-5 text-sm font-bold text-white transition-all duration-300 active:scale-95",
              "bg-green-200 hover:bg-green-500",
              "disabled:cursor-not-allowed disabled:opacity-50",
            )}
          >
            {isPending ? (
              <Row className="items-center justify-center gap-x-2">
                <div className="h-3 w-3 animate-spin rounded-full border-2 border-white/20 border-t-white" />
                <span className="animate-pulse">Postando...</span>
              </Row>
            ) : (
              "Comentar"
            )}
          </Button>
        </Row>
      </div>
    </Col>
  );
}
