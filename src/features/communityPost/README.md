# Feature: communityPost

Handles per-post interactions within the community feed — likes, comments, and deletion. Provides a React Context so interaction state is shared between a post's header, body, and action bar without prop drilling.

## Responsibilities

- Like / unlike a post (optimistic update)
- Show/hide comment section for a post
- Delete own post
- Provide interaction state to all components within a single post via Context

## Structure

```
communityPost/
├── components/
│   ├── PostHeader.tsx          # Author avatar, name, timestamp, delete menu
│   ├── PostBody.tsx            # Rendered Tiptap content + images
│   ├── PostActionBar.tsx       # Like button, comment toggle, share
│   ├── PostCommentSection.tsx  # Inline comment list + comment form
│   └── PostCard.tsx            # Assembles all parts into one post card
├── context/
│   ├── PostInteractionContext.ts   # Context type definition
│   └── PostInteractionProvider.tsx # Provider — holds liked state, comment visibility
├── hooks/
│   └── (post-level mutation hooks: like, delete)
└── types/
    └── index.ts
```

## Context Pattern

Each post card is wrapped in `PostInteractionProvider`, which holds:

```ts
{
  isLiked: boolean
  likeCount: number
  toggleLike: () => void
  isCommentOpen: boolean
  toggleComments: () => void
}
```

Child components (`PostActionBar`, `PostCommentSection`, etc.) consume this context via `useContext(PostInteractionContext)` — no prop chains required.

## Like Interaction

- `toggleLike()` fires `POST /community/posts/:id/like`
- Uses optimistic update: UI updates immediately, rolls back on error
- Prevents double-click spam with a pending state

## Relationship with `community`

`communityPost` components are rendered inside the feed managed by `community/`. The split allows the feed to stay focused on listing/creating while each post handles its own interaction state independently.
