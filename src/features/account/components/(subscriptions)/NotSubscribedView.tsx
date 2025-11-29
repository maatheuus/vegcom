import { SparklesOutlinedIcon } from "@/shared/icons";
import Button from "@/shared/ui/Button";
import Col from "@/shared/ui/Layout/Helpers/Col";
import Row from "@/shared/ui/Layout/Helpers/Row";
import Text from "@/shared/ui/Text";

interface Props {
  className?: string;
}

const features = [
  "Acesso ilimitado a todas as receitas",
  "Crie e compartilhe receitas sem limites",
  "Salve quantas receitas favoritas quiser",
  "Suporte prioritário via chat",
];

export default function NotSubscribedView({ className, ...props }: Props) {
  return (
    <div className={`space-y-8 ${className || ""}`} {...props}>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <Card
          title="Tudo o que você precisa"
          description="Desbloqueie todos os recursos premium"
          list={features}
        />

        <Card
          title="Premium"
          description="Desbloqueie todos os recursos premium"
        >
          <Col className="gap-y-6">
            <div className="flex items-baseline gap-1">
              <Text
                as="span"
                type={Text.Type.HeadingTwo}
                weight={Text.Weight.Bold}
                className="font-lora text-green-500"
              >
                R$ 9,99
              </Text>
              <Text
                as="span"
                type={Text.Type.BodyThree}
                weight={Text.Weight.Medium}
                className="font-maitree text-green-200"
              >
                /mês
              </Text>
            </div>

            <Button
              variant="default"
              size="lg"
              className="font-maitree w-full cursor-pointer"
            >
              Assinar
            </Button>
          </Col>
        </Card>
      </div>

      <div className="rounded-xl border border-green-200 bg-green-50 p-6">
        <Row className="items-center gap-4">
          <div className="flex size-12 items-center justify-center rounded-full bg-green-500">
            <SparklesOutlinedIcon size={24} className="text-green-50" />
          </div>
          <div className="flex-1">
            <Text
              as="h4"
              type={Text.Type.BodyTwo}
              weight={Text.Weight.Bold}
              className="font-lora text-green-500"
            >
              Sem Risco, Cancele Quando Quiser
            </Text>
            <Text
              as="p"
              type={Text.Type.BodyFour}
              weight={Text.Weight.Medium}
              className="font-maitree text-green-200"
            >
              Você pode cancelar sua assinatura a qualquer momento. Não fazemos
              perguntas!
            </Text>
          </div>
        </Row>
      </div>
    </div>
  );
}

interface CardProps {
  title: string;
  description: string;
  list?: string[];
  children?: React.ReactNode;
}

function Card({ title, description, list, children }: CardProps) {
  return (
    <div className="rounded-xl border border-green-500 bg-green-50 p-6">
      <div className="space-y-6">
        <div>
          <Text
            as="h3"
            type={Text.Type.HeadingFour}
            weight={Text.Weight.Bold}
            className="font-lora text-green-500"
          >
            {title}
          </Text>
          <Text
            as="p"
            type={Text.Type.BodyThree}
            weight={Text.Weight.Medium}
            className="font-maitree text-green-200"
          >
            {description}
          </Text>
        </div>
        {children && children}

        {list && (
          <ul className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {list.map((item, idx) => (
              <li key={idx} className="flex items-center gap-3">
                <Text
                  as="span"
                  type={Text.Type.BodyThree}
                  weight={Text.Weight.Medium}
                  className="font-maitree text-green-200"
                >
                  {item}
                </Text>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
