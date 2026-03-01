"use client";

import { ArrowLeftIcon } from "@phosphor-icons/react";
import Link from "next/link";

export default function BackToCommunityButton() {
  return (
    <Link
      href="/community"
      className="mb-2 flex w-fit items-center gap-x-2 rounded-full bg-green-100 p-3 text-green-200 transition-colors duration-200 hover:text-green-500 md:ml-4 md:bg-transparent md:px-0 md:py-2"
    >
      <ArrowLeftIcon size={20} weight="bold" />
      <span className="font-lora hidden text-sm font-medium md:inline">
        Voltar a comunidade
      </span>
    </Link>
  );
}
