import { food } from "@/assets";
import Col from "@/components/ui/Layout/Helpers/Col";
import Grid from "@/components/ui/Layout/Helpers/Grid";
import Text from "@/components/ui/Text";
import Image from "next/image";
import ChecklistSection from "./ChecklistSection";
import CommentsSection from "./CommentsSection";
import Details from "./Details";
import { mockComments, mockCookingNotes, mockIngredients, mockInstructions } from "./utils";


export default function ContentRecipe() {
  return (
    <Col className="gap-y-6">
      <Col className="gap-y-6">
        <div className="aspect-[21/9] sm:aspect-[18/9] relative rounded-lg overflow-hidden">
          <Image
            src={food}
            fill
            alt="Tofu Stir-Fry com legumes"
            className="object-cover w-full h-full"
          />
        </div>

        <Details preparationTime="30 min" servings="4" difficulty="Easy" />

        <Text as="p" type={Text.Type.BodyThree} className="text-green-500">
          O tofu é uma excelente fonte de proteína vegetal e pode ser preparado
          de várias maneiras. Nesta receita, ele é combinado com legumes frescos
          e um molho agridoce, criando um prato saboroso e nutritivo.
        </Text>
      </Col>
      <Grid className="gap-10 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
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
    </Col>
  );
}
