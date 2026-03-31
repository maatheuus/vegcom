"use client";

import { getInitials } from "@/features/account/components/utils";
import { defaultCuriosities } from "@/features/curiosities/components/curiosites/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/Avatar";
import Col from "@/shared/ui/Layout/Helpers/Col";
import Row from "@/shared/ui/Layout/Helpers/Row";
import Text from "@/shared/ui/Text";
import {
  BookOpenIcon,
  ChefHatIcon,
  LightbulbFilamentIcon,
  MegaphoneIcon,
  PaperclipIcon,
  ScrollIcon,
  UsersFourIcon,
} from "@phosphor-icons/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { CommunityPostType } from "../../types";
import { Divider, SectionLabel } from "./SubComponents";

interface ActiveMember {
  id: number;
  name: string;
  avatarUrl?: string;
}

interface Curiosity {
  id: string | number;
  title: string;
  href: string;
}

interface CommunitySidebarProps {
  activeMembersData?: ActiveMember[];
  selectedTab: CommunityPostType;
  onTabChange: (tab: CommunityPostType) => void;
}

const NAV_LINKS = [
  { href: "/", label: "Comunidade", icon: UsersFourIcon },
  { href: "/recipes", label: "Receitas", icon: ChefHatIcon },
  { href: "/curiosities", label: "Curiosidades", icon: LightbulbFilamentIcon },
];

const FEED_TABS = [
  { key: "POST" as CommunityPostType, label: "Posts", icon: ScrollIcon },
  {
    key: "RESOURCE" as CommunityPostType,
    label: "Recursos",
    icon: PaperclipIcon,
  },
  {
    key: "ANNOUNCEMENT" as CommunityPostType,
    label: "Comunicados",
    icon: MegaphoneIcon,
  },
];

const curiositiesData = defaultCuriosities.slice(0, 4).map((c) => ({
  id: c.id,
  title: c.title,
  href: "/curiosities",
}));

export default function CommunitySidebar({
  activeMembersData = [],
  selectedTab,
  onTabChange,
}: CommunitySidebarProps) {
  const pathname = usePathname();

  return (
    <Col className="h-full gap-y-1 overflow-y-auto py-2 pr-1">
      <SectionLabel>Navegar</SectionLabel>

      {NAV_LINKS.map(({ href, label, icon: Icon }) => {
        const isActive = pathname === href;
        return (
          <Link key={href} href={href} className="contents">
            <Row
              className={`items-center gap-x-2.5 rounded-lg px-2 py-2 transition-colors duration-150 ${
                isActive
                  ? "bg-green-200/30 text-green-600"
                  : "text-green-500/70 hover:bg-green-100/60 hover:text-green-500"
              }`}
            >
              <Icon size={16} className="shrink-0" />
              <Text
                as="span"
                type={Text.Type.BodyFive}
                weight={Text.Weight.Medium}
                className="font-lora italic"
              >
                {label}
              </Text>
            </Row>
          </Link>
        );
      })}

      <Divider />

      <SectionLabel>Feed</SectionLabel>

      {FEED_TABS.map(({ key, label, icon: Icon }) => (
        <button
          key={key}
          onClick={() => onTabChange(key)}
          className={`flex w-full cursor-pointer items-center gap-x-2.5 rounded-lg px-2 py-2 transition-colors duration-150 ${
            selectedTab === key
              ? "bg-green-200/30 text-green-600"
              : "text-green-500/70 hover:bg-green-100/60 hover:text-green-500"
          }`}
        >
          <Icon size={16} className="shrink-0" />
          <Text
            as="span"
            type={Text.Type.BodyFive}
            weight={Text.Weight.Medium}
            className="font-lora italic"
          >
            {label}
          </Text>
        </button>
      ))}

      {curiositiesData.length > 0 && (
        <>
          <Divider />
          <SectionLabel>Curiosidades</SectionLabel>

          {curiositiesData.slice(0, 4).map((item) => (
            <Link key={item.id} href={item.href} className="contents">
              <Row className="items-start gap-x-2.5 rounded-lg px-2 py-2 text-green-500/70 transition-colors hover:bg-green-100/60 hover:text-green-500">
                <BookOpenIcon size={14} className="mt-0.5 shrink-0" />
                <Text
                  as="span"
                  type={Text.Type.BodyFive}
                  className="font-maitree line-clamp-2 leading-snug"
                >
                  {item.title}
                </Text>
              </Row>
            </Link>
          ))}

          <Link
            href="/curiosities"
            className="font-maitree px-2 text-xs text-green-500/40 transition-colors hover:text-green-500"
          >
            Ver todas →
          </Link>
        </>
      )}

      {activeMembersData.length > 0 && (
        <>
          <Divider />
          <SectionLabel>Ativos agora</SectionLabel>

          <Col className="gap-y-1 px-1">
            {activeMembersData.slice(0, 6).map((member) => (
              <Link
                key={member.id}
                href={`/user/${member.id}`}
                className="contents"
              >
                <Row className="items-center gap-x-2.5 rounded-lg px-1 py-1.5 transition-colors hover:bg-green-100/60">
                  <div className="relative">
                    <Avatar className="size-6">
                      <AvatarImage
                        src={member.avatarUrl ?? ""}
                        alt={member.name}
                      />
                      <AvatarFallback className="text-[9px]">
                        {member.name ? getInitials(member.name) : "U"}
                      </AvatarFallback>
                    </Avatar>
                    <span className="absolute right-0 bottom-0 size-1.5 rounded-full bg-green-400 ring-1 ring-green-50" />
                  </div>
                  <Text
                    as="span"
                    type={Text.Type.BodyFive}
                    className="font-maitree text-green-500/70"
                  >
                    {member.name}
                  </Text>
                </Row>
              </Link>
            ))}
          </Col>
        </>
      )}
    </Col>
  );
}
