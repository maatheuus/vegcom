/**
 * Account feature types
 */

export * from "@/entities/user";

/**
 * Data required to update a user's profile.
 * All fields are optional.
 */
export interface UpdateProfileData {
  /** The new name for the user. */
  name?: string;
  /** The new bio for the user. */
  bio?: string;
  /** The new location for the user. */
  location?: string;
  /** The new culinary skill level. */
  culinaryLevel?: "beginner" | "intermediate" | "advanced" | "professional";
  /** The new avatar URL. */
  avatarUrl?: string;
}
