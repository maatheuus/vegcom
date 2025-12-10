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

/**
 * Definition of a navigation item in the sidebar.
 */
interface SidebarItem {
  /** The text label for the item. */
  label: string;
  /** The URL path the item links to. */
  href: string;
  /** The icon to display next to the label. */
  icon: React.ReactNode;
}

interface SidebarProps {
  /** Optional list of sidebar items. If not provided, default items are used. */
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

/**
 * Navigation sidebar for the account section.
 * Responsive design: horizontal list on mobile, vertical list on desktop.
 * Highlights the active link based on the current pathname.
 *
 * @param {SidebarProps} props - The component props.
 * @returns {JSX.Element} The rendered sidebar navigation.
 */
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
