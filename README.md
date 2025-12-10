# VegCom - Comunidade Vegana de Receitas e Conexões

VegCom is a modern web platform dedicated to vegan cuisine and community building. It connects food enthusiasts, home cooks, and professionals to share recipes, exchange tips, and explore the world of plant-based eating.

## 🚀 Features

*   **Recipe Discovery**: Browse and search for delicious vegan recipes by category, ingredient, or popularity.
*   **Community Interaction**: Share your own recipes, like favorites, and comment on others' creations.
*   **User Profiles**: Build your culinary profile, track your stats, and follow other inspiring cooks.
*   **Smart Interactions**: AI-powered "Curiosity" chat for cooking tips and nutritional info (Mocked).
*   **Premium Membership**: Exclusive features for power users.

## 🛠️ Tech Stack

This project is built with a modern frontend stack:

*   **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
*   **Language**: [TypeScript](https://www.typescriptlang.org/)
*   **Styling**: [Tailwind CSS](https://tailwindcss.com/)
*   **Animations**: [GSAP](https://gsap.com/)
*   **State Management**: [TanStack Query](https://tanstack.com/query) (React Query)
*   **UI Components**: [Radix UI](https://www.radix-ui.com/) & [Phosphor Icons](https://phosphoricons.com/)
*   **Form Validation**: [Zod](https://zod.dev/)
*   **Analytics**: Vercel Analytics & Speed Insights

## 📂 Project Structure

The project follows a Feature-Sliced Design (FSD) inspired architecture:

*   `app/`: Next.js App Router pages and layouts.
*   `src/features/`: Business logic divided by domain (Auth, Recipes, Community, Account).
*   `src/entities/`: Domain models and types (User, Recipe, Post).
*   `src/shared/`: Reusable code across the application (UI components, hooks, utils, API clients).
*   `src/components/`: specialized presentation components (e.g., Landing page sections).

## 🚦 Getting Started

### Prerequisites

*   Node.js 18.17 or later
*   npm, yarn, pnpm, or bun

### Installation

1.  Clone the repository:
    ```bash
    git clone https://github.com/yourusername/vegcom.git
    cd vegcom
    ```

2.  Install dependencies:
    ```bash
    npm install
    # or
    yarn install
    # or
    pnpm install
    # or
    bun install
    ```

3.  Run the development server:
    ```bash
    npm run dev
    # or
    yarn dev
    # or
    pnpm dev
    # or
    bun dev
    ```

4.  Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 🧪 Testing & Quality

*   **Linting**: Run `npm run lint` to check for code style issues.
*   **Type Checking**: Ensure type safety with TypeScript.

## 📝 Documentation

The codebase is thoroughly documented with JSDoc. You can hover over functions and components in your IDE to see their purpose, parameters, and return values.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the [MIT License](LICENSE).
