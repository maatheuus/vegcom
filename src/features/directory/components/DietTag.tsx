import clsx from "clsx";
import { Leaf, Sprout, type LucideIcon } from "lucide-react";
import { DIET_LABELS } from "../constants";
import type { PlaceDiet } from "../types";

const DIET_ICONS: Record<PlaceDiet, LucideIcon> = {
  fully_vegan: Leaf,
  vegan_options: Sprout,
};

const DIET_STYLES: Record<PlaceDiet, string> = {
  fully_vegan: "bg-green-500 text-white",
  vegan_options: "border border-green-200 bg-green-50 text-green-700",
};

interface DietTagProps {
  diet: PlaceDiet;
  className?: string;
}

export function DietTag({ diet, className }: DietTagProps) {
  const Icon = DIET_ICONS[diet];
  return (
    <span
      className={clsx(
        "inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium",
        DIET_STYLES[diet],
        className,
      )}
    >
      <Icon className="h-3 w-3" aria-hidden />
      {DIET_LABELS[diet]}
    </span>
  );
}
