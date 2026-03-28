# Feature: recipes

Displays the recipe listing page at `/recipes`. Handles search, filtering, sorting, and grid rendering of recipe cards.

## Responsibilities

- Browse all recipes with server-side initial data
- Filter by meal type, prep time category, and difficulty
- Text search with debounce
- Sort recipes (by date, popularity, etc.)
- Render recipe cards in a responsive grid
- Display a hero section with a featured recipe
- Show empty state and loading skeleton

## Structure

```
recipes/
├── api/
│   ├── recipesApi.ts               # GET /recipes with query params, GET /recipes/featured
│   ├── types.ts                    # Filter, sort, and response types
│   └── queries/
│       ├── getRecipesApiClient.ts  # useGetRecipes() — React Query hook
│       └── getRecipesApiServer.ts  # Server-side prefetch for Next.js
├── components/
│   ├── RecipeParent/
│   │   ├── index.tsx               # Top-level wrapper — combines all recipe page sections
│   │   └── RecipeContent.tsx       # Grid + filter state coordination
│   ├── Cards/RecipeCard.tsx        # Individual recipe card with image, title, meta
│   ├── RecipeGrid.tsx              # Responsive grid layout
│   ├── RecipeGridSkeleton.tsx      # Loading skeleton for the grid
│   ├── RecipeHero.tsx              # Featured recipe hero banner
│   ├── RecipeEmptyState.tsx        # Empty state when no recipes match
│   ├── SearchBar.tsx               # Debounced text search input
│   ├── Categories.tsx              # Filter tabs (meal type)
│   ├── SelectCategoryItem.tsx      # Single filter chip
│   ├── ClearFiltersButton.tsx      # Resets all active filters
│   ├── HeaderComponent/            # Page header with title and description
│   └── utils.ts                    # Component-level helpers
├── hooks/
│   └── useSearchBar.ts             # Manages search input state + debounce
├── lib/
│   ├── filterUtils.ts              # Filter logic applied to recipe arrays
│   ├── slug.ts                     # Slug generation and parsing
│   └── sortFunctions.ts            # Sort comparators (newest, popular, etc.)
├── types/index.ts
└── index.ts
```

## Key Hooks

| Hook | Description |
|------|-------------|
| `useGetRecipes(filters)` | Fetches paginated/filtered recipes from the API |
| `useSearchBar()` | Manages the search text input with debounce |

## Filtering

Filters are passed as query parameters to the API:

| Filter | Param | Values |
|--------|-------|--------|
| Meal type | `mealType` | `BREAKFAST`, `LUNCH`, `DINNER`, `SNACK`, `DESSERT` |
| Prep time | `prepTimeCategory` | `QUICK`, `MEDIUM`, `LONG` |
| Search | `search` | Free text |

Active filters are reflected in the URL search params so links are shareable.

## Recipe Card

Each card displays: thumbnail image, title, meal type badge, prep time, author avatar, and save count. Clicking navigates to `/recipes/[slug]`.

## Slug

Recipe URLs use slugs (not IDs). The `lib/slug.ts` helper converts recipe titles to URL-safe slugs and parses them back when needed.
