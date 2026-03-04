import { useToast } from "@/shared/hooks/use-toast";
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

import {
  defaultTestingImages,
  type DefaultTestingImage,
} from "@/assets/images/defaultForTesting";
import {
  CheckCircleIcon,
  CloudArrowUpIcon,
  PlusCircleIcon,
} from "@phosphor-icons/react";
import type { newRecipeFormSchema } from "../../../recipes/components/utils";
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
  useDefaultTestingImages?: boolean;
}

export const MAX_IMAGES = 6;
export const DURATION_TOAST_IN_SEG = 2000;
export const MAX_IMAGE_SIZE_MB = 3;
export const MAX_IMAGE_SIZE_BYTES = MAX_IMAGE_SIZE_MB * 1024 * 1024;

export default function ImageUploadArea({
  form,
  className,
  useDefaultTestingImages = false,
}: Props) {
  const [uploadingImages, setUploadingImages] = useState<UploadingImage[]>([]);
  const [loadingTestImage, setLoadingTestImage] = useState<string | null>(null);
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
      showFileSizeToast,
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

  const handleAddTestingImage = useCallback(
    async (testImage: DefaultTestingImage) => {
      const currentImages = form.getValues("recipe_images") || [];
      const totalCurrentImages = currentImages.length + uploadingImages.length;

      if (totalCurrentImages >= MAX_IMAGES) {
        showLimitToast(0);
        return;
      }

      const alreadyAdded = currentImages.some(
        (img) => img.name === testImage.name,
      );
      if (alreadyAdded) {
        toast({
          title: "Imagem já adicionada",
          description: `"${testImage.name}" já está na lista.`,
          variant: "destructive",
          duration: DURATION_TOAST_IN_SEG,
        });
        return;
      }

      setLoadingTestImage(testImage.name);

      try {
        const imageSrc =
          typeof testImage.src === "string" ? testImage.src : testImage.src.src;

        const response = await fetch(imageSrc);
        const blob = await response.blob();
        const file = new File([blob], testImage.name, { type: blob.type });

        form.setValue("recipe_images", [
          ...(form.getValues("recipe_images") || []),
          {
            id: `test-image-${Date.now()}`,
            file,
            preview: imageSrc,
            name: testImage.name,
          },
        ]);

        toast({
          title: "Imagem adicionada",
          description: `"${testImage.name}" foi adicionada com sucesso!`,
          duration: DURATION_TOAST_IN_SEG,
        });
      } catch {
        toast({
          title: "Erro ao carregar imagem",
          description: "Não foi possível adicionar a imagem de teste.",
          variant: "destructive",
          duration: DURATION_TOAST_IN_SEG,
        });
      } finally {
        setLoadingTestImage(null);
      }
    },
    [form, uploadingImages.length, showLimitToast, toast],
  );

  const TestingImagesGrid = useMemo(() => {
    const currentImages = form.getValues("recipe_images") || [];
    const addedNames = new Set(currentImages.map((img) => img.name));

    return (
      <div className="space-y-4">
        {allImages.length > 0 && (
          <Text
            weight={Text.Weight.Medium}
            className="font-maitree !text-sm text-green-500"
          >
            Imagens{" "}
            <strong>
              ({allImages.length}/{MAX_IMAGES})
            </strong>
          </Text>
        )}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
          {defaultTestingImages.map((testImage) => {
            const isAdded = addedNames.has(testImage.name);
            const isLoading = loadingTestImage === testImage.name;
            const imageSrc =
              typeof testImage.src === "string"
                ? testImage.src
                : testImage.src.src;

            return (
              <button
                key={testImage.name}
                type="button"
                disabled={isLoading || isAdded}
                onClick={() => handleAddTestingImage(testImage)}
                className={`group relative aspect-square cursor-pointer overflow-hidden rounded-md border-2 transition-all duration-200 ${
                  isAdded
                    ? "border-green-500 opacity-70"
                    : "border-green-200 hover:border-green-400 hover:shadow-md"
                } ${isLoading ? "animate-pulse" : ""}`}
              >
                <img
                  src={imageSrc}
                  alt={testImage.name}
                  className="h-full w-full object-cover transition-transform duration-200 group-hover:scale-105"
                />
                {isAdded && (
                  <div className="absolute inset-0 flex items-center justify-center bg-green-500/30">
                    <CheckCircleIcon
                      size={32}
                      weight="fill"
                      className="text-green-700"
                    />
                  </div>
                )}
              </button>
            );
          })}
        </div>
        {allImages.length > 0 && (
          <ImageGallery
            images={allImages}
            onRemove={handleRemoveImage}
            onDragEnd={handleDragEnd}
          />
        )}
      </div>
    );
  }, [
    form,
    loadingTestImage,
    handleAddTestingImage,
    allImages,
    handleRemoveImage,
    handleDragEnd,
  ]);

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
          <CloudArrowUpIcon className="text-green-500" size={48} />
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
                <PlusCircleIcon size={18} />
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
                {useDefaultTestingImages
                  ? TestingImagesGrid
                  : allImages.length === 0
                    ? EmptyArea
                    : FilledArea}
              </div>
            </FormControl>
          </FormItem>
          <FormMessage />
        </Col>
      )}
    />
  );
}
