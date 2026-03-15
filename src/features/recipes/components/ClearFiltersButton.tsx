"use client";

import Button from "@/shared/ui/Button";
import { XIcon } from "@phosphor-icons/react";
import clsx from "clsx";
import { useRouter, useSearchParams } from "next/navigation";

interface ClearFiltersButtonProps {
  className?: string;
}
const FILTER_PARAMS = [
  "q",
  "mealType",
  "prepTime",
  "highlight",
  "sort",
  "page",
];

export function ClearFiltersButton({ className }: ClearFiltersButtonProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const hasFilters = FILTER_PARAMS.some((p) => searchParams.has(p));

  if (!hasFilters) return null;

  function handleClear() {
    const params = new URLSearchParams(searchParams.toString());
    FILTER_PARAMS.forEach((p) => params.delete(p));
    router.replace(`?${params.toString()}`, { scroll: false });
  }

  return (
    <Button.Icon
      onClick={handleClear}
      variant="outline"
      className={clsx(
        "size-fit! rounded-full border-green-500 bg-green-50 px-1! py-1! text-green-500 transition-colors hover:bg-green-500 hover:text-green-50",
        className,
      )}
      icon={<XIcon size={12} />}
    />
  );
}
