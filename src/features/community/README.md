# Feature: community

Renders the community feed at `/community` — a social space where users can share posts, resources, and announcements.

## Responsibilities

- Display a paginated feed of community posts
- Compose and publish new posts (rich text + optional images)
- Filter posts by type (POST, RESOURCE, ANNOUNCEMENT)
- Sidebar with community stats and suggestions
- Integrate with `communityPost` for per-post interactions

## Structure

```
community/
├── api/
│   ├── communityApi.ts             # GET /community/posts, POST /community/posts
│   ├── types.ts                    # Feed and post API types
│   └── queries/
│       └── getCommunityApiClient.ts # useGetCommunityPosts(), useCreatePost()
├── components/
│   ├── (Feed layout, post list, composer, sidebar, type filters)
├── hooks/
│   └── (feed pagination, post creation state)
├── types/
│   └── index.ts
└── index.ts
```

## Post Types

| Type | Description |
|------|-------------|
| `POST` | General community post — thoughts, questions, content |
| `RESOURCE` | Links to external resources (articles, videos, tools) |
| `ANNOUNCEMENT` | Official announcements (admin only or highlighted) |

## Post Composer

- Built with Tiptap via `usePostComposerEditor` from `src/shared/hooks/`
- Supports: text formatting, emoji insertion, image upload, link preview generation
- Link previews are generated with `useLinkPreviews` hook
- Character count limit enforced by Tiptap extension

## Sidebar

Managed by `useCommunitySidebar` (collapsible on mobile). Contains community stats, popular tags, or suggested users.

## Relationship with `communityPost`

`community/` handles the **feed level** (listing, creating posts). `communityPost/` handles the **post level** (liking, commenting, deleting a specific post). The feed renders `communityPost` components for each post in the list.
