"use client";

import type { User } from "@/features/auth/api/types";
import Button from "@/shared/ui/Button";
import Col from "@/shared/ui/Layout/Helpers/Col";
import Row from "@/shared/ui/Layout/Helpers/Row";
import Text from "@/shared/ui/Text";
import { SparkleIcon } from "@phosphor-icons/react";
import { useTransition } from "react";
import { createCheckoutSession } from "../../apiSubscription/queries/getSubscriptionApiServer";
import type { GetProductsResponse } from "../../types/subscription";

interface Props {
  className?: string;
  user: User;
  productsData?: GetProductsResponse["data"];
}

const features = [
  "Acesso ilimitado a todas as receitas",
  "Crie e compartilhe receitas sem limites",
  "Salve quantas receitas favoritas quiser",
  "Suporte prioritário via chat",
];

export default function NotSubscribedView({
  className,
  productsData,
  ...props
}: Props) {
  const [isPending, startTransition] = useTransition();

  const product = productsData?.[0];
  const price = product?.default_price;

  const handleSubscribe = () => {
    const priceId = price?.id;
    if (!priceId) return;

    startTransition(async () => {
      const checkoutSession = await createCheckoutSession({
        userId: props.user.id,
        priceId,
        email: props.user.email,
      });

      if (checkoutSession.success) {
        window.open(checkoutSession.url, "_blank");
      }
    });
  };

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
                {price && price.unit_amount
                  ? (price.unit_amount / 100).toLocaleString("pt-BR", {
                      style: "currency",
                      currency: price.currency,
                    })
                  : "R$ 9,99"}
              </Text>
              <Text
                as="span"
                type={Text.Type.BodyThree}
                weight={Text.Weight.Medium}
                className="font-maitree text-green-200"
              >
                /
                {price?.recurring?.interval === "month"
                  ? "mês"
                  : price?.recurring?.interval || "mês"}
              </Text>
            </div>

            <Button
              variant="default"
              size="lg"
              className="font-maitree w-full cursor-pointer bg-green-200"
              onClick={handleSubscribe}
              disabled={isPending}
            >
              {isPending ? "Redirecionando..." : "Assinar Agora"}
            </Button>
          </Col>
        </Card>
      </div>

      <div className="rounded-xl border border-green-200 bg-green-50 p-6">
        <Row className="items-center gap-4">
          <div className="flex size-12 items-center justify-center rounded-full bg-green-200">
            <SparkleIcon size={24} className="text-green-50" />
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
        <div className="space-y-3">
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
              <li key={idx} className="flex items-start gap-3">
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
