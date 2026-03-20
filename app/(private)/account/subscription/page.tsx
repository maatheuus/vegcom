import { getProducts } from "@/features/account/apiSubscription/queries/getSubscriptionApiServer";
import SubscriptionProvider from "@/features/account/components/(subscriptions)/SubscriptionProvider";
import AccountLayout from "@/features/account/components/AccountLayout";
import Header from "@/features/account/components/Header";
import { getUser } from "@/features/auth/api/queries/getAuthApiServer";

export default async function Page() {
  const { data: user } = await getUser();
  const { data: productsData } = await getProducts();

  return (
    <AccountLayout>
      <Header title="Assinatura" subTitle="Gerencie sua assinatura" />
      <SubscriptionProvider user={user} productsData={productsData} />
    </AccountLayout>
  );
}
