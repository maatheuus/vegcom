"use client";

import { CheckOutlinedIcon } from "@/components/icons";
import type { RecipeType } from "@/components/new-recipe/GroupFields";
import Button from "@/components/ui/Button";
import Col from "@/components/ui/Layout/Helpers/Col";
import Row from "@/components/ui/Layout/Helpers/Row";
import Text from "@/components/ui/Text";
import clsx from "clsx";
import { useEffect, useState } from "react";
import { typeConfig } from "./utils";

interface ChecklistItem {
  id: number;
  label: string;
}

interface ChecklistProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  type: RecipeType;
  items: ChecklistItem[];
  storageKey?: string;
}

export default function ChecklistSection({
  title,
  type,
  items,
  storageKey,
  className,
  ...props
}: ChecklistProps) {
  const cfg = typeConfig[type];
  const [checkedItems, setCheckedItems] = useState<number[]>([]);

  useEffect(() => {
    if (cfg.interactive && storageKey) {
      const stored = localStorage.getItem(storageKey);
      if (stored) setCheckedItems(JSON.parse(stored));
    }
  }, [cfg.interactive, storageKey]);

  useEffect(() => {
    if (cfg.interactive && storageKey) {
      localStorage.setItem(storageKey!, JSON.stringify(checkedItems));
    }
  }, [checkedItems, cfg.interactive, storageKey]);

  const toggleCheck = (id: number) => {
    if (!cfg.interactive) return;
    setCheckedItems((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  return (
    <Col className={clsx("gap-y-4", className)} {...props}>
      <Text
        type={Text.Type.BodyTwo}
        weight={Text.Weight.Bold}
        className="text-green-500 uppercase"
      >
        {title}
      </Text>

      <Col className="gap-2 w-fit">
        {items.map((item, idx) => {
          const isChecked = checkedItems.includes(item.id);

          const btnClasses = clsx(
            cfg.button.base,
            type === "instructions"
              ? isChecked
                ? (cfg.button as (typeof typeConfig)["instructions"]["button"])
                    .checkedBg
                : (cfg.button as (typeof typeConfig)["instructions"]["button"])
                    .uncheckedBg
              : "",
            isChecked && "checked" in cfg.button && cfg.button.checked
              ? cfg.button.checked
              : ""
          );

          const btnContent = isChecked ? (
            <CheckOutlinedIcon className="w-4 h-4" />
          ) : (
            String(idx + 1)
          );

          const textClasses = clsx(
            cfg.text.base,
            cfg.text.color,
            cfg.text.weight,
            cfg.text.lineThrough &&
              isChecked &&
              "line-through " + cfg.text.checkedColor,
            "cursor-pointer"
          );

          return (
            <Row
              key={item.id}
              className={clsx(
                "gap-2 items-center",
                cfg.interactive && "cursor-pointer"
              )}
              onClick={() => toggleCheck(item.id)}
            >
              <Button
                variant="none"
                size="none"
                className={clsx("text-sm", btnClasses)}
              >
                {btnContent}
              </Button>

              <Text as="span" type={Text.Type.BodyFour} className={textClasses}>
                {item.label}
              </Text>
            </Row>
          );
        })}
      </Col>
    </Col>
  );
}
