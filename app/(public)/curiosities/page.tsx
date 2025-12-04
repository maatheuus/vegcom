import Layout from "@/shared/ui/Layout";

import CuriositiesPage from "@/features/curiosity/components/tabsComponentsPage/CuriositiesPage";

export default function page() {
  return (
    <Layout.Default className="style-scrollbar h-[90dvh]">
      <CuriositiesPage />
    </Layout.Default>
  );
}
