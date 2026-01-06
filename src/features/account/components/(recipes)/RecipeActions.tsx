import Loading from "@/shared/components/ui/Loading";
import { Suspense } from "react";
import RecipeActionsClient from "./RecipeActionsClient";

interface Props {
  isFavorites?: boolean;
}

export default function RecipeActions({ isFavorites }: Props) {
  return (
    <Suspense fallback={<Loading size={24} color="green-500" />}>
      <RecipeActionsClient isFavorites={isFavorites} />
    </Suspense>
  );
}
