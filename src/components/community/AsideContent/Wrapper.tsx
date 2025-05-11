import type { DataRecipeCard } from "@/components/@types";
import Col from "@/components/ui/Layout/Helpers/Col";
import Row from "@/components/ui/Layout/Helpers/Row";
import Text from "@/components/ui/Text";
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
    <div className={clsx("py-4 px-1", className)} {...props}>
      <Col className="gap-y-6 items-center">
        <Row className="justify-between items-center w-full">
          <Text
            weight={Text.Weight.Medium}
            type={Text.Type.SubtitleTwo}
            className="text-green-500 font-rancho"
          >
            {header.title}
          </Text>
          <Link
            href={header.link}
            className="text-green-200 font-rancho text-base"
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
