import { type DetailedRecipe } from "@/features/recipes/api/types";
import Row from "@/shared/ui/Layout/Helpers/Row";
import Text from "@/shared/ui/Text";
import { Fragment } from "react";

import {
  CalendarDotsIcon,
  EyeIcon,
  ScrollIcon,
  StarIcon,
  UserIcon,
} from "@phosphor-icons/react";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";

export default function RowHeaderData({ recipe }: { recipe?: DetailedRecipe }) {
  if (!recipe) return null;

  const {
    views,
    user: { name: authorName },
    averageRating: rating,
    totalComments: commentsCount,
  } = recipe;

  const timeAgo = formatDistanceToNow(new Date(recipe?.createdAt), {
    addSuffix: true,
    locale: ptBR,
  });

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
  return ROW_DATA.map((item, idx) => {
    const Icon = !item.separator && item?.icon?.type;
    return (
      <Fragment key={idx}>
        {item.separator ? (
          <div className="hidden size-1 rounded-full bg-green-500 opacity-50 md:block" />
        ) : (
          <Row className="gap-x-2" role="listitem" aria-label={item.ariaLabel}>
            {Icon && (
              <Icon className="text-green-500" size={18} aria-hidden="true" />
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
  });
}
