"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
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

  useEffect(() => {
    if (paramTab !== selectedTab) setSelectedTab(paramTab);
  }, [paramTab, selectedTab]);

  const pushTabToUrl = (tabKey: string) => {
    if (tabKey === selectedTab) return;
    const params = new URLSearchParams(searchParams?.toString() || "");
    params.set("tab", tabKey);
    router.push(pathname + "?" + params.toString());
    setSelectedTab(tabKey);
  };

  const activeComponent = useMemo(() => {
    return (
      <ChatProvider>
        {tabs.find((t) => t.key === selectedTab)?.component}
      </ChatProvider>
    );
  }, [selectedTab]);

  return (
    <div className="rounded-lg w-full h-full border border-green-500 py-5 px-4 overflow-hidden">
      <Col className="w-full h-full gap-y-4">
        <div className="flex justify-center items-center w-full">
          <div className="bg-green-500 rounded-full flex justify-center items-center w-fit">
            <Tabs
              tabs={tabs}
              selectedTab={selectedTab}
              setSelectedTab={pushTabToUrl}
              className="w-fit border-none px-1 py-1 [&_div]:gap-x-1"
              hasLink={false}
              isChatLayout
            />
          </div>
        </div>

        {activeComponent}
      </Col>
    </div>
  );
}
