import {
  HalfStarFilledIcon,
  StarFilledIcon,
  StarOutlinedIcon,
} from "@/components/icons";
import Row from "@/components/ui/Layout/Helpers/Row";

export default function StarRating({ rating }: { rating: number }) {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating - fullStars >= 0.75;
  const stars = Array(5).fill(0);

  return (
    <Row className="items-center">
      {stars.map((_, index) => {
        if (index < fullStars)
          return (
            <StarFilledIcon key={index} size={20} className="text-green-200" />
          );
        if (index === fullStars && hasHalfStar)
          return (
            <HalfStarFilledIcon
              key={index}
              size={20}
              className="text-green-200"
            />
          );
        return (
          <StarOutlinedIcon key={index} size={20} className="text-green-200" />
        );
      })}
    </Row>
  );
}
