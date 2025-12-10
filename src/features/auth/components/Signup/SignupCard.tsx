import { Card, CardContent, CardFooter } from "@/shared/ui/card";
import Col from "@/shared/ui/Layout/Helpers/Col";
import Text from "@/shared/ui/Text";
import Link from "next/link";
import Heading from "../Heading";
import StepProgress from "./StepProgress";

interface SignupCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  subTitle?: string;
  showProgress?: boolean;
}

export default function SignupCard({
  title,
  subTitle,
  children,
  className,
  showProgress = true,
  ...props
}: SignupCardProps) {
  return (
    <Card
      className={`relative z-99 gap-4 rounded-2xl bg-green-50 px-4 pt-6 pb-10 shadow sm:mt-0 md:gap-8 md:px-9 md:py-8 lg:px-6 ${className ?? ""}`}
      {...props}
    >
      {title && <Heading title={title} subTitle={subTitle} />}

      {showProgress && (
        <div className="w-full">
          <StepProgress />
        </div>
      )}

      <Col className="gap-4">
        <CardContent className="p-0">{children}</CardContent>
        <CardFooter className="mt-4 flex justify-center p-0">
          <Text
            weight={Text.Weight.Medium}
            className="font-lora text-black-100 !text-sm"
          >
            Já tem uma conta?{" "}
            <Link href="/login" className="font-semibold text-green-500">
              Faça login
            </Link>
          </Text>
        </CardFooter>
      </Col>
    </Card>
  );
}
