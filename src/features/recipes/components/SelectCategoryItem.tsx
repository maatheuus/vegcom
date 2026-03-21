"use client";

import Button from "@/shared/ui/Button";
import clsx from "clsx";
import { useRouter, useSearchParams } from "next/navigation";

export function SelectCategoryItem({
  item,
  paramKey,
}: {
  item: string;
  paramKey: string;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const current = searchParams.get(paramKey);
  const isSelected = current === item;

  function handleClick() {
    const params = new URLSearchParams(searchParams.toString());

    if (isSelected) {
      params.delete(paramKey);
    } else {
      params.set(paramKey, item);
    }

    params.delete("page");
    router.replace(`?${params.toString()}`, { scroll: false });
  }

  return (
    <Button
      onClick={handleClick}
      variant="text"
      className={clsx(
        "block w-full cursor-pointer px-2 py-2 text-left text-sm font-medium transition-colors",
        isSelected
          ? "rounded-md bg-green-500 text-green-50 hover:bg-green-600 hover:text-green-50"
          : "text-green-200 hover:text-green-500",
      )}
    >
      {item}
    </Button>
  );
}
