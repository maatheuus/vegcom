"use client";

import RecipeActions from "@/features/account/components/(recipes)/RecipeActions";
import AccountLayout from "@/features/account/components/AccountLayout";
import Header from "@/features/account/components/Header";
import { PlusCircleIcon } from "@phosphor-icons/react";

export default function Page() {
  return (
    <AccountLayout>
      <Header
        title="Receitas Favoritas"
        subTitle="Suas receitas salvas e favoritas"
        hideMobileActions
        actions={[
          {
            text: "Nova Receita",
            icon: <PlusCircleIcon className="!size-4" />,
            href: "/new-recipe",
          },
        ]}
      />

      <RecipeActions isFavorites />
    </AccountLayout>
  );
}
