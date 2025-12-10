import PremiumMemberCard from "@/features/account/components/PremiumMemberCard";
import Sidebar from "@/features/account/components/Sidebar";
import Layout from "@/shared/ui/Layout";
import Text from "@/shared/ui/Text";

export default function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Layout.Default className="style-scrollbar h-auto">
      <div className="w-full space-y-8 py-8">
        <div className="flex items-center justify-between gap-x-4">
          <div>
            <Text
              as="h1"
              type={Text.Type.HeadingThree}
              weight={Text.Weight.Bold}
              className="font-lora text-green-500"
            >
              Gerenciamento de Conta
            </Text>
            <Text
              as="p"
              type={Text.Type.BodyThree}
              weight={Text.Weight.Medium}
              className="font-maitree text-green-200"
            >
              Gerencie suas configurações e preferências de conta
            </Text>
          </div>

          <PremiumMemberCard />
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[320px_1fr]">
          <aside className="h-fit">
            <Sidebar />
          </aside>

          <main className="min-h-[600px]">{children}</main>
        </div>
      </div>
    </Layout.Default>
  );
}
