import PremiumMemberCard from "@/features/account/components/PremiumMemberCard";
import Sidebar from "@/features/account/components/Sidebar";
import {
  ChefHatOutlinedIcon,
  GearOutlinedIcon,
  HeartOutlinedIcon,
  ScrollOutlinedIcon,
  UserOutlinedIcon,
} from "@/shared/icons";
import Layout from "@/shared/ui/Layout";
import Text from "@/shared/ui/Text";

const sidebarItems = [
  {
    label: "Perfil",
    href: "/account",
    icon: <UserOutlinedIcon size={20} />,
  },
  {
    label: "Minhas Receitas",
    href: "/account/recipes",
    icon: <ChefHatOutlinedIcon size={20} />,
  },
  {
    label: "Favoritos",
    href: "/account/favorites",
    icon: <HeartOutlinedIcon size={20} />,
  },
  {
    label: "Assinatura",
    href: "/account/subscription",
    icon: <ScrollOutlinedIcon size={20} />,
  },
  {
    label: "Configurações",
    href: "/account/settings",
    icon: <GearOutlinedIcon size={20} />,
  },
];

export default function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Layout.Default className="style-scrollbar overflow-y-auto bg-green-50">
      <div className="mx-auto w-full max-w-7xl space-y-8 py-8">
        <div className="flex items-center justify-between">
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
            <Sidebar items={sidebarItems} />
          </aside>

          <main className="min-h-[600px]">{children}</main>
        </div>
      </div>
    </Layout.Default>
  );
}
