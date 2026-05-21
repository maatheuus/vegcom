"use client";

import { Card, CardContent, CardFooter } from "@/shared/ui/card";

import Col from "@/shared/ui/Layout/Helpers/Col";
import Text from "@/shared/ui/Text";
import Link from "next/link";
import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Heading from "../Heading";
import LoginForm from "./Form";

interface LoginCardProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

export default function LoginCard({ className, ...props }: LoginCardProps) {
  const searchParams = useSearchParams();
  const next = searchParams.get("next");
  const signupHref = next ? `/signup?next=${encodeURIComponent(next)}` : "/signup";

  return (
    <Card
      className={`relative z-99 gap-4 rounded-2xl bg-green-50 px-4 pt-6 pb-10 shadow sm:mt-0 md:gap-8 md:px-9 md:py-8 lg:px-6 ${className ?? ""}`}
      {...props}
    >
      <Heading title="Bem vindo de volta" />
      <Col className="gap-4">
        <CardContent>
          <Suspense>
            <LoginForm />
          </Suspense>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Text
            weight={Text.Weight.Medium}
            className="font-lora text-black-100 !text-sm"
          >
            Não tem uma conta?{" "}
            <Link href={signupHref} className="font-semibold text-green-500">
              Registre-se agora
            </Link>
          </Text>
        </CardFooter>
      </Col>
    </Card>
  );
}
