import { useMutation, useQuery } from "@tanstack/react-query";
import { subscriptionApi } from "../subscriptionApi";

export const subscriptionKeys = {
  all: ["subscriptions"] as const,
  products: () => [...subscriptionKeys.all, "products"] as const,
};

export const useGetProducts = () => {
  return useQuery({
    queryKey: subscriptionKeys.products(),
    queryFn: subscriptionApi.getProducts,
  });
};

export const useCreateCheckoutSession = () => {
  return useMutation({
    mutationFn: subscriptionApi.createCheckoutSession,
  });
};

export const useCreatePortalSession = () => {
  return useMutation({
    mutationFn: subscriptionApi.createPortalSession,
  });
};
