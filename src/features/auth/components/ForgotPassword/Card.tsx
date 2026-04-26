import { Card, CardContent, CardFooter } from "@/shared/ui/card";
import Col from "@/shared/ui/Layout/Helpers/Col";
import Text from "@/shared/ui/Text";
import Link from "next/link";
import Heading from "../Heading";
import ForgotPasswordForm from "./Form";
import ResetPasswordForm from "./ResetPasswordForm";

interface ForgotPasswordCardProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  token?: string;
}

export default function ForgotPasswordCard({
  className,
  token,
  ...props
}: ForgotPasswordCardProps) {
  const isResetStep = !!token;

  return (
    <Card
      className={`relative z-99 gap-4 rounded-2xl bg-green-50 px-4 pt-6 pb-10 shadow sm:mt-0 md:gap-8 md:px-9 md:py-8 lg:px-6 ${className ?? ""}`}
      {...props}
    >
      <Heading
        title={isResetStep ? "Nova senha" : "Recuperar senha"}
        subTitle={
          isResetStep
            ? "Escolha uma nova senha para sua conta."
            : "Não se preocupe, vamos te ajudar a recuperar seu acesso."
        }
      />
      <Col className="gap-4">
        <CardContent>
          {isResetStep ? (
            <ResetPasswordForm token={token} />
          ) : (
            <ForgotPasswordForm />
          )}
        </CardContent>
        <CardFooter className="flex justify-center">
          <Text
            weight={Text.Weight.Medium}
            className="font-lora text-black-100 !text-sm"
          >
            Lembrou sua senha?{" "}
            <Link href="/login" className="font-semibold text-green-500">
              Voltar para login
            </Link>
          </Text>
        </CardFooter>
      </Col>
    </Card>
  );
}
