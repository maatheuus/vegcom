import TabsLayout from "@/features/curiosity/components/tabsComponentsPage/TabsLayout";
import Layout from "@/shared/ui/Layout";
import Col from "@/shared/ui/Layout/Helpers/Col";
import { Suspense } from "react";

export default function Page() {
  return (
    <Layout.Default className="style-scrollbar h-full">
      <Col className="relative flex-1 space-y-8">
        <Suspense fallback={<div>loading...</div>}>
          <TabsLayout />
        </Suspense>
      </Col>
    </Layout.Default>
  );
}
