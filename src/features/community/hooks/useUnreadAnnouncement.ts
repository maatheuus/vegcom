import type { CommunityPostType } from "../types";
import { useUnreadPostType } from "./useUnreadPostType";

const ANNOUNCEMENT_CONFIG = {
  postType: "ANNOUNCEMENT" as CommunityPostType,
  thresholdHours: 24,
  storageKey: "lastReadAnnouncement",
  readEvent: "community:announcement-read",
};

export function useUnreadAnnouncement(selectedTab: CommunityPostType) {
  return useUnreadPostType(selectedTab, ANNOUNCEMENT_CONFIG);
}
