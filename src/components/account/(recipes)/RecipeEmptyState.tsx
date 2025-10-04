"use client";

import {
  BroomOutlinedIcon,
  HeartOutlinedIcon,
  PlusOutlinedIcon,
} from "@/components/icons";
import Button from "@/components/ui/Button";
import Text from "@/components/ui/Text";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import type { DataRecipeCardAccount } from "../../../../app/(private)/account/recipes/page";

interface Props {
  filteredData: DataRecipeCardAccount[];
  searchQuery?: string;
  isFavorites?: boolean;
}

export default function RecipeEmptyState({
  filteredData,
  isFavorites,
  searchQuery,
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);
  const potRef = useRef<HTMLDivElement>(null);
  const tearRef = useRef<HTMLDivElement>(null);

  const [shouldAnimate, setShouldAnimate] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  const onClearFilters = useCallback(() => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("q");
    params.set("clear_search", "true");

    router.push(`?${params.toString()}`, { scroll: false });
  }, [searchParams, router]);

  useGSAP(
    () => {
      if (!shouldAnimate) return;

      const tl = gsap.timeline();

      tl.to(potRef.current, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1,
        ease: "bounce.out",
      })
        .to(
          tearRef.current,
          { opacity: 1, y: 20, duration: 0.5, ease: "power2.out" },
          "-=0.5",
        )
        .to(tearRef.current, { opacity: 0, duration: 0.5 }, "-=0.2")
        .to(
          textRef.current,
          { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
          "-=0.8",
        )
        .to(
          buttonRef.current,
          { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
          "-=0.5",
        );

      gsap.to(potRef.current, {
        rotate: -1.5,
        yoyo: true,
        repeat: -1,
        duration: 2.5,
        ease: "sine.inOut",
        delay: 1,
      });
    },
    { dependencies: [shouldAnimate], scope: containerRef },
  );

  useEffect(() => {
    if (filteredData.length === 0) {
      const timer = setTimeout(() => setShouldAnimate(true), 100);
      return () => clearTimeout(timer);
    } else {
      setShouldAnimate(false);
    }
  }, [filteredData.length]);

  if (searchQuery && searchQuery.length > 0) {
    return (
      <div
        ref={containerRef}
        className="col-span-full flex min-h-[250px] flex-col items-center justify-center p-8 text-center"
      >
        <div ref={textRef} className="opacity-0">
          <Text
            as="h3"
            type={Text.Type.HeadingFour}
            className="font-lora mb-2 font-semibold text-green-500"
          >
            Nenhum ingrediente encontrado
          </Text>
          <Text
            as="p"
            className="font-maitree max-w-md text-sm font-semibold text-green-500/80"
          >
            <strong>&quot;{searchQuery}&quot;</strong>
            {isFavorites
              ? "? Hmmm… Parece que essa receita ainda não foi descoberta!"
              : " não está na despensa. Será que vale improvisar?"}
          </Text>
        </div>
        <div ref={buttonRef} className="mt-6 opacity-0">
          <Button.Icon
            onClick={onClearFilters}
            leftIcon={<BroomOutlinedIcon />}
            className="font-lora"
          >
            Limpar busca
          </Button.Icon>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="col-span-full flex min-h-[400px] flex-col items-center justify-center p-8 text-center"
    >
      <div ref={textRef} className="opacity-0">
        <Text as="h3" className="mb-2 text-xl font-semibold text-green-500">
          {isFavorites
            ? "Sua coleção de delícias está vazia"
            : "Sua cozinha parece um pouco solitária"}
        </Text>
        <Text as="p" className="max-w-md text-sm text-green-500/80">
          {isFavorites
            ? "Explore as receitas e clique no coração para guardar suas favoritas aqui."
            : "Vamos encher essa panela! Adicione sua primeira receita e comece a criar seu livro de sabores."}
        </Text>
      </div>
      <div ref={buttonRef} className="mt-6 opacity-0">
        <Button.Link
          href={isFavorites ? "/recipes" : "/recipes/new"}
          leftIcon={isFavorites ? <HeartOutlinedIcon /> : <PlusOutlinedIcon />}
        >
          {isFavorites ? "Explorar receitas" : "Adicionar Receita"}
        </Button.Link>
      </div>
    </div>
  );
}
