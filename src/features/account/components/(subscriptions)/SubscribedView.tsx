"use client";

import { type User } from "@/features/auth/api/types";
import Button from "@/shared/ui/Button";
import Row from "@/shared/ui/Layout/Helpers/Row";
import Text from "@/shared/ui/Text";
import { formatCurrency } from "@/shared/utils";
import { SparkleIcon } from "@phosphor-icons/react/dist/ssr";
import { useTransition } from "react";
import { createPortalSession } from "../../apiSubscription/queries/getSubscriptionApiServer";

interface Props {
  className?: string;
  user: User;
}

const benefits = [
  "Acesso ilimitado a todas as receitas",
  "Crie e compartilhe receitas sem limites",
  "Salve quantas receitas favoritas quiser",
  "Suporte prioritário via chat",
  "Experiência sem anúncios",
  "Acesso antecipado a novos recursos",
];

export default function SubscribedView({ className, user, ...props }: Props) {
  const [isPending, startTransition] = useTransition();

  const handleManageSubscription = () => {
    startTransition(async () => {
      try {
        const result = await createPortalSession(user.id);
        console.log(result);
        if (result.url) window.open(result.url, "_blank");
      } catch (error) {
        console.error(error);
      }
    });
  };

  return (
    <div className={`space-y-6 ${className || ""}`} {...props}>
      <div className="space-y-6 rounded-xl border border-green-200 bg-green-50 p-8">
        <div className="flex items-center justify-between border-b border-green-100 pb-6">
          <div className="inline-flex items-center gap-2 rounded-lg bg-green-500 px-4 py-2">
            <SparkleIcon size={20} className="text-green-50" />
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
              {formatCurrency(
                user.subscription?.currency || "BRL",
                user.subscription?.currentInvoiceAmount || 0,
              )}
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
              Renova em{" "}
              <strong>
                {user.subscription?.expiresAt ||
                  new Date().toLocaleDateString()}
              </strong>
            </Text>
          </Row>

          <ul className="space-y-3">
            {benefits.map((benefit, index) => (
              <li key={index} className="flex items-center gap-3">
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
          <Button
            variant="default"
            size="default"
            onClick={handleManageSubscription}
            disabled={isPending}
            className="cursor-pointer rounded-lg bg-green-500 py-1.5 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isPending ? "Carregando..." : "Gerenciar Assinatura"}
          </Button>
        </div>
      </div>
    </div>
  );
}
