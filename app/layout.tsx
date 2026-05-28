import { lora, maitree, montserrat, rancho } from "@/assets/fonts";
import ProgressProviderClient from "@/shared/components/ui/ProgressProviderClient";
import { NavigationHistoryProvider } from "@/shared/providers/NavigationHistoryProvider";
import QueryClientWrapper from "@/shared/tanstack/QueryClientWrapper";
import { Toaster } from "@/shared/ui/toaster";
import "@assets/css/responsiveness.css";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata } from "next";
import Script from "next/script";
import "./global.css";

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
    "receitas veganas rápidas",
    "almoço vegano simples",
    "substitutos veganos",
    "cozinha vegetal brasileira",
  ],
  authors: [{ name: "Maat" }],
  creator: "VegCom",
  publisher: "VegCom",
  metadataBase: new URL("https://www.vegcom.life"),
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "https://www.vegcom.life",
    title: "VegCom - Comunidade Vegana de Receitas e Conexões",
    description:
      "Descubra e compartilhe receitas veganas deliciosas, conecte-se com outros veganos e vegetarianos e explore o mundo da culinária vegana.",
    siteName: "VegCom",
  },
  twitter: {
    card: "summary_large_image",
    title: "VegCom - Comunidade Vegana de Receitas e Conexões",
    description:
      "Descubra e compartilhe receitas veganas deliciosas, conecte-se com outros veganos e explore um mundo de culinária plant-based.",
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
    apple: "/apple-touch-icon.png",
  },
};

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
      <body className="h-full bg-green-50" suppressHydrationWarning>
        <QueryClientWrapper>
          <NavigationHistoryProvider>
            <ProgressProviderClient>{children}</ProgressProviderClient>
            <Toaster />
          </NavigationHistoryProvider>
        </QueryClientWrapper>
        <SpeedInsights />
        <Analytics />

        {/* <!-- Google tag (gtag.js) --> */}
        <Script
          id="google-gtm"
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=AW-18183047572"
        />
        <Script
          id="google-gtm"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'AW-18183047572');
            `,
          }}
        />

        {/* Google tag (gtag.js) */}
        <Script
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=G-BX49PBRG5B"
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-BX49PBRG5B');
            `,
          }}
        />
      </body>
    </html>
  );
}
