"use client";

import Text from "@/shared/ui/Text";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/shared/ui/Tooltip";
import { messagesToDisplayForPremium } from "./utils";
import { PlantIcon } from "@phosphor-icons/react";

export default function PremiumMemberBadge() {
  const randomMessage =
    messagesToDisplayForPremium[
      Math.floor(Math.random() * messagesToDisplayForPremium.length)
    ];

  return (
    <div className="group my-auto flex size-auto cursor-pointer items-center rounded-full bg-green-500 p-1 transition-colors duration-300 border hover:bg-transparent hover:border-green-500">
      <TooltipProvider delayDuration={100}>
        <Tooltip>
          <TooltipTrigger className="cursor-pointer">
            <PlantIcon
              size={20}
              className="cursor-pointer text-green-50 group-hover:text-green-500"
            />
          </TooltipTrigger>

          <TooltipContent className="mr-2 mb-2 flex items-start">
            <Text type={Text.Type.BodyThree} className="text-green-50">
              {randomMessage.text}
            </Text>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
}
