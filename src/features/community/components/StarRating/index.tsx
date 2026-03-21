import { HalfStarFilledIcon } from "@/shared/icons";
import Row from "@/shared/ui/Layout/Helpers/Row";
import { StarIcon } from "@phosphor-icons/react/ssr";
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
            <StarIcon
              key={index}
              weight="fill"
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
          <StarIcon
            key={index}
            weight="regular"
            size={20}
            className={clsx("text-green-500", iconClassName)}
          />
        );
      })}
    </Row>
  );
}
