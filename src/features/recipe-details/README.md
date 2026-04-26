# Feature: recipe-details

Renders the full detail view for a single recipe at `/recipes/[slug]`.

## Responsibilities

- Display recipe content: title, image gallery, description, ingredients (checklist), and step-by-step instructions (rich text)
- Save/unsave a recipe to the user's favorites
- Delete own recipe (author only)
- Share the recipe via social platforms
- Show recipe metadata: meal type, prep time, servings, author
- Render ratings and reviews from other users
- Comment section (delegated to `src/features/comments/`)

## Structure

```
recipe-details/
├── BackButton.tsx              # "Back to recipes" navigation
├── RecipeDetailsHeader.tsx     # Recipe title, author, metadata bar
├── RowHeaderData.tsx           # Row of metadata chips (meal type, prep time, servings)
├── SaveRecipeButton.tsx        # Toggle save state (heart icon, optimistic update)
├── DeleteRecipeButton.tsx      # Delete recipe (only visible to the author)
├── ShareDropdown.tsx           # Dropdown with social share links (react-share)
└── ContentRecipe/
    ├── index.tsx               # Orchestrates the recipe body sections
    ├── Details.tsx             # Main content: description + ingredients + steps
    ├── ChecklistSection.tsx    # Ingredient checklist (check-off items while cooking)
    ├── RecipeGallery.tsx       # Image carousel / gallery
    ├── ReviewForm.tsx          # Star rating + written review submission form
    ├── CommentsSection.tsx     # Comment list + compose area
    ├── CommentCard.tsx         # Single comment display
    ├── CommentSkeleton.tsx     # Loading skeleton for comments
    └── utils.ts                # Component-level helpers
```

## Key Components

### `SaveRecipeButton`

- Calls `POST /recipes/:id/save` to toggle saved state
- Uses optimistic update via React Query for instant feedback
- Shows a filled/outlined heart icon based on saved state

### `DeleteRecipeButton`

- Visible only when the current user is the recipe author
- Calls `DELETE /recipes/:id` and redirects to `/recipes` on success

### `ShareDropdown`

- Powered by `react-share`
- Supports: Twitter/X, WhatsApp, Facebook, LinkedIn, copy link

### `ChecklistSection`

- Ingredients rendered as interactive checkboxes — users can tick off items while cooking
- State is local (not persisted to server)

### `ReviewForm`

- `RatingStars` component from `src/shared/ui/` for visual star selection
- Written review is optional alongside the star rating

### `CommentsSection`

- Delegates comment fetching and creation to `src/features/comments/`
- Renders `CommentCard` for each comment with nested replies

## Data Fetching

The recipe detail page uses server-side fetching via `getRecipesApiServer.ts` to pre-render the recipe content. Save state and comments are fetched client-side (require auth or dynamic data).

## Dependencies

- `react-share` — social sharing
- `@tiptap/react` — rendering Tiptap JSON content (steps)
- `src/features/comments/` — comment section
- `src/shared/ui/RatingStars` — review star rating
- `src/shared/ui/ImageCarouselModal` — recipe image gallery
