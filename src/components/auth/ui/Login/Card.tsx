import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components//ui/card";

import Text from "@/components//ui/Text";
import Link from "next/link";
import LoginForm from "./Form";

export default function LoginCard() {
  return (
    <Card className="bg-green-50 gap-4 mt-8 sm:mt-0 md:gap-7 rounded-3xl shadow-card z-99 relative px-4 pb-10 pt-6 md:px-9 md:pb-10 md:pt-10 lg:px-9 lg:pt-6">
      <CardHeader className="text-center font-rancho font-normal p-0">
        <CardTitle
          as="h1"
          weight={Text.Weight.Normal}
          type={Text.Type.HeadingOne}
          className="text-green-500"
        >
          Bem vindo de volta
        </CardTitle>
        <CardDescription
          as="h2"
          weight={Text.Weight.Normal}
          type={Text.Type.HeadingTwo}
          className="text-green-500"
        >
          Login
        </CardDescription>
      </CardHeader>
      <CardContent>
        <LoginForm />
      </CardContent>
      <CardFooter className="flex justify-center">
        <Text>
          Não tem uma conta?{" "}
          <Link href="/register" className="text-green-500 font-semibold">
            Registre-se agora
          </Link>
        </Text>
      </CardFooter>
    </Card>
  );
}
