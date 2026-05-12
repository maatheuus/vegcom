"use client";

import { cn } from "@/shared/lib/utils";
import Image from "next/image";
import { PRESET_AVATARS } from "../data/presetAvatars";

interface AvatarPickerProps {
  selected: string | null;
  onSelect: (url: string) => void;
  disabled?: boolean;
}

export function AvatarPicker({
  selected,
  onSelect,
  disabled,
}: AvatarPickerProps) {
  return (
    <div className="flex flex-col gap-2">
      <p className="font-maitree text-sm font-semibold text-green-500">
        Ou escolha um avatar
      </p>
      <div className="grid grid-cols-4 items-center justify-center gap-2">
        {PRESET_AVATARS.map((avatar) => (
          <button
            key={avatar.id}
            type="button"
            disabled={disabled}
            onClick={() => onSelect(avatar.url)}
            title={avatar.label}
            className={cn(
              "mx-auto w-fit rounded-full border-2 transition-all duration-150 disabled:cursor-not-allowed disabled:opacity-50",
              selected === avatar.url
                ? "scale-105 border-green-500"
                : "border-transparent hover:border-green-200",
            )}
          >
            <Image
              src={avatar.url}
              alt={avatar.label}
              width={56}
              height={56}
              className="rounded-full"
              unoptimized
            />
          </button>
        ))}
      </div>
    </div>
  );
}
