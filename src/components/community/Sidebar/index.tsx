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
import { usePathname } from "next/navigation";

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
      href: "/curiosity",
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
  const pathname = usePathname();

  return (
    <TooltipProvider delayDuration={300}>
      <div className="absolute top-0 left-0 z-50 h-full w-16 overflow-hidden bg-green-50">
        <Col className="group h-full items-start justify-between px-1.5">
          <div className="relative mt-6 flex w-full justify-center pb-3 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:scale-x-100 after:bg-green-200 after:content-['']">
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href={sidebarLinks.headerLink.href}
                  className="font-lora text-2xl italic"
                >
                  <LogoOutlinedIcon size={40} />
                </Link>
              </TooltipTrigger>
              <TooltipContent
                side="right"
                align="center"
                className="bg-green-500 text-base text-white"
              >
                Vegcom
              </TooltipContent>
            </Tooltip>
          </div>

          <Col className="mt-9 h-full items-start justify-start gap-y-6">
            {sidebarLinks.topLinks.map(({ href, icon: Icon, label }) => {
              const isActive = pathname.startsWith(href);

              return (
                <Tooltip key={href}>
                  <TooltipTrigger asChild>
                    <Row
                      className={`relative w-full cursor-pointer gap-x-3 p-2 transition-all duration-300 ${
                        isActive
                          ? "rounded-full bg-green-200 text-green-100"
                          : "rounded-[8px_8px_0_8px] text-green-200 hover:bg-green-500 hover:text-green-100"
                      }`}
                    >
                      <Link
                        href={
                          href === "/curiosity" ? "/curiosity?tab=chat" : href
                        }
                        className="font-lora text-2xl text-current italic"
                      >
                        <Icon size={32} />
                      </Link>
                    </Row>
                  </TooltipTrigger>
                  <TooltipContent
                    side="right"
                    align="center"
                    className="bg-green-500 text-base text-white"
                  >
                    {label}
                  </TooltipContent>
                </Tooltip>
              );
            })}
          </Col>

          <Col className="mb-6 h-fit items-start gap-y-11">
            {sidebarLinks.bottomLinks.map(({ href, icon: Icon, label }) => {
              const isActive = pathname.startsWith(href);
              return (
                <Tooltip key={href}>
                  <TooltipTrigger asChild>
                    <Row
                      className={`w-full cursor-pointer gap-x-3 p-2 transition-all duration-300 ${
                        isActive
                          ? "rounded-full bg-green-200 text-green-100"
                          : "rounded-[8px_8px_0_8px] text-green-200 hover:bg-green-500 hover:text-green-100"
                      }`}
                    >
                      <Link
                        href={href}
                        className="font-lora text-2xl text-current italic"
                      >
                        <Icon size={32} />
                      </Link>
                    </Row>
                  </TooltipTrigger>
                  <TooltipContent
                    side="right"
                    align="center"
                    className="bg-green-500 text-base text-white"
                  >
                    {label}
                  </TooltipContent>
                </Tooltip>
              );
            })}
          </Col>
        </Col>
      </div>
    </TooltipProvider>
  );
}
