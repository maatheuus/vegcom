"use client";

import { CulinaryLevel } from "@/features/account";
import { cn } from "@/shared/lib/utils";
import Text from "@/shared/ui/Text";
import {
  ChefHatIcon,
  CookingPotIcon,
  FireIcon,
  GraduationCapIcon,
} from "@phosphor-icons/react";

interface UserCulinaryLevelBadgeProps {
  level: CulinaryLevel;
  className?: string;
}

const LEVEL_CONFIG = {
  [CulinaryLevel.BEGINNER]: {
    label: "Queima tudo",
    icon: FireIcon,
    className: "bg-red-50 text-red-700 ring-red-600/20 border-red-100",
  },
  [CulinaryLevel.INTERMEDIATE]: {
    label: "Acerta o arroz",
    icon: CookingPotIcon,
    className: "bg-blue-50 text-blue-700 ring-blue-600/20 border-blue-100",
  },
  [CulinaryLevel.ADVANCED]: {
    label: "Mestre da cozinha",
    icon: GraduationCapIcon,
    className: "bg-purple-50 text-purple-700 ring-purple-600/20 border-purple-100",
  },
  [CulinaryLevel.PRO]: {
    label: "Chef Profissional",
    icon: ChefHatIcon,
    className: "bg-amber-50 text-amber-700 ring-amber-600/20 border-amber-100",
  },
};

export function UserCulinaryLevelBadge({
  level,
  className,
}: UserCulinaryLevelBadgeProps) {
  const config = LEVEL_CONFIG[level];
  if (!config) return null;

  const Icon = config.icon;

  return (
    <div
      className={cn(
        "flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium shadow-sm transition-all duration-300 hover:shadow-md",
        config.className,
        className,
      )}
    >
      <Icon weight="fill" className="size-3.5" />
      <Text
        as="span"
        type={Text.Type.BodySix}
        weight={Text.Weight.Medium}
        className="text-inherit"
      >
        {config.label}
      </Text>
    </div>
  );
}
