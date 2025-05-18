"use client";

import Button from "../ui/Button";

export function SelectCategoryItem({ item }: { item: string }) {
   function handleClick(category: string) {
     console.log(category);
   }

  return (
    <Button
      key={item}
      onClick={() => handleClick(item)}
      variant="text"
      className="block w-full text-left font-medium cursor-pointer text-green-200 hover:text-green-500 text-sm py-2 px-2 transition-colors"
    >
      {item}
    </Button>
  );
}