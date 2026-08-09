import { DirectoryPage } from "@/features/directory";
import type { Metadata } from "next";

const title = "Explorar Locais e Eventos Veganos — Mapa Interativo";
const description =
  "Descubra restaurantes, feiras, padarias, cafés e eventos veganos no Brasil. Explore o mapa interativo, encontre locais perto de você e colabore com a comunidade.";
const url = "https://www.vegcom.life/explore";

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    "restaurantes veganos",
    "eventos veganos",
    "feiras veganas",
    "padarias veganas",
    "cafés veganos",
    "mapa vegano",
    "locais veganos no Brasil",
    "comida plant-based perto de mim",
  ],
  openGraph: {
    title: `${title} | VegCom`,
    description,
    url,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${title} | VegCom`,
    description,
  },
  alternates: {
    canonical: "/explore",
  },
};

export default function Explore() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Locais e Eventos Veganos | VegCom",
    description,
    url,
    about: {
      "@type": "Thing",
      name: "Locais e eventos veganos no Brasil",
    },
    isPartOf: {
      "@type": "WebSite",
      name: "VegCom",
      url: "https://www.vegcom.life",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <DirectoryPage />
    </>
  );
}
