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
import gsap from "gsap";
import Link from "next/link";

type Props = {
  path: string;
  text: string;
  icon: React.ElementType;
};

const pathLinksHome: Props[] = [
  { path: "/community", text: "Comunidade", icon: CommunityOutlinedIcon },
  { path: "/receipts", text: "Receitas", icon: ChefHatOutlinedIcon },
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
  const handleMouseEnter = (index: number) => {
    gsap.fromTo(
      `.path-link-${index} .path-links`,
      {
        duration: 0.8,
        width: "0%",
        opacity: 0,
        ease: "power2.inOut",
      },
      {
        duration: 0.8,
        width: "100%",
        opacity: 1,
        ease: "power2.inOut",
      }
    );
  };

  const handleMouseLeave = (index: number) => {
    gsap.fromTo(
      `.path-link-${index} .path-links`,
      {
        duration: 0.8,
        x: 0,
        width: "100%",
        ease: "power2.inOut",
      },
      {
        duration: 0.5,
        x: "100%",
        width: "100%",
        ease: "power2.inOut",
        onComplete: () => {
          gsap.to(`.path-link-${index} .path-links`, {
            duration: 0.001,
            x: 0,
            width: 0,
            opacity: 0,
          });
        },
      }
    );
  };

  return (
    <Col
      className={cn("w-full max-w-[212px] overflow-hidden", className)}
      {...props}
    >
      {pathLinksHome.map((link, index) => (
        <Link
          href={link.path}
          key={link.path}
          className={`flex relative justify-between items-center w-full path-link-${index}`}
          onMouseEnter={() => handleMouseEnter(index)}
          onMouseLeave={() => handleMouseLeave(index)}
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
