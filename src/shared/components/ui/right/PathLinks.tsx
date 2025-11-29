import { cn } from "@/shared/lib/utils";
import Col from "@/shared/ui/Layout/Helpers/Col";
import Row from "@/shared/ui/Layout/Helpers/Row";
import Text from "@/shared/ui/Text";
import {
  ChefHatIcon,
  LightbulbFilamentIcon,
  UsersFourIcon,
} from "@phosphor-icons/react";
import Link from "next/link";

type Props = {
  path: string;
  text: string;
  icon: React.ElementType;
};

const pathLinksHome: Props[] = [
  { path: "/community", text: "Comunidade", icon: UsersFourIcon },
  { path: "/recipes", text: "Receitas", icon: ChefHatIcon },
  { path: "/curiosities", text: "Curiosidades", icon: LightbulbFilamentIcon },
];

export default function PathLinks({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <Col
      className={cn("w-full overflow-hidden lg:max-w-[212px]", className)}
      {...props}
    >
      {pathLinksHome.map((link, index) => (
        <Link
          href={link.path}
          key={link.path}
          className={`relative flex w-full items-center justify-between path-link-${index} hover-link relative flex h-fit overflow-hidden`}
        >
          <Row className="gap-x-2.5 py-3">
            <Text
              as="span"
              className="font-lora !text-[12px] font-medium text-green-500 italic"
            >
              (0{index + 1})
            </Text>
            <Text
              as="span"
              className="font-lora !text-[18px] font-medium text-green-500 italic"
            >
              {link.text}
            </Text>
          </Row>
          <link.icon className="text-green-500" size={24} />
          <div className="path-links absolute bottom-0 left-0 h-0.5 bg-green-500" />
        </Link>
      ))}
    </Col>
  );
}
