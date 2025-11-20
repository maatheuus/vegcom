import { food } from "@/assets";
import Col from "@/shared/ui/Layout/Helpers/Col";
import Grid from "@/shared/ui/Layout/Helpers/Grid";
import Text from "@/shared/ui/Text";
import ChecklistSection from "./ChecklistSection";
import CommentsSection from "./CommentsSection";
import Details from "./Details";
import {
  mockComments,
  mockCookingNotes,
  mockIngredients,
  mockInstructions,
} from "./utils";

import RecipeGallery from "./RecipeGallery";

export default function ContentRecipe() {
  const mockImages = Array(6)
    .fill({
      src: food,
      alt: "Salada mista com carne",
    })
    .map((img, index) => ({
      ...img,
      isFeatured: index === 0,
    }));

  return (
    <div className="flex w-full flex-col gap-y-8">
      <Col className="gap-y-6">
        <Text as="p" type={Text.Type.BodyThree} className="text-green-500">
          O tofu é uma excelente fonte de proteína vegetal e pode ser preparado
          de várias maneiras. Nesta receita, ele é combinado com legumes frescos
          e um molho agridoce, criando um prato saboroso e nutritivo.
        </Text>

        <RecipeGallery images={mockImages} />

        <Details
          preparationTime="30 min"
          servings="4"
          difficulty="Fácil"
          category="Lunch"
        />
      </Col>
      <Grid className="grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3">
        <ChecklistSection
          title="Ingredients"
          type="ingredients"
          storageKey="checklist-ingredients"
          items={mockIngredients}
        />

        <ChecklistSection
          title="Instructions"
          type="instructions"
          storageKey="checklist-instructions"
          items={mockInstructions}
        />

        <ChecklistSection
          title="Cooking Notes"
          type="cookingNotes"
          items={mockCookingNotes}
        />
      </Grid>

      <CommentsSection comments={mockComments} />
    </div>
  );
}
