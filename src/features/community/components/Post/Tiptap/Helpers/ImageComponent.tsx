import { Node } from "@tiptap/core";
import { NodeViewWrapper } from "@tiptap/react";
import Image from "next/image";

interface ImageComponentProps {
  node: {
    attrs: {
      src: string;
      alt?: string;
      title?: string;
      id: string;
    };
  };
  deleteNode: () => void;
  extension: Node;
}

const ImageComponent = ({ node }: ImageComponentProps) => {
  const { src, alt, title, id } = node.attrs;

  return (
    <NodeViewWrapper>
      <span
        data-custom-image={id}
        contentEditable={false}
        className="absolute hidden"
      >
        <Image
          width={0}
          height={0}
          src={src}
          alt={alt || "Image"}
          title={title}
        />
      </span>
    </NodeViewWrapper>
  );
};

export default ImageComponent;
