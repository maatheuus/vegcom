import { mergeAttributes, Node } from "@tiptap/core";
import {
  ReactNodeViewRenderer,
  type NodeViewContentProps,
} from "@tiptap/react";
import type React from "react";
import ImageComponent from "./ImageComponent";

export interface CustomImageOptions {
  HTMLAttributes: Record<string, string>;
}

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    customImage: {
      /**
       * Add a custom image
       */
      setCustomImage: (options: {
        src: string;
        alt?: string;
        title?: string;
      }) => ReturnType;
      /**
       * Remove a custom image
       */
      removeCustomImage: () => ReturnType;
      /**
       * Remove a custom image by src
       */
      removeCustomImageBySrc: (src: string) => ReturnType;
    };
  }
}

export const CustomImage = Node.create<CustomImageOptions>({
  name: "customImage",
  group: "block",
  selectable: true,
  draggable: true,
  atom: true,

  addAttributes() {
    return {
      src: {
        default: null,
      },
      alt: {
        default: null,
      },
      title: {
        default: null,
      },
      id: {
        default: () => `img-${Math.random().toString(36).substring(2, 11)}`,
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: "div[data-custom-image]",
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      "div",
      mergeAttributes(HTMLAttributes, { "data-custom-image": "" }),
    ];
  },

  addNodeView() {
    return ReactNodeViewRenderer(
      ImageComponent as React.FC<NodeViewContentProps>,
    );
  },

  addCommands() {
    return {
      setCustomImage:
        (options) =>
        ({ commands, tr: _tr }) => {
          // Insert the image custom node
          const imageInsertion = commands.insertContent([
            {
              type: this.name,
              attrs: {
                ...options,
                id: `img-${Math.random().toString(36).substring(2, 11)}`,
              },
            },
            { type: "paragraph" }, // Ensure a paragraph follows
          ]);

          return imageInsertion;
        },
      removeCustomImage:
        () =>
        ({ commands }) => {
          return commands.deleteSelection();
        },
      removeCustomImageBySrc:
        (src) =>
        ({ tr, dispatch }) => {
          if (!dispatch) return false;

          let hasRemoved = false;

          tr.doc.descendants((node, pos) => {
            if (node.type.name === "customImage" && node.attrs.src === src) {
              tr.delete(pos, pos + node.nodeSize);
              hasRemoved = true;
            }
          });

          return hasRemoved;
        },
    };
  },
});
