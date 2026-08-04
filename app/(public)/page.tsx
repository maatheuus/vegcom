import { ExploreCard } from "@/features/directory";
import { getPosts } from "@/features/community/api/communityApi";
import CommunityLayout from "@/features/community/components/CommunityLayout";
import { LIMIT } from "@/features/community/hooks/useFetchPosts";
import GtagPageViewConversion from "@/shared/components/GtagPageViewConversion";
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
      <GtagPageViewConversion />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteLd) }}
      />
      {/* Desktop vê o link "Explorar mapa" na sidebar; o pill cobre só mobile/tablet */}
      <div className="col-span-full flex justify-center px-4 pt-3 pb-1 sm:pt-4 sm:pb-2 lg:hidden">
        <ExploreCard />
      </div>
      <section className="col-start-1 col-end-16 h-full min-h-0">
        <HydrationBoundary state={dehydrate(queryClient)}>
          <CommunityLayout className="h-full min-h-0" />
        </HydrationBoundary>
      </section>
    </Layout.Default>
  );
}
