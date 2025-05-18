// import AsideCards from "@/components/community/AsideContent";
import Background from "@/components/community/Background";
import CommunityLayout from "@/components/community/Layout";
import Layout from "@/components/ui/Layout/";

export default function Page() {
  return (
    <Layout.Default extraChildren={<Background />}>
      <CommunityLayout className="col-start-1 col-end-16" />
      {/* <AsideCards className="col-start-13" /> */}
    </Layout.Default>
  );
}
