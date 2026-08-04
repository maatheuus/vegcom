import { DirectoryPage } from "@/features/directory";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Explorar",
  description:
    "Descubra restaurantes, feiras, padarias e eventos veganos no Brasil. Encontre locais próximos, veja eventos e colabore com a comunidade.",
  openGraph: {
    title: "Explorar | VegCom",
    description:
      "Descubra locais e eventos veganos perto de você.",
  },
};

export default function Explore() {
  return <DirectoryPage />;
}
