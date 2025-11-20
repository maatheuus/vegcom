"use client";

import type { UseFormReturn } from "react-hook-form";

import Text from "@/shared/ui/Text";
import { useRef, useState } from "react";
import { messagesToDisplayForPremium } from "../utils";

import {
  EditPencilOutlinedIcon,
  FloppyDiskOutlinedIcon,
  TrashOutlinedIcon,
} from "@/shared/icons";
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
import Image from "next/image";
import FormInformation from "./FormInformation";

interface Props extends React.HTMLAttributes<HTMLFormElement> {
  form: UseFormReturn<
    {
      fullName: string;
      email: string;
      location: string;
      bio: string;
      publicProfile: boolean;
      dietType: string;
      culinaryLevel: string;
    },
    unknown,
    undefined
  >;
  setBioLength: (length: number) => void;
  isEditing?: boolean;
}

export default function UserInformations({
  form,
  isEditing,
  setBioLength,
}: Props) {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>(
    "https://github.com/shadcn.png",
  );
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDialogShowImageOpen, setIsDialogShowImageOpen] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const randomMessage =
    messagesToDisplayForPremium[
      Math.floor(Math.random() * messagesToDisplayForPremium.length)
    ];

  const handleImageSelect = (file: File) => {
    if (file && file.type.startsWith("image/")) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          setImagePreview(e.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
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
    console.log("Salvando imagem:", selectedImage);
    setIsDialogOpen(false);
  };

  const handleImageRemove = () => {
    setSelectedImage(null);
    setImagePreview("https://github.com/shadcn.png");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
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
        <div className="flex items-center gap-4 border-b border-green-100 pb-6">
          <div className="relative">
            <DialogTrigger asChild>
              <Avatar className="size-24 border-4 border-green-500">
                <AvatarImage src={imagePreview} alt="Avatar do usuário" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </DialogTrigger>
            <DialogTrigger asChild>
              {!isEditing && (
                <button className="absolute top-1.5 right-0 z-20 flex size-7 cursor-pointer items-center justify-center rounded-full border-2 border-green-50 bg-green-500 transition-colors hover:bg-green-600">
                  <EditPencilOutlinedIcon size={14} className="text-green-50" />
                </button>
              )}
            </DialogTrigger>
          </div>

          <div className="space-y-1">
            <Text
              as="h3"
              type={Text.Type.HeadingFour}
              weight={Text.Weight.Bold}
              className="font-lora text-green-500"
            >
              Sarah Mitchell
            </Text>
            <Text
              as="p"
              type={Text.Type.BodyThree}
              weight={Text.Weight.Medium}
              className="font-maitree text-green-200"
            >
              sarah.mitchell@example.com
            </Text>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6">
          <Form {...form}>
            <FormInformation
              form={form}
              setBioLength={setBioLength}
              isEditing={isEditing}
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
                  <AvatarImage src={imagePreview} alt="Preview" />
                  <AvatarFallback>CN</AvatarFallback>
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
                <FloppyDiskOutlinedIcon
                  size={28}
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
                  accept="image/*"
                  onChange={handleFileInputChange}
                  className="hidden"
                />
                <Text
                  type={Text.Type.BodyFive}
                  className="font-maitree mt-2 text-green-200"
                >
                  PNG, JPG ou JPEG até 5MB
                </Text>
              </div>

              <div className="flex gap-2">
                {selectedImage && (
                  <Button
                    variant="text"
                    onClick={handleImageRemove}
                    className="font-maitree flex-1 cursor-pointer text-red-500 hover:text-red-600"
                  >
                    <TrashOutlinedIcon size={16} />
                    Remover
                  </Button>
                )}

                <button
                  className="relative flex h-fit flex-1 cursor-pointer items-center justify-center gap-2 rounded-full bg-green-500 px-4 py-1.5 font-medium text-green-100 transition-colors duration-300 hover:bg-green-100 hover:text-green-500 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-green-500 disabled:hover:text-green-100"
                  onClick={handleImageSave}
                  disabled={!selectedImage}
                >
                  <FloppyDiskOutlinedIcon size={18} />
                  Salvar
                </button>
              </div>
            </div>
          </DialogContent>
        )}
      </Dialog>
    </>
  );
}
