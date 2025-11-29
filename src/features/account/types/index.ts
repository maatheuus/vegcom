/**
 * Account feature types
 */

export * from "@/entities/user";

export interface UpdateProfileData {
  name?: string;
  bio?: string;
  location?: string;
  culinaryLevel?: "beginner" | "intermediate" | "advanced" | "professional";
  avatarUrl?: string;
}
