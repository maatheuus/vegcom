"use client";

import { Preference } from "@/features/account";
import { cn } from "@/shared/lib/utils";
import Text from "@/shared/ui/Text";
import { LeafIcon, PlantIcon, SparkleIcon } from "@phosphor-icons/react";

interface UserPreferenceBadgeProps {
  preference: Preference;
  className?: string;
}

const PREFERENCE_CONFIG = {
  [Preference.VEGAN]: {
    label: "Vegano (a)",
    icon: LeafIcon,
    className: "bg-green-50 text-green-700 ring-green-600/20 border-green-100",
  },
  [Preference.VEGETARIAN]: {
    label: "Vegetariano (a)",
    icon: PlantIcon,
    className:
      "bg-emerald-50 text-emerald-700 ring-emerald-600/20 border-emerald-100",
  },
  [Preference.OTHER]: {
    label: "Outro",
    icon: SparkleIcon,
    className:
      "bg-orange-50 text-orange-700 ring-orange-600/10 border-orange-100",
  },
};

export function UserPreferenceBadge({
  preference,
  className,
}: UserPreferenceBadgeProps) {
  const config = PREFERENCE_CONFIG[preference];
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
