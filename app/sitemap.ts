import { getPosts } from "@/features/community/api/communityApi";
import { getRecipes } from "@/features/recipes/api/queries/getRecipesApiServer";
import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://vegcom.life";

  // Static routes configuration
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${baseUrl}/recipes`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/community`,
      lastModified: new Date(),
      changeFrequency: "hourly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/curiosities`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    },
  ];

  let dynamicRoutes: MetadataRoute.Sitemap = [];

  try {
    const [recipesResponse, postsResponse] = await Promise.allSettled([
      getRecipes(),
      getPosts({ limit: 100 }),
    ]);

    const dynamicRecipes: MetadataRoute.Sitemap =
      recipesResponse.status === "fulfilled" && recipesResponse.value.data
        ? recipesResponse.value.data.map((recipe) => ({
            url: `${baseUrl}/recipes/${recipe.slug || recipe.id}`,
            lastModified: new Date(recipe.createdAt || new Date()),
            changeFrequency: "weekly",
            priority: 0.8,
          }))
        : [];

    const dynamicPosts: MetadataRoute.Sitemap =
      postsResponse.status === "fulfilled" && postsResponse.value.data
        ? postsResponse.value.data.map((post) => ({
            url: `${baseUrl}/community/${post.id}/${post.slug}`,
            lastModified: new Date(post.postDate || new Date()),
            changeFrequency: "daily",
            priority: 0.7,
          }))
        : [];

    dynamicRoutes = [...dynamicRecipes, ...dynamicPosts];
  } catch (error) {
    console.error("Failed to generate dynamic sitemap routes:", error);
  }

  return [...staticRoutes, ...dynamicRoutes];
}
