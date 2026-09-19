import { Select, SelectContent, SelectItem, SelectTrigger } from "@/shared/ui/Select";
import clsx from "clsx";

interface SelectFilterProps {
  value: string;
  onChange: (value: string) => void;
  label: string;
  visibleLabel: string;
  allValue: string;
  options: string[];
}

export function SelectFilter({
  value,
  onChange,
  label,
  visibleLabel,
  allValue,
  options,
}: SelectFilterProps) {
  const isAllValue = value === allValue;

  return (
    <div className="w-full md:max-w-fit">
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger
          aria-label={`${label}: ${value}`}
          className={clsx(
            "h-auto min-w-32 rounded-full px-4 py-2 text-sm font-semibold transition-[background-color,border-color,box-shadow] hover:bg-white focus-visible:border-green-500 focus-visible:ring-2 focus-visible:ring-green-100",
            isAllValue
              ? "border-green-200 bg-green-50 text-green-500"
              : "border-green-500 bg-white text-green-500 shadow-sm",
          )}
        >
          {isAllValue ? visibleLabel : `${visibleLabel}: ${value}`}
        </SelectTrigger>
        <SelectContent className="rounded-xl border-green-100 bg-white p-1 shadow-[0_8px_24px_rgba(27,78,48,0.12)]">
          {options.map((item) => (
            <SelectItem
              key={item}
              value={item}
              className="rounded-lg px-3 py-2 text-sm font-semibold text-green-500 focus:bg-green-100 focus:text-green-500 data-[state=checked]:bg-green-100 data-[state=checked]:text-green-500"
            >
              {item}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
