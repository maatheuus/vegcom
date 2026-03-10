export * from "@/entities/user";

export interface UpdateProfileData {
  name?: string;
  bio?: string;
  location?: string;
  culinaryLevel?: CulinaryLevel;
  preference?: Preference;
  avatarUrl?: string;
}

export enum CulinaryLevel {
  BEGINNER = "BEGINNER",
  INTERMEDIATE = "INTERMEDIATE",
  ADVANCED = "ADVANCED",
}

export enum Preference {
  VEGETARIAN = "VEGETARIAN",
  VEGAN = "VEGAN",
  OTHER = "OTHER",
}
