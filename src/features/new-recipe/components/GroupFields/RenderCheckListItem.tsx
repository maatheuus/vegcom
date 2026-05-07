import Button from "@/shared/ui/Button";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { DotsSixVerticalIcon, MinusCircleIcon } from "@phosphor-icons/react";
import clsx from "clsx";
import React, { useEffect, useRef, useState } from "react";

interface Props {
  item: { id: string; label: string; value: string };
  showDraggingIcon: boolean;
  idx: number;
  isTextarea?: boolean;
  onDeleteItem: (id: string) => void;
  onEditItem: (id: string, newLabel: string) => void;
}

export default function RenderCheckListItem({
  item,
  showDraggingIcon,
  idx,
  isTextarea = false,
  onDeleteItem,
  onEditItem,
}: Props) {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(item.label);
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);

  const {
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
    setNodeRef,
  } = useSortable({ id: item.id });

  useEffect(() => {
    if (isEditing) inputRef.current?.focus();
  }, [isEditing]);

  const style = {
    transform: CSS.Translate.toString(transform),
    transition,
    opacity: isDragging ? 0.7 : 1,
    zIndex: isDragging ? 9999 : "auto",
  };

  const handleSave = () => {
    const trimmed = editValue.trim();
    if (trimmed && trimmed !== item.label) onEditItem(item.id, trimmed);
    setIsEditing(false);
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes}>
      <div
        className={clsx(
          "flex w-full items-center justify-between gap-3 rounded-xl border border-green-200/20 p-2",
          isDragging && "shadow-md",
        )}
      >
        <div
          className={clsx(
            "flex min-w-0 flex-1 gap-2",
            isEditing && isTextarea ? "items-start" : "items-center",
          )}
          onClick={() => {
            if (!isDragging && !isEditing) {
              setEditValue(item.label);
              setIsEditing(true);
            }
          }}
        >
          {showDraggingIcon && (
            <span
              {...listeners}
              title="Arraste para reordenar"
              style={{ touchAction: "none" }}
              onClick={(e) => e.stopPropagation()}
              className="flex shrink-0 cursor-grab items-center p-1 text-green-500 hover:text-green-500 active:cursor-grabbing"
            >
              <DotsSixVerticalIcon size={16} weight="bold" />
            </span>
          )}

          <span className="font-lora flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-green-500 text-xs font-semibold text-green-50">
            {idx + 1}
          </span>
          {isEditing ? (
            isTextarea ? (
              <textarea
                ref={inputRef as React.Ref<HTMLTextAreaElement>}
                value={editValue}
                onChange={(e) => setEditValue(e.target.value)}
                onBlur={handleSave}
                onClick={(e) => e.stopPropagation()}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSave();
                  }
                  if (e.key === "Escape") {
                    setIsEditing(false);
                    setEditValue(item.label);
                  }
                }}
                rows={1}
                className="font-lora field-sizing-content min-w-0 flex-1 resize-none rounded-lg border border-green-300 bg-green-50 px-2 py-0.5 text-sm text-green-800 outline-none focus:border-green-500"
              />
            ) : (
            <input
              ref={inputRef as React.Ref<HTMLInputElement>}
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
              onBlur={handleSave}
              onClick={(e) => e.stopPropagation()}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleSave();
                }
                if (e.key === "Escape") {
                  setIsEditing(false);
                  setEditValue(item.label);
                }
              }}
              className="font-lora min-w-0 flex-1 rounded-lg border border-green-300 bg-green-50 px-2 py-0.5 text-sm text-green-800 outline-none focus:border-green-500"
            />
            )
          ) : (
            <span className="font-lora line-clamp-2 min-w-0 cursor-text text-sm break-words hyphens-auto text-green-800">
              {item.label}
            </span>
          )}
        </div>
        <Button.Icon
          onClick={() => onDeleteItem?.(item.id)}
          variant="text"
          type="button"
          className="shrink-0 cursor-pointer gap-x-1 p-0 text-green-500 transition-colors hover:text-green-500/70"
          leftIcon={<MinusCircleIcon size={16} />}
        />
      </div>
    </div>
  );
}
