import {
  HalfStarFilledIcon,
  StarFilledIcon,
  StarOutlinedIcon,
} from "@/components/icons";
import Row from "@/components/ui/Layout/Helpers/Row";
import clsx from "clsx";

export default function StarRating({
  rating,
  className,
  iconClassName,
}: {
  rating: number;
  className?: string;
  iconClassName?: string;
}) {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating - fullStars >= 0.75;
  const stars = Array(5).fill(0);

  return (
    <Row className={clsx("items-center", className)}>
      {stars.map((_, index) => {
        if (index < fullStars)
          return (
            <StarFilledIcon
              key={index}
              size={20}
              className={clsx("text-green-500", iconClassName)}
            />
          );
        if (index === fullStars && hasHalfStar)
          return (
            <HalfStarFilledIcon
              key={index}
              size={20}
              className={clsx("text-green-500", iconClassName)}
            />
          );
        return (
          <StarOutlinedIcon
            key={index}
            size={20}
            className={clsx("text-green-500", iconClassName)}
          />
        );
      })}
    </Row>
  );
}
