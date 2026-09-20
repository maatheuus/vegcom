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
    <section className="mt-3 flex items-center gap-2 rounded-[1.5rem] border border-green-100 bg-white p-2.5 shadow-[0_8px_24px_rgba(27,78,48,0.08)] sm:mt-5 sm:justify-between sm:p-5">
      <div className="flex shrink-0 items-center gap-2 text-green-500">
        <span className="flex size-9 items-center justify-center rounded-full bg-green-100">
          <SlidersHorizontal className="size-4" />
        </span>
        <p className="font-maitree hidden text-sm font-semibold sm:block">
          Encontre algo perto de você
        </p>
      </div>
      <div className="flex min-w-0 flex-1 gap-2 sm:max-w-fit sm:flex-none">
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
