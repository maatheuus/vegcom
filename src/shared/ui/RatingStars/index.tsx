"use client";

import { StarFilledIcon } from "@/shared/icons";
import { useState } from "react";
import Button from "../Button";
import Row from "../Layout/Helpers/Row";
import Text from "../Text";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../Tooltip";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  initialRating?: number;
  value?: number;
  onRatingChange: (rating: number) => void;
}

const labelStars = [
  {
    value: 1,
    label: "Ruim",
  },
  {
    value: 2,
    label: "Regular",
  },
  {
    value: 3,
    label: "Bom",
  },
  {
    value: 4,
    label: "Ótimo",
  },
  {
    value: 5,
    label: "Excelente",
  },
];

export default function RatingStars({
  className,
  onRatingChange,
  value = 0,
  ...props
}: Props) {
  const [hoveredRating, setHoveredRating] = useState(0);

  const totalStars = 5;

  const getStarColor = (starIndex: number) => {
    const currentRating = hoveredRating > 0 ? hoveredRating : value;
    return starIndex <= currentRating
      ? "[&_path]:fill-green-500"
      : "[&_path]:stroke-green-500 [&_path]:fill-transparent [&_path]:hover:fill-green-200 [&_path]:hover:stroke-green-200 [&_path]:transition-colors [&_path]:duration-300";
  };

  const getTooltipText = (starIndex: number) => {
    return labelStars.find((star) => star.value === starIndex)?.label;
  };

  return (
    <TooltipProvider delayDuration={0}>
      <Row className={`${className || ""}`} {...props}>
        {Array.from({ length: totalStars }).map((_, index) => {
          const starValue = index + 1;

          return (
            <Tooltip key={starValue}>
              <TooltipTrigger asChild>
                <Button
                  type="button"
                  variant="none"
                  size="lg"
                  className="size-6 p-0 [&_svg]:!size-fit"
                  onClick={() => {
                    if (value === starValue) {
                      onRatingChange?.(0);
                    } else {
                      onRatingChange?.(starValue);
                    }
                  }}
                  onMouseEnter={() => setHoveredRating(starValue)}
                  onMouseLeave={() => setHoveredRating(0)}
                  aria-label={`${starValue} de ${totalStars} estrelas`}
                >
                  <StarFilledIcon
                    size={20}
                    className={getStarColor(starValue)}
                  />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <Text as="span" className="!text-xs font-semibold font-frank">
                  {getTooltipText(starValue)}
                </Text>
              </TooltipContent>
            </Tooltip>
          );
        })}
      </Row>
    </TooltipProvider>
  );
}
