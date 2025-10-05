import { lora, maitree, montserrat, rancho } from "@/assets/fonts";
import QueryClientWrapper from "@/components/tanstack/QueryClientWrapper";
import { Toaster } from "@/components/ui/toaster";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata } from "next";
import "./global.css";

export const metadata: Metadata = {
  title: "VegCom",
  description:
    "A place to you share your favorite vegan recipes and talk to other vegans",
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
      <body className="bg-green-100 h-full">
        <QueryClientWrapper>
          {children}
          <Toaster />
        </QueryClientWrapper>
        <SpeedInsights />
      </body>
    </html>
  );
}
