import { MealType, type Difficulty } from "@/features/recipes/api/types";
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
  cookTime: string;
  quantity: string;
  difficulty: Difficulty;
  category: MealType;
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
      value: formatDifficultyLabel(difficulty),
      ariaLabel: `Nível de dificuldade: ${difficulty}`,
    },
    {
      icon: <ChefHatIcon className="h-5 w-5 text-green-500" />,
      label: "Categoria",
      value: formatCategoryLabel(category),
      ariaLabel: `Categoria: ${category}`,
    },
  ];

  return (
    <div
      className={`grid w-full grid-cols-2 gap-4 self-center md:grid-cols-4 ${className ? className : ""}`}
      role="list"
      aria-label="Detalhes da receita"
      {...props}
    >
      {details.map((detail, index) => (
        <Detail
          key={index}
          icon={detail.icon}
          label={detail.label}
          value={String(detail.value)}
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
      className="items-center justify-center gap-1 rounded-xl bg-green-50 p-4 px-4 shadow-sm"
      role="listitem"
      aria-label={ariaLabel}
    >
      {icon && <span aria-hidden="true">{icon}</span>}
      {label && (
        <Text type={Text.Type.BodyFive} className="font-maitree text-green-500">
          {label}
        </Text>
      )}
      {value && (
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
