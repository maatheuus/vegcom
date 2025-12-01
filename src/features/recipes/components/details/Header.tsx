"use client";

import Col from "@/shared/ui/Layout/Helpers/Col";
import Row from "@/shared/ui/Layout/Helpers/Row";
import Text from "@/shared/ui/Text";
import clsx from "clsx";
import { Fragment, memo, useState } from "react";

import {
  BookmarkIcon,
  CalendarDotsIcon,
  ScrollIcon,
  StarIcon,
  UserIcon,
} from "@phosphor-icons/react";
import SaveRecipeButton from "./SaveRecipeButton";
import ShareDropdown from "./ShareDropdown";

interface Props extends React.ComponentProps<"div"> {
  size?: "default" | "max" | "min";
  savedCount?: number;
  isSaved?: boolean;
  title?: string;
  authorName?: string;
  timeAgo?: string;
  commentsCount?: number;
  rating?: number;
  totalReviews?: number;
  isRecipePage?: boolean;
}

const Header = memo(function Header({
  className,
  savedCount,
  isSaved,
  title,
  authorName,
  timeAgo,
  commentsCount,
  rating,
  totalReviews = 5,
  isRecipePage,
  ...props
}: Props) {
  const [currentSavedCount, setCurrentSavedCount] = useState(savedCount || 0);

  const handleSavedChange = (saved: boolean) => {
    setCurrentSavedCount((prev) => (saved ? prev + 1 : prev - 1));
  };

  const ROW_DATA = [
    {
      label: authorName,
      icon: <UserIcon />,
      ariaLabel: `Autor: ${authorName}`,
    },
    {
      separator: true,
    },
    {
      label: timeAgo,
      icon: <CalendarDotsIcon />,
      ariaLabel: `Publicado ${timeAgo}`,
    },
    {
      separator: true,
    },
    {
      label: `${commentsCount} comentários`,
      icon: <ScrollIcon />,
      ariaLabel: `${commentsCount} comentários`,
    },
    {
      separator: true,
    },
    {
      label: `${currentSavedCount} salvos`,
      icon: <BookmarkIcon />,
      ariaLabel: `${currentSavedCount} pessoas salvaram esta receita`,
    },
    {
      separator: true,
    },
    {
      label: `${rating} (14 reviews)`,
      icon: <StarIcon />,
      ariaLabel: `Avaliação média: ${rating} de ${totalReviews}`,
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
            <ShareDropdown />
          </Row>
        )}
      </div>
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

export default Header;
