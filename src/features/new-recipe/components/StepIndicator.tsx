import {
  CheckIcon,
  ChefHatIcon,
  ListBulletsIcon,
  MagnifyingGlassIcon,
} from "@phosphor-icons/react";

const steps = [
  {
    title: "Fundamentos",
    subtitle: "Título, foto, categoria",
    Icon: ChefHatIcon,
  },
  {
    title: "A receita",
    subtitle: "Ingredientes e preparo",
    Icon: ListBulletsIcon,
  },
  {
    title: "Revisar & publicar",
    subtitle: "Dicas e imagens extras",
    Icon: MagnifyingGlassIcon,
  },
];

interface StepIndicatorProps {
  currentStep: number;
}

export default function StepIndicator({ currentStep }: StepIndicatorProps) {
  return (
    <div className="hidden-scrollbar flex touch-pan-x gap-2 overflow-x-auto scroll-auto rounded-xl bg-green-500 p-2">
      {steps.map(({ title, subtitle, Icon }, index) => {
        const stepNum = index + 1;
        const isActive = currentStep === stepNum;
        const isCompleted = currentStep > stepNum;

        return (
          <div
            key={stepNum}
            className={`flex flex-1 items-center gap-3 rounded-lg px-3 py-2 transition-colors ${
              isActive || isCompleted ? "bg-green-50" : ""
            }`}
          >
            <div
              className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-md font-semibold ${
                isActive || isCompleted
                  ? "bg-green-500 text-green-50"
                  : "bg-green-500/30 text-green-50"
              }`}
            >
              {isCompleted ? (
                <CheckIcon size={18} weight="bold" />
              ) : (
                <Icon size={18} weight="bold" />
              )}
            </div>

            <div className="min-w-0">
              <p
                className={`font-lora truncate text-base font-bold ${
                  isActive || isCompleted ? "text-green-500" : "text-green-50"
                }`}
              >
                {title}
              </p>
              <p
                className={`truncate text-sm ${
                  isActive || isCompleted
                    ? "text-green-500/70"
                    : "text-green-50/60"
                }`}
              >
                {subtitle}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
