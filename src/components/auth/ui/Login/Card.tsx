import { Card, CardContent, CardFooter } from "@/components//ui/card";

import Text from "@/components//ui/Text";
import Col from "@/components/ui/Layout/Helpers/Col";
import Link from "next/link";
import Heading from "../Heading";
import LoginForm from "./Form";

interface LoginCardProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

export default function LoginCard({ className, ...props }: LoginCardProps) {
  return (
    <Card
      className={`relative z-99 gap-4 rounded-2xl bg-white px-4 pt-6 pb-10 sm:mt-0 md:gap-8 md:px-9 md:py-8 lg:px-6 ${className ?? ""}`}
      {...props}
    >
      <Heading title="Bem vindo de volta" subTitle="Login" />
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
            <Link href="/signup" className="font-semibold">
              Registre-se agora
            </Link>
          </Text>
        </CardFooter>
      </Col>
    </Card>
  );
}
