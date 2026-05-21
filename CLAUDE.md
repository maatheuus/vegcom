# VegCom — Claude Code Context

> This file is auto-loaded by Claude Code. Read it before every task to stay consistent with the project's architecture, conventions, and constraints.

## Project Overview

**VegCom** ("Comunidade Vegana") is a Next.js 15 frontend for a plant-based recipe and community platform. It connects to a separate NestJS backend. Users can browse/create recipes, participate in a community feed, and chat with a Gemini AI assistant.

## Tech Stack

- **Framework:** Next.js 15 (App Router, `app/` directory)
- **Language:** TypeScript — strict typing, avoid `any`
- **Styling:** Tailwind CSS v4 — utility-first, no CSS modules
- **Server State:** TanStack React Query v5
- **HTTP:** Axios with auth interceptors (`src/shared/api/axios/axiosInstance.ts`)
- **Forms:** React Hook Form + Zod
- **UI Primitives:** Radix UI
- **Rich Text:** Tiptap
- **Animations:** Framer Motion, GSAP
- **Drag & Drop:** dnd-kit
- **Package Manager:** Yarn v4 — **never use npm or pnpm**

## Architecture

### Feature-Sliced Design

All business logic lives under `src/features/`. Each feature is self-contained:

```
src/features/<feature>/
├── api/          # Axios API calls + query/mutation hooks
│   └── queries/  # getXxxApiClient.ts (client), getXxxApiServer.ts (server)
├── components/   # React components scoped to this feature
├── hooks/        # Custom hooks (mutations/, queries/ subfolders)
├── types/        # TypeScript interfaces/types
└── index.ts      # Barrel export
```

**Rule:** Update feature-specific components first. Only move something to `src/shared/` if it is genuinely reusable across multiple features.

### Shared Utilities (`src/shared/`)

| Folder | Purpose |
|--------|---------|
| `api/` | Axios instance, error handling, server fetch, Stripe, AI clients |
| `hooks/` | Cross-feature hooks (pagination, debounce, toast, etc.) |
| `ui/` | Radix-based UI components (Button, Input, Dialog, Avatar, etc.) |
| `lib/` | `utils.ts` (cn, date helpers), `jwt.ts` |
| `tanstack/` | React Query provider + DevTools |
| `types/` | Global TypeScript types |

### Domain Entities (`src/entities/`)

Shared data model types for `recipe`, `post`, and `user`. These are plain type definitions — no logic.

### Routing (`app/`)

Next.js App Router with route groups:

| Group | Purpose |
|-------|---------|
| `(public)/` | Pages accessible without login (home, recipes, community, curiosities, user profiles) |
| `(public)/(auth)/` | Auth pages: login, signup, forgot-password |
| `(private)/` | Requires authentication: account settings, new recipe, chat, payment |
| `api/` | Next.js API routes (e.g., `/api/logout`) |

## Path Aliases (tsconfig.json)

```
@/*         → src/*
@shared/*   → src/shared/*
@features/* → src/features/*
@entities/* → src/entities/*
@icons      → src/shared/icons/index.tsx
@assets/*   → src/assets/*
```

Always use these aliases — never use relative `../../` paths across major boundaries.

## Authentication

- **Token storage:** `localStorage` with key `vegcom_access_token`
- **Injection:** Axios request interceptor auto-adds `Authorization: Bearer <token>`
- **On 401:** Response interceptor removes the token from localStorage
- **Auth API hooks:** `src/features/auth/api/queries/getAuthApiClient.ts`
  - `useGetUser()` — fetch current user
  - `useSignin()` — login mutation
  - `useSignout()` — logout mutation

## Data Fetching Rules

1. **Client components** — use React Query hooks (`useQuery`, `useMutation`)
2. **Server components** — use `serverFetch.ts` or `getXxxApiServer.ts` helpers
3. Add `"use client"` only when the component uses hooks, browser APIs, or event handlers
4. Query keys live in `XxxKeys` objects co-located with the hook files

## Key Conventions

- **Yarn only** — `yarn add`, `yarn dev`, `yarn build`
- **Dev server** — `yarn dev` (uses Turbopack)
- **No `any`** — use Prisma-generated types, Zod schemas, or explicit interfaces
- **No fat components** — keep pages thin; push logic into hooks and API layers
- **Form validation** — always use Zod schemas passed to `useForm` via `zodResolver`
- **Error handling** — use `axiosError.ts` utilities; surface errors with the toast hook
- **Images** — use `next/image`; allowed remote hosts: Unsplash, Picsum, GitHub, Cloudinary

## Running the Project

```bash
yarn install
cp .env.example .env   # set NEXT_PUBLIC_API_URL
yarn dev               # http://localhost:3000
```

## Related Docs

- [README.md](README.md) — project overview and setup
- [FOR_BACKEND.md](FOR_BACKEND.md) — API contracts the frontend relies on
- [src/features/README.md](src/features/README.md) — feature module index
- [src/shared/README.md](src/shared/README.md) — shared utilities reference
- [BACKEND_CONTEXT.md](BACKEND_CONTEXT.md) — NestJS backend architecture (kept for AI context on backend tasks)

<!-- code-review-graph MCP tools -->
## MCP Tools: code-review-graph

**IMPORTANT: This project has a knowledge graph. ALWAYS use the
code-review-graph MCP tools BEFORE using Grep/Glob/Read to explore
the codebase.** The graph is faster, cheaper (fewer tokens), and gives
you structural context (callers, dependents, test coverage) that file
scanning cannot.

### When to use graph tools FIRST

- **Exploring code**: `semantic_search_nodes` or `query_graph` instead of Grep
- **Understanding impact**: `get_impact_radius` instead of manually tracing imports
- **Code review**: `detect_changes` + `get_review_context` instead of reading entire files
- **Finding relationships**: `query_graph` with callers_of/callees_of/imports_of/tests_for
- **Architecture questions**: `get_architecture_overview` + `list_communities`

Fall back to Grep/Glob/Read **only** when the graph doesn't cover what you need.

### Key Tools

| Tool | Use when |
| ------ | ---------- |
| `detect_changes` | Reviewing code changes — gives risk-scored analysis |
| `get_review_context` | Need source snippets for review — token-efficient |
| `get_impact_radius` | Understanding blast radius of a change |
| `get_affected_flows` | Finding which execution paths are impacted |
| `query_graph` | Tracing callers, callees, imports, tests, dependencies |
| `semantic_search_nodes` | Finding functions/classes by name or keyword |
| `get_architecture_overview` | Understanding high-level codebase structure |
| `refactor_tool` | Planning renames, finding dead code |

### Workflow

1. The graph auto-updates on file changes (via hooks).
2. Use `detect_changes` for code review.
3. Use `get_affected_flows` to understand impact.
4. Use `query_graph` pattern="tests_for" to check coverage.
