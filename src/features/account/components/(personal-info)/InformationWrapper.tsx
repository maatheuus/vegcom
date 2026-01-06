"use client";

import UserInformations from "@/features/account/components/(personal-info)/UserInformations";
import {
  maxLengthForBio,
  personalInfoFormSchema,
} from "@/features/account/components/utils";
import type { User } from "@/features/auth/api/types";
import Button from "@/shared/ui/Button";
import Row from "@/shared/ui/Layout/Helpers/Row";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  FloppyDiskIcon,
  PencilSimpleIcon,
} from "@phosphor-icons/react/dist/ssr";
import clsx from "clsx";
import { useState } from "react";
import { useForm } from "react-hook-form";
import type { z } from "zod";
import Header from "../Header";

interface InformationWrapperProps {
  user: User;
}
export default function InformationWrapper({ user }: InformationWrapperProps) {
  const [isEditing, setIsEditing] = useState(false);

  const form = useForm<z.infer<typeof personalInfoFormSchema>>({
    resolver: zodResolver(personalInfoFormSchema),
    defaultValues: {
      fullName: user.name,
      email: user.email,
      bio: user.informations.aboutInfo,
      dietType: user.informations.preference,
      culinaryLevel: user.informations.culinaryLevel,
      location: user.informations.location,
      publicProfile: true,
    },
  });

  const [bioLength, setBioLength] = useState<number>(
    form.getValues().bio.length,
  );

  const formErros =
    form.formState.errors.bio ||
    form.formState.errors.fullName ||
    form.formState.errors.email ||
    form.formState.errors.dietType ||
    form.formState.errors.culinaryLevel ||
    form.formState.errors.location ||
    bioLength > maxLengthForBio;

  const onSubmit = (values: z.infer<typeof personalInfoFormSchema>) => {
    if (form.formState.errors) return;

    console.log("Salvo com sucesso:", values);
    setIsEditing(false);
  };

  const onCancel = () => {
    form.reset();
    setIsEditing(false);
  };

  return (
    <>
      <Header
        title="Informações do Perfil"
        subTitle="Gerencie suas informações pessoais e foto de perfil"
        className="flex-col items-start gap-4 md:flex-row"
      >
        <Row className="hidden gap-x-2 md:flex">
          <Button
            variant="text"
            size="default"
            onClick={() => setIsEditing(false)}
            aria-hidden={!isEditing}
            className={clsx(
              "font-maitree cursor-pointer border-none bg-transparent transition-all duration-300",
              isEditing
                ? "visible z-10 translate-x-0 opacity-100"
                : "pointer-events-none invisible z-0 translate-x-24 opacity-0",
            )}
          >
            Cancelar
          </Button>
          <Button.Icon
            leftIcon={
              isEditing ? (
                <FloppyDiskIcon className="!size-4" />
              ) : (
                <PencilSimpleIcon className="!size-4" />
              )
            }
            variant="filled"
            size="default"
            onClick={() => setIsEditing(!isEditing)}
            className="font-maitree cursor-pointer bg-green-200 py-2"
          >
            {isEditing ? "Salvar Perfil" : "Editar Perfil"}
          </Button.Icon>
        </Row>
      </Header>

      <UserInformations
        isEditing={!isEditing}
        form={form}
        setBioLength={setBioLength}
      />
      <Row className="ml-auto flex justify-end gap-x-2 md:hidden">
        <Button
          variant="text"
          size="default"
          onClick={() => setIsEditing(false)}
          aria-hidden={!isEditing}
          className={clsx(
            "font-maitree cursor-pointer border-none bg-transparent transition-all duration-300",
            isEditing
              ? "visible z-10 translate-x-0 opacity-100"
              : "pointer-events-none invisible z-0 translate-x-24 opacity-0",
          )}
        >
          Cancelar
        </Button>
        <Button.Icon
          leftIcon={
            isEditing ? (
              <FloppyDiskIcon className="!size-4" />
            ) : (
              <PencilSimpleIcon className="!size-4" />
            )
          }
          variant="filled"
          size="default"
          onClick={() => setIsEditing(!isEditing)}
          className="font-maitree cursor-pointer bg-green-200 py-2"
        >
          {isEditing ? "Salvar Perfil" : "Editar Perfil"}
        </Button.Icon>
      </Row>
    </>
  );
}
