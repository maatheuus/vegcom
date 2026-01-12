"use client";

import ImageCarouselModal from "@/shared/ui/ImageCarouselModal";
import Image, { StaticImageData } from "next/image";
import { useState } from "react";

export interface RecipeImage {
  src: string | StaticImageData;
  alt: string;
  isFeatured?: boolean;
}

interface RecipeGalleryProps {
  images: RecipeImage[];
}

export default function RecipeGallery({ images }: RecipeGalleryProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);

  const featuredImage = images.find((img) => img.isFeatured) || images[0];
  const otherImages = images.filter((img) => img !== featuredImage);

  const maxThumbnailsMobile = 1;
  const maxThumbnailsDesktop = 4;

  const openGallery = (index: number) => {
    setSelectedImageIndex(index);
    setIsGalleryOpen(true);
  };

  return (
    <>
      <div className="flex w-full flex-col gap-4">
        <div
          className="relative aspect-square min-h-[340px] w-full cursor-pointer overflow-hidden rounded-lg md:aspect-[18/9] md:min-h-auto"
          onClick={() => openGallery(images.indexOf(featuredImage))}
        >
          <Image
            src={featuredImage.src}
            alt={featuredImage.alt}
            fill
            className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
          />
        </div>

        {otherImages.length > 0 && (
          <div className="grid h-full max-h-52 grid-cols-1 gap-4 md:max-h-full md:grid-cols-4">
            {otherImages.map((img, index) => {
              const originalIndex = images.indexOf(img);

              const isMobileVisible = index < maxThumbnailsMobile;
              const showOnMobile =
                isMobileVisible && otherImages.length > maxThumbnailsMobile;
              const mobileRemainingCount =
                otherImages.length - maxThumbnailsMobile;

              const isLastDesktopThumbnail = index === maxThumbnailsDesktop - 1;
              const showOnDesktop =
                isLastDesktopThumbnail &&
                otherImages.length > maxThumbnailsDesktop;
              const desktopRemainingCount =
                otherImages.length - maxThumbnailsDesktop;

              if (index >= maxThumbnailsDesktop) {
                return null;
              }

              return (
                <div
                  key={index}
                  className={`relative aspect-square max-h-52 w-full cursor-pointer overflow-hidden rounded-lg md:max-h-full ${
                    index >= maxThumbnailsMobile ? "hidden md:block" : ""
                  }`}
                  onClick={() => openGallery(originalIndex)}
                >
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                  />

                  {isMobileVisible && showOnMobile && (
                    <div className="absolute inset-0 flex items-center justify-center bg-green-500/50 transition-colors hover:bg-green-500/60 md:hidden">
                      <span className="font-lora text-xl font-medium text-green-50">
                        +{mobileRemainingCount}
                      </span>
                    </div>
                  )}

                  {showOnDesktop && (
                    <div className="absolute inset-0 hidden items-center justify-center bg-green-500/50 transition-colors hover:bg-green-500/60 md:flex">
                      <span className="font-lora text-xl font-medium text-green-50">
                        +{desktopRemainingCount}
                      </span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      <ImageCarouselModal
        isOpen={isGalleryOpen}
        onClose={setIsGalleryOpen}
        images={images}
        initialIndex={selectedImageIndex}
        showCounter
      />
    </>
  );
}
