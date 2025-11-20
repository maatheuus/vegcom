"use client";

import { CheckOutlinedIcon } from "@/shared/icons";

import Button from "@/shared/ui/Button";
import Col from "@/shared/ui/Layout/Helpers/Col";
import Row from "@/shared/ui/Layout/Helpers/Row";
import Text from "@/shared/ui/Text";
import clsx from "clsx";
import { useEffect, useState } from "react";
import type { RecipeType } from "../../new-recipe/GroupFields";
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
  const config = typeConfig[type];
  const [checkedItems, setCheckedItems] = useState<number[]>([]);

  useEffect(() => {
    if (config?.interactive && storageKey) {
      const stored = localStorage.getItem(storageKey);
      if (stored) {
        try {
          setCheckedItems(JSON.parse(stored));
        } catch (error) {
          console.error("Failed to parse stored checklist data:", error);
        }
      }
    }
  }, [config?.interactive, storageKey]);

  useEffect(() => {
    if (config?.interactive && storageKey && checkedItems.length >= 0) {
      localStorage.setItem(storageKey, JSON.stringify(checkedItems));
    }
  }, [checkedItems, config?.interactive, storageKey]);

  const toggleCheck = (id: number) => {
    if (!config.interactive) return;
    setCheckedItems((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id],
    );
  };

  if (!config) {
    console.warn(`No configuration found for checklist type: ${type}`);
    return null;
  }

  return (
    <Col className={clsx("gap-y-4", className)} {...props}>
      <Text
        type={Text.Type.BodyTwo}
        weight={Text.Weight.Bold}
        className="text-green-500 uppercase"
      >
        {title}
      </Text>

      <Col className="w-fit gap-2">
        {items.map((item, idx) => {
          const isChecked = checkedItems.includes(item.id);

          const getButtonBgClass = () => {
            if (type !== "instructions") return "";
            return isChecked
              ? config.button.checkedBg || ""
              : config.button.uncheckedBg || "";
          };

          const buttonClasses = clsx(
            config.button.base,
            getButtonBgClass(),
            isChecked && config.button.checked,
          );

          const buttonContent = isChecked ? (
            <CheckOutlinedIcon className="h-4 w-4" />
          ) : (
            String(idx + 1)
          );

          const textClasses = clsx(
            config.text.base,
            config.text.color,
            config.text.weight,
            config.text.lineThrough &&
              isChecked &&
              `line-through ${config.text.checkedColor}`,
            config.interactive ? "cursor-pointer" : "cursor-default",
          );

          return (
            <Row
              key={item.id}
              className={clsx(
                "items-center gap-2",
                config.interactive && "cursor-pointer",
              )}
              onClick={() => toggleCheck(item.id)}
            >
              <Button
                variant="none"
                size="none"
                className={clsx("text-sm", buttonClasses)}
              >
                {buttonContent}
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
