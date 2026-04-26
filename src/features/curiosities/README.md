# Feature: curiosities

Renders the curiosities page at `/curiosities` — a page with vegan/vegetarian fast facts and a chronological history timeline.

## Responsibilities

- Display a "Fast Facts" section with bite-sized vegan/vegetarian statistics and highlights
- Render a `HistoryTimeline` with milestone entries sorted chronologically
- Orchestrate the full curiosities page layout via `CuriositiesPage`

## Structure

```
curiosities/
├── components/
│   ├── page/
│   │   └── CuriositiesPage.tsx         # Root component — composes FastFacts + HistoryTimeline
│   ├── FastFacts/
│   │   └── index.tsx                   # Fast facts cards section
│   ├── HistoryTimeline/
│   │   └── index.tsx                   # Chronological timeline of milestones
│   └── curiosites/
│       └── utils.ts                    # Data helpers and formatting utilities
├── types/index.ts
└── index.ts
```

## Sections

### Fast Facts

Short stat or highlight cards displayed at the top of the page. Static or lightly dynamic content.

### History Timeline

A vertical timeline of vegan/vegetarian history milestones. Each entry contains a year/era, title, and description. Scroll-triggered entrance animations are applied via GSAP.

## Data

Curiosity entries may be static (hardcoded) or fetched from the backend. Each entry shape:

```ts
{
  id: string
  title: string
  description: string
  year?: number | string
  imageUrl?: string
  category?: string   // e.g., "history", "science", "culture"
}
```
