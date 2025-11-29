import Col from "@/shared/ui/Layout/Helpers/Col";
import type { HtmlHTMLAttributes } from "react";
import { mockExploreData, mockTrendingData } from "../mockData";
import Wrapper from "./Wrapper";

interface Props extends HtmlHTMLAttributes<HTMLDivElement> {
  className?: string;
}

export default function AsideCards({ className, ...props }: Props) {
  const trendingData = {
    title: "Trending Recipes",
    link: "/trending-recipes",
  };

  const exploreData = {
    title: "Explore Recipes",
    link: "/explore-recipes",
  };

  return (
    <Col
      {...props}
      className={`aside-cards gap-y-3 h-dvh max-h-[80%] mt-auto w-full overflow-y-scroll overflow-x-hidden rounded-t-lg bg-green-50 border border-green-200 z-50 p-4 ${className}`}
    >
      <Wrapper cardData={mockTrendingData} header={trendingData} />
      <Wrapper cardData={mockExploreData} header={exploreData} />
    </Col>
  );
}
