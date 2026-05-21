import AuthFooter from "@/features/auth/components/Footer";
import AuthHeader from "@/features/auth/components/Header";
import LoginCard from "@/features/auth/components/Login/Card";
import Col from "@/shared/ui/Layout/Helpers/Col";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Entrar na Conta",
  description: "Acesse sua conta na VegCom e explore receitas veganas, a comunidade plant-based e muito mais.",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function Page() {
  return (
    <>
      <AuthHeader />
      <Col className="mx-auto h-full w-full max-w-112 gap-y-3">
        <Suspense>
          <LoginCard />
        </Suspense>
        <AuthFooter />
      </Col>
    </>
  );
}
