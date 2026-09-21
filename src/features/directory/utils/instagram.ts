/** Aceita "@perfil", "perfil" ou a URL do perfil e devolve só o handle. */
export function getInstagramHandle(value: string) {
  return value
    .trim()
    .replace(/^@+/, "")
    .replace(/^https?:\/\//i, "")
    .replace(/^(?:www\.)?instagram\.com\//i, "")
    .replace(/^@+/, "")
    .replace(/[/?#].*$/, "");
}

/** Aceita "@perfil", "perfil" ou a URL do perfil e devolve rótulo + link. */
export function getInstagramProfile(value: string) {
  const handle = getInstagramHandle(value);

  if (!handle) return null;

  return {
    label: `@${handle}`,
    url: `https://www.instagram.com/${encodeURIComponent(handle)}`,
  };
}
