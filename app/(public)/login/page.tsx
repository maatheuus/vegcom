import AuthHeader from "@/components//auth/ui/Header";
import LoginCard from "@/components//auth/ui/Login/Card";
import AuthFooter from "@/components/auth/ui/Footer";
import Col from "@/components/ui/Layout/Helpers/Col";
import { createClient } from "@/lib/supabase/server";

export default async function Page() {
  const supabase = await createClient();
  const { data: instruments } = await supabase.from("instruments").select();

  console.log(instruments);

  return (
    <>
      <AuthHeader />
      <Col className="h-full w-full gap-y-28 max-w-126 mx-auto ">
        <LoginCard />
        <AuthFooter />
      </Col>
    </>
  );
}
