"use client";

import LogoLoader from "@/features/account/components/(recipes)/LogoLoader";
import type { PostCardDataProps } from "@/shared";
import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useRef } from "react";
import { getPosts } from "../../api/communityApi";
import type { CommunityPostType } from "../../types";
import type { Tab } from "../Tabs";

const LIMIT = 10;

interface Props {
  selectedTab: CommunityPostType;
  tabs: Tab[];
}

export default function CommunitySelectedTab({ selectedTab, tabs }: Props) {
  const queryClient = useQueryClient();
  const sentinelRef = useRef<HTMLDivElement>(null);

  const queryKey = ["community-posts", selectedTab];

  const {
    data,
    isLoading,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
    refetch,
  } = useInfiniteQuery({
    queryKey,
    queryFn: async ({ pageParam = 1 }) => {
      const result = await getPosts({
        page: pageParam as number,
        limit: LIMIT,
        type: selectedTab === "RESOURCE" ? undefined : selectedTab,
      });

      if (selectedTab === "RESOURCE") {
        return {
          ...result,
          data: result.data.filter((post: PostCardDataProps) => {
            const hasImages =
              post.postContent?.postResources?.images &&
              post.postContent.postResources.images.length > 0;
            return (post as any).type === "RESOURCE" || hasImages;
          }),
        };
      }

      return result;
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      if (lastPage.data.length < LIMIT) return undefined;
      return lastPage.page + 1;
    },
  });

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

      {isFetchingNextPage && (
        <div className="flex justify-center py-6">
          <LogoLoader loading={true} />
        </div>
      )}
    </div>
  );
}
