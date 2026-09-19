import { Calendar } from "@/shared/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/shared/ui/popover";
import clsx from "clsx";
import { format, parseISO, startOfTomorrow } from "date-fns";
import { ptBR } from "date-fns/locale";
import { CalendarDays } from "lucide-react";
import { useState } from "react";

interface EventDatePickerProps {
  id: string;
  /** Formato yyyy-MM-dd. */
  value: string;
  onChange: (value: string) => void;
}

export function EventDatePicker({ id, value, onChange }: EventDatePickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const minimumDate = startOfTomorrow();
  const selectedDate = value ? parseISO(value) : undefined;

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <button
          id={id}
          type="button"
          className="flex w-full items-center justify-between rounded-xl border border-green-200 bg-white px-3 py-2.5 text-left text-sm text-green-800 focus:border-green-500 focus:ring-2 focus:ring-green-500/20 focus:outline-none"
        >
          <span className={clsx(!selectedDate && "text-green-700")}>
            {selectedDate
              ? format(selectedDate, "dd/MM/yyyy")
              : "Selecione a data"}
          </span>
          <CalendarDays className="size-4 text-green-600" aria-hidden />
        </button>
      </PopoverTrigger>
      <PopoverContent
        align="start"
        sideOffset={8}
        className="z-[1500] w-auto rounded-xl border border-green-100 bg-white p-0 shadow-xl"
      >
        <Calendar
          mode="single"
          selected={selectedDate}
          onSelect={(nextDate) => {
            if (!nextDate) return;
            onChange(format(nextDate, "yyyy-MM-dd"));
            setIsOpen(false);
          }}
          defaultMonth={selectedDate ?? minimumDate}
          startMonth={minimumDate}
          disabled={{ before: minimumDate }}
          locale={ptBR}
        />
      </PopoverContent>
    </Popover>
  );
}
