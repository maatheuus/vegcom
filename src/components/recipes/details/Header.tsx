import {
  CalendarOutlinedIcon,
  HeartOutlinedIcon,
  ScrollOutlinedIcon,
  StarOutlinedIcon,
  UserOutlinedIcon,
} from "@/components/icons";
import Col from "@/components/ui/Layout/Helpers/Col";
import Row from "@/components/ui/Layout/Helpers/Row";
import Text from "@/components/ui/Text";
import clsx from "clsx";
import { memo } from "react";

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
  const FIRST_ROW_DATA = [
    {
      label: authorName,
      icon: <UserOutlinedIcon />,
      ariaLabel: `Autor: ${authorName}`,
    },
    {
      label: timeAgo,
      icon: <CalendarOutlinedIcon />,
      ariaLabel: `Publicado ${timeAgo}`,
    },
    {
      label: `${commentsCount} comentários`,
      icon: <ScrollOutlinedIcon />,
      ariaLabel: `${commentsCount} comentários`,
    },
    {
      label: `${savedCount} salvos`,
      icon: <HeartOutlinedIcon />,
      ariaLabel: `${savedCount} pessoas salvaram esta receita`,
    },
    {
      label: `${rating}/${totalReviews} reviews`,
      icon: <StarOutlinedIcon />,
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
      <div className="w-full">
        <Text
          as="h1"
          type={Text.Type.HeadingTwo}
          weight={Text.Weight.Medium}
          className="font-lora font-semibold text-green-500"
        >
          {title}
        </Text>
      </div>
      {isRecipePage && (
        <Row className="w-full justify-between">
          <Row
            className="gap-x-3"
            role="list"
            aria-label="Informações da receita"
          >
            {FIRST_ROW_DATA.map((item, index) => {
              const Icon = item.icon.type;
              return (
                <Row
                  key={index}
                  className="gap-x-2"
                  role="listitem"
                  aria-label={item.ariaLabel}
                >
                  <Icon
                    className="text-green-500"
                    size={18}
                    aria-hidden="true"
                  />
                  <Text
                    as="span"
                    type={Text.Type.BodyFive}
                    weight={Text.Weight.Medium}
                    className="text-green-500"
                  >
                    {item.label}
                  </Text>
                </Row>
              );
            })}
          </Row>
          <Row className="gap-x-3" role="group" aria-label="Ações da receita">
            <SaveRecipeButton initialSaved={isSaved!} />
            <ShareDropdown />
          </Row>
        </Row>
      )}
    </Col>
  );
});

export default Header;
