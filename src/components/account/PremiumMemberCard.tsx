import clsx from "clsx";
import Link from "next/link";
import type { ComponentProps } from "react";
import { ArrowRightOutlinedIcon, PlantOutlinedIcon } from "../icons";
import Col from "../ui/Layout/Helpers/Col";
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
}: ComponentProps<"div">) {
  return (
    <Col
      className={clsx(
        "bg-green-100 gap-y-3 size-fit p-2 my-auto items-center rounded-full",
        className
      )}
      {...props}
    >
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger className="cursor-pointer">
            <Link href="/upgrade" className="contents">
              <PlantOutlinedIcon size={24} className="text-green-500" />
            </Link>
          </TooltipTrigger>

          <TooltipContent className="flex mr-4 mb-4 items-start">
            <Text type={Text.Type.BodyFour}>Desbloqueie um sabor extra</Text>
            <ArrowRightOutlinedIcon
              size={16}
              className="text-green-50 -rotate-45"
            />
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </Col>
  );
}
