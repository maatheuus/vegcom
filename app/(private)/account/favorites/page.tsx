import RecipeActions from "@/features/account/components/(recipes)/RecipeActions";
import AccountLayout from "@/features/account/components/AccountLayout";
import Header from "@/features/account/components/Header";
import { HeartOutlinedIcon } from "@/shared/icons";
import Button from "@/shared/ui/Button";

export default function Page() {
  return (
    <AccountLayout>
      <Header
        title="Receitas Favoritas"
        subTitle="Suas receitas salvas e favoritas"
      >
        <Button.Link
          leftIcon={<HeartOutlinedIcon className="!size-4" />}
          size="md"
          className="font-maitree cursor-pointer bg-green-500 py-2"
          href="/recipes"
          text="Explorar Receitas"
        />
      </Header>

      <RecipeActions isFavorites />
    </AccountLayout>
  );
}
