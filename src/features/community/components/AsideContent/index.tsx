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
      className={`aside-cards z-50 mt-auto h-dvh max-h-[80%] w-full gap-y-3 overflow-x-hidden overflow-y-scroll rounded-t-lg border border-green-200 bg-green-50 p-4 ${className}`}
      data-lenis-prevent
    >
      <Wrapper cardData={mockTrendingData} header={trendingData} />
      <Wrapper cardData={mockExploreData} header={exploreData} />
    </Col>
  );
}
