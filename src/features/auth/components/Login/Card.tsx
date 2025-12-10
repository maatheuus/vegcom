import { Card, CardContent, CardFooter } from "@/shared/ui/card";

import Col from "@/shared/ui/Layout/Helpers/Col";
import Text from "@/shared/ui/Text";
import Link from "next/link";
import Heading from "../Heading";
import LoginForm from "./Form";

interface LoginCardProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

export default function LoginCard({ className, ...props }: LoginCardProps) {
  return (
    <Card
      className={`relative z-99 gap-4 rounded-2xl bg-green-50 px-4 pt-6 pb-10 shadow sm:mt-0 md:gap-8 md:px-9 md:py-8 lg:px-6 ${className ?? ""}`}
      {...props}
    >
      <Heading title="Bem vindo de volta" />
      <Col className="gap-4">
        <CardContent>
          <LoginForm />
        </CardContent>
        <CardFooter className="flex justify-center">
          <Text
            weight={Text.Weight.Medium}
            className="font-lora text-black-100 !text-sm"
          >
            Não tem uma conta?{" "}
            <Link href="/signup" className="font-semibold text-green-500">
              Registre-se agora
            </Link>
          </Text>
        </CardFooter>
      </Col>
    </Card>
  );
}
