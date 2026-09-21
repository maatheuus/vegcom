const REJECTED_RETENTION_DAYS = 7;
const DAY_MS = 24 * 60 * 60 * 1000;

// Espelha a limpeza diária do backend, que remove itens recusados após 7 dias.
export function getDaysUntilDeletion(rejectedAt?: number) {
  if (!rejectedAt) return REJECTED_RETENTION_DAYS;

  const remainingMs =
    rejectedAt + REJECTED_RETENTION_DAYS * DAY_MS - Date.now();
  return Math.max(1, Math.ceil(remainingMs / DAY_MS));
}

export function formatDeletionNotice(rejectedAt?: number) {
  const days = getDaysUntilDeletion(rejectedAt);
  return `Será excluído automaticamente em ${days} ${days === 1 ? "dia" : "dias"}.`;
}
