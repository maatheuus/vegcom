import { Card, CardContent, CardFooter } from "@/shared/ui/card";
import Col from "@/shared/ui/Layout/Helpers/Col";
import Text from "@/shared/ui/Text";
import Link from "next/link";
import Heading from "../Heading";
import ForgotPasswordForm from "./Form";

interface ForgotPasswordCardProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

export default function ForgotPasswordCard({
  className,
  ...props
}: ForgotPasswordCardProps) {
  return (
    <Card
      className={`relative z-99 gap-4 rounded-2xl bg-green-50 px-4 pt-6 pb-10 shadow sm:mt-0 md:gap-8 md:px-9 md:py-8 lg:px-6 ${className ?? ""}`}
      {...props}
    >
      <Heading
        title="Recuperar senha"
        subTitle="Não se preocupe, vamos te ajudar a recuperar seu acesso."
      />
      <Col className="gap-4">
        <CardContent>
          <ForgotPasswordForm />
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
