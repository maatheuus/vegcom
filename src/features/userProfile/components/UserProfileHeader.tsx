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
  return (
    <Col className="group relative w-full overflow-hidden rounded-3xl border border-green-100/60 bg-white shadow-[0_8px_32px_rgba(0,0,0,0.06)] transition-all duration-500 hover:shadow-[0_24px_60px_rgba(34,197,94,0.12)]">
      {/* ── Cover ─────────────────────────────────────── */}
      <div className="relative h-40 w-full overflow-hidden bg-gradient-to-br from-green-700 via-emerald-500 to-teal-400 md:h-52">
        {/* Decorative light orbs */}
        <div className="absolute -top-10 -right-10 size-52 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute -bottom-14 -left-10 size-60 rounded-full bg-emerald-200/20 blur-3xl" />
        {/* Dot grid */}
        <div className="absolute inset-0 [background-image:radial-gradient(rgba(255,255,255,0.7)_0.5px,transparent_0.5px)] [background-size:18px_18px] opacity-20" />
        {/* Bottom vignette */}
        <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/15 to-transparent" />
      </div>

      {/* ── Body ──────────────────────────────────────── */}
      <div className="relative px-6 pb-8 md:px-10">
        {/* Avatar + name row */}
        <div className="flex flex-col items-center md:flex-row md:items-end md:gap-5">
          {/* Avatar — lifted over the cover */}
          <div className="-mt-14 shrink-0 md:-mt-16">
            <div className="relative rounded-full p-[3px] ring-4 shadow-xl ring-white transition-transform duration-500 group-hover:scale-[1.04]">
              {/* Glow ring */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-green-400 to-emerald-600 opacity-70 blur-[6px]" />
              <div className="relative rounded-full border-[3px] border-white">
                <Avatar className="size-20 md:size-28">
                  <AvatarImage
                    src={user.informations.avatarUrl}
                    alt={user.name}
                    className="object-cover"
                  />
                  <AvatarFallback className="bg-gradient-to-br from-green-100 to-emerald-100 text-3xl font-bold text-green-700 capitalize md:text-4xl">
                    {user.name?.slice(0, 2)}
                  </AvatarFallback>
                </Avatar>
              </div>
            </div>
          </div>

          {/* Name + badges */}
          <div className="mt-4 flex flex-1 flex-col items-center gap-2.5 pb-1 text-center md:mt-0 md:items-start md:text-left">
            <Text
              as="h1"
              type={Text.Type.HeadingOne}
              weight={Text.Weight.Bold}
              className="font-maitree leading-tight text-green-800 md:text-4xl"
            >
              {user.name}
            </Text>

            <Row className="flex-wrap justify-center gap-2 md:justify-start">
              {user.informations.preference && (
                <UserPreferenceBadge
                  preference={user.informations.preference}
                />
              )}
              {user.informations.culinaryLevel && (
                <UserCulinaryLevelBadge
                  level={user.informations.culinaryLevel}
                />
              )}
            </Row>
          </div>
        </div>

        {/* Subtle divider */}
        <div className="my-5 h-px bg-gradient-to-r from-transparent via-green-100 to-transparent" />

        {/* Location + bio */}
        <Col className="items-center gap-3 text-center md:items-start md:text-left">
          {user.informations.location && (
            <Row className="items-center gap-1.5 text-green-500/80">
              <MapPinIcon size={14} weight="fill" />
              <Text
                type={Text.Type.BodyFour}
                weight={Text.Weight.Medium}
                className="font-maitree text-inherit capitalize"
              >
                {user.informations.location}
              </Text>
            </Row>
          )}

          {user.informations.aboutInfo && (
            <p className="font-lora relative max-w-2xl text-sm leading-relaxed text-green-500/70 italic md:text-base">
              <span className="mr-0.5 font-serif text-2xl leading-none text-green-200/80 not-italic">
                "
              </span>
              {user.informations.aboutInfo}
              <span className="ml-0.5 font-serif text-2xl leading-none text-green-200/80 not-italic">
                "
              </span>
            </p>
          )}
        </Col>
      </div>
    </Col>
  );
}
