import Tabs, { type Tab } from ".";
import { useUnreadAnnouncement } from "../../hooks/useUnreadAnnouncement";
import { useUnreadResource } from "../../hooks/useUnreadResource";
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
  const { hasUnread: hasUnreadAnnouncement, markAsRead: markAnnouncementRead } =
    useUnreadAnnouncement(selectedTab);
  const { hasUnread: hasUnreadResource, markAsRead: markResourceRead } =
    useUnreadResource(selectedTab);

  const handleTabChange = (key: CommunityPostType) => {
    if (key === selectedTab) return;
    if (key === "ANNOUNCEMENT") markAnnouncementRead();
    if (key === "RESOURCE") markResourceRead();
    setSelectedTab(key);
  };

  const tabsWithNotification = tabs.map((tab) => {
    if (tab.key === "ANNOUNCEMENT") {
      return { ...tab, showNotification: hasUnreadAnnouncement };
    }
    if (tab.key === "RESOURCE") {
      return {
        ...tab,
        showNotification: hasUnreadResource,
        notificationVariant: "color" as const,
      };
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
