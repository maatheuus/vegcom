"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import * as React from "react";
import { DayPicker } from "react-day-picker";

import { cn } from "@/shared/lib/utils";

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: React.ComponentProps<typeof DayPicker>) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("p-3", className)}
      classNames={{
        root: "w-fit",
        months: "flex flex-col",
        month: "space-y-3",
        month_caption: "relative flex h-8 items-center justify-center",
        caption_label: "text-sm font-semibold text-green-700",
        nav: "absolute inset-x-0 top-0 flex items-center justify-between",
        button_previous:
          "inline-flex size-8 items-center justify-center rounded-lg text-green-600 hover:bg-green-100 focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-40",
        button_next:
          "inline-flex size-8 items-center justify-center rounded-lg text-green-600 hover:bg-green-100 focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-40",
        chevron: "size-4",
        month_grid: "w-full border-collapse",
        weekdays: "flex",
        weekday: "w-9 py-1 text-center text-xs font-medium text-green-600",
        week: "mt-1 flex w-full",
        day: "group/day relative size-9 p-0 text-center text-sm",
        day_button:
          "inline-flex size-9 items-center justify-center rounded-lg text-green-700 hover:bg-green-100 focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-1 focus-visible:outline-none group-data-[selected=true]/day:bg-green-500 group-data-[selected=true]/day:text-white group-data-[disabled=true]/day:cursor-not-allowed group-data-[disabled=true]/day:text-green-200 group-data-[disabled=true]/day:hover:bg-transparent",
        selected: "",
        today: "font-semibold",
        outside: "text-green-200 opacity-50",
        disabled: "opacity-50",
        hidden: "invisible",
        ...classNames,
      }}
      components={{
        Chevron: ({ className, orientation }) =>
          orientation === "left" ? (
            <ChevronLeft className={className} aria-hidden />
          ) : (
            <ChevronRight className={className} aria-hidden />
          ),
      }}
      {...props}
    />
  );
}

export { Calendar };
