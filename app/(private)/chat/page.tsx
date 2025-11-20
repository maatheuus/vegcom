import TabsLayout from "@/features/curiosity/components/tabsComponentsPage/TabsLayout";
import Layout from "@/shared/ui/Layout";
import Col from "@/shared/ui/Layout/Helpers/Col";
import { Suspense } from "react";

export default function Page() {
  return (
    <Layout.Default className="">
      <Col className="relative container mx-auto flex-1 space-y-8 px-4">
        <Suspense fallback={<div>loading...</div>}>
          <TabsLayout />
        </Suspense>
      </Col>
    </Layout.Default>
  );
}
