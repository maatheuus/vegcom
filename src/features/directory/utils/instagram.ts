export function getInstagramHandle(value: string) {
  return value.trim().replace(/^@+/, "");
}

/** Aceita "@perfil", "perfil" ou a URL do perfil e devolve rótulo + link. */
export function getInstagramProfile(value: string) {
  const handle = getInstagramHandle(
    value.trim().replace(/^https?:\/\/(?:www\.)?instagram\.com\//i, ""),
  ).replace(/[/?#].*$/, "");

  if (!handle) return null;

  return {
    label: `@${handle}`,
    url: `https://www.instagram.com/${encodeURIComponent(handle)}`,
  };
}
