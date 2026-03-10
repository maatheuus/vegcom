"use client";

import Button from "@/shared/ui/Button";
import clsx from "clsx";
import { useRouter, useSearchParams } from "next/navigation";

export function SelectCategoryItem({ item }: { item: string }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentCategory = searchParams.get("category");
  const isSelected = currentCategory === item;

  function handleClick(category: string) {
    const params = new URLSearchParams(searchParams.toString());

    if (isSelected) {
      params.delete("category");
    } else {
      params.set("category", category);
    }

    params.delete("page");

    router.replace(`?${params.toString()}`, { scroll: false });
  }

  return (
    <Button
      key={item}
      onClick={() => handleClick(item)}
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
