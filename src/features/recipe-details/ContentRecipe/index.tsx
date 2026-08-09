import Col from "@/shared/ui/Layout/Helpers/Col";
import Grid from "@/shared/ui/Layout/Helpers/Grid";
import Text from "@/shared/ui/Text";
import ChecklistSection from "./ChecklistSection";
import CommentsSection from "./CommentsSection";
import Details from "./Details";

import type { DetailedRecipe } from "@/features/recipes/api/types";
import RecipeGallery from "./RecipeGallery";

interface Props {
  recipe: DetailedRecipe;
}

export default function ContentRecipe({ recipe }: Props) {
  const edittedImages = recipe.images.map((image) => ({
    src: image,
    alt: recipe.title,
  }));

  return (
    <div className="flex w-full flex-col gap-y-8">
      <Col className="gap-y-6">
        <div className="sr-only">
          <h2>Sobre esta receita de {recipe.title}</h2>
          <p>
            Esta é uma receita de culinária vegana e plant-based do tipo{" "}
            {recipe.category}. É considerada de nível de dificuldade{" "}
            {recipe.difficulty} e rende aproximadamente {recipe.quantity}.
          </p>
        </div>
        <Text as="p" type={Text.Type.BodyThree} className="text-green-500">
          {recipe.description}
        </Text>

        <RecipeGallery images={edittedImages} />

        <Details
          cookTime={recipe.cookTime}
          quantity={recipe.quantity}
          difficulty={recipe.difficulty}
          category={recipe.category}
        />
      </Col>
      <Grid
        className={`grid-cols-1 gap-6 md:grid-cols-2 md:gap-10 ${recipe.steps.cookingNotes.length > 0 ? "lg:grid-cols-3" : "lg:grid-cols-2"}`}
      >
        {recipe.steps.ingredients && recipe.steps.ingredients.length > 0 && (
          <ChecklistSection
            title="Ingredientes"
            type="ingredients"
            storageKey="checklist-ingredients"
            items={recipe.steps.ingredients}
          />
        )}

        {recipe.steps.instructions && recipe.steps.instructions.length > 0 && (
          <ChecklistSection
            title="Modo de preparo"
            type="instructions"
            storageKey="checklist-instructions"
            items={recipe.steps.instructions}
          />
        )}

        {recipe.steps.cookingNotes && recipe.steps.cookingNotes.length > 0 && (
          <ChecklistSection
            title="Dicas do Chef"
            type="cookingNotes"
            items={recipe.steps.cookingNotes}
          />
        )}
      </Grid>

      <CommentsSection recipeId={recipe.id} />
    </div>
  );
}
