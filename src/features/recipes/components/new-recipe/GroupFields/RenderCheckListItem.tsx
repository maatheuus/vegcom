import { MinusCircleOutlinedIcon } from "@/shared/icons";
import Button from "@/shared/ui/Button";
import Row from "@/shared/ui/Layout/Helpers/Row";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import clsx from "clsx";
import type { RecipeType } from ".";

interface Props {
  item: { id: string; label: string; value: string };
  idx: number;
  type: RecipeType;
  onDeleteItem: (id: string) => void;
}
export default function RenderCheckListItem({
  item,
  type,
  onDeleteItem,
  idx,
}: Props) {
  const {
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
    setNodeRef,
  } = useSortable({ id: item.id });

  const style = {
    transform: CSS.Translate.toString(transform),
    transition,
    opacity: isDragging ? 0.7 : 1,
    zIndex: isDragging ? 9999 : "auto",
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes}>
      <Row className="w-full items-baseline justify-between gap-x-4">
        <Row className="items-baseline gap-x-2">
          <span
            {...listeners}
            className={clsx(
              "font-lora flex h-6 min-h-6 w-6 min-w-6 cursor-pointer items-center justify-center rounded-full bg-green-200 text-sm font-medium text-green-50",
            )}
          >
            {idx + 1}
          </span>
          <span className="font-lora line-clamp-2 text-sm break-all text-green-500">
            {item.label}
          </span>
        </Row>
        <Button.Icon
          onClick={() => onDeleteItem?.(item.id)}
          variant="text"
          type="button"
          className="cursor-pointer gap-x-1 p-0 text-green-500 transition-colors hover:text-green-500/70"
          leftIcon={<MinusCircleOutlinedIcon size={16} />}
        />
      </Row>
    </div>
  );
}
