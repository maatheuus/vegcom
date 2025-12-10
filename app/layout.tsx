import { lora, maitree, montserrat, rancho } from "@/assets/fonts";
import SmoothScroll from "@/shared/components/ui/SmoothScroll";
import QueryClientWrapper from "@/shared/tanstack/QueryClientWrapper";
import { Toaster } from "@/shared/ui/toaster";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata } from "next";
import "../src/assets/css/responsiveness.css";
import "./global.css";

/**
 * Metadata configuration for the application.
 * Defines SEO properties like title, description, and OpenGraph/Twitter tags.
 */
export const metadata: Metadata = {
  title: {
    default: "VegCom - Comunidade Vegana de Receitas e Conexões",
    template: "%s | VegCom",
  },
  description:
    "Descubra e compartilhe receitas veganas deliciosas, conecte-se com outros veganos e vegetarianos e explore o mundo da culinária vegana.",
  keywords: [
    "receitas veganas",
    "culinária vegana",
    "comunidade vegana",
    "alimentação plant-based",
    "receitas vegetarianas",
    "comida vegana",
    "receitas saudáveis",
    "veganismo",
    "gastronomia vegana",
  ],
  authors: [{ name: "VegCom Team" }],
  creator: "VegCom",
  publisher: "VegCom",
  metadataBase: new URL("https://vegcom.life"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "https://vegcom.life",
    title: "VegCom - Comunidade Vegana de Receitas e Conexões",
    description:
      "Descubra e compartilhe receitas veganas deliciosas, conecte-se com outros veganos e vegetarianos e explore o mundo da culinária vegana.",
    siteName: "VegCom",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "VegCom - Comunidade Vegana",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "VegCom - Comunidade Vegana de Receitas e Conexões",
    description:
      "Descubra e compartilhe receitas veganas deliciosas, conecte-se com outros veganos e explore um mundo de culinária plant-based.",
    images: ["/og-image.png"],
    creator: "@vegcom",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon-leaf-fork.png", type: "image/png" },
      { url: "/favicon-leaf-fork.png", type: "image/png" },
    ],
    apple: "/favicon-leaf-fork.png",
  },
};

/**
 * RootLayout component for the Next.js application.
 * Wraps all pages with global providers (QueryClient, Toaster) and global styles/fonts.
 * Also includes analytics and performance monitoring tools.
 *
 * @param {Readonly<{ children: React.ReactNode }>} props - The layout props.
 * @returns {JSX.Element} The rendered HTML structure.
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt"
      suppressHydrationWarning
      className={`${lora.variable} ${maitree.variable} ${montserrat.variable} ${rancho.variable} h-full w-full`}
    >
      <body className="h-full bg-green-50">
        <QueryClientWrapper>
          <SmoothScroll />
          {children}
          <Toaster />
        </QueryClientWrapper>
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
