# Feature: comments

Provides the comment API layer used by both recipe detail pages and community posts. This feature is API-only — it has no standalone page or layout.

## Responsibilities

- Fetch comments for a given entity (recipe or community post)
- Create new comments
- Create replies (nested comments via `parentId`)
- Like/unlike a comment
- Delete own comments

## Structure

```
comments/
├── api/
│   ├── commentsApi.ts                  # Raw API calls: getComments, createComment, likeComment, deleteComment
│   ├── types.ts                        # Comment and reply type definitions
│   ├── index.ts                        # API barrel export
│   └── queries/
│       ├── getCommentsApiClient.ts     # React Query hooks: useGetComments, useCreateComment, useLikeComment, useDeleteComment
│       └── index.ts
└── index.ts
```

## API Endpoints Used

| Action | Endpoint |
|--------|---------|
| Fetch comments | `GET /comments?entityId=:id&entityType=:type` |
| Create comment | `POST /comments` with `{ content, entityId, entityType, parentId? }` |
| Like comment | `POST /comments/:id/like` |
| Delete comment | `DELETE /comments/:id` |

## Nested Replies

Comments support one level of nesting via `parentId`. A comment with `parentId: null` is a top-level comment. A comment with a `parentId` is a reply to that parent. The UI renders replies indented below their parent.

## Usage

This feature is consumed by:
- `src/features/recipe-details/` — `CommentsSection` below a recipe
- `src/features/communityPost/` — `PostComments` and `CommentComposer` on the post detail page

Import comment hooks from this feature's `index.ts` and render the comment list/form in the consuming feature's component.
