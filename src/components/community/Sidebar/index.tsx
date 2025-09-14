"use client";

import {
  ChatCircleOutlinedIcon,
  ChefHatOutlinedIcon,
  CommunityOutlinedIcon,
  LogoOutlinedIcon,
  PlantOutlinedIcon,
  PlusOutlinedIcon,
  QuestionMarkOutlinedIcon,
  UserGearOutlinedIcon,
} from "@/components/icons";
import Col from "@/components/ui/Layout/Helpers/Col";
import Row from "@/components/ui/Layout/Helpers/Row";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/Tooltip";
import Link from "next/link";

const sidebarLinks = {
  headerLink: {
    label: "Vegom",
    href: "/",
  },
  topLinks: [
    { label: "Comunidade", href: "/community", icon: CommunityOutlinedIcon },
    { label: "Receitas", href: "/recipes", icon: ChefHatOutlinedIcon },
    {
      label: "Chat",
      href: "/curiosity?tab=chat",
      icon: ChatCircleOutlinedIcon,
    },
    {
      label: "Dúvidas",
      href: "/ask-your-questions",
      icon: QuestionMarkOutlinedIcon,
    },
    {
      label: "Nova receita",
      href: "/new-recipe",
      icon: PlusOutlinedIcon,
    },
  ],
  bottomLinks: [
    { label: "Upgrade", href: "/upgrade", icon: PlantOutlinedIcon },
    { label: "teste@teste.com", href: "/account", icon: UserGearOutlinedIcon },
  ],
};

export default function Sidebar() {
  return (
    <TooltipProvider delayDuration={300}>
      <div className="h-full w-16 overflow-hidden bg-green-50 absolute top-0 left-0 z-50">
        <Col className="group justify-between items-start h-full px-1.5">
          <div className="mt-6 relative w-full flex pb-3 justify-center after:bg-green-200 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:scale-x-100 after:content-['']">
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href={sidebarLinks.headerLink.href}
                  className=" text-2xl font-rancho"
                >
                  <LogoOutlinedIcon size={40} className="" />
                </Link>
              </TooltipTrigger>
              <TooltipContent
                side="right"
                align="center"
                className="bg-green-500 text-white text-base"
              >
                Vegcom
              </TooltipContent>
            </Tooltip>
          </div>

          <Col className="mt-9 h-full gap-y-6 items-start justify-start sidebar__icons">
            {sidebarLinks.topLinks.map(({ href, icon: Icon, label }) => (
              <Tooltip key={href}>
                <TooltipTrigger asChild>
                  <Row className="gap-x-3 w-full relative cursor-pointer text-green-200 p-2 hover:text-green-100 hover:bg-green-500 transition-all duration-300 rounded-[8px_8px_0_8px]">
                    <Link
                      href={href}
                      className="text-current text-2xl font-rancho"
                    >
                      <Icon size={32} />
                    </Link>
                  </Row>
                </TooltipTrigger>
                <TooltipContent
                  side="right"
                  align="center"
                  className="bg-green-500 text-white text-base"
                >
                  {label}
                </TooltipContent>
              </Tooltip>
            ))}
          </Col>

          <Col className="items-start h-fit gap-y-11 mb-6 sidebar__icons">
            {sidebarLinks.bottomLinks.map(({ href, icon: Icon, label }) => (
              <Tooltip key={href}>
                <TooltipTrigger asChild>
                  <Row className="gap-x-3 w-full cursor-pointer text-green-200 p-2 hover:text-green-100 hover:bg-green-500 transition-all duration-300 rounded-[8px_8px_0_8px]">
                    <Link
                      href={href}
                      className="text-current text-2xl font-rancho"
                    >
                      <Icon size={32} />
                    </Link>
                  </Row>
                </TooltipTrigger>
                <TooltipContent
                  side="right"
                  align="center"
                  className="bg-green-500 text-white text-base"
                >
                  {label}
                </TooltipContent>
              </Tooltip>
            ))}
          </Col>
        </Col>
      </div>
    </TooltipProvider>
  );
}
