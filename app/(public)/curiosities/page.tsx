import CuriositiesPage from "@/features/curiosities/components/page/CuriositiesPage";
import Layout from "@/shared/ui/Layout";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Curiosidades",
  description:
    "Fique por dentro de curiosidades do mundo vegano e sustentável.",
  openGraph: {
    title: "Curiosidades | VegCom",
    description:
      "Fique por dentro de curiosidades do mundo vegano e sustentável.",
    url: "https://vegcom.life/curiosities",
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
    url: "https://vegcom.life/curiosities",
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
