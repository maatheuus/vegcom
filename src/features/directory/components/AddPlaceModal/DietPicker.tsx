import clsx from "clsx";
import { Leaf, Sprout, type LucideIcon } from "lucide-react";
import { DIET_LABELS } from "../../constants";
import type { PlaceDiet } from "../../types";

const DIET_ICONS: Record<PlaceDiet, LucideIcon> = {
  fully_vegan: Leaf,
  vegan_options: Sprout,
};

const DIETS = Object.keys(DIET_ICONS) as PlaceDiet[];

interface DietPickerProps {
  value: PlaceDiet | null;
  onChange: (diet: PlaceDiet) => void;
}

export function DietPicker({ value, onChange }: DietPickerProps) {
  return (
    <div className="flex flex-wrap gap-2" role="radiogroup" aria-label="Dieta">
      {DIETS.map((diet) => {
        const isActive = value === diet;
        const Icon = DIET_ICONS[diet];
        return (
          <button
            key={diet}
            type="button"
            role="radio"
            aria-checked={isActive}
            onClick={() => onChange(diet)}
            className={clsx(
              "inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-medium transition-all duration-200",
              "focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2 focus-visible:outline-none",
              isActive
                ? "bg-green-500 text-white shadow-sm"
                : "bg-green-50 text-green-500 hover:bg-green-100",
            )}
          >
            <Icon className="h-4 w-4" aria-hidden />
            <span>{DIET_LABELS[diet]}</span>
          </button>
        );
      })}
    </div>
  );
}
