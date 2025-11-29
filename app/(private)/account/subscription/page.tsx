import SubscriptionProvider from "@/features/account/components/(subscriptions)/SubscriptionProvider";
import AccountLayout from "@/features/account/components/AccountLayout";
import Header from "@/features/account/components/Header";

export default function Page() {
  return (
    <AccountLayout>
      <Header title="Assinatura" subTitle="Gerencie sua assinatura" />
      <SubscriptionProvider />
    </AccountLayout>
  );
}
