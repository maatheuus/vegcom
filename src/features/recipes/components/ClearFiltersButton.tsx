"use client";

import Button from "@/shared/ui/Button";
import { XIcon } from "@phosphor-icons/react";
import clsx from "clsx";
import { useRouter, useSearchParams } from "next/navigation";

interface ClearFiltersButtonProps {
  className?: string;
}

export function ClearFiltersButton({ className }: ClearFiltersButtonProps) {
  const searchParams = useSearchParams();
  const router = useRouter();

  const hasFilters =
    searchParams.has("q") ||
    searchParams.has("category") ||
    searchParams.has("sort");

  if (!hasFilters) return null;

  const handleClear = () => {
    router.replace("?", { scroll: false });
  };

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
