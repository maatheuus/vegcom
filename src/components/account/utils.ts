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
    link: "personal-info",
    icon: PersonOutlinedIcon,
    requiresPremium: false,
  },
  {
    title: "Planos & Assinaturas",
    desc: "Configure sua assinatura",
    link: "subscription",
    icon: ArrowsClockwiseOutlinedIcon,
    requiresPremium: true,
  },
  {
    title: "Masterchef em Ação",
    desc: "Aqui ficam as receitas que te transformam em chef!",
    link: "recipes",
    icon: ChefHatOutlinedIcon,
    requiresPremium: false,
  },
  {
    title: "Favoritas do Coração",
    desc: "Aqui estão as receitas que te fazem salivar só de pensar.",
    link: "favorites",
    icon: HeartOutlinedIcon,
    requiresPremium: false,
  },
];

export const messagesToDisplayForPremium = [
  {
    text: "Agora você joga no modo turbo!",
  },
  {
    text: "Você desbloqueou o clube secreto dos legais!",
  },
  {
    text: "Premium é pouco, você é VIP!",
  },
  {
    text: "Sua presença melhora até a conexão Wi-Fi!",
  },
  {
    text: "O mundo ficou 10% melhor com sua assinatura!",
  },
  {
    text: "Você é a definição de bom gosto!",
  },
  {
    text: "Com você, tudo faz mais sentido!",
  },
  {
    text: "Premium de corpo, alma e coração!",
  },
  {
    text: "O universo agradece sua escolha!",
  },
  {
    text: "Você deixou tudo mais bonito por aqui!",
  },
  {
    text: "A galera do Premium te manda um high five!",
  },
  {
    text: "Upgrade completo: agora você brilha mais!",
  },
  {
    text: "Dizem que quem assina Premium tem mais sorte!",
  },
  {
    text: "Se fosse um superpoder, seria o mais legal!",
  },
  {
    text: "Assinatura confirmada, carisma ativado!",
  },
  {
    text: "Avisa que é você: Premium e sensacional!",
  },
  {
    text: "Você entrou pro hall da fama dos incríveis!",
  },
  {
    text: "Premium com orgulho e estilo!",
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
        "Não precisa nos revelar que você é o Batman, apenas um resumo pequeno sobre você.",
      )
      .max(
        maxLengthForBio,
        "Vamos com calma, essa não é pra ser sua biografia não!",
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
    },
  )
  .refine(
    (data) => !data.newPassword || data.newPassword === data.confirmPassword,
    {
      message: "As senhas não coincidem",
      path: ["confirmPassword"],
    },
  );

export const dietOptions = [
  { value: "vegetarian", label: "Vegetariano" },
  { value: "vegan", label: "Vegano" },
  { value: "plant-based", label: "Plant-based" },
];

export const culinaryLevelOptions = [
  { value: "beginner", label: "Queima tudo" },
  { value: "intermediate", label: "Sabe fritar um ovo" },
  { value: "advanced", label: "MasterChef não é nada" },
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
