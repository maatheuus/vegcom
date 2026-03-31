import CommunityLayout from "@/features/community/components/CommunityLayout";
import Layout from "@/shared/ui/Layout/";
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

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Comunidade Vegana | VegCom",
    description: "Descubra grupos e discussões sobre veganismo.",
    url: "https://vegcom.life/",
  };

  return (
    <Layout.Default noFooter className="overflow-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <section className="h-full overflow-hidden">
        <CommunityLayout className="col-start-1 col-end-16" />
      </section>
    </Layout.Default>
  );
}
