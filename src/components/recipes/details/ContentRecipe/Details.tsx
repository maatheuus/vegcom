import { ClockOutlinedIcon, TargetOutlinedIcon, UtensilsOutlinedIcon } from "@/components/icons";
import Col from "@/components/ui/Layout/Helpers/Col";
import Row from "@/components/ui/Layout/Helpers/Row";
import Text from "@/components/ui/Text";
import { memo } from "react";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  preparationTime: string;
  servings: string;
  difficulty: string;
}

const Details = memo(function Details({
  className,
  preparationTime,
  servings,
  difficulty,
  ...props
}: Props) {
  const details = [
    {
      icon: <ClockOutlinedIcon className="w-5 h-5 text-green-500" />,
      label: "Tempo de preparo",
      value: preparationTime,
      ariaLabel: `Tempo de preparo: ${preparationTime}`,
    },
    {
      icon: <UtensilsOutlinedIcon className="w-5 h-5 text-green-500" />,
      label: "Porções",
      value: servings,
      ariaLabel: `Rendimento: ${servings} porções`,
    },
    {
      icon: <TargetOutlinedIcon className="w-5 h-5 text-green-500" />,
      label: "Dificuldade",
      value: difficulty,
      ariaLabel: `Nível de dificuldade: ${difficulty}`,
    },
  ];

  return (
    <Row
      className={`self-center gap-4 ${className ? className : ""}`}
      role="list"
      aria-label="Detalhes da receita"
      {...props}
    >
      {details.map((detail, index) => (
        <Detail
          key={index}
          icon={detail.icon}
          label={detail.label}
          value={detail.value}
          ariaLabel={detail.ariaLabel}
        />
      ))}
    </Row>
  );
});

interface DetailProps {
  label: string;
  value: string;
  icon?: React.JSX.Element;
  ariaLabel: string;
}

const Detail = memo(function Detail({ label, value, icon, ariaLabel }: DetailProps) {
  return (
    <Col 
      className="px-4 items-center gap-1 justify-center bg-green-50 rounded-xl p-4 shadow-sm"
      role="listitem"
      aria-label={ariaLabel}
    >
      {icon && <span aria-hidden="true">{icon}</span>}
      <Text type={Text.Type.BodyFive} className="text-green-500">
        {label}
      </Text>
      <Text
        as="span"
        type={Text.Type.BodyThree}
        weight={Text.Weight.Medium}
        className="text-green-900"
      >
        {value}
      </Text>
    </Col>
  );
});

export default Details;