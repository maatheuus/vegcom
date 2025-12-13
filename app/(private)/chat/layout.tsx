import ChatProvider from "@/features/chat/components/chat/ChatProvider";
import TabsLayout from "@/features/chat/components/tabsComponents/TabsLayout";
import Layout from "@/shared/ui/Layout";
import Col from "@/shared/ui/Layout/Helpers/Col";
import { Suspense } from "react";

export default function ChatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Layout.Default className="style-scrollbar h-full">
      <Col className="relative flex-1 space-y-4">
        <Suspense fallback={<div>loading...</div>}>
          <div className="h-full w-full overflow-hidden rounded-lg border border-green-500 px-4 py-5">
            <Col className="h-full w-full gap-y-4">
              <TabsLayout />
              <div className="relative h-full w-full overflow-hidden">
                <ChatProvider>{children}</ChatProvider>
              </div>
            </Col>
          </div>
        </Suspense>
      </Col>
    </Layout.Default>
  );
}
