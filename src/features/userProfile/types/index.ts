import { Recipe } from "@/entities/recipe/types";
import type { UserInformations } from "@/features/auth/api/types";
import { PostCardDataProps } from "@/shared/types";

export interface UserProfileDetails {
  id: string;
  name: string;
  informations: UserInformations;
  recipes: Recipe[];
  posts: PostCardDataProps[];
}
