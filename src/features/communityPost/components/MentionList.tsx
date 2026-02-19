"use client";

import { Avatar, AvatarFallback } from "@/shared/ui/Avatar";
import type { SuggestionProps } from "@tiptap/suggestion";
import { forwardRef, useEffect, useImperativeHandle, useState } from "react";

interface MentionListProps extends SuggestionProps {
  items: string[];
}

const MentionList = forwardRef<unknown, MentionListProps>((props, ref) => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const selectItem = (index: number) => {
    const item = props.items[index];

    if (item) {
      props.command({ id: item });
    }
  };

  const upHandler = () => {
    setSelectedIndex(
      (selectedIndex + props.items.length - 1) % props.items.length,
    );
  };

  const downHandler = () => {
    setSelectedIndex((selectedIndex + 1) % props.items.length);
  };

  const enterHandler = () => {
    selectItem(selectedIndex);
  };

  useEffect(() => setSelectedIndex(0), [props.items]);

  useImperativeHandle(ref, () => ({
    onKeyDown: ({ event }: { event: KeyboardEvent }) => {
      if (event.key === "ArrowUp") {
        upHandler();
        return true;
      }

      if (event.key === "ArrowDown") {
        downHandler();
        return true;
      }

      if (event.key === "Enter") {
        enterHandler();
        return true;
      }

      return false;
    },
  }));

  if (!props.items || props.items.length === 0) {
    return null;
  }

  return (
    <div className="flex min-w-[180px] flex-col overflow-hidden rounded-md border border-gray-200 bg-white shadow-lg shadow-gray-200/50">
      {props.items.map((item: string, index: number) => (
        <button
          className={`flex w-full items-center gap-x-2 px-4 py-2 text-left text-sm transition-colors ${
            index === selectedIndex
              ? "bg-green-50 text-green-700"
              : "bg-white text-gray-700 hover:bg-gray-50"
          }`}
          key={index}
          onClick={() => selectItem(index)}
        >
          <Avatar className="h-6 w-6">
            <AvatarFallback className="bg-green-100 text-[10px] text-green-600">
              {item.slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <span className="font-medium">{item}</span>
        </button>
      ))}
    </div>
  );
});

MentionList.displayName = "MentionList";

export default MentionList;
