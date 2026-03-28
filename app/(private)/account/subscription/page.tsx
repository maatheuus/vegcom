import { getProducts } from "@/features/account/apiSubscription/queries/getSubscriptionApiServer";
import SubscriptionProvider from "@/features/account/components/(subscriptions)/SubscriptionProvider";
import AccountLayout from "@/features/account/components/AccountLayout";
import Header from "@/features/account/components/Header";

export default async function Page() {
  const { data: productsData } = await getProducts();
  console.log(productsData);

  return (
    <AccountLayout>
      <Header title="Assinatura" subTitle="Gerencie sua assinatura" />
      <SubscriptionProvider productsData={productsData} />
    </AccountLayout>
  );
}
