export function formatCurrency(currency: string, value: number) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency,
  }).format(value / 100);
}

export function slugify(text: string) {
  return text
    .toString()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "")
    .replace(/--+/g, "-");
}

export function linkifyHtml(htmlContent: string) {
  if (!htmlContent) return "";
  const urlRegex = /(?<!href="|href='|src="|src=')(https?:\/\/[^\s<]+)/g;
  return htmlContent.replace(
    urlRegex,
    '<a href="$1" target="_blank" rel="noopener noreferrer" class="text-green-600 underline hover:text-green-700 transition-colors">$1</a>',
  );
}
