export enum MealType {
  BREAKFAST = "BREAKFAST",
  LUNCH = "LUNCH",
  DINNER = "DINNER",
  DESSERT = "DESSERT",
  GENERAL = "GENERAL",
}
export enum PrepTimeCategory {
  QUICK = "QUICK",
  ELABORATE = "ELABORATE",
}

export interface RecipeSteps {
  ingredients: string[];
  instructions: string[];
  cookingNotes: string[];
}

export interface Recipe {
  id: number;
  userId: number;
  title: string;
  description: string;
  cookTime: string;
  prepTimeCategory?: PrepTimeCategory;
  quantity: string;
  category: string;
  difficulty: string;
  images: string[];
  steps: RecipeSteps;
  mealType?: MealType;
  isPublished: boolean;
  views: number;
  rating: number;
  createdAt: string;
  updatedAt: string;
}

export interface RecipeUser {
  id: number;
  name: string;
  email: string;
}

export interface RecipeComment {
  id: number;
  userId: number;
  recipeId: number;
  content: string;
  createdAt: string;
  user: RecipeUser;
  likesCount: number;
  isLikedByCurrentUser: boolean;
}

export interface DetailedRecipe extends Recipe {
  user: RecipeUser;
  comments: RecipeComment[];
  averageRating: number;
  totalComments: number;
}

export interface CreateRecipePayload {
  userId: number;
  title: string;
  description: string;
  cookTime: string;
  quantity: string;
  category: string;
  difficulty: string;
  images: string[];
  steps: RecipeSteps;
  mealType?: MealType;
}

export interface UpdateRecipePayload extends Partial<CreateRecipePayload> {
  userId: number;
}

export interface CreateRecipeResponse {
  success: boolean;
  data: {
    id: number;
    title: string;
    description: string;
    category: string;
    difficulty: string;
    images: string[];
    steps: RecipeSteps;
    createdAt: string;
  };
}
export interface GetRecipesResponse {
  success: boolean;
  data: Recipe[];
  meta: {
    page: number;
    limit: number;
    total: number;
  };
}
export interface GetRecipeByIdResponse {
  success: boolean;
  data: DetailedRecipe;
}
export interface FavoriteRecipeResponse {
  saved: boolean;
}

export interface RecipeFilterDto {
  mealType?: MealType;
  prepTimeCategory?: PrepTimeCategory;
  sort?: "popular" | "rated" | "newest";
}
