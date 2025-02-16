import "../../../src/assets/background.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section className="size-full overflow-hidden h-dvh">
      <div className="h-full relative px-6 md:px-0">{children}</div>
    </section>
  );
}
