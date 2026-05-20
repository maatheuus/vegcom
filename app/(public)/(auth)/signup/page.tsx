import AuthFooter from "@/features/auth/components/Footer";
import AuthHeader from "@/features/auth/components/Header";
import SignupFlow from "@/features/auth/components/Signup/SignupFlow";
import Col from "@/shared/ui/Layout/Helpers/Col";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Cadastre-se",
  description: "Cadastre-se na VegCom",
  robots: {
    index: false,
    follow: false,
  },
};

export default function SignupPage() {
  return (
    <>
      <AuthHeader shouldGoBack />
      <Col className="mx-auto h-full w-full max-w-112 gap-y-3">
        <Suspense>
          <SignupFlow />
        </Suspense>
        <AuthFooter />
      </Col>
    </>
  );
}
