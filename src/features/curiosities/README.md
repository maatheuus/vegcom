# Feature: curiosities

Renders the curiosities page at `/curiosities` — a timeline of vegan and vegetarian facts, milestones, and history.

## Responsibilities

- Display a chronological timeline of vegan/vegetarian curiosities
- Render each curiosity with title, description, date/era, and optional image
- Smooth scroll navigation between timeline entries (Lenis)

## Structure

```
curiosities/
├── components/
│   ├── CuriositiesTimeline.tsx     # Timeline container and layout
│   ├── CuriosityCard.tsx           # Individual fact/milestone card
│   └── (other display components)
├── hooks/
│   └── (data fetching hooks)
├── types/
│   └── index.ts
└── index.ts
```

## Data

Curiosities are fetched from the backend or defined as static content. Each entry contains:

```ts
{
  id: string
  title: string
  description: string
  year?: number | string    // Era or specific year
  imageUrl?: string
  category?: string         // e.g., "history", "science", "culture"
}
```

## Scrolling

The page uses **Lenis** for smooth scroll behavior, providing a polished timeline browsing experience. GSAP is used for scroll-triggered entrance animations on each curiosity card.
