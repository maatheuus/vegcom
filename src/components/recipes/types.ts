import type { StaticImageData } from "next/image";

export interface Recipe {
  id: string;
  title: string;
  image: StaticImageData;
  rating?: number;
  category?: string;
  prepTime?: string;
  servings?: number;
  description?: string;
}

export interface RecipeGridProps {
  recipes?: Recipe[];
  onRecipeClick?: (recipe: Recipe) => void;
}


export interface Comment {
  id: number;
  author: string;
  avatarUrl?: string;
  timeAgo: string;
  content: string;
  likes: number;
}
