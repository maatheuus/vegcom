"use client";

import Tabs from "@/features/community/components/Tabs";
import { HistoryChatOutlinedIcon } from "@/shared/icons";
import Col from "@/shared/ui/Layout/Helpers/Col";
import { ChatCircleIcon, HandWavingIcon } from "@phosphor-icons/react";
import clsx from "clsx";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import ChatProvider from "../chat/ChatProvider";
import SuggestionsPage from "../tabsComponentsPage/SuggestionsPage";
import ChatPage from "./ChatPage";
import HistoryChatPage from "./HistoryChatPage";

const tabs = [
  {
    key: "chat",
    label: "Chat",
    icon: <ChatCircleIcon size={24} className="text-green-50" />,
    component: <ChatPage />,
  },
  {
    key: "history_chat",
    label: "Histórico",
    icon: <HistoryChatOutlinedIcon size={24} className="text-green-50" />,
    component: <HistoryChatPage />,
  },
  {
    key: "suggestions",
    label: "Sugestões",
    icon: <HandWavingIcon size={24} className="text-green-50" />,
    component: <SuggestionsPage />,
  },
];

export default function TabsLayout() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const paramTab = searchParams?.get("tab") ?? "chat";
  const [activeTab, setActiveTab] = useState<string>(paramTab);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const transitionTimerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if (transitionTimerRef.current) clearTimeout(transitionTimerRef.current);
    };
  }, []);

  useEffect(() => {
    if (paramTab !== activeTab) {
      setActiveTab(paramTab);
    }
  }, [paramTab]);

  const handleTabChange = useCallback(
    (tabKey: string) => {
      if (tabKey === activeTab || isTransitioning) return;

      if (transitionTimerRef.current) {
        clearTimeout(transitionTimerRef.current);
      }

      setIsTransitioning(true);

      const params = new URLSearchParams(searchParams?.toString() || "");

      if (params.get("prompt")) {
        params.delete("prompt");
      }

      params.set("tab", tabKey);
      router.replace(pathname + "?" + params.toString(), { scroll: false });

      transitionTimerRef.current = setTimeout(() => {
        setActiveTab(tabKey);
        setIsTransitioning(false);
      }, 150);
    },
    [activeTab, isTransitioning, searchParams, pathname, router],
  );

  const renderAllTabs = useMemo(() => {
    return tabs.map((tab) => {
      const isActive = tab.key === activeTab;
      return (
        <div
          key={tab.key}
          className={clsx(
            "h-full w-full transition-opacity duration-300 ease-in-out",
            isActive && !isTransitioning
              ? "z-10 opacity-100"
              : "pointer-events-none absolute inset-0 z-0 opacity-0",
          )}
          aria-hidden={!isActive}
        >
          {tab.component}
        </div>
      );
    });
  }, [activeTab, isTransitioning]);

  return (
    <div className="h-full w-full overflow-hidden rounded-lg border border-green-500 px-4 py-5">
      <Col className="h-full w-full gap-y-4">
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

        <div className="relative h-full w-full overflow-hidden">
          <ChatProvider>{renderAllTabs}</ChatProvider>
        </div>
      </Col>
    </div>
  );
}
