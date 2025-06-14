"use client";
import { SearchOutlinedIcon } from "@/components/icons";
import clsx from "clsx";
import { useSearchBar } from "./hooks/useSearchBar";

export function SearchBar({ className }: React.ComponentProps<"div">) {
  const {
    isFocused,
    isHovered,
    handleFocus,
    handleBlur,
    handleMouseEnter,
    handleMouseLeave,
  } = useSearchBar();

  return (
    <div 
      className={clsx("relative", className)}
      role="search"
      aria-label="Buscar receitas"
    >
      <input
        type="text"
        placeholder="Ingredientes..."
        aria-label="Buscar por ingredientes"
        className={clsx(
          "px-4 py-2 rounded-full border-none font-medium outline-none w-full transition-all duration-300 ease-in-out",
          isFocused ? "pl-10 pr-4 max-w-[25rem] shadow-md" : "max-w-[18.75rem]",
          isHovered || isFocused
            ? "bg-green-500 text-green-50 placeholder:text-green-50"
            : "bg-green-50 text-green-500 placeholder:text-green-500",
          "focus:outline-none focus:ring-0",
          "sm:max-w-[18.75rem] sm:focus:max-w-[25rem]",
          "max-w-full"
        )}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      />

      <SearchOutlinedIcon
        className={clsx(
          "absolute top-1/2 -translate-y-1/2 w-5 h-5 transition-all duration-300 ease-in-out",
          isFocused
            ? "left-3 opacity-100 scale-100"
            : "left-10 opacity-0 scale-0",
          isHovered || isFocused ? "text-green-50" : "text-green-500"
        )}
        aria-hidden="true"
      />
    </div>
  );
}
