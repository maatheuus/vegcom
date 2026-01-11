/**
 * Slug generation utility for recipes
 * Generates URL-friendly slugs from recipe titles
 */

/**
 * Removes accents/diacritics from a string
 */
function removeAccents(str: string): string {
  return str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[àáâãäå]/g, "a")
    .replace(/[èéêë]/g, "e")
    .replace(/[ìíîï]/g, "i")
    .replace(/[òóôõö]/g, "o")
    .replace(/[ùúûü]/g, "u")
    .replace(/[ç]/g, "c")
    .replace(/[ñ]/g, "n");
}

/**
 * Generates a URL-friendly slug from a recipe title
 * @param title - The recipe title to convert to a slug
 * @returns A slug string (e.g., "receita-exemplo-deliciosa")
 */
export function generateSlug(title: string): string {
  if (!title) return "";

  return (
    removeAccents(title)
      .toLowerCase()
      // Replace spaces and multiple spaces with single hyphen
      .replace(/\s+/g, "-")
      // Remove characters that aren't letters, numbers, or hyphens
      .replace(/[^a-z0-9-]/g, "")
      // Remove multiple consecutive hyphens
      .replace(/-+/g, "-")
      // Remove leading and trailing hyphens
      .replace(/^-+|-+$/g, "")
      // Limit length to reasonable URL length (100 chars)
      .substring(0, 100)
  );
}
