import AuthHeader from "@/features/auth/components/Header";
import LoginCard from "@/features/auth/components/Login/Card";
import AuthFooter from "@/features/auth/components/Footer";
import Col from "@/shared/ui/Layout/Helpers/Col";

export default async function Page() {
  return (
    <>
      <AuthHeader />
      <Col className="mx-auto mt-40 h-full w-full max-w-112 gap-y-3">
        <LoginCard />
        <AuthFooter />
      </Col>
    </>
  );
}
