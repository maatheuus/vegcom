import BackButton from "@/features/recipe-details/BackButton";
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
    <Layout.Default className="style-scrollbar">
      <div className="body__container-lg--no-padding flex w-full flex-col gap-y-5 py-0">
        <BackButton />
        <div className="mx-auto flex w-full max-w-5xl flex-col gap-y-5 py-6">
          <UserProfileHeader user={user} />
          <UserProfileTabsClient user={user} />
        </div>
      </div>
    </Layout.Default>
  );
}
