import L from "leaflet";
import type { DirectoryEventStatus, Place, PlaceCategory } from "../types";

interface CategoryStyle {
  color: string;
  bg: string;
  /** Conteúdo interno do SVG (paths lucide, viewBox 24x24) */
  icon: string;
}

// Paths extraídos dos ícones lucide usados nos chips de categoria
// (UtensilsCrossed, ShoppingBag, Croissant, Coffee, Store, MapPin)
const LUCIDE_PATHS: Record<PlaceCategory, string> = {
  restaurant: `
    <path d="m16 2-2.3 2.3a3 3 0 0 0 0 4.2l1.8 1.8a3 3 0 0 0 4.2 0L22 8"/>
    <path d="M15 15 3.3 3.3a4.2 4.2 0 0 0 0 6l7.3 7.3c.7.7 2 .7 2.8 0L15 15Zm0 0 7 7"/>
    <path d="m2.1 21.8 6.4-6.3"/>
    <path d="m19 5-7 7"/>`,
  market: `
    <path d="M16 10a4 4 0 0 1-8 0"/>
    <path d="M3.103 6.034h17.794"/>
    <path d="M3.4 5.467a2 2 0 0 0-.4 1.2V20a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6.667a2 2 0 0 0-.4-1.2l-2-2.667A2 2 0 0 0 17 2H7a2 2 0 0 0-1.6.8z"/>`,
  bakery: `
    <path d="M10.2 18H4.774a1.5 1.5 0 0 1-1.352-.97 11 11 0 0 1 .132-6.487"/>
    <path d="M18 10.2V4.774a1.5 1.5 0 0 0-.97-1.352 11 11 0 0 0-6.486.132"/>
    <path d="M18 5a4 3 0 0 1 4 3 2 2 0 0 1-2 2 10 10 0 0 0-5.139 1.42"/>
    <path d="M5 18a3 4 0 0 0 3 4 2 2 0 0 0 2-2 10 10 0 0 1 1.42-5.14"/>
    <path d="M8.709 2.554a10 10 0 0 0-6.155 6.155 1.5 1.5 0 0 0 .676 1.626l9.807 5.42a2 2 0 0 0 2.718-2.718l-5.42-9.807a1.5 1.5 0 0 0-1.626-.676"/>`,
  cafe: `
    <path d="M10 2v2"/>
    <path d="M14 2v2"/>
    <path d="M16 8a1 1 0 0 1 1 1v8a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V9a1 1 0 0 1 1-1h14a4 4 0 1 1 0 8h-1"/>
    <path d="M6 2v2"/>`,
  entrepreneur: `
    <path d="M15 21v-5a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v5"/>
    <path d="M17.774 10.31a1.12 1.12 0 0 0-1.549 0 2.5 2.5 0 0 1-3.451 0 1.12 1.12 0 0 0-1.548 0 2.5 2.5 0 0 1-3.452 0 1.12 1.12 0 0 0-1.549 0 2.5 2.5 0 0 1-3.77-3.248l2.889-4.184A2 2 0 0 1 7 2h10a2 2 0 0 1 1.653.873l2.895 4.192a2.5 2.5 0 0 1-3.774 3.244"/>
    <path d="M4 10.95V19a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8.05"/>`,
  other: `
    <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"/>
    <circle cx="12" cy="10" r="3"/>`,
};

const CATEGORY_STYLES: Record<PlaceCategory, Omit<CategoryStyle, "icon">> = {
  restaurant: { color: "#1b4e30", bg: "#ecf9dd" },
  market: { color: "#276b37", bg: "#fffdf4" },
  bakery: { color: "#1b4e30", bg: "#ecf9dd" },
  cafe: { color: "#276b37", bg: "#fffdf4" },
  entrepreneur: { color: "#1b4e30", bg: "#ecf9dd" },
  other: { color: "#276b37", bg: "#fffdf4" },
};

// Pendentes e recusados só aparecem para quem os criou; o traço os diferencia.
const isDraft = (place: Place) =>
  place.status === "pending" || place.status === "rejected";

const REJECTED_STYLE = { color: "#dc2626", bg: "#fef2f2" };

