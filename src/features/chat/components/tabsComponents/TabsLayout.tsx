"use client";

import Tabs from "@/features/community/components/Tabs";
import { HistoryChatOutlinedIcon } from "@/shared/icons";
import { ChatCircleIcon, HandWavingIcon } from "@phosphor-icons/react";
import { usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

const tabs = [
  {
    key: "chat",
    label: "Chat",
    icon: <ChatCircleIcon size={24} className="text-green-50" />,
  },
  {
    key: "history_chat",
    label: "Histórico",
    icon: <HistoryChatOutlinedIcon size={24} className="text-green-50" />,
  },
  {
    key: "suggestions",
    label: "Sugestões",
    icon: <HandWavingIcon size={24} className="text-green-50" />,
  },
];

export default function TabsLayout() {
  const router = useRouter();
  const pathname = usePathname();

  // Determine active tab based on pathname
  const getActiveTab = () => {
    if (pathname.includes("/history")) return "history_chat";
    if (pathname.includes("/suggestions")) return "suggestions";
    // Check strict match for root chat or chat with ID
    return "chat";
  };

  const [activeTab, setActiveTab] = useState<string>(getActiveTab());
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    setActiveTab(getActiveTab());
  }, [pathname]);

  const handleTabChange = useCallback(
    (tabKey: string) => {
      if (tabKey === activeTab) return;

      setIsTransitioning(true);

      let targetPath = "/chat";
      if (tabKey === "history_chat") targetPath = "/chat/history";
      if (tabKey === "suggestions") targetPath = "/chat/suggestions";

      router.push(targetPath);

      // Simple timeout to reset transition state after navigation starts
      setTimeout(() => {
        setIsTransitioning(false);
      }, 300);
    },
    [activeTab, router],
  );

  return (
    <div className="flex w-full items-center justify-center">
      <div className="flex w-fit items-center justify-center rounded-full bg-green-500">
        <Tabs
          tabs={tabs}
          selectedTab={activeTab}
          setSelectedTab={handleTabChange}
          className="w-fit border-none px-1 py-1 [&_div]:gap-x-1"
          hasLink={false}
          isChatLayout
          isTransitioning={isTransitioning}
        />
      </div>
    </div>
  );
}
