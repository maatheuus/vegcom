import TabsLayout from "@/features/chat/components/tabsComponents/TabsLayout";
import Layout from "@/shared/ui/Layout";
import Col from "@/shared/ui/Layout/Helpers/Col";
import { CircleNotchIcon } from "@phosphor-icons/react/dist/ssr";
import { Suspense } from "react";

export default function ChatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Layout.Default className="mb-4 h-full md:mb-8 lg:mb-12" noFooter>
      <Col className="relative h-full flex-1 space-y-4">
        <Suspense
          fallback={
            <CircleNotchIcon
              size={44}
              className="mx-auto my-auto animate-spin text-green-500"
            />
          }
        >
          <div className="h-full w-full rounded-lg border border-green-500 px-3 py-3 md:px-4 md:py-5">
            <Col className="relative h-full w-full gap-y-4">
              <TabsLayout />
              <div className="relative h-full w-full">{children}</div>
            </Col>
          </div>
        </Suspense>
      </Col>
    </Layout.Default>
  );
}
