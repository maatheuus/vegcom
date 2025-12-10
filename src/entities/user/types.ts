/**
 * User entity types
 */

/**
 * Represents a standard user in the system.
 */
export interface User {
  /** Unique identifier for the user. */
  id: string;
  /** Full name of the user. */
  name: string;
  /** Email address of the user. */
  email: string;
  /** Optional URL for the user's avatar image. */
  avatarUrl?: string;
  /** Optional biography or description. */
  bio?: string;
  /** Optional location string (e.g., "City, State"). */
  location?: string;
  /** Self-proclaimed culinary expertise level. */
  culinaryLevel?: "beginner" | "intermediate" | "advanced" | "professional";
  /** Timestamp when the user account was created (ISO string). */
  createdAt: string;
  /** Timestamp when the user account was last updated (ISO string). */
  updatedAt: string;
}

/**
 * Extended user profile with social statistics.
 */
export interface UserProfile extends User {
  /** Total number of recipes created by the user. */
  recipesCount?: number;
  /** Number of followers. */
  followersCount?: number;
  /** Number of users this user is following. */
  followingCount?: number;
  /** Number of favorite items (recipes, posts). */
  favoritesCount?: number;
}

/**
 * Represents the authentication payload for a user.
 */
export interface AuthUser {
  /** The authenticated user object. */
  user: User;
  /** The authentication token (e.g., JWT). */
  token: string;
}
