import { SlidersHorizontal } from "lucide-react";
import { ALL_CITIES, ALL_MONTHS, MONTHS } from "./eventFilters";
import { SelectFilter } from "./SelectFilter";

interface EventsFiltersProps {
  month: string;
  city: string;
  cityOptions: string[];
  onMonthChange: (month: string) => void;
  onCityChange: (city: string) => void;
}

export function EventsFilters({
  month,
  city,
  cityOptions,
  onMonthChange,
  onCityChange,
}: EventsFiltersProps) {
  return (
    <section className="mt-5 rounded-[1.5rem] border border-green-100 bg-white p-4 shadow-[0_8px_24px_rgba(27,78,48,0.08)] sm:flex sm:items-center sm:justify-between sm:p-5">
      <div className="mb-3 flex items-center gap-2 text-green-500 sm:mb-0">
        <span className="flex size-9 items-center justify-center rounded-full bg-green-100">
          <SlidersHorizontal className="size-4" />
        </span>
        <p className="font-maitree text-sm font-semibold">
          Encontre algo perto de você
        </p>
      </div>
      <div className="flex gap-2">
        <SelectFilter
          value={month}
          onChange={onMonthChange}
          label="Filtrar por mês"
          visibleLabel="Mês"
          allValue={ALL_MONTHS}
          options={MONTHS}
        />
        <SelectFilter
          value={city}
          onChange={onCityChange}
          label="Filtrar por cidade"
          visibleLabel="Cidade"
          allValue={ALL_CITIES}
          options={cityOptions}
        />
      </div>
    </section>
  );
}
