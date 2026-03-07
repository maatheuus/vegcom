"use client";

import { mockUserProfileData } from "@/features/userProfile/api/mockData";
import { UserProfileContent } from "@/features/userProfile/components/UserProfileContent";
import { UserProfileHeader } from "@/features/userProfile/components/UserProfileHeader";
import { UserProfileTabs } from "@/features/userProfile/components/UserProfileTabs";
import Layout from "@/shared/ui/Layout/";
import { useState } from "react";

interface Props {
  params: Promise<{ id: string }>;
}

export default function UserProfilePage({ params: _params }: Props) {
  const [activeTab, setActiveTab] = useState<"recipes" | "posts">("recipes");

  const user = mockUserProfileData;

  return (
    <Layout.Default
      className="hidden-scrollbar overflow-hidden"
      gridClassName="overflow-auto bg-green-50"
    >
      <section className="hidden-scrollbar container mx-auto overflow-scroll scroll-auto px-4 py-8">
        <div className="mx-auto flex max-w-5xl flex-col gap-y-4">
          <UserProfileHeader user={user} />
          <UserProfileTabs activeTab={activeTab} onTabChange={setActiveTab} />
          <UserProfileContent user={user} activeTab={activeTab} />
        </div>
      </section>
    </Layout.Default>
  );
}
