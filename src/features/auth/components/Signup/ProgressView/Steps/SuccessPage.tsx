"use client";

import { useSignupFormState } from "@/features/auth/hooks/queries/useSignupFormState";
import { toast } from "@/shared/hooks/use-toast";
import Col from "@/shared/ui/Layout/Helpers/Col";
import { CircleNotchIcon } from "@phosphor-icons/react";
import { useRouter } from "next/navigation";
import SubmitButton from "../../../SubmitButton/SubmitButton";
import SignupCard from "../../SignupCard";

export default function SuccessPage() {
  const { formData, submitForm } = useSignupFormState();
  const {
    mutate: submitFormMutate,
    data,
    isPending,
    isSuccess,
    isError,
  } = submitForm;
  const router = useRouter();

  if (isSuccess) {
    toast({
      title: "Sucesso!",
      description: data.message,
      variant: "success",
    });
    setTimeout(() => {
      router.push(data.redirect);
    }, 2000);
  }

  if (isError) {
    toast({
      title: "Erro ao cadastrar",
      description: "Algo deu errado, tente novamente mais tarde.",
      variant: "destructive",
    });
    setTimeout(() => {
      router.push("/login");
    }, 2000);
  }
  return (
    <SignupCard title="Tudo certo por aqui! Você pode aproveitar o quanto você quiser, divirta-se!">
      <Col className="items-center gap-2 px-5">
        <SubmitButton
          text="Finalizar"
          isLoading={isPending}
          disabled={isPending}
          onClick={() => {
            submitFormMutate(formData);
          }}
        >
          <CircleNotchIcon className="!h-6 !w-6 animate-spin" />
        </SubmitButton>
      </Col>
    </SignupCard>
  );
}
