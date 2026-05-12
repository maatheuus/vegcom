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
            className="font-lora break-words font-semibold"
          >
            {data.postTitle}
          </Text>

          {contentHTML ? (
            <div
              className="font-maitree mt-2 text-base break-words text-green-500 [&>p]:text-justify [&>p]:hyphens-auto"
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
              className="font-maitree mt-2 text-justify text-base hyphens-auto whitespace-pre-wrap"
            >
              {content}
            </Text>
          )}

          <div className="mt-4 flex w-full gap-3 md:gap-4">
            {images.map((img, idx) => (
              <div
                key={idx}
                onClick={(e) => {
                  e.stopPropagation();
                  openImage(idx);
                }}
                className="h-auto max-h-[8rem] w-full max-w-[8rem] cursor-pointer overflow-hidden rounded-sm md:max-h-[12rem] md:max-w-[12rem]"
              >
                <Image
                  src={img.src}
                  alt={img.title ?? "imagem"}
                  title={img.title}
                  width={200}
                  height={200}
                  className="h-full w-full object-cover"
                />
              </div>
            ))}
          </div>
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
