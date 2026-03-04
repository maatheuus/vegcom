"use client";

import LogoLoader from "@/features/account/components/(recipes)/LogoLoader";
import { useEffect, useRef } from "react";
import useFetchPosts from "../../hooks/useFetchPosts";
import type { CommunityPostType } from "../../types";
import type { Tab } from "../Tabs";

interface Props {
  selectedTab: CommunityPostType;
  tabs: Tab[];
}

export default function CommunitySelectedTab({ selectedTab, tabs }: Props) {
  const sentinelRef = useRef<HTMLDivElement>(null);
  const {
    queryKey,
    refetch,
    queryClient,
    data,
    isLoading,
    isFetchingNextPage,
    isFetching,
    hasNextPage,
    fetchNextPage,
  } = useFetchPosts(selectedTab);

  useEffect(() => {
    const handleNewPost = () => {
      queryClient.removeQueries({ queryKey });
      refetch();
    };
    window.addEventListener("community:post-created", handleNewPost);
    return () =>
      window.removeEventListener("community:post-created", handleNewPost);
  }, [selectedTab]);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 0.1 },
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

  const allPosts = data?.pages.flatMap((page) => page.data) ?? [];

  return (
    <div className="min-h-screen">
      <ActiveComponent data={allPosts} />

      <div ref={sentinelRef} className="h-4 w-full" />

      {(isFetchingNextPage || isFetching) && (
        <div className="flex justify-center py-6">
          <LogoLoader loading={true} />
        </div>
      )}
    </div>
  );
}
