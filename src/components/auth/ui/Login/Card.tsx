import { Card, CardContent, CardFooter } from "@/components//ui/card";

import Text from "@/components//ui/Text";
import Link from "next/link";
import Heading from "../Heading";
import LoginForm from "./Form";

export default function LoginCard() {
  return (
    <Card className="shadow-card relative z-99 mt-8 gap-4 rounded-3xl bg-green-50 px-4 pt-6 pb-10 sm:mt-0 md:gap-7 md:px-9 md:pt-10 md:pb-10 lg:px-9 lg:pt-6">
      <Heading title="Bem vindo de volta" subTitle="Login" />
      <CardContent>
        <LoginForm />
      </CardContent>
      <CardFooter className="flex justify-center">
        <Text className="font-maitree font-medium">
          Não tem uma conta?{" "}
          <Link href="/signup" className="font-semibold text-green-500">
            Registre-se agora
          </Link>
        </Text>
      </CardFooter>
    </Card>
  );
}
