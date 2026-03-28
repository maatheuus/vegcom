# Feature: recipe-details

Renders the full detail view for a single recipe at `/recipes/[slug]`.

## Responsibilities

- Display recipe content: title, images (carousel), description, ingredients, and step-by-step instructions
- Save/unsave a recipe to the user's favorites
- Share the recipe via social platforms
- Track view count (fires on mount)
- Show recipe metadata: meal type, prep time, servings, author
- Render ratings/reviews from other users

## Structure

```
recipe-details/
├── BackButton.tsx              # "Back to recipes" navigation
├── RecipeDetailsHeader.tsx     # Recipe title, author, metadata bar
├── SaveRecipeButton.tsx        # Toggle save state (heart icon, optimistic update)
├── ShareDropdown.tsx           # Dropdown with social share links (react-share)
├── ViewTracker.tsx             # Invisible component that fires a view API call on mount
└── ContentRecipe/              # Recipe body content
    ├── index.tsx               # Orchestrates ingredients + steps rendering
    ├── Ingredients.tsx         # Ingredient list with quantities
    └── Steps.tsx               # Step-by-step instructions (renders Tiptap JSON)
```

## Key Components

### `SaveRecipeButton`
- Calls `POST /recipes/:id/save` to toggle saved state
- Uses optimistic update via React Query to feel instant
- Shows a filled/outlined heart icon based on saved state

### `ShareDropdown`
- Powered by `react-share`
- Supports: Twitter/X, WhatsApp, Facebook, LinkedIn, copy link

### `ViewTracker`
- Renders nothing visually
- On mount, fires `POST /recipes/:id/view` to increment the view counter
- Only runs once per page load

### `ContentRecipe`
- Ingredients are rendered as a structured list
- Steps are stored as Tiptap JSON and rendered as rich text (bold, lists, images)

## Data Fetching

The recipe detail page uses server-side fetching via `getRecipesApiServer.ts` to pre-render the content. The save state is fetched client-side (requires auth).

## Dependencies

- `react-share` — social sharing
- `@tiptap/react` — rendering Tiptap JSON content
- `src/features/comments/` — recipe comment section is rendered on this page
