import {
  GripVerticalOutlinedIcon,
  TrashOutlinedIcon,
} from "@/components/icons";
import Button from "@/components/ui/Button";
import Row from "@/components/ui/Layout/Helpers/Row";
import { TooltipContent, TooltipTrigger } from "@/components/ui/Tooltip";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
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
  onRemove: (id: string) => void;
}

export default function SortableImage({ image, onRemove, isOneImage }: SortableImageProps) {
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

  return (
    <Fragment>
      <TooltipTrigger asChild>
        <div
          ref={setNodeRef}
          style={style}
          {...attributes}
          className={`relative group cursor-pointer rounded-md overflow-hidden z-50  min-h-24 max-w-36 lg:max-w-full lg:min-h-32 lg:max-h-32 ${
            isDragging ? "scale-105" : ""
          } `}
        >
          {!image.loading &&
            !isOneImage && (
              <div
                {...listeners}
                className="absolute top-0 left-0 z-20 bg-white/80 rounded-r p-1 cursor-grab hover:bg-green-50 transition-colors"
              >
                <GripVerticalOutlinedIcon
                  size={18}
                  className="size-fit fill-green-500"
                />
              </div>
            )}

          <div className="absolute right-0 top-0 opacity-0 invisible bg-white/80 rounded-l group-hover:opacity-100 group-hover:visible transition-all duration-200 overflow-hidden z-20">
            <Button.Icon
              variant="outline"
              size="md"
              className="p-1 hover:bg-green-50"
              onClick={handleRemove}
              icon={
                <TrashOutlinedIcon size={18} className="size-fit text-black" />
              }
            />
          </div>

          <div
            className="absolute inset-0 size-full z-10"
            onClick={() => setIsOpen(true)}
          ></div>

          <Image
            src={image.preview}
            alt={image.name}
            width={200}
            height={128}
            className="w-full h-full min-h-24 max-w-36 lg:max-w-full lg:min-h-32 lg:max-h-32 object-cover pointer-events-none aspect-square"
            draggable={false}
          />

          {image.loading && (
            <Row.Center className="absolute inset-0 bg-black justify-center pointer-events-none z-20">
              <span className="animate-spin rounded-full h-6 w-6 border-b-2 border-green-50"></span>
            </Row.Center>
          )}
        </div>
      </TooltipTrigger>

      <DialogImage image={image} onOpenChange={setIsOpen} isOpen={isOpen} />

      {!image.loading && (
        <TooltipContent
          side="bottom"
          align="center"
          className="bg-green-500 text-white"
        >
          {image.name}
        </TooltipContent>
      )}
    </Fragment>
  );
}
