"use client";

import { Dialog, DialogContent } from "@/shared/ui/Dialog";
import {
  ArrowBendUpLeftIcon,
  ArrowBendUpRightIcon,
} from "@phosphor-icons/react";
import { AnimatePresence, motion } from "framer-motion";
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
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const featuredImage = images.find((img) => img.isFeatured) || images[0];
  const otherImages = images.filter((img) => img !== featuredImage);

  const maxThumbnailsMobile = 1;
  const maxThumbnailsDesktop = 4;

  const handleNext = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrev = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const openGallery = (index: number) => {
    setCurrentImageIndex(index);
    setIsDialogOpen(true);
  };

  return (
    <div className="flex w-full flex-col gap-4">
      <div
        className="relative aspect-square h-full w-full cursor-pointer overflow-hidden rounded-lg md:aspect-[18/9]"
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

            // Mobile: show only first thumbnail with overlay if there are more
            const isMobileVisible = index < maxThumbnailsMobile;
            const showOnMobile =
              isMobileVisible && otherImages.length > maxThumbnailsMobile;
            const mobileRemainingCount =
              otherImages.length - maxThumbnailsMobile;

            // Desktop: show first 4 thumbnails, last one with overlay if there are more
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

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-4xl border-none bg-transparent p-0 shadow-none sm:rounded-none">
          <div className="relative flex h-[80vh] w-full flex-col items-center justify-center">
            <div className="relative h-full w-full overflow-hidden rounded-lg">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentImageIndex}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="relative h-full w-full"
                >
                  <Image
                    src={images[currentImageIndex].src}
                    alt={images[currentImageIndex].alt}
                    fill
                    className="object-contain"
                    priority
                  />
                </motion.div>
              </AnimatePresence>
            </div>

            <button
              onClick={(e) => {
                e.stopPropagation();
                handlePrev();
              }}
              className="absolute top-1/2 left-2 -translate-y-1/2 cursor-pointer rounded-full bg-green-500/20 p-2 text-green-50 backdrop-blur-sm transition-colors hover:bg-green-500/40"
            >
              <ArrowBendUpLeftIcon size={24} />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                handleNext();
              }}
              className="absolute top-1/2 right-2 -translate-y-1/2 cursor-pointer rounded-full bg-green-500/20 p-2 text-green-50 backdrop-blur-sm transition-colors hover:bg-green-500/40"
            >
              <ArrowBendUpRightIcon size={24} />
            </button>

            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-green-500/80 px-4 py-1 text-green-50 backdrop-blur-sm">
              <span className="font-lora text-sm italic">
                {currentImageIndex + 1} / {images.length}
              </span>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
