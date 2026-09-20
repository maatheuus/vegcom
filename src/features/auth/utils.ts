import { z } from "zod";
import type { UserInformations } from "./api/types";

export const profileCompletionFieldLabels = {
  location: "cidade",
  preference: "estilo de vida",
  culinaryLevel: "nível culinário",
  aboutInfo: "apresentação",
} as const;

export type ProfileCompletionField = keyof typeof profileCompletionFieldLabels;

export function getIncompleteProfileFields(
  informations: Partial<UserInformations> | null | undefined,
): ProfileCompletionField[] {
  return (
    Object.keys(profileCompletionFieldLabels) as ProfileCompletionField[]
  ).filter((field) => !informations?.[field]?.trim?.());
}

export const updatePasswordFormSchema = z
  .object({
    currentPassword: z.string().min(1, "Informe sua senha atual"),
    newPassword: z
      .string()
      .min(8, "A nova senha deve ter no mínimo 8 caracteres"),
    confirmPassword: z.string().min(1, "Confirme a nova senha"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "As senhas não coincidem",
    path: ["confirmPassword"],
  });
