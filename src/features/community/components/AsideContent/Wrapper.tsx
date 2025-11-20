import type { DataRecipeCard } from "@/shared/types";
import Col from "@/shared/ui/Layout/Helpers/Col";
import Row from "@/shared/ui/Layout/Helpers/Row";
import Text from "@/shared/ui/Text";
import clsx from "clsx";
import Link from "next/link";
import type { HtmlHTMLAttributes } from "react";
import RecipeCard from "./RecipeCard";

interface Props extends HtmlHTMLAttributes<HTMLDivElement> {
  header: {
    title: string;
    link: string;
  };
  cardData: DataRecipeCard[];
}

export default function Wrapper({
  cardData,
  header,
  className,
  ...props
}: Props) {
  return (
    <div className={clsx("px-1 py-4", className)} {...props}>
      <Col className="items-center gap-y-6">
        <Row className="w-full items-center justify-between">
          <Text
            weight={Text.Weight.Medium}
            type={Text.Type.SubtitleTwo}
            className="font-rancho text-green-500"
          >
            {header.title}
          </Text>
          <Link
            href={header.link}
            className="font-rancho text-base text-green-200"
          >
            ver todas
          </Link>
        </Row>

        {cardData.map((card, index) => (
          <RecipeCard key={index} data={card} />
        ))}
      </Col>
    </div>
  );
}
