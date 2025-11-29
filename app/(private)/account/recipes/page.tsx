import RecipeActions from "@/features/account/components/(recipes)/RecipeActions";
import AccountLayout from "@/features/account/components/AccountLayout";
import Header from "@/features/account/components/Header";
import Button from "@/shared/ui/Button";
import { PlusCircleIcon } from "@phosphor-icons/react/ssr";

export default function Page() {
  return (
    <AccountLayout>
      <Header
        title="Minhas Receitas"
        subTitle="Gerencie e organize suas receitas criadas"
      >
        <Button.Link
          leftIcon={<PlusCircleIcon className="!size-4" />}
          size="md"
          className="font-maitree cursor-pointer bg-green-500 py-2"
          text="Nova Receita"
          href="/new-recipe"
        />
      </Header>

      <RecipeActions />
    </AccountLayout>
  );
}
