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
    "https://github.com/shadcn.png"
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
      <Row className="justify-between w-full relative">
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
                <button className="absolute right-0 top-1.5 z-20 size-7 bg-green-500 rounded-full border-2 border-green-50 cursor-pointer flex items-center justify-center hover:bg-green-600 transition-colors">
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

                  <TooltipContent className="flex mr-4 mb-4 items-start">
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
          <DialogTitle className="text-green-500 text-center mt-4">
            Olhe a obra de arte que voce escolheu
          </DialogTitle>
          <DialogDescription className="text-green-200 text-center sr-only">
            foto de perfil do usuário
          </DialogDescription>

          <div className="w-full rounded-2xl overflow-hidden">
            <Image
              src={imagePreview}
              alt="Preview photo"
              width={150}
              height={150}
              title="Preview photo by user"
              loading="lazy"
              unoptimized
              quality={100}
              className="w-full h-full object-contain"
            />
          </div>
        </DialogContent>
      ) : (
        <DialogContent className="max-w-md">
          <DialogTitle className="text-green-500 text-center">
            Alterar foto de perfil
          </DialogTitle>
          <DialogDescription className="text-green-200 text-center">
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
              className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
                isDragging
                  ? "border-green-500 bg-green-50"
                  : "border-green-600 hover:border-green-200"
              }`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <FloppyDiskOutlinedIcon
                size={32}
                className="mx-auto text-green-500 mb-2"
              />
              <Text type={Text.Type.BodyTwo} className="text-green-500 mb-2">
                Arraste uma imagem aqui ou
              </Text>
              <button
                onClick={() => fileInputRef.current?.click()}
                className="text-green-500 font-medium hover:text-green-600 underline cursor-pointer"
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
              <Text type={Text.Type.BodyFour} className="text-green-200 mt-2">
                PNG, JPG ou JPEG até 5MB
              </Text>
            </div>

            {/* Botões de ação */}
            <div className="flex gap-2">
              {selectedImage && (
                <Button
                  variant="text"
                  onClick={handleImageRemove}
                  className="flex-1 text-red-500 hover:text-red-600 cursor-pointer"
                >
                  <TrashOutlinedIcon size={16} className="mr-2" />
                  Remover
                </Button>
              )}
              <Button
                onClick={handleImageSave}
                disabled={!selectedImage}
                className="flex-1 bg-green-500 text-white hover:bg-green-600 disabled:opacity-50  cursor-pointer"
              >
                Salvar foto
              </Button>
            </div>
          </div>
        </DialogContent>
      )}
    </Dialog>
  );
}
