"use server";

import { serverFetch } from "@/shared/api/axios/serverFetch";
import type {
  CreateCheckoutSessionResponse,
  CreatePortalSessionResponse,
  GetProductsResponse,
} from "../../types/subscription";

export const getProducts = async () => {
  return serverFetch<GetProductsResponse>("/stripe/products", {
    method: "GET",
    next: { tags: ["products"] },
    skipRedirectOn401: true,
  }).catch(() => {
    return {
      success: false,
      data: [],
    } as GetProductsResponse;
  });
};

export const createCheckoutSession = async (payload: {
  userId: number;
  priceId: string;
  email: string;
}) => {
  return serverFetch<CreateCheckoutSessionResponse>("/stripe/checkout", {
    method: "POST",
    body: payload,
  });
};

export const createPortalSession = async (userId: number) => {
  return serverFetch<CreatePortalSessionResponse>("/stripe/portal", {
    method: "POST",
    body: { userId },
  });
};
