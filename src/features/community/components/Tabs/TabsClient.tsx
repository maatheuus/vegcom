import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, type TransitionStartFunction } from "react";
import Tabs, { type Tab } from ".";
import { getPosts } from "../../api/communityApi";
import type { CommunityPostType } from "../../types";

interface Props {
  tabs: Tab[];
  selectedTab: CommunityPostType;
  isPending: boolean;
  setSelectedTab: (tab: CommunityPostType) => void;
  startTransition: TransitionStartFunction;
}

export default function TabsClient({
  tabs,
  selectedTab,
  isPending,
  setSelectedTab,
  startTransition,
}: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [hasUnreadAnnouncement, setHasUnreadAnnouncement] = useState(false);

  useEffect(() => {
    const tabFromUrl = searchParams.get("tab");
    if (tabFromUrl && tabFromUrl !== selectedTab) {
      setSelectedTab(tabFromUrl as CommunityPostType);
    }
  }, [searchParams]);

  useEffect(() => {
    const checkUnreadAnnouncements = async () => {
      if (selectedTab === "ANNOUNCEMENT") return;

      try {
        const posts = await getPosts({ type: "ANNOUNCEMENT" });
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
      }
    };

    checkUnreadAnnouncements();
  }, [selectedTab]);

  const handleTabChange = (key: CommunityPostType) => {
    if (key === selectedTab) return;

    if (key === "ANNOUNCEMENT") {
      setHasUnreadAnnouncement(false);
      localStorage.setItem("lastReadAnnouncement", new Date().toISOString());
    }

    startTransition(() => {
      setSelectedTab(key);

      const params = new URLSearchParams(searchParams.toString());
      params.set("tab", key);
      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    });
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
      setSelectedTab={handleTabChange}
      isTransitioning={isPending}
      className="sticky -top-1 z-20 bg-green-50 pt-5 md:top-63"
    />
  );
}
