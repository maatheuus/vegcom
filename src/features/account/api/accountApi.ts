/**
 * Account API - Fake implementation
 * Replace with real API calls when backend is ready
 */

import { mockCurrentUser, type UserProfile } from "@/entities/user";
import { mockDelay } from "@/shared/api/mock";
import type { UpdateProfileData } from "../types";

/**
 * Retrieves the profile of the currently logged-in user.
 *
 * @returns {Promise<UserProfile>} A promise resolving to the current user's profile.
 */
export const getUserProfile = async (): Promise<UserProfile> => {
  await mockDelay(800);
  return mockCurrentUser;
};

/**
 * Updates the user's profile information.
 *
 * @param {UpdateProfileData} data - The data to update.
 * @returns {Promise<UserProfile>} A promise resolving to the updated user profile.
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
 * Retrieves a list of recipes created by a specific user.
 *
 * @param {string} userId - The ID of the user.
 * @returns {Promise<unknown[]>} A promise resolving to the list of recipes (currently empty mock).
 */
export const getUserRecipes = async (userId: string): Promise<unknown[]> => {
  await mockDelay(800);
  console.log("Fetching recipes for user:", userId);
  return [];
};

/**
 * Retrieves a list of items favorited by a specific user.
 *
 * @param {string} userId - The ID of the user.
 * @returns {Promise<unknown[]>} A promise resolving to the list of favorites (currently empty mock).
 */
export const getUserFavorites = async (userId: string): Promise<unknown[]> => {
  await mockDelay(800);
  console.log("Fetching favorites for user:", userId);
  return [];
};
