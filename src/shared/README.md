# src/shared/ — Shared Utilities & Components

Everything in this directory is genuinely reusable across multiple features. Do not put feature-specific logic here.

## Directory Map

```
shared/
├── api/          # HTTP client, error handling, server fetch, 3rd-party clients
├── components/   # Reusable React components (non-UI-library)
├── hooks/        # Cross-feature custom React hooks
├── icons/        # Icon barrel export (Phosphor Icons + custom SVGs)
├── lib/          # Pure utility functions and helpers
├── tanstack/     # React Query provider and DevTools
├── types/        # Global TypeScript types
├── ui/           # Radix-based UI component library
└── utils/        # Additional utility helpers
```

---

## `api/`

The HTTP layer shared by all features.

| File/Folder | Purpose |
|-------------|---------|
| `axios/axiosInstance.ts` | Main Axios instance. Adds `Authorization: Bearer` header; removes token on 401. Base URL from `NEXT_PUBLIC_API_URL`. |
| `axios/axiosError.ts` | Helpers to parse and format Axios error responses. |
| `axios/serverFetch.ts` | Server-side fetch utility for Next.js Server Components — bypasses Axios. |
| `errors/codes.ts` | Machine-readable API error code constants. |
| `errors/messages.ts` | Human-readable error message map. |
| `ai/ai.ts` | Google Gemini AI client setup. |
| `ai/queries/getAiApiClient.ts` | React Query hooks for AI endpoints. |
| `ai/queries/getAiApiServer.ts` | Server-side AI fetch helpers. |
| `stripe/stripe.ts` | Stripe client initialization. |
| `client.ts` | Re-exports the configured Axios instance for feature API files. |
| `mock.ts` | Shared mock data for development. |

---

## `components/`

Reusable layout and utility components that are not part of the UI primitive library.

| Component | Purpose |
|-----------|---------|
| `ui/AuthenticatedBlocker.tsx` | Overlay or guard shown to unauthenticated users on interactive elements |
| `ui/OnboardingTour.tsx` | Guided onboarding tooltip tour for new users |
| `ui/ProgressProviderClient.tsx` | Client-side page progress bar provider (`@bprogress/core`) |
| `ui/SmoothScroll.tsx` | Lenis smooth scroll wrapper (used on pages with scroll-triggered animations) |
| `ui/Loadings/Loading.tsx` | Full-page branded loading spinner |
| `ui/Loadings/LoadingDots.tsx` | Animated three-dot loading indicator |
| `ui/layout.tsx` | Generic layout wrapper helper |
| `ui/left/BackgroundItems.tsx` | Decorative background SVG elements for auth pages |
| `ui/right/PathLinks.tsx` | Breadcrumb or contextual path links |
| `ui/right/Welcome.tsx` | Welcome message component |

---

## `hooks/`

Custom React hooks used by multiple features.

| Hook | Purpose |
|------|---------|
| `use-toast.ts` | Toast notification system — success, error, and info messages |
| `useCitiesSearch.ts` | Autocomplete search for Brazilian cities (account settings) |
| `useCommunitySidebar.ts` | Community sidebar open/close state |
| `useDebounce.ts` | Delays updating a value until input stops (search bars) |
| `useLinkPreviews.ts` | Generates Open Graph link preview metadata |
| `usePagination.ts` | Page number state and derived values for paginated lists |
| `usePersistentForm.ts` | Persists form state to localStorage (survives page refresh) |
| `usePostComposerEditor.ts` | Tiptap editor state for the community post composer |

---

## `ui/`

Accessible UI components built on Radix UI primitives. Use these before reaching for a 3rd-party component. All folder-based components are exported from `src/shared/ui/index.ts`; kebab-case files are Radix drop-in primitives.

**Form elements:** `Input`, `Input/Otp`, `Select`, `Checkbox`, `RadioGroup`, `TextArea`, `Label`, `Form`, `Switch`

**Layout & containers:** `Button`, `Button/Animated`, `Button/Icon`, `Button/Link`, `Card`, `Dialog`, `Tooltip`, `Layout`, `Layout/Footer`, `Layout/FooterAnthem`, `Layout/Helpers/{Col,Row,Grid}`

**Display:** `Avatar`, `EmptyState`, `Logo`, `RatingStars`, `ImageCarouselModal`, `PreviewLinks`, `Text`

**Navigation:** `Pagination`

**Special:** `SearchCityLocation`, `DropdownMenu`

**Radix primitives (kebab-case files):** `card.tsx`, `drawer.tsx`, `hover-card.tsx`, `popover.tsx`, `progress.tsx`, `scroll-area.tsx`, `separator.tsx`, `sheet.tsx`, `skeleton.tsx`, `toast.tsx`, `toaster.tsx`

---

## `lib/`

Pure utility functions.

| File | Purpose |
|------|---------|
| `utils.ts` | `cn()` for class merging (clsx + tailwind-merge), date formatting helpers |
| `jwt.ts` | JWT decode utilities |
| `middleware.ts` | Shared middleware helpers |
| `compressImage.ts` | Client-side image compression before upload |
| `globalVariables.ts` | App-wide constants (e.g., token key, API paths) |
| `api/cities.ts` | Brazilian cities data used by `useCitiesSearch` |

---

## `utils/`

Additional utility helpers outside of `lib/`.

| File | Purpose |
|------|---------|
| `index.ts` | General-purpose utility exports |
| `previewLinksUtils.ts` | Helpers for Open Graph link preview fetching and parsing |

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

Custom SVG icons live in sub-folders:
- `custom/` — decorative and branded icons (Arrow, Asterisk, BoxArrow, Dialog, Scribble, etc.)
- `filled/HalfStar.tsx` — half-star for rating display
- `outlined/` — outline-style icons (HistoryChat, Logo, NormalLine, ProgressLine)

---

## Adding New Shared Utilities

Before adding to `shared/`:
1. Confirm the utility is used by at least 2 different features.
2. If it's UI, check `ui/` first — it may already exist.
3. If it's a hook, check `hooks/` — avoid duplicate debounce/pagination logic.
4. Keep it generic — no feature-specific business logic.
