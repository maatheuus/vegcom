"use client";

import Row from "@/shared/ui/Layout/Helpers/Row";
import { HeartIcon } from "@phosphor-icons/react";
import { memo, useEffect, useState, useTransition } from "react";
import { useFavoriteRecipe } from "../recipes/api/queries/getRecipesApiClient";
import type { User } from "../auth/api/types";

interface SaveRecipeButtonProps {
  user: User | undefined;
  recipeId: number;
}

const SaveRecipeButton = memo(function SaveRecipeButton({
  user,
  recipeId,
}: SaveRecipeButtonProps) {
  const initialSaved =
    user?.savedRecipes?.some((saved) => saved.id === recipeId) ?? false;

  const [isSaved, setIsSaved] = useState(initialSaved);
  const [isMounted, setIsMounted] = useState(false);
  const [isPending, startTransition] = useTransition();
  const { mutateAsync: favoriteRecipe, data } = useFavoriteRecipe();

  useEffect(() => {
    setIsMounted(true);
    setIsSaved(initialSaved);
  }, [initialSaved]);

  const handleFavorite = async (e: React.MouseEvent | React.KeyboardEvent) => {
    if (!recipeId || isPending) return;

    const previousState = isSaved;
    setIsSaved(!previousState);

    try {
      startTransition(async () => {
        await favoriteRecipe(Number(recipeId));

        if (data && Boolean(data.saved)) {
          setIsSaved(data.saved);
        }
      });
    } catch (error) {
      console.error("Error favoriting recipe:", error);
      setIsSaved(previousState);
    }
  };

  return (
    <Row
      onClick={handleFavorite}
      className="cursor-pointer select-none"
      role="button"
      tabIndex={0}
      aria-label={
        isSaved
          ? "Remover receita dos favoritos"
          : "Salvar receita nos favoritos"
      }
      aria-pressed={isSaved}
    >
      {isPending ? (
        <span className="h-4 w-4 animate-spin rounded-full border-2 border-green-500 border-t-transparent" />
      ) : (
        <HeartIcon
          weight={!isMounted ? "regular" : isSaved ? "fill" : "regular"}
          size={18}
          className="text-green-500"
          aria-hidden="true"
        />
      )}
    </Row>
  );
});

export default SaveRecipeButton;
