"use client";

import { cn } from "@/shared/lib/utils";
import {
  ChefHatIcon,
  GearIcon,
  HeartIcon,
  ScrollIcon,
  UserCircleIcon,
} from "@phosphor-icons/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface SidebarItem {
  label: string;
  href: string;
  icon: React.ReactNode;
}

interface SidebarProps {
  items?: SidebarItem[];
}

const sidebarItems = [
  {
    label: "Perfil",
    href: "/account",
    icon: <UserCircleIcon size={20} />,
  },
  {
    label: "Minhas Receitas",
    href: "/account/recipes",
    icon: <ChefHatIcon size={20} />,
  },
  {
    label: "Favoritos",
    href: "/account/favorites",
    icon: <HeartIcon size={20} />,
  },
  {
    label: "Assinatura",
    href: "/account/subscription",
    icon: <ScrollIcon size={20} />,
  },
  {
    label: "Configurações",
    href: "/account/settings",
    icon: <GearIcon size={20} />,
  },
];

export default function Sidebar({ items }: SidebarProps) {
  const pathname = usePathname();

  return (
    <nav className="mx-auto w-fit rounded-xl border border-green-200 bg-green-50 p-2 lg:w-full">
      <ul className="flex flex-row gap-1 lg:flex-col">
        {(items || sidebarItems).map((item) => {
          const isActive = pathname === item.href;

          return (
            <li key={item.href}>
              <Link
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-green-100 text-green-500"
                    : "text-green-500/70 hover:bg-green-100 hover:text-green-500",
                )}
              >
                <span className="flex-shrink-0">{item.icon}</span>
                <span className="font-lora hidden font-bold italic md:inline-block">
                  {item.label}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
