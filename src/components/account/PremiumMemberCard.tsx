import clsx from "clsx";
import Link from "next/link";
import type { ComponentProps } from "react";
import { PlantOutlinedIcon } from "../icons";
import Text from "../ui/Text";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/Tooltip";

export default function PremiumMemberCard({
  className,
  ...props
}: ComponentProps<"a">) {
  return (
    <Link
      href="/upgrade"
      className={clsx(
        "bg-green-100 size-auto p-2 my-auto flex items-center rounded-full hover:bg-green-500 transition-colors duration-300 group cursor-pointer",
        className
      )}
      {...props}
    >
      <TooltipProvider delayDuration={100}>
        <Tooltip>
          <TooltipTrigger>
            <PlantOutlinedIcon
              size={24}
              className="text-green-500 group-hover:text-green-50 cursor-pointer"
            />
          </TooltipTrigger>

          <TooltipContent className="flex mr-2 mb-4 items-start">
            <Text type={Text.Type.BodyFour}>Desbloqueie um sabor extra</Text>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </Link>
  );
}
