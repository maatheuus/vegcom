import "@/assets/css/login.css";
import BackgroundItems from "@/features/auth/components/Login/BackgroundItems";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Acesso | VegCom",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section className="size-full h-dvh overflow-hidden">
      <div className="relative mx-auto flex h-full max-w-[90rem] flex-col gap-y-8 px-6 md:gap-y-12 md:px-0">
        {children}
        <BackgroundItems />
      </div>
    </section>
  );
}
