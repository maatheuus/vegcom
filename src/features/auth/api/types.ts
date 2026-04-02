import type { CulinaryLevel, Preference } from "@/features/account";

export interface ApiResponse<T> {
  success: boolean;
  data: T;
}

export type SubscriptionStatus =
  | "active"
  | "canceled"
  | "past_due"
  | "trialing"
  | "incomplete"
  | "incomplete_expired"
  | "unpaid";

export interface SubscriptionData {
  stripeCustomerId: string;
  stripeSubscriptionId: string;
  status: SubscriptionStatus;
  startedAt: string;
  expiresAt: string | null;
  currentInvoiceAmount: number;
  currency: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  subscription?: SubscriptionData;
  recipesCount: number;
  informations: UserInformations;
  savedRecipes: { id: number; savedRecipeId: number }[];
  recipes: Record<string, number>[];
  chats: Chat[];
  createdAt: string;
  updatedAt: string;
}

export function hasActiveSubscription(
  subscription: SubscriptionData | null | undefined,
): boolean {
  return (
    subscription?.status === "active" || subscription?.status === "trialing"
  );
}

export interface UserInformations {
  meetUs: string;
  location: string;
  aboutInfo: string;
  preference: Preference;
  culinaryLevel: CulinaryLevel;
  avatarUrl?: string;
}

export interface Chat {
  id: number;
}
