import type { PostCardDataProps } from "@/shared";
import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import { getPosts } from "../api/communityApi";
import type { CommunityPostType } from "../types";

const LIMIT = 10;

export default function useFetchPosts(selectedTab: CommunityPostType) {
  const queryClient = useQueryClient();
  const queryKey = ["community-posts", selectedTab];

  const {
    data,
    isLoading,
    isFetchingNextPage,
    isFetching,
    isStale,
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
            return (
              (post as PostCardDataProps & { type?: string }).type ===
                "RESOURCE" || hasImages
            );
          }),
        };
      }

      return result;
    },
    initialPageParam: 1,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
    getNextPageParam: (lastPage) => {
      if (lastPage.data.length < LIMIT) return undefined;
      return lastPage.page + 1;
    },
  });

  return {
    data,
    isLoading,
    isFetchingNextPage,
    isFetching,
    hasNextPage,
    isStale,
    fetchNextPage,
    refetch,
    queryKey,
    queryClient,
  };
}
