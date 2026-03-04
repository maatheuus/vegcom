"use client";

import { useGetUser } from "@/features/auth/api/queries/getAuthApiClient";
import Button from "@/shared/ui/Button";
import Col from "@/shared/ui/Layout/Helpers/Col";
import {
  ArrowUpIcon,
  MegaphoneIcon,
  PaperclipIcon,
  ScrollIcon,
} from "@phosphor-icons/react";
import clsx from "clsx";
import {
  Suspense,
  useEffect,
  useRef,
  useState,
  useTransition,
  type HtmlHTMLAttributes,
} from "react";
import useFetchPosts from "../../hooks/useFetchPosts";
import type { CommunityPostType } from "../../types";
import PostComposer from "../Post/Composer";
import MobilePostComposer from "../Post/Composer/MobileComposer";
import PostList from "../Post/List";
import type { Tab } from "../Tabs";
import Announcements from "../Tabs/Announcements";
import Resources from "../Tabs/Resources";
import TabsClient from "../Tabs/TabsClient";
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
  const [isPending, startTransition] = useTransition();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [selectedTab, setSelectedTab] = useState<CommunityPostType>(() => {
    return "POST";
  });

  const { data } = useGetUser();
  const isAuthenticated = !!data?.id;
  const { queryClient, queryKey } = useFetchPosts(
    selectedTab as CommunityPostType,
  );

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
    <div
      ref={scrollContainerRef}
      className={`hidden-scrollbar z-40 h-full w-full overflow-x-hidden overflow-y-auto rounded-lg bg-green-50 p-0 ${className ?? ""}`}
      {...props}
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
            <TabsClient
              tabs={tabs}
              isPending={isPending}
              selectedTab={selectedTab}
              startTransition={startTransition}
              setSelectedTab={setSelectedTab}
            />
          </Suspense>

          <div
            className={clsx(
              "transition-opacity duration-200",
              isPending && "opacity-50",
            )}
          >
            <CommunitySelectedTab selectedTab={selectedTab} tabs={tabs} />
          </div>
        </Col>
      </Col>
    </div>
  );
}
