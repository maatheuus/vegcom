# Feature: account

Manages the authenticated user's account at `/account/*` (private routes). Contains settings, subscription management, own recipes, and notification preferences.

## Responsibilities

- Display and update user profile information (name, bio, city, avatar)
- Manage dietary preferences and culinary level
- Upload a new avatar image
- Configure email notification preferences
- Browse and manage recipes the user has created
- Manage Stripe subscription (upgrade, view status)
- Display post-payment success screen
- Show premium member badge and card for subscribed users

## Structure

```
account/
├── actions/
│   └── revalidateUser.ts               # Server action to revalidate user cache after profile update
├── apiSubscription/
│   ├── subscriptionApi.ts              # GET /stripe/subscription, POST /stripe/create-checkout-session
│   └── queries/
│       ├── getSubscriptionApiClient.ts # useGetSubscription(), useCreateCheckoutSession()
│       └── getSubscriptionApiServer.ts # Server-side subscription prefetch
├── components/
│   ├── AccountLayout.tsx               # Shared layout wrapper for all /account/* pages
│   ├── AccountSidebar.tsx              # Sidebar nav linking to all sub-pages
│   ├── AccountHeader.tsx               # Page header with user name and avatar
│   ├── Header.tsx                      # Minimal top header component
│   ├── Headline.tsx                    # Section headline typography
│   ├── PremiumMemberBadge.tsx          # Badge shown on subscribed user profiles
│   ├── PremiumMemberCard.tsx           # Card displaying premium membership details
│   ├── PaymentSuccessView.tsx          # Shown after successful Stripe payment
│   ├── utils.ts                        # Account-level helpers
│   ├── (personal-info)/
│   │   ├── UserInformations.tsx        # Displays current user profile data
│   │   └── FormInformation.tsx         # Edit form: name, bio, city, preferences, avatar
│   ├── (recipes)/
│   │   ├── RecipeCard.tsx              # Recipe card in the "My Recipes" grid
│   │   ├── RecipeActions.tsx           # Server component for recipe action buttons
│   │   ├── RecipeActionsClient.tsx     # Client-side delete/edit handlers
│   │   ├── RecipeFilter.tsx            # Filter bar for the user's recipes list
│   │   ├── RecipeEmptyState.tsx        # Empty state when user has no recipes
│   │   ├── LogoLoader.tsx              # Branded loading spinner
│   │   └── types.ts                    # Local types for the recipes sub-page
│   ├── (subscriptions)/
│   │   ├── NotSubscribedView.tsx       # Upgrade CTA for free users
│   │   ├── SubscribedView.tsx          # Current plan details for premium users
│   │   └── SubscriptionProvider.tsx    # Context for subscription state
│   └── (notifications)/
│       └── NotificationSettings.tsx   # Email notification toggles per type
├── hooks/
│   └── mutations/
│       ├── useUpdateProfile.ts         # PATCH /users/me — updates profile fields
│       └── useUploadAvatar.ts          # Uploads avatar image to Cloudinary
├── types/
│   ├── index.ts                        # General account types
│   └── subscription.ts                 # Subscription-specific types
└── index.ts
```

## Sub-Pages

| Page | Route | Description |
|------|-------|-------------|
| Dashboard | `/account` | Overview and entry point |
| Settings | `/account/settings` | Edit profile: name, bio, avatar, city, culinary level, dietary preference |
| Favorites | `/account/favorites` | All recipes the user has saved |
| My Recipes | `/account/recipes` | All recipes the user has created, with filter and delete |
| Subscription | `/account/subscription` | Current plan; upgrade to premium via Stripe |
| Notifications | `/account/notifications` | Email notification preference toggles |

## Settings Form

Fields editable in `FormInformation`:
- Name, bio, city
- Avatar (image upload via `useUploadAvatar`)
- Culinary level (`BEGINNER`, `INTERMEDIATE`, `ADVANCED`)
- Dietary preference (`VEGAN`, `VEGETARIAN`, `FLEXITARIAN`)

Changes are submitted via `useUpdateProfile` which calls `PATCH /users/me`, then `revalidateUser` flushes the server cache.

## Subscription Flow

1. User visits `/account/subscription`
2. `useGetSubscription` calls `GET /stripe/subscription` to get current status
3. `NotSubscribedView` shows an upgrade CTA; `SubscribedView` shows plan details
4. Clicking "Upgrade" calls `POST /stripe/create-checkout-session` → redirect to Stripe Checkout
5. On success, Stripe redirects to `/payment/success` → `PaymentSuccessView` is rendered
6. Backend webhook (`POST /stripe/webhook`) updates `hasSubscription` on the user
