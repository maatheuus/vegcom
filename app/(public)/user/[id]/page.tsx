"use client";

import { useState } from "react";
import Layout from "@/shared/ui/Layout/";
import { UserProfileHeader } from "@/features/userProfile/components/UserProfileHeader";
import { UserProfileTabs } from "@/features/userProfile/components/UserProfileTabs";
import { UserProfileContent } from "@/features/userProfile/components/UserProfileContent";
import { mockUserProfileData } from "@/features/userProfile/api/mockData";
import { useGetUser } from "@/features/auth/api/queries/getAuthApiClient";

interface Props {
  params: Promise<{ id: string }>;
}

export default function UserProfilePage({ params }: Props) {
  const [activeTab, setActiveTab] = useState<"recipes" | "posts">("recipes");

  // In a real scenario, you would fetch user data by ID here.
  // We use the mock data for now.
  const user = mockUserProfileData;

  return (
    <Layout.Default
      className="hidden-scrollbar overflow-hidden"
      gridClassName="overflow-auto bg-green-50"
    >
      <section className="hidden-scrollbar container mx-auto overflow-scroll scroll-auto px-4 py-8">
        <div className="max-w-5xl mx-auto flex flex-col gap-y-4">
          <UserProfileHeader user={user} />
          <UserProfileTabs activeTab={activeTab} onTabChange={setActiveTab} />
          <UserProfileContent user={user} activeTab={activeTab} />
        </div>
      </section>
    </Layout.Default>
  );
}
