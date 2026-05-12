import { getInitials } from "@/features/account/components/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/Avatar";
import Col from "@/shared/ui/Layout/Helpers/Col";
import Row from "@/shared/ui/Layout/Helpers/Row";
import Text from "@/shared/ui/Text";
import {
  BookmarkSimpleIcon,
  CalendarDotsIcon,
  CheckCircleIcon,
  MapPinIcon,
} from "@phosphor-icons/react/ssr";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import type { UserProfileDetails } from "../types";
import { UserCulinaryLevelBadge } from "./UserCulinaryLevelBadge";
import { UserPreferenceBadge } from "./UserPreferenceBadge";

interface UserProfileHeaderProps {
  user: UserProfileDetails;
}

export function UserProfileHeader({ user }: UserProfileHeaderProps) {
  const recipeCount = user?.recipes?.length ?? 0;
  const postCount = user?.posts?.length ?? 0;
  const savedCount = user?.savedRecipes?.length ?? 0;
  const publishedCount = user?.recipes?.length ?? 0;

  const joinedDate = user?.createdAt
    ? format(new Date(user.createdAt), "MMMM 'de' yyyy", { locale: ptBR })
    : null;

  const joinedShort = user?.createdAt
    ? format(new Date(user.createdAt), "MMM. yyyy", { locale: ptBR })
    : null;

  return (
    <Col className="gap-y-4">
      {/* Card principal */}
      <div className="relative w-full overflow-hidden rounded-xl border border-green-100 bg-green-100 p-6 md:p-8">
        {/* bola decorativa */}
        <div className="pointer-events-none absolute -right-16 -bottom-16 size-56 rounded-full bg-green-200/5" />

        <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
          <Row className="items-center gap-5">
            <div className="shrink-0 rounded-full bg-green-50 p-1 ring-2 ring-green-200">
              <Avatar className="size-20 md:size-24">
                <AvatarImage
                  src={user?.informations?.avatarUrl}
                  alt={user?.name}
                  className="object-cover"
                />
                <AvatarFallback className="font-lora bg-green-50 text-3xl font-bold text-green-700 capitalize md:text-4xl">
                  {user?.name ? getInitials(user.name) : "U"}
                </AvatarFallback>
              </Avatar>
            </div>

            <Col className="gap-2">
              <Text
                as="h1"
                type={Text.Type.HeadingThree}
                weight={Text.Weight.Bold}
                className="font-lora leading-tight text-green-900"
              >
                {user?.name}
              </Text>

              <Row className="flex-wrap items-center gap-x-2 gap-y-1">
                {user?.informations?.location && (
                  <Row className="items-center gap-1 text-green-600">
                    <MapPinIcon size={12} weight="fill" />
                    <span className="font-maitree text-xs text-green-800 capitalize">
                      {user.informations.location}
                    </span>
                  </Row>
                )}
                {user?.informations?.location && joinedDate && (
                  <span className="text-xs text-green-500 opacity-50">•</span>
                )}
                {joinedDate && (
                  <span className="font-maitree text-xs text-green-800">
                    Membro desde {joinedDate}
                  </span>
                )}
              </Row>

              <Row className="mt-0.5 flex-wrap gap-1.5">
                {user?.informations?.preference && (
                  <UserPreferenceBadge
                    preference={user.informations.preference}
                  />
                )}
                {user?.informations?.culinaryLevel && (
                  <UserCulinaryLevelBadge
                    level={user.informations.culinaryLevel}
                  />
                )}
              </Row>

              {user?.informations?.aboutInfo && (
                <p className="font-maitree mt-1 max-w-md text-sm leading-relaxed text-gray-500">
                  {user.informations.aboutInfo}
                </p>
              )}
            </Col>
          </Row>

          <Col className="gap-2 md:shrink-0 md:items-end">
            <div className="flex items-baseline gap-1.5">
              <span className="font-lora text-2xl font-bold text-green-900">
                {recipeCount}
              </span>
              <span className="font-maitree text-sm text-green-800">
                {recipeCount === 1 ? "receita" : "receitas"}
              </span>
            </div>
            <div className="flex items-baseline gap-1.5">
              <span className="font-lora text-2xl font-bold text-green-900">
                {postCount}
              </span>
              <span className="font-maitree text-sm text-green-800">
                {postCount === 1 ? "post" : "posts"}
              </span>
            </div>
          </Col>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        <StatCard
          icon={<CalendarDotsIcon size={18} weight="regular" />}
          label="Entrou em"
          value={joinedShort ?? "—"}
        />
        <StatCard
          icon={<BookmarkSimpleIcon size={18} weight="regular" />}
          label="Receitas salvas"
          value={String(savedCount)}
        />
        <StatCard
          icon={<CheckCircleIcon size={18} weight="regular" />}
          label="Receitas publicadas"
          value={String(publishedCount)}
        />
      </div>
    </Col>
  );
}

function StatCard({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <Row className="items-center gap-3 rounded-xl border border-green-200/20 bg-green-50 px-4 py-3.5">
      <div className="flex size-9 shrink-0 items-center justify-center rounded-lg border border-green-200/20 text-green-600">
        {icon}
      </div>
      <Col className="gap-0.5">
        <span className="font-maitree text-xs text-green-500/70">{label}</span>
        <span className="font-lora text-base font-bold text-green-800">
          {value}
        </span>
      </Col>
    </Row>
  );
}
