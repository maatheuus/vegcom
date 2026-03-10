"use client";

import { UserProfileContent } from "@/features/userProfile/components/UserProfileContent";
import { UserProfileTabs } from "@/features/userProfile/components/UserProfileTabs";
import type { UserProfileDetails } from "@/features/userProfile/types";
import { useState } from "react";

export default function UserProfileTabsClient({
  user,
}: {
  user: UserProfileDetails;
}) {
  const [activeTab, setActiveTab] = useState<"recipes" | "posts">("recipes");

  return (
    <>
      <UserProfileTabs activeTab={activeTab} onTabChange={setActiveTab} />
      <UserProfileContent user={user} activeTab={activeTab} />
    </>
  );
}
