import CommunityLayout from "@/features/community/components/CommunityLayout";
import Layout from "@/shared/ui/Layout/";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Comunidade",
  description: "Conecte-se com outros veganos e vegetarianos, compartilhe experiências, dúvidas e descobertas na nossa comunidade.",
  openGraph: {
    title: "Comunidade | VegCom",
    description: "Conecte-se com outros veganos e vegetarianos, compartilhe experiências, dúvidas e descobertas na nossa comunidade.",
    url: "https://vegcom.life/community",
  },
  alternates: {
    canonical: "/community",
  },
};

export default async function Page() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Comunidade Vegana | VegCom",
    description: "Descubra grupos e discussões sobre veganismo.",
    url: "https://vegcom.life/community",
  };
  return (
    <Layout.Default
      noFooter
      className="hidden-scrollbar overflow-hidden"
      gridClassName="overflow-auto"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <section className="hidden-scrollbar container mx-auto overflow-scroll scroll-auto">
        <CommunityLayout
          id="communityLayout"
          className="col-start-1 col-end-16"
        />
      </section>
    </Layout.Default>
  );
}
