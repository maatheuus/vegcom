export interface ApiResponse<T> {
  success: boolean;
  data: T;
}

export interface User {
  id: number;
  name: string;
  email: string;
  hasSubscription: boolean;
  recipesCount: number;
  informations: UserInformations;
  savedRecipes: any[];
  recipes: any[];
  chats: Chat[];
  createdAt: string;
  updatedAt: string;
}

export interface UserInformations {
  meetUs: string;
  location: string;
  aboutInfo: string;
  preference: string;
  culinaryLevel: string;
}

export interface Chat {
  id: number;
}
