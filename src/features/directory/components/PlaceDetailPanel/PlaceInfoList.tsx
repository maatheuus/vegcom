import { InstagramLogoIcon } from "@phosphor-icons/react";
import {
  Clock,
  DollarSign,
  ExternalLink,
  Globe,
  MapPin,
  Phone,
} from "lucide-react";
import { PRICE_RANGE_LABELS } from "../../constants";
import type { PlaceDetails } from "../../types";
import { getInstagramProfile } from "../../utils/instagram";
import { CopyButton } from "./CopyButton";
import { InfoRow } from "./InfoRow";

const ICON_CLASS = "h-4 w-4";

function CopyableValue({ value, label }: { value: string; label: string }) {
  return (
    <span className="inline-flex max-w-full items-start gap-1.5">
      <span>{value}</span>
      <CopyButton value={value} label={label} />
    </span>
  );
}

export function PlaceInfoList({ details }: { details: PlaceDetails }) {
  const { address, schedule, phone, instagram, priceRange, website } = details;
  const instagramProfile = instagram ? getInstagramProfile(instagram) : null;

  return (
    <div className="flex flex-col gap-3">
      {address && (
        <InfoRow
          icon={<MapPin className={ICON_CLASS} aria-hidden />}
          label="Endereço"
          value={<CopyableValue value={address} label="endereço" />}
        />
      )}
      {schedule && (
        <InfoRow
          icon={<Clock className={ICON_CLASS} aria-hidden />}
          label="Horários"
          value={schedule}
        />
      )}
      {phone && (
        <InfoRow
          icon={<Phone className={ICON_CLASS} aria-hidden />}
          label="Telefone"
          value={<CopyableValue value={phone} label="telefone" />}
        />
      )}
      {instagramProfile && (
        <InfoRow
          icon={<InstagramLogoIcon className={ICON_CLASS} aria-hidden />}
          label="Instagram"
          value={
            <a
              href={instagramProfile.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-green-800 transition-colors hover:text-green-500"
            >
              {instagramProfile.label}
              <ExternalLink className="h-3.5 w-3.5" aria-hidden />
            </a>
          }
        />
      )}
      {priceRange && (
        <InfoRow
          icon={<DollarSign className={ICON_CLASS} aria-hidden />}
          label="Faixa de preço"
          value={`${"$".repeat(priceRange)} · ${PRICE_RANGE_LABELS[priceRange]}`}
        />
      )}
      {website && (
        <InfoRow
          icon={<Globe className={ICON_CLASS} aria-hidden />}
          label="Site"
          value={website}
        />
      )}
    </div>
  );
}
