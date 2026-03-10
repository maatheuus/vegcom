"use client";

import Button from "@/shared/ui/Button";
import EmptyState from "@/shared/ui/EmptyState";
import Text from "@/shared/ui/Text";
import { HeartIcon, PlusIcon } from "@phosphor-icons/react";
import { BroomIcon } from "@phosphor-icons/react/dist/ssr";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

interface Props {
  isEmpty?: boolean;
  searchQuery?: string;
  isFavorites?: boolean;
  title?: string;
  description?: string;
}

export default function RecipeEmptyState({
  isFavorites,
  searchQuery,
  title,
  description,
}: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const onClearFilters = useCallback(() => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("q");
    params.set("clear_search", "true");

    router.push(`?${params.toString()}`, { scroll: false });
  }, [searchParams, router]);

  if (title) {
    return (
      <EmptyState
        title={title}
        description={description}
        animated
        className="min-h-[300px] rounded-2xl border border-dashed border-green-200 bg-green-50/50"
      />
    );
  }

  if (searchQuery && searchQuery.length > 0) {
    return (
      <div className="flex min-h-[250px] w-full flex-col items-center justify-center p-8 text-center">
        <div>
          <Text
            as="h3"
            type={Text.Type.HeadingFour}
            className="font-lora mb-2 font-semibold text-green-500"
          >
            Nenhum ingrediente encontrado
          </Text>
          <Text
            as="p"
            className="font-maitree max-w-md text-sm font-semibold text-green-500 opacity-80"
          >
            <strong>&quot;{searchQuery}&quot;</strong>
            {isFavorites
              ? "? Hmmm… Parece que essa receita ainda não foi descoberta!"
              : " não está na despensa. Será que vale improvisar?"}
          </Text>
        </div>
        <div className="mt-6 md:hidden">
          <Button.Icon
            onClick={onClearFilters}
            leftIcon={<BroomIcon />}
            className="font-lora"
          >
            Limpar busca
          </Button.Icon>
        </div>
      </div>
    );
  }

  return (
    <EmptyState
      title={
        isFavorites
          ? "Sua coleção de delícias está vazia"
          : "Sua cozinha parece um pouco solitária"
      }
      description={
        isFavorites
          ? "Explore as receitas e clique no coração para guardar suas favoritas aqui."
          : "Vamos encher essa panela! Adicione sua primeira receita e comece a criar seu livro de sabores."
      }
      action={
        <Button.Link
          href={isFavorites ? "/recipes" : "/recipes/new"}
          leftIcon={isFavorites ? <HeartIcon /> : <PlusIcon />}
        >
          {isFavorites ? "Explorar receitas" : "Adicionar Receita"}
        </Button.Link>
      }
      animated
      className="min-h-[300px] rounded-2xl border border-dashed border-green-200 bg-green-50/50"
    />
  );
}
