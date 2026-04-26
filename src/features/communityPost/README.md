# Feature: communityPost

Handles the full detail view of a single community post at `/community/[id]/[slug]`. Provides a React Context so interaction state is shared between all parts of the post without prop drilling.

## Responsibilities

- Render the full post content
- Like / unlike a post (optimistic update)
- Show the comment section with comment composition
- Reply to individual comments (via `MentionList` for @mentions)
- Delete own post
- Navigate back to the community feed

## Structure

```
communityPost/
├── components/
│   ├── PostActions.tsx         # Like button, comment count, share, delete menu
│   ├── PostComments.tsx        # Full comment list for this post
│   ├── CommentComposer.tsx     # Rich text input for writing a new comment/reply
│   ├── MentionList.tsx         # @mention suggestion dropdown in the composer
│   ├── ReplyButton.tsx         # Inline reply trigger on a comment
│   └── BackToCommunityButton.tsx # Navigation back to the feed
├── context/
│   ├── PostInteractionContext.tsx  # Context type and hook definition
│   └── PostInteractionProvider.tsx # Provider — holds liked state, comment count
└── (no separate types/ or hooks/ directories; logic lives in components and context)
```

## Context Pattern

Each post detail page is wrapped in `PostInteractionProvider`, which holds:

```ts
{
  isLiked: boolean
  likeCount: number
  toggleLike: () => void
}
```

Child components (`PostActions`, etc.) consume this context via the hook exported from `PostInteractionContext.tsx` — no prop chains required.

## Comment Composition

- `CommentComposer` supports @mention suggestions via `MentionList`
- Replies are threaded one level deep — a reply targets a parent comment's `id`
- Comment creation and liking are delegated to `src/features/comments/`

## Relationship with `community`

`communityPost` renders the full post detail when a user clicks a card in the community feed managed by `community/`. The feed links to `/community/[id]/[slug]`; this feature owns that route's content.
