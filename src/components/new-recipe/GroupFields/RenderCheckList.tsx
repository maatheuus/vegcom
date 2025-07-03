import Col from "@/components/ui/Layout/Helpers/Col";
import clsx from "clsx";
import { gsap } from "gsap";
import type { ComponentProps } from "react";
import { useEffect, useRef } from "react";
import type { RecipeType } from ".";
import RenderCheckListItem from "./RenderCheckListItem";

interface RenderCheckListProps extends ComponentProps<"div"> {
  items: { id: string; label: string; value: string }[];
  type?: RecipeType;
  onDeleteItem?: (id: string) => void;
}

export default function RenderCheckList({
  items,
  type,
  className,
  onDeleteItem,
}: RenderCheckListProps) {
  const listRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (items.length > 0) {
      const lastItem = itemsRef.current[items.length - 1];
      if (lastItem) {
        gsap.fromTo(
          lastItem,
          {
            opacity: 0,
            y: 30,
            scale: 0.8,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.3,
            ease: "back.out(1.7)",
          }
        );
      }
    }
  }, [items.length]);

  return (
    <div ref={listRef}>
      <Col className={clsx("gap-y-2 items-start", className)}>
        {items.map((item, idx) => (
          <div
            key={item.id}
            ref={(el) => {
              itemsRef.current[idx] = el;
            }}
            className="w-full"
          >
            <RenderCheckListItem
              key={item.id}
              item={item}
              type={type!}
              idx={idx}
              onDeleteItem={(id) => onDeleteItem?.(id)}
            />
          </div>
        ))}
      </Col>
    </div>
  );
}
