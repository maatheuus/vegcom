import type { PostCardDataProps } from "@/shared/types";
import Col from "@/shared/ui/Layout/Helpers/Col";
import Text from "@/shared/ui/Text";
import { prepareHtmlContent } from "@/shared/utils";
import Image from "next/image";
import PostCardRoot from "./Root";

import ImageCarouselModal from "@/shared/ui/ImageCarouselModal";
import { useState } from "react";

interface Props {
  data: PostCardDataProps;
}

type ImageItem = { src: string; title?: string };

function ImageCell({
  img,
  idx,
  className,
  onOpen,
}: {
  img: ImageItem;
  idx: number;
  className?: string;
  onOpen: (i: number) => void;
}) {
  return (
    <div
      className={`group relative cursor-pointer overflow-hidden ${className ?? ""}`}
      onClick={(e) => {
        e.stopPropagation();
        onOpen(idx);
      }}
    >
      <Image
        src={img.src}
        alt={img.title ?? "imagem"}
        title={img.title}
        fill
        sizes="(max-width: 768px) 100vw, 50vw"
        className="object-cover transition-transform duration-300 group-hover:scale-105"
      />
    </div>
  );
}

function ImageGrid({
  images,
  onOpen,
}: {
  images: ImageItem[];
  onOpen: (i: number) => void;
}) {
  const count = images.length;

  if (count === 1) {
    return (
      <div className="mt-3 w-full overflow-hidden rounded-xl">
        <ImageCell
          img={images[0]}
          idx={0}
          className="aspect-[4/3] w-full"
          onOpen={onOpen}
        />
      </div>
    );
  }

  if (count === 2) {
    return (
      <div className="mt-3 grid grid-cols-2 gap-0.5 overflow-hidden rounded-xl">
        {images.map((img, idx) => (
          <ImageCell
            key={idx}
            img={img}
            idx={idx}
            className="aspect-square"
            onOpen={onOpen}
          />
        ))}
      </div>
    );
  }

  if (count === 3) {
    return (
      <div className="mt-3 grid h-52 grid-cols-3 grid-rows-2 gap-0.5 overflow-hidden rounded-xl sm:h-64">
        <ImageCell
          img={images[0]}
          idx={0}
          className="col-span-2 row-span-2"
          onOpen={onOpen}
        />
        <ImageCell img={images[1]} idx={1} onOpen={onOpen} />
        <ImageCell img={images[2]} idx={2} onOpen={onOpen} />
      </div>
    );
  }

  return (
    <div className="mt-3 grid grid-cols-2 gap-0.5 overflow-hidden rounded-xl">
      {images.map((img, idx) => (
        <ImageCell
          key={idx}
          img={img}
          idx={idx}
          className="aspect-square"
          onOpen={onOpen}
        />
      ))}
    </div>
  );
}

export default function PostCardImage({ data }: Props) {
  const images = data.postContent.postResources?.images ?? [];
  const [isOpen, setIsOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const content = data.postContent.postResources?.content;
  const contentHTML = data.postContent.postResources?.contentHTML;

  if (!images.length) return null;

  const openImage = (index: number) => {
    setSelectedImageIndex(index);
    setIsOpen(true);
  };

  return (
    <>
      <PostCardRoot data={data} variant="image">
        <Col className="h-fit w-full gap-y-1 text-green-500">
          <Text
            as="h2"
            type={Text.Type.BodyTwo}
            weight={Text.Weight.Medium}
            className="font-lora font-semibold break-all"
          >
            {data.postTitle}
          </Text>

          {contentHTML ? (
            <div
              className="font-maitree mt-2 text-base break-all text-green-500 [&>p]:text-justify [&>p]:hyphens-auto"
              lang="pt-BR"
              dangerouslySetInnerHTML={{
                __html: prepareHtmlContent(contentHTML),
              }}
            />
          ) : (
            <Text
              as="p"
              type={Text.Type.BodyFour}
              weight={Text.Weight.Normal}
              className="font-maitree mt-2 text-justify text-base break-all hyphens-auto whitespace-pre-wrap"
            >
              {content}
            </Text>
          )}

          <ImageGrid images={images} onOpen={openImage} />
        </Col>
      </PostCardRoot>

      <ImageCarouselModal
        isOpen={isOpen}
        onClose={setIsOpen}
        images={images}
        initialIndex={selectedImageIndex}
      />
    </>
  );
}
