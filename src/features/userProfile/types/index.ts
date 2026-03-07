import { PostCardDataProps } from "@/shared/types";
import { RecipeCard } from "@/entities/recipe/types";

export interface UserProfileDetails {
  id: string;
  name: string;
  avatarUrl?: string;
  bio?: string;
  recipes: RecipeCard[];
  posts: PostCardDataProps[];
}
