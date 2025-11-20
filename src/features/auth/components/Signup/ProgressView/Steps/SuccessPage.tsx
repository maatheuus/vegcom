"use client";

import { check } from "@/assets";
import Col from "@/shared/ui/Layout/Helpers/Col";

import { useSignupFormState } from "@/features/auth/hooks/queries/useSignupFormState";
import { toast } from "@/shared/hooks/use-toast";
import { LoadingOutlinedIcon } from "@/shared/icons";
import { useRouter } from "next/navigation";
import SubmitButton from "../../../SubmitButton/SubmitButton";
import SignupLayout from "../layout";

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
    <SignupLayout
      left={{
        contentClassName: "h-full justify-center gap-y-5 max-w-[554px]",
        title:
          "Tudo certo por aqui! Você pode aproveitar o quanto você quiser, divirta-se!",
        children: (
          <Col className="items-center gap-2 px-5">
            <SubmitButton
              text="Finalizar"
              isLoading={isPending}
              disabled={isPending}
              onClick={() => {
                submitFormMutate(formData);
              }}
            >
              <LoadingOutlinedIcon className="!h-6 !w-6 animate-spin" />
            </SubmitButton>
          </Col>
        ),
      }}
      right={{
        src: check,
        alt: "a gif of two people checking a list",
        title: "two people checking a list",
        width: 785,
        height: 785,
        quality: 100,
        classImage: "scale-x-100",
      }}
    />
  );
}
