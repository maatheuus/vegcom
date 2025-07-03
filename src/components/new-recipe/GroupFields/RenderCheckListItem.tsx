import { MinusCircleOutlinedIcon } from "@/components/icons";
import Button from "@/components/ui/Button";
import Row from "@/components/ui/Layout/Helpers/Row";
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
      <Row className="w-full items-center justify-between">
        <Row className="items-center gap-x-2">
          <span
            {...listeners}
            className={clsx(
              "flex items-center justify-center size-6 text-sm rounded-full font-medium cursor-pointer",
              type === "ingredients" &&
                " border border-green-500 text-green-500",
              type === "instructions" && "bg-green-200 text-green-50",
              type === "cookingNotes" &&
                "border border-green-500 text-green-500 "
            )}
          >
            {idx + 1}
          </span>
          <span className="text-base text-green-500">{item.label}</span>
        </Row>
        <Button.Icon
          onClick={() => onDeleteItem?.(item.id)}
          variant="text"
          type="button"
          className="p-0 gap-x-1 text-green-500 cursor-pointer hover:text-green-500/70 transition-colors"
          leftIcon={<MinusCircleOutlinedIcon size={20} />}
        />
      </Row>
    </div>
  );
}
