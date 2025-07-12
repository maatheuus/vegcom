"use client";

import {
  ChefHatOutlinedIcon,
  CommunityOutlinedIcon,
  LightBulbOutlinedIcon,
  QuestionMarkOutlinedIcon,
} from "@/components/icons";
import Col from "@/components/ui/Layout/Helpers/Col";
import Row from "@/components/ui/Layout/Helpers/Row";
import Text from "@/components/ui/Text";
import { cn } from "@/lib/utils";
import Link from "next/link";

type Props = {
  path: string;
  text: string;
  icon: React.ElementType;
};

const pathLinksHome: Props[] = [
  { path: "/community", text: "Comunidade", icon: CommunityOutlinedIcon },
  { path: "/recipes", text: "Receitas", icon: ChefHatOutlinedIcon },
  { path: "/curiosities", text: "Curiosidades", icon: LightBulbOutlinedIcon },
  {
    path: "/questions",
    text: "Tire suas dúvidas",
    icon: QuestionMarkOutlinedIcon,
  },
];

export default function PathLinks({
  className,
  ...props
}: React.ComponentProps<"div">) {
  
  return (
    <Col
      className={cn("w-full max-w-[212px] overflow-hidden", className)}
      {...props}
    >
      {pathLinksHome.map((link, index) => (
        <Link
          href={link.path}
          key={link.path}
          className={`flex relative justify-between items-center w-full path-link-${index} relative flex overflow-hidden hover-link h-fit`}
        >
          <Row className="gap-x-2.5 py-3">
            <Text as="span" className="text-green-500 font-rancho !text-[16px]">
              (0{index + 1})
            </Text>
            <Text
              as="span"
              className="text-green-500 font-rancho !text-[24px]/[32px]"
            >
              {link.text}
            </Text>
          </Row>
          <link.icon className="text-green-500" size={24} />
          <div className="absolute bottom-0 left-0 h-0.5 bg-green-500 path-links" />
        </Link>
      ))}
    </Col>
  );
}