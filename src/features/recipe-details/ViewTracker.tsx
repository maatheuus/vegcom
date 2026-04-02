"use client";

import { recipeApi } from "@/features/recipes/api/recipesApi";
import { useEffect } from "react";

interface ViewTrackerProps {
  recipeId: number;
}

export function ViewTracker({ recipeId }: ViewTrackerProps) {
  useEffect(() => {
    const trackView = async () => {
      const viewedKey = `recipe-viewed-${recipeId}`;
      if (sessionStorage.getItem(viewedKey)) return;

      try {
        const result = await recipeApi.incrementView(recipeId);
        if (result.success) {
          sessionStorage.setItem(viewedKey, "true");
        }
      } catch (error) {
        console.error("Failed to increment view:", error);
      }
    };

    if (recipeId) {
      trackView();
    }
  }, [recipeId]);

  return null;
}
