import { getPostById } from "@/features/community/api/communityApi";
import { recipeApi } from "@/features/recipes/api/recipesApi";
import { useEffect, useState } from "react";
import type { LinkPreviewData, PostPreview, RecipePreview } from "../types";
import { extractInternalLinks } from "../utils/previewLinksUtils";

export default function useLinkPreviews(
  content: string,
  links?: string[],
): {
  previews: LinkPreviewData[];
  isLoading: boolean;
} {
  const [previews, setPreviews] = useState<LinkPreviewData[]>([]);
  const [isLoading, setIsLoading] = useState(() => {
    const allContent = [content, ...(links ?? [])].join(" ");
    return extractInternalLinks(allContent).length > 0;
  });

  useEffect(() => {
    const allContent = [content, ...(links ?? [])].join(" ");
    const found = extractInternalLinks(allContent);

    if (found.length === 0) {
      setPreviews([]);
      setIsLoading(false);
      return;
    }

    let cancelled = false;
    setIsLoading(true);

    Promise.allSettled(
      found.map(async ({ type, id }) => {
        if (type === "recipe") {
          const res = await recipeApi.getRecipeBySlug(id);
          const r = res.data;
          return {
            type: "recipe",
            slug: r.slug ?? id,
            title: r.title,
            description: r.description,
            image: r.images?.[0],
            cookTime: r.cookTime,
            rating: r.averageRating,
            href: `/recipes/${r.slug ?? id}`,
          } satisfies RecipePreview;
        } else {
          const post = await getPostById(id);
          if (!post) return null;
          return {
            type: "post",
            id,
            title: post.postTitle,
            excerpt: post.postContent.postResources?.content?.slice(0, 120),
            authorName: post.user?.name,
            authorAvatar: post.user?.urlImage,
            commentsCount: post.comments.commentsNumber ?? 0,
            href: `/community/${id}/${post.postTitle
              .toLowerCase()
              .replace(/\s+/g, "-")
              .replace(/[^\w-]/g, "")}`,
          } satisfies PostPreview;
        }
      }),
    ).then((results) => {
      if (cancelled) return;
      const valid = results
        .filter((r) => r.status === "fulfilled" && r.value !== null)
        .map((r) => (r as PromiseFulfilledResult<LinkPreviewData>).value);
      setPreviews(valid);
      setIsLoading(false);
    });

    return () => {
      cancelled = true;
    };
  }, [content, links?.join(",")]);

  return { previews, isLoading };
}
