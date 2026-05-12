import type { PostComment } from "@/shared";
import type { ResolvedComment } from "../PostComments";

const LEADING_MENTION_RE =
  /^@([A-ZÁÀÃÂÉÊÍÓÔÕÚÜÇ][a-zA-ZáàãâéêíóôõúüçÁÀÃÂÉÊÍÓÔÕÚÜÇ]*(?:\s+[A-ZÁÀÃÂÉÊÍÓÔÕÚÜÇ][a-zA-ZáàãâéêíóôõúüçÁÀÃÂÉÊÍÓÔÕÚÜÇ]*)*)(\s|$)/;

export function parseReply(content: string): {
  replyTo: string | null;
  body: string;
} {
  const match = LEADING_MENTION_RE.exec(content);
  if (!match) return { replyTo: null, body: content };
  return {
    replyTo: match[1],
    body: content.slice(match[0].length).trimStart(),
  };
}

export function groupCommentsIntoThreads(
  comments: PostComment[],
): PostComment[][] {
  const threads: PostComment[][] = [];
  let currentThread: PostComment[] = [];
  const currentParticipants = new Set<string>();

  const flushThread = () => {
    if (currentThread.length > 0) {
      threads.push(currentThread);
      currentThread = [];
      currentParticipants.clear();
    }
  };

  for (const comment of comments) {
    const { replyTo } = parseReply(comment.commentContent);
    const authorName = comment.user?.name ?? "";

    if (replyTo === null) {
      flushThread();
      currentThread = [comment];
      currentParticipants.add(authorName);
    } else if (currentParticipants.has(replyTo)) {
      currentThread.push(comment);
      currentParticipants.add(authorName);
    } else {
      flushThread();
      currentThread = [comment];
      currentParticipants.add(authorName);
    }
  }

  flushThread();
  return threads;
}

export function resolveThread(
  threadComments: PostComment[],
): ResolvedComment[] {
  const resolved: ResolvedComment[] = [];
  const seenAuthors = new Map<string, { comment: PostComment; body: string }>();

  for (const comment of threadComments) {
    const { replyTo, body } = parseReply(comment.commentContent);
    const quoted = replyTo ? (seenAuthors.get(replyTo) ?? null) : null;
    resolved.push({
      comment,
      replyTo,
      body,
      quotedComment: quoted?.comment ?? null,
      quotedBody: quoted?.body ?? null,
    });
    seenAuthors.set(comment.user?.name ?? "", { comment, body });
  }

  return resolved;
}
