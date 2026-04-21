"use client";

import { useSignupFormState } from "@/features/auth/hooks/queries/useSignupFormState";
import LoadingDots from "@/shared/components/ui/Loadings/LoadingDots";
import { toast } from "@/shared/hooks/use-toast";
import Col from "@/shared/ui/Layout/Helpers/Col";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import SubmitButton from "../../../SubmitButton/SubmitButton";
import SignupCard from "../../SignupCard";

export default function SuccessPage() {
  const { formData, submitForm } = useSignupFormState();
  const { mutate: signUp, data, isPending, isSuccess, isError } = submitForm;
  const router = useRouter();

  useEffect(() => {
    if (isSuccess && data) {
      toast({
        title: "Sucesso!",
        description: data.message,
        variant: "success",
      });
      const timeoutId = setTimeout(() => {
        router.push(data.redirect);
      }, 2000);
      return () => clearTimeout(timeoutId);
    }

    if (isError) {
      toast({
        title: "Erro ao cadastrar",
        description:
          "Algo deu errado, verifique os dados e tente novamente mais tarde.",
        variant: "destructive",
      });
    }
  }, [isSuccess, isError, data, router]);

  return (
    <SignupCard title="Tudo certo por aqui! Você pode aproveitar o quanto você quiser, divirta-se!">
      <Col className="items-center gap-2 px-5">
        <SubmitButton
          text="Finalizar"
          isLoading={isPending}
          disabled={isPending}
          onClick={() => {
            signUp(formData);
          }}
        >
          <LoadingDots dotColor="light" />
        </SubmitButton>
      </Col>
    </SignupCard>
  );
}
