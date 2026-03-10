# VegCom - AI Context

## Project Overview
VegCom ("Comunidade Vegana") is a platform designed to connect vegans and vegetarians. It allows users to discover, share, and save plant-based recipes, connect with the community through posts and discussions, and explore related curiosities in the vegan world.

## Tech Stack
- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS (v4)
- **State Management:** Zustand (Global State) + React Query (Server State)
- **Forms & Validation:** React Hook Form + Zod
- **UI Components:** Radix UI Primitives, Next.js components, Framer Motion, GSAP
- **Editor:** Tiptap (Rich text editor)
- **Package Manager:** Yarn (v4)

## Architecture & Conventions
- **Routing:** Uses Next.js App Router (`app/` directory).
  - Divided into route groups: `(public)` for accessible pages (Home, Recipes, Community, Login/Signup) and `(private)` for authenticated areas (Account Settings, Chat, New Recipe).
- **Features:** The codebase uses a feature-sliced architecture under the `src/features/` directory (e.g., `account`, `auth`, `community`, `recipes`), centralizing components, hooks, and services related to specific domains.
- **Shared Utilities:** Reusable UI components, hooks, and configurations are located in the `src/shared/` directory.
- **Styling:** Uses Tailwind CSS for utility-first styling with additional global CSS for responsiveness (`src/assets/css/responsiveness.css`) and global base styles (`app/global.css`).
- **Data Fetching:** Handled via Axios and `@tanstack/react-query` for caching and state management. Let's make sure we handle server-side vs client-side fetching correctly (`"use client"` directive when necessary).

## Key Workflows
- **Authentication:** Custom login, signup, and forgot-password flows (`app/(public)/(auth)`).
- **Content Creation:** Users can create new recipes using a dedicated rich text interface (`app/(private)/new-recipe`).
- **User Engagement:** Users can save/like recipes and participate in community discussions (`app/(public)/community`).

## AI Interaction Guidelines
- **Yarn:** Always use `yarn` instead of `npm` or `pnpm` for package management.
- **Context Awareness:** Review this context file when beginning new tasks to ensure consistency with the established architecture and technical stack.
- **Components:** Favor updating existing domain-specific components (in `src/features`) before building generic shared ones, unless the component is universally applicable.
