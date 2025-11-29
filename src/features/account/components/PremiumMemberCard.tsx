import Text from "@/shared/ui/Text";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/shared/ui/Tooltip";
import { PlantIcon } from "@phosphor-icons/react/ssr";
import clsx from "clsx";
import Link from "next/link";
import type { ComponentProps } from "react";

export default function PremiumMemberCard({
  className,
  ...props
}: ComponentProps<"a">) {
  return (
    <Link
      href="/account/subscription"
      className={clsx(
        "group my-auto flex size-auto cursor-pointer items-center rounded-full bg-green-100 p-2 transition-colors duration-300 hover:bg-green-500",
        className,
      )}
      {...props}
    >
      <TooltipProvider delayDuration={100}>
        <Tooltip>
          <TooltipTrigger>
            <PlantIcon
              size={24}
              className="cursor-pointer text-green-500 group-hover:text-green-50"
            />
          </TooltipTrigger>

          <TooltipContent className="mr-2 mb-4 flex items-start">
            <Text type={Text.Type.BodyFour}>Desbloqueie um sabor extra</Text>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </Link>
  );
}
