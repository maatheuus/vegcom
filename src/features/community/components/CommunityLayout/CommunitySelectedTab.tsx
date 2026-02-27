import LogoLoader from "@/features/account/components/(recipes)/LogoLoader";
import type { PostCardDataProps } from "@/shared";
import { useEffect, useState } from "react";
import { getPosts } from "../../api/communityApi";
import type { CommunityPostType } from "../../types";
import type { Tab } from "../Tabs";
import { mockPostCardData } from "../mockData";

interface Props {
  selectedTab: CommunityPostType;
  tabs: Tab[];
}

export default function CommunitySelectedTab({ selectedTab, tabs }: Props) {
  const [data, setData] = useState<PostCardDataProps[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      try {
        const result = await getPosts({
          type: selectedTab,
        });
        setData(result || []);
      } catch (error) {
        console.error("Erro ao buscar posts:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [selectedTab]);

  useEffect(() => {
    if (data.length === 0) {
      const communityLayout = document.getElementById("communityLayout");

      if (communityLayout) {
        communityLayout.classList.add("!overflow-hidden");
      }
    }
  }, [data]);

  const ActiveComponent = tabs.find(
    (tab) => tab.key === selectedTab,
  )?.component;

  if (!ActiveComponent) return null;

  if (isLoading) {
    return (
      <div className="mx-auto mt-32 flex h-full items-center justify-center">
        <LogoLoader loading={true} />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <ActiveComponent
        data={selectedTab === "ANNOUNCEMENT" ? data : mockPostCardData}
      />
    </div>
  );
}
