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
    <html lang="pt" suppressHydrationWarning>
      <body className="bg-green-100 font-frank">{children}</body>
    </html>
  );
}
