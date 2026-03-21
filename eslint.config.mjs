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
      // TypeScript
      "@typescript-eslint/no-empty-interface": [
        "error",
        { allowSingleExtends: false },
      ],
      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          caughtErrorsIgnorePattern: "^_",
        },
      ],
      "@typescript-eslint/explicit-module-boundary-types": "off",

      // React Hooks
      "react-hooks/exhaustive-deps": "off",
      "react-hooks/rules-of-hooks": "error",

      "react/no-unescaped-entities": "warn", // mudei de "error" para "warn"

      // Outros
      "no-console": "off",
      "no-debugger": "error",
    },
  },
];

export default configs;
