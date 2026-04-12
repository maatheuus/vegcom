"use client";

import useDebounce from "@/shared/hooks/useDebounce";
import { MagnifyingGlassIcon } from "@phosphor-icons/react";
import clsx from "clsx";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useSearchBar } from "../hooks/useSearchBar";

interface Props extends React.ComponentProps<"input"> {
  inputClassName?: string;
  placeholder?: string;
}

export function SearchBar({
  className,
  placeholder = "Buscar receitas...",
  inputClassName,
  ...props
}: Props) {
  const {
    isFocused,
    isHovered,
    handleFocus,
    handleBlur,
    handleMouseEnter,
    handleMouseLeave,
  } = useSearchBar();

  const searchParams = useSearchParams();
  const router = useRouter();

  const [term, setTerm] = useState(searchParams.get("q")?.toString() || "");
  const debouncedTerm = useDebounce(term, 300);

  useEffect(() => {
    const currentQ = searchParams.get("q")?.toString() || "";
    if (term !== currentQ) {
      setTerm(currentQ);
    }
  }, [searchParams]);

  useEffect(() => {
    const currentQ = searchParams.get("q") || "";

    if (debouncedTerm !== currentQ) {
      const params = new URLSearchParams(searchParams.toString());

      if (debouncedTerm) {
        params.set("q", debouncedTerm);
      } else {
        params.delete("q");
      }

      params.delete("page");

      router.replace(`?${params.toString()}`, { scroll: false });
    }
  }, [debouncedTerm]);

  return (
    <div
      className={clsx("relative", className)}
      role="search"
      aria-label="Buscar receitas"
    >
      <input
        name="search"
        type="text"
        placeholder={placeholder}
        value={term}
        onChange={(e) => setTerm(e.target.value)}
        className={clsx(
          "font-lora w-full rounded-full border-none px-4 py-2 font-medium transition-all duration-300 ease-in-out outline-none placeholder:font-bold",
          isFocused || term
            ? "max-w-[25rem] pr-4 pl-10 shadow-md"
            : "max-w-[18.75rem]",
          isHovered || isFocused || term
            ? "bg-green-500 text-green-50 placeholder:text-green-50"
            : "bg-green-50 text-green-500 placeholder:text-green-500",
          "focus:ring-0 focus:outline-none",
          "sm:max-w-[18.75rem] sm:focus:max-w-[25rem]",
          "max-w-full",
          inputClassName,
        )}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        {...props}
      />

      <MagnifyingGlassIcon
        className={clsx(
          "absolute top-1/2 h-5 w-5 -translate-y-1/2 transition-all duration-300 ease-in-out",
          isFocused || term
            ? "left-3 scale-100 opacity-100"
            : "left-10 scale-0 opacity-0",
          isHovered || isFocused || term ? "text-green-50" : "text-green-500",
        )}
        aria-hidden="true"
      />
    </div>
  );
}
