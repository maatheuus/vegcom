"use client";

import { getInitials } from "@/features/account/components/utils";
import { Avatar, AvatarFallback } from "@/shared/ui/Avatar";
import { AtIcon } from "@phosphor-icons/react";
import type { SuggestionProps } from "@tiptap/suggestion";
import { forwardRef, useEffect, useImperativeHandle, useState } from "react";

interface MentionItem {
  id: number;
  label: string;
}

interface MentionListProps extends SuggestionProps {
  items: MentionItem[];
}

const MentionList = forwardRef<unknown, MentionListProps>((props, ref) => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const selectItem = (index: number) => {
    const item = props.items[index];
    if (item) {
      props.command({ id: item.id, label: item.label });
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

  if (!props.items || props.items.length === 0) return null;

  return (
    <div className="min-w-[220px] overflow-hidden rounded-xl border border-green-100 bg-white shadow-xl shadow-green-900/10">
      <div className="flex items-center gap-x-1.5 border-b border-green-50 px-3 py-2">
        <AtIcon size={11} className="text-green-500" />
        <span className="font-maitree text-[11px] font-semibold tracking-wide text-green-500 uppercase">
          Mencionar
        </span>
      </div>

      <div className="flex flex-col gap-y-1 py-1">
        {props.items.map((item, index) => (
          <button
            key={item.id}
            onClick={() => selectItem(index)}
            className={`flex w-full items-center gap-x-3 px-3 py-2 text-left transition-colors duration-100 ${
              index === selectedIndex ? "bg-green-100" : "hover:bg-green-50/60"
            }`}
          >
            <Avatar className="size-7 shrink-0 ring-2 ring-green-100">
              <AvatarFallback className="!text-[10px]">
                {item.label ? getInitials(item.label) : "U"}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span
                className={`font-maitree text-sm leading-tight font-semibold transition-colors ${
                  index === selectedIndex ? "text-green-600" : "text-green-500"
                }`}
              >
                {item.label}
              </span>
              <span className="font-maitree text-[10px] text-green-200/70">
                @{item.label.split(" ")[0].toLowerCase()}
              </span>
            </div>
            {index === selectedIndex && (
              <span className="font-maitree ml-auto text-[10px] text-green-200/60">
                ↵
              </span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
});

MentionList.displayName = "MentionList";

export default MentionList;
