"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/shared/ui/Dialog";
import {
  ArrowBendUpLeftIcon,
  ArrowBendUpRightIcon,
} from "@phosphor-icons/react";
import { AnimatePresence, motion } from "framer-motion";
import Image, { StaticImageData } from "next/image";
import { useEffect, useState } from "react";

export interface CarouselImage {
  src: string | StaticImageData;
  alt: string;
}

interface ImageCarouselModalProps {
  isOpen: boolean;
  onClose: (open: boolean) => void;
  images: CarouselImage[];
  initialIndex?: number;
  showCounter?: boolean;
}

export default function ImageCarouselModal({
  isOpen,
  onClose,
  images,
  showCounter,
  initialIndex = 0,
}: ImageCarouselModalProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(initialIndex);

  useEffect(() => {
    if (isOpen) {
      setCurrentImageIndex(initialIndex);
    }
  }, [isOpen, initialIndex]);

  const handleNext = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrev = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  if (!images || images.length === 0) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogTitle className="sr-only">
        Imagem for {images[currentImageIndex].alt}
      </DialogTitle>
      <DialogDescription className="sr-only">
        Imagem for {images[currentImageIndex].alt}
      </DialogDescription>
      <DialogContent className="max-w-[calc(100vw-2rem)] border-none bg-transparent p-0 md:max-w-2xl">
        <div className="relative flex h-[80dvh] w-full flex-col items-center justify-center">
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
                  className="size-full object-contain object-center"
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

          {showCounter && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-green-500/80 px-4 py-1 text-green-50 backdrop-blur-sm">
              <span className="font-lora text-sm italic">
                {currentImageIndex + 1} / {images.length}
              </span>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
