"use client";

import { useGetUser } from "@/features/auth/api/queries/getAuthApiClient";
import { defaultCuriosities } from "@/features/curiosities/components/curiosites/utils";
import { useCommunitySidebar } from "@/shared/hooks/useCommunitySidebar";
import Button from "@/shared/ui/Button";
import Col from "@/shared/ui/Layout/Helpers/Col";
import Row from "@/shared/ui/Layout/Helpers/Row";
import {
  ArrowUpIcon,
  MegaphoneIcon,
  PaperclipIcon,
  ScrollIcon,
  SidebarIcon,
} from "@phosphor-icons/react";
import clsx from "clsx";
import {
  Suspense,
  useEffect,
  useRef,
  useState,
  type HtmlHTMLAttributes,
} from "react";
import useFetchPosts from "../../hooks/useFetchPosts";
import type { CommunityPostType } from "../../types";
import PostComposer from "../Post/Composer";
import MobilePostComposer from "../Post/Composer/MobileComposer";
import PostList from "../Post/List";
import CommunitySidebar from "../Sidebar";
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
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [selectedTab, setSelectedTab] = useState<CommunityPostType>("POST");

  const { data } = useGetUser();
  const isAuthenticated = !!data?.id;
  const { queryClient, queryKey } = useFetchPosts(selectedTab);
  const { isOpen: sidebarOpen, toggle: toggleSidebar } = useCommunitySidebar();

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const currentScrollTop = container.scrollTop;
      setShowScrollTop(currentScrollTop > 600);
      if (isRefreshing && currentScrollTop <= 10) {
        setIsRefreshing(false);
        queryClient.resetQueries({ queryKey });
      }
    };

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, [isRefreshing, queryClient, queryKey]);

  const handleRefresh = async () => {
    const container = scrollContainerRef.current;
    if (!container) return;
    if (container.scrollTop === 0) {
      queryClient.resetQueries({ queryKey });
      return;
    }
    setIsRefreshing(true);
    container.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <Row
      className={clsx(
        "relative h-full w-full gap-x-8 overflow-hidden",
        className,
      )}
      {...props}
    >
      <aside
        className={clsx(
          "relative hidden shrink-0 overflow-hidden lg:block",
          sidebarOpen ? "mr-0" : "mr-8",
        )}
        style={{
          width: sidebarOpen ? 220 : 0,
          transition: "width 250ms cubic-bezier(0.4, 0, 0.2, 1)",
          willChange: "width",
        }}
      >
        <div className="h-full w-[220px] border-r border-green-200/50 bg-green-50">
          <CommunitySidebar
            selectedTab={selectedTab}
            onTabChange={setSelectedTab}
            curiositiesData={defaultCuriosities.slice(0, 4).map((c) => ({
              id: c.id,
              title: c.title,
              href: "/curiosities",
            }))}
          />
        </div>
      </aside>

      <button
        onClick={toggleSidebar}
        title={sidebarOpen ? "Fechar menu" : "Abrir menu"}
        className={clsx(
          "absolute top-0 z-20 hidden cursor-pointer rounded-full bg-green-500 p-1 text-green-50 transition-colors hover:bg-green-200 lg:block",
          sidebarOpen ? "left-[-0.2rem]" : "left-0",
        )}
        style={{
          transform: sidebarOpen ? "translateX(210px)" : "translateX(0)",
          transition: "transform 350ms cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      >
        <SidebarIcon size={20} />
      </button>

      <Col className="relative min-w-0 flex-1 overflow-hidden">
        <div
          ref={scrollContainerRef}
          className="hidden-scrollbar h-full w-full overflow-x-hidden overflow-y-auto rounded-lg bg-green-50 p-0"
        >
          <Col className="relative gap-y-7">
            <PostComposer
              disabled={!isAuthenticated}
              className={clsx(
                "sticky top-0 z-40 hidden rounded-[20px] border border-green-500 bg-green-50 transition-all duration-200 md:block",
                !isAuthenticated && "cursor-not-allowed",
              )}
            />

            <MobilePostComposer disabled={!isAuthenticated} />

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
              )}
            />

            <Col>
              <Suspense fallback={null}>
                <div className="contents lg:hidden">
                  <TabsClient
                    tabs={tabs}
                    selectedTab={selectedTab}
                    setSelectedTab={setSelectedTab}
                  />
                </div>
              </Suspense>

              <div className="transition-opacity duration-200">
                <CommunitySelectedTab selectedTab={selectedTab} tabs={tabs} />
              </div>
            </Col>
          </Col>
        </div>
      </Col>

      <aside className="hidden w-[260px] shrink-0 border-l border-green-200/50 bg-green-50 lg:block">
        <CommunityRightSidebar />
      </aside>
    </Row>
  );
}
