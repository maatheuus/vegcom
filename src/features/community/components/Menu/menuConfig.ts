import {
  ChatCircleIcon,
  ChefHatIcon,
  Icon,
  LightbulbFilamentIcon,
  PlantIcon,
  PlusCircleIcon,
  UserCircleIcon,
  UsersFourIcon,
} from "@phosphor-icons/react";

export type NavLink = {
  label: string;
  href: string;
  icon: Icon;
};

export const menuConfig = {
  brand: {
    label: "VegCom",
    href: "/",
    logo: "/favicon-leaf-fork.png",
  },
  centerLinks: [
    { label: "Comunidade", href: "/", icon: UsersFourIcon },
    { label: "Receitas", href: "/recipes", icon: ChefHatIcon },
    { label: "Nova receita", href: "/new-recipe", icon: PlusCircleIcon },
    { label: "Chat", href: "/chat", icon: ChatCircleIcon },
    {
      label: "Curiosidades",
      href: "/curiosities",
      icon: LightbulbFilamentIcon,
    },
  ] satisfies NavLink[],
  upgradeLink: {
    label: "Upgrade",
    href: "/account/subscription",
    icon: PlantIcon,
  },
  accountLink: {
    label: "Minha conta",
    href: "/account",
    icon: UserCircleIcon,
  },
};
