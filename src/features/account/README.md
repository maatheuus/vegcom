# Feature: account

Manages the authenticated user's account at `/account/*` (private routes). Contains settings, favorites, subscription management, own recipes, and notifications.

## Responsibilities

- Display and update user profile information
- Manage dietary preferences and culinary level
- Configure email notification preferences
- Browse and manage saved (favorite) recipes
- View recipes the user has created
- Manage Stripe subscription (upgrade, view status)
- View notification history

## Structure

```
account/
├── actions/
│   └── (server actions for profile updates if applicable)
├── apiSubscription/
│   └── subscriptionApi.ts          # GET /stripe/subscription, POST /stripe/create-checkout-session
├── components/
│   ├── AccountSidebar.tsx          # Sidebar nav linking to all /account/* sub-pages
│   ├── Settings/                   # Profile settings form (name, bio, city, avatar, preferences)
│   ├── Favorites/                  # Grid of saved recipes
│   ├── Recipes/                    # Grid of user's own recipes
│   ├── Subscription/               # Subscription status card and upgrade CTA
│   └── Notifications/              # Notification list with read/unread states
├── hooks/
│   └── (queries for user data, favorites, notifications; mutations for update, read)
├── types/
│   └── index.ts
└── index.ts
```

## Sub-Pages

| Page | Route | Description |
|------|-------|-------------|
| Dashboard | `/account` | Overview of account activity |
| Settings | `/account/settings` | Edit profile: name, bio, avatar, city, culinary level, dietary preference, email preferences |
| Favorites | `/account/favorites` | All recipes the user has saved |
| My Recipes | `/account/recipes` | All recipes the user has created |
| Subscription | `/account/subscription` | Current plan status; upgrade to premium via Stripe |
| Notifications | `/account/notifications` | List of like/comment/system notifications |

## Settings Form

Fields editable by the user:
- Name, bio, city
- Avatar (image upload)
- Culinary level (BEGINNER, INTERMEDIATE, ADVANCED)
- Dietary preference (VEGAN, VEGETARIAN, FLEXITARIAN)
- Email notification toggles (per notification type)

## Subscription Flow

1. User visits `/account/subscription`
2. Frontend calls `GET /stripe/subscription` to get current status
3. If not subscribed, a "Upgrade" button calls `POST /stripe/create-checkout-session`
4. User is redirected to Stripe Checkout
5. On success, Stripe redirects to `/payment/success`
6. Backend webhook (`POST /stripe/webhook`) updates `hasSubscription` on the user

## Notifications

- Fetched from `GET /notifications`
- Each notification links to the related entity (recipe, post, comment)
- Marked as read via `PATCH /notifications/:id/read` or `PATCH /notifications/read-all`
- `actorId` is used to show the avatar and name of who triggered the notification
