import { useEffect, useState } from "react";
import Tabs, { type Tab } from ".";
import { getPosts } from "../../api/communityApi";
import type { CommunityPostType } from "../../types";

interface Props {
  tabs: Tab[];
  selectedTab: CommunityPostType;
  setSelectedTab: (tab: CommunityPostType) => void;
}

export default function TabsClient({
  tabs,
  selectedTab,
  setSelectedTab,
}: Props) {
  const [hasUnreadAnnouncement, setHasUnreadAnnouncement] = useState(false);
  const [hasCheckedAnnouncements, setHasCheckedAnnouncements] = useState(false);

  useEffect(() => {
    const checkUnreadAnnouncements = async () => {
      if (selectedTab === "ANNOUNCEMENT" || hasCheckedAnnouncements) return;

      try {
        const result = await getPosts({ type: "ANNOUNCEMENT" });
        const posts = result.data;
        if (posts && posts.length > 0) {
          const latestPost = posts[0];
          const postDate = new Date(latestPost.postDate);
          const now = new Date();
          const diffInHours =
            (now.getTime() - postDate.getTime()) / (1000 * 60 * 60);

          if (diffInHours < 24) {
            const lastRead = localStorage.getItem("lastReadAnnouncement");
            if (!lastRead || new Date(lastRead) < postDate) {
              setHasUnreadAnnouncement(true);
            }
          }
        }
      } catch (error) {
        console.error("Failed to fetch announcements:", error);
      } finally {
        setHasCheckedAnnouncements(true);
      }
    };

    checkUnreadAnnouncements();
  }, [selectedTab, hasCheckedAnnouncements]);

  const handleTabChange = (key: CommunityPostType) => {
    if (key === selectedTab) return;

    if (key === "ANNOUNCEMENT") {
      setHasUnreadAnnouncement(false);
      localStorage.setItem("lastReadAnnouncement", new Date().toISOString());
    }

    setSelectedTab(key);
  };

  const tabsWithNotification = tabs.map((tab) => {
    if (tab.key === "ANNOUNCEMENT") {
      return { ...tab, showNotification: hasUnreadAnnouncement };
    }
    return tab;
  });

  return (
    <Tabs
      tabs={tabsWithNotification}
      selectedTab={selectedTab}
      setSelectedTab={handleTabChange as (tab: string) => void}
      isTransitioning={false}
      className="sticky top-[4.5rem] z-20 bg-green-50 pt-5"
    />
  );
}
