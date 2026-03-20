export function extractInternalLinks(
  content: string,
): { type: "recipe" | "post"; id: string }[] {
  const results: { type: "recipe" | "post"; id: string }[] = [];
  const seen = new Set<string>();

  const recipeRegex = /(?:https?:\/\/[^\/\s]*)?\/recipes\/([a-z0-9-]+)/g;
  let match;
  while ((match = recipeRegex.exec(content)) !== null) {
    const slug = match[1];
    const key = `recipe:${slug}`;
    if (!seen.has(key)) {
      seen.add(key);
      results.push({ type: "recipe", id: slug });
    }
  }

  const postRegex = /(?:https?:\/\/[^\/\s]*)?\/community\/(\d+)/g;
  while ((match = postRegex.exec(content)) !== null) {
    const id = match[1];
    const key = `post:${id}`;
    if (!seen.has(key)) {
      seen.add(key);
      results.push({ type: "post", id });
    }
  }

  return results;
}
