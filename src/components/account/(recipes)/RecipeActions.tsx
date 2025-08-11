import { food } from "@/assets";
import RecipeCard from "@/components/account/(recipes)/RecipeCard";
import type { DataRecipeCardAccount } from "../../../../app/(private)/account/recipes/page";
import RecipeEmptyState from "./RecipeEmptyState";
import RecipeFilter, { type SortValues } from "./RecipeFilter";

type SearchParams = {
  q?: string;
  sort?: SortValues;
};

interface Props {
  searchParams?: SearchParams;
  isFavorites?: boolean;
}

function normalizeSearchText(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

export default async function RecipeActions({
  searchParams,
  isFavorites,
}: Props) {
  const query = searchParams?.q || "";
  const sortBy = searchParams?.sort || "";

  let filteredData: DataRecipeCardAccount[] = mockExploreData;

  if (query) {
    filteredData = filteredData.filter((recipe) => {
      return (
        normalizeSearchText(recipe.title).includes(
          normalizeSearchText(query)
        ) ||
        normalizeSearchText(recipe.description ?? "").includes(
          normalizeSearchText(query)
        ) ||
        normalizeSearchText(recipe.recipeType ?? "").includes(
          normalizeSearchText(query)
        )
      );
    });
  }

  if (sortBy === "rating") {
    filteredData = [...filteredData].sort(
      (a, b) => (b.rating || 0) - (a.rating || 0)
    );
  } else if (sortBy === "views") {
    filteredData = [...filteredData].sort(
      (a, b) => (b.views || 0) - (a.views || 0)
    );
  } else if (sortBy === "recent") {
    filteredData = [...filteredData].sort(
      (a, b) =>
        new Date(b.updated_at!).getTime() - new Date(a.updated_at!).getTime()
    );
  }

  if (!filteredData) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <p className="text-gray-500">Carregando...</p>
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-col md:flex-row gap-4 w-full justify-start md:justify-between">
        <RecipeFilter />
      </div>

      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 w-full items-center justify-start">
        {filteredData.map((card, index) => (
          <RecipeCard
            key={index}
            data={card}
            isFavorites={isFavorites}
            className="col-span-1"
          />
        ))}
        {filteredData.length === 0 && (
          <RecipeEmptyState
            isFavorites={isFavorites}
            filteredData={filteredData}
            searchQuery={query}
          />
        )}
      </div>
    </>
  );
}

function getRandomDate(start: Date, end: Date): string {
  const date = new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  );
  return date.toISOString();
}

const mockExploreData: DataRecipeCardAccount[] = [
  {
    isFavorite: true,
    rating: 4.5,
    title: "Creamy Garlic Chicken",
    recipeImageUrl: food,
    user: {
      name: "Liam Smith",
      urlImage: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    views: 1203,
    description:
      "Frango suculento com molho de alho cremoso, perfeito para um jantar especial.",
    recipeType: "Janta",
    updated_at: getRandomDate(new Date("2025-01-01"), new Date()),
  },
  {
    isFavorite: false,
    rating: 3.9,
    title: "Avocado Toast Deluxe",
    recipeImageUrl: food,
    user: {
      name: "Liam Smith",
      urlImage: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    views: 982,
    description:
      "Torrada crocante com abacate temperado, ovos e toque de limão.",
    recipeType: "Café da manhã",
    updated_at: getRandomDate(new Date("2025-01-01"), new Date()),
  },
  {
    isFavorite: true,
    rating: 4.2,
    title: "Summer Berry Parfait",
    recipeImageUrl: food,
    user: {
      name: "Liam Smith",
      urlImage: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    views: 743,
    description:
      "Camadas de frutas vermelhas frescas, iogurte grego e granola crocante.",
    recipeType: "Sobremesa",
    updated_at: getRandomDate(new Date("2025-01-01"), new Date()),
  },
  {
    isFavorite: false,
    rating: 3.5,
    title: "Beef Stroganoff",
    recipeImageUrl: food,
    user: {
      name: "Liam Smith",
      urlImage: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    views: 1120,
    description: "Clássico russo com carne macia, cogumelos e creme de leite.",
    recipeType: "Almoço",
    updated_at: getRandomDate(new Date("2025-01-01"), new Date()),
  },
  {
    isFavorite: true,
    rating: 4.7,
    title: "Pão de Queijo Mineiro",
    recipeImageUrl: food,
    user: {
      name: "Liam Smith",
      urlImage: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    views: 1650,
    description:
      "Tradicional pão de queijo brasileiro com casquinha crocante e interior macio.",
    recipeType: "Café da tarde",
    updated_at: getRandomDate(new Date("2025-01-01"), new Date()),
  },
  {
    isFavorite: false,
    rating: 3.8,
    title: "Vegetarian Sushi Rolls",
    recipeImageUrl: food,
    user: {
      name: "Liam Smith",
      urlImage: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    views: 870,
    description:
      "Rolinhos de sushi com vegetais frescos, arroz temperado e alga nori.",
    recipeType: "Almoço",
    updated_at: getRandomDate(new Date("2025-01-01"), new Date()),
  },
  {
    isFavorite: true,
    rating: 4.0,
    title: "Panquecas de Banana Fit",
    recipeImageUrl: food,
    user: {
      name: "Liam Smith",
      urlImage: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    views: 1342,
    description:
      "Panquecas leves feitas com banana e aveia, perfeitas para começar o dia.",
    recipeType: "Café da manhã",
    updated_at: getRandomDate(new Date("2025-01-01"), new Date()),
  },
];
