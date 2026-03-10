"use client";

import Button from "@/shared/ui/Button";
import Text from "@/shared/ui/Text";
import { useGSAP } from "@gsap/react";
import { CookingPotIcon } from "@phosphor-icons/react/dist/ssr";
import gsap from "gsap";
import { useRef } from "react";

interface Props {
  title?: string;
  description?: string;
  actionLabel?: string;
  actionLink?: string;
}

export default function RecipeEmptyState({
  title = "Nenhuma receita encontrada",
  description = "Parece que ainda não temos receitas nesta categoria.",
  actionLabel,
  actionLink,
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const iconRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline();

      tl.fromTo(
        iconRef.current,
        {
          y: -20,
          opacity: 0,
          scale: 0.8,
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          ease: "elastic.out(1, 0.5)",
        },
      ).fromTo(
        contentRef.current,
        {
          y: 20,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          ease: "power2.out",
        },
        "-=0.4",
      );
    },
    { scope: containerRef },
  );

  return (
    <div
      ref={containerRef}
      className="flex min-h-[300px] w-full flex-col items-center justify-center gap-6 bg-green-50/50 p-8 text-center"
    >
      <div
        ref={iconRef}
        className="flex h-20 w-20 items-center justify-center rounded-full bg-green-100/80 text-green-600 shadow-sm"
      >
        <CookingPotIcon size={40} weight="duotone" />
      </div>

      <div ref={contentRef} className="max-w-md space-y-2 opacity-0">
        <Text
          as="h3"
          className="font-maitree text-xl font-semibold text-green-500 md:text-2xl"
        >
          {title}
        </Text>
        <Text as="p" className="font-lora text-green-500/80">
          {description}
        </Text>

        {actionLabel && actionLink ? (
          <div className="pt-4">
            <Button.Link
              href={actionLink}
              className="bg-green-500 py-2 text-green-50 hover:bg-green-100 hover:text-green-500"
            >
              {actionLabel}
            </Button.Link>
          </div>
        ) : (
          <div className="pt-4">
            <Button.Link
              href="/new-recipe"
              className="bg-green-500 py-2 text-green-50 hover:bg-green-100 hover:text-green-500"
            >
              Adicionar receita
            </Button.Link>
          </div>
        )}
      </div>
    </div>
  );
}
