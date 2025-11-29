import { Suspense } from "react";
import RecipeActionsClient from "./RecipeActionsClient";

interface Props {
  isFavorites?: boolean;
}

export default function RecipeActions({ isFavorites }: Props) {
  return (
    <Suspense fallback={<div>Carregando receitas...</div>}>
      <RecipeActionsClient isFavorites={isFavorites} />
    </Suspense>
  );
}
