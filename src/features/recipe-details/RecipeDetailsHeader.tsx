"use client";

import { ReviewStatus } from "@/features/recipes/api/types";
import Col from "@/shared/ui/Layout/Helpers/Col";
import Row from "@/shared/ui/Layout/Helpers/Row";
import Text from "@/shared/ui/Text";
import clsx from "clsx";
import { Fragment, memo } from "react";

import {
  CalendarDotsIcon,
  ClockCountdownIcon,
  EyeIcon,
  ScrollIcon,
  StarIcon,
  UserIcon,
  XCircleIcon,
} from "@phosphor-icons/react";
import SaveRecipeButton from "./SaveRecipeButton";
import ShareDropdown from "./ShareDropdown";

interface Props extends React.ComponentProps<"div"> {
  size?: "default" | "max" | "min";
  views?: number;
  isSaved?: boolean;
  title?: string;
  authorName?: string;
  timeAgo?: string;
  commentsCount?: number;
  rating?: number;
  reviewStatus?: ReviewStatus;
  isRecipePage?: boolean;
  recipeSlug?: string;
}

const REVIEW_STATUS_CONFIG = {
  [ReviewStatus.IN_REVIEW]: {
    label: "Em Análise",
    tooltip:
      "Sua receita foi enviada e está aguardando aprovação da nossa equipe. Ela será visível para todos após aprovação.",
    bgColor: "bg-amber-50",
    textColor: "text-amber-700",
    borderColor: "border-amber-200",
    Icon: ClockCountdownIcon,
  },
  [ReviewStatus.REJECTED]: {
    label: "Rejeitada",
    tooltip:
      "Sua receita foi analisada e não atendeu aos critérios da plataforma. Edite e reenvie para uma nova análise.",
    bgColor: "bg-red-50",
    textColor: "text-red-600",
    borderColor: "border-red-200",
    Icon: XCircleIcon,
  },
};

const RecipeDetailsHeader = memo(function RecipeDetailsHeader({
  className,
  views,
  isSaved,
  title,
  authorName,
  timeAgo,
  commentsCount,
  rating,
  reviewStatus,
  isRecipePage,
  recipeSlug,
  ...props
}: Props) {
  function handleSavedChange() {}

  const ROW_DATA = [
    {
      key: "author",
      label: authorName,
      icon: <UserIcon />,
      ariaLabel: `Autor: ${authorName}`,
    },
    {
      separator: true,
    },
    {
      key: "timeAgo",
      label: timeAgo,
      icon: <CalendarDotsIcon />,
      ariaLabel: `Publicado ${timeAgo}`,
    },
    {
      separator: true,
    },
    {
      key: "commentsCount",
      label: `${commentsCount} ${commentsCount === 1 ? "comentário" : "comentários"}`,
      icon: <ScrollIcon />,
      ariaLabel: `${commentsCount} ${commentsCount === 1 ? "comentário" : "comentários"}`,
    },
    {
      separator: true,
    },
    {
      key: "views",
      label: `${views} ${views === 1 ? "visto" : "vistos"}`,
      icon: <EyeIcon />,
      ariaLabel: `${views} ${views === 1 ? "pessoa" : "pessoas"} visualizaram esta receita`,
    },
    {
      separator: true,
    },
    {
      key: "rating",
      label: `${rating?.toFixed(1)}`,
      icon: <StarIcon />,
      ariaLabel: `Avaliação média: ${rating}`,
    },
  ];

  return (
    <Col
      className={clsx("gap-y-2 border-b border-green-100 pb-4", className)}
      role="article"
      aria-label="Detalhes da receita"
      {...props}
    >
      <div className="inline-flex w-full items-baseline justify-between">
        <Text
          as="h1"
          type={Text.Type.HeadingThree}
          weight={Text.Weight.Medium}
          className="font-lora font-semibold text-green-500"
        >
          {title}
        </Text>

        {isRecipePage && (
          <Row
            className="justify-end gap-x-3"
            role="group"
            aria-label="Ações da receita"
          >
            <SaveRecipeButton
              initialSaved={isSaved!}
              onSavedChange={handleSavedChange}
            />
            <ShareDropdown title={String(title)} recipeSlug={recipeSlug} />
          </Row>
        )}
      </div>

      {reviewStatus && reviewStatus !== ReviewStatus.PUBLISHED && (
        <div
          tabIndex={0}
          className="group relative inline-flex w-fit cursor-help items-center outline-none"
        >
          {(() => {
            const config = REVIEW_STATUS_CONFIG[reviewStatus];
            if (!config) return null;
            const { Icon } = config;
            return (
              <>
                <div
                  className={clsx(
                    "flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium transition-all",
                    config.bgColor,
                    config.textColor,
                    config.borderColor,
                  )}
                >
                  <Icon size={14} weight="fill" />
                  {config.label}
                </div>
                <div
                  className="pointer-events-none absolute top-full left-0 z-50 mt-2 w-72 rounded-lg border border-gray-200 bg-white px-4 py-3 text-xs leading-relaxed text-gray-600 opacity-0 shadow-lg transition-opacity duration-200 group-hover:pointer-events-auto group-hover:opacity-100 group-focus:pointer-events-auto group-focus:opacity-100 group-active:pointer-events-auto group-active:opacity-100"
                  role="tooltip"
                >
                  {config.tooltip}
                </div>
              </>
            );
          })()}
        </div>
      )}
      {isRecipePage && (
        <Row
          className="flex-wrap items-center justify-start gap-2"
          role="list"
          aria-label="Informações da receita"
        >
          {ROW_DATA.map((item, idx) => {
            const Icon = !item.separator && item?.icon?.type;
            return (
              <Fragment key={idx}>
                {item.separator ? (
                  <div className="hidden size-1 rounded-full bg-green-500 opacity-50 md:block" />
                ) : (
                  <Row
                    className="gap-x-2"
                    role="listitem"
                    aria-label={item.ariaLabel}
                  >
                    {Icon && (
                      <Icon
                        className="text-green-500"
                        size={18}
                        aria-hidden="true"
                      />
                    )}
                    <Text
                      as="span"
                      type={Text.Type.BodyFive}
                      weight={Text.Weight.Medium}
                      className="text-green-500"
                    >
                      {item.label}
                    </Text>
                  </Row>
                )}
              </Fragment>
            );
          })}
        </Row>
      )}
    </Col>
  );
});

export default RecipeDetailsHeader;
