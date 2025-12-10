import RecipeActions from "@/features/account/components/(recipes)/RecipeActions";
import AccountLayout from "@/features/account/components/AccountLayout";
import Header from "@/features/account/components/Header";
import { PlusCircleIcon } from "@phosphor-icons/react/ssr";

export default function Page() {
  return (
    <AccountLayout>
      <Header
        title="Minhas Receitas"
        subTitle="Gerencie e organize suas receitas criadas"
        actions={[
          {
            text: "Nova Receita",
            icon: <PlusCircleIcon className="!size-4" />,
            href: "/new-recipe",
          },
        ]}
      />

      <RecipeActions />
    </AccountLayout>
  );
}
