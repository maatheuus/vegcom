"use client";

import {
  BroomOutlinedIcon,
  ChefHatOutlinedIcon,
  CookingPotOutlinedIcon,
  HeartOutlinedIcon,
  PlusOutlinedIcon,
  SearchOutlinedIcon,
  StarOutlinedIcon,
  UtensilsOutlinedIcon,
} from "@/components/icons";
import Button from "@/components/ui/Button";
import Text from "@/components/ui/Text";
import gsap from "gsap";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
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
  const iconRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);
  const floatingElementsRef = useRef<HTMLDivElement[]>([]);
  const tlRef = useRef<gsap.core.Timeline>(null);

  const [shouldAnimate, setShouldAnimate] = useState(false);
  const [cleanSearchParams, setCleanSearchParams] = useState(false);

  const router = useRouter();
  const searchParams = useSearchParams();
  const isSearchEmpty = searchQuery && searchQuery.length > 0;

  const recipeIcons = [CookingPotOutlinedIcon, UtensilsOutlinedIcon];
  const favoritesIcons = [HeartOutlinedIcon, StarOutlinedIcon];

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());

    if (cleanSearchParams && params.has("q")) {
      params.set("clean_all", "true");
    }

    if (!params.has("q") && params.has("clean_all")) {
      setCleanSearchParams(false);
      params.delete("clean_all");
    }

    router.push(`?${params}`, { scroll: false });
  }, [searchParams, cleanSearchParams]);

  const onClearFilters = () => {
    setCleanSearchParams(true);
  };

  const animateEmptyState = () => {
    if (!containerRef.current) return;

    tlRef.current = gsap.timeline();

    gsap.set([iconRef.current, textRef.current, buttonRef.current], {
      opacity: 0,
      y: 20,
      scale: 0.9,
    });

    gsap.set(floatingElementsRef.current, {
      opacity: 0,
      scale: 0.8,
      y: 10,
    });

    tlRef.current
      .to(iconRef.current, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        ease: "power2.out",
      })
      .to(
        textRef.current,
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          ease: "power2.out",
        },
        "-=0.4"
      )
      .to(
        buttonRef.current,
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          ease: "power2.out",
        },
        "-=0.3"
      )
      .to(
        floatingElementsRef.current,
        {
          opacity: 0.3,
          scale: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.1,
          ease: "power2.out",
        },
        "-=0.2"
      );

    floatingElementsRef.current.forEach((el, index) => {
      if (el) {
        gsap.to(el, {
          y: -8,
          duration: 2 + Math.random(),
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
          delay: 1.5 + index * 0.2,
        });
      }
    });
  };

  useEffect(() => {
    if (tlRef.current) {
      tlRef.current.kill();
    }

    if (filteredData.length === 0) {
      const timer = setTimeout(() => {
        setShouldAnimate(true);
        animateEmptyState();
      }, 100);

      return () => clearTimeout(timer);
    } else {
      setShouldAnimate(false);
    }
  }, [filteredData.length]);

  useEffect(() => {
    return () => {
      if (tlRef.current) {
        tlRef.current.kill();
      }
    };
  }, []);

  if (isSearchEmpty) {
    return (
      <div
        ref={containerRef}
        className="col-span-4 flex flex-col items-center justify-center min-h-[300px] relative p-8"
      >
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              ref={(el) => {
                if (el && shouldAnimate) floatingElementsRef.current[i] = el;
              }}
              className="absolute"
              style={{
                left: `${20 + i * 20}%`,
                top: `${20 + i * 15}%`,
              }}
            >
              <SearchOutlinedIcon className="w-6 h-6 text-slate-300" />
            </div>
          ))}
        </div>

        <div
          ref={iconRef}
          className="mb-2 p-6 rounded-full bg-gradient-to-br from-emerald-50 to-slate-50 border border-emerald-100"
        >
          <SearchOutlinedIcon className="w-12 h-12 text-slate-400" />
        </div>

        <div ref={textRef} className="text-center">
          <Text
            as="h3"
            weight={Text.Weight.Medium}
            type={Text.Type.HeadingFour}
            className="mb-2 text-green-500"
          >
            Ops... a cozinha está vazia
          </Text>
          <Text
            as="p"
            type={Text.Type.BodyFour}
            className="text-green-500 text-sm max-w-md leading-relaxed"
          >
            <span className="font-medium">&quot;{searchQuery}&quot;</span>
            {isFavorites
              ? "? Hmmm… Parece que essa receita ainda não foi descoberta!"
              : "não está na despensa. Será que vale improvisar?"}
          </Text>
        </div>

        <div ref={buttonRef}>
          <Button.Icon
            onClick={onClearFilters}
            className="px-6 py-3 rounded-xl flex items-center group overflow-hidden mt-4"
            leftIcon={
              <BroomOutlinedIcon className="w-4 h-4 absolute scale-100 group-hover:scale-125 -translate-x-40 left-1/2 group-hover:translate-x-[-50%] transition-transform duration-500" />
            }
          >
            <Text
              as="span"
              type={Text.Type.BodyFour}
              weight={Text.Weight.Bold}
              className="group-hover:-translate-y-24 transition-transform duration-500"
            >
              Começar do zero
            </Text>
          </Button.Icon>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="col-span-4 flex flex-col items-center justify-center min-h-[350px] relative p-8"
    >
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {(isFavorites ? favoritesIcons : recipeIcons).map((Icon, i) => (
          <div
            key={i}
            ref={(el) => {
              if (el && shouldAnimate) floatingElementsRef.current[i] = el;
            }}
            className="absolute"
            style={{
              left: `${30 + i * 40}%`,
              top: `${15 + i * 20}%`,
            }}
          >
            <Icon className="w-8 h-8 text-green-500" />
          </div>
        ))}
      </div>

      <div
        ref={iconRef}
        className="mb-6 p-6 rounded-2xl bg-gradient-to-br from-emerald-50 to-slate-50 border border-emerald-100"
      >
        <ChefHatOutlinedIcon className="w-16 h-16 text-green-500" />
      </div>

      <div ref={textRef} className="text-center mb-6">
        <Text
          as="h3"
          weight={Text.Weight.Medium}
          type={Text.Type.HeadingFour}
          className="mb-2 text-green-500"
        >
          {isFavorites
            ? "Seu coração culinário está vazio"
            : "Caderno de receitas esperando histórias"}
        </Text>
        <Text
          as="p"
          type={Text.Type.BodyFour}
          className="text-green-500 text-sm max-w-md leading-relaxed"
        >
          {isFavorites
            ? " Marque suas receitas favoritas e crie sua coleção especial de sabores que conquistaram seu paladar"
            : "Adicione sua primeira receita e transforme este espaço no seu cantinho culinário. Comece com uma receita que faça você sorrir só de lembrar."}
        </Text>
      </div>

      <div ref={buttonRef} className="w-full flex justify-center">
        <Button.Link
          href="/recipes/new"
          size="lg"
          className="px-6 py-3 rounded-xl flex items-center group overflow-hidden"
          leftIcon={
            isFavorites ? (
              <HeartOutlinedIcon className="w-4 h-4 absolute -translate-x-32 scale-100 group-hover:scale-125 group-hover:translate-x-[25%] transition-transform duration-500" />
            ) : (
              <PlusOutlinedIcon className="w-4 h-4 absolute -translate-x-32 scale-100 group-hover:scale-125 group-hover:translate-x-[25%] transition-transform duration-500" />
            )
          }
        >
          <Text
            as="span"
            type={Text.Type.BodyFour}
            weight={Text.Weight.Bold}
            className="group-hover:-translate-y-24 transition-transform duration-500"
          >
            {isFavorites ? "Explorar receitas" : "Encher o prato"}
          </Text>
        </Button.Link>
      </div>

      {!isFavorites && (
        <div className="mt-4 text-xs text-slate-400 flex items-center gap-1">
          <UtensilsOutlinedIcon className="w-3 h-3" />
          <span>Dica: O prato favorito é sempre um ótimo começo</span>
        </div>
      )}
    </div>
  );
}
