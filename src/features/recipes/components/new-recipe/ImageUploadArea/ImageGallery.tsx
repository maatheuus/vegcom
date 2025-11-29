import Grid from "@/shared/ui/Layout/Helpers/Grid";
import Text from "@/shared/ui/Text";
import { Tooltip, TooltipProvider } from "@/shared/ui/Tooltip";
import { closestCenter, DndContext, DragEndEvent } from "@dnd-kit/core";
import { rectSortingStrategy, SortableContext } from "@dnd-kit/sortable";
import SortableImage, { type ImageItem } from "./SortableImage";

interface Props {
  images: ImageItem[];
  onRemove: (id: string) => void;
  onDragEnd: (event: DragEndEvent) => void;
}

export default function ImageGallery({ images, onRemove, onDragEnd }: Props) {
  if (images.length === 0) return;

  return (
    <div className="space-y-4">
      <Text
        as="h3"
        weight={Text.Weight.Medium}
        type={Text.Type.BodyFour}
        className="font-maitree text-green-500"
      >
        Imagens da Receita
      </Text>
      <DndContext collisionDetection={closestCenter} onDragEnd={onDragEnd}>
        <SortableContext
          items={images.map((img) => img.id)}
          strategy={rectSortingStrategy}
        >
          <Grid gap="3" className="grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {images.map((image, idx) => (
              <TooltipProvider key={image.id} delayDuration={200}>
                <Tooltip>
                  <SortableImage
                    index={idx}
                    isFirstImage={idx === 0}
                    image={image}
                    onRemove={onRemove}
                    isOneImage={images.length === 1}
                  />
                </Tooltip>
              </TooltipProvider>
            ))}
          </Grid>
        </SortableContext>
      </DndContext>
    </div>
  );
}
