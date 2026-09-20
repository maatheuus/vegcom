import clsx from "clsx";
import { PRICE_RANGE_LABELS } from "../../constants";
import type { PriceRange } from "../../types";

const PRICE_RANGES: PriceRange[] = [1, 2, 3];

interface PriceRangePickerProps {
  value?: PriceRange;
  /** Clicar na opção ativa limpa a seleção. */
  onChange: (value: PriceRange | undefined) => void;
}

export function PriceRangePicker({ value, onChange }: PriceRangePickerProps) {
  return (
    <div
      className="flex items-center gap-1.5"
      role="radiogroup"
      aria-label="Faixa de preço"
    >
      {PRICE_RANGES.map((range) => {
        const isActive = value === range;
        const label = PRICE_RANGE_LABELS[range];
        return (
          <button
            key={range}
            type="button"
            role="radio"
            aria-checked={isActive}
            aria-label={label}
            title={label}
            onClick={() => onChange(isActive ? undefined : range)}
            className={clsx(
              "flex flex-1 flex-col items-center rounded-xl border px-2 py-1.5 transition-all duration-200",
              "focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:outline-none",
              isActive
                ? "border-green-500 bg-green-500 text-white shadow-sm"
                : "border-green-200 bg-white text-green-500 hover:bg-green-50",
            )}
          >
            <span className="text-sm leading-tight font-semibold">
              {"$".repeat(range)}
            </span>
            <span
              className={clsx(
                "text-[10px] leading-tight",
                isActive ? "text-white/80" : "text-green-200",
              )}
            >
              {label}
            </span>
          </button>
        );
      })}
    </div>
  );
}
