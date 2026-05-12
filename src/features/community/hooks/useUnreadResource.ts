import type { CommunityPostType } from "../types";
import { useUnreadPostType } from "./useUnreadPostType";

const RESOURCE_CONFIG = {
  postType: "RESOURCE" as CommunityPostType,
  thresholdHours: 72,
  storageKey: "lastReadResource",
  readEvent: "community:resource-read",
};

export function useUnreadResource(selectedTab: CommunityPostType) {
  return useUnreadPostType(selectedTab, RESOURCE_CONFIG);
}
