# src/features/ — Feature-Sliced Architecture

Each folder in this directory is a self-contained feature module. It owns everything related to its domain: API calls, React components, custom hooks, and TypeScript types.

## Feature Modules

| Feature | Route(s) | Description |
|---------|---------|-------------|
| [auth](auth/) | `/login`, `/signup`, `/forgot-password` | Authentication — login, multi-step signup, password reset, token management |
| [recipes](recipes/) | `/recipes` | Recipe listing, search, filters, sort, and grid display |
| [recipe-details](recipe-details/) | `/recipes/[slug]` | Full recipe detail view — save, share, view tracking |
| [new-recipe](new-recipe/) | `/new-recipe` | Recipe creation form with Tiptap rich text editor and image upload |
| [community](community/) | `/` | Community feed — post listing, API, and layout | New home page
| [communityPost](communityPost/) | `/community` (nested) | Single post — interactions (like, comment), context provider |
| [comments](comments/) | Used within recipe-details and community | Comment and reply API — read, create, like, delete |
| [chat](chat/) | `/chat` | AI chat interface backed by Google Gemini |
| [account](account/) | `/account/*` | Account settings, favorites, subscription, notifications, own recipes |
| [curiosities](curiosities/) | `/curiosities` | Vegan/vegetarian facts and history timeline |
| [userProfile](userProfile/) | `/user/[id]` | Public user profile view |

## Folder Convention

Every feature follows this internal structure:

```
<feature>/
├── api/
│   ├── <feature>Api.ts        # Raw Axios API calls
│   ├── types.ts               # API request/response types
│   └── queries/
│       ├── get<Feature>ApiClient.ts   # React Query hooks (client-side)
│       └── get<Feature>ApiServer.ts   # Server-side fetch helpers
├── components/                # React components scoped to this feature
├── hooks/
│   ├── mutations/             # useMutation hooks
│   └── queries/               # useQuery hooks
├── types/
│   └── index.ts               # Domain types for this feature
└── index.ts                   # Barrel export — public API of this feature
```

Not every feature uses every layer — only the folders that are needed are created.

## Rules

- **Encapsulation** — components in `feature/A/` should not import from `feature/B/`. Use `src/entities/` for shared domain types and `src/shared/` for shared utilities.
- **Barrel exports** — always import from the feature's `index.ts`, never from internal paths.
- **Shared first check** — before creating a new shared component, verify the functionality isn't already in `src/shared/ui/` or another feature.
- **No fat pages** — `app/` pages are thin. All rendering and data logic belongs in feature components and hooks.
