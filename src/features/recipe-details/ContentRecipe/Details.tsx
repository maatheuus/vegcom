import { type Difficulty, MealType } from "@/features/recipes/api/types";
import Col from "@/shared/ui/Layout/Helpers/Col";
import Text from "@/shared/ui/Text";
import {
  ChefHatIcon,
  ClockIcon,
  TargetIcon,
  UsersIcon,
} from "@phosphor-icons/react/ssr";
import { memo } from "react";
import { formatCategoryLabel, formatDifficultyLabel } from "./utils";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  cookTime?: string;
  quantity?: string;
  difficulty?: Difficulty;
  category?: MealType | string;
}

const Details = memo(function Details({
  className,
  cookTime,
  quantity,
  difficulty,
  category,
  ...props
}: Props) {
  const details = [
    {
      icon: <ClockIcon className="h-5 w-5 text-green-500" />,
      label: "Tempo de preparo",
      value: cookTime,
      ariaLabel: `Tempo de preparo: ${cookTime}`,
    },
    {
      icon: <UsersIcon className="h-5 w-5 text-green-500" />,
      label: "Porções",
      value: quantity,
      ariaLabel: `Rendimento: ${quantity} porções`,
    },
    {
      icon: <TargetIcon className="h-5 w-5 text-green-500" />,
      label: "Dificuldade",
      value: difficulty ? formatDifficultyLabel(difficulty) : undefined,
      ariaLabel: `Nível de dificuldade: ${difficulty}`,
    },
    {
      icon: <ChefHatIcon className="h-5 w-5 text-green-500" />,
      label: "Categoria",
      value: category ? formatCategoryLabel(category) : undefined,
      ariaLabel: `Categoria: ${category}`,
    },
  ];

  return (
    <div
      className={`grid w-full grid-cols-2 gap-4 self-center md:flex ${className ? className : ""}`}
      role="list"
      aria-label="Detalhes da receita"
      {...props}
    >
      {details
        .filter((d) => d.value)
        .map((detail, index) => (
          <Detail
            key={index}
            icon={detail.icon}
            label={detail.label}
            value={detail.value!}
            ariaLabel={detail.ariaLabel}
          />
        ))}
    </div>
  );
});

interface DetailProps {
  label: string;
  value: string;
  icon?: React.JSX.Element;
  ariaLabel: string;
}

const Detail = memo(function Detail({
  label,
  value,
  icon,
  ariaLabel,
}: DetailProps) {
  return (
    <Col
      className="flex-1 items-center justify-center gap-1 rounded-xl bg-green-50 p-4 px-4 shadow-sm"
      role="listitem"
      aria-label={ariaLabel}
    >
      {icon && <span aria-hidden="true">{icon}</span>}
      {Boolean(label) && (
        <Text type={Text.Type.BodyFive} className="font-maitree text-green-500">
          {label}
        </Text>
      )}
      {Boolean(value) && (
        <Text
          as="span"
          type={Text.Type.BodyThree}
          weight={Text.Weight.Bold}
          className="font-maitree text-green-900"
        >
          {value}
        </Text>
      )}
    </Col>
  );
});

export default Details;
