"use client";

import { useToast } from "@/shared/hooks/use-toast";
import { Input } from "@/shared/ui/Input";
import { type DragEndEvent } from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import { CloudArrowUpIcon, PlusCircleIcon, XCircleIcon } from "@phosphor-icons/react";
import { useCallback, useMemo, useState } from "react";
import { useWatch } from "react-hook-form";
import ImageGallery from "./ImageGallery";
import {
  DURATION_TOAST_IN_SEG,
  MAX_IMAGE_SIZE_BYTES,
  MAX_IMAGE_SIZE_MB,
  MAX_IMAGES,
  type Props,
} from "./index";
import type { ImageItem } from "./SortableImage";

const MAX_EXTRA = MAX_IMAGES - 1;

interface UploadingImage {
  id: string;
  file: File;
  preview: string;
  name: string;
  loading: boolean;
}

export default function ExtraImagesUpload({ form }: Props) {
  const { toast } = useToast();
  const [uploadingImages, setUploadingImages] = useState<UploadingImage[]>([]);

  const watchedImages =
    useWatch({ control: form.control, name: "recipe_images" }) ?? [];
  const extraImages = watchedImages.slice(1) as ImageItem[];

  const { allExtraImages, hasSlots } = useMemo(() => {
    const all = [...extraImages, ...uploadingImages];
    return { allExtraImages: all, hasSlots: all.length < MAX_EXTRA };
  }, [extraImages, uploadingImages]);

  const showLimitToast = useCallback(
    (available: number) => {
      const isExceeded = available <= 0;
      toast({
        title: "Limite de imagens extras atingido",
        description: isExceeded
          ? `Você pode adicionar até ${MAX_EXTRA} imagens além da capa.`
          : `Apenas as primeiras ${available} imagens foram selecionadas.`,
        variant: "destructive",
        duration: DURATION_TOAST_IN_SEG,
      });
    },
    [toast],
  );

  const showFileSizeToast = useCallback(
    (rejectedFiles: string[]) => {
      toast({
        title: "Arquivo(s) muito grande(s)",
        description:
          rejectedFiles.length === 1
            ? `A imagem "${rejectedFiles[0]}" excede o limite de ${MAX_IMAGE_SIZE_MB}MB.`
            : `${rejectedFiles.length} imagens excedem o limite de ${MAX_IMAGE_SIZE_MB}MB: ${rejectedFiles.join(", ")}.`,
        variant: "destructive",
        duration: DURATION_TOAST_IN_SEG + 1500,
      });
    },
    [toast],
  );

  const processImageUpload = useCallback(
    async (img: UploadingImage, index: number) => {
      await new Promise((resolve) => setTimeout(resolve, 700));

      setUploadingImages((prev) => prev.filter((u) => u.id !== img.id));

      const current = form.getValues("recipe_images") ?? [];
      const cover = current[0];
      const extras = current.slice(1);
      const newItem: ImageItem = {
        id: `extra-${Date.now()}-${index}`,
        file: img.file,
        preview: img.preview,
        name: img.name,
      };

      form.setValue(
        "recipe_images",
        cover ? [cover, ...extras, newItem] : [...extras, newItem],
        { shouldValidate: true, shouldDirty: true },
      );
    },
    [form],
  );

  const handleFileChange = useCallback(
    async (event: React.ChangeEvent<HTMLInputElement>) => {
      const files = event.target.files;
      if (!files?.length) return;

      const current = form.getValues("recipe_images") ?? [];
      const currentAvailableSlots =
        MAX_EXTRA - (current.slice(1).length + uploadingImages.length);

      if (currentAvailableSlots <= 0) {
        showLimitToast(0);
        return;
      }

      const newFiles = Array.from(files);
      const validSizeFiles: File[] = [];
      const rejectedFileNames: string[] = [];

      for (const file of newFiles) {
        if (file.size > MAX_IMAGE_SIZE_BYTES) {
          rejectedFileNames.push(file.name);
        } else {
          validSizeFiles.push(file);
        }
      }

      if (rejectedFileNames.length > 0) {
        showFileSizeToast(rejectedFileNames);
      }

      if (validSizeFiles.length === 0) return;

      const filesToUpload = validSizeFiles.slice(0, currentAvailableSlots);

      if (filesToUpload.length < validSizeFiles.length) {
        showLimitToast(currentAvailableSlots);
      }

      const uploading = filesToUpload.map((file, index) => ({
        id: `uploading-extra-${Date.now()}-${index}`,
        file,
        preview: URL.createObjectURL(file),
        name: file.name,
        loading: true,
      }));

      setUploadingImages((prev) => [...prev, ...uploading]);

      await Promise.all(
        uploading.map((img, index) => processImageUpload(img, index)),
      );

      toast({
        title: "Imagens carregadas",
        description: `${filesToUpload.length} imagem(ns) adicionada(s) com sucesso!`,
        duration: DURATION_TOAST_IN_SEG,
      });
    },
    [
      form,
      uploadingImages.length,
      showLimitToast,
      showFileSizeToast,
      processImageUpload,
      toast,
    ],
  );

  const handleRemove = useCallback(
    (id: string) => {
      const current = form.getValues("recipe_images") ?? [];
      const cover = current[0];
      const extras = current.slice(1).filter((img) => img.id !== id);
      setUploadingImages((prev) => prev.filter((img) => img.id !== id));
      form.setValue("recipe_images", cover ? [cover, ...extras] : extras, {
        shouldValidate: true,
        shouldDirty: true,
      });
    },
    [form],
  );

  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      const { active, over } = event;
      if (!over || active.id === over.id) return;

      const isActiveUploading =
        typeof active.id === "string" && active.id.startsWith("uploading-");
      const isOverUploading =
        typeof over.id === "string" && over.id.startsWith("uploading-");

      if (isActiveUploading || isOverUploading) return;

      const current = form.getValues("recipe_images") ?? [];
      const cover = current[0];
      const extras = current.slice(1);
      const oldIdx = extras.findIndex((img) => img.id === active.id);
      const newIdx = extras.findIndex((img) => img.id === over.id);
      if (oldIdx === -1 || newIdx === -1) return;

      const reordered = arrayMove(extras, oldIdx, newIdx);
      form.setValue(
        "recipe_images",
        cover ? [cover, ...reordered] : reordered,
        { shouldValidate: true, shouldDirty: true },
      );
    },
    [form],
  );

  return (
    <div className="rounded-xl border-2 border-dashed border-green-200 bg-green-50/30 p-4 space-y-4">
      {allExtraImages.length > 0 && (
        <div className="flex items-center justify-between">
          <span className="font-lora text-xs italic text-green-500/60">
            {allExtraImages.length}/{MAX_EXTRA} foto{allExtraImages.length !== 1 ? "s" : ""} adicionada{allExtraImages.length !== 1 ? "s" : ""}
          </span>
          {hasSlots ? (
            <label className="cursor-pointer text-green-500 transition-colors hover:text-green-700">
              <PlusCircleIcon size={20} />
              <Input
                type="file"
                accept="image/*"
                multiple
                className="sr-only"
                onChange={handleFileChange}
              />
            </label>
          ) : (
            <span className="flex items-center gap-1 text-xs text-green-500/40">
              <XCircleIcon size={13} />
              Limite atingido
            </span>
          )}
        </div>
      )}

      {allExtraImages.length > 0 && (
        <ImageGallery
          images={allExtraImages}
          onRemove={handleRemove}
          onDragEnd={handleDragEnd}
        />
      )}

      {allExtraImages.length === 0 && (
        <label className="flex min-h-[10rem] cursor-pointer flex-col items-center justify-center gap-2 rounded-lg transition hover:bg-green-50/50">
          <CloudArrowUpIcon size={28} className="text-green-200" />
          <span className="font-lora text-sm text-green-500/70 italic">
            Arraste e solte ou{" "}
            <strong className="cursor-pointer text-green-500">
              selecione suas imagens
            </strong>
          </span>
          <Input
            type="file"
            accept="image/*"
            multiple
            className="sr-only"
            onChange={handleFileChange}
          />
        </label>
      )}
    </div>
  );
}
