import type { Recipe } from "../api/types";
export type { Recipe };

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
