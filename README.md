# VegCom — Comunidade Vegana

VegCom is a platform for the vegan and vegetarian community to discover, share, and discuss plant-based recipes, connect with other users through a community feed, and get help from an AI assistant.

## Features

- **Recipe Discovery** — Browse, search, and filter a curated collection of vegan/vegetarian recipes by meal type, prep time, difficulty, and more.
- **Recipe Creation** — Create recipes with a rich text editor, image uploads, and drag-and-drop step ordering.
- **Community Feed** — Share posts, comment, like, and interact with the vegan community.
- **AI Chat** — Get recipe suggestions and vegan tips through an integrated Gemini AI assistant.
- **User Accounts** — Profiles, favorites, subscription management, and notification preferences.
- **Curiosities** — A timeline of vegan/vegetarian facts and history.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| Server State | TanStack React Query v5 |
| HTTP Client | Axios (with auth interceptors) |
| Forms | React Hook Form + Zod |
| UI Components | Radix UI primitives |
| Rich Text | Tiptap |
| Animations | Framer Motion + GSAP |
| Drag & Drop | dnd-kit |
| Package Manager | Yarn v4 |
| Backend | NestJS (separate repo) |
| Database | PostgreSQL via Prisma ORM |

## Project Structure

```
vegcom/
├── app/                  # Next.js App Router — routes and pages
│   ├── (public)/         # Public pages (home/feed, recipes, curiosities, user profiles)
│   │   └── (auth)/       # Auth pages (login, signup, forgot-password)
│   └── (private)/        # Authenticated pages (account, chat, new-recipe, payment)
├── src/
│   ├── features/         # Feature-sliced modules (auth, recipes, community, chat…)
│   ├── components/       # Page-level components not tied to a single feature (landing/)
│   ├── shared/           # Shared API clients, hooks, UI components, utils
│   └── entities/         # Domain entity types (recipe, post, user)
└── public/               # Static assets
```

See [app/README.md](app/README.md) for the full route map and [src/features/README.md](src/features/README.md) for the feature architecture.

## Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/maatheuus/vegcom.git
   cd vegcom
   ```

2. **Install dependencies** (always use Yarn):
   ```bash
   yarn install
   ```

3. **Set up environment variables**:
   ```bash
   cp .env.example .env
   ```
   Then fill in the values — see `.env.example` for the required variables.

4. **Run the development server**:
   ```bash
   yarn dev
   ```
   Open [http://localhost:3000](http://localhost:3000).

## Environment Variables

| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_API_URL` | URL of the NestJS backend API |

## Further Documentation

- [CLAUDE.md](CLAUDE.md) — Architecture rules and conventions for AI-assisted development
- [FOR_BACKEND.md](FOR_BACKEND.md) — Frontend/backend contract: what the frontend expects from the API
- [src/features/README.md](src/features/README.md) — Feature-sliced architecture overview
- [src/shared/README.md](src/shared/README.md) — Shared utilities and components
- [app/README.md](app/README.md) — Routing structure

## Contribution

Pull requests are welcome. Open an issue for any suggestions or bugs.

## License

MIT — see [LICENSE](LICENSE).