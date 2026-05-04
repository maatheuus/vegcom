"use client";

import { useNavigationHistory } from "@/shared/providers/NavigationHistoryProvider";
import Button from "@/shared/ui/Button";
import { CaretLeftIcon } from "@phosphor-icons/react";

export default function BackButton() {
  const { goBack } = useNavigationHistory();

  return (
    <Button
      variant="text"
      onClick={() => goBack("/recipes")}
      className="w-fit gap-x-2 pl-0 hover:bg-transparent hover:text-green-700"
    >
      <CaretLeftIcon size={20} />
      Voltar
    </Button>
  );
}
