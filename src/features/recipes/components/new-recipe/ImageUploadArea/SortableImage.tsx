import Button from "@/shared/ui/Button";
import Row from "@/shared/ui/Layout/Helpers/Row";
import { TooltipContent, TooltipTrigger } from "@/shared/ui/Tooltip";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  FrameCornersIcon,
  SquaresFourIcon,
  TrashIcon,
} from "@phosphor-icons/react";
import Image from "next/image";
import { Fragment, useState } from "react";
import DialogImage from "./DialogImage";

export interface ImageItem {
  id: string;
  file: File;
  preview: string;
  name: string;
  loading?: boolean;
}

interface SortableImageProps {
  image: ImageItem;
  index: number;
  isOneImage?: boolean;
  isFirstImage: boolean;
  onRemove: (id: string) => void;
}

export default function SortableImage({
  image,
  onRemove,
  isFirstImage,
  isOneImage,
}: SortableImageProps) {
  const [isOpen, setIsOpen] = useState(false);
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: image.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.7 : 1,
    zIndex: isDragging ? 9999 : "auto",
  };

  const handleRemove = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onRemove(image.id);
  };

  console.log(isFirstImage);
  return (
    <Fragment>
      <TooltipTrigger asChild>
        <div
          ref={setNodeRef}
          style={style}
          {...attributes}
          className={`group relative z-50 min-h-24 max-w-36 cursor-pointer overflow-hidden rounded-md lg:max-h-32 lg:min-h-32 lg:max-w-full ${
            isDragging ? "scale-105" : ""
          } `}
        >
          {!image.loading && !isOneImage && (
            <div
              {...listeners}
              className="absolute top-0 left-0 z-20 cursor-grab rounded-r bg-white/80 p-1 transition-colors hover:bg-green-50"
            >
              <SquaresFourIcon size={18} className="size-fit fill-green-500" />
            </div>
          )}

          <div className="invisible absolute top-0 right-0 z-20 overflow-hidden rounded-l bg-white/80 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100">
            <Button.Icon
              variant="outline"
              size="md"
              className="p-1 hover:bg-green-50"
              onClick={handleRemove}
              icon={<TrashIcon size={18} className="text-black-100 size-fit" />}
            />
          </div>

          {isFirstImage && (
            <div className="textgreen-500 absolute right-0.5 bottom-0 z-10 flex items-center rounded-full bg-green-500 fill-green-50 p-1.5">
              <FrameCornersIcon size={18} className="size-fit fill-green-50" />
            </div>
          )}

          <div
            className="absolute inset-0 z-10 size-full"
            onClick={() => setIsOpen(true)}
          ></div>

          <Image
            src={image.preview}
            alt={image.name}
            width={200}
            height={128}
            className="pointer-events-none aspect-square h-full min-h-24 w-full max-w-36 object-cover lg:max-h-32 lg:min-h-32 lg:max-w-full"
            draggable={false}
          />

          {image.loading && (
            <Row.Center className="pointer-events-none absolute inset-0 z-20 justify-center bg-black">
              <span className="h-6 w-6 animate-spin rounded-full border-b-2 border-green-50"></span>
            </Row.Center>
          )}
        </div>
      </TooltipTrigger>

      <DialogImage image={image} onOpenChange={setIsOpen} isOpen={isOpen} />

      {!image.loading && (
        <TooltipContent
          side="bottom"
          align="center"
          className="font-maitree bg-green-500 text-white"
        >
          {image.name}
        </TooltipContent>
      )}
    </Fragment>
  );
}
