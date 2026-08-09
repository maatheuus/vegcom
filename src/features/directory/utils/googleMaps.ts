export function getGoogleMapsDirectionsUrl({
  lat,
  lng,
  fallbackDestination,
}: {
  lat?: number;
  lng?: number;
  fallbackDestination: string;
}) {
  const destination =
    lat !== undefined && lng !== undefined
      ? `${lat},${lng}`
      : fallbackDestination;

  return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(destination)}`;
}
