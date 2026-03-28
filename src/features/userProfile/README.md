# Feature: userProfile

Renders the public profile page for any user at `/user/[id]`. This is a read-only view — the authenticated user's own editable profile lives in `src/features/account/`.

## Responsibilities

- Fetch and display a user's public profile (name, bio, avatar, city, dietary preference, culinary level)
- Show the user's publicly listed recipes
- Show basic community activity stats (posts, recipes, join date)

## Structure

```
userProfile/
├── api/
│   ├── userProfileApi.ts           # GET /users/:id, GET /users/:id/recipes
│   └── (query hooks)
├── components/
│   ├── UserProfileHeader.tsx       # Avatar, name, bio, location, stats
│   ├── UserRecipeGrid.tsx          # Grid of this user's published recipes
│   └── (other profile display components)
├── types/
│   └── index.ts
```

## Data

```ts
// GET /users/:id response
{
  id: string
  name: string
  bio?: string
  avatar?: string
  city?: string
  culinaryLevel?: string
  dietaryPreference?: string
  recipesCount: number
  joinedAt: string
}
```

## Difference from `account`

| | `userProfile` | `account` |
|---|---|---|
| Route | `/user/[id]` | `/account/*` |
| Auth required | No (public) | Yes (private) |
| Purpose | View any user's profile | Edit your own profile |
| Editable | No | Yes |
