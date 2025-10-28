import AuthHeader from "@/components//auth/ui/Header";
import LoginCard from "@/components//auth/ui/Login/Card";
import AuthFooter from "@/components/auth/ui/Footer";
import Col from "@/components/ui/Layout/Helpers/Col";

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
