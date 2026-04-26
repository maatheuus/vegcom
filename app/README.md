# app/ — Routing Layer

This directory contains all Next.js App Router routes. It is kept intentionally thin — no business logic lives here. Pages import from `src/features/` and `src/shared/`.

## Route Groups

Next.js route groups (folders in parentheses) are used to organize pages by access level without affecting the URL.

### `(public)/` — No authentication required

All pages accessible to unauthenticated users.

| Route | File | Description |
|-------|------|-------------|
| `/` | `(public)/page.tsx` | Home page (community feed) — posts, likes, comments |
| `/community/[id]/[slug]` | `(public)/community/[id]/[slug]/page.tsx` | Single community post detail |
| `/recipes` | `(public)/recipes/page.tsx` | Recipe listing with search and filters |
| `/recipes/[slug]` | `(public)/recipes/[slug]/page.tsx` | Individual recipe detail |
| `/curiosities` | `(public)/curiosities/page.tsx` | Vegan/vegetarian facts and timeline |
| `/user/[id]` | `(public)/user/[id]/page.tsx` | Public user profile |

### `(public)/(auth)/` — Auth pages (redirect if already logged in)

| Route | File | Description |
|-------|------|-------------|
| `/login` | `(auth)/login/page.tsx` | Login form |
| `/signup` | `(auth)/signup/page.tsx` | Multi-step signup flow |
| `/forgot-password` | `(auth)/forgot-password/page.tsx` | Password reset request |

### `(private)/` — Authentication required

Protected by middleware. Unauthenticated users are redirected to `/login`.

| Route | File | Description |
|-------|------|-------------|
| `/account` | `(private)/account/page.tsx` | Account dashboard |
| `/account/settings` | `(private)/account/settings/page.tsx` | Profile and preference settings |
| `/account/favorites` | `(private)/account/favorites/page.tsx` | Saved/favorited recipes |
| `/account/recipes` | `(private)/account/recipes/page.tsx` | User's own created recipes |
| `/account/subscription` | `(private)/account/subscription/page.tsx` | Subscription status and upgrade |
| `/account/notifications` | `(private)/account/notifications/page.tsx` | Notification preferences |
| `/chat` | `(private)/chat/page.tsx` | AI chat — new session / session list |
| `/chat/[id]` | `(private)/chat/[id]/page.tsx` | Active chat session |
| `/new-recipe` | `(private)/new-recipe/page.tsx` | Multi-step recipe creation form |
| `/payment/success` | `(private)/payment/success/page.tsx` | Post-Stripe payment confirmation |

### `api/` — Next.js API Routes

| Route | Description |
|-------|-------------|
| `/api/logout` | Server-side logout handler (clears cookies if needed) |
| `/api/feedback` | Receives in-app feedback submissions |

## Layouts

| File | Scope |
|------|-------|
| `layout.tsx` (root) | Global layout — fonts, providers (React Query, Analytics), global CSS |
| `(public)/layout.tsx` | Public layout — header and footer visible on all public pages |
| `(public)/(auth)/layout.tsx` | Auth layout — minimal header/footer for login and signup pages |
| `(private)/layout.tsx` | Private layout — wraps authenticated pages, includes `AuthGuard` |
| `(private)/account/layout.tsx` | Account sidebar navigation shared by all `/account/*` pages |
| `(private)/chat/layout.tsx` | Chat layout — sidebar + workspace split |

## Other Root Files

| File | Purpose |
|------|---------|
| `global.css` | Global CSS reset and base styles |
| `not-found.tsx` | Custom 404 page |
| `global-error.tsx` | Global error boundary for unhandled errors |
| `robots.ts` | Robots.txt generation |
| `sitemap.ts` | Dynamic sitemap generation |
| `favicon.ico` | Site favicon |

## Conventions

- Pages are thin wrappers — they import feature components and pass route params/search params down.
- Data fetching in server components uses `getXxxApiServer.ts` helpers from `src/features/`.
- Client-side interactivity uses `"use client"` components from `src/features/`.
- Dynamic route segments use `[slug]` (recipes) and `[id]` (users and chats).
