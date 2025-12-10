import type { PostCardDataProps } from "@/shared/types";
import Col from "@/shared/ui/Layout/Helpers/Col";
import Text from "@/shared/ui/Text";
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
            className="font-lora font-semibold italic"
          >
            {data.postTitle}
          </Text>

          <Text
            as="p"
            type={Text.Type.BodyFour}
            weight={Text.Weight.Normal}
            className="font-maitree line-clamp-4 text-base md:line-clamp-6"
          >
            {data.postContent.postResources?.content}
          </Text>

          <div className="mt-4 flex w-full gap-3 md:gap-4">
            {images.map((img, idx) => (
              <div
                key={idx}
                onClick={() => openImage(idx)}
                className="size-full max-h-[5rem] max-w-[5rem] cursor-pointer overflow-hidden rounded-sm md:max-h-[12rem] md:max-w-[12rem]"
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
