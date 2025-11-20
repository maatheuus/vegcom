import RecipeActions from "@/features/account/components/(recipes)/RecipeActions";
import AccountLayout from "@/features/account/components/AccountLayout";
import Header from "@/features/account/components/Header";
import { PlusOutlinedIcon } from "@/shared/icons";
import Button from "@/shared/ui/Button";

export default function Page() {
  return (
    <AccountLayout>
      <Header
        title="Minhas Receitas"
        subTitle="Gerencie e organize suas receitas criadas"
      >
        <Button.Link
          leftIcon={<PlusOutlinedIcon className="!size-4" />}
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
