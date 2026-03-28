# src/shared/ — Shared Utilities & Components

Everything in this directory is genuinely reusable across multiple features. Do not put feature-specific logic here.

## Directory Map

```
shared/
├── api/          # HTTP client, error handling, server fetch, 3rd-party clients
├── components/   # Reusable React components (non-UI-library)
├── hooks/        # Cross-feature custom React hooks
├── icons/        # Icon barrel export (Phosphor Icons)
├── lib/          # Pure utility functions and helpers
├── tanstack/     # React Query provider and DevTools
├── types/        # Global TypeScript types
└── ui/           # Radix-based UI component library
```

---

## `api/`

The HTTP layer shared by all features.

| File/Folder | Purpose |
|-------------|---------|
| `axios/axiosInstance.ts` | Main Axios instance. Adds `Authorization: Bearer` header on every request; removes token on 401 responses. Base URL from `NEXT_PUBLIC_API_URL`. |
| `axios/axiosError.ts` | Helpers to parse and format Axios error responses. |
| `axios/serverFetch.ts` | Server-side fetch utility for Next.js Server Components — bypasses Axios and uses `fetch` directly. |
| `errors/codes.ts` | Machine-readable API error code constants. |
| `errors/messages.ts` | Human-readable error message map. |
| `ai/ai.ts` | Google Gemini AI client setup. |
| `ai/queries/getAiApiClient.ts` | React Query hooks for AI endpoints. |
| `ai/queries/getAiApiServer.ts` | Server-side AI fetch helpers. |
| `stripe/stripe.ts` | Stripe client initialization. |
| `client.ts` | Re-exports the configured Axios instance for feature API files. |

---

## `hooks/`

Custom React hooks used by multiple features.

| Hook | Purpose |
|------|---------|
| `use-toast.ts` | Toast notification system — shows success, error, and info messages |
| `useCitiesSearch.ts` | Autocomplete search for Brazilian cities (used in account settings) |
| `useCommunitySidebar.ts` | Community sidebar open/close state |
| `useDebounce.ts` | Delays updating a value until input stops (used by search bars) |
| `useLinkPreviews.ts` | Generates Open Graph link preview metadata |
| `usePagination.ts` | Page number state and derived values for paginated lists |
| `usePersistentForm.ts` | Persists form state to localStorage (survives page refresh) |
| `usePostComposerEditor.ts` | Tiptap editor state for the community post composer |

---

## `ui/`

30+ accessible UI components built on Radix UI primitives. Use these before reaching for a 3rd-party component.

**Form elements:** `Input`, `Select`, `Checkbox`, `RadioGroup`, `Textarea`, `Label`, `Form`

**Layout & containers:** `Button`, `Card`, `Dialog`, `Drawer`, `Sheet`, `Separator`

**Display:** `Avatar`, `Badge`, `EmptyState`, `Logo`, `RatingStars`, `ImageCarouselModal`, `PreviewLinks`

**Navigation:** `Pagination`, `Layout`

**Special:** `SearchCityLocation`, `SubmitButton` (shows loading state automatically)

All components are exported from `src/shared/ui/index.ts`.

---

## `lib/`

Pure utility functions.

| File | Purpose |
|------|---------|
| `utils.ts` | `cn()` for class merging (clsx + tailwind-merge), date formatting helpers |
| `jwt.ts` | JWT decode utilities |
| `middleware.ts` | Shared middleware helpers |

---

## `tanstack/`

| File | Purpose |
|------|---------|
| `QueryClientWrapper.tsx` | Provides the React Query `QueryClient` to the entire app. Disables `refetchOnWindowFocus`. Includes React Query DevTools in development. |

---

## `types/`

Global TypeScript types that don't belong to any single feature. Import from here when a type is needed in more than one feature.

---

## `icons/`

Barrel file (`index.tsx`) that re-exports icons from Phosphor Icons. Import icons from `@icons` alias instead of importing directly from `@phosphor-icons/react` in components.

---

## Adding New Shared Utilities

Before adding to `shared/`:
1. Confirm the utility is used by at least 2 different features.
2. If it's UI, check `ui/` first — it may already exist.
3. If it's a hook, check `hooks/` — avoid duplicate debounce/pagination logic.
4. Keep it generic — no feature-specific business logic.
