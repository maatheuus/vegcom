import clsx from "clsx";
import {
  Coffee,
  Croissant,
  MapPin,
  ShoppingBag,
  Store,
  UtensilsCrossed,
  type LucideIcon,
} from "lucide-react";
import { CATEGORY_SINGULAR_LABELS } from "../../constants";
import type { PlaceCategory } from "../../types";

const CATEGORY_ICONS: Record<PlaceCategory, LucideIcon> = {
  restaurant: UtensilsCrossed,
  market: ShoppingBag,
  bakery: Croissant,
  cafe: Coffee,
  entrepreneur: Store,
  other: MapPin,
};

const CATEGORIES = Object.keys(CATEGORY_ICONS) as PlaceCategory[];

interface CategoryPickerProps {
  value: PlaceCategory | null;
  onChange: (category: PlaceCategory) => void;
}

export function CategoryPicker({ value, onChange }: CategoryPickerProps) {
  return (
    <div
      className="flex flex-wrap gap-2"
      role="radiogroup"
      aria-label="Categoria"
    >
      {CATEGORIES.map((category) => {
        const isActive = value === category;
        const Icon = CATEGORY_ICONS[category];
        return (
          <button
            key={category}
            type="button"
            role="radio"
            aria-checked={isActive}
            onClick={() => onChange(category)}
            className={clsx(
              "inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-medium transition-all duration-200",
              "focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2 focus-visible:outline-none",
              isActive
                ? "bg-green-500 text-white shadow-sm"
                : "bg-green-50 text-green-500 hover:bg-green-100",
            )}
          >
            <Icon className="h-4 w-4" aria-hidden />
            <span>{CATEGORY_SINGULAR_LABELS[category]}</span>
          </button>
        );
      })}
    </div>
  );
}
