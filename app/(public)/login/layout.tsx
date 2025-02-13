import BackgroundItems from "@/components/auth/ui/Login/BackgroundItems";
import "../../../src/assets/background.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section className="size-full overflow-hidden h-dvh">
      <div className="max-w-[90rem] h-full mx-auto relative px-6 md:px-0">
        {children}
        <BackgroundItems />
      </div>
    </section>
  );
}
