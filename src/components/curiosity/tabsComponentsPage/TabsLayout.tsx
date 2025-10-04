"use client";

import clsx from "clsx";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Tabs from "../../community/Tabs";
import {
  ChatCircleOutlinedIcon,
  HandWavingOutlinedIcon,
  HistoryChatOutlinedIcon,
  LightBulbOutlinedIcon,
} from "../../icons";
import Col from "../../ui/Layout/Helpers/Col";
import ChatProvider from "../chat/ChatProvider";
import CuriositiesPage from "../tabsComponentsPage/CuriositiesPage";
import SuggestionsPage from "../tabsComponentsPage/SuggestionsPage";
import ChatPage from "./ChatPage";
import HistoryChatPage from "./HistoryChatPage";

const tabs = [
  {
    key: "chat",
    label: "Chat",
    icon: <ChatCircleOutlinedIcon size={24} className="text-green-50" />,
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
    icon: <HandWavingOutlinedIcon size={24} className="text-green-50" />,
    component: <SuggestionsPage />,
  },
  {
    key: "curiosities",
    label: "Curiosidades",
    icon: <LightBulbOutlinedIcon size={24} className="text-green-50" />,
    component: <CuriositiesPage />,
  },
];

export default function TabsLayout({
  children,
}: {
  children?: React.ReactNode;
}) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const paramTab = searchParams?.get("tab") ?? "chat";
  const [selectedTab, setSelectedTab] = useState<string>(paramTab);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [displayedTab, setDisplayedTab] = useState<string>(paramTab);

  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);
  const transitionTimerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current);
      if (transitionTimerRef.current) clearTimeout(transitionTimerRef.current);
    };
  }, []);

  useEffect(() => {
    if (paramTab !== selectedTab) {
      setSelectedTab(paramTab);
      setDisplayedTab(paramTab);
    }
  }, [paramTab]);

  const pushTabToUrl = useCallback(
    (tabKey: string) => {
      if (tabKey === selectedTab || isTransitioning) return;

      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }

      setIsTransitioning(true);
      setSelectedTab(tabKey);

      debounceTimerRef.current = setTimeout(() => {
        const params = new URLSearchParams(searchParams?.toString() || "");
        params.set("tab", tabKey);

        router.replace(pathname + "?" + params.toString(), { scroll: false });

        transitionTimerRef.current = setTimeout(() => {
          setDisplayedTab(tabKey);
          setIsTransitioning(false);
        }, 100);
      }, 150);
    },
    [selectedTab, isTransitioning, searchParams, pathname, router],
  );

  const activeComponent = useMemo(() => {
    const component = tabs.find((t) => t.key === displayedTab)?.component;

    return (
      <div
        key={displayedTab}
        className={clsx(
          "h-full w-full transition-opacity duration-200",
          isTransitioning ? "opacity-0" : "opacity-100",
        )}
      >
        <ChatProvider>{component}</ChatProvider>
      </div>
    );
  }, [displayedTab, isTransitioning]);

  return (
    <div className="h-full w-full overflow-hidden rounded-lg border border-green-500 px-4 py-5">
      <Col className="h-full w-full gap-y-4">
        <div className="flex w-full items-center justify-center">
          <div className="flex w-fit items-center justify-center rounded-full bg-green-500">
            <Tabs
              tabs={tabs}
              selectedTab={selectedTab}
              setSelectedTab={pushTabToUrl}
              className="w-fit border-none px-1 py-1 [&_div]:gap-x-1"
              hasLink={false}
              isChatLayout
              isTransitioning={isTransitioning}
            />
          </div>
        </div>

        {activeComponent}
      </Col>
    </div>
  );
}
