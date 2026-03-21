import { type User, hasActiveSubscription } from "@/features/auth/api/types";
import type { GetProductsResponse } from "../../types/subscription";
import NotSubscribedView from "./NotSubscribedView";
import SubscribedView from "./SubscribedView";

interface Props {
  user: User;
  productsData?: GetProductsResponse["data"];
}

export default function SubscriptionProvider({ user, productsData }: Props) {
  const isSubscribed = hasActiveSubscription(user.subscription);

  return isSubscribed ? (
    <SubscribedView user={user} />
  ) : (
    <NotSubscribedView user={user} productsData={productsData} />
  );
}
