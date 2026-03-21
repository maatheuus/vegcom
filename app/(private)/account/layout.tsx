import AccountHeader from "@/features/account/components/AccountHeader";
import Sidebar from "@/features/account/components/Sidebar";
import Layout from "@/shared/ui/Layout";
import { Suspense } from "react";

export default function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Layout.Default className="style-scrollbar h-auto">
      <div className="w-full space-y-8 py-8">
        <div className="flex items-center justify-between gap-x-4">
          <Suspense fallback={<></>}>
            <AccountHeader />
          </Suspense>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[320px_1fr]">
          <aside className="h-fit">
            <Sidebar />
          </aside>

          <main className="min-h-[600px]">{children}</main>
        </div>
      </div>
    </Layout.Default>
  );
}
