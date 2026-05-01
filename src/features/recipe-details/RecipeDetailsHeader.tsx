"use client";

import {
  ReviewStatus,
  type DetailedRecipe,
} from "@/features/recipes/api/types";
import Col from "@/shared/ui/Layout/Helpers/Col";
import Row from "@/shared/ui/Layout/Helpers/Row";
import Text from "@/shared/ui/Text";
import clsx from "clsx";
import { memo } from "react";

import {
  ArrowRightIcon,
  ClockCountdownIcon,
  PencilSimpleIcon,
  XCircleIcon,
} from "@phosphor-icons/react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useGetUser } from "../auth/api/queries/getAuthApiClient";
import DeleteRecipeButton from "./DeleteRecipeButton";
import RowHeaderData from "./RowHeaderData";
import SaveRecipeButton from "./SaveRecipeButton";
import ShareDropdown from "./ShareDropdown";

interface Props extends React.ComponentProps<"div"> {
  size?: "default" | "max" | "min";
  isRecipePage?: boolean;
  recipe?: DetailedRecipe;
  title?: string;
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
  recipe,
  title,
  isRecipePage,
  ...props
}: Props) {
  const { data: userData } = useGetUser();

  const {
    reviewStatus,
    slug: recipeSlug,
    id: recipeId,
    userId: recipeUserId,
    title: recipeTitle,
  } = recipe || {};
  const isOwner = !!userData && !!recipeUserId && userData.id === recipeUserId;

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
          {title || recipe?.title}
        </Text>

        {isRecipePage && (
          <Row
            className="justify-end gap-x-3"
            role="group"
            aria-label="Ações da receita"
          >
            {isOwner && (
              <DeleteRecipeButton
                recipeId={recipeId!}
                recipeTitle={recipeTitle}
              />
            )}
            <SaveRecipeButton user={userData} recipeId={recipeId!} />
            <ShareDropdown title={String(title)} recipeSlug={recipeSlug} />
          </Row>
        )}
      </div>

      {isOwner && isRecipePage && (
        <motion.div initial="rest" whileHover="hover" animate="rest">
          <Link
            href={`/edit-recipe/${recipeSlug}`}
            className="relative flex w-full items-center justify-between overflow-hidden rounded-2xl border border-green-200 bg-gradient-to-r from-green-50 to-green-100/40 px-5 py-3"
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-green-100 to-green-200/40"
              variants={{ rest: { opacity: 0 }, hover: { opacity: 1 } }}
              transition={{ duration: 0.25 }}
            />

            <div className="relative flex items-center gap-3">
              <motion.div
                className="flex h-8 w-8 items-center justify-center rounded-full bg-green-200/50"
                variants={{ rest: { rotate: 0 }, hover: { rotate: -12 } }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
              >
                <PencilSimpleIcon size={14} weight="bold" className="text-green-600" />
              </motion.div>
              <div>
                <p className="font-lora text-[10px] uppercase tracking-widest text-green-500/70">
                  Você é o autor
                </p>
                <p className="font-lora text-sm font-semibold text-green-800">
                  Editar receita
                </p>
              </div>
            </div>

            <motion.div
              className="relative flex items-center gap-1.5 text-xs font-medium text-green-600"
              variants={{ rest: { x: 0, opacity: 0.6 }, hover: { x: 4, opacity: 1 } }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
            >
              <span className="hidden sm:inline">Fazer alterações</span>
              <ArrowRightIcon size={13} weight="bold" />
            </motion.div>
          </Link>
        </motion.div>
      )}

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
          <RowHeaderData recipe={recipe} />
        </Row>
      )}
    </Col>
  );
});

export default RecipeDetailsHeader;
