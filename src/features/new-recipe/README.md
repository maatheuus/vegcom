# Feature: new-recipe

Provides the recipe creation interface at `/new-recipe` (private route). The form is split into three sequential steps with a review summary before submission.

## Responsibilities

- Multi-step form (step indicator + step-by-step progression)
- Step 1: basic info — title, description, meal type, prep time, servings
- Step 2: cover photo upload + additional image gallery (sortable)
- Step 3: ingredients (dynamic fields) and preparation steps (rich text)
- Review summary before final submission
- Client-side validation with Zod + React Hook Form
- Persistent draft — survives page refresh via `usePersistentForm`
- Submit recipe to `POST /recipes`

## Structure

```
new-recipe/
├── api/
│   ├── recipesApi.ts                       # POST /recipes, image upload to Cloudinary
│   └── queries/
│       ├── getNewRecipesApiClient.ts        # useSaveRecipe() mutation hook
│       └── getNewRecipesApiServer.ts        # Server-side prefetch helpers
├── components/
│   ├── NewRecipeForm.tsx                    # Root form — React Hook Form provider
│   ├── StepIndicator.tsx                   # Visual step progress bar
│   ├── RenderStepContent.tsx               # Switches between step components
│   ├── ReviewSummary.tsx                   # Read-only summary before submit
│   ├── FluctuantTip.tsx                    # Floating contextual tip bubble
│   ├── CoverPhotoUpload.tsx                # Single cover image upload + preview
│   ├── DynamicFields.tsx                   # Generic add/remove field list
│   ├── steps/
│   │   ├── constants.ts                    # Step definitions and order
│   │   ├── StepShared.tsx                  # Shared step wrapper (title, nav buttons)
│   │   ├── StepOne.tsx                     # Basic info fields
│   │   ├── StepTwo.tsx                     # Images
│   │   └── StepThree.tsx                   # Ingredients + preparation
│   ├── ImageUploadArea/
│   │   ├── index.tsx                       # Image upload area root
│   │   ├── ImageGallery.tsx                # Gallery grid of uploaded images
│   │   ├── SortableImage.tsx               # Draggable image tile (dnd-kit)
│   │   ├── ExtraImagesUpload.tsx           # Button to add more images
│   │   └── DialogImage.tsx                 # Full-size image preview dialog
│   ├── GroupFields/
│   │   ├── index.tsx                       # Grouped form section wrapper
│   │   ├── RenderCheckList.tsx             # Checklist-style group renderer
│   │   └── RenderCheckListItem.tsx         # Individual checklist row
│   └── PreparationFields/index.tsx         # Tiptap-based step preparation editor
└── utils/index.ts                          # Form helpers, image compression
```

## Key Behaviors

### Multi-Step Flow

Steps are defined in `steps/constants.ts`. `StepIndicator` shows progress; `RenderStepContent` conditionally renders the active step. Navigation is handled by `StepShared` (Back / Next buttons with validation per step).

### Image Upload

- Cover photo via `CoverPhotoUpload` (single image, required)
- Extra images via `ImageUploadArea` — displayed in a sortable gallery (`SortableImage` + dnd-kit)
- Images are compressed before upload and stored in Cloudinary; URLs are saved in the `images[]` array

### Rich Text Preparation

- Step 3 uses a Tiptap editor in `PreparationFields` for formatting step instructions
- Content is serialized as Tiptap JSON sent to the API as the `steps` field

### Persistent Draft

- `usePersistentForm` (from `src/shared/hooks/`) saves form state to `localStorage`
- Drafts survive page refresh; cleared on successful submission

## Data Sent to API

```ts
POST /api/v1/recipes
{
  title: string
  description: string
  images: string[]              // Cloudinary URLs
  mealType: "BREAKFAST" | "LUNCH" | "DINNER" | "SNACK" | "DESSERT"
  prepTimeCategory: "QUICK" | "MEDIUM" | "LONG"
  servings: number
  ingredients: object           // structured JSON from GroupFields
  steps: object                 // Tiptap JSON
}
```
