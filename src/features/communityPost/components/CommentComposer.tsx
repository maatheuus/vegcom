"use client";

import type { User } from "@/features/auth/api/types";
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
import Mention from "@tiptap/extension-mention";
import Placeholder from "@tiptap/extension-placeholder";
import { EditorContent, ReactRenderer, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import type { SuggestionKeyDownProps } from "@tiptap/suggestion";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import { useImperativeHandle, useState } from "react";
import tippy, { type GetReferenceClientRect, type Instance } from "tippy.js";
import "tippy.js/dist/tippy.css";
import MentionList from "./MentionList";

interface CommentComposerProps {
  users?: { name: string }[];
  user?: User;
}

export default function CommentComposer({
  users = [],
  user,
}: CommentComposerProps) {
  const { isCommentOpen, setIsCommentOpen, commentInputRef } =
    usePostInteraction();
  const router = useRouter();
  const [comment, setComment] = useState("");

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
          <div className="font-lora text-xs text-green-500 italic">
            {comment.length}/{MAX_LENGTH_FOR_INPUT}
          </div>
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
