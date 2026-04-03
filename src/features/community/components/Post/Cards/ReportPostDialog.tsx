"use client";

import { createReport } from "@/features/community/api/communityApi";
import { toast } from "@/shared/hooks/use-toast";
import Button from "@/shared/ui/Button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/shared/ui/Dialog";
import Col from "@/shared/ui/Layout/Helpers/Col";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const REPORT_REASONS = [
  "Spam ou propaganda",
  "Conteúdo ofensivo",
  "Discurso de ódio",
  "Assédio ou bullying",
  "Desinformação",
  "Outro",
] as const;

const reportSchema = z.object({
  reason: z.string().min(1, "Selecione um motivo"),
  details: z.string().max(300).optional(),
});

type ReportFormValues = z.infer<typeof reportSchema>;

interface ReportPostDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  postId: number | string;
  targetUserId?: number;
}

export default function ReportPostDialog({
  open,
  onOpenChange,
  postId,
  targetUserId,
}: ReportPostDialogProps) {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<ReportFormValues>({
    resolver: zodResolver(reportSchema),
  });

  const selectedReason = watch("reason");

  const onSubmit = async (values: ReportFormValues) => {
    const reason = values.details
      ? `${values.reason}: ${values.details}`
      : values.reason;

    await createReport({ reason, communityPostId: postId, targetUserId });

    toast({
      title: "Denúncia enviada",
      description: "Obrigado. Nossa equipe irá analisar em breve.",
      variant: "success",
    });

    reset();
    onOpenChange(false);
  };

  const handleOpenChange = (next: boolean) => {
    if (!next) reset();
    onOpenChange(next);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="rounded-lg max-md:max-w-[90%]">
        <DialogHeader>
          <DialogTitle className="font-lora text-lg">
            Denunciar post
          </DialogTitle>
          <DialogDescription className="text-sm">
            Selecione o motivo da denúncia. Ela será analisada pela nossa
            equipe.
          </DialogDescription>
        </DialogHeader>

        <form
          onSubmit={handleSubmit(onSubmit)}
          onClick={(e) => e.stopPropagation()}
          className="mt-1 space-y-4"
        >
          <Col className="gap-y-2">
            {REPORT_REASONS.map((label) => (
              <label
                key={label}
                className="flex cursor-pointer items-center gap-3 rounded-lg border border-green-100 px-3 py-2.5 text-sm transition-colors has-[:checked]:border-red-300 has-[:checked]:bg-red-50"
              >
                <input
                  type="radio"
                  value={label}
                  {...register("reason")}
                  className="accent-red-500"
                />
                <span className="text-green-700">{label}</span>
              </label>
            ))}

            {errors.reason && (
              <p className="text-xs text-red-500">{errors.reason.message}</p>
            )}
          </Col>

          {selectedReason === "Outro" && (
            <Col className="gap-y-1">
              <textarea
                {...register("details")}
                placeholder="Descreva brevemente…"
                rows={3}
                className="w-full resize-none rounded-lg border border-green-100 px-3 py-2 text-sm text-green-500 placeholder:text-green-200 focus:border-green-500 focus:outline-none"
              />
              {errors.details && (
                <p className="text-xs text-red-500">{errors.details.message}</p>
              )}
            </Col>
          )}

          <DialogFooter className="gap-2 sm:gap-2">
            <DialogClose asChild>
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="border-gray-200 text-gray-600 hover:bg-gray-50"
                disabled={isSubmitting}
              >
                Cancelar
              </Button>
            </DialogClose>
            <Button
              type="submit"
              size="sm"
              className="bg-red-600 text-white hover:bg-red-700 focus-visible:ring-red-400"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <span className="flex items-center gap-1.5">
                  <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  Enviando…
                </span>
              ) : (
                "Enviar denúncia"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
