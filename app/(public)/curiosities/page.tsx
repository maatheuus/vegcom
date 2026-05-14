import CuriositiesPage from "@/features/curiosities/components/page/CuriositiesPage";
import Layout from "@/shared/ui/Layout";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Curiosidades sobre Veganismo e Sustentabilidade",
  description:
    "Fique por dentro de curiosidades fascinantes do mundo vegano, sustentabilidade, alimentação plant-based e direitos dos animais.",
  openGraph: {
    title: "Curiosidades sobre Veganismo e Sustentabilidade | VegCom",
    description:
      "Fique por dentro de curiosidades fascinantes do mundo vegano, sustentabilidade, alimentação plant-based e direitos dos animais.",
    url: "https://www.vegcom.life/curiosities",
  },
  alternates: {
    canonical: "/curiosities",
  },
};

export default function page() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Curiosidades Veganas | VegCom",
    description:
      "Curiosidades sobre veganismo, estilo de vida sustentável e direitos dos animais.",
    url: "https://www.vegcom.life/curiosities",
  };

  return (
    <Layout.Default className="style-scrollbar h-auto">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <CuriositiesPage />
    </Layout.Default>
  );
}
