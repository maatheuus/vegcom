import {
  Card,
  CardContent,
  CardFooter
} from "@/components//ui/card";

import Text from "@/components//ui/Text";
import Link from "next/link";
import Heading from "../Heading";
import LoginForm from "./Form";

export default function LoginCard() {
  return (
    <Card className="bg-green-50 gap-4 mt-8 sm:mt-0 md:gap-7 rounded-3xl shadow-card z-99 relative px-4 pb-10 pt-6 md:px-9 md:pb-10 md:pt-10 lg:px-9 lg:pt-6">
      <Heading title='Bem vindo de volta' subTitle="Login" />
      <CardContent>
        <LoginForm />
      </CardContent>
      <CardFooter className="flex justify-center">
        <Text>
          Não tem uma conta?{" "}
          <Link href="/signup" className="text-green-500 font-semibold">
            Registre-se agora
          </Link>
        </Text>
      </CardFooter>
    </Card>
  );
}
