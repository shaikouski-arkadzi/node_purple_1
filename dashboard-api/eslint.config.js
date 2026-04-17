// eslint.config.js
import js from "@eslint/js";
import tseslint from "typescript-eslint";
import prettierPlugin from "eslint-plugin-prettier";
import prettierConfig from "eslint-config-prettier";

export default [
  {
    ignores: ["node_modules", "dist", "build"],
  },
  js.configs.recommended,

  ...tseslint.configs.recommended,

  prettierConfig,

  {
    files: ["**/*.ts", "**/*.tsx"],

    languageOptions: {
      parser: tseslint.parser,
    },

    plugins: {
      prettier: prettierPlugin,
    },

    rules: {
      "@typescript-eslint/no-unused-vars": "off",
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/explicit-function-return-type": "off",
      "@typescript-eslint/no-unsafe-function-type": "off",
      "@typescript-eslint/ban-types": [
        "warn",
        {
          extendDefaults: true,
        },
      ],

      "prettier/prettier": [
        "error",
        {
          singleQuote: false,
          semi: true,
          trailingComma: "all",
          bracketSpacing: true,
          printWidth: 80,
          endOfLine: "auto",
          useTabs: false,
        },
      ],
    },
  },
];
