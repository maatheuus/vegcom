# Feature: new-recipe

Provides the recipe creation interface at `/new-recipe` (private route).

## Responsibilities

- Multi-section form for creating a new recipe
- Rich text editor (Tiptap) for writing step-by-step instructions
- Structured ingredient input
- Image upload with preview
- Drag-and-drop step reordering via dnd-kit
- Client-side validation with Zod + React Hook Form
- Submit recipe to `POST /recipes`

## Structure

```
new-recipe/
├── api/
│   └── (recipe creation API calls)
├── components/
│   ├── (Form sections: title, description, images, ingredients, steps, metadata)
│   └── (Editor components for rich text steps)
└── utils/
    └── (form helpers, image compression, etc.)
```

## Key Behaviors

### Rich Text Editor
- Powered by **Tiptap** with extensions for:
  - Bold, italic, lists
  - Image embedding
  - Character count limit
  - Mention support
- Content is serialized as Tiptap JSON and sent to the API as the `steps` field

### Image Upload
- Users can upload multiple images per recipe
- Images are previewed before submission
- Uploaded to Cloudinary; URLs are stored in the `images` string array

### Drag & Drop Steps
- Recipe steps can be reordered with drag handles
- Powered by **dnd-kit** (`@dnd-kit/sortable`, `@dnd-kit/core`)

### Form Validation
- Zod schema validates: title (required), at least one image, mealType (enum), prepTimeCategory (enum), ingredients, steps
- Errors are shown inline via React Hook Form field states

### Persistent Form
- Uses `usePersistentForm` from `src/shared/hooks/` to save draft state to localStorage
- Drafts survive page refresh until the form is submitted or explicitly cleared

## Data Sent to API

```ts
POST /api/v1/recipes
{
  title: string,
  description: string,
  images: string[],
  mealType: "BREAKFAST" | "LUNCH" | "DINNER" | "SNACK" | "DESSERT",
  prepTimeCategory: "QUICK" | "MEDIUM" | "LONG",
  servings: number,
  ingredients: object,  // structured JSON
  steps: object         // Tiptap JSON
}
```
