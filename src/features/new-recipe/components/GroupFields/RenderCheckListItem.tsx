import Button from "@/shared/ui/Button";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { DotsSixVerticalIcon, MinusCircleIcon } from "@phosphor-icons/react";
import clsx from "clsx";

interface Props {
  item: { id: string; label: string; value: string };
  showDraggingIcon: boolean;
  idx: number;
  onDeleteItem: (id: string) => void;
}

export default function RenderCheckListItem({
  item,
  showDraggingIcon,
  idx,
  onDeleteItem,
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
      <div
        className={clsx(
          "flex w-full items-center justify-between gap-3 rounded-xl border border-green-200/20 p-2",
          isDragging && "shadow-md",
        )}
      >
        <div className="flex items-center gap-2">
          <span
            {...listeners}
            title="Arraste para reordenar"
            className="flex cursor-grab items-center text-green-500 hover:text-green-500 active:cursor-grabbing"
          >
            {showDraggingIcon && (
              <DotsSixVerticalIcon size={16} weight="bold" />
            )}
          </span>
          <span className="font-lora flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-green-500 text-xs font-semibold text-green-50">
            {idx + 1}
          </span>
          <span className="font-lora line-clamp-2 text-sm break-all text-green-800">
            {item.label}
          </span>
        </div>
        <Button.Icon
          onClick={() => onDeleteItem?.(item.id)}
          variant="text"
          type="button"
          className="cursor-pointer gap-x-1 p-0 text-green-500 transition-colors hover:text-green-500/70"
          leftIcon={<MinusCircleIcon size={16} />}
        />
      </div>
    </div>
  );
}
