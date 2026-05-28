import { getPosts } from "@/features/community/api/communityApi";
import CommunityLayout from "@/features/community/components/CommunityLayout";
import { LIMIT } from "@/features/community/hooks/useFetchPosts";
import OnboardingTour from "@/shared/components/ui/OnboardingTour";
import Layout from "@/shared/ui/Layout/";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Comunidade Vegana — Posts, Dicas e Conexões Plant-Based",
  description:
    "A maior comunidade vegana do Brasil! Explore posts, tire dúvidas sobre veganismo, compartilhe dicas e conecte-se com outros vegetarianos e veganos.",
  openGraph: {
    title: "Comunidade Vegana — Posts, Dicas e Conexões Plant-Based | VegCom",
    description:
      "A maior comunidade vegana do Brasil! Explore posts, tire dúvidas sobre veganismo, compartilhe dicas e conecte-se com outros vegetarianos e veganos.",
    url: "https://www.vegcom.life/",
  },
  alternates: {
    canonical: "/",
  },
};

export default async function Home() {
  const queryClient = new QueryClient();
  try {
    await queryClient.prefetchInfiniteQuery({
      queryKey: ["community-posts", "POST"],
      queryFn: ({ pageParam }) =>
        getPosts({ page: pageParam as number, limit: LIMIT, type: "POST" }),
      initialPageParam: 1,
    });
  } catch {
    // degrade gracefully — client will fetch on mount
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Comunidade Vegana | VegCom",
    description: "Participe da maior comunidade vegana do Brasil. Compartilhe receitas, experiências e conecte-se com outros vegetarianos e veganos.",
    url: "https://www.vegcom.life/",
  };

  const websiteLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "VegCom",
    url: "https://www.vegcom.life/",
    potentialAction: {
      "@type": "SearchAction",
      target: "https://www.vegcom.life/recipes?q={search_term_string}",
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <Layout.Default noFooter className="hidden-scrollbar" extraChildren={<OnboardingTour />}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteLd) }}
      />
      <section className="col-start-1 col-end-16 h-full min-h-0">
        <HydrationBoundary state={dehydrate(queryClient)}>
          <CommunityLayout className="h-full min-h-0" />
        </HydrationBoundary>
      </section>
    </Layout.Default>
  );
}
