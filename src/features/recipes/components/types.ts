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
  views?: number;
}

export interface RecipeGridProps {
  recipes: Recipe[];
}

export interface Comment {
  id: number;
  author: string;
  avatarUrl?: string;
  timeAgo: string;
  content: string;
  likes: number;
}
