import Col from "@/shared/ui/Layout/Helpers/Col";
import clsx from "clsx";
import type { ComponentProps } from "react";
import { useRef } from "react";
import RenderCheckListItem from "./RenderCheckListItem";

interface RenderCheckListProps extends ComponentProps<"div"> {
  items: { id: string; label: string; value: string }[];
  onDeleteItem?: (id: string) => void;
  onEditItem?: (id: string, newLabel: string) => void;
}

export default function RenderCheckList({
  items,
  className,
  onDeleteItem,
  onEditItem,
}: RenderCheckListProps) {
  const listRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={listRef} className="h-full">
      <Col className={clsx("items-start gap-y-2", className)}>
        {items.map((item, idx) => (
          <div key={item.id} className="w-full">
            <RenderCheckListItem
              key={item.id}
              showDraggingIcon={items.length >= 2}
              item={item}
              idx={idx}
              onDeleteItem={(id) => onDeleteItem?.(id)}
              onEditItem={(id, newLabel) => onEditItem?.(id, newLabel)}
            />
          </div>
        ))}
      </Col>
    </div>
  );
}
