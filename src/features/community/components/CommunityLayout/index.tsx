"use client";

import { useGetUser } from "@/features/auth/api/queries/getAuthApiClient";
import { useCommunitySidebar } from "@/shared/hooks/useCommunitySidebar";
import Button from "@/shared/ui/Button";
import Col from "@/shared/ui/Layout/Helpers/Col";
import Row from "@/shared/ui/Layout/Helpers/Row";
import {
  ArrowUpIcon,
  MegaphoneIcon,
  PaperclipIcon,
  ScrollIcon,
} from "@phosphor-icons/react";
import { useQueryClient } from "@tanstack/react-query";
import clsx from "clsx";
import {
  Suspense,
  useCallback,
  useEffect,
  useRef,
  useState,
  type HtmlHTMLAttributes,
} from "react";
import type { CommunityPostType } from "../../types";
import PostComposer from "../Post/Composer";
import MobilePostComposer from "../Post/Composer/MobileComposer";
import PostList from "../Post/List";
import CommunitySidebar from "../Sidebar";
import ToggleButton from "../Sidebar/ToggleButton";
import type { Tab } from "../Tabs";
import Announcements from "../Tabs/Announcements";
import Resources from "../Tabs/Resources";
import TabsClient from "../Tabs/TabsClient";
import CommunityRightSidebar from "./CommunityRightSidebar";
import CommunitySelectedTab from "./CommunitySelectedTab";

interface Props extends HtmlHTMLAttributes<HTMLDivElement> {
  className?: string;
}

export const tabs: Tab[] = [
  {
    key: "POST",
    label: "Posts",
    icon: <ScrollIcon size={24} className="text-green-200" />,
    component: PostList,
  },
  {
    key: "RESOURCE",
    label: "Recursos",
    icon: <PaperclipIcon size={24} className="text-green-200" />,
    component: Resources,
  },
  {
    key: "ANNOUNCEMENT",
    label: "Comunicados",
    icon: <MegaphoneIcon size={24} className="-scale-x-100 text-green-200" />,
    component: Announcements,
  },
];

export default function CommunityLayout({ className, ...props }: Props) {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [selectedTab, setSelectedTab] = useState<CommunityPostType>("POST");

  const { data } = useGetUser();
  const isAuthenticated = !!data?.id;
  const queryClient = useQueryClient();
  const queryKey = ["community-posts", selectedTab];
  const { isOpen: sidebarOpen, toggle: toggleSidebar } = useCommunitySidebar();
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer) return;

    const handleScroll = () => {
      const scrollY = scrollContainer.scrollTop;
      setShowScrollTop(scrollY > 600);
      if (isRefreshing && scrollY <= 10) {
        setIsRefreshing(false);
        queryClient.resetQueries({ queryKey });
      }
    };

    scrollContainer.addEventListener("scroll", handleScroll, { passive: true });
    return () => scrollContainer.removeEventListener("scroll", handleScroll);
  }, [isRefreshing, queryClient, queryKey]);

  const handleRefresh = useCallback(() => {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer) return;

    if (scrollContainer.scrollTop === 0) {
      queryClient.resetQueries({ queryKey });
      return;
    }
    setIsRefreshing(true);
    scrollContainer.scrollTo({ top: 0, behavior: "smooth" });
  }, [queryClient, queryKey]);

  return (
    <Row
      className={clsx(
        "relative h-full min-h-0 w-full items-start lg:gap-x-8",
        className,
      )}
      {...props}
    >
      <div className="relative hidden h-full lg:flex">
        <CommunitySidebar
          selectedTab={selectedTab}
          onTabChange={setSelectedTab}
          sidebarOpen={sidebarOpen}
        />
        <ToggleButton sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      </div>

      {/* ── Center Content ── */}
      <Col
        className={clsx(
          "h-full min-h-0 min-w-0 flex-1 rounded-lg bg-green-50 md:overflow-hidden",
          !sidebarOpen && "lg:ml-8",
        )}
      >
        <PostComposer
          disabled={!isAuthenticated}
          className={clsx(
            "z-40 hidden shrink-0 rounded-[20px] border border-green-500 bg-green-50 md:block",
            !isAuthenticated && "cursor-not-allowed",
          )}
        />

        {isAuthenticated && <MobilePostComposer />}

        <Col className="min-h-0 flex-1">
          <Suspense fallback={null}>
            <div className="contents lg:hidden">
              <TabsClient
                tabs={tabs}
                selectedTab={selectedTab}
                setSelectedTab={setSelectedTab}
              />
            </div>
          </Suspense>

          <div
            ref={scrollContainerRef}
            className="min-h-0 flex-1 overflow-y-auto overscroll-contain pr-2"
          >
            <div className="transition-opacity duration-200">
              <CommunitySelectedTab
                selectedTab={selectedTab}
                tabs={tabs}
                scrollContainerRef={scrollContainerRef}
              />
            </div>
          </div>
        </Col>
      </Col>

      <CommunityRightSidebar />

      <Button.Icon
        variant="filled"
        onClick={handleRefresh}
        icon={<ArrowUpIcon size={24} weight="bold" />}
        className={clsx(
          "fixed bottom-6 z-50 h-14 w-14 rounded-full shadow-xl transition-all duration-300",
          "left-6 md:right-16 md:left-auto",
          showScrollTop
            ? "translate-y-0 opacity-100"
            : "pointer-events-none translate-y-10 opacity-0",
          !isAuthenticated && "max-md:hidden",
        )}
      />
    </Row>
  );
}
