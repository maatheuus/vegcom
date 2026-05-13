import { useEffect, useState } from "react";
import { getPosts } from "../api/communityApi";
import type { CommunityPostType } from "../types";

export function useUnreadAnnouncement(selectedTab: CommunityPostType) {
  const [hasUnread, setHasUnread] = useState(false);
  const [hasChecked, setHasChecked] = useState(false);

  useEffect(() => {
    if (selectedTab === "ANNOUNCEMENT" || hasChecked) return;

    const check = async () => {
      try {
        const result = await getPosts({ type: "ANNOUNCEMENT" });
        const posts = result.data;
        if (posts && posts.length > 0) {
          const postDate = new Date(posts[0].postDate);
          if (isNaN(postDate.getTime())) return;
          const diffInHours =
            (Date.now() - postDate.getTime()) / (1000 * 60 * 60);

          if (diffInHours < 24) {
            const lastRead = localStorage.getItem("lastReadAnnouncement");
            if (!lastRead || new Date(lastRead) < postDate) {
              setHasUnread(true);
            }
          }
        }
      } catch {
        // silently ignore
      } finally {
        setHasChecked(true);
      }
    };

    check();
  }, [selectedTab, hasChecked]);

  const markAsRead = () => {
    setHasUnread(false);
    localStorage.setItem("lastReadAnnouncement", new Date().toISOString());
  };

  return { hasUnread, markAsRead };
}
