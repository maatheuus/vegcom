import { getPosts } from "@/features/community/api/communityApi";
import CommunityLayout from "@/features/community/components/CommunityLayout";
import { LIMIT } from "@/features/community/hooks/useFetchPosts";
import OnboardingTour from "@/shared/components/ui/OnboardingTour";
import Layout from "@/shared/ui/Layout/";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Comunidade",
  description:
    "Conecte-se com outros veganos e vegetarianos, compartilhe experiências, dúvidas e descobertas na nossa comunidade.",
  openGraph: {
    title: "Comunidade | VegCom",
    description:
      "Conecte-se com outros veganos e vegetarianos, compartilhe experiências, dúvidas e descobertas na nossa comunidade.",
    url: "https://vegcom.life/",
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
    description: "Descubra grupos e discussões sobre veganismo.",
    url: "https://vegcom.life/",
  };

  return (
    <Layout.Default noFooter className="hidden-scrollbar" extraChildren={<OnboardingTour />}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <section className="col-start-1 col-end-16 h-full min-h-0">
        <HydrationBoundary state={dehydrate(queryClient)}>
          <CommunityLayout className="h-full min-h-0" />
        </HydrationBoundary>
      </section>
    </Layout.Default>
  );
}
