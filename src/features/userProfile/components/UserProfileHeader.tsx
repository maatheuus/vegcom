import { getInitials } from "@/features/account/components/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/Avatar";
import Col from "@/shared/ui/Layout/Helpers/Col";
import Row from "@/shared/ui/Layout/Helpers/Row";
import Text from "@/shared/ui/Text";
import { MapPinIcon } from "@phosphor-icons/react/ssr";
import type { UserProfileDetails } from "../types";
import { UserCulinaryLevelBadge } from "./UserCulinaryLevelBadge";
import { UserPreferenceBadge } from "./UserPreferenceBadge";

interface UserProfileHeaderProps {
  user: UserProfileDetails;
}

export function UserProfileHeader({ user }: UserProfileHeaderProps) {
  const recipeCount = user?.recipes?.length ?? 0;
  const postCount = user?.posts?.length ?? 0;

  return (
    <div className="w-full rounded-xl border border-green-100 bg-green-100 p-6 md:p-8">
      <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
        <Row className="items-center gap-5">
          <div className="shrink-0 rounded-full p-[2px] ring-2 ring-green-100">
            <Avatar className="size-16 md:size-20">
              <AvatarImage
                src={user?.informations.avatarUrl}
                alt={user?.name}
                className="object-cover"
              />
              <AvatarFallback className="font-lora bg-green-50 text-xl font-bold text-green-600 capitalize md:text-2xl">
                {user?.name ? getInitials(user.name) : "U"}
              </AvatarFallback>
            </Avatar>
          </div>

          <Col className="gap-1.5">
            <Text
              as="h1"
              type={Text.Type.HeadingThree}
              weight={Text.Weight.Bold}
              className="font-lora leading-tight text-green-800"
            >
              {user?.name}
            </Text>

            {user?.informations.location && (
              <Row className="items-center gap-1 text-green-600">
                <MapPinIcon size={12} weight="fill" />
                <span className="font-maitree text-xs text-green-600 capitalize">
                  {user?.informations.location}
                </span>
              </Row>
            )}

            <Row className="mt-1 flex-wrap gap-1.5">
              {user?.informations.preference && (
                <UserPreferenceBadge
                  preference={user?.informations.preference}
                />
              )}
              {user?.informations.culinaryLevel && (
                <UserCulinaryLevelBadge
                  level={user?.informations.culinaryLevel}
                />
              )}
            </Row>
          </Col>
        </Row>

        <Row className="gap-4 md:shrink-0 md:flex-col md:items-end md:gap-3">
          <div className="flex items-baseline gap-1.5">
            <span className="font-lora text-xl font-bold text-green-600">
              {recipeCount}
            </span>
            <span className="font-maitree text-xs text-green-600">
              {recipeCount === 0
                ? "nenhuma receita"
                : recipeCount === 1
                  ? "receita"
                  : "receitas"}
            </span>
          </div>
          <div className="h-4 w-px bg-green-100 md:hidden" />
          <div className="flex items-baseline gap-1.5">
            <span className="font-lora text-xl font-bold text-green-600">
              {postCount}
            </span>
            <span className="font-maitree text-xs text-green-600">
              {postCount === 0
                ? "nenhum post"
                : postCount === 1
                  ? "post"
                  : "posts"}
            </span>
          </div>
        </Row>
      </div>

      {user?.informations.aboutInfo && (
        <>
          <div className="my-5 h-px bg-green-50" />
          <p className="font-maitree text-sm leading-relaxed text-gray-500">
            {user?.informations.aboutInfo}
          </p>
        </>
      )}
    </div>
  );
}
