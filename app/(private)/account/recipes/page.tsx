import type { DataRecipeCard } from "@/components/@types";
import RecipeActions from "@/components/account/(recipes)/RecipeActions";
import type { SortValues } from "@/components/account/(recipes)/RecipeFilter";
import LayoutAccount from "@/components/account/LayoutAccount";
import { PlusOutlinedIcon } from "@/components/icons";

import Button from "@/components/ui/Button";
export interface DataRecipeCardAccount extends DataRecipeCard {
  description?: string;
  recipeType?: string;
  updated_at?: string;
}

type SearchParams = {
  q?: string;
  sort?: SortValues;
};

interface Props {
  searchParams?: Promise<SearchParams>;
}

export default async function Page({ searchParams }: Props) {
  const resolvedSearchParams = await searchParams;

  return (
    <>
      <LayoutAccount pathName="recipes" title="Suas 3 receitas">
        <Button.Link
          leftIcon={<PlusOutlinedIcon className="!size-5" />}
          size="md"
          className="py-1.5"
          href="/new-recipe"
        >
          Nova receita
        </Button.Link>
      </LayoutAccount>

      <RecipeActions searchParams={resolvedSearchParams} />
    </>
  );
}
