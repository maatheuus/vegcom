import Layout from "@/shared/ui/Layout";

import CuriositiesPage from "@/features/curiosities/components/page/CuriositiesPage";

export default function page() {
  return (
    <Layout.Default className="style-scrollbar h-[90dvh]">
      <CuriositiesPage />
    </Layout.Default>
  );
}
