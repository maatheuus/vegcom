import type { Recipe } from "@/features/chat/api/types";
import Button from "@/shared/ui/Button";
import Text from "@/shared/ui/Text";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/shared/ui/Tooltip";
import {
  CheckIcon,
  ClockIcon,
  CookingPotIcon,
  CopyIcon,
  FireIcon,
  LeafIcon,
  UsersIcon,
} from "@phosphor-icons/react";
import { useState } from "react";

interface RecipeEmbedProps {
  recipe: Recipe;
}

export default function RecipeEmbed({ recipe }: RecipeEmbedProps) {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopyRecipe = () => {
    const text = [
      recipe.title,
      recipe.description,
      "",
      `Porções: ${recipe.servings || "-"}`,
      `Tempo de preparo: ${recipe.prepTimeMinutes || "-"} min`,
      `Tempo de cozimento: ${recipe.cookTimeMinutes || "-"} min`,
      "",
      "Ingredientes:",
      ...(recipe.ingredients?.map(
        (ing) =>
          `- ${ing.quantity} ${ing.name} ${ing.notes ? `(${ing.notes})` : ""}`,
      ) || []),
      "",
      "Modo de Preparo:",
      ...(recipe.steps?.map((step, idx) => `${idx + 1}. ${step}`) || []),
    ].join("\n");

    navigator.clipboard.writeText(text);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="flex w-full flex-col gap-4 rounded-xl border border-green-200 bg-white/80 p-3 shadow-sm md:p-5">
      {/* Header */}
      <div className="flex flex-col gap-2 border-b border-green-100 pb-4">
        <div className="flex items-start justify-between gap-4">
          {recipe.title && (
            <Text
              type={Text.Type.BodyThree}
              className="font-lora font-semibold text-green-800"
            >
              {recipe.title}
            </Text>
          )}
          <div className="flex items-center gap-2">
            {recipe.diet && (
              <span className="flex shrink-0 items-center gap-1 rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-700">
                <LeafIcon weight="fill" />
                {recipe.diet.charAt(0).toUpperCase() + recipe.diet.slice(1)}
              </span>
            )}
            <TooltipProvider>
              <Tooltip delayDuration={60}>
                <TooltipTrigger asChild>
                  <Button.Icon
                    onClick={handleCopyRecipe}
                    className="flex items-center rounded px-1 py-1 text-xs text-green-500 transition-colors hover:bg-green-500/20 hover:text-green-500"
                    variant="text"
                    icon={
                      isCopied ? (
                        <CheckIcon size={16} />
                      ) : (
                        <CopyIcon size={16} />
                      )
                    }
                  />
                </TooltipTrigger>
                <TooltipContent side="bottom">
                  <span>{isCopied ? "Copiado!" : "Copiar receita"}</span>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
        {recipe.description && (
          <Text className="font-maitree text-sm text-gray-600">
            {recipe.description}
          </Text>
        )}
      </div>

      {/* Meta Info */}
      <div className="flex flex-wrap gap-4 text-xs text-green-700">
        {recipe.servings && (
          <div className="flex items-center gap-1.5 rounded-md bg-green-50 px-2.5 py-1.5">
            <UsersIcon size={16} />
            <span>{recipe.servings} porções</span>
          </div>
        )}
        {recipe.prepTimeMinutes && (
          <div className="flex items-center gap-1.5 rounded-md bg-green-50 px-2.5 py-1.5">
            <ClockIcon size={16} />
            <span>Prep: {recipe.prepTimeMinutes}min</span>
          </div>
        )}
        {recipe.cookTimeMinutes && recipe.cookTimeMinutes !== 0 && (
          <div className="flex items-center gap-1.5 rounded-md bg-green-50 px-2.5 py-1.5">
            <FireIcon size={16} />
            <span>Cozimento: {recipe.cookTimeMinutes}min</span>
          </div>
        )}
      </div>

      {/* Ingredients */}
      {recipe.ingredients && recipe.ingredients.length > 0 && (
        <div className="flex flex-col gap-2 rounded-lg bg-green-50/50 p-2 md:p-4">
          <div className="flex items-center gap-2 text-green-800">
            <CookingPotIcon size={18} />
            <Text type={Text.Type.BodyFour} className="font-lora font-semibold">
              Ingredientes
            </Text>
          </div>
          <ul className="grid grid-cols-1 gap-x-8 gap-y-2 text-sm sm:grid-cols-2">
            {recipe.ingredients.map((ing, idx) => (
              <li key={idx} className="flex items-baseline gap-2 text-gray-700">
                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-green-400" />
                <div className="flex flex-1 flex-col">
                  <span className="font-maitree text-sm">
                    {ing.name} (
                    <span className="font-semibold text-green-900">
                      {ing.quantity}
                    </span>
                    )
                  </span>
                  {ing.notes && (
                    <span className="text-xs text-gray-500 italic">
                      {" "}
                      (nota: {ing.notes})
                    </span>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Steps */}
      {recipe.steps && recipe.steps.length > 0 && (
        <div className="flex flex-col gap-3">
          <Text
            type={Text.Type.BodyFour}
            className="font-lora font-semibold text-green-800"
          >
            Modo de Preparo
          </Text>
          <div className="flex flex-col gap-3">
            {recipe.steps.map((step, idx) => (
              <div key={idx} className="flex gap-3 text-sm">
                <span className="font-lora flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-100 text-xs font-bold text-green-700">
                  {idx + 1}
                </span>
                <Text className="font-maitree flex-1 pt-0.5 leading-relaxed text-gray-700">
                  {step}
                </Text>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
