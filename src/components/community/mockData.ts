import { food } from "@/assets";
import type { DataRecipeCard } from "../@types";

export const mockTrendingData: DataRecipeCard[] = [
  {
    isFavorite: true,
    rating: 4.8,
    title: "Creamy Mushroom Risotto",
    recipeImageUrl: food,
    user: {
      name: "Emma Johnson",
      urlImage: "https://randomuser.me/api/portraits/women/68.jpg",
    },
    views: 1320,
  },
];

export const mockExploreData: DataRecipeCard[] = [
  {
    isFavorite: false,
    rating: 3.2,
    title: "Spicy Thai Noodles",
    recipeImageUrl: food,
    user: {
      name: "Liam Smith",
      urlImage: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    views: 875,
  },
];
