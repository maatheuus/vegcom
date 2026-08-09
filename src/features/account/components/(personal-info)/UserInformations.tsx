"use client";

import type { UseFormReturn } from "react-hook-form";
import type { z } from "zod";

import Text from "@/shared/ui/Text";
import { useEffect, useRef, useState } from "react";
import {
  getInitials,
  messagesToDisplayForPremium,
  personalInfoFormSchema,
} from "../utils";

import { toast } from "@/shared/hooks/use-toast";

import type { User } from "@/features/auth/api/types";
import type { ProfileCompletionField } from "@/features/auth/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/Avatar";
import Button from "@/shared/ui/Button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/shared/ui/Dialog";
import { Form } from "@/shared/ui/Form";
import {
  ArrowSquareOutIcon,
  FloppyDiskIcon,
  PencilSimpleIcon,
  TrashIcon,
} from "@phosphor-icons/react";
import Image from "next/image";
import { AvatarPicker } from "../AvatarPicker";
import FormInformation from "./FormInformation";

type PersonalInfoFormValues = z.infer<typeof personalInfoFormSchema>;
interface Props extends React.HTMLAttributes<HTMLFormElement> {
  form: UseFormReturn<PersonalInfoFormValues>;
  setBioLength: (length: number) => void;
  isEditing?: boolean;
  avatarUrl?: string;
  user: User;
  onImageChange: (file: File | null) => void;
  incompleteFields: ProfileCompletionField[];
}

