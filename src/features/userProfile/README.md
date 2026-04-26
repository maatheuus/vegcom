# Feature: userProfile

Renders the public profile page for any user at `/user/[id]`. This is a read-only view — the authenticated user's own editable profile lives in `src/features/account/`.

## Responsibilities

- Fetch and display a user's public profile (name, bio, avatar, city, dietary preference, culinary level)
- Show the user's publicly listed recipes and community posts in separate tabs
- Display culinary level and dietary preference as visual badges
- Tabbed navigation between "Recipes" and "Posts" content

## Structure

```
userProfile/
├── api/
│   └── userApi.ts                      # GET /users/:id, GET /users/:id/recipes
├── components/
│   ├── UserProfileContent.tsx          # Root — fetches data and composes sections
│   ├── UserProfileHeader.tsx           # Avatar, name, bio, location, stats
│   ├── UserProfileTabs.tsx             # Tab definitions (Recipes / Posts)
│   ├── UserProfileTabsClient.tsx       # Client-side tab switching logic
│   ├── UserCulinaryLevelBadge.tsx      # Badge: BEGINNER / INTERMEDIATE / ADVANCED
│   └── UserPreferenceBadge.tsx         # Badge: VEGAN / VEGETARIAN / FLEXITARIAN
├── types/index.ts
└── (no index.ts barrel — components are imported directly by the page)
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
  culinaryLevel?: "BEGINNER" | "INTERMEDIATE" | "ADVANCED"
  dietaryPreference?: "VEGAN" | "VEGETARIAN" | "FLEXITARIAN"
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
| Tabs | Recipes / Posts | Settings / Recipes / Subscription / Notifications |
