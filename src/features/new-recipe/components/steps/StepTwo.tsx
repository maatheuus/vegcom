import type { NewRecipeForm } from "@/features/new-recipe/utils";
import GroupFields from "../GroupFields";
import StepShared from "./StepShared";

export default function StepTwo({ form }: { form: NewRecipeForm }) {
  return (
    <StepShared
      title="Agora sim, o que interessa"
      description="Ingredientes de um lado, preparo do outro. Aqui mora a receita de verdade."
    >
      <div className="grid grid-cols-1 items-start gap-4 md:gap-8 lg:grid-cols-2">
        <GroupFields form={form} type="ingredients" />
        <GroupFields form={form} type="instructions" />
      </div>
    </StepShared>
  );
}
