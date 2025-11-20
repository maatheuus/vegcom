"use client";

import { useState } from "react";
import NotSubscribedView from "./NotSubscribedView";
import SubscribedView from "./SubscribedView";

export default function SubscriptionProvider() {
  const [isSubscribed, setIsSubscribed] = useState(false);
  return isSubscribed ? <SubscribedView /> : <NotSubscribedView />;
}
