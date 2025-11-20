import { useToast } from "@/shared/hooks/use-toast";
import { CloudArrowUpOutlinedIcon, PlusOutlinedIcon } from "@/shared/icons";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/shared/ui/Form";
import { Input } from "@/shared/ui/Input";
import Col from "@/shared/ui/Layout/Helpers/Col";
import Row from "@/shared/ui/Layout/Helpers/Row";
import Text from "@/shared/ui/Text";
import { DragEndEvent } from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import type { ComponentProps } from "react";
import { useCallback, useMemo, useState } from "react";
import type { UseFormReturn } from "react-hook-form";
import type { z } from "zod";

import type { newRecipeFormSchema } from "../../utils";
import ImageGallery from "./ImageGallery";

interface UploadingImage {
  id: string;
  file: File;
  preview: string;
  name: string;
  loading: boolean;
}

export interface Props extends ComponentProps<"div"> {
  form: UseFormReturn<z.infer<typeof newRecipeFormSchema>>;
}

export const MAX_IMAGES = 8;
export const DURATION_TOAST_IN_SEG = 2000;

export default function ImageUploadArea({ form, className }: Props) {
  const [uploadingImages, setUploadingImages] = useState<UploadingImage[]>([]);
  const { toast } = useToast();

  const watchedImages = form.watch("recipe_images");
  const images = useMemo(() => watchedImages || [], [watchedImages]);

  const { allImages, hasAvailableSlots } = useMemo(() => {
    const all = [...images, ...uploadingImages];
    const available = MAX_IMAGES - all.length;
    return {
      allImages: all,
      availableSlots: available,
      hasAvailableSlots: available > 0,
    };
  }, [images, uploadingImages]);

  const showLimitToast = useCallback(
    (available: number) => {
      const isExceeded = available <= 0;
      toast({
        title: "Limite de imagens excedido",
        description: isExceeded
          ? `Você pode fazer upload de no máximo ${MAX_IMAGES} imagens.`
          : `Apenas as primeiras ${available} imagens foram selecionadas.`,
        variant: "destructive",
        duration: DURATION_TOAST_IN_SEG,
      });
    },
    [toast],
  );

  const processImageUpload = useCallback(
    async (img: UploadingImage, index: number) => {
      await new Promise((resolve) => setTimeout(resolve, 700));

      setUploadingImages((prev) => prev.filter((u) => u.id !== img.id));

      form.setValue("recipe_images", [
        ...(form.getValues("recipe_images") || []),
        {
          id: `image-${Date.now()}-${index}`,
          file: img.file,
          preview: img.preview,
          name: img.name,
        },
      ]);
    },
    [form],
  );

  const handleFileChange = useCallback(
    async (event: React.ChangeEvent<HTMLInputElement>) => {
      const files = event.target.files;
      if (!files?.length) return;

      const currentAvailableSlots =
        MAX_IMAGES - (images.length + uploadingImages.length);

      if (currentAvailableSlots <= 0) {
        showLimitToast(0);
        return;
      }

      const newFiles = Array.from(files);
      const filesToUpload = newFiles.slice(0, currentAvailableSlots);

      if (filesToUpload.length < newFiles.length) {
        showLimitToast(currentAvailableSlots);
      }

      const uploading = filesToUpload.map((file, index) => ({
        id: `uploading-${Date.now()}-${index}`,
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
      images.length,
      uploadingImages.length,
      showLimitToast,
      processImageUpload,
      toast,
    ],
  );

  const handleRemoveImage = useCallback(
    (id: string) => {
      const currentImages = form.getValues("recipe_images") || [];
      const newLoaded = currentImages.filter((img) => img.id !== id);
      const newUploading = uploadingImages.filter((img) => img.id !== id);

      form.setValue("recipe_images", newLoaded.length > 0 ? newLoaded : [], {
        shouldValidate: true,
        shouldDirty: true,
      });
      setUploadingImages(newUploading);
      form.trigger("recipe_images");

      toast({
        title: "Imagem removida",
        description: "A imagem foi removida com sucesso.",
        duration: DURATION_TOAST_IN_SEG,
      });
    },
    [form, uploadingImages, toast],
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

      const currentImages = form.getValues("recipe_images");
      const oldIndex = currentImages.findIndex((img) => img.id === active.id);
      const newIndex = currentImages.findIndex((img) => img.id === over.id);

      if (oldIndex === -1 || newIndex === -1) return;

      const newImages = arrayMove(currentImages, oldIndex, newIndex);

      form.setValue("recipe_images", newImages, {
        shouldValidate: true,
        shouldDirty: true,
      });
    },
    [form],
  );

  const triggerFileInput = useCallback(() => {
    const fileInput = document.querySelector(
      'input[type="file"]',
    ) as HTMLInputElement;
    fileInput?.click();
  }, []);

  const EmptyArea = useMemo(
    () => (
      <>
        <Input
          type="file"
          accept="image/*"
          multiple
          className="absolute inset-0 z-10 cursor-pointer opacity-0"
          onChange={handleFileChange}
        />
        <Col className="size-full min-h-[12rem] items-center justify-center gap-y-2">
          <CloudArrowUpOutlinedIcon className="text-green-500" size={48} />
          <Text className="font-maitree text-center text-green-500">
            Arraste e solte ou{" "}
            <strong className="cursor-pointer text-green-500">
              selecione suas imagens
            </strong>
          </Text>
        </Col>
      </>
    ),
    [handleFileChange],
  );

  const FilledArea = useMemo(
    () => (
      <>
        <div className="space-y-4">
          {hasAvailableSlots && (
            <Input
              type="file"
              accept="image/*"
              multiple
              className="absolute inset-0 z-10 cursor-pointer opacity-0"
              onChange={handleFileChange}
            />
          )}
          <Row.Center className="relative z-20 justify-between">
            <Text
              weight={Text.Weight.Medium}
              className="font-maitree !text-sm text-green-500"
            >
              Imagens{" "}
              <strong>
                ({allImages.length}/{MAX_IMAGES})
              </strong>
            </Text>
            {hasAvailableSlots && (
              <div
                className="cursor-pointer text-green-500"
                onClick={triggerFileInput}
              >
                <PlusOutlinedIcon size={18} />
              </div>
            )}
          </Row.Center>

          <div className="relative z-20">
            <ImageGallery
              images={allImages}
              onRemove={handleRemoveImage}
              onDragEnd={handleDragEnd}
            />
          </div>
        </div>
      </>
    ),
    [
      allImages,
      hasAvailableSlots,
      handleFileChange,
      triggerFileInput,
      handleRemoveImage,
      handleDragEnd,
    ],
  );

  return (
    <FormField
      control={form.control}
      name="recipe_images"
      render={() => (
        <Col className="h-full">
          <FormItem className={`flex h-full ${className || ""}`}>
            <FormControl>
              <div className="relative min-h-[9.3rem] w-full rounded-sm border border-dashed border-green-200 p-4">
                {allImages.length === 0 ? EmptyArea : FilledArea}
              </div>
            </FormControl>
          </FormItem>
          <FormMessage />
        </Col>
      )}
    />
  );
}
