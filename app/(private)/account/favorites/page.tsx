import RecipeActions from "@/components/account/(recipes)/RecipeActions";
import type { SortValues } from "@/components/account/(recipes)/RecipeFilter";
import LayoutAccount from "@/components/account/LayoutAccount";
import { HeartOutlinedIcon } from "@/components/icons";
import Button from "@/components/ui/Button";

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
      <LayoutAccount pathName="favorites" title="Receitas favoritas">
        <Button.Link
          href="/recipes"
          size="md"
          className="font-lora py-1.5"
          leftIcon={<HeartOutlinedIcon className="!size-5" />}
        >
          Explorar receitas
        </Button.Link>
      </LayoutAccount>

      <RecipeActions isFavorites searchParams={resolvedSearchParams} />
    </>
  );
}
