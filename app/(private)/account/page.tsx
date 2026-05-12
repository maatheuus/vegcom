"use client";

import { type CulinaryLevel, type Preference } from "@/features/account";
import UserInformations from "@/features/account/components/(personal-info)/UserInformations";
import {
  maxLengthForBio,
  personalInfoFormSchema,
} from "@/features/account/components/utils";
import { useUpdateProfile } from "@/features/account/hooks/mutations/useUpdateProfile";
import { useUploadAvatar } from "@/features/account/hooks/mutations/useUploadAvatar";
import type { UpdateProfilePayload } from "@/features/auth/api/authApi";
import { toast } from "@/shared/hooks/use-toast";
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

import AccountLayout from "@/features/account/components/AccountLayout";
import Header from "@/features/account/components/Header";
import { useGetUser } from "@/features/auth/api/queries/getAuthApiClient";

export default function Page() {
  const userData = useGetUser();
  const user = userData.data;

  const [isEditing, setIsEditing] = useState(false);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  const { mutateAsync: updateProfile, isPending: isUpdatingProfile } =
    useUpdateProfile();
  const { mutateAsync: uploadAvatar, isPending: isUploadingAvatar } =
    useUploadAvatar();

  const isPending = isUpdatingProfile || isUploadingAvatar;

  const form = useForm<z.infer<typeof personalInfoFormSchema>>({
    resolver: zodResolver(personalInfoFormSchema),
    defaultValues: {
      fullName: user?.name,
      email: user?.email,
      bio: user?.informations.aboutInfo,
      preference: user?.informations.preference,
      culinaryLevel: user?.informations.culinaryLevel,
      location: user?.informations.location,
      publicProfile: true,
    },
  });

  const [bioLength, setBioLength] = useState<number>(
    form.getValues().bio?.length || 0,
  );

  const _formErros =
    form.formState.errors.bio ||
    form.formState.errors.fullName ||
    form.formState.errors.email ||
    form.formState.errors.preference ||
    form.formState.errors.culinaryLevel ||
    form.formState.errors.location ||
    bioLength > maxLengthForBio;

  const _onSubmit = async (values: z.infer<typeof personalInfoFormSchema>) => {
    if (form.formState.errors && Object.keys(form.formState.errors).length > 0)
      return;

    const payload: UpdateProfilePayload = {};
    const infoPayload: UpdateProfilePayload["informations"] = {};

    if (values.fullName !== user?.name) payload.name = values.fullName;
    if (values.email !== user?.email) payload.email = values.email;

    if (values.bio !== user?.informations?.aboutInfo)
      infoPayload.aboutInfo = values.bio;
    if (values.preference !== user?.informations?.preference)
      infoPayload.preference = values.preference as Preference;
    if (values.culinaryLevel !== user?.informations?.culinaryLevel)
      infoPayload.culinaryLevel = values.culinaryLevel as CulinaryLevel;
    if (values.location !== user?.informations?.location)
      infoPayload.location = values.location;

    if (Object.keys(infoPayload).length > 0) {
      payload.informations = infoPayload;
    }

    if (Object.keys(payload).length === 0 && !selectedImage) {
      setIsEditing(false);
      return;
    }

    try {
      if (Object.keys(payload).length > 0) {
        await updateProfile(payload);
      }

      if (selectedImage) {
        await uploadAvatar(selectedImage);
      }

      toast({
        title: "Sucesso!",
        description: "Suas informações foram atualizadas com sucesso.",
        variant: "success",
      });
      setIsEditing(false);
      setSelectedImage(null);
    } catch (_err) {
      toast({
        title: "Erro ao atualizar",
        description: "Não foi possível atualizar as informações no momento.",
        variant: "destructive",
      });
    }
  };

  if (!user) return null;

  return (
    <AccountLayout>
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
            type={isEditing ? "button" : "button"}
            onClick={
              isEditing
                ? form.handleSubmit(_onSubmit)
                : () => setIsEditing(true)
            }
            disabled={isPending}
            className="font-maitree cursor-pointer bg-green-200 py-1"
          >
            {isPending
              ? "Salvando..."
              : isEditing
                ? "Salvar Perfil"
                : "Editar Perfil"}
          </Button.Icon>
        </Row>
      </Header>

      <UserInformations
        isEditing={!isEditing}
        form={form}
        setBioLength={setBioLength}
        avatarUrl={user?.informations?.avatarUrl}
        onImageChange={setSelectedImage}
        user={user}
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
          type={isEditing ? "button" : "button"}
          onClick={
            isEditing ? form.handleSubmit(_onSubmit) : () => setIsEditing(true)
          }
          disabled={isPending}
          className="font-maitree cursor-pointer bg-green-200 py-1.5"
        >
          {isPending
            ? "Salvando..."
            : isEditing
              ? "Salvar Perfil"
              : "Editar Perfil"}
        </Button.Icon>
      </Row>
    </AccountLayout>
  );
}
