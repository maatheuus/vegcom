import type { CulinaryLevel } from "@/features/account";

export interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  bio?: string;
  location?: string;
  culinaryLevel?: CulinaryLevel;
  createdAt: string;
  updatedAt: string;
}

export interface UserProfile extends User {
  recipesCount?: number;
  followersCount?: number;
  followingCount?: number;
  favoritesCount?: number;
}

export interface AuthUser {
  user: User;
  token: string;
}
