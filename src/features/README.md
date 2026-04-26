# src/features/ — Feature-Sliced Architecture

Each folder in this directory is a self-contained feature module. It owns everything related to its domain: API calls, React components, custom hooks, and TypeScript types.

## Feature Modules

| Feature | Route(s) | Description |
|---------|---------|-------------|
| [auth](auth/) | `/login`, `/signup`, `/forgot-password` | Authentication — login, multi-step signup, password reset, token management |
| [recipes](recipes/) | `/recipes` | Recipe listing, search, filters, sort, and grid display |
| [recipe-details](recipe-details/) | `/recipes/[slug]` | Full recipe detail view — save, share, ratings, comments |
| [new-recipe](new-recipe/) | `/new-recipe` | Multi-step recipe creation form with image upload and drag-and-drop |
| [community](community/) | `/` | Home page — community feed, post listing, composer, sidebar, notifications |
| [communityPost](communityPost/) | `/community/[id]/[slug]` | Single post detail — interactions (like, comment), context provider |
| [comments](comments/) | Used within recipe-details and communityPost | Comment and reply API — read, create, like, delete |
| [chat](chat/) | `/chat`, `/chat/[id]` | AI chat interface backed by Google Gemini — workspace + session history |
| [account](account/) | `/account/*` | Account settings, subscription, notifications, own recipes |
| [curiosities](curiosities/) | `/curiosities` | Vegan/vegetarian facts — fast facts section and history timeline |
| [userProfile](userProfile/) | `/user/[id]` | Public user profile view with tabs |
| [feedback](feedback/) | Used globally (modal) | In-app feedback form, submitted to `/api/feedback` |

## Folder Convention

Every feature follows this internal structure:

```
<feature>/
├── api/
│   ├── <feature>Api.ts        # Raw Axios API calls
│   ├── types.ts               # API request/response types
│   └── queries/               # (most features)
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

Not every feature uses every layer — only the folders that are needed are created. Some features (e.g. `community`) place React Query hooks directly in `api/` alongside the raw API calls instead of using a `queries/` subfolder.

## Rules

- **Encapsulation** — components in `feature/A/` should not import from `feature/B/`. Use `src/entities/` for shared domain types and `src/shared/` for shared utilities.
- **Barrel exports** — always import from the feature's `index.ts`, never from internal paths.
- **Shared first check** — before creating a new shared component, verify the functionality isn't already in `src/shared/ui/` or another feature.
- **No fat pages** — `app/` pages are thin. All rendering and data logic belongs in feature components and hooks.
