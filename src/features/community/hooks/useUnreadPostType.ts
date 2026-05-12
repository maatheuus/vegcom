import { useEffect, useState } from "react";
import { getPosts } from "../api/communityApi";
import type { CommunityPostType } from "../types";

interface Config {
  postType: CommunityPostType;
  thresholdHours: number;
  storageKey: string;
  readEvent: string;
}

export function useUnreadPostType(
  selectedTab: CommunityPostType,
  config: Config,
) {
  const [hasUnread, setHasUnread] = useState(false);
  const [hasChecked, setHasChecked] = useState(false);

  useEffect(() => {
    const handler = () => setHasUnread(false);
    window.addEventListener(config.readEvent, handler);
    return () => window.removeEventListener(config.readEvent, handler);
  }, [config.readEvent]);

  useEffect(() => {
    if (selectedTab === config.postType || hasChecked) return;

    const check = async () => {
      try {
        const result = await getPosts({ type: config.postType });
        const posts = result.data;
        if (posts && posts.length > 0) {
          const postDate = new Date(posts[0].postDate);
          const diffInHours =
            (Date.now() - postDate.getTime()) / (1000 * 60 * 60);
          if (diffInHours < config.thresholdHours) {
            const lastRead = localStorage.getItem(config.storageKey);
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
  }, [
    selectedTab,
    hasChecked,
    config.postType,
    config.storageKey,
    config.thresholdHours,
  ]);

  const markAsRead = () => {
    setHasUnread(false);
    localStorage.setItem(config.storageKey, new Date().toISOString());
    window.dispatchEvent(new CustomEvent(config.readEvent));
  };

  return { hasUnread, markAsRead };
}
