import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/Dialog";
import Image from "next/image";
import type { ImageItem } from "./SortableImage";

interface DialogImageProps {
  image: ImageItem;
  isOpen?: boolean;
  onOpenChange: (isOpen: boolean) => void;
}

export default function DialogImage({
  image,
  isOpen,
  onOpenChange,
}: DialogImageProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="flex items-center justify-center p-0 max-w-[90vw] overflow-hidden [&_svg]:size-6">
        <DialogTitle className="sr-only">
          <span className="sr-only">Imagem aberta pelo usúario</span>
        </DialogTitle>
        <DialogDescription className="sr-only">
          <span className="sr-only">Imagem da receita aberta pelo usuário</span>
        </DialogDescription>
        <div className="relative w-full h-[80dvh]">
          <Image
            fill
            src={image.preview}
            alt={image.name}
            className="object-contain"
            loading="lazy"
            unoptimized
            quality={100}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
