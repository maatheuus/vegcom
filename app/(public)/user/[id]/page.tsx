import { getUserDetails } from "@/features/userProfile/api/userApi";
import { UserProfileHeader } from "@/features/userProfile/components/UserProfileHeader";
import UserProfileTabsClient from "@/features/userProfile/components/UserProfileTabsClient";
import Layout from "@/shared/ui/Layout/";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function Page({ params }: Props) {
  const { id } = await params;
  const response = await getUserDetails(Number(id)).catch(() => null);

  if (!response?.data) notFound();

  const user = response.data;
  return (
    <Layout.Default className="h-auto">
      <section className="container mx-auto px-4 py-8">
        <div className="mx-auto flex max-w-5xl flex-col gap-y-4">
          <UserProfileHeader user={user} />
          <UserProfileTabsClient user={user} />
        </div>
      </section>
    </Layout.Default>
  );
}
