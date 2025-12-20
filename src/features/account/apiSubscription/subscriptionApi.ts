import { api } from "@/shared/api/axios/axiosInstance";
import type {
  CreateCheckoutSessionResponse,
  CreatePortalSessionResponse,
  GetProductsResponse,
} from "../types/subscription";

export const subscriptionApi = {
  getProducts: async () => {
    const { data } = await api.get<GetProductsResponse>("/stripe/products");
    return data;
  },

  createCheckoutSession: async ({
    userId,
    priceId,
    email,
  }: {
    userId: number;
    priceId: string;
    email: string;
  }) => {
    const { data } = await api.post<CreateCheckoutSessionResponse>(
      "/stripe/checkout",
      { userId, priceId, email },
    );
    return data;
  },

  createPortalSession: async (userId: number) => {
    const { data } = await api.get<CreatePortalSessionResponse>(
      "/stripe/portal",
      {
        data: { userId },
      },
    );
    return data;
  },
};
