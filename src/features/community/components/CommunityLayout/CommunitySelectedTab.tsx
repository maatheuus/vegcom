"use client";

import LogoLoader from "@/features/account/components/(recipes)/LogoLoader";
import { useGetUser } from "@/features/auth/api/queries/getAuthApiClient";
import AuthenticatedBlocker from "@/shared/components/ui/AuthenticatedBlocker";
import { useEffect, useRef } from "react";
import useFetchPosts from "../../hooks/useFetchPosts";
import type { CommunityPostType } from "../../types";
import type { Tab } from "../Tabs";

interface Props {
  selectedTab: CommunityPostType;
  tabs: Tab[];
  scrollContainerRef: React.RefObject<HTMLDivElement | null>;
}

const POSTS_LIMIT = 6;

export default function CommunitySelectedTab({
  selectedTab,
  tabs,
  scrollContainerRef,
}: Props) {
  const sentinelRef = useRef<HTMLDivElement>(null);
  const {
    queryClient,
    data,
    isLoading,
    isFetchingNextPage,
    isFetching,
    hasNextPage,
    fetchNextPage,
  } = useFetchPosts(selectedTab);

  const { data: userData } = useGetUser();
  const isAuthenticated = !!userData?.id;

  useEffect(() => {
    const handleRefetchPosts = () => {
      queryClient.invalidateQueries({ queryKey: ["community-posts"] });
    };
    window.addEventListener("community:post-created", handleRefetchPosts);
    window.addEventListener("community:post-deleted", handleRefetchPosts);
    return () => {
      window.removeEventListener("community:post-created", handleRefetchPosts);
      window.removeEventListener("community:post-deleted", handleRefetchPosts);
    };
  }, [queryClient]);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const first = entries[0];
        if (first?.isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      {
        root: scrollContainerRef?.current || null,
        threshold: 0,
        rootMargin: "0px 0px 400px 0px",
      },
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  const ActiveComponent = tabs.find(
    (tab) => tab.key === selectedTab,
  )?.component;

  if (!ActiveComponent) return null;

  if (isLoading) {
    return (
      <div className="mx-auto mt-32 flex h-full items-center justify-center">
        <LogoLoader loading={true} />
      </div>
    );
  }

  let allPosts = data?.pages.flatMap((page) => page.data) ?? [];

  const hasLoadedEnough = allPosts.length >= POSTS_LIMIT;
  const showBlocker = !isAuthenticated && hasLoadedEnough;

  if (showBlocker) {
    allPosts = allPosts.slice(0, POSTS_LIMIT);
  }

  return (
    <div className="relative">
      <ActiveComponent data={allPosts} />

      {showBlocker && (
        <div className="absolute right-0 bottom-0 left-0 z-50">
          <div className="h-90 bg-gradient-to-t from-green-50 to-transparent" />
          <div className="absolute top-0 left-0 z-50 h-full w-full bg-gradient-to-t from-green-50 to-transparent">
            <AuthenticatedBlocker
              title="Veja mais posts da comunidade"
              description="Faça login para acessar todos os posts sem limite."
              className="mx-auto w-full max-w-[calc(100%-2rem)] drop-shadow-md"
              type="minimal"
              showIcon={false}
            />
          </div>
        </div>
      )}

      {!showBlocker && <div ref={sentinelRef} className="h-4 w-full" />}

      {(isFetchingNextPage || isFetching) && !showBlocker && (
        <div className="flex justify-center py-6">
          <LogoLoader loading={true} />
        </div>
      )}
    </div>
  );
}
