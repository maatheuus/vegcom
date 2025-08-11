import Header from "@/components/recipes/details/Header";

import Layout from "@/components/ui/Layout";
import Link from "next/link";

export default function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Layout.Default className="overflow-y-auto style-scrollbar bg-green-50">
      <div className="px-4 py-8 space-y-8 relative">
        <Link href="/account" className="block">
          <Header title="Minha Conta" />
        </Link>
        {children}
      </div>
    </Layout.Default>
  );
}
