import type { LinkPreviewData } from "@/shared/types";
import Col from "@/shared/ui/Layout/Helpers/Col";
import Row from "@/shared/ui/Layout/Helpers/Row";
import Text from "@/shared/ui/Text";
import { ClockIcon, StarIcon } from "@phosphor-icons/react";
import Image from "next/image";
import Link from "next/link";

export default function PreviewRecipeCard({
  p,
  onClick,
}: {
  p: Extract<LinkPreviewData, { type: "recipe" }>;
  onClick?: (e: React.MouseEvent) => void;
}) {
  return (
    <Link href={p.href} onClick={onClick} className="group block">
      <Row className="overflow-hidden rounded-xl border border-green-200 bg-green-50/60 transition-colors duration-200 hover:border-green-300 hover:bg-green-100/40">
        {p.image && (
          <div className="relative h-20 w-20 shrink-0 overflow-hidden sm:h-24 sm:w-24">
            <Image
              src={p.image}
              alt={p.title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
        )}
        <Col className="min-w-0 flex-1 justify-center gap-y-1 px-3 py-2.5">
          <Row className="items-center gap-x-1.5">
            <span className="font-maitree rounded-full bg-green-500/80 px-2 py-0.5 text-[10px] font-semibold tracking-wide text-green-50 uppercase">
              Receita
            </span>
          </Row>
          <Text
            as="p"
            type={Text.Type.BodyFive}
            weight={Text.Weight.SemiBold}
            className="font-lora line-clamp-1 text-green-500"
          >
            {p.title}
          </Text>
          {p.description && (
            <Text
              as="p"
              type={Text.Type.BodyFive}
              className="font-maitree line-clamp-1 text-green-500/60"
            >
              {p.description}
            </Text>
          )}
          <Row className="items-center gap-x-3">
            {p.rating != null && p.rating > 0 && (
              <Row className="items-center gap-x-0.5">
                <StarIcon size={11} weight="fill" className="text-green-500" />
                <Text
                  as="span"
                  type={Text.Type.BodyFive}
                  className="font-maitree text-green-500/70"
                >
                  {p.rating.toFixed(1)}
                </Text>
              </Row>
            )}
            {p.cookTime && (
              <Row className="items-center gap-x-0.5">
                <ClockIcon size={11} className="text-green-500/60" />
                <Text
                  as="span"
                  type={Text.Type.BodyFive}
                  className="font-maitree text-green-500/70"
                >
                  {p.cookTime}
                </Text>
              </Row>
            )}
          </Row>
        </Col>
      </Row>
    </Link>
  );
}
