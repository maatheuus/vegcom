import CommunityLayout from "@/features/community/components/CommunityLayout";
import Layout from "@/shared/ui/Layout/";

export default async function Page() {
  return (
    <Layout.Default
      className="hidden-scrollbar overflow-hidden"
      gridClassName="overflow-auto"
    >
      <section className="hidden-scrollbar container mx-auto overflow-scroll scroll-auto">
        <CommunityLayout
          id="communityLayout"
          className="col-start-1 col-end-16"
        />
      </section>
    </Layout.Default>
  );
}
