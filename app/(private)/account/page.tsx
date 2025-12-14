import InformationWrapper from "@/features/account/components/(personal-info)/InformationWrapper";
import AccountLayout from "@/features/account/components/AccountLayout";
import { getUser } from "@/features/auth/api/queries/getAuthApiServer";

export default async function Page() {
  const user = await getUser();

  return (
    <AccountLayout>
      <InformationWrapper user={user.data} />
    </AccountLayout>
  );
}
