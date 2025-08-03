import { z } from "zod";
import {
  ArrowsClockwiseOutlinedIcon,
  ChefHatOutlinedIcon,
  HeartOutlinedIcon,
  PersonOutlinedIcon,
} from "../icons";

export const defaultInfoItems = [
  {
    title: "Quem é você?",
    desc: "Atualize seus dados pessoais",
    link: "/account/personal-info",
    icon: PersonOutlinedIcon,
  },
  {
    title: "Planos & Assinaturas",
    desc: "Configure sua assinatura",
    link: "/account/subscription",
    icon: ArrowsClockwiseOutlinedIcon,
  },
  {
    title: "Masterchef em Ação",
    desc: "Aqui ficam as receitas que te transformam em chef!",
    link: "/account/recipes",
    icon: ChefHatOutlinedIcon,
  },
  {
    title: "Favoritas do Coração",
    desc: "Aqui estão as receitas que te fazem salivar só de pensar.",
    link: "/account/favorites",
    icon: HeartOutlinedIcon,
  },
];

export const messagesToDisplayForPremium = [
  {
    text: "Você é demais",
  },
  {
    text: "Você é incrível",
  },
  {
    text: "Obrigado por se inscrever",
  },
  {
    text: "O café hoje é por minha conta",
  },
  {
    text: "Você é Premium",
  },
  {
    text: "Parte do time",
  },
  {
    text: "A melhor de todas as pessoas",
  },
  {
    text: "Obrigado por pagar meu café hoje",
  },
];

export const maxLengthForBio = 400;

export const personalInfoFormSchema = z
  .object({
    fullName: z.string().min(2, "Nome muito curto"),
    email: z.string().email("Email inválido"),
    bio: z
      .string()
      .min(
        50,
        "Não precisa nos revelar que você é o Batman, apenas um resumo pequeno sobre você."
      )
      .max(
        maxLengthForBio,
        "Vamos com calma, essa não é pra ser sua biografia não!"
      ),
    password: z.string().optional(),
    newPassword: z
      .string()
      .min(6, "A senha deve ter pelo menos 6 caracteres")
      .optional(),
    confirmPassword: z.string().optional(),
    dietType: z.string().min(1, "Escolha seu tipo de dieta"),
    culinaryLevel: z.string().min(1, "Qual seu nível culinário?"),
    location: z.string().min(2, "Nos conte onde você está"),
    publicProfile: z.boolean(),
    monthlyGoal: z.string().min(1, "Defina uma meta mensal"),
  })
  .refine(
    (data) => {
      if (data.newPassword) {
        return data.password && data.password.length > 0;
      }
      return true;
    },
    {
      message: "Senha atual é obrigatória para alterar a senha",
      path: ["password"],
    }
  )
  .refine(
    (data) => !data.newPassword || data.newPassword === data.confirmPassword,
    {
      message: "As senhas não coincidem",
      path: ["confirmPassword"],
    }
  );

export const dietOptions = [
  { value: "vegetarian", label: "Vegetariano" },
  { value: "vegan", label: "Vegano" },
  { value: "plant-based", label: "Plant-based" },
];

export const culinaryLevelOptions = [
  { value: "beginner", label: "Iniciante" },
  { value: "intermediate", label: "Intermediário" },
  { value: "advanced", label: "Avançado" },
];

export const monthlyGoalOptions = [
  { value: "1-2", label: "1-2 receitas" },
  { value: "3-5", label: "3-5 receitas" },
  { value: "6-10", label: "6-10 receitas" },
  { value: "10+", label: "Mais de 10 receitas" },
];

export const bioTooShortMessages = [
  "Sua bio tá muito curta! Capricha um pouco mais 😄📝",
  "Conta um pouquinho sobre você, tipo aquele textinho de perfil do Insta. 📸✨",
  "Não precisa nos revelar que você é o Batman, apenas um resumo pequeno sobre você. 🦇",
];

export const bioTooLongMessages = [
  "Vamos com calma, essa não é pra ser sua biografia não! 📚😅",
  "Ih, tá muito longa... não é um livro não, hein! 📖🙃",
  "Resume aí! A gente só quer conhecer um pouquinho, não precisa ir até a infância. 👶🕵️‍♂️",
  "Tá bom demais, mas será que dá pra encurtar só um pouquinho? ✂️😉",
  "Você é incrível, mas precisamos que você se descreva em menos palavras 📝🤏",
  "Lembra daquele resumo de 4 linhas do colégio? É tipo isso aqui. 📄😬",
];
