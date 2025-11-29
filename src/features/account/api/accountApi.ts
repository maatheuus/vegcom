/**
 * Account API - Fake implementation
 * Replace with real API calls when backend is ready
 */

import { mockCurrentUser, type UserProfile } from "@/entities/user";
import { mockDelay } from "@/shared/api/mock";
import type { UpdateProfileData } from "../types";

/**
 * Get current user profile
 */
export const getUserProfile = async (): Promise<UserProfile> => {
  await mockDelay(800);
  return mockCurrentUser;
};

/**
 * Update user profile
 */
export const updateUserProfile = async (
  data: UpdateProfileData,
): Promise<UserProfile> => {
  await mockDelay(1000);

  return {
    ...mockCurrentUser,
    ...data,
    updatedAt: new Date().toISOString(),
  };
};

/**
 * Get user's recipes
 */
export const getUserRecipes = async (userId: string): Promise<unknown[]> => {
  await mockDelay(800);
  console.log("Fetching recipes for user:", userId);
  return [];
};

/**
 * Get user's favorites
 */
export const getUserFavorites = async (userId: string): Promise<unknown[]> => {
  await mockDelay(800);
  console.log("Fetching favorites for user:", userId);
  return [];
};
