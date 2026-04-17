import Button from "@/shared/ui/Button";
import Row from "@/shared/ui/Layout/Helpers/Row";
import { XIcon } from "@phosphor-icons/react/ssr";
import Image from "next/image";

export interface PostImageAttachment {
  file: File;
  previewSrc: string;
  id: string;
}

interface ImageContainerProps {
  images: PostImageAttachment[];
  isLoading?: boolean;
  onRemoveImage: (id: string) => void;
}

const ImageContainer = ({
  images,
  isLoading,
  onRemoveImage,
}: ImageContainerProps) => {
  if (images.length === 0) return null;

  return (
    <div
      className={`mt-3 w-full overflow-x-auto p-1 ${isLoading ? "pointer-events-none opacity-50" : ""}`}
    >
      <Row className="w-max gap-3 transition-all">
        {images.map((image) => (
          <div key={image.id} className="group relative">
            <Image
              width={80}
              height={80}
              loading="lazy"
              src={image.previewSrc}
              alt="uploaded image"
              className="size-16 rounded-lg object-cover shadow-sm sm:size-12"
            />

            <Button.Icon
              variant="text"
              icon={<XIcon size={14} weight="bold" />}
              type="button"
              onClick={() => onRemoveImage(image.id)}
              className="absolute top-0 -right-2 z-10 flex cursor-pointer items-center justify-center rounded-full bg-red-500 p-1 text-white opacity-100 shadow-md transition-all hover:bg-red-600 sm:opacity-0 sm:group-hover:opacity-100"
              title="Remover imagem"
            />
          </div>
        ))}
      </Row>
    </div>
  );
};

export default ImageContainer;
