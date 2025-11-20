"use client";

import {
  MegaphoneOutlinedIcon,
  PaperclipOutlinedIcon,
  ScrollOutlinedIcon,
} from "@/shared/icons";
import Col from "@/shared/ui/Layout/Helpers/Col";
import { useState, type HtmlHTMLAttributes } from "react";
import PostComposer from "../Post/Composer";
import PostList from "../Post/List";
import Tabs, { type Tab } from "../Tabs";
import Announcements from "../Tabs/Announcements";
import Resources from "../Tabs/Resources";

interface Props extends HtmlHTMLAttributes<HTMLDivElement> {
  className?: string;
}

export default function Layout({ className, ...props }: Props) {
  const [selectedTab, setSelectedTab] = useState("posts");

  const tabs: Tab[] = [
    {
      key: "posts",
      label: "Posts",
      icon: <ScrollOutlinedIcon size={24} className="text-green-200" />,
      component: <PostList />,
    },
    {
      key: "resources",
      label: "Resources",
      icon: <PaperclipOutlinedIcon size={24} className="text-green-200" />,
      component: <Resources />,
    },
    {
      key: "announcements",
      label: "Announcements",
      icon: <MegaphoneOutlinedIcon size={24} className="text-green-200" />,
      component: <Announcements />,
    },
  ];

  return (
    <div
      className={`hidden-scrollbar z-40 h-full w-full overflow-x-hidden overflow-y-auto rounded-lg bg-green-50 p-0 ${className ?? ""}`}
      {...props}
    >
      <Col className="relative gap-y-7 shadow-2xl">
        <PostComposer className="sticky top-0 z-40 rounded-[20px] border border-green-500 bg-green-50 transition-all duration-200" />

        <Col>
          <Tabs
            tabs={tabs}
            selectedTab={selectedTab}
            setSelectedTab={setSelectedTab}
          />
          {tabs.find((tab) => tab.key === selectedTab)?.component}
        </Col>
      </Col>
    </div>
  );
}