function markerHtml(
  category: PlaceCategory,
  size: number,
  isSelected = false,
  draft = false,
  rejected = false,
): string {
  const style = rejected
    ? REJECTED_STYLE
    : (CATEGORY_STYLES[category] ?? CATEGORY_STYLES.other);
  const paths = LUCIDE_PATHS[category] ?? LUCIDE_PATHS.other;
  const iconSize = Math.round(size * 0.5);
  const shadow = isSelected
    ? `0 0 0 3px #fffdf4,0 0 0 5px ${style.color},0 3px 10px rgba(27,78,48,0.28)`
    : "0 3px 10px rgba(27,78,48,0.28)";

  return `<div style="
      width:${size}px;height:${size}px;border-radius:9999px;
      background:${style.bg};border:3px ${draft ? "dashed" : "solid"} ${style.color};
      display:flex;align-items:center;justify-content:center;
      box-shadow:${shadow};${draft && !rejected ? "opacity:0.7;" : ""}
    ">
    <svg xmlns="http://www.w3.org/2000/svg" width="${iconSize}" height="${iconSize}" viewBox="0 0 24 24"
      fill="none" stroke="${style.color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      ${paths}
    </svg>
  </div>`;
}

const ICON_SIZE: [number, number] = [40, 40];
const ICON_ANCHOR: [number, number] = [20, 40];

// Ícones não-selecionados só variam por categoria e status; cache-os
// para não reconstruir HTML + DivIcon por marcador a cada render.
const markerIconCache = new Map<string, L.DivIcon>();

export function createMarkerIcon(place: Place): L.DivIcon {
  const category = place.category;
  const draft = isDraft(place);
  const rejected = place.status === "rejected";
  const cacheKey = `${category}:${place.status}`;
  const cached = markerIconCache.get(cacheKey);
  if (cached) return cached;

  const icon = L.divIcon({
    html: markerHtml(category, 40, false, draft, rejected),
    className: "",
    iconSize: ICON_SIZE,
    iconAnchor: ICON_ANCHOR,
    popupAnchor: [0, -40],
  });
  markerIconCache.set(cacheKey, icon);
  return icon;
}

export function createSelectedMarkerIcon(place: Place): L.DivIcon {
  return L.divIcon({
    html: markerHtml(
      place.category,
      40,
      true,
      isDraft(place),
      place.status === "rejected",
    ),
    className: "selected-marker",
    iconSize: ICON_SIZE,
    iconAnchor: ICON_ANCHOR,
    popupAnchor: [0, -40],
  });
}

const eventMarkerIconCache = new Map<DirectoryEventStatus, L.DivIcon>();

export function createEventMarkerIcon(
  status: DirectoryEventStatus = "active",
): L.DivIcon {
  const cached = eventMarkerIconCache.get(status);
  if (cached) return cached;

  const draft = status === "pending" || status === "rejected";
  const rejected = status === "rejected";
  const bg = rejected ? "#dc2626" : "#276b37";
  const border = rejected ? "#fef2f2" : "#fffdf4";

  const html = `<div style="
      width:40px;height:40px;border-radius:9999px;
      background:${bg};border:3px ${draft ? "dashed" : "solid"} ${border};
      display:flex;align-items:center;justify-content:center;
      box-shadow:0 3px 10px rgba(27,78,48,0.35);${draft && !rejected ? "opacity:0.7;" : ""}
    ">
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"
      fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M8 2v4M16 2v4M3 10h18"/>
      <rect width="18" height="18" x="3" y="4" rx="2"/>
      <path d="M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01"/>
    </svg>
  </div>`;
  const icon = L.divIcon({
    html,
    className: "event-marker",
    iconSize: ICON_SIZE,
    iconAnchor: ICON_ANCHOR,
    popupAnchor: [0, -40],
  });
  eventMarkerIconCache.set(status, icon);
  return icon;
}

export function createPendingMarkerIcon(): L.DivIcon {
  const html = `<div style="position:relative;width:44px;height:44px;">
    <span class="animate-ping" style="position:absolute;inset:2px;border-radius:9999px;background:rgba(39,107,55,0.35);"></span>
    <div style="
        position:relative;width:44px;height:44px;border-radius:9999px;
        background:#1b4e30;border:3px solid #fff;
        display:flex;align-items:center;justify-content:center;
        box-shadow:0 3px 10px rgba(27,78,48,0.3);
      ">
      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24"
        fill="none" stroke="#fff" stroke-width="2.2" stroke-linecap="round">
        <path d="M12 5v14M5 12h14"/>
      </svg>
    </div>
  </div>`;
  return L.divIcon({
    html,
    className: "",
    iconSize: [44, 44],
    iconAnchor: [22, 44],
  });
}
