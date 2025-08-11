import { FlatCompat } from "@eslint/eslintrc";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const configs = [
  // Base configs do Next.js + TypeScript
  ...compat.extends("next/core-web-vitals", "next", "next/typescript"),

  {
    files: ["**/*.ts", "**/*.tsx"],
    languageOptions: {
      parserOptions: {
        project: "./tsconfig.json",
      },
    },
    rules: {
      // ✅ Suas regras personalizadas aqui

      // TypeScript
      "@typescript-eslint/no-empty-interface": [
        "error",
        { allowSingleExtends: false },
      ],
      "@typescript-eslint/no-unused-vars": [
        "warn",
        { argsIgnorePattern: "^_" },
      ],
      "@typescript-eslint/explicit-module-boundary-types": "off",

      // React Hooks
      "react-hooks/exhaustive-deps": "warn",
      "react-hooks/rules-of-hooks": "error",

      // JSX: evita aspas diretas, etc.
      "react/no-unescaped-entities": "error",

      // Outros
      "no-console": "warn",
      "no-debugger": "error",
    },
  },
];

export default configs;
