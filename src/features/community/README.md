# Feature: community

Renders the home page at `/` — the community feed where users share posts, resources, and announcements. Also manages notifications.

## Responsibilities

- Display a paginated feed of community posts
- Compose and publish new posts (rich text + optional images)
- Filter posts by type (POST, RESOURCE, ANNOUNCEMENT)
- Right sidebar with recipe suggestions and a quick-access chat widget
- Left sidebar navigation (desktop and mobile menus)
- Notification popup and unread announcement tracking
- Integrate with `communityPost` for per-post interactions

## Structure

```
community/
├── api/
│   ├── communityApi.ts             # GET /community/posts, POST /community/posts
│   ├── communityApiClient.ts       # React Query hooks: useFetchPosts, useCreatePost, etc.
│   ├── notificationsApi.ts         # GET /notifications, PATCH /notifications/read-all
│   └── (no queries/ subfolder — hooks live directly in api/ and hooks/)
├── components/
│   ├── Background/                 # Decorative background element
│   ├── CommunityLayout/
│   │   ├── index.tsx               # Main layout: left sidebar + feed + right sidebar
│   │   ├── CommunitySelectedTab.tsx # Tab switcher for the feed view
│   │   └── CommunityRightSidebar/
│   │       ├── index.tsx           # Right sidebar wrapper
│   │       ├── RecipeSuggestions.tsx # Suggested recipes card
│   │       └── ChatWidget.tsx      # Quick-access AI chat shortcut
│   ├── Menu/
│   │   ├── index.tsx               # Menu root (picks Desktop or Mobile)
│   │   ├── DesktopMenu.tsx         # Left sidebar navigation for desktop
│   │   ├── MobileMenu.tsx          # Bottom navigation bar for mobile
│   │   ├── MobileMenuDrawer.tsx    # Slide-out drawer for mobile nav
│   │   ├── NotificationPopup.tsx   # Notification bell + dropdown
│   │   ├── menuConfig.ts           # Nav item definitions
│   │   └── shared.ts               # Shared menu types/helpers
│   ├── Post/
│   │   ├── Cards/
│   │   │   ├── index.tsx           # Renders the correct card variant
│   │   │   ├── Default.tsx         # Standard text post card
│   │   │   ├── Announcement.tsx    # Highlighted announcement card
│   │   │   ├── ImageVariant.tsx    # Post card with image grid
│   │   │   ├── Root.tsx            # Shared card chrome (header + actions)
│   │   │   ├── AvatarGroup.tsx     # Stacked avatars for likers
│   │   │   ├── EmptyState.tsx      # Empty feed state
│   │   │   └── ReportPostDialog.tsx # Report post dialog
│   │   ├── CommentsPreview/
│   │   │   └── CommentPreview.tsx  # Preview of top comments on a card
│   │   ├── Composer/
│   │   │   ├── index.tsx           # Desktop post composer
│   │   │   ├── MobileComposer.tsx  # Mobile post composer
│   │   │   ├── PostComposerTextArea.tsx # Tiptap editor area
│   │   │   ├── Actions.tsx         # Composer action buttons (emoji, image, send)
│   │   │   └── types.ts
│   │   ├── List/index.tsx          # Infinite/paginated post list
│   │   └── Tiptap/
│   │       └── Helpers/
│   │           ├── customTiptap.ts     # Tiptap extension configuration
│   │           ├── ImageComponent.tsx  # Custom image node renderer
│   │           └── ImageContainer.tsx  # Image upload container
│   ├── Sidebar/
│   │   ├── index.tsx               # Collapsible left sidebar wrapper
│   │   ├── SubComponents.tsx       # Sidebar inner sections
│   │   └── ToggleButton.tsx        # Open/close toggle
│   ├── StarRating/index.tsx        # Star rating widget
│   ├── Tabs/
│   │   ├── index.tsx               # Tab root (All, Resources, Announcements)
│   │   ├── TabsClient.tsx          # Client-side tab state
│   │   ├── Resources.tsx           # Resources tab content
│   │   └── Announcements.tsx       # Announcements tab content
│   └── mockData.ts                 # Static mock data for development
├── hooks/
│   ├── useFetchPosts.ts            # Fetches paginated posts with React Query
│   ├── useNotifications.ts         # Fetches and marks notifications as read
│   └── useUnreadAnnouncement.ts    # Tracks whether unread announcements exist
├── types/index.ts
└── index.ts
```

## Post Types

| Type | Description |
|------|-------------|
| `POST` | General community post — thoughts, questions, content |
| `RESOURCE` | Links to external resources (articles, videos, tools) |
| `ANNOUNCEMENT` | Official announcements (highlighted, admin-initiated) |

## Post Composer

- Built with Tiptap via `usePostComposerEditor` from `src/shared/hooks/`
- Supports: text formatting, emoji insertion, image upload, link preview generation
- Link previews generated with `useLinkPreviews` hook
- Separate mobile composer (`MobileComposer`) shown below a breakpoint

## Notifications

- Fetched via `useNotifications` which calls `GET /notifications`
- Bell icon in the `Menu` opens `NotificationPopup` with a list of recent notifications
- `useUnreadAnnouncement` highlights the Announcements tab when new ones arrive

## Relationship with `communityPost`

`community/` handles the **feed level** (listing, creating posts). `communityPost/` handles the **post detail level** (full post view, liking, commenting). The feed cards link to `/community/[id]/[slug]` which is rendered by `communityPost`.
