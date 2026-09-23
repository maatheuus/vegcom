"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/Select";
import { CalendarDays, MapPin, Store } from "lucide-react";
import {
  CATEGORY_LABELS,
  DIET_LABELS,
  NEARBY_PLACES_RADIUS_KM,
} from "../constants";
import type { FilterDiet, PlaceCategory } from "../types";

export type MapContentFilter = "all" | "events" | "places";
export type PlaceDistanceFilter = "all" | "nearby";

interface MonthOption {
  value: string;
  label: string;
}

interface MapFiltersProps {
  content: MapContentFilter;
  onContentChange: (content: MapContentFilter) => void;
  eventCount: number;
  placeCount: number;
  months: MonthOption[];
  selectedMonth: string;
  onMonthChange: (month: string) => void;
  categories: PlaceCategory[];
  selectedCategory: PlaceCategory | "all";
  onCategoryChange: (category: PlaceCategory | "all") => void;
  selectedDiet: FilterDiet;
  onDietChange: (diet: FilterDiet) => void;
  selectedDistance: PlaceDistanceFilter;
  onDistanceChange: (distance: PlaceDistanceFilter) => void;
}

export function MapFilters({
  content,
  onContentChange,
  eventCount,
  placeCount,
  months,
  selectedMonth,
  onMonthChange,
  categories,
  selectedCategory,
  onCategoryChange,
  selectedDiet,
  onDietChange,
  selectedDistance,
  onDistanceChange,
}: MapFiltersProps) {
  return (
    <div className="pointer-events-none absolute inset-x-0 top-3 z-[1001] flex justify-center px-3 sm:top-4 sm:px-4">
      <div className="pointer-events-auto flex w-full max-w-full flex-col items-center gap-2">
        <div className="hidden-scrollbar max-w-full overflow-x-auto px-1">
          <div
            className="mx-auto flex w-max items-center gap-1 rounded-full border border-green-200 bg-white p-1"
            role="tablist"
            aria-label="Mostrar no mapa"
          >
            <FilterButton
              active={content === "all"}
              onClick={() => onContentChange("all")}
              label="Todos"
              count={eventCount + placeCount}
              icon={<MapPin className="size-3.5" />}
            />
            {eventCount > 0 && (
              <FilterButton
                active={content === "events"}
                onClick={() => onContentChange("events")}
                label="Eventos"
                count={eventCount}
                icon={<CalendarDays className="size-3.5" />}
              />
            )}
            {placeCount > 0 && (
              <FilterButton
                active={content === "places"}
                onClick={() => onContentChange("places")}
                label="Locais"
                count={placeCount}
                icon={<Store className="size-3.5" />}
              />
            )}
          </div>
        </div>

        {content === "events" && months.length > 1 && (
          <Select value={selectedMonth} onValueChange={onMonthChange}>
            <SelectTrigger
              aria-label="Filtrar eventos por mês"
              className="h-auto w-48 rounded-full border-green-200 bg-white px-4 py-2 text-sm font-semibold text-green-500 shadow-[0_8px_24px_rgba(27,78,48,0.16)]"
            >
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="!z-[2000] rounded-xl border-green-100 bg-white p-1 shadow-[0_8px_24px_rgba(27,78,48,0.16)]">
              <SelectItem value="all">Data</SelectItem>
              {months.map((month) => (
                <SelectItem key={month.value} value={month.value}>
                  {month.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}

        {content === "places" && (
          <div className="hidden-scrollbar -mx-3 max-w-full overflow-x-auto px-3 sm:mx-0 sm:overflow-visible sm:px-0">
            <div className="flex w-max items-center gap-2 sm:w-auto sm:flex-wrap sm:justify-center">
              <Select value={selectedDistance} onValueChange={onDistanceChange}>
                <SelectTrigger
                  aria-label="Filtrar locais por distância"
                  className="h-auto w-48 shrink-0 rounded-full border-green-200 bg-white px-4 py-2 text-sm font-semibold text-green-500 shadow-[0_8px_24px_rgba(27,78,48,0.16)]"
                >
                  <SelectValue>
                    {selectedDistance === "all"
                      ? "Distância"
                      : `Distância: até ${NEARBY_PLACES_RADIUS_KM} km`}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent className="!z-[2000] rounded-xl border-green-100 bg-white p-1 shadow-[0_8px_24px_rgba(27,78,48,0.16)]">
                  <SelectItem value="all">Distância</SelectItem>
                  <SelectItem value="nearby">
                    Próximos a mim (até {NEARBY_PLACES_RADIUS_KM} km)
                  </SelectItem>
                </SelectContent>
              </Select>

              {categories.length > 1 && (
                <Select
                  value={selectedCategory}
                  onValueChange={(value) =>
                    onCategoryChange(value as PlaceCategory | "all")
                  }
                >
                  <SelectTrigger
                    aria-label="Filtrar locais por categoria"
                    className="h-auto w-48 shrink-0 rounded-full border-green-200 bg-white px-4 py-2 text-sm font-semibold text-green-500 shadow-[0_8px_24px_rgba(27,78,48,0.16)]"
                  >
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="!z-[2000] rounded-xl border-green-100 bg-white p-1 shadow-[0_8px_24px_rgba(27,78,48,0.16)]">
                    <SelectItem value="all">Categoria</SelectItem>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {CATEGORY_LABELS[category]}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}

              <Select
                value={selectedDiet}
                onValueChange={(value) => onDietChange(value as FilterDiet)}
              >
                <SelectTrigger
                  aria-label="Filtrar locais por dieta"
                  className="order-first h-auto w-48 shrink-0 rounded-full border-green-200 bg-white px-4 py-2 text-sm font-semibold text-green-500 shadow-[0_8px_24px_rgba(27,78,48,0.16)] sm:order-none"
                >
                  <SelectValue>
                    {selectedDiet === "all"
                      ? "Dieta"
                      : DIET_LABELS[selectedDiet]}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent className="!z-[2000] rounded-xl border-green-100 bg-white p-1 shadow-[0_8px_24px_rgba(27,78,48,0.16)]">
                  <SelectItem value="all">Dieta</SelectItem>
                  <SelectItem value="fully_vegan">
                    {DIET_LABELS.fully_vegan}
                  </SelectItem>
                  <SelectItem value="vegan_options">
                    {DIET_LABELS.vegan_options}
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function FilterButton({
  active,
  onClick,
  label,
  count,
  icon,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
  count: number;
  icon: React.ReactNode;
}) {
  return (
    <button
      type="button"
      role="tab"
      aria-selected={active}
      onClick={onClick}
      className={`inline-flex min-h-10 shrink-0 items-center gap-1.5 rounded-full px-3 py-2 text-xs font-bold transition-[background-color,color,box-shadow,scale] duration-150 active:scale-[0.96] ${active ? "bg-green-500 text-white shadow-sm" : "text-green-500 hover:bg-green-100"}`}
    >
      {icon}
      {label}
      <span
        className={`rounded-full px-1.5 py-0.5 text-[10px] ${active ? "bg-white/25" : "bg-green-100 text-green-500"}`}
      >
        {count}
      </span>
    </button>
  );
}
