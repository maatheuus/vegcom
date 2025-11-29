import { CheckFilledIcon, SparklesOutlinedIcon } from "@/shared/icons";
import Button from "@/shared/ui/Button";
import Row from "@/shared/ui/Layout/Helpers/Row";
import Text from "@/shared/ui/Text";

interface Props {
  className?: string;
}

const benefits = [
  "Acesso ilimitado a todas as receitas",
  "Crie e compartilhe receitas sem limites",
  "Salve quantas receitas favoritas quiser",
  "Suporte prioritário via chat",
  "Experiência sem anúncios",
  "Acesso antecipado a novos recursos",
];

export default function SubscribedView({ className, ...props }: Props) {
  return (
    <div className={`space-y-6 ${className || ""}`} {...props}>
      <div className="space-y-6 rounded-xl border border-green-200 bg-green-50 p-8">
        <div className="flex items-center justify-between border-b border-green-100 pb-6">
          <div className="inline-flex items-center gap-2 rounded-lg bg-green-500 px-4 py-2">
            <SparklesOutlinedIcon size={20} className="text-green-50" />
            <Text
              as="span"
              type={Text.Type.BodyThree}
              weight={Text.Weight.Bold}
              className="font-maitree text-green-50"
            >
              Membro Premium
            </Text>
          </div>

          <div className="text-right">
            <Text
              as="p"
              type={Text.Type.BodyTwo}
              weight={Text.Weight.Bold}
              className="font-lora text-green-500"
            >
              R$ 29,90
            </Text>
            <Text
              as="p"
              type={Text.Type.BodyFour}
              weight={Text.Weight.Medium}
              className="font-maitree text-green-200"
            >
              por mês
            </Text>
          </div>
        </div>

        <div className="space-y-4">
          <Row className="w-full justify-between">
            <Text
              as="h3"
              type={Text.Type.HeadingFour}
              weight={Text.Weight.Bold}
              className="font-lora text-green-500"
            >
              Benefícios do Plano Premium
            </Text>
            <Text
              as="h3"
              type={Text.Type.BodyFour}
              weight={Text.Weight.Normal}
              className="font-lora text-green-500"
            >
              Renova em <strong>10/10/2023</strong>
            </Text>
          </Row>

          <ul className="space-y-3">
            {benefits.map((benefit, index) => (
              <li key={index} className="flex items-center gap-3">
                <div className="flex size-6 items-center justify-center rounded-full bg-green-500">
                  <CheckFilledIcon size={14} className="fill-green-50" />
                </div>
                <Text
                  as="span"
                  type={Text.Type.BodyThree}
                  weight={Text.Weight.Medium}
                  className="font-maitree text-green-500"
                >
                  {benefit}
                </Text>
              </li>
            ))}
          </ul>
        </div>

        <div className="font-maitree flex items-center justify-end gap-4 border-t border-green-100 pt-6">
          <Button.Link
            href="/"
            variant="filled"
            size="md"
            text="Gerenciar Assinatura"
            className="rounded-lg bg-green-500 py-1.5"
          />
        </div>
      </div>
    </div>
  );
}
