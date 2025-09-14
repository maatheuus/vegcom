import TabsLayout from "@/components/curiosity/tabsComponentsPage/TabsLayout";
import Header from "@/components/recipes/details/Header";
import Layout from "@/components/ui/Layout";
import Col from "@/components/ui/Layout/Helpers/Col";

export default function Page() {
  return (
    <Layout.Default>
      <Col className="px-4 py-8 space-y-8 relative overflow-y-auto style-scrollbar">
        <Header title="Curiosidades" />
        <TabsLayout />
      </Col>
    </Layout.Default>
  );
}
