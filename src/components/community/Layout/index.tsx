"use client";

import {
  MegaphoneOutlinedIcon,
  PaperclipOutlinedIcon,
  ScrollOutlinedIcon,
} from "@/components/icons";
import Col from "@/components/ui/Layout/Helpers/Col";
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
      {...props}
      className={`hidden-scrollbar p-0 h-dvh max-h-[80%] mt-auto w-full overflow-x-hidden overflow-y-auto rounded-t-lg bg-green-50 shadow-2xl z-40 ${className}`}
    >
      <Col className="gap-y-7">
        <PostComposer />
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
