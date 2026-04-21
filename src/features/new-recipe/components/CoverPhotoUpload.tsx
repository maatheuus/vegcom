"use client";

import { useToast } from "@/shared/hooks/use-toast";
import { Input } from "@/shared/ui/Input";
import { CloudArrowUpIcon } from "@phosphor-icons/react";
import Image from "next/image";
import { useCallback } from "react";

function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}
import { useWatch } from "react-hook-form";
import type { Props } from "./ImageUploadArea";
import {
  DURATION_TOAST_IN_SEG,
  MAX_IMAGE_SIZE_BYTES,
  MAX_IMAGE_SIZE_MB,
} from "./ImageUploadArea";

export default function CoverPhotoUpload({ form }: Props) {
  const { toast } = useToast();
  const images =
    useWatch({ control: form.control, name: "recipe_images" }) ?? [];
  const coverImage = images[0];

  const handleFileChange = useCallback(
    async (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (!file) return;
      event.target.value = "";

      if (file.size > MAX_IMAGE_SIZE_BYTES) {
        toast({
          title: "Arquivo muito grande",
          description: `A imagem excede o limite de ${MAX_IMAGE_SIZE_MB}MB.`,
          variant: "destructive",
          duration: DURATION_TOAST_IN_SEG,
        });
        return;
      }

      const preview = await fileToBase64(file);
      const newCover = {
        id: `cover-${Date.now()}`,
        file,
        preview,
        name: file.name,
      };

      form.setValue("recipe_images", [newCover, ...images.slice(1)], {
        shouldValidate: true,
        shouldDirty: true,
      });
    },
    [form, images, toast],
  );

  return (
    <div className="flex flex-col gap-4">
      <div>
        <p className="font-lora mb-1 text-sm font-semibold text-green-800">
          Foto de capa
        </p>
        <p className="text-xs text-green-500/70">
          A primeira imagem que todo mundo verá.
        </p>
      </div>

      <div className="relative overflow-hidden rounded-xl border border-green-200 bg-green-50/30">
        {coverImage ? (
          <>
            <Image
              src={coverImage.preview}
              width={120}
              height={120}
              alt="Foto de capa"
              className="h-76 w-full object-cover"
            />

            <label className="absolute right-3 bottom-3 cursor-pointer rounded-lg bg-white/90 px-3 py-1.5 text-xs font-medium text-green-800 shadow transition hover:bg-white">
              Trocar foto
              <Input
                type="file"
                accept="image/*"
                className="sr-only"
                onChange={handleFileChange}
              />
            </label>
          </>
        ) : (
          <label className="flex h-72 cursor-pointer flex-col items-center justify-center gap-3">
            <CloudArrowUpIcon size={40} className="text-green-800" />
            <span className="font-lora text-sm text-green-500">
              Clique para adicionar uma foto
            </span>
            <Input
              type="file"
              accept="image/*"
              className="sr-only"
              onChange={handleFileChange}
            />
          </label>
        )}
      </div>

      {/* <div className="flex items-start gap-3 rounded-xl border border-green-100 bg-green-50/50 px-4 py-3">
        <LightbulbIcon size={18} className="mt-0.5 shrink-0 text-green-600" />
        <div>
          <p className="text-sm font-semibold text-green-800">
            Fotos com luz natural engajam 3× mais
          </p>
          <p className="text-xs text-green-600/70">
            Use a janela como luz lateral para mais textura.
          </p>
        </div>
      </div> */}
    </div>
  );
}
