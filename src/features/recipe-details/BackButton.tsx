"use client";

import Button from "@/shared/ui/Button";
import { CaretLeftIcon } from "@phosphor-icons/react";
import { useRouter } from "next/navigation";

export default function BackButton() {
  const router = useRouter();

  return (
    <Button
      variant="text"
      onClick={() => router.back()}
      className="w-fit gap-x-2 pl-0 hover:bg-transparent hover:text-green-700"
    >
      <CaretLeftIcon size={20} />
      Voltar
    </Button>
  );
}
