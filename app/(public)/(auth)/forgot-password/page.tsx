import AuthFooter from "@/features/auth/components/Footer";
import ForgotPasswordCard from "@/features/auth/components/ForgotPassword/Card";
import AuthHeader from "@/features/auth/components/Header";
import Col from "@/shared/ui/Layout/Helpers/Col";

export default function Page() {
  return (
    <>
      <AuthHeader />
      <Col className="mx-auto h-full w-full max-w-112 gap-y-3">
        <ForgotPasswordCard className="z-20 scale-100" />
        <AuthFooter />
      </Col>
    </>
  );
}
