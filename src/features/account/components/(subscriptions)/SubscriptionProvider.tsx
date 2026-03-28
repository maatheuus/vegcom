"use client";

import { useGetUser } from "@/features/auth/api/queries/getAuthApiClient";
import { hasActiveSubscription } from "@/features/auth/api/types";
import type { GetProductsResponse } from "../../types/subscription";
import NotSubscribedView from "./NotSubscribedView";
import SubscribedView from "./SubscribedView";

interface Props {
  productsData?: GetProductsResponse["data"];
}

export default function SubscriptionProvider({ productsData }: Props) {
  const { data: user } = useGetUser();
  const isSubscribed = hasActiveSubscription(user?.subscription);

  if (!user) return;

  return isSubscribed ? (
    <SubscribedView user={user} />
  ) : (
    <NotSubscribedView user={user} productsData={productsData} />
  );
}
