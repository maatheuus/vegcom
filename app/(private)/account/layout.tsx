import PremiumMemberCard from "@/components/account/PremiumMemberCard";
import {
  defaultInfoItems,
  messagesToDisplayForPremium,
} from "@/components/account/utils";
import Header from "@/components/recipes/details/Header";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/Avatar";
import Layout from "@/components/ui/Layout";
import Col from "@/components/ui/Layout/Helpers/Col";
import Row from "@/components/ui/Layout/Helpers/Row";
import Text from "@/components/ui/Text";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/Tooltip";
import Link from "next/link";

const isPremium = false;

export default function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const randomMessage =
    messagesToDisplayForPremium[
      Math.floor(Math.random() * messagesToDisplayForPremium.length)
    ];

  return (
    <Layout.Default className="overflow-y-auto style-scrollbar">
      <div className="px-4 py-8 space-y-8 relative">
        <Link href="/account" className="block">
          <Header title="Mina Conta" />
        </Link>
        <Row className="justify-between w-full relative">
          <Row className="gap-x-4">
            <Avatar className="size-28">
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <Col className="items-start justify-center gap-y-1">
              <Text
                className="text-green-500"
                weight={Text.Weight.Bold}
                type={Text.Type.HeadingFour}
              >
                Julio do Grau
              </Text>
              <Text type={Text.Type.BodyThree} className="text-green-500">
                julio@julito.com
              </Text>

              {isPremium && (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger className="cursor-pointer">
                      <Text
                        type={Text.Type.BodyThree}
                        className="text-green-500"
                      >
                        Premium Member
                      </Text>
                    </TooltipTrigger>

                    <TooltipContent className="flex mr-4 mb-4 items-start">
                      <Text
                        type={Text.Type.BodyThree}
                        className="text-green-50"
                      >
                        {randomMessage.text}
                      </Text>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              )}
            </Col>
          </Row>

          {!isPremium && <PremiumMemberCard />}
        </Row>

        <Col className="gap-y-6">
          <Text
            as="h2"
            type={Text.Type.HeadingThree}
            weight={Text.Weight.Bold}
            className="text-green-500"
          >
            Configurações
          </Text>

          <Col className="gap-y-4">
            {defaultInfoItems.map((item) => (
              <Row key={item.title} className="w-full justify-between">
                <div>
                  <Text
                    type={Text.Type.BodyTwo}
                    weight={Text.Weight.Medium}
                    className="text-green-500"
                  >
                    {item.title}
                  </Text>
                  <Text type={Text.Type.BodyThree} className="text-green-200">
                    {item.desc}
                  </Text>
                </div>
                <Link
                  href={item.link}
                  className="text-green-500 h-fit font-bold relative bg-green-100 rounded-full px-2 py-1 hover:bg-green-500 hover:text-green-100 transition-colors duration-300"
                >
                  Gerenciar
                </Link>
              </Row>
            ))}
          </Col>
        </Col>

        <div className="w-full h-fit">{children}</div>
      </div>
    </Layout.Default>
  );
}