export default function UserInformations({
  form,
  isEditing,
  setBioLength,
  avatarUrl,
  user,
  onImageChange,
  incompleteFields,
}: Props) {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [selectedPresetUrl, setSelectedPresetUrl] = useState<string | null>(
    null,
  );
  const [isLoadingPreset, setIsLoadingPreset] = useState(false);
  const { fullName, email } = form.getValues();
  const [imagePreview, setImagePreview] = useState<string>(avatarUrl || "");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDialogShowImageOpen, setIsDialogShowImageOpen] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (avatarUrl && !selectedImage) {
      setImagePreview(avatarUrl);
    }
  }, [avatarUrl, selectedImage]);

  const _randomMessage =
    messagesToDisplayForPremium[
      Math.floor(Math.random() * messagesToDisplayForPremium.length)
    ];

  const lastProfileUpdate = user?.updatedAt
    ? new Date(user?.updatedAt).toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      })
    : "";

  const handleImageSelect = (file: File) => {
    const MAX_FILE_SIZE = 2 * 1024 * 1024;
    const ALLOWED_TYPES = ["image/png", "image/jpeg", "image/jpg"];

    if (!ALLOWED_TYPES.includes(file.type)) {
      toast({
        title: "Formato inválido",
        description: "Por favor, selecione uma imagem PNG, JPG ou JPEG.",
        variant: "destructive",
      });
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      toast({
        title: "Arquivo muito grande",
        description:
          "Essa imagem está mais pesada que uma jaca inteira! Tente algo até 2MB.",
        variant: "destructive",
      });
      return;
    }

    setSelectedImage(file);
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        setImagePreview(e.target.result as string);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleImageSelect(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      handleImageSelect(file);
    }
  };

  const handleImageSave = () => {
    onImageChange(selectedImage);
    setIsDialogOpen(false);
    setTimeout(() => {
      setIsDialogShowImageOpen(false);
    }, 500);
  };

  const handleImageRemove = () => {
    setSelectedImage(null);
    setSelectedPresetUrl(null);
    setImagePreview("");
    onImageChange(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handlePresetSelect = async (url: string) => {
    setIsLoadingPreset(true);
    try {
      const res = await fetch(url);
      const svgText = await res.text();
      const svgBlob = new Blob([svgText], { type: "image/svg+xml" });
      const svgObjectUrl = URL.createObjectURL(svgBlob);

      const img = new window.Image();
      img.crossOrigin = "anonymous";
      await new Promise<void>((resolve, reject) => {
        img.onload = () => resolve();
        img.onerror = reject;
        img.src = svgObjectUrl;
      });

      const canvas = document.createElement("canvas");
      canvas.width = 200;
      canvas.height = 200;
      canvas.getContext("2d")!.drawImage(img, 0, 0, 200, 200);
      URL.revokeObjectURL(svgObjectUrl);

      const pngBlob = await new Promise<Blob>((resolve, reject) => {
        canvas.toBlob(
          (b) => (b ? resolve(b) : reject(new Error("canvas toBlob failed"))),
          "image/png",
        );
      });

      const file = new File([pngBlob], "avatar-preset.png", {
        type: "image/png",
      });
      setSelectedPresetUrl(url);
      setSelectedImage(file);
      setImagePreview(url);
    } catch {
      toast({ title: "Erro ao carregar avatar", variant: "destructive" });
    } finally {
      setIsLoadingPreset(false);
    }
  };

  return (
    <>
      <Dialog
        open={isDialogOpen || isDialogShowImageOpen}
        onOpenChange={() => {
          if (isEditing) {
            setIsDialogOpen(!isDialogOpen);
          } else {
            setIsDialogShowImageOpen(!isDialogShowImageOpen);
          }
        }}
      >
        <div className="flex flex-col justify-between gap-4 border-b border-green-100 pb-6 sm:flex-row sm:items-center">
          <div className="flex items-center gap-4">
            <div className="relative">
              <DialogTrigger asChild>
                <Avatar className="size-12 border-4 border-green-500 md:size-16">
                  <AvatarImage src={imagePreview} alt="Avatar do usuário" />
                  <AvatarFallback className="text-base capitalize md:text-lg">
                    {fullName ? getInitials(fullName) : "U"}
                  </AvatarFallback>
                </Avatar>
              </DialogTrigger>
              <DialogTrigger asChild>
                {!isEditing && (
                  <button className="absolute top-0 right-0 z-20 flex size-12 cursor-pointer items-center justify-center rounded-full border-2 border-green-50 bg-green-500 transition-colors hover:bg-green-600 md:-top-1.5 md:size-7">
                    <PencilSimpleIcon size={14} className="text-green-50" />
                  </button>
                )}
              </DialogTrigger>
            </div>

            <div>
              {fullName && (
                <Text
                  as="h3"
                  type={Text.Type.HeadingFour}
                  weight={Text.Weight.Bold}
                  className="font-lora text-base text-green-500 md:text-xl"
                >
                  {fullName}
                </Text>
              )}
              {lastProfileUpdate && (
                <Text
                  as="span"
                  type={Text.Type.BodyThree}
                  weight={Text.Weight.Medium}
                  className="font-maitree !text-xs text-green-200"
                >
                  Última vez atualizado: {lastProfileUpdate}
                </Text>
              )}
            </div>
          </div>
          <div className="self-end justify-self-end">
            <Button.Link
              href={`/user/${user.id}`}
              target="_blank"
              rel="noopener noreferrer"
              rightIcon={<ArrowSquareOutIcon className="size-4 sm:size-5" />}
              variant="text"
              size="default"
              className="font-maitree cursor-pointer bg-green-50 p-0 text-sm text-green-500 hover:text-green-200 hover:underline lg:text-base"
            >
              Ver preview do perfil
            </Button.Link>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6">
          <Form {...form}>
            <FormInformation
              form={form}
              setBioLength={setBioLength}
              isEditing={isEditing}
              incompleteFields={incompleteFields}
            />
          </Form>
        </div>

        {isEditing ? (
          <DialogContent className="max-w-md">
            <DialogTitle className="font-lora mt-4 text-center text-green-500">
              Olhe a obra de arte que você escolheu
            </DialogTitle>
            <DialogDescription className="sr-only text-center text-green-200">
              foto de perfil do usuário
            </DialogDescription>

            <div className="w-full overflow-hidden rounded-2xl">
              <Image
                src={imagePreview}
                alt="Preview photo"
                width={150}
                height={150}
                title="Preview photo by user"
                loading="lazy"
                unoptimized
                quality={100}
                className="h-full w-full object-contain"
              />
            </div>
          </DialogContent>
        ) : (
          <DialogContent className="max-w-md">
            <DialogTitle className="font-lora text-center text-green-500">
              Alterar foto de perfil
            </DialogTitle>
            <DialogDescription className="font-maitree text-center text-green-200">
              Escolha sua mais nova obra de arte
            </DialogDescription>

            <div className="space-y-4">
              <div className="flex justify-center">
                <Avatar className="size-32 border-4 border-green-500">
                  <AvatarImage
                    src={imagePreview}
                    alt={`Image preview from ${fullName}`}
                    className="object-cover"
                  />
                  <AvatarFallback className="text-lg capitalize md:text-2xl">
                    {fullName ? getInitials(fullName) : "U"}
                  </AvatarFallback>
                </Avatar>
              </div>

              <div
                className={`rounded-lg border-2 border-dashed p-6 text-center transition-colors ${
                  isDragging
                    ? "border-green-500 bg-green-50"
                    : "border-green-600 hover:border-green-200"
                }`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
                <FloppyDiskIcon
                  size={22}
                  className="mx-auto mb-2 text-green-500"
                />

                <Text
                  type={Text.Type.BodyThree}
                  className="font-lora mb-2 text-green-500"
                >
                  Arraste uma imagem aqui ou
                </Text>
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="font-lora cursor-pointer font-semibold text-green-500 underline hover:text-green-600"
                >
                  clique para selecionar
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".png, .jpg, .jpeg"
                  onChange={handleFileInputChange}
                  className="hidden"
                />
                <Text
                  type={Text.Type.BodyFive}
                  className="font-maitree mt-2 text-green-200"
                >
                  PNG, JPG ou JPEG até 2MB
                </Text>
              </div>

              <AvatarPicker
                selected={selectedPresetUrl}
                onSelect={handlePresetSelect}
                disabled={isLoadingPreset}
              />

              <div className="flex justify-between gap-2">
                {selectedImage && (
                  <button
                    className="relative flex h-fit w-full cursor-pointer items-center justify-center gap-2 rounded-full border border-red-500 bg-red-500/20 px-4 py-1.5 font-medium text-red-500 transition-colors duration-300 hover:border-red-100 hover:bg-red-500 hover:text-red-100"
                    onClick={handleImageRemove}
                  >
                    <TrashIcon size={18} />
                    Remover
                  </button>
                )}

                <button
                  className="relative flex h-fit w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-green-500 px-4 py-1.5 font-medium text-green-100 transition-colors duration-300 hover:bg-green-100 hover:text-green-500 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-green-500 disabled:hover:text-green-100"
                  onClick={handleImageSave}
                  disabled={!selectedImage}
                >
                  <FloppyDiskIcon size={18} />
                  Aplicar
                </button>
              </div>
            </div>
          </DialogContent>
        )}
      </Dialog>
    </>
  );
}
