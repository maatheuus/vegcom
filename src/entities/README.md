# src/entities/ — Domain Entity Types

This directory contains the core domain model type definitions shared across multiple features. Entities are **pure types only** — no API calls, no components, no logic.

## Entities

| Entity | Files | Description |
|--------|-------|-------------|
| `recipe` | `types.ts`, `index.ts`, `mock.ts` | Recipe data shape — title, slug, images, ingredients, steps, meal type, author |
| `post` | `types.ts`, `index.ts`, `mock.ts` | Community post shape — content, type (POST/RESOURCE/ANNOUNCEMENT), likes, author |
| `user` | `types.ts`, `index.ts` | User profile shape — id, name, email, role, subscription status, preferences |

## When to use entities vs. feature types

- **Use `src/entities/`** when a type is shared between two or more features (e.g., `Recipe` used in both `recipes` and `recipe-details`).
- **Use `src/features/<feature>/types/`** for types that are specific to a single feature's API contract or internal state.

## Mock Data

`mock.ts` files provide static mock objects for use during development and testing. They match the entity type exactly.

## Import Convention

```ts
// Import via the entity barrel
import type { Recipe } from "@entities/recipe"
import type { Post } from "@entities/post"
import type { User } from "@entities/user"
```
