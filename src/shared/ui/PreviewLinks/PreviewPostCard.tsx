"use client";

import { getInitials } from "@/features/account/components/utils";
import type { LinkPreviewData } from "@/shared/types";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/Avatar";
import Col from "@/shared/ui/Layout/Helpers/Col";
import Row from "@/shared/ui/Layout/Helpers/Row";
import Text from "@/shared/ui/Text";
import { ChatCircleTextIcon } from "@phosphor-icons/react";
import Link from "next/link";

export default function PreviewPostCard({
  p,
  onClick,
}: {
  p: Extract<LinkPreviewData, { type: "post" }>;
  onClick?: (e: React.MouseEvent) => void;
}) {
  return (
    <Link href={p.href} onClick={onClick} className="group block">
      <Col className="gap-y-2 overflow-hidden rounded-xl border border-green-200 bg-green-50/60 px-3 py-2.5 transition-colors duration-200 hover:border-green-300 hover:bg-green-100/40">
        <Row className="items-center gap-x-1.5">
          <span className="font-maitree rounded-full bg-green-100 px-2 py-0.5 text-[10px] font-semibold tracking-wide text-green-600 uppercase">
            Post
          </span>
          <Row className="ml-auto items-center gap-x-1.5">
            <Avatar className="size-4">
              <AvatarImage src={p.authorAvatar ?? ""} />
              <AvatarFallback className="!text-[10px]">
                {p.authorName ? getInitials(p.authorName) : "U"}
              </AvatarFallback>
            </Avatar>
            <Text
              as="span"
              type={Text.Type.BodyFive}
              className="font-maitree text-green-500/60"
            >
              {p.authorName}
            </Text>
          </Row>
        </Row>
        <Text
          as="p"
          type={Text.Type.BodyFive}
          weight={Text.Weight.SemiBold}
          className="font-lora line-clamp-1 text-green-500"
        >
          {p.title}
        </Text>
        {p.excerpt && (
          <Text
            as="p"
            type={Text.Type.BodyFive}
            className="font-maitree line-clamp-2 text-green-500/60"
          >
            {p.excerpt}
            {(p.excerpt?.length ?? 0) >= 120 ? "…" : ""}
          </Text>
        )}
        <Row className="items-center gap-x-1">
          <ChatCircleTextIcon size={11} className="text-green-500/50" />
          <Text
            as="span"
            type={Text.Type.BodyFive}
            className="font-maitree text-green-500/60"
          >
            {p.commentsCount}{" "}
            {p.commentsCount === 1 ? "comentário" : "comentários"}
          </Text>
        </Row>
      </Col>
    </Link>
  );
}
