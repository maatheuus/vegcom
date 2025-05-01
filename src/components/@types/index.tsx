import type { StaticImageData } from "next/image";

export interface DataRecipeCard {
  isFavorite?: boolean;
  rating?: number;
  title: string;
  recipeImageUrl: string | StaticImageData;
  user: {
    name: string;
    urlImage: string;
  };
  views?: number;
}