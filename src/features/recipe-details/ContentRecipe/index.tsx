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
      <Grid className="grid-cols-1 gap-6 md:grid-cols-2 md:gap-10 lg:grid-cols-3">
        <ChecklistSection
          title="Ingredients"
          type="ingredients"
          storageKey="checklist-ingredients"
          items={recipe.steps.ingredients}
        />

        <ChecklistSection
          title="Instructions"
          type="instructions"
          storageKey="checklist-instructions"
          items={recipe.steps.instructions}
        />

        <ChecklistSection
          title="Cooking Notes"
          type="cookingNotes"
          items={recipe.steps.cookingNotes}
        />
      </Grid>

      <CommentsSection
        comments={recipe.comments}
        user={recipe.user}
        recipeId={recipe.id}
      />
    </div>
  );
}
