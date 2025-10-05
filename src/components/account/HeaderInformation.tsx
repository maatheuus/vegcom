"use client";

import PremiumMemberCard from "@/components/account/PremiumMemberCard";
import {
  EditPencilOutlinedIcon,
  FloppyDiskOutlinedIcon,
  TrashOutlinedIcon,
} from "@/components/icons";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/Avatar";
import Button from "@/components/ui/Button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/Dialog";
import Col from "@/components/ui/Layout/Helpers/Col";
import Row from "@/components/ui/Layout/Helpers/Row";
import Text from "@/components/ui/Text";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/Tooltip";
import Image from "next/image";
import { useRef, useState } from "react";
import { messagesToDisplayForPremium } from "./utils";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  isEditing?: boolean;
  isPremium?: boolean;
  title?: string;
}

export default function HeaderInformation({
  isEditing,
  isPremium = false,
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
      <Row className="relative w-full justify-between">
        <Row className="gap-x-4">
          <div className="relative">
            <DialogTrigger asChild>
              <Avatar className="size-28 border-4 border-green-500">
                <AvatarImage src={imagePreview} alt="Avatar do usuário" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </DialogTrigger>
            <DialogTrigger asChild>
              {isEditing && (
                <button className="absolute top-1.5 right-0 z-20 flex size-7 cursor-pointer items-center justify-center rounded-full border-2 border-green-50 bg-green-500 transition-colors hover:bg-green-600">
                  <EditPencilOutlinedIcon size={14} className="text-green-50" />
                </button>
              )}
            </DialogTrigger>
          </div>
          <Col className="items-start justify-center gap-y-1">
            <Text
              className="text-green-500"
              weight={Text.Weight.Bold}
              type={Text.Type.HeadingFour}
            >
              Julio do Grau
            </Text>
            <Text type={Text.Type.BodyThree} className="text-green-500">
              julio@julito.com
            </Text>

            {isPremium && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger className="cursor-pointer">
                    <Text type={Text.Type.BodyThree} className="text-green-500">
                      Premium Member
                    </Text>
                  </TooltipTrigger>

                  <TooltipContent className="mr-4 mb-4 flex items-start">
                    <Text type={Text.Type.BodyThree} className="text-green-50">
                      {randomMessage.text}
                    </Text>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
          </Col>
        </Row>
        {!isPremium && <PremiumMemberCard />}
      </Row>

      {!isEditing ? (
        <DialogContent className="max-w-md">
          <DialogTitle className="font-lora mt-4 text-center text-green-500">
            Olhe a obra de arte que voce escolheu
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
  );
}
