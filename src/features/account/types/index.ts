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
  BEGINNER = "beginner",
  INTERMEDIATE = "intermediate",
  ADVANCED = "advanced",
  PRO = "pro",
}

export enum Preference {
  VEGETARIAN = "vegetarian",
  VEGAN = "vegan",
  OTHER = "other",
}
